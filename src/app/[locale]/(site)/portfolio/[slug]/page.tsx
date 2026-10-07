import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaSection } from "@/components/sections/HomeSections";
import { Rise as Reveal } from "@/components/motion/Kinetic";
import { Button } from "@/components/ui/Button";
import { getProject } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata, JsonLd, organizationId } from "@/lib/seo";
import { localeUrl, type Locale } from "@/lib/site";
import { localize, truncate } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio/[slug]">): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const project = await getProject(slug);
  if (!project) return { title: "404", robots: { index: false } };
  return buildMetadata({
    locale,
    path: `/portfolio/${slug}`,
    title: localize(project, "title", locale),
    description: truncate(localize(project, "description", locale), 155),
    keywords: project.tech_stack,
  });
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/portfolio/[slug]">) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const project = await getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("work_page");
  const title = localize(project, "title", locale);
  const longDesc = localize(project, "long_desc", locale);
  const results = localize(project, "results", locale)
    .split(/(?<=[.!؟])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const category = ["system", "web", "mobile", "saas", "other"].includes(project.category)
    ? t(project.category as "system")
    : project.category;

  const workLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: localize(project, "description", locale),
    url: localeUrl(locale, `/portfolio/${slug}`),
    creator: { "@id": organizationId },
    keywords: project.tech_stack.join(", "),
    ...(project.thumbnail ? { image: project.thumbnail } : {}),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: t("eyebrow"), path: "/portfolio" },
            { name: title, path: `/portfolio/${slug}` },
          ]),
          workLd,
        ]}
      />
      <PageHeader eyebrow={category} title={title} sub={localize(project, "description", locale)}>
        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
          {project.roi_metric && (
            <span className="rounded-full bg-[var(--highlight)] px-4 py-2 text-sm font-medium text-[#121110]">{project.roi_metric}</span>
          )}
          {project.client_name && <span className="text-sm text-[var(--text-muted)]">{project.client_name}</span>}
          {project.live_url && (
            <Button href={project.live_url} variant="outline" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4 rtl-flip" />}>
              {t("live")}
            </Button>
          )}
        </Reveal>
      </PageHeader>

      <section className="mx-auto grid max-w-7xl gap-16 px-5 pb-24 sm:px-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-16">
          {longDesc && (
            <Reveal>
              <h2 className="eyebrow">{t("overview")}</h2>
              <p className="mt-5 text-xl leading-relaxed text-pretty">{longDesc}</p>
            </Reveal>
          )}
          {results.length > 0 && (
            <Reveal>
              <h2 className="eyebrow">{t("results")}</h2>
              <ol className="mt-6 border-t border-[var(--border)]">
                {results.map((r, i) => (
                  <li key={i} className="flex gap-5 border-b border-[var(--border)] py-5 text-lg">
                    <span className="font-mono text-sm text-[var(--accent)]">0{i + 1}</span>
                    {r}
                  </li>
                ))}
              </ol>
            </Reveal>
          )}
        </div>
        <Reveal delay={0.1} className="self-start rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8 lg:sticky lg:top-28">
          <h2 className="eyebrow">{t("stack")}</h2>
          <ul dir="ltr" className="mt-5 flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <li key={tech} className="rounded-full border border-[var(--border)] px-3.5 py-1.5 font-mono text-sm">
                {tech}
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-[var(--border)] pt-6">
            <p className="font-display text-lg font-semibold">{t("similar")}</p>
            <Button href={`/${locale}/contact`} className="mt-4" fullWidth>
              {locale === "ar" ? "ابدأ مشروعك" : "Start a project"}
            </Button>
          </div>
        </Reveal>
      </section>

      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <Button href={`/${locale}/portfolio`} variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4 rtl-flip" />}>
          {t("back")}
        </Button>
      </div>
      <CtaSection locale={locale} />
    </>
  );
}
