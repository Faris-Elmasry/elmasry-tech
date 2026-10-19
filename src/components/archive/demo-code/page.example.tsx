import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CodeStory } from "@/components/archive/demo-code/CodeStory";
import { HowWeWork } from "@/components/archive/demo-code/HowWeWork";
import { ClosingCta } from "@/components/archive/demo-code/ClosingCta";

export const metadata: Metadata = {
  title: "Demo — Code to product",
  robots: { index: false, follow: false },
};

export default async function CodeDemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params;
  setRequestLocale(l);
  const locale = l === "ar" ? "ar" : "en";

  return (
    <>
      <CodeStory locale={locale} />
      <HowWeWork locale={locale} />
      <ClosingCta locale={locale} />
    </>
  );
}
