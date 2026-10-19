#!/usr/bin/env node
/**
 * capture-previews.mjs — record the homepage "Our work" previews.
 *
 * For every project it opens the live URL in headless Chromium, records a
 * ~7 s smooth auto-scroll, and writes:
 *   public/images/work/<slug>.webm         (muted, compressed with ffmpeg if available)
 *   public/images/work/<slug>-poster.webp  (first frame, via sharp)
 * Websites and systems are recorded at 1440×900; apps (their web version) at 390×844.
 *
 * USAGE
 *   node scripts/capture-previews.mjs                 # every entry in src/lib/work.ts with a url/demoUrl
 *   node scripts/capture-previews.mjs --only=slug1,slug2
 *   node scripts/capture-previews.mjs --list=previews.json
 *        previews.json = [{ "slug": "nour-cafe", "url": "https://…", "type": "website" }, …]
 *   Options: --seconds=7  --out=public/images/work  --keep-raw (keep Playwright's original webm)
 *
 * ENVIRONMENT (all optional)
 *   PLAYWRIGHT_PATH   path to the playwright package
 *                     (default: /home/faris_elmasry_2/.npm/_npx/6bcb61ec6d5aea22/node_modules/playwright)
 *   CHROME_LIBS       extra LD_LIBRARY_PATH for Chromium's system libraries
 *                     (default: ~/.local/chrome-deps/usr/lib/x86_64-linux-gnu:~/.local/chromelibs/usr/lib/x86_64-linux-gnu)
 *   FFMPEG            ffmpeg binary (default: "ffmpeg" on PATH; skipped if missing)
 *
 * After it runs, it prints the `preview` objects to paste into src/lib/work.ts.
 */

import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const require = createRequire(import.meta.url);

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);
const SECONDS = Number(args.seconds ?? 7);
const OUT = resolve(root, String(args.out ?? "public/images/work"));
const PLAYWRIGHT = process.env.PLAYWRIGHT_PATH ?? "/home/faris_elmasry_2/.npm/_npx/6bcb61ec6d5aea22/node_modules/playwright";
const LIBS =
  process.env.CHROME_LIBS ??
  [join(homedir(), ".local/chrome-deps/usr/lib/x86_64-linux-gnu"), join(homedir(), ".local/chromelibs/usr/lib/x86_64-linux-gnu")].join(":");
const FFMPEG = process.env.FFMPEG ?? "ffmpeg";

/** Read the project list: a JSON file, or src/lib/work.ts compiled on the fly with esbuild. */
async function loadList() {
  if (args.list) return JSON.parse(readFileSync(resolve(String(args.list)), "utf8"));
  const esbuild = require(join(root, "node_modules/esbuild"));
  const dir = mkdtempSync(join(tmpdir(), "work-"));
  const outfile = join(dir, "work.mjs");
  await esbuild.build({ entryPoints: [join(root, "src/lib/work.ts")], bundle: true, format: "esm", platform: "node", outfile, logLevel: "error" });
  const { work } = await import(pathToFileURL(outfile).href);
  rmSync(dir, { recursive: true, force: true });
  return work.map((w) => ({ slug: w.slug, url: w.url ?? w.demoUrl, type: w.type }));
}

const hasFfmpeg = spawnSync(FFMPEG, ["-version"], { stdio: "ignore" }).status === 0;

async function main() {
  let list = (await loadList()).filter((x) => x.url);
  if (args.only) {
    const only = String(args.only).split(",");
    list = list.filter((x) => only.includes(x.slug));
  }
  if (!list.length) {
    console.log("Nothing to capture: add entries with a url or demoUrl to src/lib/work.ts (or pass --list=file.json).");
    return;
  }
  mkdirSync(OUT, { recursive: true });

  const { chromium } = require(PLAYWRIGHT);
  const sharp = require(join(root, "node_modules/sharp"));
  const browser = await chromium.launch({ env: { ...process.env, LD_LIBRARY_PATH: [LIBS, process.env.LD_LIBRARY_PATH].filter(Boolean).join(":") } });
  const snippets = [];

  for (const item of list) {
    const mobile = item.type === "app";
    const viewport = mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 };
    const raw = mkdtempSync(join(tmpdir(), `rec-${item.slug}-`));
    console.log(`● ${item.slug}  ${item.url}  (${viewport.width}×${viewport.height})`);

    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 1,
      isMobile: mobile,
      hasTouch: mobile,
      recordVideo: { dir: raw, size: viewport },
    });
    const started = Date.now();
    const page = await context.newPage();
    try {
      await page.goto(item.url, { waitUntil: "networkidle", timeout: 60_000 });
    } catch {
      console.warn("  (network never went idle — continuing)");
    }
    await page.waitForTimeout(1500);
    // A cookie banner covers the preview: decline/accept it like a visitor would
    for (const name of [/^(weigeren|decline|reject|refuse|رفض)/i, /^(accepteren|accept|agree|allow|ok|موافق|قبول)/i]) {
      const btn = page.getByRole("button", { name }).first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click().catch(() => {});
        await page.waitForTimeout(600);
        break;
      }
    }
    // Poster: the first screen, exactly as a visitor sees it.
    const png = await page.screenshot({ type: "png" });
    await sharp(png)
      .resize({ width: mobile ? 780 : 1440, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(join(OUT, `${item.slug}-poster.webp`));

    const scrollStart = (Date.now() - started) / 1000;
    // Smooth, eased scroll down (at most ~4 screens), a short hold, then back up a little.
    await page.evaluate(async (ms) => {
      const max = Math.min(document.documentElement.scrollHeight - innerHeight, innerHeight * 4);
      const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const t0 = performance.now();
      await new Promise((done) => {
        const step = (now) => {
          const t = Math.min(1, (now - t0) / (ms * 0.8));
          window.scrollTo(0, max * ease(t));
          if (t < 1) requestAnimationFrame(step);
          else setTimeout(done, ms * 0.2);
        };
        requestAnimationFrame(step);
      });
    }, SECONDS * 1000);
    await context.close(); // flushes the video file

    const recorded = readdirSync(raw).find((f) => f.endsWith(".webm"));
    if (!recorded) {
      console.warn("  no video recorded, skipping");
      continue;
    }
    const src = join(raw, recorded);
    const dest = join(OUT, `${item.slug}.webm`);
    if (hasFfmpeg) {
      // Drop the page-load part, cap the length, scale, VP9 at a small bitrate, no audio.
      const width = mobile ? 390 : 1120;
      const r = spawnSync(
        FFMPEG,
        ["-y", "-loglevel", "error", "-ss", scrollStart.toFixed(2), "-i", src, "-t", String(SECONDS), "-vf", `scale=${width}:-2,fps=30`, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "40", "-row-mt", "1", "-an", dest],
        { stdio: "inherit" }
      );
      if (r.status !== 0) {
        console.warn("  ffmpeg failed — keeping the raw recording");
        renameSync(src, dest);
      }
    } else {
      renameSync(src, dest);
    }
    if (!args["keep-raw"]) rmSync(raw, { recursive: true, force: true });
    const kb = (f) => Math.round(statSync(f).size / 1024);
    console.log(`  → ${dest.replace(root + "/", "")} (${kb(dest)} KB), poster ${kb(join(OUT, `${item.slug}-poster.webp`))} KB`);
    snippets.push(`  ${item.slug}: preview: { video: "/images/work/${item.slug}.webm", poster: "/images/work/${item.slug}-poster.webp" },`);
  }
  await browser.close();
  if (!hasFfmpeg) console.log("\n(ffmpeg not found: videos are Playwright's raw webm — larger files.)");
  if (snippets.length) console.log("\nPaste into src/lib/work.ts:\n" + snippets.join("\n"));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
