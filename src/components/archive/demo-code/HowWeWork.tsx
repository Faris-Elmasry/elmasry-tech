"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { process, type DemoLocale } from "./copy";
import { clamp01, ease } from "./motion";

/**
 * Compact 4-step timeline. One line fills with scroll (horizontal on desktop,
 * vertical on mobile); nodes light up as the ink reaches them.
 */
export function HowWeWork({ locale }: { locale: DemoLocale }) {
  const list = useRef<HTMLOListElement>(null);
  const inkH = useRef<HTMLSpanElement>(null);
  const inkV = useRef<HTMLSpanElement>(null);

  useLenis(() => {
    const el = list.current;
    if (!el || !inkH.current || !inkV.current) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const p = desktop ? ease(clamp01((vh * 0.85 - r.top) / (vh * 0.45))) : clamp01((vh * 0.7 - r.top) / r.height);
    inkH.current.style.transform = `scaleX(${p.toFixed(4)})`;
    inkV.current.style.transform = `scaleY(${p.toFixed(4)})`;
    el.querySelectorAll<HTMLElement>("[data-step]").forEach((s, i) => {
      const reached = p >= (desktop ? i / 3 : (i + 0.15) / 4) - 0.001;
      if (s.classList.contains("is-reached") !== reached) s.classList.toggle("is-reached", reached);
    });
  });

  return (
    <section id="process" className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="max-w-2xl">
        <p className="label flex items-center gap-3">
          <span className="font-mono text-[var(--accent)]">05</span>
          <span className="block h-px w-10 bg-[var(--border-hover)]" />
          {process.label[locale]}
        </p>
        <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance">{process.title[locale]}</h2>
        <p className="mt-4 text-lg leading-relaxed text-[var(--text-muted)]">{process.sub[locale]}</p>
      </div>

      <ol ref={list} className="relative mt-14 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-8">
        {/* Desktop: horizontal line through the node centres (first → last) */}
        <span aria-hidden="true" className="absolute start-5 top-5 hidden h-px w-[calc(75%+1.5rem)] bg-[var(--border-hover)] lg:block" />
        <span
          ref={inkH}
          aria-hidden="true"
          className="absolute start-5 top-[19.5px] hidden h-[2px] w-[calc(75%+1.5rem)] origin-left bg-[var(--accent)] lg:block rtl:origin-right"
          style={{ transform: "scaleX(0)" }}
        />
        {/* Mobile: vertical line at the reading edge */}
        <span aria-hidden="true" className="absolute bottom-5 start-5 top-5 w-px bg-[var(--border-hover)] lg:hidden" />
        <span ref={inkV} aria-hidden="true" className="absolute bottom-5 start-[19.5px] top-5 w-[2px] origin-top bg-[var(--accent)] lg:hidden" style={{ transform: "scaleY(0)" }} />

        {process.steps.map((s, i) => (
          <li key={s.title.en} data-step className="group relative grid grid-cols-[2.5rem_1fr] gap-5 lg:block">
            <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hover)] bg-[var(--bg-primary)] font-mono text-sm text-[var(--text-muted)] transition-colors duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-[.is-reached]:border-[var(--accent)] group-[.is-reached]:bg-[var(--accent)] group-[.is-reached]:text-[var(--accent-ink)]">
              0{i + 1}
            </span>
            <div className="lg:mt-7 lg:pe-4">
              <p className="label">{s.out[locale]}</p>
              <h3 className="title-sm mt-2 text-xl font-bold tracking-[-0.01em] sm:text-2xl">{s.title[locale]}</h3>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)] text-pretty">{s.text[locale]}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
