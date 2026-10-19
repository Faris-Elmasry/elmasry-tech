"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CARD_W = 280;

export type RevealRow = { title: string; text: string; photo?: string; href?: string };

/**
 * Big editorial rows. With a mouse, hovering a row reveals its photo in a
 * card that glides vertically with the pointer inside an empty column on the
 * inline-end side — it never passes over any row's text. Touch screens show a
 * small inline thumbnail instead.
 */
export function HoverReveal({ rows, className }: { rows: RevealRow[]; className?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Trailing card: eases toward the pointer and stops the loop once it has settled.
  const raf = useRef(0);
  const run = () => {
    if (raf.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loop = () => {
      const k = reduced ? 1 : 0.16;
      const dy = target.current.y - pos.current.y;
      pos.current.y = Math.abs(dy) < 0.5 ? target.current.y : pos.current.y + dy * k;
      if (card.current) card.current.style.transform = `translate3d(0, ${Math.round(pos.current.y)}px, 0)`;
      raf.current = Math.abs(dy) < 0.5 ? 0 : requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const onMove = (e: React.PointerEvent) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // Only the vertical position follows the pointer; the column is fixed.
    const h = CARD_W * 1.25;
    target.current = { x: 0, y: Math.min(r.height - h, Math.max(0, e.clientY - r.top - h / 2)) };
    run();
  };

  const shown = active !== null ? rows[active] : null;

  return (
    <div ref={wrap} className={cn("relative", className)} onPointerMove={fine ? onMove : undefined} onPointerLeave={() => setActive(null)}>
      <ul className="border-b border-[var(--border)]">
        {rows.map((r, i) => {
          const inner = (
            <>
              <span className="w-10 shrink-0 font-mono text-sm text-[var(--text-subtle)] transition-colors duration-500 group-hover:text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {r.photo && !fine && (
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[var(--border)]">
                  <Image src={r.photo} alt="" fill sizes="56px" className="object-cover" />
                </span>
              )}
              <span className="min-w-0 flex-1 lg:max-w-[56%]">
                <span className="block title-sm text-xl font-bold sm:text-2xl lg:text-3xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:translate-x-3 lg:rtl:group-hover:-translate-x-3">{r.title}</span>
                <span className="mt-1 block text-[var(--text-muted)] sm:text-lg">{r.text}</span>
              </span>
              {r.href && <ArrowUpRight aria-hidden="true" className="ms-auto h-5 w-5 shrink-0 text-[var(--text-muted)] transition-colors duration-500 group-hover:text-[var(--accent)] rtl:-scale-x-100" />}
            </>
          );
          const cls = "group flex items-center gap-5 border-t border-[var(--border)] py-6 sm:gap-8 sm:py-7";
          return (
            <li key={r.title} onPointerEnter={() => setActive(i)}>
              {r.href ? (
                <Link href={r.href} className={cls} onFocus={() => setActive(i)} onBlur={() => setActive(null)}>
                  {inner}
                </Link>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>

      {fine && (
        <div
          ref={card}
          aria-hidden="true"
          style={{ width: CARD_W }}
          className="pointer-events-none absolute top-0 z-20 start-[64%]"
        >
          <div
            className={cn(
              "relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-[var(--border-hover)] bg-[var(--bg-card)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-[opacity,scale] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              shown?.photo ? "scale-100 opacity-100" : "scale-90 opacity-0"
            )}
          >
            {rows.map((r, i) =>
              r.photo ? (
                <Image
                  key={r.photo + i}
                  src={r.photo}
                  alt=""
                  fill
                  sizes="280px"
                  className={cn("object-cover transition-opacity duration-500", active === i ? "opacity-100" : "opacity-0")}
                />
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}
