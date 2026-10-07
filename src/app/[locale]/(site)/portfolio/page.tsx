import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/sections/PageHeader";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CtaSection } from "@/components/sections/HomeSections";
import { getProjects } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const isAr = locale === "ar";
  return buildMetadata({
    locale,
    path: "/portfolio",
    title: isAr ? "أعمالنا — مواقع وتطبيقات وأنظمة نفّذناها" : "Our Work — Websites, Apps & Systems",
    description: isAr
      ? "نماذج من أعمال Elmasry Tech: أنظمة إدارة ومواقع وتطبيقات جوال صمّمناها وطوّرناها لشركات في مصر."
      : "Selected projects by Elmasry Tech: business systems, websites and mobile apps designed and built for companies in Egypt.",
  });
}

export default async function PortfolioPage({ params }: PageProps<"/[locale]/portfolio">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("work_page");
  const th = await getTranslations("home");
  const projects = await getProjects();

  const labels: Record<string, string> = {
    all: t("all"),
    system: t("system"),
    web: t("web"),
    mobile: t("mobile"),
    saas: t("saas"),
    other: t("other"),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t("eyebrow"), path: "/portfolio" }])} />
      <PageHeader shape="dashboard" eyebrow={t("eyebrow")} title={t("title")} sub={t("subtitle")} />
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        {projects.length > 0 ? (
          <PortfolioGrid projects={projects} locale={locale} labels={labels} emptyLabel={t("empty")} />
        ) : (
          <p className="max-w-xl rounded-2xl border border-dashed border-[var(--border-hover)] p-8 text-lg text-[var(--text-muted)]">
            {th("work_empty")}
          </p>
        )}
      </section>
      <CtaSection locale={locale} />
    </>
  );
}
