# 10 — Known Issues & Tech Debt (audit of commit `e735739`)

Found by reading the code. Grouped by priority. Items marked ✅ were fixed in the v0.2 redesign/SEO pass (2026-10-06); everything else is still open.

## 🔴 Fix before any public launch
1. **Credentials in git** — `help.text` (tracked) contains the admin email + plaintext password, and `prisma/seed.ts` hard-codes the same password. Delete `help.text`, rotate the password, make the seed read it from env, and consider scrubbing git history if the repo is/was pushed anywhere.
2. ✅ **`middleware.ts` is deprecated in Next 16** → rename to `proxy.ts` (`npx @next/codemod@canary middleware-to-proxy .`; guide: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`).
3. ✅ **Email HTML injection** — `lib/email.ts` interpolates `name`, `message`, etc. unescaped into HTML sent to the admin. Escape values.
4. **`PUT /api/projects/[slug]` is unvalidated** (`data: body`) — any column can be overwritten; also only revalidates the `/en` project path.
5. **Admin login brute-force** — `adminLoginRateLimit` exists but is never applied (NextAuth route unprotected).
6. ✅ (public pages + sitemap now use `lib/data.ts`) **Self-fetching server pages** — home, project detail, sitemap call `${NEXT_PUBLIC_SITE_URL}/api/...`; breaks at build/deploy if the URL is wrong/unreachable. Prefer calling Prisma directly in server components.

## 🟠 Content/product inconsistencies (blocks the "software company" repositioning)
7. Home **hero and services ignore the DB**: `page.tsx` forces `fallbackHero`/`fallbackServices` (and the hero title text comes from messages) → Admin → Hero/Services edits don't affect the home page.
8. ✅ for public site/contact enum/footer/SEO metadata — **still open for the DB seed + project `category` enum**. **Old niche content** remains in: DB seed (pharmacy/gym/clinic hero, services, projects, testimonials), `contactSchema.service` enum + contact form options, project `category` enum, footer service links, root SEO metadata (`description`, `keywords` about Cairo pharmacies/gyms/clinics, Laravel developer), `about` copy.
9. ✅ (fallbacks removed) Fallback project **FoodHub** (and `automation` filter tab) doesn't exist in DB → `/portfolio/foodhub-app` 404s; filtering to an empty category shows fallback projects instead of an empty state.
10. Portfolio/testimonial content looks **illustrative** (client names like "Al-Shifa", "Global Retail" / "Fitness Tech" differ between seed and fallback). Confirm what's real; don't ship fabricated testimonials/metrics.
11. ✅ (removed) Stats **50+ projects / 5+ years / 100% on-time** are static claims in messages; verify or replace with real numbers.
12. ✅ (company "we" voice) Voice conflict: first-person freelancer ("I build…", "Hire Me") vs. the stated goal of a **software company** (team, "we"). Needs a decision.
13. Public site **doesn't read `SiteSettings`** (email, WhatsApp, socials, availability, brand color, CV URL) — all hard-coded; admin Settings page therefore has no effect. WhatsApp number is a placeholder (`+201000000000`); Instagram link is `#`.
14. ✅ Footer service hash links (`#web`, `#systems`, `#pos`, `#automation`, `#pharmacy`) don't match services-page anchors (`#globe`, `#smartphone`, `#layoutdashboard`, `#braincircuit`, `#settings`, `#shoppingcart`).
15. ✅ Services page "Request this service" passes `?service=` but the contact form ignores it; values (`globe`…) wouldn't match the form enum anyway. Same for project CTA `?service=<category>`.
16. Pricing/process/FAQ/skills/timeline are code constants (not editable from admin); pricing is EGP-only and "From" prices lack a currency strategy for international clients.
17. ✅ FAQ answer says projects take "4–6 weeks" while the Starter tier says 2–3 weeks and Enterprise 8–16 — reconcile.
18. ✅ Copyright year is static "2025".

## 🟡 Technical
19. **Admin UI unusable on mobile** — sidebar `max-lg:hidden`, no replacement nav; links/redirects hard-code `/en`.
20. ✅ **Root `<html lang="en">`** never reflects Arabic/RTL; no Arabic font (see 08-i18n).
21. Raw `<img>` used (3 places) instead of `next/image`; `images.remotePatterns` only allows `utfs.io` (UploadThing is not implemented), so uploaded/CDN images aren't possible yet. `Project.images[]` is unused.
22. ✅ `useUIStore` theme persistence vs. SSR `data-theme="dark"` → possible flash of wrong theme; light mode is only partially themed (hard-coded white/navy values).
23. `GET /api/hero` writes to the DB (upsert) on a public, cacheable endpoint.
24. `PATCH /api/contact/[id]` accepts any status string; contact `GET` `total` vs `unread` use different filters.
25. `PATCH /api/services/reorder` has no UI and doesn't revalidate; `@dnd-kit`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-toast`, `sharp` installed but unused; `Toast` provider never mounted.
26. ✅ `services/page.tsx` types service as `any`; dynamic `LucideIcons[name]` import pulls in the whole icon set (bundle size).
27. ✅ (`earlyAccess` removed — it broke `tsc`) `prisma.config.ts` imports `dotenv` (not in `package.json`; works transitively) and sets `earlyAccess: true` (Prisma 7 option — verify still required).
28. ✅ Phone validation only accepts Egyptian numbers — blocks international leads (conflicts with "scale globally" positioning).
29. No tests, no CI, README is boilerplate, no `.env` validation, no error monitoring (Sentry placeholder only), no loading/error states per route, `loading.tsx`/`error.tsx` English-only.
30. ✅ `sitemap.ts` swallows all errors silently; `robots`/`sitemap` default to `https://elmasry.tech` while other code defaults to `localhost`.
31. ✅ (results now render as a list) `AnimatedCounter` for project results parses the first integer from free text — brittle when results text changes format (e.g. "3 hours/day" → "3+").

## New in v0.2
32. Admin **Hero** and **Services** editors no longer drive the public home page (copy now lives in `lib/content.ts` / `messages`). Either remove those admin screens or wire them back once the content model is decided.
33. Admin login always redirects to `/en/admin`; admin UI is English-only and still has pre-existing lint errors (`react-hooks/set-state-in-effect` in 4 pages).
34. Zod validation messages on the contact form are English even on `/ar`.
35. `next/image` for project thumbnails only allows `utfs.io`; other hosts will error until `images.remotePatterns` is extended.

## Verification (v0.2)
`tsc --noEmit` ✅ · `next build` ✅ (home/about/services/service pages/portfolio prerendered, ISR 1h) · eslint clean on new/changed files (admin pages still have the pre-existing errors above) · headless-Chromium screenshots of home (ar/en/mobile), a service page and contact reviewed. DB is still unreachable locally (see run log), so DB-backed sections were only checked in their empty state.

## Run log (2026-10-06, WSL/Linux, Node 20.20.2)
- `node_modules` had been installed on another OS (no Linux `swc` / `@parcel/watcher` → `next: Permission denied`, then config load failure). Fixed locally with `rm -rf node_modules && npm install --no-package-lock` (lockfile untouched).
- `package-lock.json` is **out of sync** with `package.json` (`npm ci` fails: missing `@swc/helpers@0.5.23`). Regenerate it with `npm install` and commit.
- Dev server starts (Next 16.2.4 Turbopack). `/en`, `/ar`, `/en/about|services|portfolio|contact|admin/login` return 200; **all DB-backed API routes return 500 `P1000 AuthenticationFailed`** — the Postgres password in the local `.env` `DATABASE_URL` is rejected by the local server (Postgres itself is up on :5432). Fix the credential (or reset the `postgres` role password), then `npm run db:migrate && npm run db:seed`. Until then pages show hard-coded fallback content.
- `npm audit`: 14 vulnerabilities (13 high, 1 critical) — review.
- Some transitive Prisma packages want Node ≥ 22 (warning only).
