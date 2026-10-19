"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { copy, type DemoLocale } from "./copy";
import { clamp, useReducedMotion } from "./engine";
import styles from "./kinetic.module.css";

/** Base drift in px/s; scroll velocity multiplies it. */
const BASE_SPEED = 64;

/**
 * 03 — Velocity band. Two full-bleed rows of service keywords drift in
 * opposite directions. Scrolling speeds them up and leans the letters in the
 * direction of travel; reversing the scroll reverses the rows.
 */
export function VelocityBand({ locale }: { locale: DemoLocale }) {
  const c = copy[locale].band;
  const rtl = locale === "ar";
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const tracks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sec = section.current;
    const els = tracks.current.filter((t): t is HTMLDivElement => !!t);
    if (!sec || !els.length) return;
    if (reduced) {
      els.forEach((t) => (t.style.transform = ""));
      return;
    }

    const state = els.map(() => ({ x: 0, half: 0 }));
    const measure = () => els.forEach((t, i) => (state[i].half = t.scrollWidth / 2));
    measure();
    const ro = new ResizeObserver(measure);
    els.forEach((t) => ro.observe(t));

    let raf = 0;
    let visible = false;
    let last = performance.now();
    let lastY = window.scrollY;
    let v = 0; // smoothed scroll velocity, px per 60fps frame
    let dir = 1;

    const loop = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (Math.abs(dy) > 0.5) dir = dy > 0 ? 1 : -1;
      v += (dy / (dt * 60) - v) * 0.12;

      const mag = Math.abs(v);
      const speed = BASE_SPEED * (1 + Math.min(mag * 0.4, 14));
      const lean = clamp(mag * 0.5, 0, 12);

      els.forEach((t, i) => {
        const s = state[i];
        const rowDir = (i === 0 ? -1 : 1) * dir;
        s.x += rowDir * speed * dt;
        if (s.half > 0) {
          if (s.x <= -s.half) s.x += s.half;
          else if (s.x > 0) s.x -= s.half;
        }
        t.style.transform = `translate3d(${s.x.toFixed(2)}px,0,0) skewX(${(-rowDir * lean).toFixed(2)}deg)`;
      });

      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) {
          last = performance.now();
          lastY = window.scrollY;
          raf = requestAnimationFrame(loop);
        }
      },
      { rootMargin: "120px 0px" }
    );
    io.observe(sec);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [reduced]);

  const rows = [
    { items: c.rowA, solid: true },
    { items: c.rowB, solid: false },
  ];

  return (
    <section ref={section} className="relative overflow-hidden py-28 md:py-40" aria-labelledby="kinetic-band-title">
      <div className="mb-10 flex items-start justify-between gap-6 px-5 sm:px-8 md:mb-14 lg:px-12">
        <h2 id="kinetic-band-title" className="label">
          {c.label}
        </h2>
        <p className="label hidden sm:block">{c.aside}</p>
      </div>

      <div className="flex flex-col gap-5 md:gap-8">
        {rows.map((row, ri) => {
          // One "half" holds the list twice so it always outruns the viewport.
          const half = [...row.items, ...row.items];
          return (
            <div
              key={ri}
              className={cn(
                "font-display overflow-hidden text-[clamp(2.75rem,8.5vw,8rem)]",
                rtl ? "py-[0.1em]" : "uppercase leading-[1] tracking-[-0.03em]",
                row.solid ? "bg-[var(--accent)] text-[var(--accent-ink)]" : "border-y border-[var(--border)]"
              )}
              style={rtl ? { lineHeight: 1.35 } : undefined}
              aria-hidden={ri > 0 ? true : undefined}
            >
              <div
                dir="ltr"
                ref={(el) => {
                  tracks.current[ri] = el;
                }}
                className={cn(styles.track, "py-[0.12em]")}
              >
                {[0, 1].map((copyIndex) =>
                  half.map((word, wi) => (
                    <span
                      key={`${copyIndex}-${wi}`}
                      className="flex shrink-0 items-center"
                      aria-hidden={copyIndex > 0 || wi >= row.items.length ? true : undefined}
                    >
                      <span dir={rtl ? "rtl" : "ltr"} className={cn("whitespace-nowrap px-[0.4em]", !row.solid && styles.outlineText)}>
                        {word}
                      </span>
                      <span
                        className={cn(
                          "inline-block h-[0.16em] w-[0.16em] shrink-0 rounded-full",
                          row.solid ? "bg-[var(--accent-ink)]" : "bg-[var(--accent)]"
                        )}
                      />
                    </span>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
