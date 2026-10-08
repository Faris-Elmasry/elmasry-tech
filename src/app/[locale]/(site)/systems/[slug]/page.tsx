import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { EngagementSection, StepsSection, shell } from "@/components/sections/Blocks";
import { SystemScreen } from "@/components/sections/SystemScreen";
import { CtaSection, FaqSection } from "@/components/sections/HomeSections";
import { Heading } from "@/components/home/Heading";
import { Rise as Reveal } from "@/components/motion/Kinetic";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { tr } from "@/lib/content";
import { getSystem, readySystems, systemFaqs, systemSteps } from "@/lib/systems";
import { breadcrumbJsonLd, buildMetadata, JsonLd, organizationId } from "@/lib/seo";
import { localeUrl, locales, whatsappLink, type Locale } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((locale) => readySystems.map((s) => ({ locale, slug: s.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/systems/[slug]">): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const system = getSystem(slug);
  if (!system) return {};
  const isAr = locale === "ar";
  return buildMetadata({
    locale,
    path: `/systems/${slug}`,
    title: isAr ? `${system.name.ar} — نظام جاهز مع عرض تجريبي` : `${system.name.en} system — live demo available`,
    description: tr(system.summary, locale).slice(0, 158),
    keywords: system.keywords[locale],
  });
}

export default async function SystemPage({ params }: PageProps<"/[locale]/systems/[slug]">) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const system = getSystem(slug);
  if (!system) notFound();

  const isAr = locale === "ar";
  const name = tr(system.name, locale);
  const systemsLabel = isAr ? "الأنظمة الجاهزة" : "Ready-made systems";
  const others = readySystems.filter((s) => s.slug !== slug);
  const demoMsg = isAr ? `مرحبًا، أود طلب عرض تجريبي لنظام ${name}.` : `Hi, I'd like a live demo of the ${name} system.`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${name} — Elmasry Tech`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Windows, Android, iOS",
    description: tr(system.summary, locale),
    url: localeUrl(locale, `/systems/${slug}`),
    publisher: { "@id": organizationId },
    inLanguage: ["ar", "en"],
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: systemsLabel, path: "/systems" },
            { name, path: `/systems/${slug}` },
          ]),
          productLd,
        ]}
      />
      <PageHeader eyebrow={systemsLabel} title={name} sub={tr(system.tagline, locale)}>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
          <Button href={whatsappLink(demoMsg)} size="lg" leftIcon={<WhatsAppIcon className="h-5 w-5" />}>
            {isAr ? "اطلب عرضًا تجريبيًا" : "Request a live demo"}
          </Button>
          <Button href={`/${locale}/contact?service=ready-made-system`} variant="outline" size="lg" rightIcon={<ArrowUpRight className="h-5 w-5 rtl-flip" />}>
            {isAr ? "اطلب عرض سعر" : "Get a quote"}
          </Button>
        </Reveal>
      </PageHeader>

      {/* Overview: summary + who it is for, next to the illustrative screen */}
      <section className={`${shell} grid items-start gap-14 pb-24 lg:grid-cols-[1fr_1.15fr]`}>
        <Reveal>
          <p className="eyebrow">{isAr ? "نظرة عامة" : "Overview"}</p>
          <p className="mt-6 text-xl leading-relaxed text-pretty sm:text-2xl sm:leading-relaxed">{tr(system.summary, locale)}</p>
          <p className="eyebrow mt-12">{isAr ? "مناسب لـ" : "Built for"}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {system.audience[locale].map((a) => (
              <li key={a} className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)]">
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <SystemScreen system={system} locale={locale} />
        </Reveal>
      </section>

      {/* Modules */}
      <section className={`${shell} py-24 sm:py-32`}>
        <Heading
          index="01"
          label={isAr ? "وحدات النظام" : "Modules"}
          title={isAr ? "كل ما يحتاجه التشغيل اليومي، في نظام واحد." : "Everything daily operations need, in one system."}
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {system.modules.map((m, i) => (
            <Reveal as="li" key={m.title.en} delay={(i % 3) * 0.06} className="bg-[var(--bg-primary)] p-8">
              <span className="font-mono text-sm text-[var(--accent)]">0{i + 1}</span>
              <h3 className="mt-8 font-display text-xl font-bold">{tr(m.title, locale)}</h3>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{tr(m.text, locale)}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Highlights + integrations */}
      <section className={`${shell} grid gap-6 pb-24 lg:grid-cols-[1.3fr_1fr]`}>
        <Reveal className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-card)] p-8 sm:p-10">
          <div className="flex items-center gap-3">
            <DynamicIcon name={system.icon} className="h-6 w-6 text-[var(--accent)]" />
            <h2 className="font-display text-2xl font-bold">{isAr ? "أبرز المزايا" : "Highlights"}</h2>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {system.highlights[locale].map((h) => (
              <li key={h} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-between gap-10 rounded-[1.75rem] border border-[var(--border)] p-8 sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-bold">{isAr ? "التكامل والأجهزة" : "Integrations & hardware"}</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {system.integrations[locale].map((x) => (
                <li key={x} className="rounded-full border border-[var(--border)] px-3.5 py-1.5 text-sm">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            {isAr
              ? "يعمل على الويب وويندوز وأندرويد و iOS، سحابيًا أو على خادمك الخاص، بالعربية والإنجليزية."
              : "Runs on web, Windows, Android and iOS — cloud or on your own server — in Arabic and English."}
          </p>
        </Reveal>
      </section>

      <StepsSection
        locale={locale}
        index="02"
        label={isAr ? "كيف تبدأ" : "Getting started"}
        title={isAr ? "من العرض التجريبي إلى التشغيل في أيام." : "From demo to go-live in days."}
        steps={systemSteps}
      />
      <EngagementSection locale={locale} index="03" />
      <FaqSection locale={locale} index="04" items={systemFaqs} title={isAr ? "أسئلة شائعة" : "Common questions"} />

      <section className={`${shell} pb-24`}>
        <p className="eyebrow mb-6">{isAr ? "أنظمة أخرى" : "Other systems"}</p>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] grid-cols-2 sm:grid-cols-3 lg:grid-cols-7">
          {others.map((s) => (
            <li key={s.slug} className="bg-[var(--bg-primary)]">
              <Link href={`/${locale}/systems/${s.slug}`} className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-[var(--bg-card)]">
                <DynamicIcon name={s.icon} className="h-5 w-5 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                <span className="font-display font-semibold">{tr(s.name, locale)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Button href={`/${locale}/systems`} variant="ghost" className="mt-8" leftIcon={<ArrowLeft className="h-4 w-4 rtl-flip" />}>
          {isAr ? "جميع الأنظمة" : "All systems"}
        </Button>
      </section>

      <CtaSection locale={locale} />
    </>
  );
}
