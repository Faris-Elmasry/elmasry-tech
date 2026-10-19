import Link from "next/link";
import { StudioHero } from "@/components/studio/kit";
import { ReadingToc } from "@/components/studio/ReadingToc";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { tr } from "@/lib/content";
import type { LegalDoc, LegalSection } from "@/lib/legal";
import { site, whatsappLink, type Locale } from "@/lib/site";

/**
 * Long-form legal document, written to be read: every section opens with a
 * one-line plain summary ("In short"), followed by the full wording. A sticky
 * table of contents tracks the section being read.
 */
export function LegalPage({ doc, locale, path }: { doc: LegalDoc; locale: Locale; path: string }) {
  const isAr = locale === "ar";
  const title = tr(doc.title, locale);
  const updated = new Intl.DateTimeFormat(isAr ? "ar-EG-u-nu-latn" : "en-GB", { dateStyle: "long" }).format(new Date(doc.updated));
  const other = path === "/privacy" ? { href: `/${locale}/terms`, label: isAr ? "الشروط والأحكام" : "Terms of service" } : { href: `/${locale}/privacy`, label: isAr ? "سياسة الخصوصية" : "Privacy policy" };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: title, path }])} />
      <StudioHero
        locale={locale}
        crumbs={[{ name: isAr ? "قانوني" : "Legal" }, { name: title }]}
        sheet={isAr ? `آخر تحديث ${updated}` : `Updated ${updated}`}
        kicker={isAr ? "قانوني · بكلام واضح" : "Legal · in plain words"}
        title={title}
        sub={tr(doc.intro, locale)}
        wide
      >
        <div className="in mb-6 rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-card)]/60 p-6 sm:p-7" style={{ "--d": "300ms" } as React.CSSProperties}>
          <p className="label">{isAr ? "باختصار شديد" : "The very short version"}</p>
          <ul className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {doc.highlights.map((i) => doc.sections[i]).map((s) => (
              <li key={s.heading.en} className="flex items-start gap-3 text-lg leading-snug">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                {tr(s.short, locale)}
              </li>
            ))}
          </ul>
        </div>
      </StudioHero>

      <section className="border-t border-[var(--border)]">
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <ReadingToc
              label={title}
              updated={isAr ? `آخر تحديث: ${updated}` : `Last updated: ${updated}`}
              items={doc.sections.map((s, i) => ({ id: `s${i + 1}`, title: tr(s.heading, locale) }))}
            />
          </div>
          <div className="lg:col-span-9">
            {doc.sections.map((sec, i) => (
              <article key={sec.heading.en} id={`s${i + 1}`} className="grid scroll-mt-24 gap-6 border-t border-[var(--border)] py-10 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-10">
                <header className="md:col-span-5">
                  <span className="font-mono text-sm text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 title-sm text-2xl font-bold">{tr(sec.heading, locale)}</h2>
                  <p className="mt-4 rounded-xl bg-[var(--bg-card)] p-4 leading-snug">
                    <span className="label me-2 !text-[var(--accent)]">{isAr ? "باختصار" : "In short"}</span>
                    {tr(sec.short, locale)}
                  </p>
                </header>
                <div className="space-y-4 text-lg leading-[1.85] text-[var(--text-primary)]/85 md:col-span-7 md:pt-9">
                  <Body text={tr(sec.body, locale)} />
                </div>
                {sec.table && <LegalTable table={sec.table} locale={locale} />}
              </article>
            ))}
            <div className="mt-6 flex flex-col gap-4 border-t border-[var(--border)] pt-10 text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
              <p>
                {site.email ? (
                  <>
                    {isAr ? "عندك سؤال عن الصفحة دي؟ ابعت لنا على " : "Questions about this page? Email "}
                    <a href={`mailto:${site.email}`} className="link-draw text-[var(--text-primary)]">
                      {site.email}
                    </a>
                  </>
                ) : (
                  <>
                    {isAr ? "عندك سؤال عن الصفحة دي؟ كلّمنا على " : "Questions about this page? Message us on "}
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-draw text-[var(--text-primary)]">
                      {isAr ? "واتساب" : "WhatsApp"}
                    </a>
                  </>
                )}
              </p>
              <Link href={other.href} className="link-draw text-[var(--text-primary)]">
                {other.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Paragraphs split on blank lines; "- " lines become a list; **x** is bold. */
function Body({ text }: { text: string }) {
  return text.split("\n\n").map((block, b) => {
    const lines = block.split("\n");
    const intro = lines.filter((l) => !l.startsWith("- "));
    const items = lines.filter((l) => l.startsWith("- "));
    return (
      <div key={b} className="space-y-3">
        {intro.map((l, i) => (
          <p key={i}>
            <Inline text={l} />
          </p>
        ))}
        {items.length > 0 && (
          <ul className="space-y-2.5">
            {items.map((l, i) => (
              <li key={i} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-[0.8em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>
                  <Inline text={l.slice(2)} />
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  });
}

function Inline({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-[var(--text-primary)]">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

/** Data table; on small screens each row becomes a labelled card. */
function LegalTable({ table, locale }: { table: NonNullable<LegalSection["table"]>; locale: Locale }) {
  const head = table.head.map((h) => tr(h, locale));
  return (
    <div className="md:col-span-12">
      <table className="w-full border-collapse text-start text-base leading-relaxed">
        <thead className="sr-only md:not-sr-only">
          <tr className="border-b border-[var(--border)]">
            {head.map((h) => (
              <th key={h} scope="col" className="label px-4 pb-3 text-start font-normal first:ps-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r} className="block rounded-xl bg-[var(--bg-card)] p-4 mb-3 md:mb-0 md:table-row md:rounded-none md:border-b md:border-[var(--border)] md:bg-transparent md:p-0">
              {row.map((cell, c) => (
                <td key={c} className={`block py-1 align-top md:table-cell md:px-4 md:py-4 md:first:ps-0 ${c === 0 ? "font-semibold text-[var(--text-primary)]" : "text-[var(--text-primary)]/85"}`}>
                  {c > 0 && <span className="label me-2 md:hidden">{head[c]}:</span>}
                  {tr(cell, locale)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
