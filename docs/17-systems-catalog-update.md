# 17 — Systems catalog update

The ready-made systems catalog now shows the products we have actually built. Every entry describes only what the product's own overview docs say it does; there are no client names and no numbers we cannot prove.

## Order (`src/lib/systems.ts`)
Finished products first: cafe-playstation, wifi-cards, pos-cashier, pharmacy-system, school-management, salon-barber, medical-lab. Then the older entries: inventory-warehouse, clinic-management, gym-management, restaurant-system, accounting-hr. The homepage count follows `readySystems`.

## Changed
- **pos-cashier**: now "Cashier, sales & instalments": instalment contracts, late payers with WhatsApp, IMEI and warranty for phone shops, repairs.
- **pharmacy-system**: strip/box selling, alternatives, earliest-expiry-first, insurance and contract companies, controlled-drugs register, delivery. Odoo is not named anywhere on the site. Claims we could not back from the docs (offline counter, chains and branch transfers, supplier orders) were removed.
- **school-management** (slug kept): now "Tutoring centres system" (private-lesson centres, card attendance, fees, teacher share, parents' app). School-only claims (report cards, bus lists, nurseries) were dropped because the product is built for centres.

## New
- **salon-barber** (icon Scissors): bookings per barber, walk-in queue, online booking, cashier, commissions, packs and gift cards.
- **medical-lab** (icon FlaskConical): reception and tube labels, results, lab-doctor approval, reports and WhatsApp links, QC and reagent stock, contract companies. Analyzer connection is not built, so it is not mentioned.

## E-receipt wording
Cashier and pharmacy say "جاهز للربط بمنظومة الإيصال الإلكتروني" (ready to connect). It was only tested against a mock, so we do not say it is certified.

## Other files
- `src/lib/seo-copy.ts`: ar+en entries for the two new slugs and rewritten ones for the three changed slugs (`seoFor` throws if one is missing).
- `src/components/ui/DynamicIcon.tsx`: added `Scissors` and `FlaskConical`.
- `serviceSystems`: custom-software lists the finished systems; website-development and ai-chatbots now include salon-barber / medical-lab where it makes sense.

## Photos (no new files; all existing, all viewed, no women)
pos-cashier: grocery.webp. pharmacy-system: pharmacy.webp. school-management: classroom-v2.webp. medical-lab: clinic-v2.webp (gloved hands, no face; also used by clinic-management). salon-barber: boutique-v2.webp (men in a shop; no barber photo exists in the library, so this is the closest neutral one). Replace it when a suitable no-women barbershop image is available.

## Tech-lead decisions on public facts (we cannot verify them, so we publish nothing unverifiable)
1. **Legal name**: «Elmasry Tech Solutions» is not claimed anywhere (footer, privacy, terms, metadata, seed). The site uses «Elmasry Tech» / «المصري تك». `site.legalName` is now "Elmasry Tech"; set the real registered name there when the commercial register confirms it.
2. **About page**: the "small, complete team" and "the founders lead every project" claims are gone. It says what we do: websites, apps and ready systems, based in Cairo. The old team roles are now plain project steps (listen, design, build, test, support).
3. **LinkedIn**: the footer link and the JSON-LD `sameAs` entry appear only when `NEXT_PUBLIC_LINKEDIN` is set (see `.env.example`); otherwise nothing is rendered, so no dead link.
4. **Itafa2na store links**: `appStore` / `playStore` stay unset in `src/lib/work.ts`, so no store button renders until real links exist (verified).
5. **Salon photo**: `salon-barber` now uses `consultation-v2.webp` (two men looking at a booking on a tablet; no women) instead of `boutique-v2.webp` (a clothing shop). No barbershop photo exists in the library; this one matches the booking story and a groomed-client look better. This supersedes the "Photos" note above.

Checked by `node scripts/check-public-claims.mjs` (no test runner in this repo): banned phrases are absent from `src/`, and the LinkedIn link is conditional.
