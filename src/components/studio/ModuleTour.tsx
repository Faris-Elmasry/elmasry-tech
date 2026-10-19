"use client";

import { useEffect, useRef, useState } from "react";
import { DashMock } from "@/components/studio/screens";
import type { ReadySystem } from "@/lib/systems";
import type { Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Guided tour of a system: the screen stays pinned while the visitor scrolls
 * through its parts; the part in the middle of the viewport becomes active —
 * the screen's title and sidebar follow, and a caption under the screen
 * explains it in one line. Scrolling back reverses it exactly.
 */
export function ModuleTour({ system, locale }: { system: ReadySystem; locale: Locale }) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const isAr = locale === "ar";
  const mods = system.modules;

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-mod]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.mod));
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  const m = mods[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <div className="lg:sticky lg:top-24">
          <DashMock system={system} locale={locale} title={m.title[locale]} activeNav={active % system.screen.nav.length} />
          <div className="mt-5 flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5" aria-live="polite">
            <span dir="ltr" className="mt-0.5 font-mono text-sm text-[var(--accent)]">
              {String(active + 1).padStart(2, "0")}/{String(mods.length).padStart(2, "0")}
            </span>
            <p key={active} className="swap-in text-lg leading-snug">
              <span className="font-semibold">{m.title[locale]}</span>
              <span className="text-[var(--text-muted)]"> — {m.text[locale]}</span>
            </p>
          </div>
        </div>
      </div>

      <ol ref={list} className="lg:col-span-5" aria-label={isAr ? "أجزاء النظام" : "Parts of the system"}>
        {mods.map((mod, i) => (
          <li
            key={mod.title.en}
            data-mod={i}
            className={cn("group border-t border-[var(--border)] py-8 lg:flex lg:min-h-[44vh] lg:flex-col lg:justify-center lg:py-10", i === active && "is-active")}
          >
            <span className="font-mono text-sm text-[var(--text-subtle)] transition-colors duration-500 group-[.is-active]:text-[var(--accent)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 title-sm text-2xl font-bold transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-3xl lg:text-[var(--text-muted)] lg:group-[.is-active]:text-[var(--text-primary)]">
              {mod.title[locale]}
            </h3>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-[var(--text-muted)]">{mod.text[locale]}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
