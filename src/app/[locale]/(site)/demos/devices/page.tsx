import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ClosingCta } from "@/components/demos/devices/ClosingCta";
import { DevicesDemo } from "@/components/demos/devices/DevicesDemo";
import { isLocale, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "عرض تجريبي — الأجهزة" : "Demo — Devices",
    robots: { index: false, follow: false },
  };
}

export default async function DevicesDemoPage({ params }: Props) {
  // a development preview of the hero — not a public page (it duplicated the homepage)
  if (process.env.NODE_ENV === "production") notFound();
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale: Locale = isLocale(raw) ? raw : "en";
  return (
    <>
      <DevicesDemo locale={locale} />
      <ClosingCta locale={locale} />
    </>
  );
}
