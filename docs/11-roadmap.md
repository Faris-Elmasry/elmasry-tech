# 11 — Roadmap & Open Decisions

Living document. Items marked ⬜ are not started. Update as we decide things together.

## Planned content/features (from the project owner)
| # | Item | Status | Notes |
|---|---|---|---|
| 1 | **Systems** section/catalog (ready-made or showcased systems: ERP, POS, clinic, gym, pharmacy, etc.) | ⬜ | Needs data model (e.g. `System`/`Product` with bilingual fields, features, screenshots) + admin CRUD + pages `/systems`, `/systems/[slug]` |
| 2 | **Demos** (live/interactive demos per system or service) | ⬜ | Decide: embedded iframes, sandbox subdomains, recorded videos, or the `demo-forge` pitch-site approach; link from system/project pages (`live_url` exists on Project) |
| 3 | **Pricing** (real plans per service/system) | ⬜ | Current tiers (5k / 15k / 40k EGP) are placeholders in code. Decide currency strategy (EGP + USD?), per-service pricing vs. tiers, custom-quote flow. Move into DB or a content file |
| 4 | Rewrite of existing content for a *company* positioning | ⬜ | Hero, about, services, SEO metadata, testimonials, case studies |
| 5 | More services detail pages (Web, Mobile, Custom Software, AI, Automation) | ⬜ | Today one long page with 6 blocks |

## Suggested sequence (proposal — to be agreed)
1. **Decide positioning & voice** (company "we" vs. personal "I"; target markets Egypt vs. global; languages).
2. **Fix launch blockers** (issues 1–6 in [10-known-issues.md](10-known-issues.md)).
3. **Single source of truth for content**: either DB-driven (admin-editable) or typed content files — stop mixing three sources (messages / hard-coded / DB). Wire home hero/services + site settings properly.
4. **Data model extension** for Systems, Demos, Pricing (+ FAQ/process if desired); migrate; seed with real content.
5. **New pages** + admin CRUD for them; update navbar/footer/sitemap/contact-form enums.
6. **Assets & brand**: logo, favicon, OG images, screenshots/mockups, Arabic font, real photos.
7. **QA**: build/lint/typecheck, mobile + RTL pass, accessibility, Lighthouse, e2e smoke test of contact flow.
8. **Deploy** (Vercel + managed Postgres + Upstash + SMTP) and analytics/monitoring.

## Open questions for the owner
- Company vs. individual branding? Team members to show?
- Which projects/clients/testimonials/numbers are **real and publishable**?
- Final list of service lines and their names (Web, Mobile, Custom Software, AI, Automation, E-commerce/POS, others?).
- Pricing model: public prices, "starting from", or quote-only? Currencies?
- Demo hosting approach and which systems get a demo first?
- Domain, email, WhatsApp number, social profiles, languages beyond EN/AR?
- Keep the admin panel + DB for content, or move to static content files for simplicity?
- Do we keep the dark-first navy/blue identity or refresh it?
