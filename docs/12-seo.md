# 12 — SEO: Keyword Research & Implementation

Target: rank on Google Egypt (google.com.eg) for Arabic and English software-service queries. Researched 2026-10-06.

> **Data caveat:** research used a US-based search index and competitor pages; no search-volume data or real google.com.eg positions were available. Priorities are qualitative (H = high commercial intent). Validate in Google Keyword Planner (location: Egypt) and Search Console after launch.

## Key findings
- Egyptians use **three words** for software: **برنامج / سيستم / نظام** — cover all three in titles, headings and body.
- Ambiguous queries leak to other intents (e.g. "برنامج صيدليات" returns pharmacy degree programs) → use explicit phrases: "برنامج إدارة صيدلية", "سيستم صيدلية".
- High-intent modifiers: **سعر / أسعار / تكلفة**, **تجربة مجانية**, **اشتراك شهري**, **أفضل … في مصر**, city names (مدينة نصر، التجمع).
- Egypt-specific selling points that competitors use: **الفاتورة الإلكترونية (ETA e-invoice)**, **يعمل بدون إنترنت** (POS), WhatsApp CTA on every page.
- Use **English ASCII slugs under `/ar/` and `/en/`** (Arabic slugs become long %-encoded links when shared); put Arabic keywords in title/H1/body.

## Keyword map (by cluster)
| Cluster | Arabic | English | High-intent long-tail |
|---|---|---|---|
| Company | شركة برمجة في مصر، شركة برمجيات في القاهرة، شركة تطوير برمجيات | software company Egypt, software development company Cairo | شركة برمجة في مدينة نصر/التجمع |
| Web | تصميم مواقع، شركة تصميم مواقع في مصر، برمجة مواقع | web design Egypt, website development company Cairo | اسعار تصميم المواقع في مصر، تكلفة تصميم موقع، تصميم موقع شركة |
| Mobile | تصميم تطبيقات موبايل، برمجة تطبيقات اندرويد وايفون | mobile app development company Egypt | تكلفة عمل تطبيق في مصر، سعر تصميم تطبيق |
| Custom/ERP | برنامج ERP، برمجة انظمة خاصة، برنامج ادارة شركات | ERP system Egypt, custom software development | سعر برنامج ERP، برنامج CRM |
| POS | سيستم كاشير، برنامج كاشير، برنامج نقاط بيع | POS system Egypt | سعر سيستم كاشير، برنامج كاشير سوبر ماركت، أفضل برنامج كاشير في مصر |
| Clinic | برنامج عيادات، برنامج إدارة عيادة، سيستم عيادة أسنان | clinic management system Egypt | برنامج عيادات تجربة مجانية |
| Pharmacy | برنامج إدارة صيدلية، سيستم صيدلية | pharmacy management system Egypt | سعر برنامج صيدلية، تواريخ الصلاحية |
| Gym | برنامج إدارة جيم، سيستم جيم | gym management software Egypt | برنامج اشتراكات جيم |
| Restaurant | برنامج مطاعم، كاشير مطعم، سيستم كافيه | restaurant POS Egypt | سعر سيستم مطعم |
| School | برنامج إدارة مدارس، سيستم سنتر تعليمي | school management system Egypt | برنامج حضور وغياب |
| Inventory/Accounting | برنامج مخازن، برنامج حسابات، برنامج محاسبة | inventory / accounting software Egypt | متوافق مع الفاتورة الإلكترونية، اشتراك شهري |
| AI | شات بوت، بوت واتساب للشركات، ربط واتساب بزنس API | AI chatbot development Egypt, WhatsApp bot | سعر شات بوت واتساب، رد آلي واتساب |
| Automation | أتمتة العمليات، أتمتة الأعمال | business process automation Egypt | ربط الأنظمة |
| E-commerce | تصميم متجر الكتروني، عمل متجر اونلاين | e-commerce development Egypt | سعر تصميم متجر الكتروني |

## Competitors observed
- **Agencies:** Alex App, Extreme Digital, Imexit, Appsinnovate, ExcelCodes, DeviStack, RootDev; foreign agencies (Appinventiv, Perfection Geeks) take English "…company in Egypt/Cairo" queries with thin city pages — beatable with real Cairo NAP + real case studies.
- **Ready-made systems (main competition for the upcoming `/systems`):** DEXEF (one Arabic landing page per vertical, year in title, free trial + Zoom demo, no public prices), Daftra (Arabic content hub, public tiered pricing, comparison posts with FAQ), Wafeq, Edara ERP (e-invoice pitch), Foodics, MEDOC (clinic, /ar + /en).
- Marketplaces/directories crowd "سعر/شركة" results: Khamsat, Mostaql, OpenSooq, Dubizzle, **Yellow Pages Egypt** (cheap listing worth doing).

## Implemented (this pass)
| Item | Where |
|---|---|
| Arabic-first: default locale `ar`, `x-default` → `/ar` | `lib/site.ts`, `i18n/routing.ts` |
| Correct `<html lang="ar-EG" dir="rtl">` per locale (locale root layout) | `app/[locale]/layout.tsx` |
| Per-page title/description/keywords, canonical, hreflang (en, ar-EG, x-default), OpenGraph, Twitter | `lib/seo.tsx` `buildMetadata()` + each page's `generateMetadata` |
| Six service landing pages with keyword-targeted copy | `/[locale]/services/[slug]` from `lib/content.ts` |
| JSON-LD: Organization+ProfessionalService, WebSite, BreadcrumbList, Service, ItemList, FAQPage, ContactPage, CreativeWork | `lib/seo.tsx`, pages |
| `sitemap.xml` with hreflang alternates, reads projects from DB directly | `app/sitemap.ts` |
| `robots.txt` (blocks /api, admin), `manifest.webmanifest`, SVG favicon, OG image | `app/robots.ts`, `app/manifest.ts`, `app/icon.svg`, `app/[locale]/opengraph-image.tsx` |
| Static generation (SSG + ISR 1h) for home, about, services, portfolio | `setRequestLocale` in layouts/pages |
| Server pages query Prisma directly (no self-HTTP fetch) | `lib/data.ts` |
| Arabic fonts (Alexandria + IBM Plex Sans Arabic) | `app/fonts.ts` |
| WhatsApp CTA on every page (floating + hero + CTA blocks) | Navbar, sections |

## To do (needs owner input or external accounts)
1. **Set `NEXT_PUBLIC_SITE_URL=https://elmasry.tech` in production** — canonical/sitemap/OG URLs come from it (local `.env` is `localhost`).
2. Real **WhatsApp number** (`NEXT_PUBLIC_WHATSAPP`) and confirm email; add physical address/area for LocalBusiness + Google Business Profile (category "Software company", secondary "Website designer", "Mobile app developer").
3. Google Search Console + Bing Webmaster: verify domain, submit sitemap.
4. Listings: Yellow Pages Egypt, Clutch, DesignRush, GoodFirms, LinkedIn company page — identical NAP everywhere.
5. **Systems catalog** pages `/[locale]/systems/[slug]` (pos, restaurant-pos, clinic, pharmacy, gym, school, inventory, accounting, erp) with `SoftwareApplication` + `Offer` schema, demo + trial + rent/buy CTAs — highest-intent opportunity.
6. Pricing page (`/pricing`) — competitors mostly hide prices; publishing "starting from" EGP prices is a differentiator for "سعر" queries. Decision pending.
7. Content hub/blog: "أفضل برنامج كاشير في مصر 2026", "تكلفة عمل تطبيق في مصر", "اسعار تصميم المواقع في مصر", e-invoice guides.
8. Real case studies with screenshots (thumbnails need an upload solution — UploadThing is configured in `next.config.ts` but not implemented).
9. Arabic OG image (current OG card is Latin-only because the OG renderer can't shape Arabic).

## Sources
yellowpages.com.eg (computer-software, website-design categories) · designrush.com/agency/software-development/eg · clutch.co/profile/alexapp · appinventiv.com/eg/mobile-app-development-company-in-egypt · perfectiongeeks.com (Cairo page) · dexef.com (+ /apps/restaurant-accounting, /apps/supermarket-software, /apps/fastest-cashier-program) · daftra.com/hub (أفضل برنامج محاسبة في مصر) · wafeq.com/ar-eg · edara.io · capterra (Edara, Foodics) · medoc.care · inyad.com (أفضل 5 برامج كاشير في مصر) · techsy.io (mobile-app-cost) · studyshoot.com (website-design-prices) · Google URL-structure docs · Yoast on Arabic slugs.

---

## v0.4 — SEO pass (2026-10-16)

### On-site (done in code)
- **One keyword per page** in `<title>` (keyword first, brand once via the template), 140–155-char description with a CTA, and an **H1 that contains the keyword**: the H1 is two spans — a small keyword line + the big creative line — so the design keeps its voice and Google gets the term. Home H1: «شركة برمجة في مصر · Elmasry Tech» + «بنبني البرامج اللي شغلك ماشي عليها.»
- **Structured data:** Organization+ProfessionalService with an `OfferCatalog` linking every service and system to its page; Service schema per service, SoftwareApplication per system, FAQPage wherever an FAQ is visible, BreadcrumbList everywhere, Article schema on guides. The placeholder WhatsApp number is **never** emitted as `telephone` (`hasRealPhone` in `lib/site.ts`).
- **Guides** (`/guides`, 7 articles) answer the informational queries that rank in Egypt (cost of a website/app, choosing a cashier program, ERP vs accounting software, WhatsApp chatbot, e-invoice integration, choosing a software company), each linking to the matching service/system pages.
- **`/llms.txt`** describes the company and links the main pages for AI assistants / answer engines.
- **Search Console / Bing verification**: set `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` in the env (rendered as meta tags).
- Lighthouse (local prod build): desktop 100/100/100/100 on `/ar`; mobile SEO 100, best-practices 100, a11y 100, performance ~85–91 (limited by the React/Next runtime under Lighthouse's simulated slow 4G).
- **Avoided on purpose:** city "doorway" pages (one thin page per city) — Google treats them as spam. Use one real address + Google Business Profile instead.

### Off-site checklist (owner actions — these move rankings more than code)
1. **Real contact facts**: real WhatsApp/phone (`NEXT_PUBLIC_WHATSAPP`), office address (street, district) → add to `site.ts` and the Organization schema.
2. **Google Business Profile** (Cairo address, category "Software company", hours, photos of the team/office, website link). Ask every client for a review.
3. **Google Search Console + Bing Webmaster Tools**: verify, submit `https://elmasry.tech/sitemap.xml`, watch queries/CTR monthly.
4. **Directories with backlinks**: Clutch, GoodFirms, TechBehemoths, DesignRush, Wuzzuf company page, LinkedIn company page.
5. **Client sites**: a small "تصميم وتطوير Elmasry Tech" credit link in each client site's footer (with permission).
6. **Social profiles** (Facebook page is critical in Egypt, Instagram, LinkedIn) linking to the site; add them to `site.social` (they feed `sameAs`).
7. **Keep publishing**: 2 guides/month on real customer questions; update the cost guides yearly.
8. **Pricing page**: pages with real price ranges rank for «سعر/تكلفة تصميم موقع» — publish one when real "starting from" prices are decided.
