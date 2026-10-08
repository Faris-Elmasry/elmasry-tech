import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaSection, ProcessSection } from "@/components/sections/HomeSections";
import { Circled, Rise, SplitWords, VelocityMarquee } from "@/components/motion/Kinetic";
import { LazyComputer } from "@/components/three/LazyComputer";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";
import { CommitmentsSection, IndustriesSection } from "@/components/sections/Blocks";
import { stack, tr } from "@/lib/content";
import { companyFacts, teamRoles } from "@/lib/company";
import type { Locale } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const isAr = locale === "ar";
  return buildMetadata({
    locale,
    path: "/about",
    title: isAr ? "عن Elmasry Tech — شركة برمجيات في القاهرة" : "About Elmasry Tech — Software Company in Cairo",
    description: isAr
      ? "Elmasry Tech شركة برمجيات في القاهرة أسسها مهندسان متخصصان، نطوّر المواقع والتطبيقات وأنظمة الإدارة للشركات في مصر والخليج، ونواصل الدعم بعد الإطلاق."
      : "Elmasry Tech is a Cairo-based software company founded by engineers, building websites, apps and business systems for companies in Egypt and the Gulf.",
  });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const isAr = locale === "ar";

  const facts = isAr
    ? ["مهندسان مؤسسان", "القاهرة، مصر", "العربية والإنجليزية", "تسليم أسبوعي"]
    : ["Two founding engineers", "Cairo, Egypt", "Arabic & English", "Weekly delivery"];

  const principles = [
    { key: "value_1", title: isAr ? "الوضوح" : "Clarity" },
    { key: "value_2", title: isAr ? "الإيقاع" : "Cadence" },
    { key: "value_3", title: isAr ? "الأثر" : "Impact" },
  ] as const;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t("eyebrow"), path: "/about" }])} />

      {/* Hero: copy + the interactive studio computer */}
      <section className="relative mx-auto grid min-h-[100svh] max-w-[1400px] items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="label in flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            {t("eyebrow")}
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.3rem,4.8vw,4.3rem)] font-bold leading-[1.03] tracking-[-0.035em] text-balance">
            {t("title")}
          </h1>
          <p className="in mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]" style={{ "--d": "120ms" } as React.CSSProperties}>
            {t("intro")}
          </p>
          <ul className="in mt-8 flex flex-wrap gap-2" style={{ "--d": "220ms" } as React.CSSProperties}>
            {facts.map((f) => (
              <li key={f} className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)]">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <LazyComputer locale={locale} label={isAr ? "كمبيوتر ثلاثي الأبعاد تفاعلي — اضغط واكتب" : "Interactive 3D computer — click and type"} />
      </section>

      {/* Story as a manifesto */}
      <section className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-40">
        <Rise>
          <h2 className="label flex items-center gap-3">
            <span className="text-[var(--accent)]">01</span>
            <span className="h-px w-10 bg-[var(--border-hover)]" />
            {t("story_title")}
          </h2>
        </Rise>
        <Rise delay={0.1}>
          <p className="mt-8 max-w-4xl text-xl leading-relaxed text-[var(--text-muted)] sm:text-2xl sm:leading-relaxed">{t("story_p1")}</p>
        </Rise>
        <p className="mt-12 max-w-5xl font-display text-[clamp(1.9rem,4vw,3.6rem)] font-bold leading-[1.1] tracking-[-0.03em]">
          <SplitWords text={isAr ? "لذلك نبدأ بفهم العمل، ثم نبني" : "So we start by understanding the work, then build"} />{" "}
          <Circled>{isAr ? "الحل المناسب" : "the right fit"}</Circled>{" "}
          <SplitWords text={isAr ? "له — ويبقى ملكك بالكامل." : "for it — and it’s fully yours."} delay={0.2} />
        </p>
        <Rise delay={0.1}>
          <p className="mt-12 max-w-4xl text-xl leading-relaxed text-[var(--text-muted)] sm:text-2xl sm:leading-relaxed">{t("story_p2")}</p>
        </Rise>

        {/* Company at a glance — factual, no inflated counters */}
        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--border)] lg:grid-cols-4">
          {companyFacts.map((f, i) => (
            <Rise key={f.value} delay={i * 0.06} className="flex flex-col-reverse justify-end bg-[var(--bg-primary)] p-7 sm:p-9">
              <dt className="mt-4 text-sm text-[var(--text-muted)]">{tr(f.label, locale)}</dt>
              <dd className="whitespace-nowrap font-display text-[clamp(1.8rem,4.5vw,3.8rem)] font-bold leading-none tracking-[-0.03em]">{f.value}</dd>
            </Rise>
          ))}
        </dl>
      </section>

      {/* Principles — each row expands on hover */}
      <section className="border-y border-[var(--border)]">
        <div className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-8">
          <h2 className="label flex items-center gap-3">
            <span className="text-[var(--accent)]">02</span>
            <span className="h-px w-10 bg-[var(--border-hover)]" />
            {t("values_title")}
          </h2>
        </div>
        <ul className="mt-10">
          {principles.map((p, i) => (
            <li key={p.key} className="group relative isolate overflow-hidden border-t border-[var(--border)]">
              <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[var(--accent)] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
              <div className="mx-auto grid max-w-[1400px] items-baseline gap-4 px-5 py-10 sm:px-8 md:grid-cols-[6rem_1fr_1.4fr]">
                <span className="font-mono text-sm text-[var(--text-subtle)] transition-colors group-hover:text-[var(--accent-ink)]">0{i + 1}</span>
                <h3 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-none tracking-[-0.04em] transition-colors group-hover:text-[var(--accent-ink)]">
                  {p.title}
                </h3>
                <p className="max-w-lg text-lg leading-relaxed text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent-ink)]">{t(p.key)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* How a project team is formed (roles, not headcount) */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="label flex items-center gap-3">
              <span className="text-[var(--accent)]">03</span>
              <span className="h-px w-10 bg-[var(--border-hover)]" />
              {t("team_title")}
            </h2>
            <p className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
              {isAr ? "فريق صغير متكامل، يعمل على مشروعك من البداية للنهاية." : "A small, complete team on your project from start to finish."}
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--text-muted)]">
              {isAr
                ? "يقود المؤسسون كل مشروع بأنفسهم، ونشكّل حوله الأدوار التي يحتاجها — دون طبقات إدارية تبطئ العمل."
                : "The founders lead every project personally, and we form the roles it needs around them — without layers of management slowing things down."}
            </p>
          </div>
          <ol className="border-t border-[var(--border)]">
            {teamRoles.map((r, i) => (
              <Rise as="li" key={r.role.en} delay={i * 0.05} className="grid gap-3 border-b border-[var(--border)] py-8 sm:grid-cols-[3rem_1fr_1.3fr] sm:gap-8">
                <span className="font-mono text-sm text-[var(--text-subtle)]">0{i + 1}</span>
                <h3 className="font-display text-xl font-bold">{tr(r.role, locale)}</h3>
                <p className="leading-relaxed text-[var(--text-muted)]">{tr(r.text, locale)}</p>
              </Rise>
            ))}
          </ol>
        </div>
      </section>

      <CommitmentsSection locale={locale} index="04" />
      <IndustriesSection locale={locale} index="05" />

      {/* Stack ticker */}
      <section className="py-16">
        <p className="label mx-auto mb-6 max-w-[1400px] px-5 sm:px-8">{isAr ? "التقنيات التي نعمل بها" : "Technologies we work with"}</p>
        <VelocityMarquee baseSpeed={30}>
          {stack.map((s) => (
            <span key={s} className="pe-10 font-display text-4xl font-bold tracking-[-0.02em] text-[var(--text-muted)] sm:text-6xl">
              {s}
            </span>
          ))}
        </VelocityMarquee>
      </section>

      <ProcessSection locale={locale} index="06" />
      <CtaSection locale={locale} />
    </>
  );
}
