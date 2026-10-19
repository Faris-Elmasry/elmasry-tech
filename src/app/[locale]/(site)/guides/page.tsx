import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Rise } from "@/components/motion/Kinetic";
import { Chapter, ConsultActions, ltr, SignOff, StudioHero } from "@/components/studio/kit";
import { tr } from "@/lib/content";
import { guides, readingTime } from "@/lib/guides";
import { breadcrumbJsonLd, buildMetadata, JsonLd, organizationId } from "@/lib/seo";
import { localeUrl, type Locale } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const isAr = locale === "ar";
  return buildMetadata({
    locale,
    path: "/guides",
    title: isAr ? "أدلة لأصحاب الشغل: تكلفة المواقع والتطبيقات وبرامج الكاشير والحسابات" : "Guides for business owners: website, app, POS and ERP costs in Egypt",
    description: isAr
      ? "أدلة عملية بالعربي لأصحاب الشغل في مصر: تكلفة تصميم موقع وتطبيق، اختيار برنامج كاشير، حسابات ولا ERP، شات بوت واتساب، والفاتورة الإلكترونية."
      : "Practical guides for business owners in Egypt: website and app costs, choosing a POS system, accounting vs ERP, WhatsApp chatbots and e-invoice integration.",
    keywords: guides.map((g) => tr(g.keyword, locale)),
  });
}

export default async function GuidesPage({ params }: Props) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const isAr = locale === "ar";
  const label = isAr ? "الأدلة" : "Guides";

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isAr ? "دليل أصحاب الشغل للبرمجة والأنظمة" : "Guides for business owners",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: localeUrl(locale, `/guides/${g.slug}`),
      name: tr(g.title, locale),
    })),
  };

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: localeUrl(locale, "/guides"),
    name: isAr ? "دليل أصحاب الشغل للبرمجة والأنظمة" : "Guides for business owners",
    inLanguage: isAr ? "ar-EG" : "en",
    publisher: { "@id": organizationId },
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(locale, [{ name: label, path: "/guides" }]), collection, itemList]} />

      <StudioHero
        locale={locale}
        crumbs={[{ name: label }]}
        sheet={ltr(isAr ? `${String(guides.length).padStart(2, "0")} أدلة` : `${String(guides.length).padStart(2, "0")} guides`)}
        kicker={isAr ? "أدلة · بكلام بسيط ومن غير أرقام من الهوا" : "Guides · plain words, no made-up numbers"}
        title={isAr ? "دليل أصحاب الشغل للبرمجة والأنظمة" : "Guides for business owners"}
        sub={
          isAr
            ? "قبل ما تدفع في موقع أو تطبيق أو برنامج، اعرف بتدفع في إيه. كتبنا الأدلة دي لأصحاب المحلات والكافيهات والعيادات والصيدليات والشركات: إيه اللي بيحدد السعر، وتسأل إيه قبل ما تشتري، وإزاي تختار صح — بصراحة ومن غير مصطلحات معقدة."
            : "Before you pay for a website, an app or business software, know what you’re paying for. We wrote these guides for owners of shops, cafés, clinics, pharmacies and companies: what drives the price, what to ask before you buy, and how to choose well — honestly, without jargon."
        }
        wide
      />

      <Chapter
        index="01"
        label={isAr ? "كل الأدلة" : "All guides"}
        title={isAr ? "اختار السؤال اللي شاغلك." : "Pick the question on your mind."}
        sub={isAr ? "كل دليل بيقرا في أقل من عشر دقايق، وفي آخره قائمة أسئلة تاخدها معاك لأي شركة." : "Each guide reads in under ten minutes and ends with questions you can take to any company."}
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <Rise as="li" key={g.slug} delay={(i % 3) * 0.05}>
              <Link
                href={`/${locale}/guides/${g.slug}`}
                className="group flex h-full flex-col rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-colors duration-500 hover:border-[var(--border-hover)] sm:p-7"
              >
                <span className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-[var(--border-hover)] px-3 py-1 text-sm text-[var(--text-primary)]">{tr(g.keyword, locale)}</span>
                  <span className="font-mono text-xs text-[var(--text-subtle)]">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <h3 className="mt-8 title-sm text-xl font-bold leading-snug transition-colors duration-500 group-hover:text-[var(--accent)] sm:text-2xl sm:leading-snug">{tr(g.title, locale)}</h3>
                <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{tr(g.description, locale)}</p>
                <span className="mt-auto flex items-center justify-between gap-3 pt-8 text-sm text-[var(--text-subtle)]">
                  {readingTime(g.readingMinutes, locale)}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)] rtl:-scale-x-100" />
                </span>
              </Link>
            </Rise>
          ))}
          <Rise as="li" delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-8 rounded-[1.25rem] border border-dashed border-[var(--border-hover)] p-6 sm:p-7">
              <div>
                <p className="label">{isAr ? "مش لاقي إجابتك؟" : "Can’t find your answer?"}</p>
                <p className="mt-4 title-sm text-xl font-bold leading-snug sm:text-2xl sm:leading-snug">
                  {isAr ? "اسألنا مباشرة. مكالمة مجانية، وإجابة صريحة — حتى لو مش محتاجنا." : "Ask us directly. A free call and an honest answer — even if you don’t need us."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <ConsultActions locale={locale} size="md" />
              </div>
            </div>
          </Rise>
        </ul>
      </Chapter>

      <SignOff locale={locale} title={isAr ? "قريت وفهمت؟ خلّينا نطبّقه على شغلك." : "Read enough? Let’s apply it to your business."} />
    </>
  );
}
