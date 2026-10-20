import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Rise } from "@/components/motion/Kinetic";
import { ArrowLink, Chapter, Faq, ShortVersion, SignOff, StudioHero } from "@/components/studio/kit";
import { DashMock, NotebookMock } from "@/components/studio/screens";
import { BeforeAfter } from "@/components/studio/BeforeAfter";
import { OfferChooser } from "@/components/studio/OfferChooser";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { tr } from "@/lib/content";
import { readySystems, systemFaqs, systemSteps } from "@/lib/systems";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd } from "@/lib/seo";
import { localeUrl, whatsappLink, type Locale } from "@/lib/site";
import { seoFor } from "@/lib/seo-copy";

export async function generateMetadata({ params }: PageProps<"/[locale]/systems">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const seo = seoFor("systems");
  return buildMetadata({
    locale,
    path: "/systems",
    title: tr(seo.title, locale),
    description: tr(seo.description, locale),
    keywords: readySystems.flatMap((s) => s.keywords[locale].slice(0, 2)),
  });
}

export default async function SystemsPage({ params }: PageProps<"/[locale]/systems">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const isAr = locale === "ar";
  const label = isAr ? "الأنظمة الجاهزة" : "Ready-made systems";
  const pos = readySystems[0];
  const seo = seoFor("systems");
  const demoMsg = isAr ? "أهلًا، عايز أحجز عرض تجريبي مجاني لأحد أنظمتكم الجاهزة." : "Hi, I’d like to book a free demo of one of your ready-made systems.";

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: readySystems.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: localeUrl(locale, `/systems/${s.slug}`),
      name: tr(s.name, locale),
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [{ name: label, path: "/systems" }]),
          itemList,
          faqJsonLd(systemFaqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }))),
        ]}
      />

      <StudioHero
        locale={locale}
        crumbs={[{ name: label }]}
        sheet={isAr ? `${String(readySystems.length).padStart(2, "0")} أنظمة` : `${String(readySystems.length).padStart(2, "0")} systems`}
        kicker={isAr ? "أنظمة جاهزة · للشراء أو الإيجار" : "Ready-made · to buy or to rent"}
        keyword={tr(seo.h1!, locale)}
        title={isAr ? "سيب الكشكول. شغلك كله على شاشة واحدة." : "Put the notebook down. Your whole business, on one screen."}
        sub={tr(seo.intro!, locale)}
        actions={
          <>
            <Button href={whatsappLink(demoMsg)} size="lg" leftIcon={<WhatsAppIcon className="h-5 w-5" />}>
              {isAr ? "احجز عرض تجريبي مجاني" : "Book a free demo"}
            </Button>
            <Button href="#chooser" variant="outline" size="lg">
              {isAr ? "اعرف أنهي نظام يناسبك" : "Find the one for you"}
            </Button>
          </>
        }
        aside={<DashMock system={pos} locale={locale} />}
      >
        <ShortVersion
          locale={locale}
          items={
            isAr
              ? [
                  "برنامج جاهز ومجرّب لنوع شغلك، بيتظبط على فروعك وأسعارك واللوجو بتاعك.",
                  "النظام، وتجهيزه، ونقل بياناتك، وتدريب فريقك، ودعم على الواتساب.",
                  "عرض تجريبي 30 دقيقة، وتبعت لنا ملفات الإكسل اللي عندك.",
                  "احجز العرض التجريبي — ومن غير أي التزام.",
                ]
              : [
                  "A proven program for your kind of business, set up with your branches, prices and logo.",
                  "The system, the setup, your data moved in, your team trained, and WhatsApp support.",
                  "A 30-minute demo, then send us whatever Excel files you have.",
                  "Book the free demo — no commitment.",
                ]
          }
        />
      </StudioHero>

      {/* 01 — before → after (comparison slider) */}
      <Chapter
        index="01"
        label={isAr ? "قبل وبعد" : "Before & after"}
        title={isAr ? "اسحب، وشوف الفرق بعينك." : "Drag, and see the difference."}
        sub={
          isAr
            ? "على اليمين: نفس اليوم في الكشكول. على الشمال: نفس اليوم على النظام — الأرقام جاهزة، والفلوس مظبوطة، والمخزن معروف."
            : "On one side: a normal day in the notebook. On the other: the same day in the system — totals ready, cash matching, stock known."
        }
      >
        <Rise>
          <BeforeAfter
            dir={isAr ? "rtl" : "ltr"}
            label={isAr ? "قارن بين الكشكول والنظام" : "Compare the notebook with the system"}
            beforeLabel={isAr ? "قبل: الكشكول" : "Before: the notebook"}
            afterLabel={isAr ? "بعد: النظام" : "After: the system"}
            before={
              <div className="relative h-full w-full">
                <Image src="/images/site/receipts-v2.webp" alt="" fill sizes="(min-width: 1400px) 1336px, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-[#1a140c]/75" />
                <div className="absolute inset-0 flex items-center justify-center p-6 pt-16 sm:p-12">
                  <NotebookMock locale={locale} lines={pos.before[locale]} className="w-full max-w-3xl" />
                </div>
              </div>
            }
            after={
              <div className="bg-blueprint flex min-h-[34rem] items-center justify-center p-6 pt-16 sm:min-h-[38rem] sm:p-12">
                <DashMock system={pos} locale={locale} className="w-full max-w-3xl" />
              </div>
            }
          />
        </Rise>
      </Chapter>

      {/* 02 — offer chooser */}
      <Chapter
        id="chooser"
        index="02"
        label={isAr ? "اختار نظامك" : "Find yours"}
        title={isAr ? "تلات أسئلة، وتعرف تبدأ بإيه." : "Three questions, and you’ll know where to start."}
        sub={isAr ? "مش هنقول أرقام من الهوا: السعر بيتحدد بعد ما نفهم شغلك. بس هتعرف النظام المناسب وإزاي الدفع بيمشي." : "No made-up prices here — the price depends on your setup. But you’ll know the right system and how paying works."}
        tone="card"
      >
        <OfferChooser
          locale={locale}
          systems={readySystems.map((s) => ({
            slug: s.slug,
            icon: s.icon,
            name: tr(s.name, locale),
            hint: tr(s.hint, locale),
            tagline: tr(s.tagline, locale),
            highlights: s.highlights[locale].slice(0, 3),
            photo: s.photo,
            photoAlt: tr(s.photoAlt, locale),
          }))}
        />
      </Chapter>

      {/* 03 — all systems */}
      <Chapter index="03" label={isAr ? "كل الأنظمة" : "All systems"} title={isAr ? `${readySystems.length} أنظمة، كل واحد لنوع شغل.` : `${readySystems.length} systems, each made for one kind of business.`}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {readySystems.map((s, i) => (
            <Rise as="li" key={s.slug} delay={(i % 4) * 0.05}>
              <Link href={`/${locale}/systems/${s.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-card)] transition-colors duration-500 hover:border-[var(--border-hover)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.photo}
                    alt={tr(s.photoAlt, locale)}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                    className="object-cover saturate-[0.85] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                  <span className="absolute start-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-primary)]/90">
                    <DynamicIcon name={s.icon} className="h-5 w-5 text-[var(--accent)]" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="title-sm text-xl font-bold">{tr(s.name, locale)}</h3>
                  <p className="mt-2 leading-relaxed text-[var(--text-muted)]">{tr(s.tagline, locale)}</p>
                  <span className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm text-[var(--text-subtle)]">
                    {tr(s.hint, locale)}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)] rtl:-scale-x-100" />
                  </span>
                </div>
              </Link>
            </Rise>
          ))}
        </ul>
      </Chapter>

      {/* 04 — how you start */}
      <Chapter index="04" label={isAr ? "إزاي تبدأ" : "How to start"} title={isAr ? "من العرض التجريبي للتشغيل، في أيام." : "From demo to running, in days."}>
        <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {systemSteps.map((p, i) => (
            <Rise as="li" key={p.title.en} delay={i * 0.06} className="flex flex-col bg-[var(--bg-primary)] p-7 sm:p-8">
              <span className="font-mono text-sm text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-10 title-sm text-2xl font-bold">{tr(p.title, locale)}</h3>
              <p className="mt-3 text-lg leading-relaxed text-[var(--text-muted)]">{tr(p.text, locale)}</p>
            </Rise>
          ))}
        </ol>
        <Rise className="mt-10 flex flex-col justify-between gap-6 rounded-[1.25rem] border border-dashed border-[var(--border-hover)] p-7 sm:flex-row sm:items-center sm:p-8">
          <p className="max-w-2xl text-lg leading-relaxed">
            {isAr ? "شغلك مختلف ومحتاج حاجة مش موجودة هنا؟ بنبني نظام مخصوص ليك من الصفر." : "Your business is different and needs something that isn’t here? We build one just for you."}
          </p>
          <ArrowLink href={`/${locale}/services/custom-software`} className="shrink-0">
            {isAr ? "أنظمة مفصّلة على شغلك" : "Custom systems"}
          </ArrowLink>
        </Rise>
      </Chapter>

      <Chapter index="05" label={isAr ? "أسئلة" : "Questions"} title={isAr ? "أسئلة عن الأنظمة الجاهزة." : "Questions about ready-made systems."}>
        <Faq items={systemFaqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }))} />
      </Chapter>

      <SignOff
        locale={locale}
        message={demoMsg}
        title={isAr ? "شوف النظام شغال على شغلك أنت — ببلاش." : "See it running on your own business — free."}
        photo="/images/site/cafe-cashier-v2.webp"
        photoAlt={isAr ? "صاحب محل واقف ورا الكاونتر جنب الكاشير" : "A shop owner behind the counter next to the till"}
      />
    </>
  );
}
