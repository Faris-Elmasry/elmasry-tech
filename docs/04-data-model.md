# 04 — Data Model

Source: `prisma/schema.prisma` (PostgreSQL). One migration: `20260501042850_init`. Bilingual content uses paired `_en` / `_ar` columns; `localize(record, field, locale)` picks the right one with EN fallback.

## Models

| Model | Key fields | Notes |
|---|---|---|
| **HeroSection** | `id` (fixed = 1), `title/subtitle/badge/cta_primary/cta_secondary` × `_en/_ar`, `image_url?`, `updatedAt` | Singleton row, upserted by `/api/hero`. Badge/CTA have defaults. |
| **Service** | `id`, `title/description` × `_en/_ar`, `icon` (lucide name), `order`, `featured`, timestamps | Rendered on home via icon name lookup |
| **Project** | `id`, `slug` (unique), `title/description/long_desc` × `_en/_ar`, `thumbnail?`, `images[]`, `tech_stack[]`, `category`, `live_url?`, `github_url?`, `client_name?`, `results_en/_ar?`, `roi_metric?`, `featured`, `order`, timestamps | `images[]` is stored but never rendered; `category` is a free string |
| **Testimonial** | `id`, `client_name`, `client_title_en/_ar`, `client_company`, `client_avatar?`, `text_en/_ar`, `rating` (default 5), `featured`, `createdAt` | |
| **ContactMessage** | `id`, `name`, `email`, `phone?`, `company?`, `service`, `message` (Text), `status` (default `"new"`), `createdAt` | Status values used by UI: `new`, `replied`, `archived` |
| **SiteSettings** | `id`, `key` (unique), `value` (Text), `updatedAt` | Key/value bag: `site_name_*`, `tagline_*`, `whatsapp`, `email`, `location_*`, `linkedin`, `github`, `available`, `cv_url`, `primary_color` |
| **AdminUser** | `id`, `email` (unique), `password` (bcrypt), `name`, `role` (default `"admin"`), `createdAt` | Single admin seeded |

## Validation (Zod, `lib/validators.ts`)
- **contactSchema**: name 2–100; email; phone must match Egyptian format `^(\+20|0)[0-9]{10}$` (optional/empty ok); company ≤100; `service` ∈ `pharmacy | gym | clinic | pos | web | mobile | other`; message 10–2000.
- **projectSchema**: titles 2–200; slug `[a-z0-9-]+`; `category` ∈ `system | web | mobile | saas | other`; descriptions 10–500; `tech_stack` 1–20 items; optional URLs; `order` ≥ 0.
- **serviceSchema**: titles 2–100; descriptions 10–500; `icon` string; `order` ≥ 0.
- **testimonialSchema**: names/titles 2–100; texts 20–1000; rating 1–5.
- **heroSchema**: title 2–300, subtitle 10–500, CTAs ≤50, badge ≤100, `image_url` URL/empty/null.
- **changePasswordSchema**: new password ≥ 8, one uppercase, one digit, confirm must match.

⚠ The contact `service` enum and the project `category` enum are still the **old niche set** (pharmacy/gym/clinic/pos) and don't match the new service lineup (web, mobile, custom systems, AI, automation, e-commerce). They will need updating together with the contact form options, footer links and DB categories.

## Seed data (`prisma/seed.ts`) — *old niche content*
- Admin: Faris Elmasry (email/password in the seed file — rotate after first login).
- Hero: "I Build the Systems Running Cairo's Pharmacies, Gyms & Clinics."
- Services (6): Pharmacy, Gym, Clinic, POS & Inventory, Web Development, Mobile Applications.
- Projects (3, category `system`): `al-shifa-pharmacy` (Laravel/MySQL, −40% waste), `powerfit-gym` (Laravel/Vue, 200+ members), `dr-mostafa-clinic` (Laravel/React, zero double-bookings). Each has long descriptions + results text in EN/AR.
- Testimonials (2): Ahmed Mostafa (pharmacy owner), Mohamed Saber (gym owner).
- Settings: Elmasry Tech Solutions / إلماسري تك, Cairo, WhatsApp placeholder `+201000000000`, social URLs, brand color `#1E6FFF`.

> Seeded projects/testimonials look like **illustrative/placeholder case studies** — confirm which are real before launch (see roadmap).

## Gaps for the planned additions
No models yet for: **systems/products catalog, demos, pricing plans, FAQ, process steps, team, blog/case-study media, skills/timeline**. Today these are code constants. See [11-roadmap.md](11-roadmap.md).
