import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Heading } from "@/components/home/Heading";
import { Rise } from "@/components/motion/Kinetic";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { SystemScreen } from "@/components/sections/SystemScreen";
import { engagement, tr } from "@/lib/content";
import { commitments, industries } from "@/lib/company";
import type { ReadySystem } from "@/lib/systems";
import type { Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

// Content sections shared by the inner pages (services, systems, about,
// portfolio, contact). Same visual language as the home blocks.

export const shell = "mx-auto max-w-[1400px] px-5 sm:px-8";

type Item = { title: Record<Locale, string>; text: Record<Locale, string> };

/** Numbered steps in a hairline grid (process, onboarding, next steps). */
export function StepsSection({
  locale,
  index,
  label,
  title,
  sub,
  steps,
  className,
}: {
  locale: Locale;
  index?: string;
  label: string;
  title: string;
  sub?: string;
  steps: Item[];
  className?: string;
}) {
  return (
    <section className={cn(shell, "py-24 sm:py-32", className)}>
      <Heading index={index} label={label} title={title} sub={sub} />
      <ol
        className={cn(
          "mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2",
          steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
        )}
      >
        {steps.map((s, i) => (
          <Rise as="li" key={s.title.en} delay={i * 0.06} className="bg-[var(--bg-primary)] p-8">
            <span className="font-mono text-sm text-[var(--accent)]">0{i + 1}</span>
            <h3 className="mt-10 font-display text-xl font-bold">{tr(s.title, locale)}</h3>
            <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{tr(s.text, locale)}</p>
          </Rise>
        ))}
      </ol>
    </section>
  );
}

/** The four ways to buy: demo, subscription, licence, custom build. */
export async function EngagementSection({ locale, index }: { locale: Locale; index?: string }) {
  const t = await getTranslations("services_page");
  return (
    <section className={cn(shell, "py-24 sm:py-32")}>
      <Heading index={index} label={t("engagement_eyebrow")} title={t("engagement_title")} sub={t("engagement_note")} />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {engagement.map((e, i) => (
          <Rise
            as="li"
            key={e.icon}
            delay={i * 0.06}
            className={cn(
              "flex flex-col justify-between gap-12 rounded-[1.75rem] border p-7",
              i === 3 ? "border-transparent bg-[var(--accent)] text-[var(--accent-ink)]" : "border-[var(--border)] bg-[var(--bg-card)]"
            )}
          >
            <div className="flex items-center justify-between">
              <span className={cn("font-mono text-xs", i === 3 ? "opacity-60" : "text-[var(--text-subtle)]")}>{String.fromCharCode(65 + i)}</span>
              <DynamicIcon name={e.icon} className={cn("h-6 w-6", i === 3 ? "" : "text-[var(--accent)]")} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">{tr(e.title, locale)}</h3>
              <p className={cn("mt-2 leading-relaxed", i === 3 ? "opacity-80" : "text-[var(--text-muted)]")}>{tr(e.text, locale)}</p>
            </div>
          </Rise>
        ))}
      </ul>
    </section>
  );
}

export function IndustriesSection({ locale, index }: { locale: Locale; index?: string }) {
  const isAr = locale === "ar";
  return (
    <section className={cn(shell, "py-24 sm:py-32")}>
      <Heading
        index={index}
        label={isAr ? "القطاعات" : "Industries"}
        title={isAr ? "نفهم لغة قطاعك قبل أن نكتب سطرًا واحدًا." : "We speak your industry before we write a line of code."}
        sub={
          isAr
            ? "عملنا على إجراءات هذه القطاعات بتفاصيلها اليومية، لذلك نبدأ من فهم مشترك ولا نحتاج إلى شرح طويل."
            : "We have worked through the day-to-day processes of these sectors, so we start from shared understanding rather than a long briefing."
        }
      />
      <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--border)] grid-cols-2 lg:grid-cols-4">
        {industries.map((ind, i) => (
          <Rise as="li" key={ind.icon} delay={(i % 4) * 0.05} className="group bg-[var(--bg-primary)] p-5 sm:p-7 transition-colors duration-500 hover:bg-[var(--bg-card)]">
            <DynamicIcon name={ind.icon} className="h-6 w-6 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]" />
            <h3 className="mt-8 font-display text-lg font-bold">{tr(ind.name, locale)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{tr(ind.text, locale)}</p>
          </Rise>
        ))}
      </ul>
    </section>
  );
}

export function CommitmentsSection({ locale, index }: { locale: Locale; index?: string }) {
  const isAr = locale === "ar";
  return (
    <section className={cn(shell, "py-24 sm:py-32")}>
      <Heading
        index={index}
        label={isAr ? "التزاماتنا" : "Our commitments"}
        title={isAr ? "ما نلتزم به في كل مشروع، مكتوبًا." : "What we commit to on every project — in writing."}
      />
      <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {commitments.map((c, i) => (
          <Rise as="li" key={c.title.en} delay={(i % 3) * 0.06} className="border-t border-[var(--border)] pt-6">
            <span className="font-mono text-sm text-[var(--accent)]">0{i + 1}</span>
            <h3 className="mt-4 font-display text-xl font-bold">{tr(c.title, locale)}</h3>
            <p className="mt-2 leading-relaxed text-[var(--text-muted)]">{tr(c.text, locale)}</p>
          </Rise>
        ))}
      </ul>
    </section>
  );
}

/** Catalog card for a ready-made system, with a compact screen preview. */
export function SystemCard({ system, locale, index }: { system: ReadySystem; locale: Locale; index: number }) {
  const isAr = locale === "ar";
  return (
    <Link
      href={`/${locale}/systems/${system.slug}`}
      data-cursor={isAr ? "عرض" : "open"}
      className="group flex h-full flex-col rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-card)]/70 p-6 transition-colors duration-500 hover:border-[var(--accent)]"
    >
      <div className="flex items-start justify-between">
        <span dir="ltr" className="font-mono text-xs text-[var(--text-subtle)]">
          SYS/{String(index + 1).padStart(2, "0")}
        </span>
        <DynamicIcon name={system.icon} className="h-6 w-6 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]" />
      </div>
      <h3 className="mt-6 font-display text-2xl font-bold">{tr(system.name, locale)}</h3>
      <p className="mt-2 leading-relaxed text-[var(--text-muted)]">{tr(system.tagline, locale)}</p>
      <SystemScreen system={system} locale={locale} compact className="mt-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1" />
      <span className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--accent)]">
        {isAr ? "تفاصيل النظام" : "Explore the system"}
        <ArrowUpRight className="h-4 w-4 rtl-flip" />
      </span>
    </Link>
  );
}
