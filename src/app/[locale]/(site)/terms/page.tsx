import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";
import { termsOfService } from "@/lib/legal";
import { tr } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { seoFor } from "@/lib/seo-copy";
import type { Locale } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/terms">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return buildMetadata({
    locale,
    path: "/terms",
    title: tr(seoFor("terms").title, locale),
    description: tr(seoFor("terms").description, locale),
  });
}

export default async function TermsPage({ params }: PageProps<"/[locale]/terms">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  return <LegalPage doc={termsOfService} locale={locale} path="/terms" />;
}
