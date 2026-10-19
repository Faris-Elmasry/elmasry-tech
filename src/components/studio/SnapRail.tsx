"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A swipeable row of cards (native scroll-snap — no scroll hijacking) with
 * previous/next buttons and a thin progress line. Works the same in RTL: the
 * row starts at the right and "next" moves leftwards.
 */
export function SnapRail({ children, label, prev, next }: { children: ReactNode; label: string; prev: string; next: string }) {
  const items = Children.toArray(children);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    let max = 0;
    let prev = -1;
    const measure = () => {
      max = el.scrollWidth - el.clientWidth;
      prev = -1;
      request();
    };
    const frame = () => {
      raf = 0;
      // scrollLeft is negative in RTL; the magnitude is what matters. No layout reads here.
      const p = max > 0 ? Math.min(1, Math.abs(el.scrollLeft) / max) : 1;
      const q = Math.round(p * 200) / 200;
      if (q === prev) return;
      prev = q;
      if (bar.current) bar.current.style.transform = `scaleX(${Math.max(0.08, q)})`;
      setEdge((e) => {
        const start = q < 0.01;
        const end = q > 0.99;
        return e.start === start && e.end === end ? e : { start, end };
      });
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    el.addEventListener("scroll", request, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("scroll", request);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 320) + 20;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step * (rtl ? -1 : 1), behavior: reduced ? "auto" : "smooth" });
  };

  const btn =
    "inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-hover)] transition-[background-color,color,opacity,border-color] duration-300 hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <div
        ref={track}
        role="list"
        aria-label={label}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 xl:scroll-px-[calc((100vw-1400px)/2+2rem)] xl:px-[calc((100vw-1400px)/2+2rem)] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((c, i) => (
          <div role="listitem" key={i} className="w-[78vw] max-w-[22rem] shrink-0 snap-start sm:w-[20rem]">
            {c}
          </div>
        ))}
      </div>
      <div className="mx-auto mt-8 flex w-full max-w-[1400px] items-center gap-6 px-5 sm:px-8">
        <div className="h-px flex-1 bg-[var(--border)]" aria-hidden="true">
          <span ref={bar} className="block h-px origin-left bg-[var(--accent)] rtl:origin-right" style={{ transform: "scaleX(0.08)" }} />
        </div>
        <div className="flex gap-2">
          <button type="button" className={btn} onClick={() => go(-1)} disabled={edge.start} aria-label={prev}>
            <ArrowLeft aria-hidden="true" className="h-5 w-5 rtl:-scale-x-100" />
          </button>
          <button type="button" className={cn(btn)} onClick={() => go(1)} disabled={edge.end} aria-label={next}>
            <ArrowRight aria-hidden="true" className="h-5 w-5 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
