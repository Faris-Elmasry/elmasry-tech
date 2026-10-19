"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { subscribeScroll, watchSection } from "@/components/studio/useScroll";

/**
 * Sticky table of contents for long documents: highlights the section being
 * read and shows a thin reading-progress line. Links are plain anchors, so it
 * works without JavaScript too.
 */
export function ReadingToc({ items, label, updated }: { items: { id: string; title: string }[]; label: string; updated: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((x): x is HTMLElement => !!x);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => io.observe(s));

    const first = sections[0];
    const last = sections[sections.length - 1];
    if (!first || !last) return () => io.disconnect();
    let top = 0;
    let bottom = 1;
    let prev = -1;
    const measure = () => {
      const y = window.scrollY;
      top = first.getBoundingClientRect().top + y;
      bottom = last.getBoundingClientRect().bottom + y;
      prev = -1;
    };
    const frame = (y: number, vh: number) => {
      const p = Math.round(Math.min(1, Math.max(0, (y + vh * 0.4 - top) / (bottom - top))) * 1000) / 1000;
      if (p === prev || !bar.current) return;
      prev = p;
      bar.current.style.transform = `scaleY(${p})`;
    };
    measure();
    frame(window.scrollY, window.innerHeight);
    const host = first.parentElement ?? first;
    let unsub: (() => void) | null = null;
    const stop = watchSection(
      host,
      (on) => {
        if (on && !unsub) unsub = subscribeScroll(frame);
        else if (!on && unsub) {
          unsub();
          unsub = null;
        }
      },
      measure
    );
    return () => {
      io.disconnect();
      stop();
      unsub?.();
    };
  }, [items]);

  return (
    <nav aria-label={label} className="lg:sticky lg:top-24 lg:self-start">
      <p className="label">{updated}</p>
      <div className="relative mt-6 ps-5">
        <span aria-hidden="true" className="absolute inset-y-0 start-0 w-px bg-[var(--border)]" />
        <span ref={bar} aria-hidden="true" className="absolute inset-y-0 start-0 w-px origin-top bg-[var(--accent)]" style={{ transform: "scaleY(0)" }} />
        <ol className="space-y-1">
          {items.map((i, n) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? "location" : undefined}
                className={cn(
                  "flex gap-3 rounded-lg py-1.5 text-[0.95rem] transition-colors duration-500",
                  active === i.id ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                <span className={cn("font-mono text-xs leading-6", active === i.id ? "text-[var(--accent)]" : "text-[var(--text-subtle)]")}>
                  {String(n + 1).padStart(2, "0")}
                </span>
                {i.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
