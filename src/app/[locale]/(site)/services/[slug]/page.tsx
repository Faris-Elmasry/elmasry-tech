import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Rise } from "@/components/motion/Kinetic";
import { ltr, Chapter, ConsultActions, Faq, Figure, ShortVersion, SignOff, StudioHero, Ticks } from "@/components/studio/kit";
import { ServiceMock } from "@/components/studio/screens";
import { FillTimeline } from "@/components/studio/FillTimeline";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { faqs, getService, services, tr } from "@/lib/content";
import { serviceDetails } from "@/lib/service-details";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd, organizationId } from "@/lib/seo";
import { localeUrl, locales, type Locale } from "@/lib/site";
import { seoFor } from "@/lib/seo-copy";
import { getSystem, serviceSystems } from "@/lib/systems";

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    locale,
    path: `/services/${slug}`,
    title: tr(seoFor(`service:${slug}`).title, locale),
    description: tr(seoFor(`service:${slug}`).description, locale),
    keywords: service.keywords[locale],
  });
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale: l, slug } = await params;
  const locale = l as Locale;
  setRequestLocale(locale);
  const service = getService(slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) notFound();

  const isAr = locale === "ar";
  const seo = seoFor(`service:${slug}`);
  const label = tr(service.label, locale);
  const related = (serviceSystems[slug] ?? []).map(getSystem).filter((x): x is NonNullable<typeof x> => !!x);
  const servicesLabel = isAr ? "الخدمات" : "Services";
  const index = services.findIndex((s) => s.slug === slug);
  const others = services.filter((s) => s.slug !== slug);
  const message = isAr ? `أهلًا، عايز أعرف تفاصيل وتكلفة: ${label}` : `Hi, I’d like details and pricing for: ${label}`;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: tr(service.title, locale),
    serviceType: label,
    description: tr(seo.description, locale),
    url: localeUrl(locale, `/services/${slug}`),
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "Egypt" },
    availableLanguage: ["ar", "en"],
  };

  const faqItems = [...detail.faqs, ...faqs.slice(0, 2)].map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: servicesLabel, path: "/services" },
            { name: label, path: `/services/${slug}` },
          ]),
          serviceLd,
          faqJsonLd(faqItems),
        ]}
      />

      <StudioHero
        locale={locale}
        crumbs={[{ name: servicesLabel, href: `/${locale}/services` }, { name: label }]}
        sheet={ltr(`${String(index + 1).padStart(2, "0")} / ${String(services.length).padStart(2, "0")}`)}
        kicker={tr(service.title, locale)}
        keyword={tr(seo.h1!, locale)}
        title={tr(detail.headline, locale)}
        sub={tr(seo.intro!, locale)}
        actions={<ConsultActions locale={locale} message={message} />}
        aside={
          <div className="relative mx-auto w-full max-w-[34rem]">
            <ServiceMock slug={slug} locale={locale} />
          </div>
        }
      >
        <ShortVersion
          locale={locale}
          items={[
            tr(service.summary, locale),
            detail.deliverables[locale].slice(0, 3).join(isAr ? "، " : ", ") + (isAr ? "، وأكتر." : ", and more."),
            detail.yourPart[locale][0] + (isAr ? " — والباقي علينا." : " — we handle the rest."),
            isAr ? `مكالمة مجانية، وبعدها عرض مكتوب. المدة: ${tr(detail.timeline, locale)}.` : `A free call, then a written offer. Typical time: ${tr(detail.timeline, locale)}.`,
          ]}
        />
      </StudioHero>

      {/* 01 — the everyday problem → what changes */}
      <Chapter
        index="01"
        label={isAr ? "إيه اللي هيتغيّر" : "What changes"}
        title={isAr ? "من اللي بيضايقك النهارده، للي هيحصل بعد كده." : "From what bothers you today, to what happens next."}
      >
        <ul className="border-b border-[var(--border)]">
          {detail.challenges.map((c, i) => (
            <Rise as="li" key={c.problem.en} delay={i * 0.06} className="grid gap-5 border-t border-[var(--border)] py-8 md:grid-cols-12 md:gap-10 md:py-10">
              <span className="font-mono text-sm text-[var(--text-subtle)] md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:col-span-5">
                <p className="label mb-3">{isAr ? "النهارده" : "Today"}</p>
                <p className="text-xl leading-snug text-[var(--text-muted)] sm:text-2xl">{tr(c.problem, locale)}</p>
              </div>
              <div className="md:col-span-6">
                <p className="label mb-3 !text-[var(--accent)]">{isAr ? "بعد كده" : "After"}</p>
                <p className="title-sm text-xl font-bold leading-snug sm:text-2xl">{tr(c.solution, locale)}</p>
              </div>
            </Rise>
          ))}
        </ul>
      </Chapter>

      {/* 02 — what you receive */}
      <Chapter
        index="02"
        label={isAr ? "هتستلم إيه" : "What you get"}
        title={isAr ? "كل حاجة هتستلمها، مكتوبة من الأول." : "Everything you receive, written down from day one."}
        tone="card"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Rise className="lg:col-span-7">
            <Ticks items={detail.deliverables[locale]} />
          </Rise>
          <Rise delay={0.1} className="lg:col-span-5">
            <Figure src={detail.photo} alt={tr(detail.photoAlt, locale)} fig="02" caption={tr(detail.photoAlt, locale)} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 34vw, 100vw" />
          </Rise>
        </div>
      </Chapter>

      {/* 03 — your effort + how the weeks go (scroll-filled timeline) */}
      <Chapter
        index="03"
        label={isAr ? "مجهودك والمدة" : "Your effort & time"}
        title={isAr ? "مجهود قليل منك، وخطوات واضحة مننا." : "Little effort from you. Clear steps from us."}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Rise className="rounded-[1.25rem] border border-[var(--border-hover)] bg-[var(--bg-card)] p-7 sm:p-8 lg:sticky lg:top-24">
              <p className="label">{isAr ? "اللي محتاجينه منك" : "What we need from you"}</p>
              <ul className="mt-5 space-y-4">
                {detail.yourPart[locale].map((y, i) => (
                  <li key={y} className="flex gap-4 text-lg leading-snug">
                    <span className="font-mono text-sm leading-7 text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {y}
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-[var(--border)] pt-6">
                <p className="label">{isAr ? "المدة المعتادة" : "Usual time"}</p>
                <p className="mt-2 title-sm text-xl font-bold">{tr(detail.timeline, locale)}</p>
              </div>
            </Rise>
          </div>
          <div className="lg:col-span-7">
            <FillTimeline steps={detail.weeks.map((w) => ({ when: tr(w.when, locale), title: tr(w.title, locale), text: tr(w.text, locale) }))} />
          </div>
        </div>
      </Chapter>

      {/* 04 — typical projects */}
      <Chapter
        index="04"
        label={isAr ? "أمثلة" : "Examples"}
        title={isAr ? "حاجات بنبنيها كتير في الخدمة دي." : "What we often build here."}
        sub={
          <span className="flex flex-wrap gap-2 pt-1">
            {detail.forWho[locale].map((w) => (
              <span key={w} className="rounded-full border border-[var(--border-hover)] px-3.5 py-1.5 text-[0.95rem] text-[var(--text-primary)]">
                {w}
              </span>
            ))}
          </span>
        }
      >
        <ul className="grid gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {detail.useCases.map((u, i) => (
            <Rise as="li" key={u.title.en} delay={i * 0.05} className="flex flex-col bg-[var(--bg-primary)] p-7 sm:p-8">
              <span className="font-mono text-sm text-[var(--text-subtle)]">
                {isAr ? "أبجد"[i] : String.fromCharCode(65 + i)}
              </span>
              <h3 className="mt-10 title-sm text-2xl font-bold">{tr(u.title, locale)}</h3>
              <p className="mt-2 text-lg leading-relaxed text-[var(--text-muted)]">{tr(u.text, locale)}</p>
            </Rise>
          ))}
        </ul>
      </Chapter>

      {/* 05 — questions */}
      <Chapter index="05" label={isAr ? "أسئلة" : "Questions"} title={isAr ? `أسئلة عن ${label}` : `${label}: common questions`}>
        <Faq items={faqItems} />
      </Chapter>

      {/* Ready-made systems that fit this service, then the other services */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8">
          {related.length > 0 && (
            <>
              <p className="label mb-6">{isAr ? "أنظمة جاهزة مناسبة" : "Ready-made systems that fit"}</p>
              <ul className="mb-14 grid gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
                {related.map((sys) => (
                  <li key={sys.slug} className="bg-[var(--bg-primary)]">
                    <Link href={`/${locale}/systems/${sys.slug}`} className="group flex h-full items-center justify-between gap-4 p-6 transition-colors duration-500 hover:bg-[var(--bg-card)]">
                      <span className="flex items-center gap-3">
                        <DynamicIcon name={sys.icon} className="h-5 w-5 shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]" />
                        <span>
                          <span className="block font-medium">{tr(sys.name, locale)}</span>
                          <span className="block text-sm text-[var(--text-muted)]">{tr(sys.hint, locale)}</span>
                        </span>
                      </span>
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--text-subtle)] transition-colors group-hover:text-[var(--accent)] rtl:-scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="label mb-6">{isAr ? "خدمات تانية" : "Other services"}</p>
          <ul className="grid gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-5">
            {others.map((s) => (
              <li key={s.slug} className="bg-[var(--bg-primary)]">
                <Link href={`/${locale}/services/${s.slug}`} className="group flex h-full items-center justify-between gap-4 p-6 transition-colors duration-500 hover:bg-[var(--bg-card)]">
                  <span className="flex items-center gap-3">
                    <DynamicIcon name={s.icon} className="h-5 w-5 shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]" />
                    <span className="font-medium">{tr(s.label, locale)}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--text-subtle)] transition-colors group-hover:text-[var(--accent)] rtl:-scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SignOff locale={locale} message={message} title={isAr ? "خلّينا نشوف ده هيمشي إزاي في شغلك." : "Let’s see how this would work for you."} />
    </>
  );
}
