"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/* ────────────────────────────────────────────────────────────────────────
   ONE SHARED SCROLL LOOP for every studio component.
   - A single passive scroll/resize listener schedules at most one rAF.
   - Subscribers only exist while their element is near the viewport
     (IntersectionObserver with a one-viewport margin), so off-screen
     sections cost nothing.
   - Geometry (document top + height) is measured once and re-measured only
     when something resizes; per frame we only read window.scrollY and
     innerHeight, so frames never force layout.
   ──────────────────────────────────────────────────────────────────────── */

type Tick = (y: number, vh: number) => void;
const subs = new Set<Tick>();
let raf = 0;
let listening = false;

function tick() {
  raf = 0;
  const y = window.scrollY;
  const vh = window.innerHeight;
  subs.forEach((fn) => fn(y, vh));
}
function request() {
  if (!raf) raf = requestAnimationFrame(tick);
}

/** Run `fn(scrollY, innerHeight)` once per animation frame in which the page scrolled or resized. */
export function subscribeScroll(fn: Tick) {
  subs.add(fn);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }
  request();
  return () => {
    subs.delete(fn);
    if (!subs.size && listening) {
      listening = false;
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}

/** Wakes the loop for one frame (e.g. after re-measuring geometry). */
export const requestScrollFrame = () => request();

/** Absolute document position of an element (one layout read — call on mount/resize only). */
export function docBox(el: Element) {
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, height: r.height };
}

/**
 * Calls `onVisible(true/false)` when `el` comes within one viewport of the
 * screen, and `measure()` whenever the element or the page changes size.
 * Returns a cleanup. This is the gate every scroll-driven component uses.
 */
export function watchSection(el: Element, onVisible: (on: boolean) => void, measure: () => void) {
  const io = new IntersectionObserver(([e]) => onVisible(e.isIntersecting), { rootMargin: "100% 0px 100% 0px" });
  io.observe(el);
  let pending = 0;
  const remeasure = () => {
    if (pending) return;
    pending = requestAnimationFrame(() => {
      pending = 0;
      measure();
      request();
    });
  };
  // Content above can grow (fonts, images), shifting our top: watch the page too.
  const ro = new ResizeObserver(remeasure);
  ro.observe(el);
  ro.observe(document.body);
  window.addEventListener("resize", remeasure);
  return () => {
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("resize", remeasure);
    if (pending) cancelAnimationFrame(pending);
  };
}

/** True when the visitor asked the OS for less motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/** True while a media query matches (false during SSR). */
export function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatch(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);
  return match;
}

/**
 * Calls `onProgress(p)` when the scroll progress of `ref` through the viewport
 * changes. p = 0 when the element's top reaches `start` (fraction of viewport
 * height from the top) and 1 when its bottom reaches `end`. Only runs while the
 * element is near the screen, never reads layout per frame, and skips frames
 * where p did not change. Pure function of scroll position, so it reverses.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
  { start = 1, end = 0, enabled = true }: { start?: number; end?: number; enabled?: boolean } = {}
) {
  const cb = useRef(onProgress);
  useEffect(() => {
    cb.current = onProgress;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let box = docBox(el);
    let last = -1;
    let unsub: (() => void) | null = null;
    const frame = (y: number, vh: number) => {
      const from = vh * start; // element top at this line → 0
      const to = vh * end - box.height; // element bottom at this line → 1
      const top = box.top - y;
      const p = Math.min(1, Math.max(0, (from - top) / (from - to)));
      const q = Math.round(p * 1000) / 1000;
      if (q === last) return;
      last = q;
      cb.current(q);
    };
    const stop = watchSection(
      el,
      (on) => {
        if (on && !unsub) unsub = subscribeScroll(frame);
        else if (!on && unsub) {
          unsub();
          unsub = null;
        }
      },
      () => {
        box = docBox(el);
        last = -1;
      }
    );
    // Settle once immediately so the initial state is right before any scroll.
    frame(window.scrollY, window.innerHeight);
    return () => {
      stop();
      unsub?.();
    };
  }, [ref, start, end, enabled]);
}
