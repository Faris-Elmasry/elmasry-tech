import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/sections/PageHeader";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CtaSection } from "@/components/sections/HomeSections";
import { SystemCard, shell } from "@/components/sections/Blocks";
import { Heading } from "@/components/home/Heading";
import { Rise } from "@/components/motion/Kinetic";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { services, tr } from "@/lib/content";
import { readySystems } from "@/lib/systems";
import { getProjects } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";
import { whatsappLink, type Locale } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const isAr = locale === "ar";
  return buildMetadata({
    locale,
    path: "/portfolio",
    title: isAr ? "أعمالنا — مواقع وتطبيقات وأنظمة نفّذناها" : "Our Work — Websites, Apps & Systems",
    description: isAr
      ? "نماذج من أعمال Elmasry Tech: أنظمة إدارة ومواقع وتطبيقات جوال صمّمناها وطوّرناها لشركات في مصر."
      : "Selected projects by Elmasry Tech: business systems, websites and mobile apps designed and built for companies in Egypt.",
  });
}

export default async function PortfolioPage({ params }: PageProps<"/[locale]/portfolio">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("work_page");
  const isAr = locale === "ar";
  const projects = await getProjects();

  const labels: Record<string, string> = {
    all: t("all"),
    system: t("system"),
    web: t("web"),
    mobile: t("mobile"),
    saas: t("saas"),
    other: t("other"),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t("eyebrow"), path: "/portfolio" }])} />
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} sub={t("subtitle")} />
      {projects.length > 0 && (
        <section className={`${shell} pb-28`}>
          <PortfolioGrid projects={projects} locale={locale} labels={labels} emptyLabel={t("empty")} />
        </section>
      )}

      {/* Our own products — always shown, so the page is never empty */}
      <section className={`${shell} ${projects.length > 0 ? "py-24 sm:py-32" : "pb-24"}`}>
        <Heading
          index="01"
          label={isAr ? "منتجاتنا" : "Our products"}
          title={isAr ? "أنظمة صمّمناها وطوّرناها، وتعمل يوميًا." : "Systems we designed and built — running every day."}
          sub={
            isAr
              ? "هذه منتجاتنا الخاصة: يمكنك تجربة أي منها في عرض حيّ، ورؤية طريقة تفكيرنا في الواجهات والبيانات والتشغيل."
              : "These are our own products. You can try any of them in a live demo and see how we think about interfaces, data and day-to-day operations."
          }
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {readySystems.map((sys, i) => (
            <Rise as="li" key={sys.slug} delay={(i % 4) * 0.06}>
              <SystemCard system={sys} locale={locale} index={i} />
            </Rise>
          ))}
        </ul>
      </section>

      {/* Client work under NDA */}
      <section className={`${shell} pb-24 sm:pb-32`}>
        <Rise className="grid gap-10 rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-card)] p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="label flex items-center gap-3">
              <span className="text-[var(--accent)]">02</span>
              <span className="h-px w-10 bg-[var(--border-hover)]" />
              {isAr ? "مشاريع العملاء" : "Client projects"}
            </p>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
              {isAr ? "كثير من أعمالنا لعملائنا محمي باتفاقيات سرية." : "Much of our client work is covered by confidentiality agreements."}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
              {isAr
                ? "لا ننشر أنظمة عملائنا الداخلية دون إذن مكتوب. في اجتماع خاص، يسعدنا أن نعرض عليك مشاريع مشابهة لمشروعك، بما فيها الشاشات وطريقة التنفيذ والنتائج."
                : "We never publish a client’s internal systems without written permission. In a private session we’re happy to walk you through projects similar to yours — screens, approach and outcomes included."}
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Button
              href={whatsappLink(isAr ? "مرحبًا، أود الاطلاع على نماذج من أعمالكم المشابهة لمشروعي." : "Hi, I'd like to see examples of your work similar to my project.")}
              size="lg"
              leftIcon={<WhatsAppIcon className="h-5 w-5" />}
            >
              {isAr ? "اطلب عرضًا خاصًا للأعمال" : "Book a private walkthrough"}
            </Button>
            <Button href={`/${locale}/contact`} variant="outline" size="lg">
              {isAr ? "أرسل تفاصيل مشروعك" : "Send your project details"}
            </Button>
          </div>
        </Rise>
      </section>

      {/* What we build, by service */}
      <section className={`${shell} pb-24 sm:pb-32`}>
        <p className="eyebrow mb-6">{isAr ? "ما الذي نبنيه" : "What we build"}</p>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((sv) => (
            <li key={sv.slug} className="bg-[var(--bg-primary)]">
              <Link href={`/${locale}/services/${sv.slug}`} className="group flex h-full flex-col gap-6 p-7 transition-colors hover:bg-[var(--bg-card)]">
                <DynamicIcon name={sv.icon} className="h-6 w-6 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                <span>
                  <span className="block font-display text-lg font-bold">{tr(sv.label, locale)}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-[var(--text-muted)]">{tr(sv.summary, locale)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaSection locale={locale} />
    </>
  );
}
