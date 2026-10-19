"use client";

import { Children, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type SwitchItem = { label: string; line: string; href: string };

/**
 * A compact "what we build" index: the services as one big typographic list,
 * and a stage that shows what each one looks like on screen. Pointing at (or
 * focusing, or tapping on mobile) a name swaps the screen with a soft
 * cross-fade; clicking the name opens the service page. Screens are rendered
 * on the server and passed in as children, in the same order as `items`.
 */
export function ServiceSwitcher({ items, children, cta }: { items: SwitchItem[]; children: ReactNode; cta: string }) {
  const [active, setActive] = useState(0);
  const screens = Children.toArray(children);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        {/* Mobile: chips choose the screen */}
        <div role="group" aria-label={cta} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:hidden">
          {items.map((it, i) => (
            <button
              key={it.href}
              type="button"
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[0.95rem] transition-[background-color,border-color,color] duration-500",
                active === i ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]" : "border-[var(--border-hover)] text-[var(--text-muted)]"
              )}
            >
              {it.label}
            </button>
          ))}
        </div>

        {/* Desktop: the list itself is the control */}
        <ul className="hidden border-b border-[var(--border)] lg:block">
          {items.map((it, i) => (
            <li key={it.href} className="border-t border-[var(--border)]">
              <Link
                href={it.href}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={active === i ? "true" : undefined}
                className="group flex items-center gap-5 py-5"
              >
                <span className={cn("font-mono text-sm transition-colors duration-500", active === i ? "text-[var(--accent)]" : "text-[var(--text-subtle)]")}>{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span className={cn("title-sm block text-[1.7rem] font-bold leading-tight transition-colors duration-500", active === i ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]")}>{it.label}</span>
                  <span
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      active === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="block pt-2 text-[var(--text-muted)]">{it.line}</span>
                    </span>
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className={cn("h-5 w-5 shrink-0 transition-colors duration-500 rtl:-scale-x-100", active === i ? "text-[var(--accent)]" : "text-[var(--text-subtle)]")} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-secondary)]">
          <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-60" />
          {/* Desktop: all screens share one grid cell (the tallest sets the stage height) and cross-fade. Phones: only the chosen one is shown. */}
          <div className="relative grid p-6 sm:p-10 [grid-template-areas:'stage']">
            {screens.map((s, i) => (
              <div
                key={i}
                aria-hidden={active !== i}
                inert={active !== i}
                className={cn(
                  "flex items-center justify-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [grid-area:stage]",
                  active === i ? "translate-y-0 opacity-100 max-lg:animate-[swap-in_0.6s_cubic-bezier(0.16,1,0.3,1)_both]" : "pointer-events-none translate-y-3 opacity-0 max-lg:hidden"
                )}
              >
                <div className="w-full max-w-[34rem]">{s}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile: a line and link for the selected service */}
        <div className="mt-5 lg:hidden">
          <p className="text-lg leading-relaxed text-[var(--text-muted)]">{items[active]?.line}</p>
          <Link href={items[active]?.href ?? "#"} className="group mt-3 inline-flex items-center gap-2 font-medium">
            <span className="link-draw">{cta}</span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[var(--accent)] rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}
