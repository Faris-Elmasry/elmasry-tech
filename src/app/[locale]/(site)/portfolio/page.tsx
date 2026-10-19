import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Rise } from "@/components/motion/Kinetic";
import { ArrowLink, Chapter, SignOff, StudioHero } from "@/components/studio/kit";
import { AppMock, DashMock, SiteMock } from "@/components/studio/screens";
import { HRail } from "@/components/studio/HRail";
import { HoverReveal } from "@/components/studio/HoverReveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { services, tr } from "@/lib/content";
import { serviceDetails } from "@/lib/service-details";
import { readySystems, sysName } from "@/lib/systems";
import { getProjects } from "@/lib/data";
import { work } from "@/lib/work";
import { WorkShowcase } from "@/components/studio/WorkShowcase";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";
import { whatsappLink, type Locale } from "@/lib/site";
import { seoFor } from "@/lib/seo-copy";
import { localize } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const seo = seoFor("portfolio");
  return buildMetadata({ locale, path: "/portfolio", title: tr(seo.title, locale), description: tr(seo.description, locale) });
}

export default async function PortfolioPage({ params }: PageProps<"/[locale]/portfolio">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("work_page");
  const isAr = locale === "ar";
  const label = isAr ? "أعمالنا" : "Work";
  const seo = seoFor("portfolio");
  const projects = await getProjects();
  // section numbers follow what is shown: live client work, our systems, published projects, private work, what we build
  let n = 0;
  const next = () => String(++n).padStart(2, "0");
  const idx = { work: work.length > 0 ? next() : "", systems: next(), projects: projects.length > 0 ? next() : "", nda: next(), build: next() };
  const category = (c: string) => (["system", "web", "mobile", "saas", "other"].includes(c) ? t(c as "system") : c);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: label, path: "/portfolio" }])} />

      <StudioHero
        locale={locale}
        crumbs={[{ name: label }]}
        sheet={isAr ? "المعرض" : "Gallery"}
        kicker={isAr ? "أعمالنا · على الشاشة" : "Work · on screen"}
        keyword={tr(seo.h1!, locale)}
        title={isAr ? "مش هنوريك لوجوهات. هنوريك شاشات شغالة." : "No logo wall. Real screens that work."}
        sub={tr(seo.intro!, locale)}
        aside={
          <div className="relative pb-32 sm:pb-16">
            <SiteMock locale={locale} className="me-auto w-[88%]" />
            {/* The phone is laid out at full size and scaled with zoom so its UI keeps its proportions. */}
            <div className="absolute bottom-0 end-0 w-[18.5rem] [zoom:0.45] sm:[zoom:0.66]">
              <AppMock locale={locale} />
            </div>
          </div>
        }
        actions={
          <>
            <Button href="#gallery" size="lg">
              {isAr ? "شوف الشاشات" : "See the screens"}
            </Button>
            <Button
              href={whatsappLink(isAr ? "أهلًا، عايز أشوف أمثلة من شغلكم شبه مشروعي." : "Hi, I’d like to see examples of your work similar to my project.")}
              variant="outline"
              size="lg"
              leftIcon={<WhatsAppIcon className="h-5 w-5 text-[#25D366]" />}
            >
              {isAr ? "اطلب عرض خاص" : "Ask for a private walkthrough"}
            </Button>
          </>
        }
      />

      {/* live client work — the same projects as the homepage (it was missing here) */}
      {work.length > 0 && (
        <Chapter
          index={idx.work}
          label={isAr ? "شغل لعملائنا" : "Client work"}
          title={isAr ? "مشاريع حقيقية شغالة أونلاين." : "Real projects, live online."}
          sub={isAr ? "افتحها وشوف بنفسك." : "Open them and see for yourself."}
        >
          <WorkShowcase items={work} locale={locale} />
        </Chapter>
      )}

      {/* horizontally pinned gallery of our own products */}
      <section id="gallery" className="scroll-mt-16 border-t border-[var(--border)]">
        <div className="mx-auto grid w-full max-w-[1400px] gap-6 px-5 pt-20 sm:px-8 sm:pt-28 lg:grid-cols-12 lg:gap-10">
          <Rise className="lg:col-span-3">
            <p className="label flex items-center gap-3 lg:pt-3">
              <span className="text-[var(--accent)]">
                {idx.systems}
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-[var(--border-hover)]" />
              {isAr ? "منتجاتنا" : "Our products"}
            </p>
          </Rise>
          <Rise className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2.1rem,4.4vw,4rem)] font-bold leading-[1.04] tracking-[-0.035em] text-balance">
              {isAr ? "أنظمة جاهزة بنقدّمها لنشاطك." : "Ready-made systems we offer."}
            </h2>
          </Rise>
        </div>
        <div className="pb-20 pt-10 sm:pb-28">
          <HRail label={isAr ? "معرض الأنظمة" : "Systems gallery"} hint={isAr ? "مرّر لتحت — الشاشات بتتحرك" : "Keep scrolling — the screens move"}>
            {readySystems.map((s, i) => (
              <article key={s.slug} className="grid h-full gap-6 rounded-[1.75rem] border border-[var(--border-hover)] bg-[var(--bg-card)] p-5 sm:p-7 md:grid-cols-[1.35fr_1fr] md:items-center">
                <DashMock system={s} locale={locale} />
                <div className="flex h-full flex-col">
                  <span className="font-mono text-sm text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 title-sm text-3xl font-bold">{tr(s.name, locale)}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-[var(--text-muted)]">{tr(s.tagline, locale)}</p>
                  <ul className="mt-6 space-y-2 border-t border-[var(--border)] pt-5">
                    {s.modules.slice(0, 3).map((m) => (
                      <li key={m.title.en} className="flex items-center gap-3">
                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        {tr(m.title, locale)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 md:mt-auto md:pt-8">
                    <ArrowLink href={`/${locale}/systems/${s.slug}`}>{isAr ? "التفاصيل" : "Details"}</ArrowLink>
                    <ArrowLink href={whatsappLink(isAr ? `أهلًا، عايز عرض تجريبي لـ ${s.name.ar}.` : `Hi, I’d like a demo of the ${sysName(s.name.en)}.`)}>
                      {isAr ? "جرّبه" : "Try it"}
                    </ArrowLink>
                  </div>
                </div>
              </article>
            ))}
          </HRail>
        </div>
      </section>

      {/* 02 — published client projects (from the admin panel), if any */}
      {projects.length > 0 && (
        <Chapter index={idx.projects} label={isAr ? "مشاريع منشورة" : "Published projects"} title={isAr ? "مشاريع عملاء سمحوا لنا نعرضها." : "Client projects we’re allowed to show."}>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => {
              const title = localize(p, "title", locale);
              return (
                <Rise as="li" key={p.id} delay={(i % 3) * 0.06}>
                  <Link href={`/${locale}/portfolio/${p.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-card)]">
                      {p.thumbnail ? (
                        <Image src={p.thumbnail} alt={title} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw" className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                      ) : (
                        <div className="bg-blueprint absolute inset-0 flex items-end p-6">
                          <span className="title-sm text-3xl font-bold leading-tight">{title}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="label">{category(p.category)}</p>
                        <h3 className="mt-2 title-sm text-xl font-bold">{title}</h3>
                        <p className="mt-1 line-clamp-2 text-[var(--text-muted)]">{localize(p, "description", locale)}</p>
                      </div>
                      <ArrowUpRight aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)] rtl:-scale-x-100" />
                    </div>
                  </Link>
                </Rise>
              );
            })}
          </ul>
        </Chapter>
      )}

      {/* 03 — client work under NDA */}
      <Chapter
        index={idx.nda}
        label={isAr ? "شغل خاص" : "Private work"}
        title={isAr ? "وفيه شغل تاني لعملاء بنوريه في اجتماع خاص بس." : "More client work, shown only in private."}
        tone="card"
      >
        <Rise className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="space-y-5 text-lg leading-relaxed text-[var(--text-muted)] lg:col-span-7">
            <p>
              {isAr
                ? "مش بننشر أنظمة عملائنا الداخلية من غير إذن مكتوب. ولو حابب، بنمضي معاك اتفاقية سرية قبل ما تحكي لنا أي حاجة."
                : "We never publish a client’s internal system without written permission. If you like, we sign a confidentiality agreement before you tell us anything."}
            </p>
            <p className="text-[var(--text-primary)]">
              {isAr
                ? "في مكالمة خاصة، هنوريك مشاريع شبه مشروعك: الشاشات، وطريقة الشغل، والنتيجة."
                : "In a private call, we’ll walk you through projects like yours: the screens, the approach and the result."}
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
            <Button
              href={whatsappLink(isAr ? "أهلًا، عايز أشوف أمثلة من شغلكم شبه مشروعي." : "Hi, I’d like to see examples of your work similar to my project.")}
              size="lg"
              leftIcon={<WhatsAppIcon className="h-5 w-5" />}
            >
              {isAr ? "اطلب عرض خاص للشغل" : "Book a private walkthrough"}
            </Button>
            <Button href={`/${locale}/contact`} variant="outline" size="lg">
              {isAr ? "ابعت تفاصيل مشروعك" : "Send your project details"}
            </Button>
          </div>
        </Rise>
      </Chapter>

      {/* 04 — what we build (hover reveal) */}
      <Chapter index={idx.build} label={isAr ? "بنبني إيه" : "What we build"} title={isAr ? "ست حاجات بنعملها كويس." : "Six things we do well."}>
        <HoverReveal
          rows={services.map((s) => ({
            title: tr(s.label, locale),
            text: tr(s.summary, locale),
            photo: serviceDetails[s.slug]?.photo,
            href: `/${locale}/services/${s.slug}`,
          }))}
        />
      </Chapter>

      <SignOff locale={locale} title={isAr ? "يلا نبني الشاشة اللي شغلك ناقصها." : "Let’s build the screen your business is missing."} />
    </>
  );
}
