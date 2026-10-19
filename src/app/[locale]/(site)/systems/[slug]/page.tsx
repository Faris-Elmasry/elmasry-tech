import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Check } from "lucide-react";
import { Rise } from "@/components/motion/Kinetic";
import { ltr, Chapter, Faq, Figure, ShortVersion, SignOff, StudioHero, Ticks } from "@/components/studio/kit";
import { DashMock, NotebookMock } from "@/components/studio/screens";
import { BeforeAfter } from "@/components/studio/BeforeAfter";
import { FillTimeline } from "@/components/studio/FillTimeline";
import { ModuleTour } from "@/components/studio/ModuleTour";
import { Button } from "@/components/ui/Button";
import { SystemRequest } from "@/components/sections/SystemRequest";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { getService, tr } from "@/lib/content";
import { getSystem, readySystems, serviceSystems, systemFaqs, systemSteps } from "@/lib/systems";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd, organizationId } from "@/lib/seo";
import { seoFor } from "@/lib/seo-copy";
import { localeUrl, locales, siteUrl, whatsappLink, type Locale } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((locale) => readySystems.map((s) => ({ locale, slug: s.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/systems/[slug]">): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const system = getSystem(slug);
  if (!system) return {};
  const seo = seoFor(`system:${slug}`);
  return buildMetadata({
    locale,
    path: `/systems/${slug}`,
    title: tr(seo.title, locale),
    description: tr(seo.description, locale),
    keywords: system.keywords[locale],
  });
}

export default async function SystemPage({ params }: PageProps<"/[locale]/systems/[slug]">) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const system = getSystem(slug);
  if (!system) notFound();

  const isAr = locale === "ar";
  const seo = seoFor(`system:${slug}`);
  const name = tr(system.name, locale);
  // Services that fit this system (internal links back), always including custom builds.
  const relatedServices = [...Object.keys(serviceSystems).filter((k) => serviceSystems[k].includes(slug)), "custom-software"]
    .filter((v, i, a) => a.indexOf(v) === i)
    .map(getService)
    .filter((x): x is NonNullable<typeof x> => !!x);
  const systemsLabel = isAr ? "الأنظمة الجاهزة" : "Ready-made systems";
  const index = readySystems.findIndex((s) => s.slug === slug);
  const others = readySystems.filter((s) => s.slug !== slug);
  const demoMsg = isAr ? `أهلًا، عايز أحجز عرض تجريبي مجاني لـ ${name}.` : `Hi, I’d like to book a free demo of the ${name} system.`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${name} — Elmasry Tech`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Windows, Android, iOS",
    description: tr(seo.description, locale),
    url: localeUrl(locale, `/systems/${slug}`),
    image: `${siteUrl}${system.photo}`,
    areaServed: { "@type": "Country", name: "Egypt" },
    publisher: { "@id": organizationId },
    inLanguage: ["ar", "en"],
  };

  const ways = isAr
    ? [
        { title: "إيجار شهري", text: "مبلغ شهري بسيط، والاستضافة والتحديثات والنسخة الاحتياطية والدعم علينا. تزوّد فروع وقت ما تحب.", points: ["تشغيل خلال أيام", "من غير دفعة كبيرة في الأول", "دعم على الواتساب"] },
        { title: "شراء مرة واحدة", text: "تدفع مرة واحدة ويتثبت على أجهزتك أو السيرفر بتاعك. بياناتك عندك في مكانك.", points: ["دفعة واحدة", "يشتغل من غير نت", "سنة دعم كاملة"] },
      ]
    : [
        { title: "Rent it monthly", text: "A small monthly fee. Hosting, updates, backups and support are on us. Add branches whenever you like.", points: ["Running within days", "No big payment upfront", "Support on WhatsApp"] },
        { title: "Buy it once", text: "Pay once and it’s installed on your own computers or server. Your data stays with you.", points: ["One payment", "Works without internet", "A full year of support"] },
      ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: systemsLabel, path: "/systems" },
            { name, path: `/systems/${slug}` },
          ]),
          productLd,
          faqJsonLd(systemFaqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }))),
        ]}
      />

      <StudioHero
        locale={locale}
        crumbs={[{ name: systemsLabel, href: `/${locale}/systems` }, { name }]}
        sheet={ltr(`${String(index + 1).padStart(2, "0")} / ${String(readySystems.length).padStart(2, "0")}`)}
        kicker={`${name} · ${tr(system.hint, locale)}`}
        keyword={tr(seo.h1!, locale)}
        title={tr(system.tagline, locale)}
        sub={tr(seo.intro!, locale)}
        actions={
          <>
            <Button href={whatsappLink(demoMsg)} size="lg" leftIcon={<WhatsAppIcon className="h-5 w-5" />}>
              {isAr ? "احجز عرض تجريبي مجاني" : "Book a free demo"}
            </Button>
            <Button href="#request" variant="outline" size="lg" rightIcon={<ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" />}>
              {isAr ? "اطلبه أو اسأل عن السعر" : "Get it or ask the price"}
            </Button>
          </>
        }
        aside={
          <Figure src={system.photo} alt={tr(system.photoAlt, locale)} fig="01" caption={tr(system.photoAlt, locale)} ratio="aspect-[4/5]" preload sizes="(min-width: 1024px) 36vw, 100vw" />
        }
      >
        <ShortVersion
          locale={locale}
          items={[
            isAr ? `نظام جاهز لـ ${system.audience.ar.slice(0, 2).join(" و")}.` : `A ready-made system for ${system.audience.en.slice(0, 2).join(" and ").toLowerCase()}.`,
            system.highlights[locale].slice(0, 3).join(isAr ? "، " : ", ") + ".",
            isAr ? "عرض تجريبي 30 دقيقة، وتبعت لنا ملفاتك — والتجهيز علينا." : "A 30-minute demo, then send us your files — we do the setup.",
            isAr ? "احجز العرض التجريبي المجاني على الواتساب." : "Book the free demo on WhatsApp.",
          ]}
        />
      </StudioHero>

      {/* 01 — guided tour (pinned screen + modules) */}
      <Chapter
        index="01"
        label={isAr ? "جولة في النظام" : "A tour"}
        title={isAr ? "مرّ على أجزاء النظام، والشاشة هتمشي معاك." : "Scroll through the parts — the screen follows."}
        sub={isAr ? "الأرقام والأسماء في الشاشة للتوضيح بس." : "Numbers and names on the screen are sample data."}
      >
        <ModuleTour system={system} locale={locale} />
      </Chapter>

      {/* 02 — before → after */}
      <Chapter index="02" label={isAr ? "قبل وبعد" : "Before & after"} title={isAr ? "نفس اليوم، مرتين." : "The same day, twice."} tone="card">
        <Rise>
          <BeforeAfter
            dir={isAr ? "rtl" : "ltr"}
            label={isAr ? "قارن بين الكشكول والنظام" : "Compare the notebook with the system"}
            beforeLabel={isAr ? "قبل" : "Before"}
            afterLabel={isAr ? "بعد" : "After"}
            before={
              <div className="relative h-full w-full">
                <Image src="/images/site/receipts-v2.webp" alt="" fill sizes="(min-width: 1400px) 1336px, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-[#1a140c]/75" />
                <div className="absolute inset-0 flex items-center justify-center p-6 pt-16 sm:p-12">
                  <NotebookMock locale={locale} lines={system.before[locale]} title={isAr ? `${name} — على الورق` : `${name} — on paper`} className="w-full max-w-3xl" />
                </div>
              </div>
            }
            after={
              <div className="bg-blueprint flex min-h-[34rem] items-center justify-center bg-[var(--bg-primary)] p-6 pt-16 sm:min-h-[38rem] sm:p-12">
                <DashMock system={system} locale={locale} className="w-full max-w-3xl" />
              </div>
            }
          />
        </Rise>
      </Chapter>

      {/* 03 — included */}
      <Chapter index="03" label={isAr ? "معاه كمان" : "Also included"} title={isAr ? "تفاصيل صغيرة بتفرق كل يوم." : "Small things that matter every day."}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Rise className="lg:col-span-7">
            <Ticks items={system.highlights[locale]} />
          </Rise>
          <Rise delay={0.1} className="space-y-10 lg:col-span-5">
            <div>
              <p className="label">{isAr ? "بيتوصل بـ" : "Works with"}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {system.integrations[locale].map((x) => (
                  <li key={x} className="rounded-full border border-[var(--border-hover)] px-4 py-2">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label">{isAr ? "معمول لـ" : "Made for"}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {system.audience[locale].map((x) => (
                  <li key={x} className="rounded-full bg-[var(--bg-card)] px-4 py-2 text-[var(--text-muted)]">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <p className="leading-relaxed text-[var(--text-muted)]">
              {isAr
                ? "بيشتغل على الكمبيوتر واللابتوب والتابلت والموبايل، على النت أو على جهازك، بالعربي والإنجليزي."
                : "Works on computers, laptops, tablets and phones — online or on your own computer — in Arabic and English."}
            </p>
          </Rise>
        </div>
      </Chapter>

      {/* 04 — how you start (scroll-filled) + rent or buy */}
      <Chapter index="04" label={isAr ? "إزاي تبدأ" : "How to start"} title={isAr ? "أربع خطوات، وإحنا معاك فيهم." : "Four steps, and we’re with you in each."} tone="card">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <FillTimeline
              steps={systemSteps.map((s, i) => ({
                when: isAr ? `الخطوة ${i + 1}` : `Step ${i + 1}`,
                title: tr(s.title, locale),
                text: tr(s.text, locale),
              }))}
            />
          </div>
          <div className="grid content-start gap-5 lg:col-span-6">
            {ways.map((w, i) => (
              <Rise key={w.title} delay={i * 0.08} className="rounded-[1.25rem] border border-[var(--border-hover)] bg-[var(--bg-primary)] p-7 sm:p-8">
                <h3 className="title-sm text-2xl font-bold">{w.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-[var(--text-muted)]">{w.text}</p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {w.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <Check aria-hidden="true" className="h-4 w-4 text-[var(--accent)]" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Rise>
            ))}
          </div>
        </div>
      </Chapter>

      <Chapter
        id="request"
        index="05"
        label={isAr ? "اطلبه" : "Get it"}
        title={isAr ? `عايز ${name}؟ قولنا إزاي.` : `Want the ${name} system? Tell us how.`}
        sub={isAr ? "اختار اللي يناسبك، وسيب اسمك ورقمك، وهنكلّمك نتفق على التفاصيل والسعر." : "Pick what suits you, leave your name and number, and we’ll call to agree the details and price."}
        tone="card"
      >
        <SystemRequest locale={locale} system={system.slug} systemName={name} whatsappHref={whatsappLink(demoMsg)} />
      </Chapter>

      <Chapter index="06" label={isAr ? "أسئلة" : "Questions"} title={isAr ? "أسئلة بتتسأل كتير." : "Questions people ask."}>
        <Faq items={systemFaqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }))} />
      </Chapter>

      {/* Related services, then the other systems */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8">
          <p className="label mb-6">{isAr ? "خدمات مرتبطة" : "Related services"}</p>
          <ul className="mb-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((sv) => (
              <li key={sv.slug} className="bg-[var(--bg-primary)]">
                <Link href={`/${locale}/services/${sv.slug}`} className="group flex h-full items-center justify-between gap-4 p-6 transition-colors duration-500 hover:bg-[var(--bg-card)]">
                  <span className="flex items-center gap-3">
                    <DynamicIcon name={sv.icon} className="h-5 w-5 shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]" />
                    <span>
                      <span className="block font-medium">{tr(sv.label, locale)}</span>
                      <span className="block text-sm text-[var(--text-muted)]">{tr(sv.title, locale)}</span>
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--text-subtle)] transition-colors group-hover:text-[var(--accent)] rtl:-scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="label mb-6">{isAr ? "أنظمة تانية" : "Other systems"}</p>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <li key={s.slug} className="bg-[var(--bg-primary)]">
                <Link href={`/${locale}/systems/${s.slug}`} className="group flex h-full items-center justify-between gap-4 p-6 transition-colors duration-500 hover:bg-[var(--bg-card)]">
                  <span className="flex items-center gap-3">
                    <DynamicIcon name={s.icon} className="h-5 w-5 shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]" />
                    <span className="font-medium">{tr(s.name, locale)}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--text-subtle)] transition-colors group-hover:text-[var(--accent)] rtl:-scale-x-100" />
                </Link>
              </li>
            ))}
            <li className="bg-[var(--bg-primary)]">
              <Link href={`/${locale}/systems`} className="group flex h-full items-center justify-between gap-4 p-6 text-[var(--text-muted)] transition-colors duration-500 hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]">
                {isAr ? "كل الأنظمة" : "All systems"}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 rtl:-scale-x-100" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <SignOff locale={locale} message={demoMsg} title={isAr ? `شوف ${name} شغال على شغلك أنت.` : `See the ${name} system running on your business.`} />
    </>
  );
}
