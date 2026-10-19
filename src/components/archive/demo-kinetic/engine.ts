"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { useLenis } from "lenis/react";

/* ──────────────────────────────────────────────────────────────
   Kinetic demo — shared motion engine.
   One easing curve, one progress model, one frame loop for every
   scene, so the whole page speaks the same motion language:
   things ENTER FROM BELOW and EXIT UPWARD, wiping bottom → top.
   ────────────────────────────────────────────────────────────── */

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Maps v from [a, b] to [0, 1], clamped. */
export const range = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

/** The one scrub curve used everywhere (easeInOutCubic). */
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** CSS easing for one-shot (load / hover) motion — matches --ease-out-expo. */
export const EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

/** 0 → 1 while a tall section's sticky child travels through the viewport. */
export function stickyProgress(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  const travel = r.height - window.innerHeight;
  if (travel <= 0) return r.top <= 0 ? 1 : 0;
  return clamp(-r.top / travel);
}

/**
 * Scene timeline for a pinned sequence of `count` scenes driven by s ∈ [0, count].
 * Boundaries sit at integer s; each hand-over takes `window` scene-units.
 * Returns how far scene i has entered (0..1) and exited (0..1), already eased.
 */
export function sceneState(i: number, s: number, count: number, win = 0.42) {
  const half = win / 2;
  const enter = i === 0 ? 1 : ease(range(s, i - half, i + half));
  const exit = i === count - 1 ? 0 : ease(range(s, i + 1 - half, i + 1 + half));
  // Local 0..1 time across the whole time this scene is on screen (for pans).
  const local = range(s, i - half, i + 1 + half);
  return { enter, exit, local };
}

const REDUCED = "(prefers-reduced-motion: reduce)";

/** prefers-reduced-motion as a live value (SSR: false). */
export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(REDUCED);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(REDUCED).matches,
    () => false
  );
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs `frame` on every Lenis scroll tick (and on resize / font load, and as a
 * native-scroll fallback). Skips duplicate calls within the same scroll
 * position. `frame` must write styles straight to DOM refs — never set state.
 * Returns `refresh()` to force a frame (e.g. after re-measuring).
 */
export function useScrollFrame(frame: () => void) {
  const frameRef = useRef(frame);
  useIsoLayoutEffect(() => {
    frameRef.current = frame;
  });

  const last = useRef({ y: Number.NaN, h: 0, w: 0 });

  const run = useCallback((force: boolean) => {
    const y = window.scrollY;
    const h = window.innerHeight;
    const w = window.innerWidth;
    const l = last.current;
    if (!force && y === l.y && h === l.h && w === l.w) return;
    l.y = y;
    l.h = h;
    l.w = w;
    frameRef.current();
  }, []);

  useLenis(() => run(false), [run]);

  useEffect(() => {
    let raf = 0;
    const schedule = (force: boolean) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => run(force));
    };
    const onScroll = () => schedule(false);
    const onResize = () => schedule(true);
    schedule(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    let alive = true;
    document.fonts?.ready.then(() => alive && schedule(true));
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [run]);

  return useCallback(() => run(true), [run]);
}

/**
 * Font size (px) at which every visible element in `els` fits `target` px wide,
 * measured from layout widths (transforms are ignored). Elements must be
 * `white-space: nowrap` inline-blocks inheriting the size being tested.
 */
export function fitSize(els: (HTMLElement | null)[], target: number, maxPx: number, minPx = 16) {
  let size = Number.POSITIVE_INFINITY;
  for (const el of els) {
    if (!el || !el.offsetWidth) continue;
    const current = parseFloat(window.getComputedStyle(el).fontSize);
    size = Math.min(size, (current * target) / el.offsetWidth);
  }
  return Number.isFinite(size) ? clamp(size, minPx, maxPx) : null;
}

/** Re-runs `measure` whenever `el` resizes and once fonts have loaded. */
export function useMeasure(ref: React.RefObject<HTMLElement | null>, measure: () => void) {
  const measureRef = useRef(measure);
  useIsoLayoutEffect(() => {
    measureRef.current = measure;
  });
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    measureRef.current();
    const ro = new ResizeObserver(() => measureRef.current());
    ro.observe(el);
    let alive = true;
    document.fonts?.ready.then(() => alive && measureRef.current());
    return () => {
      alive = false;
      ro.disconnect();
    };
  }, [ref]);
}
