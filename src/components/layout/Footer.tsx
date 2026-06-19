"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/fariselmasry", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/fariselmasry", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const quickLinks = ["home", "about", "services", "portfolio", "contact"] as const;

const serviceLinks = [
  { en: "Web Development", ar: "تطوير المواقع", hash: "web" },
  { en: "Mobile Apps (iOS & Android)", ar: "تطبيقات الجوال (iOS و Android)", hash: "mobile" },
  { en: "Management Systems", ar: "أنظمة الإدارة", hash: "systems" },
  { en: "POS & Inventory", ar: "نقاط البيع والمخازن", hash: "pos" },
  { en: "Process Automation", ar: "أتمتة العمليات", hash: "automation" },
  { en: "Pharmacy System", ar: "نظام الصيدلية", hash: "pharmacy" },
];

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const params = useParams();
  const locale = (params.locale as string) || "en";

  return (
    <footer className="bg-[var(--bg-secondary)] relative">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 — Brand */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="font-[family-name:var(--font-poppins)] text-xl font-bold inline-block">
              <span className="text-[var(--text-primary)]">ELMASRY</span>
              <span className="text-blue-500">.TECH</span>
            </Link>
            <p className="text-xs text-[var(--text-muted)] font-medium tracking-wider uppercase">
              {t("tagline")}
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {t("description")}
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-blue-400 hover:bg-white/5 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">
              {t("quick_links")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((key) => (
                <li key={key}>
                  <Link
                    href={key === "home" ? `/${locale}` : `/${locale}/${key}`}
                    className="text-sm text-[var(--text-muted)] hover:text-blue-400 transition-colors"
                  >
                    {tn(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">
              {t("our_services")}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service.hash}>
                  <Link
                    href={`/${locale}/services#${service.hash}`}
                    className="text-sm text-[var(--text-muted)] hover:text-blue-400 transition-colors"
                  >
                    {locale === "ar" ? service.ar : service.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">
              {t("contact_info")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <a
                  href="mailto:faris@elmasry.tech"
                  className="text-sm text-[var(--text-muted)] hover:text-blue-400 transition-colors"
                >
                  faris@elmasry.tech
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "+201000000000"}`}
                  className="text-sm text-[var(--text-muted)] hover:text-blue-400 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                <span className="text-sm text-[var(--text-muted)]">
                  {locale === "ar" ? "القاهرة، مصر" : "Cairo, Egypt"}
                </span>
              </li>
              <li className="flex items-center gap-2.5 pt-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">
                  {t("available")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--text-subtle)]">{t("copyright")}</p>
          <p className="text-xs text-[var(--text-subtle)]">{t("built_with")}</p>
        </div>
      </div>
    </footer>
  );
}
