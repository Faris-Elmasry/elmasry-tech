"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { Heading } from "@/components/home/Heading";
import { process, tr } from "@/lib/content";
import type { Locale } from "@/lib/site";

const PATH = "M20 0 C 6 120, 34 200, 18 300 S 30 480, 16 560 S 34 760, 20 840 S 12 960, 20 1000";

/**
 * Process steps strung along a hand-drawn line that is "inked" as you scroll.
 * Progress is written straight to the SVG on each Lenis scroll event — no
 * animation library, no React re-renders.
 */
export function ProcessPath({ locale, index, label, title }: { locale: Locale; index: string; label: string; title: string }) {
  const list = useRef<HTMLOListElement>(null);
  const ink = useRef<SVGPathElement>(null);

  useLenis(() => {
    const el = list.current;
    const p = ink.current;
    if (!el || !p) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(1, Math.max(0, (vh * 0.65 - r.top) / r.height));
    p.style.strokeDashoffset = String(1 - progress);
    el.querySelectorAll<HTMLElement>("[data-step]").forEach((step, i, all) => {
      step.classList.toggle("is-reached", progress >= i / all.length);
    });
  });

  return (
    <section className="relative mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-40">
      <Heading index={index} label={label} title={title} />

      <div className="relative mt-20">
        <svg viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-y-0 start-[7px] h-full w-10 sm:start-[11px]">
          <path d={PATH} stroke="var(--border-hover)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
          <path
            ref={ink}
            d={PATH}
            pathLength={1}
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
        </svg>

        <ol ref={list} className="space-y-24 sm:space-y-32">
          {process.map((step, i) => (
            <li key={i} data-step className="group relative grid gap-4 ps-16 sm:grid-cols-[14rem_1fr] sm:gap-12 sm:ps-24">
              <span className="absolute start-0 top-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hover)] bg-[var(--bg-primary)] font-mono text-sm text-[var(--text-muted)] transition-colors duration-500 group-[.is-reached]:border-[var(--accent)] group-[.is-reached]:bg-[var(--accent)] group-[.is-reached]:text-[var(--accent-ink)] sm:start-1">
                {i + 1}
              </span>
              <h3 className="font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{tr(step.title, locale)}</h3>
              <p className="max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">{tr(step.text, locale)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
