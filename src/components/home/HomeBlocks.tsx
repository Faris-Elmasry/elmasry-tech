import { getTranslations } from "next-intl/server";
import { Plus } from "lucide-react";
import { Heading } from "@/components/home/Heading";
import { Circled, Magnetic, Rise, SplitWords, VelocityMarquee } from "@/components/motion/Kinetic";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { faqs, services, stack, tr } from "@/lib/content";
import { whatsappLink, type Locale } from "@/lib/site";
import type { ProjectRecord, TestimonialRecord } from "@/lib/data";
import { localize } from "@/lib/utils";

const shell = "mx-auto max-w-[1400px] px-5 sm:px-8";

/** Keyword band: the service vocabulary people actually search, set huge. */
export function KeywordBand({ locale }: { locale: Locale }) {
  const words = services.flatMap((s) => s.keywords[locale].slice(0, 2));
  return (
    <div className="relative border-y border-[var(--border)] bg-[var(--bg-primary)]/60 py-6 backdrop-blur-sm">
      <VelocityMarquee baseSpeed={35}>
        {words.map((w, i) => (
          <span key={i} className="flex items-center gap-8 pe-8 font-display text-3xl font-bold tracking-[-0.02em] sm:text-5xl">
            <span className={i % 2 ? "text-outline" : ""}>{w}</span>
            <span className="text-[var(--accent)]">✳</span>
          </span>
        ))}
      </VelocityMarquee>
    </div>
  );
}

export async function WhyBlock({ locale, index }: { locale: Locale; index: string }) {
  const t = await getTranslations("home");
  const isAr = locale === "ar";
  const items = [1, 2, 3, 4] as const;
  return (
    <section className={`${shell} py-28 sm:py-40`}>
      <Rise>
        <p className="label flex items-center gap-3">
          <span className="text-[var(--accent)]">{index}</span>
          <span className="h-px w-10 bg-[var(--border-hover)]" />
          {t("why_eyebrow")}
        </p>
      </Rise>
      {/* Manifesto-style statement with a hand-circled word */}
      <p className="mt-8 max-w-6xl font-display text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.08] tracking-[-0.03em]">
        <SplitWords text={isAr ? "فريق متخصص تتواصل فيه مباشرة مع" : "A specialist team where you talk directly to the"} />{" "}
        <Circled>{isAr ? "المهندسين" : "engineers"}</Circled>{" "}
        <SplitWords
          text={isAr ? "الذين يبنون نظامك بأنفسهم — لا مع مندوبي مبيعات." : "who build your system — not to sales reps."}
          delay={0.2}
        />
      </p>

      <div className="mt-20 grid gap-px overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--border)] md:grid-cols-2">
        {items.map((n, i) => (
          <Rise key={n} delay={i * 0.06} className="group bg-[var(--bg-primary)] p-8 transition-colors duration-500 hover:bg-[var(--bg-card)] sm:p-10">
            <span className="font-mono text-sm text-[var(--accent)]">0{n}</span>
            <h3 className="mt-8 font-display text-2xl font-bold">{t(`why_${n}_title`)}</h3>
            <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{t(`why_${n}_text`)}</p>
          </Rise>
        ))}
      </div>

      <Rise className="mt-16">
        <p className="label mb-5">{t("stack_label")}</p>
        <ul dir="ltr" className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <li key={s} className="rounded-full border border-[var(--border)] px-4 py-2 font-mono text-xs text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]">
              {s}
            </li>
          ))}
        </ul>
      </Rise>
    </section>
  );
}

export async function WorkBlock({ locale, projects, index }: { locale: Locale; projects: ProjectRecord[]; index: string }) {
  const t = await getTranslations("home");
  const tw = await getTranslations("work_page");
  const label = (c: string) => (["system", "web", "mobile", "saas", "other"].includes(c) ? tw(c as "system") : c);
  return (
    <section className={`${shell} py-28 sm:py-40`}>
      <Heading index={index} label={t("work_eyebrow")} title={t("work_title")} />
      {projects.length > 0 ? (
        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Rise key={p.id} delay={i * 0.08} className={i === 1 ? "lg:mt-20" : undefined}>
              <ProjectCard project={p} locale={locale} categoryLabel={label(p.category)} index={i} />
            </Rise>
          ))}
        </div>
      ) : (
        <Rise className="mt-14 flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-dashed border-[var(--border-hover)] p-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-lg text-[var(--text-muted)]">{t("work_empty")}</p>
          <Button
            href={whatsappLink(locale === "ar" ? "مرحبًا، أود الاطلاع على نماذج من أعمالكم." : "Hi, could I see examples of your recent work?")}
            variant="outline"
            leftIcon={<WhatsAppIcon className="h-4 w-4 text-[#25D366]" />}
          >
            WhatsApp
          </Button>
        </Rise>
      )}
    </section>
  );
}

export async function TestimonialsBlock({ locale, testimonials, index }: { locale: Locale; testimonials: TestimonialRecord[]; index: string }) {
  if (testimonials.length === 0) return null;
  const t = await getTranslations("home");
  return (
    <section className={`${shell} py-28`}>
      <Heading index={index} label={t("testimonials_eyebrow")} title={t("testimonials_title")} />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {testimonials.slice(0, 4).map((item, i) => (
          <Rise as="article" key={item.id} delay={i * 0.08} className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-card)] p-8">
            <blockquote className="font-display text-2xl leading-snug">“{localize(item, "text", locale)}”</blockquote>
            <footer className="mt-8 text-sm">
              <span className="block font-medium">{item.client_name}</span>
              <span className="text-[var(--text-muted)]">
                {localize(item, "client_title", locale)} · {item.client_company}
              </span>
            </footer>
          </Rise>
        ))}
      </div>
    </section>
  );
}

export async function FaqBlock({ locale, index }: { locale: Locale; index: string }) {
  const t = await getTranslations("home");
  return (
    <section className="relative bg-[var(--bg-primary)]">
      <div className={`${shell} grid gap-14 py-28 sm:py-40 lg:grid-cols-[1fr_1.4fr]`}>
        <Heading index={index} label={t("faq_eyebrow")} title={t("faq_title")} className="lg:sticky lg:top-28 lg:self-start" />
        <div className="border-t border-[var(--border)]">
          {faqs.map((f, i) => (
            // Native <details>: accessible, works without JS, answers stay crawlable.
            <details key={i} className="group border-b border-[var(--border)]" {...(i === 0 ? { open: true } : {})}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 font-display text-xl font-semibold transition-colors hover:text-[var(--accent)] [&::-webkit-details-marker]:hidden">
                {tr(f.q, locale)}
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-hover)] transition-all duration-500 group-open:rotate-[135deg] group-open:border-[var(--accent)] group-open:bg-[var(--accent)] group-open:text-[var(--accent-ink)]">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="-mt-2 max-w-2xl pb-8 pe-14 text-lg leading-relaxed text-[var(--text-muted)]">{tr(f.a, locale)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing CTA — the particles form a ring ("portal") around the button. */
export async function CtaBlock({ locale }: { locale: Locale }) {
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center px-5 py-28 text-center">
      <div className="max-w-4xl">
        <h2 className="font-display text-[clamp(2.8rem,8vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
          <SplitWords text={t("cta_title")} />
        </h2>
        <Rise delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-muted)]">{t("cta_sub")}</p>
        </Rise>
        <Rise delay={0.3} className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic strength={0.5}>
            <Button href={`/${locale}/contact`} size="lg" className="h-16 px-10 text-lg">
              {t("cta_button")}
            </Button>
          </Magnetic>
          <Magnetic strength={0.5}>
            <Button href={whatsappLink(tc("whatsapp_message"))} variant="outline" size="lg" className="h-16 px-8" leftIcon={<WhatsAppIcon className="h-5 w-5 text-[#25D366]" />}>
              WhatsApp
            </Button>
          </Magnetic>
        </Rise>
      </div>
    </section>
  );
}
