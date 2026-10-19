"use client";

import { useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { copy, type DemoLocale } from "./copy";
import { clamp, range, stickyProgress, useScrollFrame } from "./engine";

type RGB = [number, number, number];
const DIM: RGB = [58, 56, 52];
const BONE: RGB = [237, 234, 227];
const SIGNAL: RGB = [255, 91, 31];

const mix = (a: RGB, b: RGB, t: number) =>
  `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`;

/** How many words are "in transition" at once — a soft reading edge. */
const SOFT = 2.2;

/**
 * 04 — Manifesto. A pinned paragraph whose words light up one by one as you
 * scroll — from dim to bone, key words to signal orange. Whole words only, so
 * Arabic letters always stay joined. Fully reversible.
 */
export function Manifesto({ locale }: { locale: DemoLocale }) {
  const c = copy[locale].manifesto;
  const rtl = locale === "ar";
  const tokens = useMemo(
    () => c.text.split(" ").map((raw) => ({ text: raw.replace(/\*/g, ""), key: raw.includes("*") })),
    [c.text]
  );

  const root = useRef<HTMLElement>(null);
  const words = useRef<(HTMLSpanElement | null)[]>([]);
  const lastLit = useRef<number[]>([]);
  const counter = useRef<HTMLSpanElement>(null);

  useScrollFrame(() => {
    const r = root.current;
    if (!r) return;
    const p = stickyProgress(r);
    const n = tokens.length;
    const t = range(p, 0.05, 0.85) * (n + SOFT);
    tokens.forEach((tok, i) => {
      const el = words.current[i];
      if (!el) return;
      const lit = Math.round(clamp((t - i) / SOFT) * 100) / 100;
      if (lastLit.current[i] === lit) return;
      lastLit.current[i] = lit;
      el.style.color = mix(DIM, tok.key ? SIGNAL : BONE, lit);
    });
    if (counter.current) counter.current.textContent = `${String(Math.round(range(p, 0.05, 0.85) * 100)).padStart(2, "0")}%`;
  });

  return (
    <section ref={root} className="relative h-[280svh]" aria-labelledby="kinetic-manifesto-title">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pb-6 pt-24 sm:px-8 md:pb-10 md:pt-28 lg:px-12">
        <div className="flex items-start justify-between gap-6">
          <h2 id="kinetic-manifesto-title" className="label">
            {c.label}
          </h2>
          <p className="label flex items-center gap-3">
            <span className="hidden sm:inline">{c.aside}</span>
            <span ref={counter} dir="ltr" className="tabular-nums text-[var(--text-primary)]">
              00%
            </span>
          </p>
        </div>

        <div className="flex min-h-0 flex-1 items-center">
          <p
            className={cn(
              "title-sm mx-auto w-full max-w-[1180px] text-pretty",
              rtl
                ? "text-[clamp(1.45rem,min(3.3vw,5.4svh),3.25rem)]"
                : "text-[clamp(1.55rem,min(3.7vw,6.6svh),3.75rem)] leading-[1.1] tracking-[-0.02em]"
            )}
            style={rtl ? { lineHeight: 1.6 } : undefined}
          >
            {tokens.map((tok, i) => (
              <span key={i}>
                <span
                  ref={(el) => {
                    words.current[i] = el;
                  }}
                  style={{ color: mix(DIM, tok.key ? SIGNAL : BONE, 0) }}
                >
                  {tok.text}
                </span>
                {i < tokens.length - 1 ? " " : null}
              </span>
            ))}
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-[1180px] justify-end">
          <p className="label">{c.signature}</p>
        </div>
      </div>
    </section>
  );
}
