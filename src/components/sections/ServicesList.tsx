import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Rise } from "@/components/motion/Kinetic";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { services, tr } from "@/lib/content";
import type { Locale } from "@/lib/site";

/** Large numbered service rows; the hover sweep fills the row in signal orange. */
export function ServicesList({ locale }: { locale: Locale }) {
  return (
    <ul className="border-t border-[var(--border)]">
      {services.map((s, i) => (
        <Rise as="li" key={s.slug} delay={i * 0.05}>
          <Link
            href={`/${locale}/services/${s.slug}`}
            data-cursor={locale === "ar" ? "عرض" : "open"}
            className="group relative isolate grid grid-cols-[auto_1fr_auto] items-center gap-x-6 gap-y-2 overflow-hidden border-b border-[var(--border)] px-2 py-8 sm:grid-cols-[4rem_1.2fr_1.3fr_auto] sm:py-10"
          >
            <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[var(--accent)] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
            <span className="font-mono text-sm text-[var(--text-subtle)] transition-colors group-hover:text-[var(--accent-ink)]">0{i + 1}</span>
            <h3 className="flex items-center gap-4 font-display text-3xl font-bold tracking-[-0.02em] transition-colors group-hover:text-[var(--accent-ink)] sm:text-4xl">
              <DynamicIcon name={s.icon} className="hidden h-7 w-7 shrink-0 sm:block" />
              {tr(s.label, locale)}
            </h3>
            <p className="col-span-3 col-start-2 max-w-xl text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent-ink)] sm:col-span-1 sm:col-start-3">
              {tr(s.summary, locale)}
            </p>
            <span className="col-start-3 row-start-1 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-hover)] transition-all duration-500 group-hover:rotate-45 group-hover:border-[var(--accent-ink)] group-hover:text-[var(--accent-ink)] sm:col-start-4">
              <ArrowUpRight className="h-5 w-5 rtl-flip" />
            </span>
          </Link>
        </Rise>
      ))}
    </ul>
  );
}
