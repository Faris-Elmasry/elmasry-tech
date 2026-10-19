import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/site";
import { hero, scenes } from "./copy";
import { DevicesController } from "./DevicesController";
import { Laptop, Phone } from "./Devices";
import { BootScreen, DashboardScreen, WebsiteScreen } from "./LaptopScreens";
import { FH, FW, LH, LW, SCENE_TOP, SCREEN_W, cameraTransform, ssrFitCss } from "./rig";

/**
 * "Scroll-built product" hero. Server component: all markup (copy, devices,
 * screen UIs, photos) is HTML on first paint; the only client JS is
 * <DevicesController>, which drives the scroll scenes.
 */
export function DevicesDemo({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const side = ar ? -1 : 1;

  const sceneStyle: CSSProperties = {
    left: (FW - LW) / 2,
    top: SCENE_TOP,
    width: LW,
    height: LH,
    transformStyle: "preserve-3d",
    transformOrigin: "50% 100%",
    transform: cameraTransform(0, side),
  };
  const titleCls = "title-sm font-bold tracking-[-0.03em] text-balance";

  return (
    <section aria-label={ar ? "بنعمل إيه" : "What we build"} className="relative" style={{ height: "760svh" }}>
      <style>{ssrFitCss("[data-devices-frame]")}</style>
      <DevicesController locale={locale} />
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Ambient backdrop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="bg-blueprint absolute inset-0 opacity-50"
            style={{
              maskImage: `radial-gradient(55% 60% at ${ar ? "30%" : "70%"} 55%, #000 0%, transparent 75%)`,
              WebkitMaskImage: `radial-gradient(55% 60% at ${ar ? "30%" : "70%"} 55%, #000 0%, transparent 75%)`,
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
        </div>

        <div className="relative mx-auto grid h-full max-w-[1440px] grid-rows-[auto_minmax(0,1fr)] gap-3 px-5 pb-8 pt-20 sm:px-8 sm:pt-24 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:grid-rows-1 lg:gap-12 lg:pb-10 lg:pt-24">
          {/* ── Copy column ── */}
          <div className="relative flex flex-col justify-center">
            <div className="grid [grid-template-areas:'stack']">
              {/* Hero */}
              <div data-copy className="[grid-area:stack] self-center">
                {/* One H1: the keyword line (small label style) + the big creative line. */}
                <h1>
                  <span className="label flex items-center gap-3">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    {hero.label[locale]}
                  </span>
                  <span
                    className={`mt-4 block font-display font-bold text-balance sm:mt-6 ${
                    ar
                      ? "text-[clamp(2rem,8vw,2.6rem)] leading-[1.3] lg:text-[clamp(2.6rem,3.7vw,3.9rem)]"
                      : "text-[clamp(2rem,8.2vw,2.75rem)] leading-[1.02] tracking-[-0.04em] lg:text-[clamp(2.6rem,3.75vw,4.1rem)]"
                  }`}
                  >
                    {hero.title[locale]}
                  </span>
                </h1>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] sm:mt-6 sm:text-lg">{hero.sub[locale]}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-8">
                  <Link
                    href={`/${locale}/contact`}
                    className="group/btn relative inline-flex h-12 select-none items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full bg-[var(--accent)] px-7 text-base font-medium text-[var(--accent-ink)] transition-[background-color,color,transform] duration-300 hover:bg-[var(--text-primary)] active:scale-[0.97] sm:h-14"
                  >
                    <span className="relative block overflow-hidden">
                      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:-translate-y-full">
                        {hero.cta[locale]}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:translate-y-0"
                      >
                        {hero.cta[locale]}
                      </span>
                    </span>
                    <ArrowUpRight className="rtl-flip h-4 w-4" />
                  </Link>
                  <span className="label hidden items-center gap-3 sm:flex">
                    <span className="relative h-8 w-px overflow-hidden bg-[var(--border-hover)]">
                      <span className="absolute inset-x-0 top-0 h-1/2 bg-[var(--accent)] motion-safe:animate-[scrollcue_1.8s_cubic-bezier(0.76,0,0.24,1)_infinite]" />
                    </span>
                    {hero.hint[locale]}
                  </span>
                </div>
              </div>

              {/* Scenes */}
              {scenes.map((s, i) => (
                <div key={s.key} data-copy className="[grid-area:stack] self-center" style={{ opacity: 0, visibility: "hidden" }}>
                  <p className="label flex items-center gap-3">
                    <span dir="ltr" className="font-mono text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-[var(--border-hover)]" />
                    {s.label[locale]}
                  </p>
                  <h2
                    className={`mt-4 sm:mt-6 ${titleCls} ${
                      ar
                        ? "text-[clamp(1.8rem,7.2vw,2.3rem)] lg:text-[clamp(2.3rem,3.2vw,3.3rem)]"
                        : "text-[clamp(1.85rem,7.4vw,2.4rem)] leading-[1.06] lg:text-[clamp(2.3rem,3.2vw,3.4rem)]"
                    }`}
                  >
                    {s.title[locale]}
                  </h2>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--text-muted)] sm:mt-5 sm:text-lg">{s.line[locale]}</p>
                </div>
              ))}
            </div>

            {/* Scene progress (desktop) */}
            <ol className="mt-14 hidden max-w-md grid-cols-4 gap-3 lg:grid" aria-hidden="true">
              {scenes.map((s) => (
                <li key={s.key}>
                  <span className="block h-px overflow-hidden bg-[var(--border-hover)]">
                    <span data-seg className="block h-full origin-left bg-[var(--accent)] rtl:origin-right" style={{ transform: "scaleX(0)" }} />
                  </span>
                  <span data-seglabel className={`label mt-3 block truncate ${ar ? "!text-[0.8rem]" : "!text-[0.65rem]"}`} style={{ opacity: 0.85 }}>
                    {s.label[locale]}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Device column ── */}
          <div data-k="col" aria-hidden="true" className="relative min-h-0 [contain:layout_style]">
            <div
              data-k="glow"
              className="pointer-events-none absolute inset-[-10%]"
              style={{ background: "radial-gradient(45% 42% at 50% 46%, rgba(255,91,31,.24), rgba(255,91,31,.06) 55%, transparent 75%)", opacity: 0.6 }}
            />
            {/* 3D laptop body */}
            <div
              data-k="frame"
              data-devices-frame=""
              className="absolute left-1/2 top-1/2"
              style={{
                width: FW,
                height: FH,
                // First paint (before JS): fit scale from server-rendered media queries below.
                transform: `translate(-50%,-50%) scale(min(var(--sw),var(--sh))) translate(${10 * side}px,8px)`,
                perspective: "3000px",
                perspectiveOrigin: "50% 45%",
                contain: "layout style",
              }}
            >
              <div data-k="scene" className="absolute" style={sceneStyle}>
                <Laptop />
              </div>
            </div>

            {/* Flat 2D laptop screen: laid out at real pixel size over the display */}
            <div
              data-k="lscreen"
              className="absolute overflow-hidden rounded-[3px] bg-black"
              style={{ visibility: "hidden", left: 0, top: 0, width: 1, height: 1, contain: "strict" }}
            >
              <div data-k="lzoom" className="relative" style={{ width: SCREEN_W, height: 396, zoom: 1, contain: "layout paint style" }}>
                <div data-k="boot" className="absolute inset-0" style={{ opacity: 0, contentVisibility: "hidden" }}>
                  <BootScreen />
                </div>
                <div data-k="scrWeb" className="absolute inset-0" style={{ opacity: 0, contentVisibility: "hidden" }}>
                  <WebsiteScreen locale={locale} />
                </div>
                <div data-k="scrDash" className="absolute inset-0" style={{ opacity: 0, contentVisibility: "hidden" }}>
                  <DashboardScreen locale={locale} />
                </div>
                <div data-k="scrDim" className="absolute inset-0 bg-black" style={{ opacity: 0 }} />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(120deg,rgba(255,255,255,.05) 0%,rgba(255,255,255,0) 40%)" }}
                />
              </div>
            </div>

            {/* Flat 2D phone */}
            <div data-k="phoneBox" className="absolute" style={{ visibility: "hidden", left: 0, top: 0, width: 160, height: 330, contain: "size layout style" }}>
              <Phone locale={locale} />
            </div>
          </div>
        </div>

        {/* Scene progress (mobile) */}
        <div className="absolute inset-x-5 bottom-4 grid grid-cols-4 gap-2 sm:inset-x-8 lg:hidden" aria-hidden="true">
          {scenes.map((s) => (
            <span key={s.key} className="block h-px overflow-hidden bg-[var(--border-hover)]">
              <span data-seg className="block h-full origin-left bg-[var(--accent)] rtl:origin-right" style={{ transform: "scaleX(0)" }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
