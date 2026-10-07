"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** One IntersectionObserver for every [data-reveal] on the page. Re-scans on navigation. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    const scan = () => document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    scan();
    // Catch content streamed in after the first scan.
    const t = window.setTimeout(scan, 600);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);
  return null;
}

/** Pulls its child toward the pointer while hovered (mouse only). Writes the transform directly — no re-renders. */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || prefersReduced()) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate3d(${(e.clientX - (r.left + r.width / 2)) * strength}px, ${(e.clientY - (r.top + r.height / 2)) * strength}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={cn("magnetic inline-block", className)}>
      {children}
    </div>
  );
}

/**
 * Marquee whose speed and skew react to scroll velocity. Runs in LTR DOM
 * order for a seamless loop, and only animates while on screen.
 */
export function VelocityMarquee({ children, baseSpeed = 40, className }: { children: ReactNode; baseSpeed?: number; className?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, velocity: 0, dir: -1 });

  useLenis((lenis) => {
    state.current.velocity = lenis.velocity;
    if (lenis.direction) state.current.dir = lenis.direction > 0 ? -1 : 1;
  });

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReduced()) return;
    let half = el.scrollWidth / 2;
    const ro = new ResizeObserver(() => (half = el.scrollWidth / 2));
    ro.observe(el);
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible) {
        const s = state.current;
        s.velocity *= 0.9;
        s.x += s.dir * (baseSpeed + Math.abs(s.velocity) * 6) * dt;
        if (s.x <= -half) s.x += half;
        if (s.x > 0) s.x -= half;
        const skew = Math.max(-12, Math.min(12, s.velocity * 0.6));
        el.style.transform = `translate3d(${s.x}px,0,0) skewX(${-skew}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [baseSpeed]);

  return (
    <div dir="ltr" className={cn("overflow-hidden", className)}>
      <div ref={track} className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
