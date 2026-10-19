// Single source of truth for brand, contact and locale facts used across
// metadata, JSON-LD, sitemap and UI. Edit here, not in components.

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://elmasry.tech"
).replace(/\/$/, "");

const PLACEHOLDER_WHATSAPP = "+201000000000";
// Company WhatsApp / phone (override with NEXT_PUBLIC_WHATSAPP).
const whatsappRaw = process.env.NEXT_PUBLIC_WHATSAPP || "+201090036987";
/** False until a real number is configured (NEXT_PUBLIC_WHATSAPP). */
export const hasRealPhone = whatsappRaw.replace(/[^\d]/g, "") !== PLACEHOLDER_WHATSAPP.replace(/[^\d]/g, "");

export const site = {
  name: "Elmasry Tech",
  legalName: "Elmasry Tech Solutions",
  /** The public host, from NEXT_PUBLIC_SITE_URL — changing the domain is that one variable. */
  domain: new URL(siteUrl).host,
  /**
   * Contact email, shown only once a mailbox exists (NEXT_PUBLIC_CONTACT_EMAIL). It was a fixed
   * faris@elmasry.tech before the domain was even bought — mail to it bounced. Without it the
   * site offers WhatsApp, phone and the form.
   */
  email: (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "").trim() || null,
  whatsapp: whatsappRaw,
  whatsappDigits: whatsappRaw.replace(/[^\d]/g, ""),
  city: { en: "Cairo", ar: "القاهرة" },
  country: { en: "Egypt", ar: "مصر" },
  social: {
    // github.com/fariselmasry was a 404; the account is Faris-Elmasry
    github: process.env.NEXT_PUBLIC_GITHUB || "https://github.com/Faris-Elmasry",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || "https://linkedin.com/in/fariselmasry",
  },
  foundingYear: 2023,
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappDigits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Absolute URL for a locale + path ("/services" → https://…/ar/services). */
export function localeUrl(locale: Locale, path = "") {
  const clean = path === "/" ? "" : path;
  return `${siteUrl}/${locale}${clean}`;
}

export const ogLocale: Record<Locale, string> = { en: "en_US", ar: "ar_EG" };
