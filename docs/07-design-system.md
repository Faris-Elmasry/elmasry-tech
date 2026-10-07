# 07 — Design System

Defined in `src/app/globals.css` (Tailwind v4 `@theme` + CSS variables) and `src/components/ui/`.

## Palette
| Token | Value | Use |
|---|---|---|
| `navy-900/800/700/600` | `#0A1628 / #0F2040 / #162A50 / #1A3260` | Dark backgrounds, banners, cards |
| `blue-500/400/300/100` | `#1E6FFF / #4D8EFF / #7AAAFF / #D6E8FF` | Brand accent (note: overrides Tailwind's default `blue-*`) |
| `slate-400/300/200` | `#94A3B8 / #CBD5E1 / #E2E8F0` | Muted text (overrides defaults) |

## Themes (CSS variables on `<html data-theme>`)
Dark (default) and Light define: `--bg-primary/secondary/card/card-hover`, `--text-primary/muted/subtle`, `--accent(+hover,glow)`, `--border(+hover)`, `--success/warning/danger`. Components reference these via `bg-[var(--bg-primary)]` etc. Toggle in Navbar → Zustand `ui` store → `ThemeProvider` sets the attribute. Caveat: several surfaces use hard-coded dark values (`navy-900` banners, `text-white`, `hover:bg-white/5`), so light mode is only partly themed.

## Typography
`next/font/google`: **Poppins** (400/600/700/800) headings, **Inter** (400/500/600) body, **JetBrains Mono** (400) for tech chips. ⚠ Latin subsets only — **no Arabic-capable web font is loaded**, so Arabic falls back to system fonts. Also, `layout.tsx` references `var(--font-inter)` while the CSS variable set by next/font is `--font-inter-var` (the `@theme` alias `--font-inter` maps it, but verify it resolves).

## Effects & utilities
`.glow-blue`, `.text-gradient`, `.card-hover`, `.bg-grid-pattern`, `.bg-dot-pattern`, `.skip-to-content` (a11y), custom scrollbar, `::selection`, `:focus-visible` outline, RTL helpers `.rtl-flip` / `.rtl-reverse`. Animations: `fade-up`, `fade-in`, `float`, `pulse-slow`, `slide-left`, `spin-slow`, `shimmer` (keyframes). Scroll/in-view animation is mostly Framer Motion (`useInView`, stagger variants, `AnimatePresence` for filter grids).

## UI components (`src/components/ui`, barrel `index.ts`)
| Component | Variants / props |
|---|---|
| `Button` | `primary \| ghost \| outline \| danger`; `sm \| md \| lg`; `href` (renders link), `loading`, `fullWidth`, `leftIcon`, `rightIcon` |
| `Badge` | `default \| blue \| green \| amber \| red \| outline`; `sm \| md`; `mono` |
| `Card` | `default \| elevated \| glass`; `padding` toggle |
| `Input`, `Textarea`, `Select` | label, error, icons (Input), `showCharCount` (Textarea), `options` (Select); forwardRef for react-hook-form |
| `Modal` | Radix Dialog; `open`, `onOpenChange`, `title`, `maxWidth` |
| `Toast` (`ToastProvider`, `useToast`) | Built but **no provider mounted**; admin uses inline messages |
| `Skeleton` | shimmer placeholder |
| `SectionWrapper` | standard section padding/container, optional `id`/`className` |
| `AnimatedCounter` | count-up on view; `end`, `suffix`, `prefix`, `duration` |

## Layout conventions
Container `max-w-7xl` (sections) / `max-w-5xl–6xl` (pages); page header = gradient banner `from-navy-900 to-[var(--bg-primary)]` with `pt-32`; cards use `rounded-xl/2xl`, 1px `--border`; headings use `font-[family-name:var(--font-poppins)]`.

## Visual gaps to resolve in the next phase
No logo asset (text wordmark only), no real photos (initials placeholders "FE"), no project imagery (letter placeholders), `public/` has only default SVGs, no OG image, favicon is the default.
