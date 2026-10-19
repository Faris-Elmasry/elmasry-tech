"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { copy, type DemoLocale } from "./copy";
import { ease, fitSize, range, stickyProgress, useMeasure, useReducedMotion, useScrollFrame } from "./engine";
import styles from "./kinetic.module.css";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * 01 — Hero. A two-line statement rises out of its masks on load; on scroll
 * the lines stretch and part (start-side line toward the start edge, end-side
 * line toward the end edge), revealing the next idea between them.
 */
export function KineticHero({ locale }: { locale: DemoLocale }) {
  const c = copy[locale].hero;
  const rtl = locale === "ar";
  const reduced = useReducedMotion();

  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const topRow = useRef<HTMLDivElement>(null);
  const bottomRow = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const groups = useRef<(HTMLSpanElement | null)[]>([]);
  const lines = useRef<(HTMLSpanElement | null)[][]>([[], []]);
  const texts = useRef<(HTMLSpanElement | null)[][]>([[], []]);

  // Fit each line group to the width of the stage (and cap by available height).
  useMeasure(box, () => {
    const b = box.current;
    if (!b) return;
    const lh = rtl ? 1.45 : 1.02; // line-height + mask padding, in em
    groups.current.forEach((g, gi) => {
      if (!g || !g.offsetWidth) return;
      const count = texts.current[gi].length;
      const maxByHeight = (b.clientHeight * 0.8) / (count * lh);
      const size = fitSize(texts.current[gi], b.clientWidth * 0.985, maxByHeight, 28);
      if (size) g.style.fontSize = `${size}px`;
    });
  });

  // Play the entrance once the display font is in (or after a short grace period).
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      el.dataset.ready = "";
    };
    if (!document.fonts || document.fonts.status === "loaded") go();
    else {
      document.fonts.ready.then(() => requestAnimationFrame(go));
      const t = window.setTimeout(go, 900);
      return () => window.clearTimeout(t);
    }
  }, []);

  useScrollFrame(() => {
    const r = root.current;
    if (!r) return;
    const p = stickyProgress(r);
    const vw = window.innerWidth;

    const part = reduced ? 0 : ease(range(p, 0.02, 0.86));
    lines.current.forEach((group) =>
      group.forEach((el, i) => {
        if (!el) return;
        // Even lines live on the start edge and leave through it; odd lines through the end edge.
        const toStart = i % 2 === 0;
        const sign = (toStart ? -1 : 1) * (rtl ? -1 : 1);
        el.style.transform = `translate3d(${sign * part * vw * 0.82}px,0,0) scale(${1 + part * 0.6},${1 + part * 0.14})`;
        el.style.opacity = String(1 - range(part, 0.7, 1));
      })
    );

    const chrome = reduced ? 0 : ease(range(p, 0, 0.28));
    for (const el of [topRow.current, bottomRow.current]) {
      if (!el) continue;
      el.style.opacity = String(1 - chrome);
      el.style.transform = `translate3d(0,${-chrome * 28}px,0)`;
    }

    const rv = reduced ? 0 : ease(range(p, 0.32, 0.78));
    if (reveal.current) {
      reveal.current.style.opacity = String(rv);
      reveal.current.style.transform = `translate3d(0,${(1 - rv) * 48}px,0) scale(${0.94 + rv * 0.06})`;
    }
  });

  const origin = (i: number) => {
    const start = rtl ? "right" : "left";
    const end = rtl ? "left" : "right";
    return i % 2 === 0 ? start : end;
  };

  const renderGroup = (set: string[], gi: number, className: string) => (
    <span
      ref={(el) => {
        groups.current[gi] = el;
      }}
      className={className}
    >
      {set.map((line, i) => (
        <span
          key={`${gi}-${i}`}
          ref={(el) => {
            lines.current[gi][i] = el;
          }}
          className={cn(styles.heroLine, "block", i % 2 === 0 ? "text-start" : "text-end")}
          style={{ transformOrigin: `${origin(i)} center` }}
        >
          <span className={styles.mask}>
            <span
              ref={(el) => {
                texts.current[gi][i] = el;
              }}
              data-kinetic-anim=""
              className={styles.rise}
              style={delay(180 + i * 110)}
            >
              {line}
            </span>
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <section ref={root} className="relative h-[230svh] motion-reduce:h-auto" aria-labelledby="kinetic-hero-title">
      <div
        ref={stage}
        className={cn(
          styles.stage,
          "sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pb-6 pt-24 sm:px-8 md:pb-10 md:pt-28 lg:px-12"
        )}
      >
        <div ref={topRow} className="flex items-start justify-between gap-6">
          <p className={cn("label flex items-center gap-3", styles.fade)} data-kinetic-anim="" style={delay(80)}>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            {c.eyebrow}
          </p>
          <p className={cn("label hidden md:block", styles.fade)} data-kinetic-anim="" style={delay(160)}>
            {c.aside}
          </p>
        </div>

        <div ref={box} className="relative flex min-h-0 flex-1 flex-col justify-center py-6">
          {/* Revealed between the lines as they part. */}
          <div
            ref={reveal}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center opacity-0"
          >
            <p className="label">{c.revealLabel}</p>
            <p className="title-sm text-balance text-[clamp(1.75rem,4.2vw,3.75rem)] leading-[1.05] text-[var(--text-primary)]">
              {c.reveal}
            </p>
          </div>

          <h1
            id="kinetic-hero-title"
            className={cn(
              "font-display relative text-[var(--text-primary)]",
              rtl ? "" : "uppercase leading-[0.92] tracking-[-0.035em]"
            )}
          >
            <span className="sr-only">{c.lines.join(" ")}</span>
            <span aria-hidden="true" className="block">
              {renderGroup(c.lines, 0, "hidden text-[clamp(3rem,10.5vw,12rem)] md:block")}
              {renderGroup(c.linesMobile, 1, "block text-[18vw] md:hidden")}
            </span>
          </h1>
        </div>

        <div ref={bottomRow} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <p
            className={cn("max-w-[44ch] text-pretty text-[0.98rem] leading-relaxed text-[var(--text-muted)] md:text-[1.05rem]", styles.fade)}
            data-kinetic-anim=""
            style={delay(620)}
          >
            {c.sub}
          </p>
          <div className={cn("flex items-center justify-between gap-8 md:justify-end", styles.fade)} data-kinetic-anim="" style={delay(720)}>
            <span className="label flex items-center gap-3">
              <span className={styles.cue} aria-hidden="true" />
              {c.scroll}
            </span>
            <Link href={`/${locale}/contact`} className={styles.pill}>
              {c.cta}
              <ArrowUpRight className="h-4 w-4 rtl-flip" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
