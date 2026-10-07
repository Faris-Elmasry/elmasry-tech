import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Scroll-reveal primitives with zero client JavaScript of their own: they
// render plain markup + CSS classes, and a single shared IntersectionObserver
// (<RevealObserver/>) adds `.is-in` when each [data-reveal] enters the viewport.
// Without JS (or with reduced motion) the CSS shows everything immediately.

export { Magnetic, VelocityMarquee, RevealObserver } from "@/components/motion/Interactive";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Fade + rise once in view. `delay` is in seconds (kept for API compatibility). */
export function Rise({
  children,
  className,
  delay: d = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "p" | "section" | "article";
}) {
  return (
    <Tag data-reveal className={cn("rise", className)} style={delay(d * 1000)}>
      {children}
    </Tag>
  );
}

/**
 * Words slide up out of their own masks. Word-level (not character-level) so
 * Arabic letters keep joining. `immediate` plays on load (above the fold).
 */
export function SplitWords({
  text,
  className,
  delay: d = 0,
  stagger = 0.06,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span data-reveal className={cn("split", immediate && "is-in", className)}>
      {words.map((w, i) => (
        <span key={i} className="word-mask">
          <span className="word-inner" style={delay((d + i * stagger) * 1000)}>
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

type ScribbleKind = "circle" | "underline" | "arrow";

const scribblePaths: Record<ScribbleKind, { d: string; viewBox: string }> = {
  // Loose, slightly overshooting hand-drawn ellipse.
  circle: {
    viewBox: "0 0 300 120",
    d: "M150 12 C 70 8, 12 30, 14 62 C 16 98, 92 112, 162 108 C 236 104, 292 82, 286 52 C 280 22, 214 6, 132 14 C 96 18, 70 26, 58 34",
  },
  underline: { viewBox: "0 0 300 30", d: "M4 18 C 60 8, 120 26, 180 14 S 270 10, 296 16" },
  arrow: { viewBox: "0 0 120 120", d: "M10 20 C 40 30, 70 50, 92 96 M 92 96 L 70 86 M 92 96 L 98 72" },
};

/** Hand-drawn SVG mark that draws itself when scrolled into view (CSS dash animation). */
export function Scribble({ kind, className, delay: d = 0.3, strokeWidth = 3 }: { kind: ScribbleKind; className?: string; delay?: number; strokeWidth?: number }) {
  const { d: path, viewBox } = scribblePaths[kind];
  return (
    <svg data-reveal viewBox={viewBox} fill="none" aria-hidden="true" preserveAspectRatio="none" className={cn("scribble pointer-events-none", className)}>
      <path
        d={path}
        pathLength={1}
        stroke="var(--accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={delay(d * 1000)}
      />
    </svg>
  );
}

/** Word with a hand-drawn ellipse around it. */
export function Circled({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <Scribble kind="circle" className="absolute -inset-x-[12%] -inset-y-[22%] h-[144%] w-[124%]" strokeWidth={2.5} delay={0.6} />
    </span>
  );
}
