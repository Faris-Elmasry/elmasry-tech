import { getTranslations } from "next-intl/server";
import { CtaBlock, FaqBlock } from "@/components/home/HomeBlocks";
import { ProcessPath } from "@/components/home/ProcessPath";
import type { Locale } from "@/lib/site";

// Shared blocks reused by inner pages (services, about, portfolio).
export const CtaSection = CtaBlock;
export const FaqSection = FaqBlock;

export async function ProcessSection({ locale, index }: { locale: Locale; index: string }) {
  const t = await getTranslations("home");
  return <ProcessPath locale={locale} index={index} label={t("process_eyebrow")} title={t("process_title")} />;
}
