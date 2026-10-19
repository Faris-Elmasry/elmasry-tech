"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Canvas } from "./Canvas";
import { chat, dash, hero, scenes, type DemoLocale } from "./copy";
import { createEngine, createTyper, STORY_SVH, type StoryEngine } from "./engine";

/** Progress rail (4 steps) sharing its slot with the "scroll" cue shown on the hero. */
function StepBand({ locale, className }: { locale: DemoLocale; className: string }) {
  return (
    <div className={`relative h-14 shrink-0 items-end ${className}`}>
      <div data-a="cue" className="label col-start-1 row-start-1 flex items-center gap-3 self-end pb-0.5">
        <span className="relative block h-8 w-px overflow-hidden bg-[var(--border-hover)]">
          <span className="absolute inset-x-0 top-0 block h-1/2 animate-[scrollcue_1.8s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-[var(--accent)]" />
        </span>
        {hero.cue[locale]}
      </div>
      <div data-a="steps" className="col-start-1 row-start-1 flex gap-3 self-end sm:gap-4" style={{ opacity: 0, visibility: "hidden" }}>
        {scenes.map((s, i) => (
          <div key={s.kicker.en} className="min-w-0 flex-1">
            <div className="relative h-[2px] overflow-hidden rounded-full bg-[var(--border)]">
              <span data-a="step-fill" className="absolute inset-0 block origin-left bg-[var(--accent)] rtl:origin-right" style={{ transform: "scaleX(0)" }} />
            </div>
            <p
              data-a="step-label"
              className="mt-2.5 flex items-center gap-2 text-[11px] text-[var(--text-muted)] transition-colors duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] data-[on=true]:text-[var(--text-primary)]"
            >
              <span className="font-mono text-[var(--accent)]">0{i + 1}</span>
              <span className="hidden truncate font-mono sm:inline rtl:font-sans">{s.rail[locale]}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Pinned scrollytelling stage: a tall section with a sticky 100svh stage.
 * Copy lives in its own column (start side on desktop, top on mobile); the
 * canvas is fitted into the remaining area by the engine, so it never covers text.
 */
export function CodeStory({ locale }: { locale: DemoLocale }) {
  const rootRef = useRef<HTMLElement>(null);
  const engineRef = useRef<StoryEngine | null>(null);
  const rtl = locale === "ar";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const typer = createTyper(root);
    const engine = createEngine(root, {
      rtl,
      reduced: mq.matches,
      userText: chat.user[locale],
      replyText: chat.reply[locale],
      kpiTargets: dash.kpiTargets,
      onLeaveHero: () => typer.finish(),
    });
    engineRef.current = engine;

    const refresh = () => {
      engine.measure();
      engine.update(true);
    };
    refresh();
    if (mq.matches) typer.finish();
    else typer.start(500);

    const ro = new ResizeObserver(refresh);
    root.querySelectorAll<HTMLElement>('[data-a="stage"], [data-a="copy-cell"], [data-a="area"]').forEach((el) => ro.observe(el));
    const onResize = () => engine.update(true);
    const onScroll = () => engine.update();
    const onMotion = () => {
      engine.setReduced(mq.matches);
      if (mq.matches) typer.finish();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", onMotion);
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) refresh();
    });

    return () => {
      alive = false;
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMotion);
      typer.stop();
      engineRef.current = null;
    };
  }, [locale, rtl]);

  // Lenis drives the scrub; the native listener above is only a fallback.
  useLenis(() => engineRef.current?.update());

  return (
    <section ref={rootRef} className="relative" style={{ height: `${STORY_SVH}svh` }}>
      <div data-a="stage" className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Backdrop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_50%,#000_20%,transparent_75%)] rtl:[mask-image:radial-gradient(ellipse_70%_60%_at_40%_50%,#000_20%,transparent_75%)]" />
          <div className="absolute bottom-0 end-0 h-[80%] w-[70%] bg-[radial-gradient(closest-side,rgba(255,91,31,0.07),transparent)]" />
        </div>

        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col px-5 pb-3 pt-[5.25rem] sm:px-8 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:pb-6 lg:pt-24">
          <div className="flex min-h-0 flex-col lg:h-full">
            <div data-a="copy-cell" className="relative grid lg:flex-1 lg:items-center">
              {/* Hero */}
              <div data-a="copy" className="col-start-1 row-start-1 self-start lg:self-center">
                <p className="label flex items-center gap-3">
                  <span className="block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {hero.label[locale]}
                </p>
                <h1 className="mt-4 font-display text-[clamp(2rem,8.2vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.035em] text-balance lg:mt-6 lg:text-[clamp(2.6rem,4.2vw,4.25rem)]">
                  {hero.titleA[locale]}
                  <span className="text-[var(--accent)]">{hero.titleB[locale]}</span>
                </h1>
                <p className="mt-4 max-w-[34rem] text-[15px] leading-relaxed text-[var(--text-muted)] text-pretty lg:mt-6 lg:text-lg">{hero.sub[locale]}</p>
                <div className="mt-5 lg:mt-9">
                  <Button href={`/${locale}/contact`} size="lg" className="h-12 px-6 lg:h-14 lg:px-7" rightIcon={<ArrowUpRight className="rtl-flip h-4 w-4" />}>
                    {hero.cta[locale]}
                  </Button>
                </div>
              </div>

              {/* Scenes 01–04 */}
              {scenes.map((s, i) => (
                <div key={s.kicker.en} data-a="copy" className="col-start-1 row-start-1 self-start lg:self-center" style={{ opacity: 0, visibility: "hidden" }}>
                  <p className="label flex items-center gap-3">
                    <span className="font-mono text-[var(--accent)]">0{i + 1}</span>
                    <span className="block h-px w-10 bg-[var(--border-hover)]" />
                    {s.kicker[locale]}
                  </p>
                  <h2 className="mt-4 font-display text-[clamp(1.9rem,7vw,2.6rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance lg:mt-5 lg:text-[clamp(2.3rem,3.4vw,3.5rem)]">
                    {s.title[locale]}
                  </h2>
                  <p className="mt-3 max-w-[30rem] text-[15px] leading-relaxed text-[var(--text-muted)] text-pretty lg:mt-5 lg:text-lg">{s.line[locale]}</p>
                  <ul className="mt-6 hidden flex-wrap gap-2 lg:flex">
                    {s.tags.map((t) => (
                      <li key={t} className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[11px] text-[var(--text-muted)]">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <StepBand locale={locale} className="hidden lg:grid" />
          </div>

          {/* Free area the canvas is fitted into */}
          <div data-a="area" aria-hidden="true" className="min-h-0 flex-1 lg:mb-14" />
          <StepBand locale={locale} className="grid lg:hidden" />
        </div>

        <Canvas locale={locale} />
      </div>
    </section>
  );
}
