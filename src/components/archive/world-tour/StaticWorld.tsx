import type { CSSProperties } from "react";
import type { Locale } from "@/lib/site";
import { WORDS, type WorldCopy } from "./copy";
import { EndCopy, HeroCopy, StationText } from "./CopyBlocks";
import { PREVIEW, panelSize, type PanelKind } from "./layout";
import { PanelView } from "./Panels";
import { Poster } from "./Poster";

/** A panel at a CSS-variable scale (`--s`), occupying its scaled footprint in flow. */
function ScaledPanel({ kind, ar }: { kind: PanelKind; ar: boolean }) {
  const { w, h } = panelSize(kind);
  return (
    <div className="relative shrink-0" style={{ width: `calc(${w}px * var(--s))`, height: `calc(${h}px * var(--s))` }}>
      <div className="absolute left-0 top-0" style={{ width: w, height: h, transform: "scale(var(--s))", transformOrigin: "0 0" }}>
        <PanelView kind={kind} ar={ar} />
      </div>
    </div>
  );
}

/** Still version of the extruded 3D word: stacked text-shadows instead of depth layers. */
const extrudedText: CSSProperties = {
  color: "#f1ede5",
  textShadow: [1, 2, 3, 4, 5, 6, 7, 8]
    .map((i) => `${-i * 0.6}px ${i}px 0 ${i < 3 ? "#ff5b1f" : i < 6 ? "#a8380c" : "#3a1206"}`)
    .concat("0 14px 40px rgba(255,91,31,0.35)")
    .join(", "),
};

function BigWord({ text, ar }: { text: string; ar: boolean }) {
  return (
    <p
      aria-hidden="true"
      className={`select-none text-balance font-bold leading-[1.05] ${ar ? "font-display text-[clamp(2.4rem,9vw,4.4rem)]" : "font-display text-[clamp(2.2rem,7vw,4.2rem)] uppercase tracking-[-0.02em]"}`}
      style={extrudedText}
    >
      {text}
    </p>
  );
}

/** Still light bulb for the "your idea" intro (no WebGL in this mode). */
function StillBulb() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-[320px] w-[260px]">
      <div className="absolute inset-[-30%] rounded-full" style={{ background: "radial-gradient(closest-side at 50% 42%, rgba(255,170,90,0.42) 0%, rgba(255,91,31,0.12) 55%, transparent 100%)" }} />
      <svg viewBox="0 0 260 320" className="relative h-full w-full">
        <defs>
          <radialGradient id="world-still-glass" cx="50%" cy="38%" r="55%">
            <stop offset="0" stopColor="#fff4dc" stopOpacity="0.95" />
            <stop offset="0.35" stopColor="#ffc27a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ff8a4c" stopOpacity="0.08" />
          </radialGradient>
          <linearGradient id="world-still-metal" x1="0" x2="1">
            <stop offset="0" stopColor="#8d877e" />
            <stop offset="0.45" stopColor="#efe9df" />
            <stop offset="1" stopColor="#6f6a62" />
          </linearGradient>
        </defs>
        <path d="M130 14c-52 0-90 38-90 88 0 34 18 54 34 74 10 13 16 26 18 40h76c2-14 8-27 18-40 16-20 34-40 34-74 0-50-38-88-90-88z" fill="url(#world-still-glass)" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
        <path d="M88 60c-14 12-22 28-22 44" stroke="rgba(255,255,255,0.7)" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M112 214l-6-70M148 214l6-70" stroke="#a49d93" strokeWidth="2" />
        <path d="M106 144c4-10 8 10 12 0s8 10 12 0 8 10 12 0 8 10 12 0" stroke="#fff3d6" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="90" y="214" width="80" height="14" rx="4" fill="url(#world-still-metal)" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="93" y={230 + i * 14} width="74" height="10" rx="5" fill="url(#world-still-metal)" />
        ))}
        <path d="M100 286h60l-10 16h-40z" fill="#121214" />
        <rect x="120" y="302" width="20" height="8" rx="3" fill="#b08d57" />
      </svg>
    </div>
  );
}

/**
 * Reduced-motion version: no camera flight. A still composition up top, then
 * each station as a normal stacked section with its panels laid flat.
 */
export function StaticWorld({ copy, locale }: { copy: WorldCopy; locale: Locale }) {
  const ar = locale === "ar";
  const words = WORDS[locale];
  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <Poster ar={ar} />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: `linear-gradient(to ${ar ? "left" : "right"}, rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.6) 45%, transparent 75%)` }}
        />
        <div className="relative mx-auto grid min-h-[100svh] max-w-[1400px] items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
          <HeroCopy copy={copy} locale={locale} enterHref="#world-1" />
          <div aria-hidden="true" className="flex flex-col items-center gap-6">
            <BigWord text={words[0]} ar={ar} />
            <StillBulb />
            <div className="[--s:0.7]" style={{ transform: `rotate(${ar ? 2 : -2}deg)` }}>
              <ScaledPanel kind="idea-note" ar={ar} />
            </div>
          </div>
        </div>
      </section>

      {copy.stations.map((station, i) => (
        <section
          key={station.name}
          id={`world-${i + 1}`}
          aria-labelledby={`world-${i + 1}-title`}
          className="relative mx-auto grid max-w-[1400px] scroll-mt-20 items-center gap-10 border-t border-[var(--border)] px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:py-28"
        >
          <StationText copy={copy} station={station} index={i + 1} headingId={`world-${i + 1}-title`} />
          <div className="flex flex-col gap-6 lg:items-end">
            <BigWord text={words[i + 1]} ar={ar} />
            <div aria-hidden="true" className="flex flex-wrap items-end gap-4 [--s:0.5] sm:[--s:0.62] lg:justify-end lg:[--s:0.7]">
              {PREVIEW[i].map((kind) => (
                <ScaledPanel key={kind} kind={kind} ar={ar} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="relative overflow-hidden border-t border-[var(--border)]">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(50% 60% at 50% 100%, rgba(255,91,31,0.14), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-32">
          <EndCopy copy={copy} locale={locale} />
        </div>
      </section>
    </div>
  );
}
