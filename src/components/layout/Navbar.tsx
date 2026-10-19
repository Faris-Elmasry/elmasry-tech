"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { useUIStore } from "@/store/ui";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

// Site sections. `match` is the first path segment after the locale.
const links = [
  { key: "services", href: "/services", match: "services" },
  { key: "systems", href: "/systems", match: "systems" },
  { key: "work", href: "/portfolio", match: "portfolio" },
  { key: "about", href: "/about", match: "about" },
  { key: "contact", href: "/contact", match: "contact" },
] as const;

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/** Live Cairo clock — a small "real studio" detail. */
export function CairoClock({ label, className }: { label: string; className?: string }) {
  const [time, setTime] = useState("");
  const el = useRef<HTMLSpanElement>(null);
  // Ticks only while the clock is actually on screen.
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Cairo" });
    const tick = () => setTime(fmt.format(new Date()));
    let id = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(id);
      id = 0;
      if (e.isIntersecting) {
        tick();
        id = window.setInterval(tick, 15_000);
      }
    });
    io.observe(node);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, []);
  return (
    <span ref={el} className={cn("label inline-flex items-center gap-2", className)}>
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-70 motion-reduce:hidden" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
      </span>
      {label}{" "}
      <span dir="ltr" className="tabular-nums text-[var(--text-primary)]">
        {time || "--:--"}
      </span>
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
  const firstLink = useRef<HTMLAnchorElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

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
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  // Menu keyboard care: focus the first link on open, Escape closes and returns focus.
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const section = pathname.split("/")[2] ?? "";
  const switchPath = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${other}`);
  const wa = whatsappLink(tc("whatsapp_message"));

  return (
    <>
      <header
        className={cn(
          `fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ${EASE}`,
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          open ? "border-b border-transparent bg-transparent" : solid ? "border-b border-[var(--border)] bg-[var(--bg-primary)]/95" : "border-b border-transparent"
        )}
      >
        <nav aria-label={locale === "ar" ? "القائمة الرئيسية" : "Main"} className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8">
          <Logo href={`/${locale}`} />

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const active = section === l.match;
              return (
                <li key={l.key}>
                  <Link
                    href={`/${locale}${l.href}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.95rem] transition-colors duration-300",
                      active ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(`h-1.5 w-1.5 rounded-full bg-[var(--accent)] transition-[transform,opacity] duration-500 ${EASE}`, active ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-60")}
                    />
                    {t(l.key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Switching locale crosses root layouts (full document load), so a plain
                anchor is faster than a client navigation that would fall back anyway. */}
            <a
              href={switchPath}
              hrefLang={other}
              lang={other}
              data-prerender
              className="inline-flex h-10 items-center rounded-full px-3 text-[0.95rem] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              {t("language")}
            </a>
            <Link
              href={`/${locale}/contact`}
              className={cn(
                `group hidden h-10 items-center gap-2 rounded-full bg-[var(--accent)] ps-4 pe-3 text-[0.95rem] font-medium text-[var(--accent-ink)] transition-colors duration-300 hover:bg-[var(--text-primary)] sm:inline-flex`,
                open && "sm:hidden"
              )}
            >
              {t("consult")}
              <ArrowUpRight aria-hidden="true" className={`h-4 w-4 transition-transform duration-500 ${EASE} group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5`} />
            </Link>
            <button
              ref={toggle}
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("close") : t("menu")}
              className="relative ms-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hover)] lg:hidden"
            >
              <span aria-hidden="true" className={cn(`absolute h-px w-4 bg-[var(--text-primary)] transition-transform duration-500 ${EASE}`, open ? "rotate-45" : "-translate-y-[3px]")} />
              <span aria-hidden="true" className={cn(`absolute h-px w-4 bg-[var(--text-primary)] transition-transform duration-500 ${EASE}`, open ? "-rotate-45" : "translate-y-[3px]")} />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen menu (small screens): clip-path curtain + staggered rows, pure CSS. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t("menu")}
        aria-hidden={!open}
        inert={!open}
        className={cn(
          `fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-[var(--bg-primary)] px-5 pb-8 pt-20 transition-[clip-path] duration-700 ${EASE} sm:px-8 lg:hidden`,
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <p className="label">{t("menu_title")}</p>
          <CairoClock label={t("cairo")} />
        </div>

        <ul className="mt-2">
          {links.map((l, i) => {
            const active = section === l.match;
            return (
              <li key={l.key} className="overflow-hidden border-b border-[var(--border)]">
                <Link
                  ref={i === 0 ? firstLink : undefined}
                  href={`/${locale}${l.href}`}
                  aria-current={active ? "page" : undefined}
                  style={{ transitionDelay: open ? `${180 + i * 55}ms` : "0ms" }}
                  className={cn(`flex items-center gap-4 py-4 transition-[transform,opacity] duration-700 ${EASE}`, open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0")}
                >
                  <span className="w-7 shrink-0 font-mono text-xs text-[var(--text-subtle)]">
                    0{i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cn("block font-display text-[2.4rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-5xl", active && "text-[var(--accent)]")}>{t(l.key)}</span>
                    <span className="block text-sm text-[var(--text-muted)]">{t(`${l.key}_hint`)}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="h-6 w-6 shrink-0 text-[var(--text-muted)] rtl:-scale-x-100" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          style={{ transitionDelay: open ? "480ms" : "0ms" }}
          className={cn(`mt-auto space-y-3 pt-10 transition-[transform,opacity] duration-700 ${EASE}`, open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}
        >
          <p className="title-sm text-lg font-bold">{t("menu_talk")}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href={`/${locale}/contact`} className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[var(--accent)] font-medium text-[var(--accent-ink)]">
              {t("consult")}
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 rtl:-scale-x-100" />
            </Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[var(--border-hover)] font-medium">
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
              WhatsApp
            </a>
          </div>
          <p className="flex flex-wrap justify-between gap-x-6 gap-y-1 pt-3 text-sm text-[var(--text-muted)]">
            <span>{t("menu_hours")}</span>
            <a href={`mailto:${site.email}`} className="hover:text-[var(--text-primary)]">
              {site.email}
            </a>
          </p>
        </div>
      </div>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        data-cursor="chat"
        className={cn(
          "fixed bottom-5 end-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.55)] transition-[transform,opacity] duration-300 hover:scale-110 active:scale-95",
          open && "pointer-events-none scale-75 opacity-0"
        )}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
