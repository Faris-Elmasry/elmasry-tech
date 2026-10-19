"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play, Smartphone } from "lucide-react";
import type { WorkItem } from "@/lib/work";
import type { Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";
/** flex-grow of the open card (the others are 1). Keep in sync with `grow-[3.4]` below. */
const GROW = 3.4;

/** Muted looping preview (or its poster) — plays only when told to. */
function Media({ item, playing, sizes }: { item: WorkItem; playing: boolean; sizes: string }) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  if (!item.preview) {
    return <div className="bg-blueprint absolute inset-0" />;
  }
  return item.preview.video ? (
    <video
      ref={video}
      className="absolute inset-0 h-full w-full object-cover object-top"
      src={item.preview.video}
      poster={item.preview.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  ) : (
    <Image src={item.preview.poster} alt="" fill sizes={sizes} className="object-cover object-top" />
  );
}

/** Realistic frame per project type: browser (website), phone (app), laptop (system). */
function Device({ item, playing, sizes }: { item: WorkItem; playing: boolean; sizes: string }) {
  const host = (() => {
    try {
      return new URL(item.url ?? item.demoUrl ?? "").host;
    } catch {
      return item.slug;
    }
  })();

  if (item.type === "app") {
    return (
      <div className="relative h-full max-h-full w-auto" style={{ aspectRatio: "9 / 19" }}>
        <div className="absolute inset-0 rounded-[2.2rem] border border-[var(--border-hover)] bg-[#0c0c0d] p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.8rem] bg-[#101012]">
            {/* status bar, like a real phone: the page starts under it, so the notch hides nothing */}
            <div dir="ltr" className="relative flex h-7 shrink-0 items-center justify-between bg-black px-5 text-[0.6rem] font-semibold text-white">
              <span>9:41</span>
              <span className="absolute left-1/2 top-1.5 h-4 w-16 -translate-x-1/2 rounded-full bg-[#0c0c0d] ring-1 ring-white/5" />
              <span className="flex items-center gap-1" aria-hidden="true">
                <svg width="14" height="9" viewBox="0 0 14 9" fill="currentColor"><rect x="0" y="6" width="2.5" height="3" rx=".5" /><rect x="3.8" y="4" width="2.5" height="5" rx=".5" /><rect x="7.6" y="2" width="2.5" height="7" rx=".5" /><rect x="11.4" y="0" width="2.5" height="9" rx=".5" /></svg>
                <svg width="20" height="9" viewBox="0 0 20 9" fill="none"><rect x=".5" y=".5" width="16" height="8" rx="2" stroke="currentColor" opacity=".5" /><rect x="2" y="2" width="12" height="5" rx="1" fill="currentColor" /><rect x="17.5" y="3" width="1.5" height="3" rx=".5" fill="currentColor" opacity=".5" /></svg>
              </span>
            </div>
            <div className="relative min-h-0 flex-1">
              <Media item={item} playing={playing} sizes="240px" />
            </div>
            <span className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/60" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  }

  const browser = (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-[var(--border-hover)] bg-[#0e0e10] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[#141416] px-3 py-2">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#3a3a3f]" />
          <span className="h-2 w-2 rounded-full bg-[#3a3a3f]" />
          <span className="h-2 w-2 rounded-full bg-[#3a3a3f]" />
        </span>
        <span dir="ltr" className="mx-auto max-w-[70%] truncate rounded-full bg-[#1d1d20] px-3 py-0.5 text-[0.7rem] text-[var(--text-muted)]">
          {host}
        </span>
      </div>
      <div className="relative min-h-0 flex-1">
        <Media item={item} playing={playing} sizes={sizes} />
      </div>
    </div>
  );

  if (item.type === "system") {
    // Laptop: the browser sits in a screen bezel above a thin base.
    return (
      <div className="flex h-full w-full flex-col items-center">
        <div className="min-h-0 w-full flex-1 rounded-t-xl border border-b-0 border-[var(--border-hover)] bg-[#0b0b0c] p-2">{browser}</div>
        <div className="h-2.5 w-[108%] rounded-b-xl bg-gradient-to-b from-[#2a2a2e] to-[#141416]" />
      </div>
    );
  }
  return browser;
}

function Actions({ item, locale }: { item: WorkItem; locale: Locale }) {
  const isAr = locale === "ar";
  const link = "inline-flex h-11 items-center gap-2 rounded-full px-5 text-[0.95rem] font-medium transition-colors duration-300";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {item.url && (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={cn(link, "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--text-primary)]")}>
          {isAr ? "زور الموقع" : "Visit"}
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
        </a>
      )}
      {item.demoUrl && (
        <a
          href={item.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(link, item.url ? "border border-[var(--border-hover)] hover:border-[var(--text-primary)]" : "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--text-primary)]")}
        >
          <Play aria-hidden="true" className="h-4 w-4" />
          {isAr ? "جرّب الديمو" : "Try the demo"}
        </a>
      )}
      {item.appStore && (
        <a href={item.appStore} target="_blank" rel="noopener noreferrer" className={cn(link, "border border-[var(--border-hover)] hover:border-[var(--text-primary)]")}>
          <Smartphone aria-hidden="true" className="h-4 w-4" />
          App Store
        </a>
      )}
      {item.playStore && (
        <a href={item.playStore} target="_blank" rel="noopener noreferrer" className={cn(link, "border border-[var(--border-hover)] hover:border-[var(--text-primary)]")}>
          <Smartphone aria-hidden="true" className="h-4 w-4" />
          Google Play
        </a>
      )}
    </div>
  );
}

function Badge({ kind, locale }: { kind: WorkItem["kind"]; locale: Locale }) {
  const isAr = locale === "ar";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-medium",
        kind === "client" ? "bg-[var(--accent)] text-[var(--accent-ink)]" : "border border-[var(--border-hover)] text-[var(--text-primary)]"
      )}
    >
      {kind === "client" ? (isAr ? "شغل لعميل" : "Client project") : isAr ? "ديمو من منتجاتنا" : "Our product demo"}
    </span>
  );
}

/**
 * "See it live" gallery. Desktop: a row of tall cards — pointing at or
 * focusing one expands it (the others shrink and dim) and plays its muted
 * preview inside a device frame. Phones: a swipeable snap row; the card in
 * view plays. Videos never load until they should play (preload="none"),
 * nothing plays off-screen, and reduced motion shows posters only.
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
  const row = useRef<HTMLUListElement>(null);

  // Width an expanded card reaches (measured on resize only): content is laid
  // out at that width once, so expanding/collapsing never reflows text.
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const n = items.length;
      const gap = 12;
      const open = ((el.clientWidth - gap * (n - 1)) * GROW) / (n - 1 + GROW);
      el.style.setProperty("--open", `${Math.round(open)}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

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
    const io = el ? new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 }) : null;
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

  const canPlay = inView && !reduced;
  const desktopSizes = "(min-width: 1024px) 42vw, 86vw";

  return (
    <div ref={root}>
      {/* Desktop: expanding cards */}
      <ul ref={row} className="hidden h-[min(40rem,78svh)] gap-3 lg:flex">
        {items.map((item, i) => {
          const on = active === i;
          return (
            <li
              key={item.slug}
              onPointerEnter={() => setActive(i)}
              onFocusCapture={() => setActive(i)}
              className={cn(
                `relative min-w-0 overflow-hidden rounded-[1.75rem] border bg-[var(--bg-card)] transition-[flex-grow,border-color] duration-700 ${EASE} [contain:layout_paint]`,
                on ? "grow-[3.4] border-[var(--border-hover)]" : "grow border-[var(--border)]"
              )}
              style={{ flexBasis: 0 }}
            >
              {/* Content keeps a fixed width so expanding reveals it instead of reflowing it */}
              <div className="absolute inset-y-0 start-0 flex w-[var(--open,44rem)] flex-col p-6">
                <div className={cn(`min-h-0 flex-1 transition-opacity duration-700 ${EASE}`, item.type === "app" && "flex justify-center", on ? "opacity-100" : "opacity-45")}>
                  <Device item={item} playing={wide && on && canPlay} sizes={desktopSizes} />
                </div>
                <div className="mt-5 flex items-end justify-between gap-6">
                  <div className="min-w-0">
                    <div className={cn("flex items-center gap-3 transition-opacity duration-500", on ? "opacity-100" : "opacity-0")}>
                      <Badge kind={item.kind} locale={locale} />
                      <span className="label">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className={cn("mt-3 title-sm truncate text-2xl font-bold transition-opacity duration-500", on ? "opacity-100" : "opacity-0")}>{item.name[locale]}</h3>
                    <p className={cn(`mt-1 max-w-md leading-relaxed text-[var(--text-muted)] transition-opacity duration-500`, on ? "opacity-100" : "opacity-0")}>{item.summary[locale]}</p>
                  </div>
                </div>
                <div className={cn(`mt-4 transition-opacity duration-500`, on ? "opacity-100" : "pointer-events-none opacity-0")} aria-hidden={!on}>
                  <Actions item={item} locale={locale} />
                  {item.demoNote && <p className="mt-2 text-sm text-[var(--text-muted)]">{item.demoNote[locale]}</p>}
                </div>
              </div>
              {/* Collapsed cards fade out at their far edge instead of cutting words mid-way */}
              <span
                aria-hidden="true"
                className={cn(
                  `pointer-events-none absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-[var(--bg-card)] to-transparent transition-opacity duration-700 ${EASE} rtl:bg-gradient-to-r`,
                  on ? "opacity-0" : "opacity-100"
                )}
              />
              {/* Collapsed cards: the name at the card's own width (it was cut: «WE Manager», «/E Management») */}
              <div
                aria-hidden="true"
                className={cn(`pointer-events-none absolute inset-x-0 bottom-0 p-6 transition-opacity duration-500`, on ? "opacity-0" : "opacity-100")}
              >
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 title-sm text-xl font-bold leading-tight text-balance">{item.name[locale]}</p>
              </div>
              {/* Collapsed cards: an invisible button-sized target keeps them keyboard-reachable */}
              {!on && (
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="absolute inset-0 cursor-pointer rounded-[1.75rem] focus-visible:outline-offset-[-4px]"
                  aria-label={isAr ? `اعرض ${item.name.ar}` : `Show ${item.name.en}`}
                />
              )}
            </li>
          );
        })}
      </ul>

      {/* Phones / tablets: swipeable snap row */}
      <div
        ref={rail}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <article key={item.slug} data-work-card={i} className="flex w-[80vw] max-w-[28rem] shrink-0 snap-start flex-col rounded-[1.5rem] border border-[var(--border-hover)] bg-[var(--bg-card)] p-5">
            <div className={cn("relative", item.type === "app" ? "h-[26rem]" : "aspect-[4/3]")}>
              <Device item={item} playing={!wide && mobileIndex === i && canPlay} sizes="86vw" />
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Badge kind={item.kind} locale={locale} />
            </div>
            <h3 className="mt-3 title-sm text-xl font-bold">{item.name[locale]}</h3>
            <p className="mt-1 leading-relaxed text-[var(--text-muted)]">{item.summary[locale]}</p>
            <div className="mt-5">
              <Actions item={item} locale={locale} />
              {item.demoNote && <p className="mt-2 text-sm text-[var(--text-muted)]">{item.demoNote[locale]}</p>}
            </div>
          </article>
        ))}
      </div>
      {/* where you are and how many there are — on phones the others were hidden behind a 5px sliver */}
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
