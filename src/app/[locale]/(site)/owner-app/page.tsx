import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Rise } from "@/components/motion/Kinetic";
import { Chapter, Faq, Figure, SignOff, StudioHero } from "@/components/studio/kit";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { tr } from "@/lib/content";
import { ownerApp } from "@/lib/owner-app";
import { getSystem } from "@/lib/systems";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd, organizationId } from "@/lib/seo";
import { seoFor } from "@/lib/seo-copy";
import { localeUrl, siteUrl, whatsappLink, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/owner-app">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const seo = seoFor("owner-app");
  return buildMetadata({
    locale,
    path: "/owner-app",
    title: tr(seo.title, locale),
    description: tr(seo.description, locale),
    keywords: locale === "ar" ? ["تطبيق صاحب العمل", "تطبيق متابعة المبيعات", "متابعة الفروع من الموبايل", "تطبيق للمالك"] : ["business owner app", "sales dashboard on phone", "multi-branch owner app"],
  });
}

export default async function OwnerAppPage({ params }: PageProps<"/[locale]/owner-app">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const isAr = locale === "ar";
  const seo = seoFor("owner-app");
  const label = isAr ? "تطبيق صاحب العمل" : "Owner app";
  const askMsg = isAr ? "أهلًا، عايز أعرف أكتر عن تطبيق صاحب العمل." : "Hi, I’d like to know more about the owner app.";
  const faqItems = ownerApp.faqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }));

  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${label} — Elmasry Tech`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web (installable from the browser)",
    description: tr(seo.description, locale),
    url: localeUrl(locale, "/owner-app"),
    image: `${siteUrl}${ownerApp.screens[0].src}`,
    publisher: { "@id": organizationId },
    inLanguage: ["ar", "en"],
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(locale, [{ name: label, path: "/owner-app" }]), appLd, faqJsonLd(faqItems)]} />

      <StudioHero
        locale={locale}
        crumbs={[{ name: label }]}
        kicker={label}
        keyword={tr(seo.h1!, locale)}
        title={isAr ? "كل نشاطاتك في جيبك، على تطبيق واحد." : "All your businesses in your pocket, in one app."}
        sub={tr(seo.intro!, locale)}
        actions={
          <>
            <Button href={ownerApp.appUrl} size="lg" rightIcon={<ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" />}>
              {isAr ? "جرّب التطبيق" : "Try the app"}
            </Button>
            <Button href="#try" variant="outline" size="lg">
              {isAr ? "إزاي أجرّبه؟" : "How do I try it?"}
            </Button>
            <Button href={whatsappLink(askMsg)} variant="outline" size="lg" leftIcon={<WhatsAppIcon className="h-5 w-5" />}>
              {isAr ? "اسألنا على واتساب" : "Ask on WhatsApp"}
            </Button>
          </>
        }
        aside={<Figure src={ownerApp.screens[0].src} alt={tr(ownerApp.screens[0].alt, locale)} fig="01" caption={isAr ? "الشاشة الرئيسية — بيانات تجريبية" : "Home screen — sample data"} ratio="aspect-[4/5]" preload sizes="(min-width: 1024px) 36vw, 100vw" className="mx-auto max-w-sm lg:max-w-none" />}
      />

      <Chapter index="01" label={isAr ? "اللي بتشوفه" : "What you see"} title={isAr ? "الأرقام اللي بتسأل عنها كل يوم، في مكان واحد." : "The numbers you ask about every day, in one place."}>
        <ul className="grid gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {ownerApp.features.map((f) => (
            <li key={f.title.en} className="bg-[var(--bg-primary)] p-7">
              <DynamicIcon name={f.icon} className="h-6 w-6 text-[var(--accent)]" />
              <h3 className="title-sm mt-5 text-xl font-bold">{tr(f.title, locale)}</h3>
              <p className="mt-2 leading-relaxed text-[var(--text-muted)]">{tr(f.text, locale)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {ownerApp.screens.map((s, i) => (
            <Rise key={s.src} delay={i * 0.08}>
              <Figure src={s.src} alt={tr(s.alt, locale)} fig={`0${i + 1}`} caption={isAr ? ["الرئيسية", "الموافقات", "إجماليات بس"][i] : ["Home", "Approvals", "Totals only"][i]} ratio="aspect-[4/5]" sizes="(min-width: 640px) 30vw, 90vw" className="mx-auto max-w-xs sm:max-w-none" />
            </Rise>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--text-muted)]">{isAr ? "اللقطات من نشاط تجريبي — الأرقام والأسماء كلها بيانات تجريبية." : "Screens are from a sample business — all numbers and names are sample data."}</p>
      </Chapter>

      <Chapter index="02" label={isAr ? "بيشتغل مع إيه" : "Works with"} title={isAr ? "بيشتغل مع أنظمتنا الجاهزة." : "It works with our ready-made systems."} sub={isAr ? "النظام بيفضل شغال في المحل زي ما هو، والتطبيق بيعرض لك اللي بيسجّله." : "The system keeps running in the shop as it is; the app shows you what it records."} tone="card">
        <ul className="flex flex-wrap gap-3">
          {ownerApp.works.map((slug) => {
            const sys = getSystem(slug);
            if (!sys) return null;
            return (
              <li key={slug}>
                <Link href={`/${locale}/systems/${slug}`} className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-hover)] px-5 py-3 transition-colors hover:border-[var(--text-primary)]">
                  <DynamicIcon name={sys.icon} className="h-4 w-4 text-[var(--accent)]" />
                  {tr(sys.name, locale)}
                </Link>
              </li>
            );
          })}
          {ownerApp.soon.map((slug) => {
            const sys = getSystem(slug);
            if (!sys) return null;
            return (
              <li key={slug} className="inline-flex items-center gap-2.5 rounded-full border border-dashed border-[var(--border-hover)] px-5 py-3 text-[var(--text-muted)]">
                <DynamicIcon name={sys.icon} className="h-4 w-4" />
                {tr(sys.name, locale)}
                <span className="rounded-full bg-[var(--bg-primary)] px-2.5 py-0.5 text-xs">{isAr ? "قريبًا" : "coming"}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 max-w-2xl leading-relaxed text-[var(--text-muted)]">
          {isAr ? "بيفتح من متصفح الموبايل، وتقدر تثبّته على الشاشة الرئيسية — من غير متجر تطبيقات. بالعربي والإنجليزي، وبالوضع الداكن والفاتح." : "It opens in your phone's browser and installs on the home screen — no app store. Arabic and English, dark and light."}
        </p>
      </Chapter>

      <Chapter id="try" index="03" label={isAr ? "جرّبه" : "Try it"} title={isAr ? "افتح التطبيق، وامسح الـ QR من صفحة النشاط التجريبي." : "Open the app, and scan the QR from a sample business page."} sub={isAr ? "الأنشطة التجريبية بيانات وهمية — تشوف التطبيق شغال من غير ما تربط نشاطك." : "The sample businesses use made-up data — see the app working without linking your own."}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ol className="space-y-5 lg:col-span-6">
            {ownerApp.steps.map((st, i) => (
              <Rise as="li" key={i} delay={i * 0.06} className="grid grid-cols-[2.5rem_1fr] items-start gap-4 text-lg leading-relaxed">
                <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] font-mono text-sm text-[var(--accent-ink)]">{i + 1}</span>
                <span className="pt-1">{tr(st, locale)}</span>
              </Rise>
            ))}
          </ol>
          <div className="lg:col-span-6">
            <p className="label">{isAr ? "الأنشطة التجريبية" : "Sample businesses"}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {ownerApp.samples.map((s) => (
                <li key={s.slug}>
                  <Button href={s.url} variant="outline" size="md" fullWidth rightIcon={<ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />}>
                    {tr(s.label, locale)}
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button href={ownerApp.appUrl} size="lg" fullWidth rightIcon={<ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" />}>
                {isAr ? "افتح التطبيق" : "Open the app"}
              </Button>
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter index="04" label={isAr ? "أسئلة" : "Questions"} title={isAr ? "أسئلة عن التطبيق." : "Questions about the app."} tone="card">
        <Faq items={faqItems} />
      </Chapter>

      <SignOff locale={locale} message={askMsg} title={isAr ? "عايز تشوف أرقام شغلك من موبايلك؟" : "Want to see your numbers from your phone?"} />
    </>
  );
}
