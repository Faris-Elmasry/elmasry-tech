"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, tr } from "@/lib/content";
import type { Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Services as a giant index. Hovering (or, on touch screens, scrolling to) a
 * service re-skins the whole section: its real photo wipes in behind the list
 * with a clip-path reveal, and the detail panel swaps to that service.
 */
export function ServicesShowcase({ locale, label, index, title }: { locale: Locale; label: string; index: string; title: string }) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const s = services[active];

  // Touch / small screens: the row nearest the viewport centre becomes active.
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rows = list.current?.querySelectorAll<HTMLElement>("[data-row]");
    if (!rows) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.row));
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" className="relative isolate scroll-mt-16 overflow-hidden">
      {/* Photo layers — every image is mounted so swaps are instant once loaded */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {services.map((svc, i) => (
          <div
            key={svc.slug}
            className={cn(
              "absolute inset-0 transition-[clip-path,transform,filter] duration-[1100ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
              i === active ? "z-10 scale-100 [clip-path:inset(0_0_0_0)]" : "z-0 scale-110 [clip-path:inset(50%_0_50%_0)]"
            )}
          >
            <Image
              src={`/images/services/${svc.slug}.jpg`}
              alt=""
              fill
              sizes="100vw"
              quality={60}
              className="object-cover"
            />
          </div>
        ))}
        {/* Grade the photos into the dark theme and keep text readable */}
        <div className="absolute inset-0 z-20 bg-[var(--bg-primary)]/45" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]/80" />
        <div className="absolute inset-0 z-20 bg-[linear-gradient(90deg,var(--bg-primary)_5%,transparent_60%)] rtl:bg-[linear-gradient(-90deg,var(--bg-primary)_5%,transparent_60%)]" />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-[1400px] gap-12 px-5 py-28 sm:px-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div>
          <p className="label flex items-center gap-3">
            <span className="text-[var(--accent)]">{index}</span>
            <span className="h-px w-10 bg-[var(--border-hover)]" aria-hidden="true" />
            {label}
          </p>
          <h2 className="mt-4 max-w-xl text-lg text-[var(--text-muted)]">{title}</h2>

          <ol ref={list} className="mt-10 border-t border-[var(--border)]">
            {services.map((svc, i) => (
              <li key={svc.slug} data-row={i} className="border-b border-[var(--border)]">
                <Link
                  href={`/${locale}/services/${svc.slug}`}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  data-cursor={locale === "ar" ? "عرض" : "open"}
                  className="group flex items-baseline gap-5 py-4 sm:py-5"
                >
                  <span className={cn("font-mono text-xs transition-colors", i === active ? "text-[var(--accent)]" : "text-[var(--text-subtle)]")}>
                    0{i + 1}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[clamp(1.8rem,4.4vw,4rem)] font-bold leading-[1.05] tracking-[-0.035em] transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      i === active ? "translate-x-3 text-[var(--text-primary)] rtl:-translate-x-3" : "text-[var(--text-primary)]/30 group-hover:text-[var(--text-primary)]/60"
                    )}
                  >
                    {tr(svc.label, locale)}
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "ms-auto h-6 w-6 shrink-0 self-center transition-all duration-500 rtl-flip",
                      i === active ? "text-[var(--accent)] opacity-100" : "opacity-0"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* Detail panel — keyed so it re-animates on every swap */}
        <div key={s.slug} className="swap-in rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-primary)]/55 p-7 backdrop-blur-xl sm:p-9" aria-live="polite">
          <p className="label">
            <span className="text-[var(--accent)]">0{active + 1}</span> / 0{services.length}
          </p>
          <h3 className="mt-5 font-display text-2xl font-bold leading-tight sm:text-3xl">{tr(s.title, locale)}</h3>
          <p className="mt-4 leading-relaxed text-[var(--text-muted)]">{tr(s.summary, locale)}</p>
          <ul className="mt-6 space-y-2.5">
            {s.features[locale].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm">
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--accent)]" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href={`/${locale}/services/${s.slug}`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]"
          >
            {locale === "ar" ? "تفاصيل الخدمة" : "Service details"}
            <ArrowUpRight className="h-4 w-4 rtl-flip" />
          </Link>
        </div>
      </div>
    </section>
  );
}
