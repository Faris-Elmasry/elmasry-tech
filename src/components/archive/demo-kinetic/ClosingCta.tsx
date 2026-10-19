"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, whatsappLink } from "@/lib/site";
import { copy, type DemoLocale } from "./copy";
import { ease, fitSize, range, useMeasure, useReducedMotion, useScrollFrame } from "./engine";
import styles from "./kinetic.module.css";

/**
 * 05 — Closing CTA. One giant outlined word rises out of its mask as the
 * section arrives (scrubbed), and floods with signal orange from the bottom
 * up on hover / focus (always filled on touch screens).
 */
export function ClosingCta({ locale }: { locale: DemoLocale }) {
  const c = copy[locale].closing;
  const rtl = locale === "ar";
  const reduced = useReducedMotion();

  const section = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLAnchorElement>(null);
  const measureEl = useRef<HTMLSpanElement>(null);
  const rise = useRef<HTMLDivElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);

  useMeasure(box, () => {
    const b = box.current;
    const w = word.current;
    if (!b || !w) return;
    const size = fitSize([measureEl.current], b.clientWidth * 0.985, window.innerHeight * 0.42, 40);
    if (size) w.style.fontSize = `${size}px`;
  });

  useScrollFrame(() => {
    const s = section.current;
    if (!s) return;
    const vh = window.innerHeight;
    const top = s.getBoundingClientRect().top;
    const p = reduced ? 1 : ease(range(vh - top, vh * 0.1, vh * 0.85));
    if (rise.current) rise.current.style.transform = `translate3d(0,${((1 - p) * 92).toFixed(2)}%,0)`;
    if (lead.current) {
      const q = reduced ? 1 : ease(range(vh - top, 0, vh * 0.6));
      lead.current.style.opacity = String(q);
      lead.current.style.transform = `translate3d(0,${((1 - q) * 24).toFixed(2)}px,0)`;
    }
  });

  return (
    <section
      ref={section}
      className="relative flex min-h-[100svh] flex-col justify-between gap-14 overflow-hidden border-t border-[var(--border)] px-5 pb-12 pt-24 sm:px-8 md:pb-16 md:pt-28 lg:px-12"
      aria-labelledby="kinetic-closing-title"
    >
      <div className="flex items-start justify-between gap-6">
        <h2 id="kinetic-closing-title" className="label">
          {c.label}
        </h2>
        <p className="label hidden [@media(hover:hover)]:block">{c.aside}</p>
      </div>

      <div ref={box} className="w-full">
        <p ref={lead} className="title-sm mb-4 text-[clamp(1.2rem,2.2vw,1.9rem)] text-[var(--text-muted)] md:mb-6">
          {c.lead}
        </p>
        <div className={styles.mask}>
          <div ref={rise} className="will-change-transform">
            <Link
              ref={word}
              href={`/${locale}/contact`}
              aria-label={`${c.word} — ${c.cta}`}
              className={cn(
                styles.ctaWord,
                "font-display text-[clamp(3.5rem,13vw,15rem)]",
                rtl ? "" : "uppercase leading-[1] tracking-[-0.04em]"
              )}
              style={rtl ? { lineHeight: 1.35 } : undefined}
            >
              <span ref={measureEl} className={styles.ctaOutline}>
                {c.word}
              </span>
              <span className={styles.ctaFill} aria-hidden="true">
                {c.word}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-8 border-t border-[var(--border)] pt-8 md:grid-cols-[1fr_1fr_auto] md:items-end md:gap-12">
        <div className="flex flex-col gap-2">
          <span className="label">{c.email}</span>
          <a href={`mailto:${site.email}`} dir="ltr" className="link-draw w-fit text-[1.05rem] text-[var(--text-primary)]">
            {site.email}
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <span className="label">{c.whatsapp}</span>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="link-draw w-fit text-[1.05rem] text-[var(--text-primary)]"
          >
            {site.whatsapp}
          </a>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <span className="label">{c.base}</span>
          <Link href={`/${locale}/contact`} className={styles.pill}>
            {c.cta}
            <ArrowUpRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
