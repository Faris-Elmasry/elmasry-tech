import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Rise } from "@/components/motion/Kinetic";
import { ArrowLink, Chapter, SignOff, StudioHero } from "@/components/studio/kit";
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
  const isAr = locale === "ar";
  const workLabel = isAr ? "أعمالنا" : "Work";
  const title = localize(project, "title", locale);
  const longDesc = localize(project, "long_desc", locale);
  const results = localize(project, "results", locale)
    .split(/(?<=[.!؟])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const category = ["system", "web", "mobile", "saas", "other"].includes(project.category) ? t(project.category as "system") : project.category;
  const gallery = [project.thumbnail, ...project.images].filter((x): x is string => !!x);

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
            { name: workLabel, path: "/portfolio" },
            { name: title, path: `/portfolio/${slug}` },
          ]),
          workLd,
        ]}
      />

      <StudioHero
        locale={locale}
        crumbs={[{ name: workLabel, href: `/${locale}/portfolio` }, { name: title }]}
        kicker={category}
        title={title}
        sub={localize(project, "description", locale)}
        wide
        actions={
          <>
            {project.roi_metric && <span className="rounded-full bg-[var(--accent)] px-4 py-2 font-medium text-[var(--accent-ink)]">{project.roi_metric}</span>}
            {project.client_name && <span className="text-[var(--text-muted)]">{project.client_name}</span>}
            {project.live_url && (
              <Button href={project.live_url} variant="outline" rightIcon={<ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />}>
                {t("live")}
              </Button>
            )}
          </>
        }
      />

      {gallery.length > 0 && (
        <section className="mx-auto w-full max-w-[1400px] px-5 pb-20 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {gallery.slice(0, 5).map((src, i) => (
              <Rise key={src} delay={(i % 2) * 0.06} className={i === 0 ? "sm:col-span-2" : undefined}>
                <div className={`relative overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-card)] ${i === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
                  <Image src={src} alt={`${title} — ${i + 1}`} fill sizes={i === 0 ? "(min-width: 1400px) 1336px, 100vw" : "(min-width: 640px) 50vw, 100vw"} className="object-cover" preload={i === 0} />
                </div>
              </Rise>
            ))}
          </div>
        </section>
      )}

      {(longDesc || results.length > 0) && (
        <Chapter index="01" label={t("overview")} title={isAr ? "الحكاية باختصار." : "The story, briefly."}>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-12 lg:col-span-8">
              {longDesc && (
                <Rise>
                  <p className="max-w-3xl text-xl leading-relaxed text-pretty sm:text-2xl sm:leading-relaxed">{longDesc}</p>
                </Rise>
              )}
              {results.length > 0 && (
                <Rise>
                  <h3 className="label">{t("results")}</h3>
                  <ol className="mt-6 border-b border-[var(--border)]">
                    {results.map((r, i) => (
                      <li key={i} className="flex gap-5 border-t border-[var(--border)] py-5 text-lg leading-snug">
                        <span className="font-mono text-sm leading-7 text-[var(--accent)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {r}
                      </li>
                    ))}
                  </ol>
                </Rise>
              )}
            </div>
            <Rise delay={0.1} className="self-start rounded-[1.25rem] border border-[var(--border-hover)] bg-[var(--bg-card)] p-7 lg:sticky lg:top-24 lg:col-span-4">
              <p className="title-sm text-xl font-bold">{t("similar")}</p>
              <p className="mt-2 leading-relaxed text-[var(--text-muted)]">
                {isAr ? "احكي لنا محتاج إيه، ونقول لك هنعمله إزاي وفي قد إيه." : "Tell us what you need — we’ll tell you how we’d do it and how long it takes."}
              </p>
              <Button href={`/${locale}/contact`} className="mt-6" fullWidth>
                {isAr ? "ابدأ مشروعك" : "Start a project"}
              </Button>
            </Rise>
          </div>
        </Chapter>
      )}

      <div className="mx-auto w-full max-w-[1400px] border-t border-[var(--border)] px-5 py-10 sm:px-8">
        <ArrowLink href={`/${locale}/portfolio`}>{t("back")}</ArrowLink>
      </div>
      <SignOff locale={locale} title={isAr ? "عندك فكرة شبه دي؟ يلا نتكلم." : "Have something similar in mind? Let’s talk."} />
    </>
  );
}
