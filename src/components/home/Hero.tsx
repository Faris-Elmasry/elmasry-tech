import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Kinetic";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { services, tr } from "@/lib/content";
import { whatsappLink, type Locale } from "@/lib/site";

/**
 * Opener. Server-rendered with CSS-only entrance animations so the H1 (the LCP
 * element) paints immediately without waiting for JavaScript. The particle
 * field forms a "</>" glyph on the other side.
 */
export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations("hero");
  const tc = await getTranslations("common");

  return (
    <section
      data-shape="code"
      data-shape-x="0.25"
      data-shape-scale="0.85"
      className="relative flex min-h-[100svh] items-center px-5 pb-16 pt-28 sm:px-8"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="max-w-[40rem] lg:max-w-[46%]">
          <h1>
            <span className="label in flex items-center gap-3" style={{ "--d": "0ms" } as React.CSSProperties}>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {t("eyebrow")}
            </span>
            <span className="mt-6 block font-display text-[clamp(2.4rem,5.2vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.035em] text-balance">
              {t("title_a")} <span className="text-[var(--accent)]">{t("title_c")}</span>
            </span>
          </h1>

          <p className="in mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-muted)] text-pretty" style={{ "--d": "120ms" } as React.CSSProperties}>
            {t("subtitle")}
          </p>

          <div className="in mt-8 flex flex-wrap items-center gap-3" style={{ "--d": "220ms" } as React.CSSProperties}>
            <Magnetic>
              <Button href={`/${locale}/contact`} size="lg">
                {t("cta_primary")}
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={whatsappLink(tc("whatsapp_message"))} variant="outline" size="lg" leftIcon={<WhatsAppIcon className="h-5 w-5 text-[#25D366]" />}>
                {t("whatsapp")}
              </Button>
            </Magnetic>
          </div>

          {/* What we build — each chip deep-links to its service page */}
          <nav aria-label={t("chips_label")} className="in mt-12" style={{ "--d": "320ms" } as React.CSSProperties}>
            <p className="label mb-3">{t("chips_label")}</p>
            <ul className="flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${locale}/services/${s.slug}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--border)] px-4 text-sm text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                  >
                    <DynamicIcon name={s.icon} className="h-4 w-4" />
                    {tr(s.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="in mt-8 text-sm text-[var(--text-subtle)]" style={{ "--d": "400ms" } as React.CSSProperties}>
            {t("note")}
          </p>
        </div>
      </div>
    </section>
  );
}
