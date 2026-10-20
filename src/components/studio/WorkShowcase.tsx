"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, Smartphone } from "lucide-react";
import type { WorkItem } from "@/lib/work";
import type { Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/**
 * Muted preview (or its poster). Plays only while `playing`; restarts from the
 * top each time it becomes active. `onProgress` gets 0…1 while it plays.
 */
function Media({
  item,
  playing,
  onEnded,
  onProgress,
  loop = false,
}: {
  item: WorkItem;
  playing: boolean;
  onEnded?: () => void;
  onProgress?: (p: number) => void;
  loop?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const progress = useRef(onProgress);
  useEffect(() => {
    progress.current = onProgress;
  });

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (!playing) {
      v.pause();
      return;
    }
    v.currentTime = 0;
    v.play().catch(() => {});
    let raf = 0;
    const tick = () => {
      if (v.duration) progress.current?.(v.currentTime / v.duration);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  if (!item.preview) return <div className="bg-blueprint absolute inset-0" />;
  return (
    <video
      ref={video}
      className="absolute inset-0 h-full w-full object-cover object-top"
      poster={item.preview.poster}
      muted
      playsInline
      loop={loop}
      preload="none"
      onEnded={onEnded}
      aria-hidden="true"
      tabIndex={-1}
    >
      {item.preview.webm && <source src={item.preview.webm} type="video/webm" />}
      <source src={item.preview.mp4} type="video/mp4" />
    </video>
  );
}

function host(item: WorkItem) {
  try {
    return new URL(item.url ?? item.demoUrl ?? "").host.replace(/^www\./, "");
  } catch {
    return item.slug;
  }
}

/** Browser window: a slim bar, then the page at exactly 16:10 — the video's own shape, so nothing is cropped. */
function Browser({ item, children }: { item: WorkItem; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1rem] border border-white/10 bg-[#0e0e10] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex h-9 items-center gap-3 border-b border-white/[0.06] bg-[#141416] px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span dir="ltr" className="mx-auto truncate rounded-md bg-white/[0.05] px-3 py-0.5 text-[0.72rem] text-[var(--text-muted)]">
          {host(item)}
        </span>
        <span className="w-[2.6rem]" aria-hidden="true" />
      </div>
      <div className="relative aspect-[16/10]">{children}</div>
    </div>
  );
}

/** Phone: fills the height it is given; the page starts under a real status bar. */
function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full" style={{ aspectRatio: "9 / 19" }}>
      <div className="absolute inset-0 rounded-[2.4rem] border border-white/15 bg-[#0c0c0d] p-[0.45rem] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.95rem] bg-black">
          <div dir="ltr" className="relative flex h-7 shrink-0 items-center justify-between px-6 text-[0.62rem] font-semibold text-white">
            <span>9:41</span>
            <span className="absolute left-1/2 top-1.5 h-[1.1rem] w-[28%] -translate-x-1/2 rounded-full bg-[#0c0c0d] ring-1 ring-white/5" />
            <span className="flex items-center gap-1" aria-hidden="true">
              <svg width="14" height="9" viewBox="0 0 14 9" fill="currentColor"><rect x="0" y="6" width="2.5" height="3" rx=".5" /><rect x="3.8" y="4" width="2.5" height="5" rx=".5" /><rect x="7.6" y="2" width="2.5" height="7" rx=".5" /><rect x="11.4" y="0" width="2.5" height="9" rx=".5" /></svg>
              <svg width="20" height="9" viewBox="0 0 20 9" fill="none"><rect x=".5" y=".5" width="16" height="8" rx="2" stroke="currentColor" opacity=".5" /><rect x="2" y="2" width="12" height="5" rx="1" fill="currentColor" /><rect x="17.5" y="3" width="1.5" height="3" rx=".5" fill="currentColor" opacity=".5" /></svg>
            </span>
          </div>
          <div className="relative min-h-0 flex-1">{children}</div>
          <span className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/60" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function Actions({ item, locale }: { item: WorkItem; locale: Locale }) {
  const isAr = locale === "ar";
  const link = "inline-flex h-11 items-center gap-2 rounded-full px-5 text-[0.95rem] font-medium transition-colors duration-300";
  const ghost = cn(link, "border border-[var(--border-hover)] hover:border-[var(--text-primary)]");
  const solid = cn(link, "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--text-primary)]");
  return (
    <div className="flex flex-wrap items-center gap-2">
      {item.url && (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={solid}>
          {isAr ? "زور الموقع" : "Visit"}
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
        </a>
      )}
      {item.demoUrl && (
        <a href={item.demoUrl} target="_blank" rel="noopener noreferrer" className={item.url ? ghost : solid}>
          <Play aria-hidden="true" className="h-4 w-4" />
          {isAr ? "جرّب الديمو" : "Try the demo"}
        </a>
      )}
      {item.appStore && (
        <a href={item.appStore} target="_blank" rel="noopener noreferrer" className={ghost}>
          <Smartphone aria-hidden="true" className="h-4 w-4" />
          App Store
        </a>
      )}
      {item.playStore && (
        <a href={item.playStore} target="_blank" rel="noopener noreferrer" className={ghost}>
          <Smartphone aria-hidden="true" className="h-4 w-4" />
          Google Play
        </a>
      )}
    </div>
  );
}

function meta(item: WorkItem, locale: Locale) {
  return (item.tags?.[locale] ?? []).join(" · ");
}

/** Glow + faint grid behind the device: one surface for every project, so edges and spacing always match. */
const stage =
  "relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,91,31,0.10),transparent_60%),var(--bg-card)]";

/**
 * "See it live". Desktop: the projects listed on one side, a large stage on the
 * other playing the selected one (a sharp, slow scroll through the real site).
 * When a video ends the next project starts; a thin bar shows how far along it is.
 * Phones: a swipeable row of cards; the card in view plays.
 * Videos never load until they should play (preload="none"), nothing plays
 * off-screen, and reduced motion shows posters only.
 */
export function WorkShowcase({ items, locale }: { items: WorkItem[]; locale: Locale }) {
  const isAr = locale === "ar";
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [wide, setWide] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      setReduced(rm.matches);
      setWide(lg.matches);
    };
    sync();
    rm.addEventListener("change", sync);
    lg.addEventListener("change", sync);
    const el = root.current;
    const io = el ? new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 }) : null;
    if (el && io) io.observe(el);
    return () => {
      rm.removeEventListener("change", sync);
      lg.removeEventListener("change", sync);
      io?.disconnect();
    };
  }, []);

  // Phones: the card that is mostly in view is the one that plays.
  useEffect(() => {
    const el = rail.current;
    if (!el || wide) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-work-card]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setMobileIndex(Number((e.target as HTMLElement).dataset.workCard));
      },
      { root: el, threshold: 0.6 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [wide, items.length]);

  // Reset the progress bars whenever another project is picked.
  useEffect(() => {
    bars.current.forEach((b) => b && (b.style.transform = "scaleX(0)"));
  }, [active]);

  const canPlay = inView && !reduced;
  const next = () => setActive((i) => (i + 1) % items.length);

  return (
    <div ref={root}>
      {/* Desktop: list + stage */}
      <div className="hidden gap-6 lg:grid lg:grid-cols-12">
        <ol className="flex flex-col lg:col-span-4">
          {items.map((item, i) => {
            const on = active === i;
            return (
              <li key={item.slug} className="border-t border-[var(--border)] last:border-b">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                  className="group flex w-full cursor-pointer items-baseline gap-4 py-5 text-start"
                >
                  <span className={cn("label transition-colors duration-300", on ? "text-[var(--accent)]" : "text-[var(--text-subtle)]")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "title-sm block text-2xl font-bold transition-colors duration-300",
                        on ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                      )}
                    >
                      {item.name[locale]}
                    </span>
                    <span className="mt-1 block text-sm text-[var(--text-subtle)]">{meta(item, locale)}</span>
                  </span>
                </button>
                {/* The open project: what it is, links, and how far its preview has played */}
                <div className={cn(`grid transition-[grid-template-rows] duration-500 ${EASE}`, on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="min-h-0 overflow-hidden" inert={!on}>
                    <div className="ps-10 pb-6">
                      <p className="leading-relaxed text-[var(--text-muted)]">{item.summary[locale]}</p>
                      <div className="mt-5">
                        <Actions item={item} locale={locale} />
                        {item.demoNote && <p className="mt-2 text-sm text-[var(--text-muted)]">{item.demoNote[locale]}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <span className="relative block h-px overflow-hidden" aria-hidden="true">
                  <span
                    ref={(el) => {
                      bars.current[i] = el;
                    }}
                    className="absolute inset-0 origin-left bg-[var(--accent)] rtl:origin-right"
                    style={{ transform: "scaleX(0)" }}
                  />
                </span>
              </li>
            );
          })}
        </ol>

        <div className={cn(stage, "grid min-h-[28rem] p-4 lg:col-span-8")}>
          {items.map((item, i) => {
            const on = active === i;
            return (
              <div
                key={item.slug}
                aria-hidden={!on}
                className={cn(
                  `[grid-area:1/1] transition-[opacity,transform] duration-700 ${EASE}`,
                  item.type === "app" ? "flex justify-center" : "self-start",
                  on ? "opacity-100" : "pointer-events-none scale-[0.985] opacity-0"
                )}
              >
                {item.type === "app" ? (
                  <Phone>
                    <Media item={item} playing={wide && on && canPlay} onEnded={next} onProgress={(p) => bars.current[i]?.style.setProperty("transform", `scaleX(${p})`)} />
                  </Phone>
                ) : (
                  <Browser item={item}>
                    <Media item={item} playing={wide && on && canPlay} onEnded={next} onProgress={(p) => bars.current[i]?.style.setProperty("transform", `scaleX(${p})`)} />
                  </Browser>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Phones / tablets: swipeable cards, same stage look */}
      <div
        ref={rail}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <article key={item.slug} data-work-card={i} className="flex w-[84vw] max-w-[30rem] shrink-0 snap-start flex-col">
            <div className={cn(stage, "p-3", item.type === "app" && "flex h-[28rem] justify-center")}>
              {item.type === "app" ? (
                <Phone>
                  <Media item={item} playing={!wide && mobileIndex === i && canPlay} loop />
                </Phone>
              ) : (
                <Browser item={item}>
                  <Media item={item} playing={!wide && mobileIndex === i && canPlay} loop />
                </Browser>
              )}
            </div>
            <div className="px-1 pt-5">
              <p className="label text-[var(--text-subtle)]">
                <span className="text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="ms-3">{meta(item, locale)}</span>
              </p>
              <h3 className="title-sm mt-2 text-xl font-bold">{item.name[locale]}</h3>
              <p className="mt-1 leading-relaxed text-[var(--text-muted)]">{item.summary[locale]}</p>
              <div className="mt-5">
                <Actions item={item} locale={locale} />
                {item.demoNote && <p className="mt-2 text-sm text-[var(--text-muted)]">{item.demoNote[locale]}</p>}
              </div>
            </div>
          </article>
        ))}
      </div>
      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              aria-label={isAr ? `${item.name.ar} (${i + 1} من ${items.length})` : `${item.name.en} (${i + 1} of ${items.length})`}
              aria-current={mobileIndex === i}
              onClick={() => rail.current?.querySelector<HTMLElement>(`[data-work-card="${i}"]`)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })}
              className="flex h-8 min-w-8 items-center justify-center"
            >
              <span className={cn("block h-2 rounded-full transition-all duration-300", mobileIndex === i ? "w-6 bg-[var(--accent)]" : "w-2 bg-[var(--border-hover)]")} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
