import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaSection, FaqSection, ProcessSection } from "@/components/sections/HomeSections";
import { Rise as Reveal } from "@/components/motion/Kinetic";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { Heading } from "@/components/home/Heading";
import { shell } from "@/components/sections/Blocks";
import { faqs, getService, services, tr } from "@/lib/content";
import { serviceDetails } from "@/lib/service-details";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd, organizationId } from "@/lib/seo";
import { localeUrl, locales, whatsappLink, type Locale } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    locale,
    path: `/services/${slug}`,
    title: tr(service.seoTitle, locale),
    description: tr(service.seoDescription, locale),
    keywords: service.keywords[locale],
  });
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const service = getService(slug);
  if (!service) notFound();

  const t = await getTranslations("services_page");
  const isAr = locale === "ar";
  const title = tr(service.title, locale);
  const detail = serviceDetails[slug];
  const others = services.filter((s) => s.slug !== slug);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: tr(service.label, locale),
    description: tr(service.seoDescription, locale),
    url: localeUrl(locale, `/services/${slug}`),
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "Egypt" },
    availableLanguage: ["ar", "en"],
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: t("eyebrow"), path: "/services" },
            { name: tr(service.label, locale), path: `/services/${slug}` },
          ]),
          serviceLd,
          ...(detail ? [faqJsonLd(detail.faqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) })))] : []),
        ]}
      />
      <PageHeader image={`/images/services/${slug}.jpg`} eyebrow={tr(service.label, locale)} title={title} sub={tr(service.summary, locale)}>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
          <Button href={`/${locale}/contact?service=${slug}`} size="lg" rightIcon={<ArrowUpRight className="h-5 w-5 rtl-flip" />}>
            {t("request")}
          </Button>
          <Button
            href={whatsappLink(`${locale === "ar" ? "مرحبًا، أود معرفة التفاصيل والتكلفة لخدمة" : "Hi, I'd like details and pricing for"}: ${tr(service.label, locale)}`)}
            variant="outline"
            size="lg"
            leftIcon={<WhatsAppIcon className="h-5 w-5 text-[#25D366]" />}
          >
            {t("price_cta")}
          </Button>
        </Reveal>
      </PageHeader>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="eyebrow">{t("details")}</p>
          <p className="mt-6 text-xl leading-relaxed text-[var(--text-primary)] text-pretty sm:text-2xl sm:leading-relaxed">
            {tr(service.body, locale)}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
          <div className="flex items-center gap-3">
            <DynamicIcon name={service.icon} className="h-6 w-6 text-[var(--accent)]" />
            <h2 className="font-display text-xl font-semibold">{t("includes")}</h2>
          </div>
          <ul className="mt-6 space-y-4">
            {service.features[locale].map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--highlight)] text-[#121110]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {detail && (
        <>
          {/* Problem → how we solve it */}
          <section className={`${shell} py-24 sm:py-32`}>
            <Heading
              index="01"
              label={isAr ? "التحديات التي نحلّها" : "Problems we solve"}
              title={isAr ? "من المشكلة اليومية إلى حل يعمل." : "From the everyday problem to a working fix."}
            />
            <ul className="mt-14 border-t border-[var(--border)]">
              {detail.challenges.map((c, i) => (
                <Reveal as="li" key={c.problem.en} delay={i * 0.06} className="grid gap-4 border-b border-[var(--border)] py-8 md:grid-cols-[4rem_1fr_1fr] md:gap-10">
                  <span className="font-mono text-sm text-[var(--accent)]">0{i + 1}</span>
                  <p className="font-display text-xl font-bold leading-snug sm:text-2xl">{tr(c.problem, locale)}</p>
                  <p className="flex gap-3 text-lg leading-relaxed text-[var(--text-muted)]">
                    <ArrowUpRight className="mt-1.5 h-4 w-4 shrink-0 text-[var(--accent)] rtl-flip" aria-hidden="true" />
                    {tr(c.solution, locale)}
                  </p>
                </Reveal>
              ))}
            </ul>
          </section>

          {/* Deliverables + timeline/stack */}
          <section className={`${shell} grid gap-6 pb-24 lg:grid-cols-[1.4fr_1fr]`}>
            <Reveal className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-card)] p-8 sm:p-10">
              <h2 className="font-display text-2xl font-bold">{isAr ? "ما الذي تستلمه" : "What you receive"}</h2>
              <ol className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {detail.deliverables[locale].map((d, i) => (
                  <li key={d} className="flex gap-4">
                    <span className="font-mono text-xs leading-7 text-[var(--text-subtle)]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col gap-8 rounded-[1.75rem] border border-[var(--border)] p-8 sm:p-10">
              <div>
                <p className="eyebrow">{isAr ? "المدة المعتادة" : "Typical timeline"}</p>
                <p className="mt-3 font-display text-xl font-bold leading-snug">{tr(detail.timeline, locale)}</p>
              </div>
              <div>
                <p className="eyebrow">{isAr ? "التقنيات" : "Technologies"}</p>
                <ul dir="ltr" className="mt-4 flex flex-wrap gap-2">
                  {detail.stack.map((x) => (
                    <li key={x} className="rounded-full border border-[var(--border)] px-3.5 py-1.5 font-mono text-xs">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>

          {/* Typical projects */}
          <section className={`${shell} pb-24 sm:pb-32`}>
            <Heading index="02" label={isAr ? "أمثلة على المشاريع" : "Typical projects"} title={isAr ? "ما الذي نبنيه غالبًا في هذه الخدمة." : "What we usually build here."} />
            <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
              {detail.useCases.map((u, i) => (
                <Reveal as="li" key={u.title.en} delay={i * 0.05} className="bg-[var(--bg-primary)] p-7">
                  <span className="font-mono text-xs text-[var(--text-subtle)]">{String.fromCharCode(65 + i)}</span>
                  <h3 className="mt-8 font-display text-lg font-bold">{tr(u.title, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{tr(u.text, locale)}</p>
                </Reveal>
              ))}
            </ul>
          </section>
        </>
      )}

      <ProcessSection locale={locale} index={detail ? "03" : "01"} />
      <FaqSection
        locale={locale}
        index={detail ? "04" : "02"}
        items={detail ? [...detail.faqs, ...faqs.slice(0, 2)] : undefined}
        title={detail ? (isAr ? `أسئلة شائعة عن ${tr(service.label, locale)}` : `${tr(service.label, locale)} — common questions`) : undefined}
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <p className="eyebrow mb-6">{t("related")}</p>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] grid-cols-2 lg:grid-cols-5">
          {others.map((s) => (
            <li key={s.slug} className="bg-[var(--bg-primary)]">
              <Link href={`/${locale}/services/${s.slug}`} className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-[var(--bg-card)]">
                <DynamicIcon name={s.icon} className="h-5 w-5 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                <span className="font-display font-semibold">{tr(s.label, locale)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaSection locale={locale} />
    </>
  );
}
