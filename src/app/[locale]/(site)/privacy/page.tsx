import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";
import { privacyPolicy } from "@/lib/legal";
import { tr } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { seoFor } from "@/lib/seo-copy";
import type { Locale } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return buildMetadata({
    locale,
    path: "/privacy",
    title: tr(seoFor("privacy").title, locale),
    description: tr(seoFor("privacy").description, locale),
  });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  return <LegalPage doc={privacyPolicy} locale={locale} path="/privacy" />;
}
