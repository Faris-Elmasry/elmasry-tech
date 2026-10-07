import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { serviceShapes } from "@/components/home/ServicesStory";
import { CtaSection, FaqSection, ProcessSection } from "@/components/sections/HomeSections";
import { Rise as Reveal } from "@/components/motion/Kinetic";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { getService, services, tr } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, JsonLd, organizationId } from "@/lib/seo";
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
  const title = tr(service.title, locale);
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
        ]}
      />
      <PageHeader shape={serviceShapes[slug]} eyebrow={tr(service.label, locale)} title={title} sub={tr(service.summary, locale)}>
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

      <ProcessSection locale={locale} index="01" />
      <FaqSection locale={locale} index="02" />

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <p className="eyebrow mb-6">{t("related")}</p>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-5">
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
