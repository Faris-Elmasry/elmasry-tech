import type { ReadySystem } from "@/lib/systems";
import type { Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Illustrative app window for a ready-made system, drawn in HTML/CSS from the
 * catalog's sample data (no screenshots to keep in sync). `compact` hides the
 * sidebar and table for use inside cards.
 */
export function SystemScreen({ system, locale, compact = false, className }: { system: ReadySystem; locale: Locale; compact?: boolean; className?: string }) {
  const { screen } = system;
  const isAr = locale === "ar";
  const max = Math.max(...screen.chart);

  return (
    <figure
      className={cn("overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]", className)}
      aria-label={isAr ? `واجهة توضيحية لـ ${system.name.ar}` : `Illustrative screen of the ${system.name.en} system`}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-hover)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-hover)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
        </span>
        <span className="truncate text-xs text-[var(--text-muted)]">{system.name[locale]}</span>
        {!compact && <span className="label ms-auto shrink-0 !text-[0.6rem]">{isAr ? "بيانات توضيحية" : "Sample data"}</span>}
      </div>

      <div className={cn("grid", !compact && "sm:grid-cols-[9.5rem_1fr]")}>
        {!compact && (
          <ul className="hidden border-e border-[var(--border)] p-3 text-sm sm:block">
            {screen.nav.map((n, i) => (
              <li
                key={n.en}
                className={cn(
                  "rounded-lg px-3 py-2",
                  i === 0 ? "bg-[var(--bg-card-hover)] text-[var(--text-primary)]" : "text-[var(--text-muted)]"
                )}
              >
                {n[locale]}
              </li>
            ))}
          </ul>
        )}

        <div className="space-y-4 p-4">
          <div className="grid grid-cols-3 gap-2">
            {screen.stats.map((s) => (
              <div key={s.label.en} className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3">
                <p className={cn("text-[0.7rem] leading-tight text-[var(--text-muted)]", compact ? "line-clamp-2 min-h-[2.5em]" : "truncate")}>{s.label[locale]}</p>
                <p className="mt-1 font-mono text-base font-semibold sm:text-lg">
                  <span dir="ltr">{s.value}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="flex h-24 items-end gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3" aria-hidden="true">
            {screen.chart.map((h, i) => (
              <span
                key={i}
                className={cn("flex-1 rounded-t-md", i === screen.chart.length - 1 ? "bg-[var(--accent)]" : "bg-[var(--border-hover)]")}
                style={{ height: `${(h / max) * 100}%` }}
              />
            ))}
          </div>

          {!compact && (
            <ul className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm">
              {screen.rows.map((r) => (
                <li key={r.name.en} className="flex items-center justify-between gap-4 px-3 py-2.5">
                  <span className="min-w-0">
                    <span className="block truncate">{r.name[locale]}</span>
                    <span className="block truncate text-xs text-[var(--text-muted)]">{r.meta[locale]}</span>
                  </span>
                  <span className="shrink-0 rounded-full border border-[var(--border)] px-2.5 py-1 text-xs">
                    {typeof r.value === "string" ? <span dir="ltr">{r.value}</span> : r.value[locale]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </figure>
  );
}
