"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { subscribeScroll, watchSection } from "@/components/studio/useScroll";

/**
 * Sticky stacking cards. On large screens each card pins under the navbar and
 * the next one slides over it; covered cards ease back (scale + dim) in step
 * with the scroll, so the motion is scrubbed and reversible. Small screens and
 * reduced motion get a plain list. Cards are passed as children.
 */
export function StackDeck({ children, label }: { children: ReactNode; label: string }) {
  const list = useRef<HTMLOListElement>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-deck-card]"));
    const inners = cards.map((c) => c.firstElementChild as HTMLElement);
    const shades = cards.map((c) => c.querySelector<HTMLElement>("[data-shade]"));
    // Natural (un-stuck) document tops, sticky offsets and heights — measured on resize only.
    let tops: number[] = [];
    let sticky: number[] = [];
    let heights: number[] = [];
    let listBottom = 0;
    const last = cards.map(() => -1);

    const measure = () => {
      const y = window.scrollY;
      const listBox = el.getBoundingClientRect();
      listBottom = listBox.bottom + y;
      let acc = listBox.top + y;
      tops = [];
      heights = [];
      sticky = cards.map((c, i) => {
        const cs = getComputedStyle(c);
        if (i > 0) acc += parseFloat(cs.marginTop) || 0;
        tops.push(acc);
        heights.push(c.offsetHeight);
        acc += c.offsetHeight;
        return parseFloat(cs.top) || 0;
      });
      last.fill(-1);
    };
    const reset = () => {
      inners.forEach((n) => (n.style.transform = ""));
      shades.forEach((n) => n && (n.style.opacity = "0"));
      last.fill(-1);
    };
    // On-screen top of card i at scroll y (sticky, but never past the end of the list).
    const screenTop = (i: number, y: number) => Math.min(Math.max(sticky[i], tops[i] - y), listBottom - y - heights[i]);

    const frame = (y: number) => {
      if (!mq.matches) return;
      for (let i = 0; i < cards.length - 1; i++) {
        const depth = Math.min(1, Math.max(0, 1 - (screenTop(i + 1, y) - screenTop(i, y)) / heights[i]));
        const d = Math.round(depth * 100) / 100;
        if (d === last[i]) continue;
        last[i] = d;
        inners[i].style.transform = d ? `scale(${1 - d * 0.06})` : "";
        const sh = shades[i];
        if (sh) sh.style.opacity = String(d * 0.6);
      }
    };

    measure();
    frame(window.scrollY);
    let unsub: (() => void) | null = null;
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
        measure();
        if (!mq.matches) reset();
      }
    );
    return () => {
      stop();
      unsub?.();
    };
  }, []);

  return (
    <ol ref={list} aria-label={label} className="relative space-y-6 lg:space-y-[12vh]">
      {items.map((child, i) => (
        <li key={i} data-deck-card className="lg:sticky" style={{ top: `calc(5.5rem + ${i * 0.9}rem)` }}>
          <div className="relative origin-top will-change-transform">
            {child}
            <span data-shade aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[var(--bg-primary)] opacity-0 will-change-[opacity]" />
          </div>
        </li>
      ))}
    </ol>
  );
}
