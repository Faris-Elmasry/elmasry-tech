import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { WorldDemo } from "@/components/archive/world-tour/WorldDemo";
import { isLocale, type Locale } from "@/lib/site";

export const metadata: Metadata = {
  title: "Demo — 3D world",
  robots: { index: false, follow: false },
};

export default async function WorldDemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang: Locale = isLocale(locale) ? locale : "en";
  return <WorldDemo locale={lang} />;
}
