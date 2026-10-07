# 01 — Overview

## Purpose
Portfolio/marketing site for **Elmasry Tech Solutions** (owner: Faris Elmasry, Cairo, Egypt). Goal: look like a serious software company and convert visitors into inquiries (contact form, WhatsApp). Offered work: web, mobile, custom management systems (ERP/CRM), AI solutions, process automation, e-commerce/POS.

## Tech stack (from `package.json`)

| Area | Choice |
|---|---|
| Framework | Next.js **16.2.4**, App Router, React **19.2.4**, TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` in `globals.css`), `clsx` + `tailwind-merge` via `cn()` |
| Animation | Framer Motion 12, CSS keyframes |
| Icons | lucide-react (also resolved dynamically by name from the DB `icon` field) |
| i18n | next-intl 4 (`en`, `ar`) |
| DB | PostgreSQL via Prisma 7 with `@prisma/adapter-pg` (driver adapter) |
| Auth | next-auth v4, Credentials provider, JWT sessions (24 h), bcryptjs |
| Forms/validation | react-hook-form + Zod (+ `@hookform/resolvers`) |
| State | Zustand (`ui` store: theme/locale/menu; `admin` store: sidebar) |
| Email | Nodemailer (SMTP, optional) |
| Rate limiting | `@upstash/ratelimit` + `@upstash/redis` (optional) |
| Analytics | `@vercel/analytics` |
| Installed but unused | `@dnd-kit/*`, `@radix-ui/*`, `sharp`; env placeholders for UploadThing & Sentry |

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Next dev server (http://localhost:3000 → redirects to `/en`) |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint (next core-web-vitals + typescript) |
| `npm run db:migrate` | `prisma migrate dev` |
| `npm run db:seed` | `tsx prisma/seed.ts` |
| `npm run db:reset` | `prisma migrate reset` |
| `postinstall` | `prisma generate` |

## Environment variables (see `.env.example`; real `.env` is git-ignored)

| Var | Used by | Required? |
|---|---|---|
| `DATABASE_URL` | Prisma (`lib/prisma.ts`, `prisma.config.ts`, seed) | Yes |
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL` | NextAuth + `middleware.ts` | Yes |
| `NEXT_PUBLIC_SITE_URL` | Server-side `fetch` to own API, metadata, sitemap, robots | Yes in prod (defaults to localhost / elmasry.tech) |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp links (navbar, contact) | Recommended (default `+201000000000`) |
| `UPSTASH_REDIS_REST_URL/TOKEN` | Contact-form rate limit | Optional (limit disabled if absent) |
| `EMAIL_HOST/PORT/USER/PASS`, `ADMIN_EMAIL` | Contact notification email | Optional (skipped if absent) |
| `UPLOADTHING_*`, `SENTRY_DSN` | Nothing yet | Placeholders |

## Run locally
1. `npm install` (runs `prisma generate`)
2. Copy `.env.example` → `.env`, fill `DATABASE_URL`, `NEXTAUTH_SECRET`
3. `npm run db:migrate && npm run db:seed`
4. `npm run dev`
5. Admin: `/en/admin/login` (seeded admin user is defined in `prisma/seed.ts`; change the password immediately via Admin → Settings).

## Git state
2 commits (`Initial commit from Create Next App`, `seconed commit`). Branch `main`. README is still the create-next-app default.
