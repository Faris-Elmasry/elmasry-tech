import { getTranslations } from "next-intl/server";
import { SystemsRail } from "@/components/home/SystemsRail";
import type { Locale } from "@/lib/site";

export async function SystemsSection({ locale, index = "02" }: { locale: Locale; index?: string }) {
  const t = await getTranslations("home");
  return (
    <SystemsRail
      locale={locale}
      index={index}
      label={t("systems_eyebrow")}
      title={t("systems_title")}
      sub={t("systems_sub")}
      cta={t("systems_cta")}
    />
  );
}
