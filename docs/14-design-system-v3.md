# 14 — Design System v3 ("Signal") — current

Replaces v2 "paper & ink" ([13](13-design-system-v2.md), kept for history) after owner feedback (2026-10-07): v2 felt generic/AI-made. v3 is a full rebuild of the visual base, not a reskin.

## Concept
A dark studio where the background is alive: one fixed **Three.js particle field** (15k GPU points desktop / 6.5k mobile) sits behind the whole public site and **morphs into an object for whatever section is in the middle of the screen** — the live, interactive version of a scroll-synced video sequence.

| Section / page | Particle shape |
|---|---|
| Home hero | `</>` code glyph (brand-relevant, matches the logo) |
| Websites | globe (lat/long lines) |
| Mobile apps | phone |
| Custom software / ERP | dashboard (bars + line chart + rows) |
| AI & chatbots | two-lobed "brain" cloud |
| Automation | interlocking gears |
| E-commerce & POS | shopping bag |
| Systems rail | city-grid plane |
| Final CTA / contact | ring ("portal") |
| Text-heavy sections | loose scatter, dimmed |

Section API: `data-shape`, `data-shape-x` (fraction of viewport, mirrored in RTL), `data-shape-scale`, `data-shape-dim`. Engine: `src/components/three/ParticleField.tsx`; procedural point clouds: `src/components/three/shapes.ts` (no model files). Morphs are staggered per particle with mid-flight turbulence; pointer repels particles; scroll speed adds spin; pauses in hidden tabs; centred and dimmed on mobile; static (no flow) under reduced motion; page works without WebGL.

## Tokens
Charcoal `#0a0a0b` · bone `#edeae3` · signal orange `#ff5b1f` · muted `#9a958c` · hairlines `rgba(237,234,227,.1)`. Dark only (theme toggle removed).

## Type
Syne 700 (Latin display) · Reem Kufi 700 (Arabic display, preloaded — Arabic LCP) · Hanken Grotesk (Latin body) · IBM Plex Sans Arabic 400/500 (Arabic body; replaced Noto Kufi Arabic, ~4× lighter) · JetBrains Mono (labels).

## Motion & interaction
- **Lenis** smooth scroll (own rAF). No GSAP and no Framer Motion on the public home page (removed for speed, 2026-10-07); Framer remains only on contact/portfolio/admin.
- Reveal system = CSS classes + one shared `IntersectionObserver` (`RevealObserver`): `Rise`, `SplitWords` (word-level so Arabic joins), hand-drawn `Scribble`/`Circled` (CSS stroke-dash). These are server components — zero client JS each.
- Systems rail: CSS `position: sticky` + one transform per Lenis scroll event (mirrored in RTL). Process line: stroke-dashoffset written on scroll.
- `Magnetic` and `VelocityMarquee` write transforms directly to the DOM (no React state); marquee caches its width and pauses off-screen.
- Custom cursor (dot + trailing ring, contextual labels via `data-cursor`) on fine pointers only.
- Live Cairo clock + coordinates in the hero/nav as "real studio" details.
- Navbar hides on scroll down, reappears on scroll up; full-screen clip-path mobile menu.

## Performance rules (keep these)
- Hero H1 is server-rendered and never animated (it is the LCP element); hero entrance uses CSS `.in` keyframes only.
- three.js loads after `load` + idle on desktop, and only after the first scroll/touch on mobile; named imports only; 9k points desktop / 4k mobile; DPR ≤ 1.5; section picking throttled to every 4th frame; paused in hidden tabs.
- Cursor and navbar never call React `setState` per frame.
- Fonts: only Syne 700, Hanken and Reem Kufi 700 are preloaded; Arabic body + mono load on demand. Don't add weights casually — each is 10–35 KB on the critical path.
- Only the `nav`, `common` and `contact` message namespaces are sent to the client (`[locale]/layout.tsx`); add a namespace there only if a client component needs it.
- Copy tone: professional Modern Standard Arabic + confident English. Keyword arrays keep colloquial search terms.
- Vercel Analytics only rendered when `process.env.VERCEL` is set (avoids a 404 + console error elsewhere).
- Language switch is a plain `<a>` (crosses root layouts → full document load anyway).

## Files
`components/experience/{Experience,Cursor}.tsx` · `components/three/*` · `components/motion/{Kinetic,Interactive}.tsx` · `components/home/{Hero,ServicesStory,SystemsRail,ProcessPath,HomeBlocks,Heading}.tsx` · `components/layout/{Navbar,Footer,Logo}.tsx` · `app/globals.css` · `app/fonts.ts`.

## Dependencies added
`three`, `lenis` (+ `@types/three`). `gsap` is installed but no longer used by the site — can be removed. `package-lock.json` regenerated (it was out of sync before).

## Caching (2026-10-07)
- Pages: SSG + ISR (`revalidate = 3600`) → served from the Next cache (`x-nextjs-cache: HIT`, `s-maxage=3600, stale-while-revalidate`).
- `/_next/static/*`: immutable (Next default). `icon.svg` 30 days, `robots.txt`/`manifest` 1 day, `sitemap.xml` 1 hour, OG images 7 days (`next.config.ts` `headers()`), plus security headers; `poweredByHeader: false`; `optimizePackageImports: ["lucide-react"]`; images `minimumCacheTTL` 30 days.
- Speculation Rules: links with `data-prerender` (the language switch) are prerendered on hover in Chromium browsers → near-instant locale switch.

## Lighthouse (production build, local, 2026-10-07)
| Page | Perf | A11y | Best practices | SEO |
|---|---|---|---|---|
| /ar desktop | 100 | 100 | 100 | 100 |
| /en desktop | 100 | 100 | 100 | 100 |
| /ar mobile | 90 | 100 | 100 | 100 |
| /en mobile | 92 | 100 | 100 | 100 |

Mobile is limited by Lighthouse's simulated slow-4G LCP (~3.2–3.4 s simulated); the observed LCP in the same runs was ~0.25 s. Remaining levers: fewer/lighter fonts, smaller framework JS, a CDN close to Egypt (TTFB).
