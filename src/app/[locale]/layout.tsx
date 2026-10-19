import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { fontVariables } from "@/app/fonts";
import { isLocale, locales, site, siteUrl } from "@/lib/site";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isAr
        ? "شركة برمجة في مصر | مواقع وتطبيقات وأنظمة — Elmasry Tech"
        : "Software Development Company in Egypt | Elmasry Tech",
      template: `%s | ${site.name}`,
    },
    applicationName: site.name,
    authors: [{ name: site.legalName, url: siteUrl }],
    creator: site.legalName,
    publisher: site.legalName,
    formatDetection: { telephone: false, email: false, address: false },
    category: "technology",
    // Paste the codes from Google Search Console / Bing Webmaster Tools into the env.
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
      ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  // Only ship the namespaces client components actually use (Navbar, ContactForm,
  // error boundary). Server components read the full catalogue on the server.
  const all = await getMessages();
  const messages = { nav: all.nav, common: all.common, contact: all.contact };
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale === "ar" ? "ar-EG" : "en"} dir={dir} data-theme="dark" className={fontVariables}>
      <body className="min-h-dvh bg-[var(--bg-primary)] antialiased">
        {/* Without JS, scroll-reveal content would stay hidden — show it. */}
        <noscript>
          <style>{`.rise,.split .word-inner{opacity:1!important;transform:none!important}.scribble path{stroke-dashoffset:0!important}`}</style>
        </noscript>
        <JsonLd data={[organizationJsonLd(locale), websiteJsonLd(locale)]} />
        {/* Chrome/Edge prerender links marked data-prerender (e.g. the language switch,
            which is a full document load) as soon as the user hovers them → instant switch. */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ prerender: [{ where: { selector_matches: "a[data-prerender]" }, eagerness: "moderate" }] }),
          }}
        />
        <a href="#main-content" className="skip-to-content">
          {locale === "ar" ? "انتقل للمحتوى" : "Skip to content"}
        </a>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        {/* Vercel Analytics only exists on Vercel; elsewhere its script 404s and logs a console error. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
