"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { requestScrollFrame, subscribeScroll, watchSection } from "@/components/studio/useScroll";

/**
 * Horizontally pinned gallery. On large screens the section pins and vertical
 * scrolling drives the track sideways (mirrored in RTL), with a progress line
 * and a slide counter. Small screens and reduced motion get a native,
 * swipeable scroll-snap row instead — no pinning, no hijacking.
 */
export function HRail({ children, label, hint }: { children: ReactNode; label: string; hint: string }) {
  const slides = Children.toArray(children);
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [pin, setPin] = useState(false);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setPin(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!pin || !sec || !tr) {
      if (tr) tr.style.transform = "";
      return;
    }
    const rtl = getComputedStyle(tr).direction === "rtl";
    let distance = 0;
    let top = 0;
    let lastX = NaN;
    let lastN = "";

    const measure = () => {
      distance = Math.max(0, tr.scrollWidth - tr.clientWidth);
      setHeight(window.innerHeight + distance);
      top = sec.getBoundingClientRect().top + window.scrollY;
      lastX = NaN;
    };
    // Per frame: scrollY only, transforms only, text only when it changes.
    const frame = (y: number) => {
      const p = distance ? Math.min(1, Math.max(0, (y - top) / distance)) : 0;
      const x = Math.round((rtl ? 1 : -1) * p * distance);
      if (x === lastX) return;
      lastX = x;
      tr.style.transform = `translate3d(${x}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const n = String(Math.min(slides.length, Math.round(p * (slides.length - 1)) + 1)).padStart(2, "0");
      if (n !== lastN && counter.current) counter.current.textContent = lastN = n;
    };
    measure();
    let unsub: (() => void) | null = null;
    const stop = watchSection(
      sec,
      (on) => {
        if (on && !unsub) unsub = subscribeScroll(frame);
        else if (!on && unsub) {
          unsub();
          unsub = null;
        }
      },
      measure
    );
    const ro = new ResizeObserver(() => {
      measure();
      requestScrollFrame();
    });
    ro.observe(tr);
    return () => {
      stop();
      unsub?.();
      ro.disconnect();
    };
  }, [pin, slides.length]);

  return (
    <div ref={section} className="relative" style={pin && height ? { height } : undefined}>
      <div className={cn(pin && "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden")}>
        <div className="mx-auto mb-6 flex w-full max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
          <p className="label" dir="ltr">
            <span ref={counter} className="text-[var(--text-primary)]">
              01
            </span>{" "}
            / {String(slides.length).padStart(2, "0")}
          </p>
          <p className="label">{hint}</p>
        </div>
        <div
          ref={track}
          role="list"
          aria-label={label}
          className={cn(
            "flex gap-5 sm:gap-6",
            pin
              ? "overflow-visible ps-[max(2rem,calc((100vw-1400px)/2+2rem))] pe-[max(2rem,calc((100vw-1400px)/2+2rem))] will-change-transform"
              : "snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-4 [scrollbar-width:thin] sm:scroll-px-8 sm:px-8"
          )}
        >
          {slides.map((s, i) => (
            <div role="listitem" key={i} className="w-[min(86vw,56rem)] shrink-0 snap-start">
              {s}
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 w-full max-w-[1400px] px-5 sm:px-8" aria-hidden="true">
          <div className={cn("h-px w-full bg-[var(--border)]", !pin && "hidden")}>
            <span ref={bar} className="block h-px origin-left bg-[var(--accent)] rtl:origin-right" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
