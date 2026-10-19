"use client";

import { useEffect, useRef } from "react";

type Flake = { x: number; y: number; r: number; vy: number; sway: number; phase: number; color: string; alpha: number };

// The lion's palette: icy steel/white from the dark photo, embers from the fire one.
const ICE = ["#dbe8ff", "#a9c4ec", "#7fa3d6", "#ffffff"];
const EMBER = ["#ff8a3d", "#ff5b1f", "#ffb36b"];

/**
 * Falling "snow" over the hero in the lion's colours: mostly icy flakes with a
 * share of orange embers, three depth layers (size, speed, softness) and a
 * gentle wind sway. Canvas 2D, pauses off-screen / in hidden tabs, static
 * under reduced motion.
 */
export function HeroSnow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let flakes: Flake[] = [];
    const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

    const make = (y?: number): Flake => {
      const depth = Math.random(); // 0 far … 1 near
      const ember = Math.random() < 0.45;
      return {
        x: Math.random() * W,
        y: y ?? Math.random() * H,
        r: 0.8 + depth * depth * 3,
        vy: 12 + depth * 38, // px / s
        sway: 6 + depth * 18,
        phase: Math.random() * Math.PI * 2,
        color: ember ? pick(EMBER) : pick(ICE),
        alpha: 0.25 + depth * 0.6,
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const count = Math.round(Math.min(340, Math.max(90, (W * H) / 4500)));
      flakes = Array.from({ length: count }, () => make());
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      for (const f of flakes) {
        const x = f.x + Math.sin(t * 0.6 + f.phase) * f.sway;
        const g = ctx.createRadialGradient(x, f.y, 0, x, f.y, f.r * 2.2);
        g.addColorStop(0, f.color);
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, f.y, f.r * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    if (reduced) {
      draw(0);
      return () => ro.disconnect();
    }

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    let prev = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!visible || document.hidden) return;
      const wind = Math.sin(now / 4000) * 8;
      for (const f of flakes) {
        f.y += f.vy * dt;
        f.x += wind * dt * (f.r / 2);
        if (f.y - f.r * 3 > H) Object.assign(f, make(-10));
        if (f.x < -20) f.x = W + 10;
        else if (f.x > W + 20) f.x = -10;
      }
      draw(now / 1000);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] h-full w-full" />;
}
