# 13 — Design System v2 ("paper & ink")

Replaces the navy/blue look described in [07-design-system.md](07-design-system.md) (kept for history; admin still uses legacy token names that now map to v2 values).

## Direction
Editorial engineering studio: warm paper background, ink type, one cobalt signal colour, a lime "highlighter" for tiny marks. Deliberately avoids the generic AI-template look (navy gradients, glowing blobs, glass cards, identical icon-card grids). Human cues: numbered sections, mono eyebrows, hairline rules, film grain, blueprint grid, serif-italic accent words, hand-drawn highlighter.

## Tokens (`src/app/globals.css`)
| Token | Light | Dark |
|---|---|---|
| `--bg-primary` | `#f5f2ec` paper | `#0f0e0d` |
| `--bg-secondary` | `#ece8df` | `#171614` |
| `--bg-card` | `#fbfaf7` | `#1b1a17` |
| `--text-primary` | `#121110` ink | `#f2efe8` |
| `--text-muted` / `--text-subtle` | `#57534b` / `#8a857a` | `#a8a397` / `#7a7569` |
| `--accent` | `#2b44ff` cobalt | `#6b7bff` |
| `--highlight` | `#d8ff3c` lime | same |
| `--border` / `--border-hover` | ink 12% / 28% | paper 10% / 24% |

Theme: light default; dark via `data-theme="dark"` on `<html>` (inline script resolves stored or system preference before paint). Any section can force dark with `data-theme="dark"` (used by the Systems band). Tailwind `dark:` variant is bound to `data-theme`.

## Typography (`src/app/fonts.ts`)
| Role | Latin | Arabic |
|---|---|---|
| Display (`font-display`) | Bricolage Grotesque | Alexandria (by Egyptian designer Mohamed Gaber) |
| Body (`font-sans`) | Geist | IBM Plex Sans Arabic |
| Accent (`font-serif`) | Instrument Serif italic | Alexandria, upright + accent colour (no fake Arabic italic) |
| Labels (`font-mono`, `.eyebrow`) | Geist Mono, uppercase, tracked | body font, no tracking |

## Signature utilities
`.grain` (SVG noise overlay) · `.bg-blueprint` (56px grid) · `.mark` (animated highlighter, used via `<Mark>`) · `.eyebrow` · `.link-draw` (underline draws in) · `.rtl-flip`.

## Motion
- Framer Motion with `<MotionConfig reducedMotion="user">` (Providers) + global `prefers-reduced-motion` CSS kill-switch.
- `<Reveal>` — once-on-scroll fade/slide; `<Mark>` — highlighter sweep.
- Hero: line-by-line masked headline, `SignalField` canvas (node network with travelling packets, reacts to pointer, pauses off-screen/hidden tab, static frame under reduced motion), animated build-log card.
- `<Marquee>` service ticker; nav active pill uses shared `layoutId`.
- `<noscript>` style un-hides reveal content when JS is off.

## Components
| Component | File |
|---|---|
| Logo / LogoMark | `components/layout/Logo.tsx` (also `app/icon.svg`) |
| Navbar (desktop pill nav, full-screen mobile menu, theme + language toggles, floating WhatsApp) | `components/layout/Navbar.tsx` |
| Footer (oversized wordmark) | `components/layout/Footer.tsx` |
| SectionHeading, PageHeader | `components/sections/` |
| ServicesList (numbered editorial rows) | `components/sections/ServicesList.tsx` |
| SystemsSection (dark band, 8 systems, 4 engagement models) | `components/sections/SystemsSection.tsx` |
| Home sections: ticker, work, process, why, testimonials, FAQ (`<details>`), CTA | `components/sections/HomeSections.tsx` |
| ProjectCard (typographic cover when no thumbnail), PortfolioGrid | `components/sections/` |
| ContactForm (chip service picker, underline fields) | `components/sections/ContactForm.tsx` |
| DynamicIcon (explicit lucide map — replaces `import *`) | `components/ui/DynamicIcon.tsx` |
| Button variants: `primary` (ink pill), `accent`, `outline`, `ghost`, `danger` | `components/ui/Button.tsx` |

## Owner's next design pass
Real logo/brand assets, founder photos, project screenshots/mockups, possible Arabic OG artwork, and any new sections. Keep using tokens (never raw hex in components) so both themes stay correct.
