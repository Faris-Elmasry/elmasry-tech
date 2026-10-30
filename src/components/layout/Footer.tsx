import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUp, ArrowUpRight, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { CairoClock } from "@/components/layout/Navbar";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { Magnetic, Rise } from "@/components/motion/Kinetic";
import { services, tr } from "@/lib/content";
import { readySystems } from "@/lib/systems";
import { site, whatsappLink, type Locale } from "@/lib/site";

const col = "label mb-5 block";
const item = "inline-block py-1 text-[0.95rem] text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text-primary)]";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-[var(--border)] bg-[var(--bg-primary)]">
      {/* Sign-off: one sentence, one round magnetic button */}
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 pb-16 pt-20 sm:px-8 sm:pt-28 md:grid-cols-[1fr_auto]">
        <Rise>
          <p className="label flex items-center gap-3">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            {t("contact")}
          </p>
          <p className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,7vw,6.4rem)] font-bold leading-[0.98] tracking-[-0.045em] text-balance">{t("sign_off")}</p>
        </Rise>
        <Rise delay={0.1} className="justify-self-start md:justify-self-end">
          <Magnetic strength={0.4}>
            <Link
              href={`/${locale}/contact`}
              className="group relative flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-full bg-[var(--accent)] p-6 text-center font-medium leading-tight text-[var(--accent-ink)] transition-colors duration-500 hover:bg-[var(--text-primary)] sm:h-48 sm:w-48"
            >
              <ArrowUpRight aria-hidden="true" className="h-7 w-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              <span className="max-w-[8rem] text-[0.95rem]">{t("sign_cta")}</span>
            </Link>
          </Magnetic>
        </Rise>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-[var(--border)] py-14 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
        <div className="col-span-2 max-w-sm space-y-6 lg:col-span-1">
          <Logo href={`/${locale}`} />
          <p className="leading-relaxed text-[var(--text-muted)]">{t("tagline")}</p>
          <ul className="space-y-2">
            <li>
              <a href={whatsappLink(tc("whatsapp_message"))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                <span dir="ltr">{site.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={site.tel} className="inline-flex items-center gap-2 text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
                <Phone aria-hidden="true" className="h-4 w-4 text-[var(--text-muted)]" />
                {locale === "ar" ? "اتصل بينا" : "Call us"}
              </a>
            </li>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
                  {site.email}
                </a>
              </li>
            )}
            <li className="pt-1">
              <CairoClock label={tn("cairo")} />
            </li>
          </ul>
        </div>

        <nav aria-label={t("services")}>
          <span className={col}>{t("services")}</span>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${locale}/services/${s.slug}`} className={item}>
                  {tr(s.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("systems")}>
          <span className={col}>{t("systems")}</span>
          <ul>
            {readySystems.map((s) => (
              <li key={s.slug}>
                <Link href={`/${locale}/systems/${s.slug}`} className={item}>
                  {tr(s.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("company")} className="col-span-2 sm:col-span-1">
          <span className={col}>{t("company")}</span>
          <ul>
            {(
              [
                ["about", "/about"],
                ["work", "/portfolio"],
                ["guides", "/guides"],
                ["services", "/services"],
                ["systems", "/systems"],
                ["contact", "/contact"],
              ] as const
            ).map(([k, href]) => (
              <li key={k}>
                <Link href={`/${locale}${href}`} className={item}>
                  {tn(k)}
                </Link>
              </li>
            ))}
          </ul>
          <span className={`${col} mt-8`}>{t("legal")}</span>
          <ul>
            <li>
              <Link href={`/${locale}/privacy`} className={item}>
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/terms`} className={item}>
                {t("terms")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
      <div className="flex flex-col gap-4 border-t border-[var(--border)] py-6 text-sm text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {locale === "ar" ? site.nameAr : site.name}. {t("rights")} <span className="text-[var(--text-muted)]">{t("made_in")}</span>
        </p>
        <div className="flex items-center gap-6">
          {site.social.linkedin ? (
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--text-primary)]">
              LinkedIn
            </a>
          ) : null}
          <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--text-primary)]">
            GitHub
          </a>
          <a href="#main-content" className="group inline-flex items-center gap-2 transition-colors hover:text-[var(--text-primary)]">
            {t("back_top")}
            <ArrowUp aria-hidden="true" className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      </div>

      {/* Oversized outlined wordmark, sized to the container and cropped by the page edge */}
      <div aria-hidden="true" className="pointer-events-none mx-auto -mb-[3%] max-w-[1400px] select-none px-5 sm:px-8">
        <svg viewBox="0 0 1000 150" className="block w-full overflow-visible" direction="ltr">
          <text
            x="0"
            y="140"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fill="none"
            stroke="rgba(237,234,227,0.22)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            className="font-display"
            style={{ fontSize: 180, fontWeight: 700, letterSpacing: "-0.04em" }}
          >
            elmasry<tspan stroke="var(--accent)">/</tspan>tech
          </text>
        </svg>
      </div>
    </footer>
  );
}
