# 03 — Project Structure

```
elmasry-tech/
├─ AGENTS.md / CLAUDE.md        AI-agent rules (CLAUDE.md just imports AGENTS.md)
├─ docs/                        ← this documentation
├─ README.md                    create-next-app default (not updated)
├─ help.text                    private local notes — untracked and in .gitignore (it held the admin login)
├─ .env / .env.example          env (real .env is git-ignored)
├─ next.config.ts               next-intl plugin; images: utfs.io + avif/webp
├─ prisma.config.ts             Prisma 7 config (schema path, seed command, DATABASE_URL)
├─ eslint.config.mjs · postcss.config.mjs (Tailwind v4) · tsconfig.json (@/* → src/*)
├─ messages/
│   ├─ en.json                  UI strings (nav, hero, sections, contact, common, about, services_page, footer, admin)
│   └─ ar.json                  Arabic equivalents (Egyptian-leaning in places)
├─ prisma/
│   ├─ schema.prisma            7 models
│   ├─ seed.ts                  admin, hero, 6 services, 3 projects, 2 testimonials, site settings
│   └─ migrations/20260501042850_init/
├─ public/                      only create-next-app SVGs (no brand assets yet)
└─ src/
    ├─ middleware.ts            admin guard + next-intl (deprecated name in Next 16 → proxy.ts)
    ├─ i18n/{routing,request}.ts
    ├─ store/{ui,admin}.ts      Zustand
    ├─ lib/
    │   ├─ api.ts               successResponse / errorResponse / requireAdmin / setCacheHeaders
    │   ├─ auth.ts              NextAuth options
    │   ├─ prisma.ts            singleton client w/ PrismaPg adapter
    │   ├─ validators.ts        Zod schemas (contact, project, service, testimonial, hero, change-password)
    │   ├─ rateLimit.ts         Upstash limiters (contact 5/h, admin-login 10/15m)
    │   ├─ email.ts             contact notification mailer
    │   └─ utils.ts             cn, slugify, formatDate, truncate, localize(record, field, locale)
    ├─ components/
    │   ├─ layout/{Navbar,Footer}.tsx
    │   ├─ sections/            HeroSection, ServicesSection, PortfolioPreview, AboutTeaser, TestimonialsSection, CTASection
    │   ├─ ui/                  Button, Badge, Card, Input, Textarea, Select, Modal, Toast, Skeleton, SectionWrapper, AnimatedCounter (+ index.ts barrel)
    │   ├─ admin/Sidebar.tsx
    │   └─ providers/{Providers,ThemeProvider}.tsx
    └─ app/
        ├─ layout.tsx           root: fonts (Poppins, Inter, JetBrains Mono), metadata, Analytics
        ├─ page.tsx             redirect → /en
        ├─ error.tsx · loading.tsx · not-found.tsx   (hard-coded EN, link to /en)
        ├─ robots.ts · sitemap.ts · globals.css · favicon.ico
        ├─ [locale]/
        │   ├─ layout.tsx · page.tsx (home)
        │   ├─ about/page.tsx · services/page.tsx · contact/page.tsx
        │   ├─ portfolio/page.tsx · portfolio/[slug]/page.tsx
        │   └─ admin/{layout,page(dashboard),login,hero,services,portfolio,testimonials,messages,settings}
        └─ api/
            ├─ auth/[...nextauth]
            ├─ admin/{stats,change-password}
            ├─ contact · contact/[id]
            ├─ hero · settings
            ├─ projects · projects/[slug]
            ├─ services · services/[id] · services/reorder
            └─ testimonials · testimonials/[id]
```

## Size snapshot
~3,600 lines in `src/app`; 11 UI primitives (~750 lines); 24 route/page files in `[locale]` + `api`.

## Where does each kind of content live?
| Content | Location |
|---|---|
| Nav/hero/section/CTA/footer/contact/about copy | `messages/*.json` (+ some hard-coded inline ternaries) |
| Home hero text, home services | Hard-coded fallbacks in `[locale]/page.tsx` |
| Services page (services, features, pricing, FAQ, process) | Hard-coded in `[locale]/services/page.tsx` |
| About skills %, timeline | Hard-coded in `[locale]/about/page.tsx` |
| Projects, testimonials, hero (DB version), site settings | PostgreSQL (seeded by `prisma/seed.ts`) |
| Home projects/testimonials fallbacks | `[locale]/page.tsx`, `portfolio/page.tsx` |
| Contact info (email, socials) | Hard-coded in Footer + contact page (site settings in DB are **not** read by the public site) |
