# Lion hero (archived for reuse)

A complete, working hero kept for a future project. It is **not** used on the
Elmasry Tech landing page any more, but it builds and type-checks with the app.

| File | What it does |
|---|---|
| `LionHero.tsx` | Two-column grid hero (copy + lion), copy from `heroCopy` in `src/lib/landing.ts` |
| `LionCanvas.tsx` | Lazy-loads the WebGL reveal after first paint, fades it in |
| `LionReveal.tsx` | Raw-WebGL shader: dark lion → fire lion under the cursor (soft wavy edge + trail), plus an automatic full-lion sweep wave every few seconds |
| `HeroSnow.tsx` | Falling "snow" in the lion's colours (ice + embers) |

Assets: `public/images/hero/lion-dark.webp` and `lion-fire.webp`. The fire image
was **pre-warped to line up with the dark one** (OpenCV affine + smoothed
optical flow); if you replace the images, re-align them the same way or the
reveal will look shifted.

To use it again: render `<LionHero locale={locale} />` in a page. (The site's
cursor no longer draws sparks; the lion figure's `data-sparks` attribute is a
leftover hook if you want to add them back in a project.)
