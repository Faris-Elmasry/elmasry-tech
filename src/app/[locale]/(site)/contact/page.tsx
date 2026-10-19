import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Mail, MapPin } from "lucide-react";
import { Rise } from "@/components/motion/Kinetic";
import { Chapter, Faq, StudioHero } from "@/components/studio/kit";
import { ContactForm } from "@/components/sections/ContactForm";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { faqs, services, tr } from "@/lib/content";
import { contactSteps, workingHours } from "@/lib/company";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, JsonLd, organizationId } from "@/lib/seo";
import { localeUrl, site, whatsappLink, type Locale } from "@/lib/site";
import type { contactServices } from "@/lib/validators";
import { seoFor } from "@/lib/seo-copy";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const seo = seoFor("contact");
  return buildMetadata({ locale, path: "/contact", title: tr(seo.title, locale), description: tr(seo.description, locale) });
}

export default async function ContactPage({ params, searchParams }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const { service } = await searchParams;
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");
  const isAr = locale === "ar";
  const seo = seoFor("contact");

  const serviceLabels = Object.fromEntries([
    ...services.map((s) => [s.slug, tr(s.label, locale)]),
    ["ready-made-system", isAr ? "نظام جاهز" : "A ready-made system"],
    ["other", isAr ? "لسه مش عارف" : "Not sure yet"],
  ]) as Record<(typeof contactServices)[number], string>;

  const faqItems = faqs.slice(0, 5).map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }));
  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: localeUrl(locale, "/contact"),
    about: { "@id": organizationId },
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(locale, [{ name: t("eyebrow"), path: "/contact" }]), contactLd, faqJsonLd(faqItems)]} />

      <StudioHero
        locale={locale}
        crumbs={[{ name: t("eyebrow") }]}
        sheet={isAr ? "رد خلال يوم عمل" : "Reply within a working day"}
        kicker={isAr ? "تواصل معنا · استشارة مجانية" : "Contact · free consultation"}
        keyword={tr(seo.h1!, locale)}
        title={t("title")}
        sub={tr(seo.intro!, locale)}
        aside={
          <div className="rounded-[1.5rem] border border-[var(--border-hover)] bg-[var(--bg-card)] p-7 sm:p-8">
            <p className="title-sm text-xl font-bold">{isAr ? "تحب نتكلم دلوقتي؟" : "Rather talk now?"}</p>
            <p className="mt-2 leading-relaxed text-[var(--text-muted)]">{isAr ? "ابعت على الواتساب وهيرد عليك بني آدم، مش روبوت." : "Message us on WhatsApp — a real person replies, not a robot."}</p>
            <Button
              href={whatsappLink(tc("whatsapp_message"))}
              size="lg"
              fullWidth
              className="mt-6 bg-[#25D366] text-[#06210f] hover:bg-[#1fb257]"
              leftIcon={<WhatsAppIcon className="h-5 w-5" />}
            >
              {t("whatsapp")}
            </Button>
            <ul className="mt-7 space-y-4 border-t border-[var(--border)] pt-6">
              {site.email && (
                <li className="flex items-start gap-3">
                  <Mail aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                  <a href={`mailto:${site.email}`} className="link-draw">
                    {site.email}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <WhatsAppIcon className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" dir="ltr" className="link-draw">
                  {site.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[var(--text-muted)]">
                <MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
                {t("location")}
              </li>
              <li className="flex items-start gap-3 text-[var(--text-muted)]">
                <Clock aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
                {tr(workingHours, locale)}
              </li>
            </ul>
          </div>
        }
      />

      {/* 01 — the form with its live message preview */}
      <Chapter
        id="form"
        index="01"
        label={isAr ? "اكتب لنا" : "Write to us"}
        title={isAr ? "اكتب كام سطر — وشوف رسالتك وهي بتوصلنا." : "Write a few lines — and watch your message reach us."}
        sub={isAr ? "مش محتاج تعرف أي مصطلحات. احكي المشكلة بكلامك، وإحنا نسأل الباقي." : "No technical words needed. Describe the problem your way — we’ll ask the rest."}
      >
        <ContactForm serviceLabels={serviceLabels} initialService={typeof service === "string" ? service : undefined} />
      </Chapter>

      {/* 02 — what happens next */}
      <Chapter index="02" label={isAr ? "بعد ما تبعت" : "After you send"} title={isAr ? "تلات خطوات، ومن غير أي التزام." : "Three steps, no commitment."} tone="card">
        <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
          {contactSteps.map((s, i) => (
            <Rise as="li" key={s.title.en} delay={i * 0.08} className="flex flex-col bg-[var(--bg-secondary)] p-7 sm:p-9">
              <span className="font-display text-6xl font-bold leading-none text-[var(--accent)]">
                {i + 1}
              </span>
              <h3 className="mt-10 title-sm text-2xl font-bold">{tr(s.title, locale)}</h3>
              <p className="mt-3 text-lg leading-relaxed text-[var(--text-muted)]">{tr(s.text, locale)}</p>
            </Rise>
          ))}
        </ol>
      </Chapter>

      <Chapter index="03" label={isAr ? "أسئلة" : "Questions"} title={isAr ? "قبل ما تبعت، يمكن تسأل…" : "Before you write, you might wonder…"}>
        <Faq items={faqItems} />
      </Chapter>
    </>
  );
}
