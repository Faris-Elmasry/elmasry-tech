import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Kinetic";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { whatsappLink } from "@/lib/site";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("common");
  const tn = await getTranslations("nav");
  const isAr = locale === "ar";

  const places = [
    { href: `/${locale}/services`, title: tn("services"), text: tn("services_hint") },
    { href: `/${locale}/systems`, title: tn("systems"), text: tn("systems_hint") },
    { href: `/${locale}/portfolio`, title: tn("work"), text: tn("work_hint") },
    { href: `/${locale}/contact`, title: tn("contact"), text: tn("contact_hint") },
  ];

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="mx-auto grid w-full max-w-[1400px] gap-14 px-5 pb-24 sm:px-8 lg:grid-cols-12 lg:items-end lg:gap-16 lg:pb-32">
        <div className="lg:col-span-7">
          <p className="label in flex items-center gap-3">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            {isAr ? "خطأ 404" : "Error 404"}
          </p>
          {/* A browser window that lost its page */}
          <div aria-hidden="true" className="in mt-8 overflow-hidden rounded-2xl border border-[var(--border-hover)] bg-[#0e0e10]" style={{ "--d": "80ms" } as React.CSSProperties}>
            <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[#141416] px-4 py-3">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3f]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3f]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3f]" />
              </span>
              <span dir="ltr" className="mx-auto truncate rounded-full bg-[#1d1d20] px-4 py-1 text-xs text-[var(--text-muted)]">
                elmasry.tech/{locale}/<span className="text-[var(--danger)]">???</span>
              </span>
            </div>
            <div className="bg-blueprint flex items-center justify-center px-6 py-14 sm:py-20">
              <span dir="ltr" className="font-display text-[clamp(6rem,20vw,13rem)] font-bold leading-none tracking-[-0.06em]">
                4<span className="text-outline-accent">0</span>4
              </span>
            </div>
          </div>
          <h1 className="mt-10 title-sm text-3xl font-bold sm:text-4xl">{t("not_found_title")}</h1>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">{t("not_found_text")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic strength={0.3}>
              <Button href={`/${locale}`} size="lg">
                {t("home")}
              </Button>
            </Magnetic>
            <Button href={whatsappLink(t("whatsapp_message"))} variant="outline" size="lg" leftIcon={<WhatsAppIcon className="h-5 w-5 text-[#25D366]" />}>
              {isAr ? "واتساب" : "WhatsApp"}
            </Button>
          </div>
        </div>

        <nav aria-label={isAr ? "صفحات مقترحة" : "Suggested pages"} className="lg:col-span-5">
          <p className="label mb-4">{isAr ? "يمكن كنت بتدوّر على" : "Maybe you were looking for"}</p>
          <ul className="border-b border-[var(--border)]">
            {places.map((p) => (
              <li key={p.href} className="border-t border-[var(--border)]">
                <Link href={p.href} className="group flex items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block title-sm text-2xl font-bold transition-colors duration-500 group-hover:text-[var(--accent)]">{p.title}</span>
                    <span className="block text-[var(--text-muted)]">{p.text}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-[var(--text-muted)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)] rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
