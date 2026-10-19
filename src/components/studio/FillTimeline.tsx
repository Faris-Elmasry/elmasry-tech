"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/components/studio/useScroll";
import { cn } from "@/lib/utils";

/**
 * Vertical step list whose rail fills with the scroll. A step "arrives" when
 * the fill passes its marker: the marker turns signal-orange and its title
 * brightens. Copy is always readable, so nothing depends on the
 * animation.
 */
export function FillTimeline({ steps, className }: { steps: { when: string; title: string; text: string }[]; className?: string }) {
  const list = useRef<HTMLOListElement>(null);
  const ink = useRef<HTMLSpanElement>(null);
  const reached = useRef(-1);

  useScrollProgress(
    list,
    (p) => {
      const el = list.current;
      if (!el || !ink.current) return;
      ink.current.style.transform = `scaleY(${p})`;
      // Only touch classes when the number of reached steps changes.
      const items = el.querySelectorAll<HTMLElement>("[data-step]");
      let n = 0;
      items.forEach((_, i) => {
        if (p >= i / items.length + 0.02) n = i + 1;
      });
      if (n === reached.current) return;
      reached.current = n;
      items.forEach((s, i) => s.classList.toggle("is-reached", i < n));
    },
    { start: 0.7, end: 0.55 }
  );

  return (
    <ol ref={list} className={cn("relative", className)}>
      <span aria-hidden="true" className="absolute bottom-8 start-[1.2rem] top-2 w-px bg-[var(--border-hover)]" />
      <span aria-hidden="true" className="absolute bottom-8 start-[1.2rem] top-2 w-px origin-top bg-[var(--accent)] will-change-transform" ref={ink} style={{ transform: "scaleY(0)" }} />
      {steps.map((s, i) => (
        <li key={i} data-step className="group relative grid grid-cols-[2.4rem_1fr] gap-5 pb-12 last:pb-0 sm:gap-8">
          <span
            aria-hidden="true"
            className="relative z-10 inline-flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full border border-[var(--border-hover)] bg-[var(--bg-primary)] font-mono text-sm text-[var(--text-muted)] transition-[background-color,border-color,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-[.is-reached]:border-[var(--accent)] group-[.is-reached]:bg-[var(--accent)] group-[.is-reached]:text-[var(--accent-ink)]"
          >
            {i + 1}
          </span>
          <div className="pt-1">
            <p className="label">{s.when}</p>
            <h3 className="mt-2 title-sm text-2xl font-bold text-[var(--text-muted)] transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-[.is-reached]:text-[var(--text-primary)] motion-reduce:text-[var(--text-primary)] sm:text-[1.75rem]">{s.title}</h3>
            <p className="mt-2 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
