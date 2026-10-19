import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Rise } from "@/components/motion/Kinetic";
import { ArrowLink, Chapter, Faq, ltr, SignOff, StudioHero } from "@/components/studio/kit";
import { ReadingToc } from "@/components/studio/ReadingToc";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { getService, tr } from "@/lib/content";
import { getSystem } from "@/lib/systems";
import { getGuide, guides, plainText, readingTime, relatedGuides, type GuideBlock } from "@/lib/guides";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd, organizationId } from "@/lib/seo";
import { localeUrl, locales, site, siteUrl, whatsappLink, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => guides.map((g) => ({ locale, slug: g.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const guide = getGuide(slug);
  if (!guide) return {};
  const meta = buildMetadata({
    locale,
    path: `/guides/${slug}`,
    title: tr(guide.title, locale),
    description: tr(guide.description, locale),
    keywords: [tr(guide.keyword, locale)],
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: guide.published,
      modifiedTime: guide.updated,
      authors: [site.name],
    },
  };
}

/* ── Inline markup: [label](/path) links and **bold** (see src/lib/guides.ts) ── */

const linkCls =
  "font-medium text-[var(--text-primary)] underline decoration-[var(--accent)] decoration-1 underline-offset-[0.3em] transition-colors duration-300 hover:text-[var(--accent)]";

function Inline({ text, locale }: { text: string; locale: Locale }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          return /^https?:/.test(href) ? (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {label}
            </a>
          ) : (
            <Link key={i} href={`/${locale}${href}`} className={linkCls}>
              {label}
            </Link>
          );
        }
        const bold = /^\*\*([^*]+)\*\*$/.exec(part);
        if (bold) {
          return (
            <strong key={i} className="font-semibold text-[var(--text-primary)]">
              {bold[1]}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}

/** Body copy: ~70ch measure, 1.8 line-height in Arabic, a touch tighter in Latin. */
const prose = "text-[1.0625rem] leading-[1.75] text-[var(--text-primary)]/80 sm:text-lg rtl:leading-[1.8]";

function Block({ block, locale }: { block: GuideBlock; locale: Locale }) {
  if (typeof block === "string") {
    return (
      <p className={prose}>
        <Inline text={block} locale={locale} />
      </p>
    );
  }
  if ("note" in block) {
    return (
      <p className={`${prose} rounded-[1rem] border border-[var(--border)] border-s-2 border-s-[var(--accent)] bg-[var(--bg-card)] p-5 !text-[var(--text-primary)] sm:p-6`}>
        <Inline text={block.note} locale={locale} />
      </p>
    );
  }
  if (block.ordered) {
    return (
      <ol className="space-y-3">
        {block.list.map((item, i) => (
          <li key={i} className={`${prose} flex gap-4`}>
            <span aria-hidden="true" className="w-6 shrink-0 pt-[0.2em] font-mono text-sm text-[var(--accent)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <Inline text={item} locale={locale} />
            </span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="space-y-3">
      {block.list.map((item, i) => (
        <li key={i} className={`${prose} flex gap-4`}>
          <span aria-hidden="true" className="mt-[0.75em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          <span className="min-w-0">
            <Inline text={item} locale={locale} />
          </span>
        </li>
      ))}
    </ul>
  );
}

const fade = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="label">{label}</dt>
      <dd className="text-[var(--text-primary)]">{children}</dd>
    </div>
  );
}

export default async function GuidePage({ params }: Props) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const guide = getGuide(slug);
  if (!guide) notFound();

  const isAr = locale === "ar";
  const path = `/guides/${slug}`;
  const title = tr(guide.title, locale);
  const description = tr(guide.description, locale);
  const guidesLabel = isAr ? "الأدلة" : "Guides";
  const fmt = new Intl.DateTimeFormat(isAr ? "ar-EG-u-nu-latn" : "en-GB", { dateStyle: "long" });
  const updated = fmt.format(new Date(guide.updated));
  const published = fmt.format(new Date(guide.published));
  const minutes = readingTime(guide.readingMinutes, locale);
  const index = guides.findIndex((g) => g.slug === slug);
  const message = isAr ? `أهلًا، قريت دليل «${title}» وعايز أتكلم عن شغلي.` : `Hi, I read your guide “${title}” and I’d like to talk about my business.`;

  const toc = guide.sections.map((s, i) => ({ id: `section-${i + 1}`, title: tr(s.heading, locale) }));
  const faqItems = guide.faqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }));
  const related = relatedGuides(guide);
  const relatedPages = [
    ...guide.relatedServices.flatMap((s) => {
      const service = getService(s);
      return service ? [{ href: `/${locale}/services/${s}`, label: tr(service.title, locale) }] : [];
    }),
    ...guide.relatedSystems.flatMap((s) => {
      const system = getSystem(s);
      return system ? [{ href: `/${locale}/systems/${s}`, label: tr(system.name, locale) }] : [];
    }),
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${localeUrl(locale, path)}#article`,
    headline: title,
    description,
    keywords: tr(guide.keyword, locale),
    datePublished: guide.published,
    dateModified: guide.updated,
    inLanguage: isAr ? "ar-EG" : "en",
    image: `${siteUrl}/${locale}/opengraph-image`,
    url: localeUrl(locale, path),
    mainEntityOfPage: { "@type": "WebPage", "@id": localeUrl(locale, path) },
    author: { "@type": "Organization", "@id": organizationId, name: site.name, url: siteUrl },
    publisher: { "@type": "Organization", "@id": organizationId, name: site.name, url: siteUrl },
    articleSection: guidesLabel,
    abstract: plainText(tr(guide.intro, locale)),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: guidesLabel, path: "/guides" },
            { name: title, path },
          ]),
          articleLd,
          faqJsonLd(faqItems),
        ]}
      />

      <StudioHero
        locale={locale}
        crumbs={[{ name: guidesLabel, href: `/${locale}/guides` }, { name: title }]}
        sheet={ltr(`${String(index + 1).padStart(2, "0")} / ${String(guides.length).padStart(2, "0")}`)}
        kicker={isAr ? `دليل عملي · ${minutes}` : `Practical guide · ${minutes}`}
        title={<span className="block text-[clamp(2.2rem,4.8vw,4.4rem)] rtl:leading-[1.3]">{title}</span>}
        sub={tr(guide.intro, locale)}
        wide
      >
        <dl className="in mb-6 grid gap-6 rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-card)]/60 p-6 sm:grid-cols-4 sm:p-7" style={fade(300)}>
          <Meta label={isAr ? "آخر تحديث" : "Updated"}>
            <time dateTime={guide.updated}>{updated}</time>
          </Meta>
          <Meta label={isAr ? "نُشر" : "Published"}>
            <time dateTime={guide.published}>{published}</time>
          </Meta>
          <Meta label={isAr ? "وقت القراءة" : "Reading time"}>{minutes}</Meta>
          <Meta label={isAr ? "كتبه" : "Written by"}>{isAr ? `فريق ${site.name}` : `The ${site.name} team`}</Meta>
        </dl>
      </StudioHero>

      <section className="border-t border-[var(--border)]">
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-16">
          <aside className="hidden lg:col-span-4 lg:block xl:col-span-3">
            <ReadingToc label={isAr ? "محتويات الدليل" : "In this guide"} updated={isAr ? "في الدليل ده" : "In this guide"} items={toc} />
          </aside>

          <div className="min-w-0 lg:col-span-8 xl:col-span-7">
            {/* Mobile / tablet table of contents (no JS). */}
            <details className="group mb-12 rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-card)]/60 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 title-sm text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {isAr ? "محتويات الدليل" : "In this guide"}
                <span aria-hidden="true" className="font-mono text-sm text-[var(--accent)] transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <ol className="space-y-1 border-t border-[var(--border)] p-5">
                {toc.map((t, i) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="flex gap-3 py-1.5 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]">
                      <span className="font-mono text-xs leading-6 text-[var(--text-subtle)]">{String(i + 1).padStart(2, "0")}</span>
                      {t.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <article className="max-w-[70ch]">
              {guide.sections.map((section, i) => (
                <section key={section.heading.en} id={toc[i].id} aria-labelledby={`${toc[i].id}-title`} className="scroll-mt-24 border-t border-[var(--border)] pb-4 pt-10 first:border-t-0 first:pt-0 sm:pt-12">
                  <span className="font-mono text-sm text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                  <h2 id={`${toc[i].id}-title`} className="mt-3 title-sm text-2xl font-bold leading-snug text-balance sm:text-[1.875rem]">
                    {tr(section.heading, locale)}
                  </h2>
                  <div className="mt-6 space-y-6">
                    {section.body[locale].map((block, j) => (
                      <Block key={j} block={block} locale={locale} />
                    ))}
                  </div>
                </section>
              ))}

              {/* In-article CTA */}
              <div className="mt-12 rounded-[1.25rem] border border-[var(--border-hover)] bg-[var(--bg-card)] p-6 sm:p-8">
                <p className="label !text-[var(--accent)]">{isAr ? "عايز تطبّق ده على شغلك؟" : "Want to apply this to your business?"}</p>
                <p className="mt-3 title-sm text-xl font-bold leading-snug sm:text-2xl">{tr(guide.cta, locale)}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <ArrowLink href={`/${locale}/contact`}>{isAr ? "اطلب استشارة مجانية" : "Book a free consultation"}</ArrowLink>
                  <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-medium">
                    <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                    <span className="link-draw pb-0.5">{isAr ? "كلّمنا على واتساب" : "Message us on WhatsApp"}</span>
                  </a>
                </div>
              </div>

              {relatedPages.length > 0 && (
                <nav aria-label={isAr ? "صفحات مرتبطة" : "Related pages"} className="mt-12">
                  <p className="label">{isAr ? "صفحات ممكن تفيدك" : "Pages that may help"}</p>
                  <ul className="mt-4 border-b border-[var(--border)]">
                    {relatedPages.map((p) => (
                      <li key={p.href} className="border-t border-[var(--border)]">
                        <Link href={p.href} className="group flex items-center justify-between gap-4 py-4 transition-colors duration-500 hover:text-[var(--accent)]">
                          <span className="font-medium">{p.label}</span>
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--text-subtle)] transition-colors group-hover:text-[var(--accent)] rtl:-scale-x-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </article>
          </div>
        </div>
      </section>

      <Chapter
        index={String(guide.sections.length + 1).padStart(2, "0")}
        label={isAr ? "أسئلة" : "Questions"}
        title={isAr ? "أسئلة بتتكرر كتير." : "Questions we hear a lot."}
        tone="card"
      >
        <Faq items={faqItems} />
      </Chapter>

      {/* Related guides */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="title-sm text-2xl font-bold sm:text-3xl">{isAr ? "أدلة تانية ممكن تفيدك" : "More guides you may find useful"}</h2>
            <ArrowLink href={`/${locale}/guides`}>{isAr ? "كل الأدلة" : "All guides"}</ArrowLink>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {related.map((g, i) => (
              <Rise as="li" key={g.slug} delay={i * 0.05}>
                <Link
                  href={`/${locale}/guides/${g.slug}`}
                  className="group flex h-full flex-col rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-colors duration-500 hover:border-[var(--border-hover)] sm:p-7"
                >
                  <span className="label">{readingTime(g.readingMinutes, locale)}</span>
                  <h3 className="mt-4 title-sm text-xl font-bold leading-snug transition-colors duration-500 group-hover:text-[var(--accent)]">{tr(g.title, locale)}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{tr(g.description, locale)}</p>
                  <span className="mt-auto flex justify-end pt-6">
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[var(--text-subtle)] transition-colors group-hover:text-[var(--accent)] rtl:-scale-x-100" />
                  </span>
                </Link>
              </Rise>
            ))}
          </ul>
        </div>
      </section>

      <SignOff locale={locale} message={message} title={tr(guide.cta, locale)} />
    </>
  );
}
