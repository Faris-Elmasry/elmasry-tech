"use client";

import { useState, type ComponentType } from "react";
import { Power } from "lucide-react";
import type { Locale } from "@/lib/site";

type ComputerProps = { locale: Locale; label: string };

let preload: Promise<{ default: ComponentType<ComputerProps> }> | null = null;
const loadComputer = () => (preload ??= import("@/components/three/Computer3D"));

/**
 * The 3D computer boots only when the visitor presses "Power on" — three.js
 * never loads on page view (zero cost for first paint / TBT), and the boot
 * itself becomes a small moment of interaction. The module is prefetched on
 * hover/focus so the boot feels instant.
 */
export function LazyComputer(props: ComputerProps) {
  const [Comp, setComp] = useState<ComponentType<ComputerProps> | null>(null);
  const [booting, setBooting] = useState(false);
  const ar = props.locale === "ar";

  const powerOn = () => {
    setBooting(true);
    loadComputer().then((m) => setComp(() => m.default));
  };

  return (
    <div className="relative aspect-[4/3] w-full">
      {Comp ? (
        <Comp {...props} />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Static monitor silhouette in the same footprint as the 3D scene */}
          <div aria-hidden="true" className="absolute left-1/2 top-[14%] h-[50%] w-[66%] -translate-x-1/2 rounded-2xl border border-[var(--border-hover)] bg-[#0d0c0b] shadow-[0_30px_80px_-30px_rgba(255,91,31,0.25)]">
            <div className="absolute inset-3 rounded-lg bg-[radial-gradient(ellipse_at_center,#16130f,#060505)]" />
          </div>
          <div aria-hidden="true" className="absolute left-1/2 top-[64%] h-[8%] w-[7%] -translate-x-1/2 bg-[#1d1d20]" />
          <div aria-hidden="true" className="absolute left-1/2 top-[76%] h-[9%] w-[70%] -translate-x-1/2 rounded-xl border border-[var(--border)] bg-[#141416]" />
          <button
            type="button"
            onClick={powerOn}
            onPointerEnter={loadComputer}
            onFocus={loadComputer}
            disabled={booting}
            className="relative z-10 -mt-[10%] inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-6 py-3.5 font-medium text-[var(--accent-ink)] shadow-[0_0_40px_rgba(255,91,31,0.45)] transition-transform hover:scale-105 active:scale-95 disabled:opacity-80"
          >
            <Power className={booting ? "h-5 w-5 animate-spin" : "h-5 w-5"} />
            {booting ? (ar ? "جارٍ التشغيل…" : "Booting…") : ar ? "شغّل الجهاز" : "Power on"}
          </button>
          <p className="label relative z-10 mt-4">{ar ? "ثم اكتب help على لوحة مفاتيحك" : "then type help on your keyboard"}</p>
        </div>
      )}
    </div>
  );
}
