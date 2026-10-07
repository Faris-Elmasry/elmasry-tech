import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Experience } from "@/components/experience/Experience";
import type { Locale } from "@/lib/site";

export default async function SiteLayout({ children, params }: LayoutProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  // Layouts render in parallel with pages, so each one sets the locale for
  // static rendering (otherwise next-intl falls back to request headers).
  setRequestLocale(locale);
  return (
    <Experience>
      <Navbar />
      {/* Content sits above the fixed WebGL canvas (z-0). */}
      <main id="main-content" className="relative z-10">
        {children}
      </main>
      <Footer locale={locale} />
    </Experience>
  );
}
