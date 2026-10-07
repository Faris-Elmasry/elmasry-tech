"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { Rise, SplitWords } from "@/components/motion/Kinetic";
import { engagement, systems, tr } from "@/lib/content";
import { whatsappLink, type Locale } from "@/lib/site";

/**
 * Ready-made systems as a horizontal rail. On large screens the section gets
 * extra height and a sticky viewport; vertical scroll progress slides the row
 * sideways (mirrored in Arabic). Pure CSS sticky + one transform per scroll
 * event — no animation library. Small screens get a native swipe row.
 */
export function SystemsRail({
  locale,
  index,
  label,
  title,
  sub,
  cta,
}: {
  locale: Locale;
  index: string;
  label: string;
  title: string;
  sub: string;
  cta: string;
}) {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  const rtl = locale === "ar";

  useEffect(() => {
    const row = track.current;
    if (!row) return;
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const measure = () => setDistance(mq.matches ? Math.max(0, row.scrollWidth - window.innerWidth + 64) : 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, []);

  useLenis(() => {
    const el = outer.current;
    const row = track.current;
    if (!el || !row || !distance) return;
    const r = el.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -r.top / distance));
    row.style.transform = `translate3d(${(rtl ? 1 : -1) * progress * distance}px,0,0)`;
  });

  const demoMsg = rtl ? "مرحبًا، أود طلب عرض تجريبي لنظام" : "Hi, I'd like a demo of";

  return (
    <section ref={outer} data-shape="grid" data-shape-dim="0.55" className="relative" style={distance ? { height: `calc(100vh + ${distance}px)` } : undefined}>
     <div className={distance ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "flex flex-col justify-center overflow-hidden py-24"}>
      <div className="mx-auto mb-14 flex w-full max-w-[1400px] flex-col justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="label flex items-center gap-3">
            <span className="text-[var(--accent)]">{index}</span>
            <span className="h-px w-10 bg-[var(--border-hover)]" />
            {label}
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.035em]">
            <SplitWords text={title} />
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[var(--text-muted)]">{sub}</p>
        </div>
        <Button href={whatsappLink(demoMsg)} size="lg" leftIcon={<WhatsAppIcon className="h-5 w-5" />}>
          {cta}
        </Button>
      </div>

      <ul
        ref={track}
        className="flex w-max gap-5 px-5 will-change-transform sm:px-8 max-lg:w-auto max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto max-lg:pb-4"
      >
        {systems.map((s, i) => (
          <li
            key={s.icon}
            className="group relative flex h-[22rem] w-[19rem] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-card)]/70 p-7 backdrop-blur-md transition-colors duration-500 hover:border-[var(--accent)] sm:w-[22rem]"
          >
            <div className="flex items-start justify-between">
              <span dir="ltr" className="font-mono text-xs text-[var(--text-subtle)]">
                SYS/{String(i + 1).padStart(2, "0")}
              </span>
              <DynamicIcon name={s.icon} className="h-7 w-7 text-[var(--text-muted)] transition-all duration-500 group-hover:scale-110 group-hover:text-[var(--accent)]" />
            </div>
            {/* Oversized ghost numeral */}
            <span className="pointer-events-none absolute -bottom-10 end-2 font-display text-[11rem] font-bold leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-[var(--accent)]/10">
              {i + 1}
            </span>
            <div className="relative">
              <h3 className="font-display text-2xl font-bold">{tr(s.name, locale)}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{tr(s.hint, locale)}</p>
              <a
                href={whatsappLink(`${demoMsg} ${tr(s.name, locale)}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--accent)]"
              >
                {rtl ? "اطلب عرضًا تجريبيًا ←" : "Request a demo →"}
              </a>
            </div>
          </li>
        ))}

        {/* Closing card: the four ways to buy */}
        <li className="flex h-[22rem] w-[26rem] shrink-0 snap-start flex-col justify-between rounded-[1.75rem] bg-[var(--accent)] p-7 text-[var(--accent-ink)] sm:w-[30rem]">
          <p className="font-mono text-xs uppercase tracking-widest">{rtl ? "نماذج التعاقد" : "Ways to engage"}</p>
          <ol className="grid grid-cols-2 gap-x-6 gap-y-5">
            {engagement.map((e, k) => (
              <li key={e.icon}>
                <span className="font-mono text-xs opacity-60">{String.fromCharCode(65 + k)}</span>
                <p className="font-display text-lg font-bold leading-tight">{tr(e.title, locale)}</p>
                <p className="mt-1 text-xs leading-snug opacity-75">{tr(e.text, locale)}</p>
              </li>
            ))}
          </ol>
        </li>
      </ul>

      <Rise className="mx-auto mt-10 w-full max-w-[1400px] px-5 sm:px-8">
        <p className="label">{rtl ? "← مرّر لاستعراض المزيد" : "scroll / swipe →"}</p>
      </Rise>
     </div>
    </section>
  );
}
