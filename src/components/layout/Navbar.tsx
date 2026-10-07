"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { Logo } from "@/components/layout/Logo";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/store/ui";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { key: "services", href: "/services" },
  { key: "work", href: "/portfolio" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

/** Live Cairo clock — a small "real studio" detail. */
function CairoClock({ label }: { label: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Cairo" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="label hidden items-center gap-2 lg:inline-flex">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
      </span>
      {label} <span dir="ltr" className="tabular-nums text-[var(--text-primary)]">{time || "--:--"}</span>
    </span>
  );
}

export function Navbar() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "en" ? "ar" : "en";
  const { mobileMenuOpen: open, setMobileMenuOpen: setOpen } = useUIStore();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  // Hide on scroll down, reveal on scroll up. Only touch React state when a
  // value actually flips, so scrolling doesn't re-render the header each frame.
  const flags = useRef({ solid: false, hidden: false });
  useLenis(({ scroll, direction }) => {
    const solidNow = scroll > 40;
    const hiddenNow = direction === 1 && scroll > 400 ? true : direction === -1 ? false : flags.current.hidden;
    if (solidNow !== flags.current.solid) setSolid((flags.current.solid = solidNow));
    if (hiddenNow !== flags.current.hidden) setHidden((flags.current.hidden = hiddenNow));
  });

  useEffect(() => setOpen(false), [pathname, setOpen]);
  const lenis = useLenis();
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const switchPath = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${other}`);
  const isActive = (href: string) => pathname.startsWith(`/${locale}${href}`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          solid || open ? "border-b border-[var(--border)] bg-[var(--bg-primary)]/80 backdrop-blur-xl" : "border-b border-transparent"
        )}
      >
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
          <Logo href={`/${locale}`} />

          <CairoClock label={locale === "ar" ? "القاهرة" : "Cairo"} />

          <div className="flex items-center gap-1">
            <ul className="hidden items-center md:flex">
              {links.map((l) => (
                <li key={l.key}>
                  <Link
                    href={`/${locale}${l.href}`}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={cn(
                      "group relative px-3 py-2 text-sm transition-colors",
                      isActive(l.href) ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    {t(l.key)}
                    <span
                      className={cn(
                        "absolute inset-x-3 bottom-1 h-px origin-left bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rtl:origin-right",
                        isActive(l.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            {/* Switching locale crosses root layouts (full document load), so a plain
                anchor is faster than a client navigation that would fall back anyway. */}
            <a href={switchPath} hrefLang={other} lang={other} data-prerender className="px-3 py-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]">
              {t("language")}
            </a>
            <Button href={`/${locale}/contact`} size="sm" className="ms-2 hidden md:inline-flex">
              {t("cta")}
            </Button>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("close") : t("menu")}
              className="relative ms-1 inline-flex h-10 w-10 items-center justify-center md:hidden"
            >
              <span className={cn("absolute h-px w-6 bg-[var(--text-primary)] transition-transform duration-500", open ? "rotate-45" : "-translate-y-1")} />
              <span className={cn("absolute h-px w-6 bg-[var(--text-primary)] transition-transform duration-500", open ? "-rotate-45" : "translate-y-1")} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu: pure CSS clip-path reveal (no animation library) */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-between bg-[var(--bg-primary)] px-5 pb-10 pt-24 transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden",
          open ? "[clip-path:inset(0_0_0%_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        )}
      >
        <ul>
          {[{ key: "home", href: "" } as const, ...links].map((l, i) => (
            <li key={l.key} className="overflow-hidden border-b border-[var(--border)]">
              <Link
                href={`/${locale}${l.href}`}
                style={{ transitionDelay: open ? `${250 + i * 60}ms` : "0ms" }}
                className={cn(
                  "flex items-baseline justify-between py-4 font-display text-4xl font-bold transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open ? "translate-y-0" : "translate-y-full"
                )}
              >
                {t(l.key)}
                <span className="label">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Button href={whatsappLink(tc("whatsapp_message"))} size="lg" fullWidth leftIcon={<WhatsAppIcon className="h-5 w-5" />}>
          WhatsApp
        </Button>
      </div>

      <a
        href={whatsappLink(tc("whatsapp_message"))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        data-cursor="chat"
        className="fixed bottom-5 end-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.55)] transition-transform hover:scale-110 active:scale-95"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
