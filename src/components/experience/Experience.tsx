"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { Cursor } from "@/components/experience/Cursor";
import { RevealObserver } from "@/components/motion/Interactive";

/** Smooth scroll (Lenis honours prefers-reduced-motion by default) + scroll reveals + custom cursor. */
export function Experience({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.12, autoRaf: true, anchors: true, stopInertiaOnNavigate: true }}>
      <RevealObserver />
      <Cursor />
      {children}
    </ReactLenis>
  );
}
