import { PageHeader } from "@/components/sections/PageHeader";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { tr } from "@/lib/content";
import type { LegalDoc } from "@/lib/legal";
import { site, type Locale } from "@/lib/site";

/** Long-form legal document: numbered sections with a sticky table of contents. */
export function LegalPage({ doc, locale, path }: { doc: LegalDoc; locale: Locale; path: string }) {
  const isAr = locale === "ar";
  const title = tr(doc.title, locale);
  const updated = new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-GB", { dateStyle: "long" }).format(new Date(doc.updated));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: title, path }])} />
      <PageHeader eyebrow={isAr ? "قانوني" : "Legal"} title={title} sub={tr(doc.intro, locale)} />
      <section className="mx-auto grid max-w-[1400px] gap-14 px-5 pb-28 sm:px-8 lg:grid-cols-[16rem_1fr]">
        <nav aria-label={title} className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">{isAr ? `آخر تحديث: ${updated}` : `Last updated: ${updated}`}</p>
          <ol className="mt-6 space-y-3 text-sm">
            {doc.sections.map((sec, i) => (
              <li key={sec.heading.en}>
                <a href={`#s${i + 1}`} className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]">
                  {i + 1}. {tr(sec.heading, locale)}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl">
          {doc.sections.map((sec, i) => (
            <article key={sec.heading.en} id={`s${i + 1}`} className="scroll-mt-28 border-t border-[var(--border)] py-10">
              <h2 className="flex gap-4 font-display text-2xl font-bold">
                <span className="font-mono text-sm leading-9 text-[var(--accent)]">0{i + 1}</span>
                {tr(sec.heading, locale)}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--text-muted)]">{tr(sec.body, locale)}</p>
            </article>
          ))}
          <p className="border-t border-[var(--border)] pt-10 text-[var(--text-muted)]">
            {isAr ? "لأي استفسار بخصوص هذه الصفحة راسلنا على " : "Questions about this page? Email "}
            <a href={`mailto:${site.email}`} className="link-draw text-[var(--text-primary)]">
              {site.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
