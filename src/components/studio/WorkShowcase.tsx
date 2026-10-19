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
          <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-[#101012]">
            <Media item={item} playing={playing} sizes="240px" />
            <span className="absolute left-1/2 top-2 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
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
                <div className={cn(`min-h-0 flex-1 transition-opacity duration-700 ${EASE}`, on ? "opacity-100" : "opacity-45")}>
                  <Device item={item} playing={wide && on && canPlay} sizes={desktopSizes} />
                </div>
                <div className="mt-5 flex items-end justify-between gap-6">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <Badge kind={item.kind} locale={locale} />
                      <span className="label">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-3 title-sm truncate text-2xl font-bold">{item.name[locale]}</h3>
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
          <article key={item.slug} data-work-card={i} className="flex w-[86vw] max-w-[28rem] shrink-0 snap-start flex-col rounded-[1.5rem] border border-[var(--border-hover)] bg-[var(--bg-card)] p-5">
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
    </div>
  );
}
