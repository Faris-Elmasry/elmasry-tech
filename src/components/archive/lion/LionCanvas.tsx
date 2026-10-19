"use client";

import { useCallback, useEffect, useState, type ComponentType } from "react";

type RevealProps = { dark: string; fire: string; rtl: boolean; onReady?: () => void };

/**
 * Loads the WebGL reveal after first paint and fades it in over the static
 * (server-rendered) dark lion, so the hero never waits on JavaScript.
 */
export function LionCanvas({ rtl }: { rtl: boolean }) {
  const [Reveal, setReveal] = useState<ComponentType<RevealProps> | null>(null);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      import("@/components/archive/lion/LionReveal").then((m) => {
        if (!cancelled) setReveal(() => m.default);
      });
    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!Reveal) return null;
  return (
    <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
      <Reveal dark="/images/hero/lion-dark.webp" fire="/images/hero/lion-fire.webp" rtl={rtl} onReady={onReady} />
    </div>
  );
}
