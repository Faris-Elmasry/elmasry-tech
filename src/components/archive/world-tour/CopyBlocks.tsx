import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, CheckCircle2, RotateCcw } from "lucide-react";
import type { Locale } from "@/lib/site";
import type { StationCopy, WorldCopy } from "./copy";

/*
 * The HTML copy blocks, shared by the flight overlay and the static
 * (reduced-motion) layout. Children carry `--k`-driven offsets so the flight
 * can stagger them with one CSS variable per block (no React re-renders).
 */

const drift = (px: number) => ({ transform: `translate3d(0, calc(var(--k, 0) * ${px}px), 0)` });

const primaryCta =
  "pointer-events-auto inline-flex items-center gap-2.5 rounded-full bg-[var(--accent)] px-6 py-3.5 text-[1rem] font-semibold text-[var(--accent-ink)] shadow-[0_0_40px_-6px_rgba(255,91,31,0.6)] transition-[transform,background-color] duration-300 hover:scale-[1.03] hover:bg-[var(--accent-hover)] active:scale-[0.98]";
const ghostCta =
  "pointer-events-auto inline-flex items-center gap-3 rounded-full border border-[var(--border-hover)] bg-[rgba(10,10,11,0.4)] px-5 py-3.5 text-[1rem] text-[var(--text-primary)] transition-colors duration-300 hover:border-[var(--text-primary)]";

export function HeroCopy({ copy, locale, onEnter, enterHref }: { copy: WorldCopy; locale: Locale; onEnter?: () => void; enterHref?: string }) {
  const h = copy.hero;
  const hint = (
    <>
      <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-[rgba(255,91,31,0.14)] text-[var(--accent)]">
        <ArrowDown className="h-4 w-4 motion-safe:animate-bounce" />
      </span>
      {h.hint}
    </>
  );
  return (
    <div className="max-w-[40rem]">
      <p className="label flex items-center gap-3" style={drift(-10)}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
        </span>
        {h.eyebrow}
      </p>
      <h1
        className="mt-5 text-balance font-display text-[clamp(2.7rem,11vw,3.8rem)] font-bold leading-[0.98] tracking-[-0.035em] lg:text-[clamp(3.8rem,6vw,6.4rem)] lg:leading-[0.93]"
        style={drift(-30)}
      >
        {h.title[0]}
        <span className="text-[var(--accent)]">{h.title[1]}</span>
        {h.title[2]}
      </h1>
      <p className="mt-5 max-w-[33rem] text-pretty text-[1.05rem] leading-relaxed text-[#c9c4bb] lg:text-[1.2rem]" style={drift(-50)}>
        {h.sub}
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-3" style={drift(-70)}>
        <Link href={`/${locale}/contact`} className={primaryCta}>
          {h.cta}
          <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
        </Link>
        {onEnter ? (
          <button type="button" onClick={onEnter} data-world-hint="" className={`${ghostCta} transition-opacity`}>
            {hint}
          </button>
        ) : (
          <a href={enterHref ?? "#world-1"} className={ghostCta}>
            {hint}
          </a>
        )}
      </div>
    </div>
  );
}

export function StationText({
  copy,
  station,
  index,
  headingId,
}: {
  copy: WorldCopy;
  station: StationCopy;
  index: number;
  headingId?: string;
}) {
  return (
    <div className="max-w-[34rem]">
      <p className="label flex items-center gap-3 text-[var(--accent)]!" style={drift(-12)}>
        <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
        {copy.stepLabel(index, copy.stations.length)}
        <span className="text-[var(--text-muted)]">· {station.name}</span>
      </p>
      <h2
        id={headingId}
        className="mt-4 text-balance font-display text-[clamp(1.7rem,7vw,2.3rem)] font-bold leading-[1.08] tracking-[-0.02em] lg:text-[clamp(2.4rem,3.5vw,3.5rem)] lg:leading-[1.04]"
        style={drift(-28)}
      >
        {station.promise}
      </h2>
      <p className="mt-4 max-w-[31rem] text-pretty text-[1.02rem] leading-relaxed text-[#c9c4bb] lg:mt-5 lg:text-[1.2rem]" style={drift(-44)}>
        <span className="font-semibold text-[var(--accent)]">{copy.meansLabel}</span> {station.means}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2 lg:mt-6" style={drift(-60)}>
        {station.tags.map((tag) => (
          <li
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[rgba(237,234,227,0.04)] px-3 py-1.5 text-[0.85rem] text-[#c9c4bb]"
          >
            <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EndCopy({ copy, locale, onAgain }: { copy: WorldCopy; locale: Locale; onAgain?: () => void }) {
  const e = copy.end;
  return (
    <div className="max-w-[38rem]">
      <p className="label flex items-center gap-3 text-[var(--accent)]!" style={drift(-12)}>
        <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
        {e.eyebrow}
      </p>
      <h2
        className="mt-4 text-balance font-display text-[clamp(2.4rem,10vw,3.4rem)] font-bold leading-[0.98] tracking-[-0.03em] lg:text-[clamp(3.4rem,5.4vw,5.75rem)] lg:leading-[0.94]"
        style={drift(-28)}
      >
        {e.title}
      </h2>
      <p className="mt-4 max-w-[31rem] text-pretty text-[1.02rem] leading-relaxed text-[#c9c4bb] lg:mt-5 lg:text-[1.2rem]" style={drift(-44)}>
        {e.sub}
      </p>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2" style={drift(-52)}>
        {e.promises.map((p) => (
          <li key={p} className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-[var(--text-primary)]">
            <CheckCircle2 className="h-5 w-5 text-[var(--success)]" />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap items-center gap-3" style={drift(-60)}>
        <Link href={`/${locale}/contact`} className={primaryCta}>
          {e.cta}
          <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
        </Link>
        {onAgain ? (
          <button type="button" onClick={onAgain} className={ghostCta}>
            <RotateCcw className="h-4 w-4" />
            {e.again}
          </button>
        ) : null}
      </div>
    </div>
  );
}
