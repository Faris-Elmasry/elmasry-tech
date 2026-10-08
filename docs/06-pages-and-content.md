# 06 — Pages & Current Content

Everything the public sees today, and **where each piece of text/data comes from** (important because we're about to rewrite/extend it).

## Public pages

### `/[locale]` — Home (`page.tsx`, server)
Sections in order: Navbar → **Hero** → **Services** → **Portfolio preview** → **About teaser** → **Testimonials** → **CTA** → Footer. Floating green WhatsApp button (in Navbar).
- **Hero** (`HeroSection`): badge "Available for Projects ✦"; H1 "Software That Moves / Businesses Forward."; subtitle about web/mobile/AI/automation; CTAs "View My Work" → `/portfolio`, "Start a Project →" → `/contact`; trust line; animated stats **50+ Projects Delivered, 5+ Years Experience, 100% On-Time Delivery**; right-hand profile card ("FE" placeholder or `image_url`) with floating tags Laravel / React / ✓ Available / "Web · Mobile · Systems". **Text comes from `messages/*.json` (`hero.*`), not the DB hero** — the `hero` prop is only used for `image_url`, and that is itself the hard-coded fallback (null).
- **Services** (`ServicesSection`): 6 cards from hard-coded `fallbackServices`: Web Development, Mobile Applications, Custom Management Systems (ERP/CRM), AI Solutions, Process Automation, E-Commerce & POS. Icons resolved by lucide name.
- **Portfolio preview**: featured projects (limit 3) from API, else fallbacks (Al-Shifa Pharmacy, PowerFit Gym, **FoodHub Restaurant App** — the last exists only as a fallback, not in the DB). Category filter tabs: all / system / web / mobile / **automation** (no project has `automation`).
- **About teaser**: "FE" placeholder, "5+ Years", "Cairo", skills chips (Laravel, Node.js, MySQL, PostgreSQL / React, Vue.js, Next.js, Tailwind / Flutter, React Native, iOS, Android). Copy from `about.*`.
- **Testimonials**: auto-rotating carousel (API or fallback: "Ahmed Mostafa — Global Retail", "Mohamed Saber — Fitness Tech").
- **CTA**: "Ready to Build Something Amazing?", service-type pills, buttons to contact/portfolio, "Free discovery call. No commitment."

### `/[locale]/about` (client, all hard-coded + `about.*` messages)
Header with initials avatar, "Faris Elmasry", subtitle "Software Architect & Solutions Builder", Cairo. Story (2 paragraphs). **Skill bars**: Laravel 90, React/Next 85, Vue 80, MySQL/PostgreSQL 88, Flutter 75, Node 78, Docker 65, AWS/Vercel 70. **Timeline**: 2023–Present "Faris Elmasry Solutions — Full-Stack Developer & Founder" · 2021–2023 Freelance developer · 2017–2021 B.Sc. Computer Science. 3 value quotes. "Download CV" button is **disabled** ("Coming soon"). The copy is first-person solo-developer voice.

### `/[locale]/services` (client, **entirely hard-coded**)
- Hero title only.
- 6 alternating service blocks (same 6 services as home) each with 5 feature bullets, anchor id = lowercase icon name (`#globe`, `#smartphone`, …) and "Request this service" → `/contact?service=<icon>`.
- **Process** (4 steps): Discovery (30-min free call) → Proposal (scope/timeline/price in 48 h) → Development (sprints, weekly demos) → Delivery (handover, training, free support).
- **Pricing** (EGP, "From"): **Starter 5,000** (websites; 2–3 wks; 3 mo support) · **Business 15,000** (management systems; 4–8 wks; 6 mo; "Most Popular") · **Enterprise 40,000** (custom ERP/SaaS; 8–16 wks; 12 mo). Each with 5 features and "Get a Quote" → `/contact`. Note text from `services_page.pricing_note`.
- **FAQ** (6, accordion): project duration, installments (40/30/30), training, mobile, post-launch support, clients outside Egypt.
- CTA + Footer.

### `/[locale]/portfolio` (client)
Fetches `/api/projects`; filter pills all/system/web/mobile/saas; grid with thumbnail (or letter placeholder), category badge, ROI badge, client name, tech chips (max 4). If the filtered list is empty it shows the 3 hard-coded fallback projects (even for a filter with zero matches). Loading skeletons. Count badge "N projects".

### `/[locale]/portfolio/[slug]` (server, revalidate 1 h)
Banner (category, ROI badge, title, short description, optional Live Demo / GitHub buttons) → Overview (`long_desc`) → **Key Results** (splits `results_*` on ". " and animates the first number found in each sentence) → Tech Stack → "Have a similar project?" CTA (`/contact?service=<category>`) → back link. No gallery/images yet. Unknown slug → 404 (fallback-only slug `foodhub-app` therefore 404s).

### `/[locale]/contact` (client)
Left: contact card (email `faris@elmasry.tech`, WhatsApp link, "Cairo, Egypt", GitHub, LinkedIn) + WhatsApp button (pre-filled Arabic message). Right: form (name, email, phone, company, service select, message with counter) → `POST /api/contact`. Handles 429, API error, network error, success state. The `?service=` query param is **not read** to preselect the service.

### Utility pages
`not-found.tsx`, `error.tsx`, `loading.tsx` — English only, hard-coded links to `/en`. `robots.ts` (disallows `/api/`, `/en|ar/admin/`), `sitemap.ts` (static pages × locales + projects × locales).

## Shared layout
- **Navbar**: logo `ELMASRY.TECH`, links Home/About/Services/Portfolio/Contact, language toggle (عربي/EN), theme toggle, "Hire Me" button (→ contact), mobile drawer, WhatsApp FAB.
- **Footer**: brand + tagline + description, social icons (GitHub, LinkedIn, Instagram with `#` href), quick links, 6 service links (hash anchors `#web`, `#mobile`, `#systems`, `#pos`, `#automation`, `#pharmacy` — these **don't match** the services page ids), contact column, availability, copyright "© 2025 Elmasry Tech Solutions".

## Admin pages
See [09-admin-and-auth.md](09-admin-and-auth.md).

## Brand/identity facts in use
Name "Elmasry Tech Solutions" / "ELMASRY.TECH" (Arabic "إلماسري تك"); owner Faris Elmasry; email faris@elmasry.tech; location Cairo; GitHub/LinkedIn `fariselmasry`; Twitter `@fariselmasry`; WhatsApp is a **placeholder** number. Tone: first-person freelancer ("I build…").

---

## v0.3 — inner pages completed (2026-10-08)

The home page was left untouched; everything below is about the inner pages. The page descriptions above predate v0.2/v0.3.

| Page | Sections (in order) | Content source |
|---|---|---|
| `/services` | header · 6 service rows · systems rail · **ways to engage** · **industries** · process · FAQ · CTA | `lib/content.ts`, `lib/company.ts` |
| `/services/[slug]` | photo header · details + what’s included · **problems we solve** · **what you receive + timeline + stack** · **typical projects** · process · **service FAQ** (+2 general) · other services · CTA | `lib/service-details.ts` |
| `/systems` (new) | header · 8 system cards with mini screen · how it works · ways to engage · “need something custom” · systems FAQ · CTA | `lib/systems.ts` |
| `/systems/[slug]` (new, 8 × 2 locales, SSG) | header + demo/quote buttons · overview + audience + **illustrative app screen** · 6 modules · highlights · integrations · getting started · engagement · FAQ · other systems · CTA | `lib/systems.ts` |
| `/portfolio` | DB projects grid (only if any) · **our products** (system cards) · client work under NDA + private walkthrough CTA · what we build (services) · CTA | DB + `lib/systems.ts` |
| `/about` | hero + 3D computer · story (both paragraphs) · **company facts** · principles · **team roles** · **commitments** · **industries** · stack ticker · process · CTA | `messages`, `lib/company.ts` |
| `/contact` | header · WhatsApp/email/location/**hours** + “tell us” checklist · form · **what happens next** · FAQ | `lib/company.ts` |
| `/privacy`, `/terms` (new) | legal document with sticky table of contents | `lib/legal.ts` — have a lawyer review |

Shared pieces: `components/sections/Blocks.tsx` (StepsSection, EngagementSection, IndustriesSection, CommitmentsSection, SystemCard), `SystemScreen.tsx` (HTML/CSS app mock-up labelled “sample data”), `LegalPage.tsx`. `FaqBlock` now takes optional `items`/`title` (home still uses the defaults).

Navbar gained **Systems**; footer gained a Systems column, Services/Systems in Company, and Privacy/Terms links. Sitemap includes all new URLs.

Assumptions to confirm with the owner: working hours (Sun–Thu 10:00–18:00 Cairo), the typical timelines per service, the system module lists, and the legal text. Company facts are deliberately limited to verifiable ones (founded 2023, 6 services, 8 systems, AR/EN) — no project counters or testimonials were invented.

Fixed: `--highlight` CSS token was referenced (check bullets, ROI badges) but never defined, so those rendered without a background.
