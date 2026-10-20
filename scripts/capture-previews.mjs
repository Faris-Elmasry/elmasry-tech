#!/usr/bin/env node
/**
 * capture-previews.mjs — record the homepage "Our work" previews.
 *
 * For every project it opens the live URL in headless Chromium and records a
 * slow, smooth scroll through the first screens, FRAME BY FRAME (scroll a few
 * pixels, take a sharp screenshot, repeat), so the video never stutters and
 * stays crisp. The page's clock is faked and advanced one frame at a time, so
 * sliders, counters and JS animations move at the speed you see in the video.
 * It writes:
 *   public/images/work/<slug>.mp4          (H.264 — plays everywhere)
 *   public/images/work/<slug>.webm         (VP9 — smaller, used first where supported)
 *   public/images/work/<slug>-poster.webp  (first frame)
 * Websites and systems: 1440×900 viewport. Apps (their mobile web version): 390×844 at 2x.
 *
 * USAGE
 *   node scripts/capture-previews.mjs                 # every entry in src/lib/work.ts with a url/demoUrl
 *   node scripts/capture-previews.mjs --only=slug1,slug2
 *   node scripts/capture-previews.mjs --list=previews.json
 *        previews.json = [{ "slug": "nour-cafe", "url": "https://…", "type": "website" }, …]
 *   Options: --screens=3 (how far to scroll)  --speed=150 (css px per second)  --out=public/images/work
 *
 * ENVIRONMENT (all optional)
 *   PLAYWRIGHT_PATH   path to the playwright package (default: node_modules/playwright)
 *   CHROME_PATH       Chromium binary (default: Playwright's own)
 *   CHROME_LIBS       extra LD_LIBRARY_PATH for Chromium's system libraries
 *                     (default: ~/.local/chrome-deps/usr/lib/x86_64-linux-gnu:~/.local/chromelibs/usr/lib/x86_64-linux-gnu)
 *   FFMPEG            ffmpeg binary (default: "ffmpeg" on PATH; required)
 *
 * Always watch every video before publishing it (the site shows no photos of women).
 * Then set `preview: { video: "/images/work/<slug>", poster: "/images/work/<slug>-poster.webp" }`
 * in src/lib/work.ts (the player adds .webm / .mp4).
 */

import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
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
const SCREENS = Number(args.screens ?? 3);
const SPEED = Number(args.speed ?? 150);
const FPS = 30;
const HOLD_START = 1.2; // seconds on the first screen before scrolling
const HOLD_END = 1.0;
const OUT = resolve(root, String(args.out ?? "public/images/work"));
const PLAYWRIGHT = process.env.PLAYWRIGHT_PATH ?? join(root, "node_modules/playwright");
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

function ffmpeg(argv) {
  const r = spawnSync(FFMPEG, ["-y", "-loglevel", "error", ...argv], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`ffmpeg failed: ${argv.join(" ")}`);
}

async function main() {
  if (spawnSync(FFMPEG, ["-version"], { stdio: "ignore" }).status !== 0) throw new Error("ffmpeg is required (set FFMPEG=/path/to/ffmpeg)");
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
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
    env: { ...process.env, LD_LIBRARY_PATH: [LIBS, process.env.LD_LIBRARY_PATH].filter(Boolean).join(":") },
  });

  for (const item of list) {
    const mobile = item.type === "app";
    const viewport = mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 };
    const outWidth = mobile ? 540 : 1280;
    console.log(`● ${item.slug}  ${item.url}  (${viewport.width}×${viewport.height})`);

    const context = await browser.newContext({ viewport, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
    const page = await context.newPage();
    // Fake clock: time runs normally while the page loads, then advances exactly one frame per
    // captured frame — so sliders, counters and JS animations move at the speed you see in the video.
    await page.clock.install();
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
    // Chat widgets pop a bubble over the page: close it like a visitor would
    for (const btn of await page.getByRole("button", { name: /^(close|sluit|sluiten|dismiss|إغلاق|×)$/i }).all()) {
      if (await btn.isVisible().catch(() => false)) await btn.click({ timeout: 2000 }).catch(() => {});
    }
    // Native scrolling only: smooth-scroll CSS would delay every step
    await page.addStyleTag({ content: "html,body{scroll-behavior:auto!important}" });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);

    const distance = await page.evaluate((screens) => Math.max(0, Math.min(document.documentElement.scrollHeight - innerHeight, innerHeight * screens)), SCREENS);
    const scrollSeconds = Math.max(4, distance / SPEED);
    // gentle start and stop, steady speed in between
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) * 0.35 + t * 0.65;
    const steps = Math.round(scrollSeconds * FPS);
    const positions = [
      ...Array(Math.round(HOLD_START * FPS)).fill(0),
      ...Array.from({ length: steps }, (_, i) => Math.round(distance * ease((i + 1) / steps))),
      ...Array(Math.round(HOLD_END * FPS)).fill(distance),
    ];

    const frames = mkdtempSync(join(tmpdir(), `frames-${item.slug}-`));
    const started = Date.now();
    await page.clock.pauseAt((await page.evaluate(() => Date.now())) + 500);
    for (let i = 0; i < positions.length; i++) {
      if (i === 0 || positions[i] !== positions[i - 1]) await page.evaluate((y) => window.scrollTo(0, y), positions[i]);
      await page.clock.runFor(Math.round(1000 / FPS));
      await page.screenshot({ type: "jpeg", quality: 92, path: join(frames, `f${String(i).padStart(5, "0")}.jpg`) });
    }
    await context.close();
    console.log(`  ${positions.length} frames in ${Math.round((Date.now() - started) / 1000)} s`);

    const input = ["-framerate", String(FPS), "-i", join(frames, "f%05d.jpg")];
    const vf = ["-vf", `scale=${outWidth}:-2:flags=lanczos,format=yuv420p`];
    const base = join(OUT, item.slug);
    ffmpeg([...input, ...vf, "-c:v", "libx264", "-preset", "slow", "-crf", "25", "-movflags", "+faststart", "-an", `${base}.mp4`]);
    ffmpeg([...input, ...vf, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", "-an", `${base}.webm`]);
    await sharp(join(frames, "f00000.jpg")).resize({ width: outWidth }).webp({ quality: 82 }).toFile(`${base}-poster.webp`);
    rmSync(frames, { recursive: true, force: true });
    const kb = (f) => Math.round(statSync(f).size / 1024);
    console.log(`  → ${item.slug}.mp4 ${kb(`${base}.mp4`)} KB, .webm ${kb(`${base}.webm`)} KB, poster ${kb(`${base}-poster.webp`)} KB`);
  }
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
