// Guards the tech-lead decisions on public claims. Run: node scripts/check-public-claims.mjs
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const banned = [
  [/Elmasry Tech Solutions/, "unverified legal name"],
  [/The founders lead|المؤسسين بنفسهم/, "founders claim"],
  [/small, complete team|فريق صغير كامل/, "small complete team claim"],
  [/boutique-v2\.webp/, "boutique photo on the salon system (only the store mock may use it)", (f) => !f.endsWith("screens.tsx") && !f.endsWith("service-details.ts")],
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(ts|tsx)$/.test(name)) yield p;
  }
}

const problems = [];
for (const file of [...walk("src"), "prisma/seed.ts"]) {
  const text = readFileSync(file, "utf8");
  for (const [re, why, applies] of banned) if (re.test(text) && (!applies || applies(file))) problems.push(`${file}: ${why}`);
}

const site = readFileSync("src/lib/site.ts", "utf8");
if (/linkedin\.com\/in\//.test(site)) problems.push("src/lib/site.ts: hard-coded LinkedIn URL");
if (!/process\.env\.NEXT_PUBLIC_LINKEDIN/.test(site)) problems.push("src/lib/site.ts: LinkedIn must come from NEXT_PUBLIC_LINKEDIN");
if (!/site\.social\.linkedin \?/.test(readFileSync("src/components/layout/Footer.tsx", "utf8"))) problems.push("Footer: LinkedIn link must be conditional");

const work = readFileSync("src/lib/work.ts", "utf8");
if (/^\s*(appStore|playStore):/m.test(work)) problems.push("src/lib/work.ts: a store link is set; confirm it is a real, live link first");

if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log("public claims OK");
