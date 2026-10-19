"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "Before → after" comparison. Both states are stacked; the "before" layer is
 * clipped from the reading-start edge up to the handle. Drag anywhere on the
 * frame (mouse or touch), or focus it and use the arrow keys — a real range
 * input underneath keeps it accessible. On first view the handle nudges once
 * to show it can move (skipped with reduced motion).
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
  label,
  dir = "ltr",
  className,
}: {
  before: ReactNode;
  after: ReactNode;
  beforeLabel: string;
  afterLabel: string;
  /** Accessible name of the slider. */
  label: string;
  dir?: "ltr" | "rtl";
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);
  const [focus, setFocus] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const id = useId();
  const rtl = dir === "rtl";

  // One gentle hint when the comparison first scrolls into view.
  useEffect(() => {
    const el = frame.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t1 = 0;
    let t2 = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        t1 = window.setTimeout(() => setPos(66), 450);
        t2 = window.setTimeout(() => setPos(50), 1250);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const fromPointer = (clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let p = ((clientX - r.left) / r.width) * 100;
    if (rtl) p = 100 - p;
    setPos(Math.min(100, Math.max(0, p)));
  };

  // `pos` = share of the frame (from the reading-start edge) that shows "before".
  const clip = rtl ? `inset(0 0 0 ${100 - pos}%)` : `inset(0 ${100 - pos}% 0 0)`;
  const ease = drag ? "duration-0" : "duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <div className={cn("select-none", className)}>
      <div
        ref={frame}
        className="relative cursor-ew-resize touch-pan-y overflow-hidden rounded-[1.5rem] border border-[var(--border-hover)] bg-[var(--bg-secondary)]"
        onPointerDown={(e) => {
          setDrag(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => drag && fromPointer(e.clientX)}
        onPointerUp={() => setDrag(false)}
        onPointerCancel={() => setDrag(false)}
      >
        <div className="relative">{after}</div>
        <div aria-hidden="true" className={cn("absolute inset-0 transition-[clip-path]", ease)} style={{ clipPath: clip }}>
          {before}
        </div>

        {/* Labels sit in the top corners, above both layers */}
        <span className="pointer-events-none absolute start-4 top-4 rounded-full bg-[#2b2620]/90 px-3 py-1 text-sm font-medium text-[#f3ecdf]">{beforeLabel}</span>
        <span className="pointer-events-none absolute end-4 top-4 rounded-full bg-[var(--accent)] px-3 py-1 text-sm font-medium text-[var(--accent-ink)]">{afterLabel}</span>

        {/* Handle */}
        <div aria-hidden="true" className={cn("pointer-events-none absolute inset-y-0 w-0 transition-[inset-inline-start]", ease)} style={{ insetInlineStart: `${pos}%` }}>
          <span className="absolute inset-y-0 -start-px w-0.5 bg-[var(--text-primary)]" />
          <span
            className={cn(
              "absolute start-0 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)] ltr:-translate-x-1/2 rtl:translate-x-1/2",
              focus && "outline-2 outline-offset-4 outline-[var(--accent)]"
            )}
          >
            <ChevronsLeftRight className="h-5 w-5" />
          </span>
        </div>
      </div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(pos)}
        dir={dir}
        onChange={(e) => setPos(Number(e.target.value))}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="sr-only"
        aria-valuetext={`${beforeLabel} ${Math.round(pos)}% · ${afterLabel} ${100 - Math.round(pos)}%`}
      />
    </div>
  );
}
