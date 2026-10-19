"use client";

import { useEffect, useRef } from "react";

/**
 * "Ember" cursor: a white-hot core with an orange glow, plus a trailing ring
 * that grows over links (and shows data-cursor labels). Fine pointers only,
 * no reduced motion. Built for zero scroll cost: transforms only, the glow
 * flickers via opacity on its own layer, and the animation loop runs only
 * while the ring is still catching up with the pointer.
 */
export function Cursor() {
  const core = useRef<HTMLDivElement>(null);
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
    let boost = 0; // little pulse on click

    const setState = (next: string, label: string) => {
      if (next === state) return;
      state = next;
      const b = bubble.current;
      if (!b) return;
      b.dataset.state = next;
      b.textContent = label;
      core.current?.classList.toggle("is-active", next !== "");
    };

    const loop = () => {
      trail.x += (pos.x - trail.x) * 0.2;
      trail.y += (pos.y - trail.y) * 0.2;
      boost *= 0.85;
      if (core.current) core.current.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) scale(${1 + boost * 0.6})`;
      if (ring.current) ring.current.style.transform = `translate3d(${trail.x}px,${trail.y}px,0)`;
      // Stop once the ring has caught up; the next pointer event restarts it.
      raf = Math.abs(pos.x - trail.x) + Math.abs(pos.y - trail.y) > 0.3 || boost > 0.01 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = (e.target as Element | null)?.closest("a, button, summary, [data-cursor]");
      const label = target?.getAttribute("data-cursor") ?? "";
      setState(label ? `label:${label}` : target ? "active" : "", label);
      kick();
    };
    const down = () => {
      boost = 1;
      kick();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  // dir="ltr" + physical left/top: in RTL an absolutely positioned box would
  // otherwise anchor to the right edge and the cursor would render off-screen.
  return (
    <div dir="ltr" aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-0 w-0 [html.has-cursor_&]:block">
      <div ref={ring} className="absolute left-0 top-0">
        <div ref={bubble} className="cursor-bubble" />
      </div>
      <div ref={core} className="ember-core absolute left-0 top-0">
        <i />
        <span />
      </div>
    </div>
  );
}
