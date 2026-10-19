"use client";

import { useEffect, useRef } from "react";
import { useScrollProgress } from "@/components/studio/useScroll";

/**
 * Four steps on one track. On wide screens the track runs across the page and
 * an orange line travels along it with the scroll; on phones it runs down the
 * reading edge. Each step's marker fills when the line reaches it. Purely a
 * function of scroll position, so it reverses exactly; copy never moves.
 */
export function StepTrack({ steps }: { steps: { title: string; text: string; note: string }[] }) {
  const wrap = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const reached = useRef(-1);
  const horizontal = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => (horizontal.current = mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useScrollProgress(
    wrap,
    (p) => {
      const el = wrap.current;
      if (!el || !line.current) return;
      // Transform only (compositor-friendly); no CSS variables cascading through the list.
      line.current.style.transform = horizontal.current ? `scaleX(${p})` : `scaleY(${p})`;
      const items = el.querySelectorAll<HTMLElement>("[data-step]");
      let n = 0;
      items.forEach((_, i) => {
        if (p >= i / (items.length - 1) - 0.02) n = i + 1;
      });
      if (n === reached.current) return;
      reached.current = n;
      items.forEach((s, i) => s.classList.toggle("is-reached", i < n));
    },
    { start: 0.75, end: 0.55 }
  );

  return (
    <ol ref={wrap} className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
      {/* Rail: vertical on phones (reading edge), horizontal on desktop through the markers */}
      <span aria-hidden="true" className="absolute bottom-6 start-[1.2rem] top-6 w-px bg-[var(--border-hover)] lg:start-[12.5%] lg:end-[12.5%] lg:bottom-auto lg:top-[1.2rem] lg:h-px lg:w-auto" />
      <span
        ref={line}
        aria-hidden="true"
        className="absolute bottom-6 start-[calc(1.2rem-0.5px)] top-6 w-[2px] origin-top bg-[var(--accent)] will-change-transform lg:start-[12.5%] lg:end-[12.5%] lg:bottom-auto lg:top-[calc(1.2rem-0.5px)] lg:h-[2px] lg:w-auto lg:origin-left lg:rtl:origin-right motion-reduce:![transform:none]"
      />
      {steps.map((s, i) => (
        <li key={s.title} data-step className="group relative grid grid-cols-[2.4rem_1fr] gap-5 lg:grid-cols-1 lg:content-start lg:justify-items-center lg:gap-6 lg:text-center">
          <span className="relative z-10 inline-flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full border border-[var(--border-hover)] bg-[var(--bg-primary)] font-mono text-sm text-[var(--text-muted)] transition-[background-color,border-color,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-[.is-reached]:border-[var(--accent)] group-[.is-reached]:bg-[var(--accent)] group-[.is-reached]:text-[var(--accent-ink)]">
            {i + 1}
          </span>
          <div className="pt-1 lg:pt-0">
            <p className="label">{s.note}</p>
            <h3 className="mt-2 title-sm text-2xl font-bold">{s.title}</h3>
            <p className="mt-2 text-lg leading-relaxed text-[var(--text-muted)] lg:mx-auto lg:max-w-[16rem]">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
