"use client";

import { useEffect, useRef } from "react";

/**
 * A dot that tracks the pointer exactly and a ring that trails it. Over links
 * and buttons the ring grows; elements with data-cursor="label" show that label.
 * Fine pointers only, no reduced motion. Everything is written straight to the
 * DOM (no React state), so moving the mouse never re-renders anything.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ok = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    document.documentElement.classList.add("has-cursor");

    const pos = { x: -100, y: -100 };
    const trail = { x: -100, y: -100 };
    let state = "";
    let raf = 0;

    const setState = (next: string, label: string) => {
      if (next === state) return;
      state = next;
      const b = bubble.current;
      if (!b) return;
      b.dataset.state = next;
      b.textContent = label;
    };

    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = (e.target as Element | null)?.closest("a, button, summary, [data-cursor]");
      const label = target?.getAttribute("data-cursor") ?? "";
      setState(label ? `label:${label}` : target ? "active" : "", label);
    };

    const loop = () => {
      trail.x += (pos.x - trail.x) * 0.2;
      trail.y += (pos.y - trail.y) * 0.2;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${trail.x}px,${trail.y}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  // dir="ltr" + physical left/top: in RTL an absolutely positioned box would
  // otherwise anchor to the right edge and the cursor would render off-screen.
  return (
    <div dir="ltr" aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-0 w-0 [html.has-cursor_&]:block">
      <div ref={dot} className="absolute left-0 top-0 will-change-transform">
        <div className="-ml-1 -mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
      </div>
      <div ref={ring} className="absolute left-0 top-0 will-change-transform">
        <div ref={bubble} className="cursor-bubble" />
      </div>
    </div>
  );
}
