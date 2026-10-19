"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { copy, type DemoLocale } from "./copy";
import { clamp, fitSize, sceneState, stickyProgress, useMeasure, useReducedMotion, useScrollFrame } from "./engine";
import styles from "./kinetic.module.css";

const IMG_W = 1600;
const IMG_H = 1000;
/** Vertical travel of a word during a hand-over, in % of its own height. */
const TRAVEL = 36;

/**
 * 02 — Word theatre. A pinned stage shows one giant word at a time with a real
 * photo masked inside the letters. Words hand over with the page's single
 * motion: the old word rises and is wiped away upward while the new one rises
 * in from below behind the same wipe line. Caption and index use the same move.
 */
export function WordTheatre({ locale }: { locale: DemoLocale }) {
  const { label, scenes } = copy[locale].theatre;
  const rtl = locale === "ar";
  const n = scenes.length;
  const reduced = useReducedMotion();

  const root = useRef<HTMLElement>(null);
  const stageBox = useRef<HTMLDivElement>(null);
  const sceneEls = useRef<(HTMLDivElement | null)[]>([]);
  const photoEls = useRef<(HTMLSpanElement | null)[]>([]);
  const captionEls = useRef<(HTMLParagraphElement | null)[]>([]);
  const barEls = useRef<(HTMLSpanElement | null)[]>([]);
  const digits = useRef<HTMLSpanElement>(null);
  const boxes = useRef<{ w: number; h: number }[]>([]);

  const refresh = useScrollFrame(() => {
    const r = root.current;
    if (!r) return;
    const s = stickyProgress(r) * n;
    let indexPos = 0;

    for (let i = 0; i < n; i++) {
      let { enter, exit, local } = sceneState(i, s, n);
      if (reduced) {
        // Same sequence, no movement: instant swaps at the boundaries.
        enter = i === 0 || s >= i ? 1 : 0;
        exit = i < n - 1 && s >= i + 1 ? 1 : 0;
        local = 0.5;
      }
      if (i > 0) indexPos += enter;

      const visible = enter > 0.001 && exit < 0.999;
      const el = sceneEls.current[i];
      if (el) {
        el.style.visibility = visible ? "visible" : "hidden";
        if (visible) {
          el.style.transform = `translate3d(0,${((1 - enter) * TRAVEL - exit * TRAVEL).toFixed(3)}%,0)`;
          el.style.clipPath = `inset(${((1 - enter) * 100).toFixed(3)}% 0 ${(exit * 100).toFixed(3)}% 0)`;
        }
      }

      // Photo inside the letters: slow push-in + drift while the word is on stage.
      const ph = photoEls.current[i];
      const box = boxes.current[i];
      if (visible && ph && box) {
        const zoom = 1.06 + 0.22 * local;
        const scale = Math.max(box.w / IMG_W, box.h / IMG_H) * zoom;
        const bw = IMG_W * scale;
        const bh = IMG_H * scale;
        const [fx, fy] = scenes[i].focus;
        const px = clamp(fx + (0.5 - local) * 0.35);
        const py = clamp(fy + (local - 0.5) * 0.7);
        ph.style.backgroundSize = `${bw.toFixed(1)}px ${bh.toFixed(1)}px`;
        ph.style.backgroundPosition = `${((box.w - bw) * px).toFixed(1)}px ${((box.h - bh) * py).toFixed(1)}px`;
      }

      const cap = captionEls.current[i];
      if (cap) {
        cap.style.visibility = visible ? "visible" : "hidden";
        cap.style.transform = `translate3d(0,${((1 - enter) * 100 - exit * 100).toFixed(2)}%,0)`;
        cap.style.opacity = String(enter * (1 - exit));
      }

      const bar = barEls.current[i];
      if (bar) bar.style.transform = `scaleX(${clamp(s - i).toFixed(4)})`;
    }

    if (digits.current) digits.current.style.transform = `translate3d(0,${(-indexPos).toFixed(4)}em,0)`;
  });

  // Each word fills the stage width; very short words are capped by height.
  useMeasure(stageBox, () => {
    const b = stageBox.current;
    if (!b) return;
    const lh = rtl ? 1.52 : 1.12;
    const maxByHeight = (b.clientHeight * 0.86) / lh;
    photoEls.current.forEach((ph, i) => {
      const wrap = sceneEls.current[i];
      if (!ph || !wrap) return;
      const size = fitSize([ph], b.clientWidth * 0.99, maxByHeight, 32);
      if (size) wrap.style.fontSize = `${size}px`;
      boxes.current[i] = { w: ph.offsetWidth, h: ph.offsetHeight };
    });
    refresh();
  });

  return (
    <section
      ref={root}
      className="relative"
      style={{ height: `${n * 100 + 60}svh` }}
      aria-labelledby="kinetic-theatre-title"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pb-6 pt-24 sm:px-8 md:pb-10 md:pt-28 lg:px-12">
        {/* Fixed chrome: label + rolling index */}
        <div className="flex items-start justify-between gap-6">
          <h2 id="kinetic-theatre-title" className="label">
            {label}
          </h2>
          <p className="label flex items-baseline text-[var(--text-primary)] tabular-nums" dir="ltr" aria-hidden="true">
            <span>0</span>
            <span className="relative inline-block h-[1em] overflow-hidden leading-none">
              <span ref={digits} className="flex flex-col will-change-transform">
                {scenes.map((_, i) => (
                  <span key={i} className="block h-[1em] leading-none">
                    {i + 1}
                  </span>
                ))}
              </span>
            </span>
            <span className="mx-2 text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-muted)]">0{n}</span>
          </p>
        </div>

        {/* The stage */}
        <div ref={stageBox} className="relative min-h-0 flex-1">
          {scenes.map((sc, i) => (
            <div key={sc.word} className="absolute inset-0 flex items-center justify-center">
              <div
                ref={(el) => {
                  sceneEls.current[i] = el;
                }}
                className={cn(
                  styles.scene,
                  "font-display relative shrink-0 text-[clamp(3rem,15vw,16rem)]",
                  rtl ? "" : "uppercase tracking-[-0.04em]"
                )}
                style={{
                  lineHeight: rtl ? 1.4 : 1,
                  clipPath: i === 0 ? "inset(0% 0 0% 0)" : "inset(100% 0 0% 0)",
                  visibility: i === 0 ? "visible" : "hidden",
                }}
              >
                <span
                  ref={(el) => {
                    photoEls.current[i] = el;
                  }}
                  className={styles.photoWord}
                  style={{ backgroundImage: `url(${sc.image})`, filter: sc.tone }}
                >
                  {sc.word}
                </span>
                <span className={styles.ghostWord} aria-hidden="true">
                  {sc.word}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed chrome: caption + progress */}
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
          <div className="relative h-[3em] overflow-hidden text-[0.98rem] leading-[1.5] md:h-[1.5em] md:text-[1.1rem]">
            {scenes.map((sc, i) => (
              <p
                key={sc.word}
                ref={(el) => {
                  captionEls.current[i] = el;
                }}
                className="absolute inset-x-0 top-0 text-pretty text-[var(--text-primary)]"
                style={{ visibility: i === 0 ? "visible" : "hidden" }}
              >
                <span className="text-[var(--accent)]">{rtl ? "← " : "→ "}</span>
                {sc.caption}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-2" aria-hidden="true">
            {scenes.map((sc, i) => (
              <span key={sc.word} className="relative h-[2px] w-10 overflow-hidden bg-[var(--border-hover)] md:w-16">
                <span
                  ref={(el) => {
                    barEls.current[i] = el;
                  }}
                  className="absolute inset-0 bg-[var(--accent)]"
                  style={{ transform: "scaleX(0)", transformOrigin: rtl ? "right" : "left" }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
