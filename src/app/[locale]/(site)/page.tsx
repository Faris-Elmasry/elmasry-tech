import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { SystemsRail } from "@/components/home/SystemsRail";
import { ProcessPath } from "@/components/home/ProcessPath";
import { CtaBlock, FaqBlock, KeywordBand, TestimonialsBlock, WhyBlock, WorkBlock } from "@/components/home/HomeBlocks";
import { getProjects, getTestimonials } from "@/lib/data";
import { faqs, tr } from "@/lib/content";
import { buildMetadata, faqJsonLd, JsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const isAr = locale === "ar";
  return buildMetadata({
    locale,
    path: "",
    absoluteTitle: true,
    title: isAr
      ? "شركة برمجة في مصر | مواقع وتطبيقات وأنظمة — Elmasry Tech"
      : "Software Development Company in Egypt | Elmasry Tech",
    description: isAr
      ? "شركة برمجيات في القاهرة: تصميم مواقع، برمجة تطبيقات موبايل أندرويد و iOS، أنظمة ERP وسيستم كاشير، وشات بوت واتساب بالذكاء الاصطناعي. استشارة مجانية."
      : "Cairo-based software company building websites, iOS & Android apps, ERP/POS systems, AI chatbots and automation for businesses in Egypt. Free consultation.",
    keywords: isAr
      ? ["شركة برمجة في مصر", "شركة برمجيات في القاهرة", "تصميم مواقع", "برمجة تطبيقات موبايل", "برنامج ERP", "سيستم كاشير", "شات بوت واتساب"]
      : ["software company Egypt", "software development company Cairo", "web development Egypt", "mobile app development Egypt", "ERP Egypt", "POS system Egypt"],
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const [projects, testimonials] = await Promise.all([getProjects({ featured: true, limit: 3 }), getTestimonials()]);

  let n = 0;
  const next = () => String(++n).padStart(2, "0");

  return (
    <>
      <JsonLd data={faqJsonLd(faqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) })))} />
      <Hero locale={locale} />
      <ServicesShowcase locale={locale} index={next()} label={t("services_eyebrow")} title={t("services_sub")} />
      <KeywordBand locale={locale} />
      <SystemsRail
        locale={locale}
        index={next()}
        label={t("systems_eyebrow")}
        title={t("systems_title")}
        sub={t("systems_sub")}
        cta={t("systems_cta")}
      />
      <ProcessPath locale={locale} index={next()} label={t("process_eyebrow")} title={t("process_title")} />
      <WhyBlock locale={locale} index={next()} />
      <WorkBlock locale={locale} projects={projects} index={next()} />
      <TestimonialsBlock locale={locale} testimonials={testimonials} index={testimonials.length ? next() : ""} />
      <FaqBlock locale={locale} index={next()} />
      <CtaBlock locale={locale} />
    </>
  );
}
