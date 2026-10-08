import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServicesList } from "@/components/sections/ServicesList";
import { SystemsSection } from "@/components/sections/SystemsSection";
import { EngagementSection, IndustriesSection } from "@/components/sections/Blocks";
import { CtaSection, FaqSection, ProcessSection } from "@/components/sections/HomeSections";
import { faqs, services, tr } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd } from "@/lib/seo";
import { localeUrl, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const isAr = locale === "ar";
  return buildMetadata({
    locale,
    path: "/services",
    title: isAr ? "خدمات تطوير البرمجيات: مواقع وتطبيقات وأنظمة ERP" : "Software Development Services in Egypt",
    description: isAr
      ? "خدمات شركة برمجة في مصر: تصميم مواقع، تطبيقات موبايل أندرويد و iOS، برامج ERP ومخازن وحسابات، سيستم كاشير، شات بوت وأتمتة. جرّب ديمو أو اطلب عرض سعر."
      : "Website design, iOS & Android apps, custom ERP and POS systems, AI chatbots and automation — software development services in Egypt. Try a demo or get a quote.",
  });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("services_page");

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: localeUrl(locale, `/services/${s.slug}`),
      name: tr(s.title, locale),
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [{ name: t("eyebrow"), path: "/services" }]),
          itemList,
          faqJsonLd(faqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }))),
        ]}
      />
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("subtitle")} />
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <ServicesList locale={locale} />
      </section>
      <SystemsSection locale={locale} index="02" />
      <EngagementSection locale={locale} index="03" />
      <IndustriesSection locale={locale} index="04" />
      <ProcessSection locale={locale} index="05" />
      <FaqSection locale={locale} index="06" />
      <CtaSection locale={locale} />
    </>
  );
}
