import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/layout/Logo";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { VelocityMarquee } from "@/components/motion/Kinetic";
import { services, tr } from "@/lib/content";
import { readySystems } from "@/lib/systems";
import { site, whatsappLink, type Locale } from "@/lib/site";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");
  const isAr = locale === "ar";
  const year = new Date().getFullYear();

  const company = [
    { label: tn("home"), href: "" },
    { label: tn("services"), href: "/services" },
    { label: tn("systems"), href: "/systems" },
    { label: tn("work"), href: "/portfolio" },
    { label: tn("about"), href: "/about" },
    { label: tn("contact"), href: "/contact" },
  ];

  return (
    <footer className="relative z-10 overflow-hidden border-t border-[var(--border)] bg-[var(--bg-primary)]">
      {/* Giant kinetic sign-off that reacts to scroll speed */}
      <Link href={`/${locale}/contact`} data-cursor={isAr ? "ابدأ" : "let's go"} className="block border-b border-[var(--border)] py-8 sm:py-12">
        <VelocityMarquee baseSpeed={50}>
          {[0, 1].map((k) => (
            <span key={k} className="flex items-center gap-10 pe-10 font-display text-[clamp(3.5rem,11vw,10rem)] font-bold leading-none tracking-[-0.04em]">
              <span>{isAr ? "لنبنِ معًا" : "Let’s build"}</span>
              <span className="text-outline-accent">{isAr ? "منتجًا يُحدث فرقًا" : "something real"}</span>
              <span className="inline-block h-[0.35em] w-[0.35em] rounded-full bg-[var(--accent)]" />
            </span>
          ))}
        </VelocityMarquee>
      </Link>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr_1.2fr]">
        <div className="max-w-sm space-y-5">
          <Logo href={`/${locale}`} />
          <p className="text-sm leading-relaxed text-[var(--text-muted)]">{t("tagline")}</p>
        </div>

        <nav aria-label={t("services")}>
          <h2 className="label mb-5">{t("services")}</h2>
          <ul className="space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${locale}/services/${s.slug}`} className="text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
                  {tr(s.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("systems")}>
          <h2 className="label mb-5">{t("systems")}</h2>
          <ul className="space-y-3 text-sm">
            {readySystems.map((s) => (
              <li key={s.slug}>
                <Link href={`/${locale}/systems/${s.slug}`} className="text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
                  {tr(s.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("company")}>
          <h2 className="label mb-5">{t("company")}</h2>
          <ul className="space-y-3 text-sm">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={`/${locale}${l.href}`} className="text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="label mb-5">{t("contact")}</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={whatsappLink(tc("whatsapp_message"))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[var(--accent)]">
                <WhatsAppIcon className="h-4 w-4" />
                <span dir="ltr">{site.whatsapp}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-[var(--accent)]">
                {site.email}
              </a>
            </li>
            <li className="text-[var(--text-muted)]">
              {site.city[locale]}
              {isAr ? "، " : ", "}
              {site.country[locale]}
            </li>
            <li className="flex gap-4 pt-2">
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="label hover:text-[var(--text-primary)]">
                LinkedIn
              </a>
              <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="label hover:text-[var(--text-primary)]">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 border-t border-[var(--border)] px-5 py-6 text-xs text-[var(--text-subtle)] sm:flex-row sm:justify-between sm:px-8">
        <p>
          © {year} {site.legalName}. {t("rights")}
        </p>
        <p className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href={`/${locale}/privacy`} className="hover:text-[var(--text-primary)]">
            {t("privacy")}
          </Link>
          <Link href={`/${locale}/terms`} className="hover:text-[var(--text-primary)]">
            {t("terms")}
          </Link>
          <span>{t("made_in")}</span>
        </p>
      </div>
    </footer>
  );
}
