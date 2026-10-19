import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Check } from "lucide-react";
import { DevicesDemo } from "@/components/demos/devices/DevicesDemo";
import { Rise } from "@/components/motion/Kinetic";
import { ArrowLink, Chapter, ConsultActions, Faq, shell } from "@/components/studio/kit";
import { HelloPhone, ServiceMock } from "@/components/studio/screens";
import { PainFlip } from "@/components/studio/PainFlip";
import { WorkShowcase } from "@/components/studio/WorkShowcase";
import { ServiceSwitcher } from "@/components/studio/ServiceSwitcher";
import { SnapRail } from "@/components/studio/SnapRail";
import { StepTrack } from "@/components/studio/StepTrack";
import { ScrollLit } from "@/components/studio/ScrollLit";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { faqs, process, services, tr } from "@/lib/content";
import { commitments } from "@/lib/company";
import { readySystems, systemFaqs } from "@/lib/systems";
import { work } from "@/lib/work";
import { buildMetadata, faqJsonLd, JsonLd } from "@/lib/seo";
import { site, type Locale } from "@/lib/site";
import { seoFor } from "@/lib/seo-copy";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const isAr = locale === "ar";
  const seo = seoFor("home");
  return buildMetadata({
    locale,
    path: "",
    absoluteTitle: true,
    title: `${tr(seo.title, locale)} | ${site.name}`,
    description: tr(seo.description, locale),
    keywords: isAr
      ? ["شركة برمجة في مصر", "شركة برمجيات في القاهرة", "تصميم مواقع وتطبيقات", "برامج للشركات", "برنامج كاشير", "برنامج مخازن"]
      : ["software company in Egypt", "software development company Cairo", "website design Egypt", "mobile app development Egypt", "business software Egypt"],
  });
}

/** The questions shown on the homepage — the FAQ JSON-LD is built from this same list. */
const homeFaqs = [faqs[0], faqs[1], systemFaqs[1], systemFaqs[2], faqs[3], faqs[4]];

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const isAr = locale === "ar";
  const faqItems = homeFaqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }));

  // Section numbers follow what is actually shown (the work section only exists once there is real work).
  let n = 0;
  const next = () => String(++n).padStart(2, "0");
  const idx = { work: work.length > 0 ? next() : "", pain: next(), services: next(), systems: next(), steps: next(), why: next(), faq: next() };

  const notes = isAr ? ["اليوم الأول", "خلال 48 ساعة", "كل أسبوع", "يوم التشغيل وبعده"] : ["Day one", "Within 48 hours", "Every week", "Launch day — and after"];

  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />

      {/* Hero: the scroll-built devices (laptop + phone) */}
      <DevicesDemo locale={locale} />

      {/* Proof first: real, live work (only when there is some) */}
      {work.length > 0 && (
        <Chapter
          index={idx.work}
          label={isAr ? "شغلنا" : "Our work"}
          title={isAr ? "متشوفش صور وبس — جرّبه بنفسك." : "Don’t just look at pictures — try it yourself."}
          sub={isAr ? "مواقع شغالة، وتطبيقات على المتاجر، وأنظمة تقدر تدخل عليها بحساب تجربة." : "Live websites, apps on the stores, and systems you can log into with a demo account."}
        >
          <WorkShowcase items={work} locale={locale} />
        </Chapter>
      )}

      {/* Sound familiar? — the notes flip from pain to fix */}
      <PainFlip locale={locale} index={idx.pain} />

      {/* What we build */}
      <Chapter
        index={idx.services}
        label={isAr ? "بنعمل إيه" : "What we build"}
        title={isAr ? "ست حاجات بنعملها، وشكلها على الشاشة." : "Six things we build — and how they look on screen."}
        aside={<ArrowLink href={`/${locale}/services`}>{isAr ? "كل الخدمات" : "All services"}</ArrowLink>}
        tone="card"
      >
        <ServiceSwitcher
          cta={isAr ? "اعرف التفاصيل" : "See how it works"}
          items={services.map((s) => ({ label: tr(s.label, locale), line: tr(s.summary, locale), href: `/${locale}/services/${s.slug}` }))}
        >
          {services.map((s) => (
            <ServiceMock key={s.slug} slug={s.slug} locale={locale} />
          ))}
        </ServiceSwitcher>
      </Chapter>

      {/* Ready-made systems */}
      <section className="relative scroll-mt-20 border-t border-[var(--border)]">
        <div className={`${shell} pt-20 sm:pt-28`}>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <Rise className="lg:col-span-3">
              <p className="label flex items-center gap-3 lg:pt-3">
                <span className="text-[var(--accent)]">{idx.systems}</span>
                <span aria-hidden="true" className="h-px w-8 bg-[var(--border-hover)]" />
                {isAr ? "أنظمة جاهزة" : "Ready-made systems"}
              </p>
            </Rise>
            <Rise className="lg:col-span-9">
              <h2 className="font-display text-[clamp(2.1rem,4.4vw,4rem)] font-bold leading-[1.04] tracking-[-0.035em] text-balance">
                {isAr ? "نظام جاهز لنوع شغلك، يشتغل من أول أسبوع." : "A ready system for your kind of business, running in week one."}
              </h2>
              {/* The offer, in one line */}
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3 text-lg text-[var(--text-muted)]">
                <span className="rounded-full bg-[var(--accent)] px-4 py-1.5 font-medium text-[var(--accent-ink)]">{isAr ? "استأجره بالشهر" : "Rent it monthly"}</span>
                <span>{isAr ? "أو" : "or"}</span>
                <span className="rounded-full border border-[var(--border-hover)] px-4 py-1.5 font-medium text-[var(--text-primary)]">{isAr ? "اشتريه مرة واحدة" : "buy it once"}</span>
                <span>{isAr ? "— نفس النظام، وأنت اللي تختار. والعرض التجريبي ببلاش." : "— same system, your choice. The demo is free."}</span>
              </p>
            </Rise>
          </div>
        </div>
        <div className="pb-20 pt-12 sm:pb-28">
          <SnapRail label={isAr ? "الأنظمة الجاهزة" : "Ready-made systems"} prev={isAr ? "السابق" : "Previous"} next={isAr ? "التالي" : "Next"}>
            {readySystems.map((s) => (
              <Link
                key={s.slug}
                href={`/${locale}/systems/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-card)] transition-colors duration-500 hover:border-[var(--border-hover)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.photo}
                    alt={tr(s.photoAlt, locale)}
                    fill
                    sizes="(min-width: 640px) 320px, 78vw"
                    className="object-cover saturate-[0.85] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                  <span className="absolute start-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-primary)]/90">
                    <DynamicIcon name={s.icon} className="h-5 w-5 text-[var(--accent)]" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="title-sm text-xl font-bold">{tr(s.name, locale)}</h3>
                  <p className="mt-2 leading-relaxed text-[var(--text-muted)]">{tr(s.tagline, locale)}</p>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium">
                    {isAr ? "شوف النظام" : "See the system"}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[var(--accent)] rtl:-scale-x-100" />
                  </span>
                </div>
              </Link>
            ))}
          </SnapRail>
          <div className={`${shell} mt-10`}>
            <ArrowLink href={`/${locale}/systems`}>{isAr ? "قارن قبل وبعد، واختار نظامك" : "Compare before & after, and find yours"}</ArrowLink>
          </div>
        </div>
      </section>

      {/* How we work */}
      <Chapter
        index={idx.steps}
        label={isAr ? "إزاي بنشتغل" : "How we work"}
        title={isAr ? "من أول مكالمة لحد ما تشتغل: أربع خطوات." : "From the first call to running: four steps."}
        tone="card"
      >
        <StepTrack steps={process.map((p, i) => ({ title: tr(p.title, locale), text: tr(p.text, locale), note: notes[i] }))} />
      </Chapter>

      {/* Why us: honest promises only */}
      <Chapter index={idx.why} label={isAr ? "ليه إحنا" : "Why us"} title={isAr ? "مفيش أرقام متفبركة هنا." : "No made-up numbers here."}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ScrollLit
              className="text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.25] lg:sticky lg:top-28"
              marks={isAr ? ["بنوعد", "بنلتزم"] : ["promise", "keep."]}
              text={
                isAr
                  ? "مش هنحط لوجوهات عملاء ولا تقييمات من الهوا. بس هنقول لك بنوعد بإيه — وبنلتزم بيه في كل مشروع."
                  : "No borrowed logos, no invented reviews. Just what we promise — and the promises we keep on every project."
              }
            />
          </div>
          <ul className="border-b border-[var(--border)] lg:col-span-7">
            {commitments.map((c, i) => (
              <Rise as="li" key={c.title.en} delay={(i % 3) * 0.05} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-[var(--border)] py-6 sm:grid-cols-[2.5rem_14rem_1fr] sm:gap-8">
                <span aria-hidden="true" className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]">
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="title-sm text-xl font-bold">{tr(c.title, locale)}</h3>
                <p className="col-start-2 text-lg leading-relaxed text-[var(--text-muted)] sm:col-start-auto">{tr(c.text, locale)}</p>
              </Rise>
            ))}
          </ul>
        </div>
      </Chapter>

      {/* FAQ (same list feeds the JSON-LD above) */}
      <Chapter id="faq" index={idx.faq} label={isAr ? "أسئلة" : "Questions"} title={isAr ? "أسئلة بتتسأل كتير." : "Questions people ask."} tone="card">
        <Faq items={faqItems} />
      </Chapter>

      {/* Closing call to action */}
      <section className="border-t border-[var(--border)]">
        <div className={`${shell} py-24 sm:py-32`}>
          <div className="grid items-center gap-12 overflow-hidden rounded-[2rem] border border-[var(--border-hover)] bg-[var(--bg-card)] p-7 sm:p-12 lg:grid-cols-12 lg:gap-16 lg:p-16">
            <div className="lg:col-span-7">
              <Rise>
                <p className="label flex items-center gap-3">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {isAr ? "استشارة مجانية" : "Free consultation"}
                </p>
              </Rise>
              <Rise delay={0.05}>
                <h2 className="mt-6 font-display text-[clamp(2.3rem,5vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-balance">
                  {isAr ? "ابعت لنا زي ما بتبعت لصاحبك." : "Message us like you’d message a friend."}
                </h2>
              </Rise>
              <Rise delay={0.1}>
                <ul className="mt-8 space-y-3 text-lg">
                  {(isAr
                    ? ["مكالمة 30 دقيقة، ببلاش ومن غير التزام.", "بنسمع الأول، وننصحك بصراحة — حتى لو مش محتاجنا.", "عرض مكتوب وسعر واضح خلال 48 ساعة."]
                    : ["A 30-minute call — free, no commitment.", "We listen first and advise honestly — even if you don’t need us.", "A written offer with a clear price within 48 hours."]
                  ).map((pt) => (
                    <li key={pt} className="flex items-start gap-3">
                      <Check aria-hidden="true" className="mt-1.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Rise>
              <Rise delay={0.15} className="mt-10 flex flex-wrap items-center gap-3">
                <ConsultActions locale={locale} />
              </Rise>
            </div>
            <Rise delay={0.1} className="lg:col-span-5">
              <HelloPhone locale={locale} />
            </Rise>
          </div>
        </div>
      </section>
    </>
  );
}
