"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/store/ui";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "portfolio", href: "/portfolio" },
  { key: "contact", href: "/contact" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as string) || "en";
  const otherLocale = locale === "en" ? "ar" : "en";

  const { theme, toggleTheme, mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Build locale switch path
  const localeSwitchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  // Check if a nav link is active
  const isActive = (href: string) => {
    const fullHref = href ? `/${locale}${href}` : `/${locale}`;
    if (href === "") return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(fullHref);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="font-[family-name:var(--font-poppins)] text-xl font-bold"
          >
            <span className="text-[var(--text-primary)]">ELMASRY</span>
            <span className="text-blue-500">.TECH</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const href = `/${locale}${link.href}`;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.key}
                  href={href}
                  className={cn(
                    "text-sm transition-colors relative group",
                    active
                      ? "text-blue-400 font-medium"
                      : "text-[var(--text-muted)] hover:text-blue-400"
                  )}
                >
                  {t(link.key)}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Link
              href={localeSwitchPath}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:border-blue-500 hover:text-blue-400 transition-all active:scale-95"
            >
              {locale === "en" ? "عربي" : "EN"}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {/* Hire Me — desktop */}
            <Button
              variant="primary"
              size="sm"
              href={`/${locale}/contact`}
              className="hidden md:inline-flex"
            >
              {t("hire")}
            </Button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-[var(--bg-secondary)] border-b border-[var(--border)]"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => {
                  const href = `/${locale}${link.href}`;
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.key}
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block text-base transition-colors py-2",
                        active
                          ? "text-blue-400 font-medium"
                          : "text-[var(--text-primary)] hover:text-blue-400"
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-[var(--border)]">
                  <Button variant="primary" fullWidth href={`/${locale}/contact`}>
                    {t("hire")}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "+201000000000"}?text=${encodeURIComponent("مرحبا فارس، أنا مهتم بخدماتك")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg transition-colors group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-30" />
      </a>
    </>
  );
}
