"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/components/studio/useScroll";
import { cn } from "@/lib/utils";

/**
 * A statement that "reads itself" as you scroll: words brighten from muted to
 * full white in step with the scroll position (and dim again going back).
 * Unlit words stay comfortably readable, so the text never depends on motion.
 * `marks` are words (exact match) drawn in the accent colour once lit.
 */
export function ScrollLit({ text, marks = [], className }: { text: string; marks?: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const litCount = useRef(0);

  useScrollProgress(
    ref,
    (p) => {
      const spans = ref.current?.querySelectorAll<HTMLElement>("[data-w]");
      if (!spans) return;
      const lit = Math.round(p * spans.length);
      const prev = litCount.current;
      if (lit === prev) return;
      // Touch only the words whose state changed since the last frame.
      for (let i = Math.min(lit, prev); i < Math.max(lit, prev); i++) spans[i].classList.toggle("is-lit", i < lit);
      litCount.current = lit;
    },
    { start: 0.85, end: 0.45 }
  );

  return (
    <p ref={ref} className={cn("title-sm font-bold tracking-[-0.03em] text-balance", className)}>
      {words.map((w, i) => (
        <span key={i}>
          <span
            data-w
            className={cn(
              "text-[var(--text-subtle)] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:text-[var(--text-primary)]",
              marks.includes(w) ? "[&.is-lit]:text-[var(--accent)]" : "[&.is-lit]:text-[var(--text-primary)]"
            )}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
