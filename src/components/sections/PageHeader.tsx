import type { ReactNode } from "react";
import { Rise as Reveal } from "@/components/motion/Kinetic";

/** Top banner for inner pages: blueprint grid, eyebrow, oversized H1. */
export function PageHeader({
  eyebrow,
  title,
  sub,
  children,
  shape = "sphere",
}: {
  /** Particle sculpture shown beside this header (see components/three/shapes). */
  shape?: string;
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header data-shape={shape} data-shape-x="0.28" data-shape-scale="0.8" className="relative isolate flex min-h-[78vh] items-end overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
            <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--border-hover)]" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-balance">
            {title}
          </h1>
          {sub && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] text-pretty">{sub}</p>}
        </Reveal>
        {children}
      </div>
    </header>
  );
}
