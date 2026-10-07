# load.md — Start Here

Entry point for any session (human or AI) working on this project. Read this first, then open only the files you need.

## What this project is

A bilingual (EN/AR, RTL-aware) **portfolio website for a software company** (Elmasry Tech Solutions) that builds websites, mobile apps, custom software/management systems, AI solutions and automation. It has a public site plus a password-protected admin panel backed by PostgreSQL.

> Status: **v0.2 — redesigned + SEO pass (2026-10-06).** Public site now speaks as a company ("we"), is Arabic-first, has a new "paper & ink" design ([13](13-design-system-v2.md)) and a full technical-SEO layer ([12](12-seo.md)). Docs 02–09 describe the **v0.1 audit**; where they conflict with 12/13 or the "Changes in v0.2" list below, 12/13 win. Systems catalog, demos and pricing are next ([11-roadmap.md](11-roadmap.md)).

## Changes in v0.2 (quick reference)
- Routing: `app/[locale]/layout.tsx` is now the **root layout** (`<html lang dir>` per locale); public pages live in the route group `app/[locale]/(site)/` with a shared Navbar/Footer layout; admin stays at `app/[locale]/admin/`. `app/layout.tsx`, `app/page.tsx`, `app/loading.tsx`, `favicon.ico` removed; `app/global-not-found.tsx` + `[locale]/(site)/[...rest]` handle 404s.
- `middleware.ts` → `proxy.ts` (Next 16). Default locale is **`ar`**.
- Content source of truth for marketing copy: `src/lib/content.ts` (services, systems, engagement models, process, FAQ, stack) + `messages/*.json`. Brand/contact facts: `src/lib/site.ts`. SEO helpers: `src/lib/seo.tsx`. DB reads for pages: `src/lib/data.ts` (Prisma direct, graceful fallback).
- New routes: `/[locale]/services/[slug]` (6 service landing pages).
- Home hero/services no longer read the DB `HeroSection`/`Service` tables (admin Hero/Services editors therefore don't affect the public site — see roadmap).
- Testimonials render only from DB (no fabricated fallbacks); projects render from DB, else an honest "case studies coming" block.
- Contact form: new service enum (service slugs + `ready-made-system` + `other`), international phones, `?service=` preselect; email HTML is escaped.

## Mandatory rule for code work

`AGENTS.md` says this is **not the Next.js you know** (Next 16.2.4, React 19.2.4). Before writing code, read the relevant guide in `node_modules/next/dist/docs/` (e.g. `01-app/03-api-reference/03-file-conventions/proxy.md`). Heed deprecations — e.g. `middleware.ts` is deprecated and renamed `proxy.ts`.

## Doc map

| File | Read it when you need… |
|---|---|
| [01-overview.md](01-overview.md) | Purpose, tech stack, scripts, env vars, how to run |
| [02-architecture.md](02-architecture.md) | How requests flow: routing, data fetching, auth, caching, i18n, state |
| [03-structure.md](03-structure.md) | Annotated file/folder tree |
| [04-data-model.md](04-data-model.md) | Prisma schema, seed data, validation rules |
| [05-api-reference.md](05-api-reference.md) | Every API route, auth, cache, revalidation |
| [06-pages-and-content.md](06-pages-and-content.md) | Every page/section + all current content (services, pricing, FAQ, process…) and where each lives |
| [07-design-system.md](07-design-system.md) | Colors, fonts, theme, UI components, animation |
| [08-i18n.md](08-i18n.md) | Translation files, locale routing, RTL, where text is hard-coded |
| [09-admin-and-auth.md](09-admin-and-auth.md) | Admin panel pages, NextAuth, route protection, rate limiting |
| [10-known-issues.md](10-known-issues.md) | Bugs, inconsistencies, security notes, tech debt found during the audit |
| [11-roadmap.md](11-roadmap.md) | Planned additions (systems, demos, pricing) + open decisions |
| [12-seo.md](12-seo.md) | Keyword research (AR/EN), competitors, what SEO is implemented, SEO to-dos |
| [13-design-system-v2.md](13-design-system-v2.md) | Previous (v2) design system — superseded |
| [14-design-system-v3.md](14-design-system-v3.md) | **Current** design system: Three.js particle field, motion, tokens, fonts |

## Quick facts

- Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Prisma 7 + PostgreSQL (`@prisma/adapter-pg`) · NextAuth v4 (credentials/JWT) · next-intl 4 · Framer Motion · Zustand · react-hook-form + Zod · Upstash ratelimit (optional) · Nodemailer (optional).
- Locales: `ar` (default), `en`. All pages live under `src/app/[locale]/`.
- Path alias: `@/*` → `src/*`.
- Docs 01–11 audited 2026-10-06 against commit `e735739`; 12–13 + v0.2 notes written after the redesign the same day.

## Conventions for keeping docs fresh

- When you change a route, model, page or content source, update the matching doc in the same change.
- Never put secrets or real credentials in docs.
- New planned work goes in `11-roadmap.md`; once shipped, move its description into the relevant doc.
