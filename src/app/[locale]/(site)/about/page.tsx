import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaSection, ProcessSection } from "@/components/sections/HomeSections";
import { Rise as Reveal } from "@/components/motion/Kinetic";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";
import { stack } from "@/lib/content";
import type { Locale } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const isAr = locale === "ar";
  return buildMetadata({
    locale,
    path: "/about",
    title: isAr ? "عن Elmasry Tech — شركة برمجيات في القاهرة" : "About Elmasry Tech — Software Company in Cairo",
    description: isAr
      ? "Elmasry Tech شركة برمجيات في القاهرة أسسها مهندسان متخصصان، نطوّر المواقع والتطبيقات وأنظمة الإدارة للشركات في مصر والخليج، ونواصل الدعم بعد الإطلاق."
      : "Elmasry Tech is a Cairo-based software company founded by engineers, building websites, apps and business systems for companies in Egypt and the Gulf.",
  });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t("eyebrow"), path: "/about" }])} />
      <PageHeader shape="brain" eyebrow={t("eyebrow")} title={t("title")} sub={t("intro")} />

      <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">{t("story_title")}</h2>
        </Reveal>
        <div className="space-y-6 text-xl leading-relaxed text-[var(--text-muted)] text-pretty">
          <Reveal>
            {locale === "en" ? (
              // Drop cap only for Latin script — splitting an Arabic word breaks letter joining.
              <p>
                <span className="float-start me-3 mt-1 font-serif text-7xl leading-[0.8] text-[var(--text-primary)]">
                  {t("story_p1").charAt(0)}
                </span>
                {t("story_p1").slice(1)}
              </p>
            ) : (
              <p>{t("story_p1")}</p>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[var(--text-primary)]">{t("story_p2")}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--bg-secondary)] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">{t("values_title")}</h2>
          </Reveal>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {(["value_1", "value_2", "value_3"] as const).map((key, i) => (
              <Reveal as="li" key={key} delay={i * 0.08} className="border-t border-[var(--border-hover)] pt-6">
                <span className="font-serif text-5xl italic text-[var(--accent)]">{i + 1}</span>
                <p className="mt-4 text-lg leading-relaxed">{t(key)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">{t("team_title")}</h2>
            <p className="mt-3 text-[var(--text-muted)]">{t("team_note")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul dir="ltr" className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <li key={s} className="rounded-full border border-[var(--border)] px-4 py-2 font-mono text-sm text-[var(--text-muted)]">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ProcessSection locale={locale} index="01" />
      <div className="pt-24" />
      <CtaSection locale={locale} />
    </>
  );
}
