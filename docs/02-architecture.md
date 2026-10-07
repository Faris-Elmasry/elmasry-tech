# 02 — Architecture

## High-level

```
Browser
  │  /en/... or /ar/...
  ▼
src/middleware.ts  ── (1) admin guard (next-auth JWT)  ── (2) next-intl locale routing
  ▼
App Router  src/app
  ├─ layout.tsx            root <html data-theme="dark">, fonts, Vercel Analytics
  ├─ [locale]/layout.tsx   validates locale, NextIntlClientProvider, ThemeProvider
  ├─ [locale]/**/page.tsx  public pages + admin pages
  └─ api/**/route.ts       JSON API (Prisma) — consumed by pages AND admin UI
                              │
                              ▼
                     lib/prisma.ts (PrismaClient + PrismaPg adapter) ──► PostgreSQL
```

The app is **one Next.js deployment** that is both the website and its own backend. There is no separate API service.

## Routing & i18n
- All user-facing routes are `/{locale}/...` with `locale ∈ {en, ar}`; `/` redirects to `/en` (`app/page.tsx`).
- `i18n/routing.ts` defines locales/default (`en`, `localeDetection: true`). `i18n/request.ts` loads `messages/{locale}.json`, falling back to `en`.
- `[locale]/layout.tsx` wraps content in `<div lang dir>` (RTL for `ar`). Note the root `<html>` is always `lang="en"` (see known issues).
- Locale switch (Navbar) = string-replace of the locale prefix in the current pathname.
- Pages read the locale via `useParams()` (client) or `params` (server) rather than next-intl routing helpers; links are built manually (`/${locale}/...`).

## Data fetching pattern
- **Server pages fetch their own API over HTTP** (`fetch(`${NEXT_PUBLIC_SITE_URL}/api/...`, { next: { revalidate: 3600 } })`) — homepage and project detail. This needs `NEXT_PUBLIC_SITE_URL` to be correct and the server reachable from itself; it also fails at build time if the API isn't up. `sitemap.ts` does the same.
- **Client pages fetch in `useEffect`** — `/portfolio` list and all admin pages.
- Homepage hero and services currently **ignore the API result** and use hard-coded fallbacks (`fallbackHero`, `fallbackServices`); projects/testimonials use API data if non-empty, else fallbacks.
- `/services` page content (services, features, pricing, FAQ, process) is **entirely hard-coded** in the page file.

## API layer
- Thin route handlers in `app/api/**`. Standard envelope from `lib/api.ts`: `{ success: true, data }` / `{ success: false, error }`.
- Public GETs set `Cache-Control: s-maxage=N, stale-while-revalidate=86400`.
- Mutations call `requireAdmin()` (NextAuth session) then Zod-validate, write via Prisma, and `revalidatePath("/", "layout")`.
- Full list: [05-api-reference.md](05-api-reference.md).

## Auth & protection
- NextAuth v4 Credentials → `AdminUser` table, bcrypt compare, JWT session (24 h) carrying `id` + `role`.
- Two guard layers: `middleware.ts` (redirects unauthenticated `/(en|ar)/admin/*` except `/login`) and `admin/layout.tsx` (renders sidebar only if a session exists) + `requireAdmin()` in every mutating API route.
- Details: [09-admin-and-auth.md](09-admin-and-auth.md).

## State management
- `store/ui.ts` (persisted `elmasry-ui`): `theme`, `locale`, `mobileMenuOpen`, `activeModal`. Only theme+locale persisted.
- `store/admin.ts` (persisted `elmasry-admin`): sidebar collapsed flag.
- Theme is applied as `data-theme` on `<html>`; CSS variables switch palettes.

## Rendering mix
- Server components: root + locale layouts, homepage, project detail, admin layout, sitemap/robots.
- Client components (`"use client"`): about, contact, services, portfolio list, all sections, navbar, footer, admin pages.

## Third-party/optional integrations
| Integration | Status |
|---|---|
| Upstash rate limiting | Wired to `POST /api/contact` only; admin-login limiter defined but **not used** |
| Nodemailer email | Wired to contact submission; HTML is built from unescaped user input |
| Vercel Analytics | Active in root layout |
| UploadThing / Sentry | Env placeholders and `images.remotePatterns` for `utfs.io`; no code |
| dnd-kit | Installed; services "reorder" API exists but UI doesn't use drag-and-drop |
