"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ComponentType } from "react";
import { useLenis } from "lenis/react";
import type { Locale } from "@/lib/site";
import { cn } from "@/lib/utils";
import { COPY } from "./copy";
import { EndCopy, HeroCopy, StationText } from "./CopyBlocks";
import { STOP_PROGRESS } from "./layout";
import { Poster } from "./Poster";
import { StaticWorld } from "./StaticWorld";
import type { WorldSceneProps } from "./WorldScene";

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const m = window.matchMedia(REDUCED);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const getReduced = () => window.matchMedia(REDUCED).matches;
const getReducedOnServer = () => false;

/** Scroll progress at which each service station is centred (matches the camera stops). */
const STATION_P = STOP_PROGRESS.slice(1, 5);
/** Step bar targets: the idea (start) + the four stations. */
const STEP_P = STOP_PROGRESS.slice(0, 5);
/** Past this point the closing gate takes over. */
const END_P = 0.9;

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Fade a block and drive its children's stagger through one CSS variable. */
function setBlock(el: HTMLElement | null, opacity: number, k: number, hide: boolean) {
  if (!el) return;
  el.style.opacity = opacity.toFixed(3);
  el.style.setProperty("--k", k.toFixed(3));
  if (hide) el.style.visibility = opacity < 0.01 ? "hidden" : "visible";
}

// Copy column: bottom on narrow screens (above the step bar), start side on wide ones.
const blockCls =
  "pointer-events-none absolute z-30 max-lg:inset-x-0 max-lg:bottom-0 max-lg:px-5 max-lg:pb-[calc(5.25rem+env(safe-area-inset-bottom))] sm:max-lg:px-8 lg:inset-y-0 lg:start-0 lg:flex lg:w-[min(50rem,52vw)] lg:items-center lg:pe-10 lg:ps-[clamp(2rem,5.5vw,6.5rem)] lg:pb-16 lg:pt-16";

/**
 * "Immersive 3D world" demo — a one-minute guided tour for business owners.
 * A tall scroll track with a sticky full-viewport stage: scroll progress
 * (0..1) flies the camera from "your idea" through four plain-language
 * stations to a closing gate. HTML copy sits above the 3D on its own
 * gradient so it is always readable. three.js is lazy-loaded after first
 * paint; reduced motion gets a static, stacked layout instead.
 */
export function WorldDemo({ locale }: { locale: Locale }) {
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedOnServer);
  const copy = COPY[locale];
  const ar = locale === "ar";

  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const stationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const fillRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const hintGone = useRef(false);

  const [Scene, setScene] = useState<ComponentType<WorldSceneProps> | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const onReady = useCallback(() => setStatus("ready"), []);
  const onError = useCallback(() => setStatus("failed"), []);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const r = track.getBoundingClientRect();
    const span = Math.max(1, r.height - window.innerHeight);
    const p = Math.min(1, Math.max(0, -r.top / span));
    progressRef.current = p;

    setBlock(heroRef.current, 1 - smoothstep(0.02, 0.075, p), p / 0.075, true);
    stationRefs.current.forEach((el, i) => {
      const local = (p - STATION_P[i]) / 0.1;
      setBlock(el, 1 - smoothstep(0.5, 0.95, Math.abs(local)), local, false);
    });
    setBlock(endRef.current, smoothstep(END_P, 0.965, p), Math.min(0, (p - 1) / 0.07), true);

    // One-time hint: once the visitor has started scrolling it never comes back.
    if (p > 0.03) hintGone.current = true;
    const hint = heroRef.current?.querySelector<HTMLElement>("[data-world-hint]");
    if (hint && hintGone.current) {
      hint.style.opacity = "0";
      hint.style.visibility = "hidden";
    }

    // Step bar.
    const active = p >= END_P ? -1 : Math.min(4, Math.round(p / 0.2));
    stepRefs.current.forEach((b, i) => {
      if (!b) return;
      const state = active === -1 || i < active ? "done" : i === active ? "active" : "todo";
      if (b.dataset.state !== state) {
        b.dataset.state = state;
        if (state === "active") b.setAttribute("aria-current", "step");
        else b.removeAttribute("aria-current");
      }
    });
    // The step bar belongs to the tour: it fades out at the closing gate and is
    // gone once the tour section scrolls away (never over the footer).
    const nav = navRef.current;
    if (nav) {
      const o = r.bottom < window.innerHeight - 1 ? 0 : 1 - smoothstep(0.93, 0.98, p);
      nav.style.opacity = o.toFixed(3);
      nav.style.visibility = o < 0.01 ? "hidden" : "visible";
    }
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${Math.min(1, p / 0.8).toFixed(4)})`;
  }, []);

  const lenis = useLenis(update, [update]);

  useEffect(() => {
    if (reduced) return;
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduced, update]);

  // Lazy-load three.js once the page has painted and gone idle.
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const load = () => {
      import("./WorldScene").then(
        (m) => {
          if (!cancelled) setScene(() => m.default);
        },
        () => {
          if (!cancelled) setStatus("failed");
        },
      );
    };
    let idle = 0;
    let timer = 0;
    if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(load, { timeout: 900 });
    else timer = window.setTimeout(load, 200);
    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
    };
  }, [reduced]);

  const scrollToProgress = (p: number, duration: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const y = top + p * (track.offsetHeight - window.innerHeight);
    if (lenis) lenis.scrollTo(y, { duration, easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (reduced) return <StaticWorld copy={copy} locale={locale} />;

  const ready = status === "ready";

  return (
    <div ref={trackRef} className="relative" style={{ height: "660svh" }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[var(--bg-primary)]">
        <Poster ar={ar} className={cn("transition-opacity duration-[1600ms] ease-out", ready && "opacity-0")} />
        {Scene && status !== "failed" ? (
          <div className={cn("absolute inset-0 transition-opacity duration-[1600ms] ease-out", ready ? "opacity-100" : "opacity-0")}>
            <Scene ar={ar} progressRef={progressRef} onReady={onReady} onError={onError} />
          </div>
        ) : null}

        {/* Readability scrims: the copy never sits directly on the 3D. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24" style={{ background: "linear-gradient(to bottom, rgba(10,10,11,0.7), transparent)" }} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 start-0 z-20 hidden w-[58%] lg:block"
          style={{
            background: `linear-gradient(to ${ar ? "left" : "right"}, rgba(10,10,11,0.96) 0%, rgba(10,10,11,0.88) 40%, rgba(10,10,11,0.4) 70%, rgba(10,10,11,0) 100%)`,
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden h-40 lg:block" style={{ background: "linear-gradient(to top, rgba(10,10,11,0.85), transparent)" }} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[68%] lg:hidden"
          style={{ background: "linear-gradient(to top, #0a0a0b 0%, rgba(10,10,11,0.95) 42%, rgba(10,10,11,0.7) 64%, rgba(10,10,11,0) 100%)" }}
        />

        {/* Intro: your idea */}
        <div ref={heroRef} className={blockCls}>
          <HeroCopy copy={copy} locale={locale} onEnter={() => scrollToProgress(STATION_P[0], 2.6)} />
        </div>

        {/* Stations */}
        {copy.stations.map((s, i) => (
          <div
            key={s.name}
            ref={(el) => {
              stationRefs.current[i] = el;
            }}
            className={blockCls}
            style={{ opacity: 0 }}
          >
            <StationText copy={copy} station={s} index={i + 1} />
          </div>
        ))}

        {/* Closing CTA */}
        <div ref={endRef} className={blockCls} style={{ opacity: 0, visibility: "hidden" }}>
          <EndCopy copy={copy} locale={locale} onAgain={() => scrollToProgress(0, 3.4)} />
        </div>

        {/* Step bar: Idea · Website · App · One screen · Assistant */}
        <nav
          ref={navRef}
          aria-label={copy.stepsNav}
          className="absolute inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 lg:inset-x-auto lg:bottom-7 lg:start-[clamp(2rem,5.5vw,6.5rem)]"
        >
          <ol className="relative flex items-stretch rounded-[22px] border border-[var(--border)] bg-[rgba(16,16,18,0.82)] p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md lg:rounded-full">
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-[10%] top-[24px] h-px bg-white/10 lg:hidden">
              <span ref={fillRef} className={cn("absolute inset-0 bg-[var(--accent)]", ar ? "origin-right" : "origin-left")} style={{ transform: "scaleX(0)" }} />
            </span>
            {copy.steps.map((name, i) => (
              <li key={name} className="relative flex flex-1 lg:flex-none">
                <button
                  type="button"
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  data-state={i === 0 ? "active" : "todo"}
                  aria-current={i === 0 ? "step" : undefined}
                  onClick={() => scrollToProgress(STEP_P[i], 2.2)}
                  className="group flex w-full flex-col items-center gap-1.5 rounded-full px-1 py-1.5 text-[0.7rem] font-medium whitespace-nowrap text-[var(--text-subtle)] transition-colors duration-300 hover:text-[var(--text-primary)] data-[state=active]:text-[var(--text-primary)] data-[state=done]:text-[#c9c4bb] sm:text-[0.78rem] lg:flex-row lg:gap-2.5 lg:px-4 lg:py-2.5 lg:text-[0.9rem] lg:data-[state=active]:bg-[rgba(255,91,31,0.14)]"
                >
                  <span
                    aria-hidden="true"
                    className="relative grid h-[22px] w-[22px] place-items-center rounded-full border border-white/25 bg-[var(--bg-primary)] text-[0.65rem] font-bold transition-all duration-300 group-data-[state=active]:border-[var(--accent)] group-data-[state=active]:bg-[var(--accent)] group-data-[state=active]:text-[var(--accent-ink)] group-data-[state=active]:shadow-[0_0_14px_rgba(255,91,31,0.7)] group-data-[state=done]:border-[var(--accent)] group-data-[state=done]:text-[var(--accent)] lg:h-6 lg:w-6"
                  >
                    {i === 0 ? "•" : i}
                  </span>
                  {name}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
