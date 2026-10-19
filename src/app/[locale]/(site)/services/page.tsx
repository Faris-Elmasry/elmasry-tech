import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Rise } from "@/components/motion/Kinetic";
import { ArrowLink, Chapter, ConsultActions, Faq, Figure, ShortVersion, SignOff, StudioHero } from "@/components/studio/kit";
import { ServiceMock } from "@/components/studio/screens";
import { StackDeck } from "@/components/studio/StackDeck";
import { HoverReveal } from "@/components/studio/HoverReveal";
import { faqs, process, services, tr } from "@/lib/content";
import { serviceDetails } from "@/lib/service-details";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd } from "@/lib/seo";
import { localeUrl, type Locale } from "@/lib/site";
import { seoFor } from "@/lib/seo-copy";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const seo = seoFor("services");
  return buildMetadata({
    locale,
    path: "/services",
    title: tr(seo.title, locale),
    description: tr(seo.description, locale),
    keywords: services.flatMap((s) => s.keywords[locale].slice(0, 2)),
  });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const isAr = locale === "ar";
  const label = isAr ? "الخدمات" : "Services";
  const seo = seoFor("services");

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: localeUrl(locale, `/services/${s.slug}`),
      name: tr(s.title, locale),
    })),
  };

  // "If this sounds like you → this is what you need", in the visitor's words.
  const symptoms: Record<string, { en: string; ar: string }> = {
    "website-development": { en: "People search for what I sell — and find my competitors.", ar: "الناس بتدوّر على اللي ببيعه — وبتلاقي منافسيني." },
    "mobile-app-development": { en: "Orders come by phone and WhatsApp, and some get lost.", ar: "الطلبات بتيجي بالتليفون والواتساب، وفيه طلبات بتضيع." },
    "custom-software": { en: "My business runs on notebooks and Excel sheets.", ar: "شغلي ماشي على كشاكيل وشيتات إكسل." },
    "ai-chatbots": { en: "I answer the same WhatsApp questions all day long.", ar: "برد على نفس أسئلة الواتساب طول اليوم." },
    "business-automation": { en: "I copy the same order into three different places.", ar: "بنقل نفس الطلب في تلات أماكن مختلفة." },
    "ecommerce-development": { en: "I want to sell online, not only in my shop.", ar: "عايز أبيع أونلاين، مش في المحل بس." },
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [{ name: label, path: "/services" }]),
          itemList,
          faqJsonLd(faqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }))),
        ]}
      />

      <StudioHero
        locale={locale}
        crumbs={[{ name: label }]}
        sheet={isAr ? "06 خدمات" : "06 services"}
        kicker={isAr ? "الخدمات · بنعمل إيه" : "Services · What we build"}
        keyword={tr(seo.h1!, locale)}
        title={isAr ? "بنبني الأدوات اللي شغلك ماشي عليها." : "We build the tools your business runs on."}
        sub={tr(seo.intro!, locale)}
        actions={<ConsultActions locale={locale} />}
        aside={
          <Figure
            src="/images/site/grocery.webp"
            alt={isAr ? "صاحب محل بيرتّب الفاكهة في محله" : "A shop owner arranging fruit in his shop"}
            fig="01"
            caption={isAr ? "اللي بنبني له: صاحب شغل وقته ضيق ومحتاج حاجة تشتغل." : "Who we build for: a business owner with little time and a lot to do."}
            ratio="aspect-[4/5]"
            preload
            sizes="(min-width: 1024px) 36vw, 100vw"
          />
        }
      >
        <ShortVersion
          locale={locale}
          items={
            isAr
              ? [
                  "مواقع، وتطبيقات، وأنظمة إدارة، ومساعد ذكي، وأتمتة، ومتاجر أونلاين.",
                  "حاجة شغالة باسمك، ومعاها تدريب ودعم بعد التسليم.",
                  "مكالمة 30 دقيقة، وحوالي 20 دقيقة في الأسبوع تراجع فيها.",
                  "مكالمة مجانية، وبعدها عرض مكتوب بسعر ثابت خلال 48 ساعة.",
                ]
              : [
                  "Websites, apps, business systems, AI assistants, automation and online stores.",
                  "Something that works, in your name, with training and support after launch.",
                  "A 30-minute call, then about 20 minutes a week to review.",
                  "A free call, then a written offer with one fixed price within 48 hours.",
                ]
          }
        />
      </StudioHero>

      <Chapter
        index="01"
        label={isAr ? "ست خدمات" : "Six services"}
        title={isAr ? "اختار اللي شغلك محتاجه — أو سيبنا نختار معاك." : "Pick what your business needs — or let us pick with you."}
        sub={isAr ? "كل كارت فيه: بنعمل إيه، هتاخد إيه، وشكلها هيبقى إزاي على الشاشة." : "Each card shows what we do, what you get, and what it looks like on screen."}
      >
        <StackDeck label={label}>
          {services.map((s, i) => {
            const d = serviceDetails[s.slug];
            return (
              <article key={s.slug} className="grid overflow-hidden rounded-[1.75rem] border border-[var(--border-hover)] bg-[var(--bg-card)] lg:min-h-[34rem] lg:grid-cols-12">
                <div className="flex flex-col p-7 sm:p-10 lg:col-span-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="label flex items-center gap-3">
                      <span className="text-[var(--accent)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {tr(s.label, locale)}
                    </p>
                    {d && <span className="text-sm text-[var(--text-muted)]">{tr(d.timeline, locale).split("·")[0]}</span>}
                  </div>
                  <h3 className="mt-8 title-sm text-[1.9rem] font-bold leading-[1.15] tracking-[-0.02em] text-balance sm:text-[2.3rem]">{d ? tr(d.headline, locale) : tr(s.title, locale)}</h3>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">{tr(s.summary, locale)}</p>
                  <ul className="mt-7 space-y-2.5">
                    {s.features[locale].slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-9">
                    <ArrowLink href={`/${locale}/services/${s.slug}`}>{isAr ? "اعرف التفاصيل" : "See how it works"}</ArrowLink>
                  </div>
                </div>
                <div className="relative flex items-center justify-center border-t border-[var(--border)] bg-[var(--bg-secondary)] p-6 sm:p-10 lg:col-span-6 lg:border-s lg:border-t-0">
                  <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-60" />
                  <div className="relative w-full max-w-[34rem]">
                    <ServiceMock slug={s.slug} locale={locale} />
                  </div>
                </div>
              </article>
            );
          })}
        </StackDeck>
      </Chapter>

      <Chapter
        index="02"
        label={isAr ? "مش متأكد؟" : "Not sure?"}
        title={isAr ? "لو الجملة دي شبهك، يبقى دي البداية." : "If this sounds like you, start here."}
        sub={isAr ? "كلام بنسمعه كتير من أصحاب الشغل — وكل جملة بتودّيك للخدمة المناسبة." : "Things business owners often tell us — each one leads to the service that fixes it."}
      >
        <HoverReveal
          rows={services.map((s) => ({
            title: isAr ? `«${symptoms[s.slug].ar}»` : `“${symptoms[s.slug].en}”`,
            text: `${isAr ? "يبقى محتاج:" : "You need:"} ${tr(s.label, locale)}`,
            photo: serviceDetails[s.slug]?.photo,
            href: `/${locale}/services/${s.slug}`,
          }))}
        />
      </Chapter>

      <Chapter
        index="03"
        label={isAr ? "إزاي بنشتغل" : "How it goes"}
        title={isAr ? "أربع خطوات، ومن غير مفاجآت." : "Four steps, no surprises."}
      >
        <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Rise as="li" key={p.title.en} delay={i * 0.06} className="flex flex-col bg-[var(--bg-primary)] p-7 sm:p-8">
              <span className="font-mono text-sm text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-10 title-sm text-2xl font-bold">{tr(p.title, locale)}</h3>
              <p className="mt-3 text-lg leading-relaxed text-[var(--text-muted)]">{tr(p.text, locale)}</p>
            </Rise>
          ))}
        </ol>
      </Chapter>

      <Chapter index="04" label={isAr ? "أسئلة" : "Questions"} title={isAr ? "اللي الناس بتسأله قبل ما تبدأ." : "What people ask before they start."}>
        <Faq items={faqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }))} />
      </Chapter>

      <SignOff locale={locale} title={isAr ? "احكي لنا شغلك ماشي إزاي، وإحنا نقول لك نبدأ منين." : "Tell us how your business runs. We’ll tell you where to start."} />
    </>
  );
}
