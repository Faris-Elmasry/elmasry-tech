import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Rise as Reveal } from "@/components/motion/Kinetic";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { services, tr } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata, JsonLd, organizationId } from "@/lib/seo";
import { localeUrl, site, whatsappLink, type Locale } from "@/lib/site";
import type { contactServices } from "@/lib/validators";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const isAr = locale === "ar";
  return buildMetadata({
    locale,
    path: "/contact",
    title: isAr ? "تواصل مع Elmasry Tech | شركة برمجة بالقاهرة" : "Contact Elmasry Tech | Software Company in Cairo",
    description: isAr
      ? "تواصل معنا عبر واتساب أو أرسل تفاصيل مشروعك. استشارة مجانية لموقعك أو تطبيقك أو نظام شركتك، ورد خلال يوم عمل واحد."
      : "WhatsApp us or send your project details. Free consultation for your website, app or business system — reply within one working day.",
  });
}

export default async function ContactPage({ params, searchParams }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const { service } = await searchParams;
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");
  const isAr = locale === "ar";

  const serviceLabels = Object.fromEntries([
    ...services.map((s) => [s.slug, tr(s.label, locale)]),
    ["ready-made-system", isAr ? "نظام جاهز" : "Ready-made system"],
    ["other", isAr ? "خدمة أخرى" : "Something else"],
  ]) as Record<(typeof contactServices)[number], string>;

  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: localeUrl(locale, "/contact"),
    about: { "@id": organizationId },
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(locale, [{ name: t("eyebrow"), path: "/contact" }]), contactLd]} />
      <PageHeader shape="ring" eyebrow={t("eyebrow")} title={t("title")} sub={t("subtitle")} />

      <section className="mx-auto grid max-w-7xl gap-16 px-5 pb-28 sm:px-8 lg:grid-cols-[1fr_1.6fr]">
        <Reveal className="space-y-8">
          <Button
            href={whatsappLink(tc("whatsapp_message"))}
            size="lg"
            fullWidth
            className="bg-[#25D366]! text-white! hover:bg-[#1fb257]!"
            leftIcon={<WhatsAppIcon className="h-5 w-5" />}
          >
            {t("whatsapp")}
          </Button>
          <ul className="space-y-5 border-t border-[var(--border)] pt-8">
            <li>
              <p className="eyebrow">{t("email_us")}</p>
              <a href={`mailto:${site.email}`} className="link-draw mt-2 inline-flex items-center gap-2 text-lg">
                <Mail className="h-4 w-4 text-[var(--text-muted)]" />
                {site.email}
              </a>
            </li>
            <li>
              <p className="eyebrow">WhatsApp</p>
              <a href={whatsappLink()} className="link-draw mt-2 inline-block text-lg" dir="ltr">
                {site.whatsapp}
              </a>
            </li>
            <li className="flex items-start gap-2 text-[var(--text-muted)]">
              <MapPin className="mt-1 h-4 w-4 shrink-0" />
              {t("location")}
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-10">
          <ContactForm serviceLabels={serviceLabels} initialService={typeof service === "string" ? service : undefined} />
        </Reveal>
      </section>
    </>
  );
}
