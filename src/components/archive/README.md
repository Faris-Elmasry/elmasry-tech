# Archived heroes (kept for reuse in other projects)

Not used by the Elmasry Tech site, but they still type-check and build with it.

| Folder | What it is | Assets |
|---|---|---|
| `lion/` | Fire-reveal lion hero (WebGL shader, cursor reveal + automatic sweep wave, falling snow). See `lion/README.md`. | `public/images/hero/lion-*.webp` (fire image pre-aligned to the dark one) |
| `world-tour/` | Scroll-driven 3D world tour (three.js + CSS3D): a glowing light bulb "Your idea", then 4 stations (website, app, one screen, assistant) with big 3D words, real photos and plain-language copy. | `public/images/demos/world/*.webp` + `credits.json` |

To reuse the world tour, copy `world-tour/page.example.tsx` to a route
(e.g. `src/app/[locale]/(site)/tour/page.tsx`) — it renders `<WorldDemo locale={...} />`.
| `demo-kinetic/` | Kinetic-typography landing demo (giant words with photos masked in the letters, velocity band, manifesto). | `public/images/services/*` |
| `demo-code/` | "Code → product" scroll story (editor types code that morphs into a website, an app, a dashboard and an AI chat). | — |

Each demo folder has a `page.example.tsx` you can copy back under `src/app/[locale]/(site)/` to route it.
Note: `src/app/globals.css` excludes this folder from Tailwind's scan (`@source not`), so if you re-route an
archived piece in this project, remove that line (or move the folder out of `archive/`).
