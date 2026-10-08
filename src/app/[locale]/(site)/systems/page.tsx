import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { EngagementSection, StepsSection, SystemCard, shell } from "@/components/sections/Blocks";
import { CtaSection, FaqSection } from "@/components/sections/HomeSections";
import { Heading } from "@/components/home/Heading";
import { Rise as Reveal } from "@/components/motion/Kinetic";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { tr } from "@/lib/content";
import { readySystems, systemFaqs, systemSteps } from "@/lib/systems";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd } from "@/lib/seo";
import { localeUrl, whatsappLink, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/systems">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const isAr = locale === "ar";
  return buildMetadata({
    locale,
    path: "/systems",
    title: isAr ? "أنظمة جاهزة: كاشير، مخازن، عيادات، صيدليات، جيم ومطاعم" : "Ready-made Business Systems: POS, Inventory, Clinics & more",
    description: isAr
      ? "أنظمة جاهزة من Elmasry Tech: برنامج كاشير، برنامج مخازن، إدارة العيادات والصيدليات والصالات الرياضية والمطاعم والمدارس، وبرنامج حسابات ورواتب. اطلب عرضًا تجريبيًا."
      : "Ready-made systems by Elmasry Tech: POS, inventory, clinic, pharmacy, gym, restaurant, school and accounting/HR software. Request a live demo.",
    keywords: readySystems.flatMap((s) => s.keywords[locale].slice(0, 2)),
  });
}

export default async function SystemsPage({ params }: PageProps<"/[locale]/systems">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const isAr = locale === "ar";
  const label = isAr ? "الأنظمة الجاهزة" : "Ready-made systems";

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
      <PageHeader
        eyebrow={label}
        title={isAr ? "أنظمة جاهزة تعمل من الأسبوع الأول." : "Ready-made systems, running from week one."}
        sub={
          isAr
            ? "ثمانية أنظمة مُجرّبة نهيّئها لفروعك وإجراءاتك وهويتك: جرّبها في عرض حيّ، ثم اختر الاشتراك الشهري أو الترخيص الدائم — ويمكن إضافة أي تخصيص تحتاجه."
            : "Eight proven systems we configure for your branches, workflows and brand. Try one in a live demo, then choose a monthly subscription or a perpetual licence — and add any customisation you need."
        }
      >
        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
          <Button
            href={whatsappLink(isAr ? "مرحبًا، أود طلب عرض تجريبي لأحد أنظمتكم الجاهزة." : "Hi, I'd like a live demo of one of your ready-made systems.")}
            size="lg"
            leftIcon={<WhatsAppIcon className="h-5 w-5" />}
          >
            {isAr ? "اطلب عرضًا تجريبيًا" : "Request a live demo"}
          </Button>
          <Button href={`/${locale}/contact?service=ready-made-system`} variant="outline" size="lg" rightIcon={<ArrowUpRight className="h-5 w-5 rtl-flip" />}>
            {isAr ? "اطلب عرض سعر" : "Get a quote"}
          </Button>
        </Reveal>
      </PageHeader>

      <section className={`${shell} pb-24`}>
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {readySystems.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 4) * 0.06}>
              <SystemCard system={s} locale={locale} index={i} />
            </Reveal>
          ))}
        </ul>
      </section>

      <StepsSection
        locale={locale}
        index="01"
        label={isAr ? "كيف تبدأ" : "How it works"}
        title={isAr ? "من العرض التجريبي إلى التشغيل في أيام." : "From demo to go-live in days, not months."}
        steps={systemSteps}
      />
      <EngagementSection locale={locale} index="02" />

      <section className={`${shell} py-24 sm:py-32`}>
        <div className="grid items-center gap-10 rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-card)] p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
          <Heading
            index="03"
            label={isAr ? "لا تجد ما تحتاجه؟" : "Need something else?"}
            title={isAr ? "إذا لم يناسبك نظام جاهز، نبنيه لك من الصفر." : "If no ready-made system fits, we build one from scratch."}
          />
          <div className="flex flex-col gap-3 lg:items-end">
            <Button href={`/${locale}/services/custom-software`} size="lg" rightIcon={<ArrowUpRight className="h-5 w-5 rtl-flip" />}>
              {isAr ? "الأنظمة المخصصة و ERP" : "Custom software & ERP"}
            </Button>
          </div>
        </div>
      </section>

      <FaqSection locale={locale} index="04" items={systemFaqs} title={isAr ? "أسئلة شائعة عن الأنظمة الجاهزة" : "Questions about our ready-made systems"} />
      <CtaSection locale={locale} />
    </>
  );
}
