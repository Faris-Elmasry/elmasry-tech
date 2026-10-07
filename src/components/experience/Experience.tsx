"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";
import { Cursor } from "@/components/experience/Cursor";
import { RevealObserver } from "@/components/motion/Interactive";

/**
 * Loads the WebGL field only after the page is fully interactive, so three.js
 * never competes with first paint or hydration:
 *  - desktop: on the first idle period after load
 *  - touch / small screens: on the first scroll or touch (saves battery & data)
 */
function DeferredParticles() {
  const [Field, setField] = useState<ComponentType | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only pages with a [data-shape] section (the home hero) need WebGL at all.
    if (Field || !document.querySelector("[data-shape]")) return;
    let cancelled = false;
    const load = () => {
      cleanup();
      import("@/components/three/ParticleField").then((m) => {
        if (!cancelled) setField(() => m.default);
      });
    };
    const lazyOnInteraction = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const events = ["scroll", "pointerdown", "touchstart", "keydown"] as const;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    function cleanup() {
      events.forEach((e) => window.removeEventListener(e, load));
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    }

    if (lazyOnInteraction) {
      events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    } else {
      const schedule = () => {
        if (typeof window.requestIdleCallback === "function") idleId = window.requestIdleCallback(load, { timeout: 2500 });
        else timeoutId = window.setTimeout(load, 1200);
      };
      if (document.readyState === "complete") schedule();
      else window.addEventListener("load", schedule, { once: true });
    }
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pathname, Field]);

  return Field ? <Field /> : null;
}

/** Smooth scroll (Lenis honours prefers-reduced-motion by default) + particle field + custom cursor. */
export function Experience({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.12, autoRaf: true, anchors: true, stopInertiaOnNavigate: true }}>
      <RevealObserver />
      <DeferredParticles />
      <Cursor />
      {children}
    </ReactLenis>
  );
}
