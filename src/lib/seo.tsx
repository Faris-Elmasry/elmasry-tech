import type { Metadata } from "next";
import { defaultLocale, hasRealPhone, locales, localeUrl, ogLocale, site, siteUrl, type Locale } from "@/lib/site";
import { services } from "@/lib/content";
import { readySystems } from "@/lib/systems";

interface PageSeo {
  locale: Locale;
  /** Path after the locale, e.g. "/services" or "" for home. */
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  /** Use the title as-is instead of applying the "| Elmasry Tech" template. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
}

/** Canonical + hreflang + OpenGraph/Twitter for one localized page. */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  absoluteTitle,
  noIndex,
}: PageSeo): Metadata {
  const url = localeUrl(locale, path);
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l === "ar" ? "ar-EG" : "en"] = localeUrl(l, path);
  languages["x-default"] = localeUrl(defaultLocale, path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

/** Renders a JSON-LD <script>, escaping "<" to avoid script-injection (per Next docs). */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationId = `${siteUrl}/#organization`;

export function organizationJsonLd(locale: Locale) {
  const isAr = locale === "ar";
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": organizationId,
    name: site.name,
    legalName: site.legalName,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/${locale}/opengraph-image`,
    ...(site.email ? { email: site.email } : {}),
    ...(hasRealPhone ? { telephone: site.whatsapp } : {}),
    foundingDate: String(site.foundingYear),
    description: isAr
      ? "شركة برمجة في مصر لتصميم وتطوير المواقع وتطبيقات الموبايل والبرامج والأنظمة المخصصة وحلول الذكاء الاصطناعي والأتمتة."
      : "Software development company in Egypt building websites, mobile apps, custom business systems, AI solutions and automation.",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city[locale],
      addressCountry: "EG",
    },
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "Place", name: "Middle East and North Africa" },
    ],
    knowsLanguage: ["ar", "en"],
    sameAs: Object.values(site.social),
    // What we offer, each linked to its own page (helps Google map services → URLs).
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isAr ? "خدمات وأنظمة Elmasry Tech" : "Elmasry Tech services and systems",
      itemListElement: [
        ...services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.label[locale], url: localeUrl(locale, `/services/${s.slug}`) },
        })),
        ...readySystems.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "SoftwareApplication", name: s.name[locale], applicationCategory: "BusinessApplication", url: localeUrl(locale, `/systems/${s.slug}`) },
        })),
      ],
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      ...(hasRealPhone ? { telephone: site.whatsapp } : {}),
      ...(site.email ? { email: site.email } : {}),
      availableLanguage: ["Arabic", "English"],
      areaServed: "EG",
    },
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: localeUrl(locale),
    name: site.name,
    inLanguage: locale === "ar" ? "ar-EG" : "en",
    publisher: { "@id": organizationId },
  };
}

export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  const home = locale === "ar" ? "الرئيسية" : "Home";
  const all = [{ name: home, path: "" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: localeUrl(locale, item.path),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
