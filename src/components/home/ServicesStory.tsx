import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Rise, SplitWords } from "@/components/motion/Kinetic";
import { Heading } from "@/components/home/Heading";
import { services, tr } from "@/lib/content";
import type { ShapeName } from "@/components/three/shapes";
import type { Locale } from "@/lib/site";

// Which particle sculpture each service forms as it scrolls into the middle of the screen.
export const serviceShapes: Record<string, ShapeName> = {
  "website-development": "globe",
  "mobile-app-development": "phone",
  "custom-software": "dashboard",
  "ai-chatbots": "brain",
  "business-automation": "gears",
  "ecommerce-development": "bag",
};

/**
 * Scroll story: one tall chapter per service. While a chapter is centred, the
 * background particles reassemble into that service's object on the other side.
 */
export function ServicesStory({
  locale,
  index,
  label,
  title,
  sub,
  cta,
}: {
  locale: Locale;
  index: string;
  label: string;
  title: string;
  sub: string;
  cta: string;
}) {
  return (
    <section id="services" className="relative scroll-mt-20">
      <div data-shape="scatter" data-shape-dim="0.35" className="mx-auto max-w-[1400px] px-5 pb-10 pt-24 sm:px-8 sm:pt-36">
        <Heading index={index} label={label} title={title} sub={sub} />
      </div>

      {services.map((s, i) => {
        const textStart = i % 2 === 0;
        return (
          <article
            key={s.slug}
            data-shape={serviceShapes[s.slug]}
            data-shape-x={textStart ? "0.26" : "-0.26"}
            data-shape-scale="0.95"
            className="mx-auto flex min-h-[92vh] max-w-[1400px] items-center px-5 py-20 sm:px-8"
          >
            <div className={`grid w-full gap-10 md:grid-cols-2 ${textStart ? "" : "md:[&>*]:col-start-2"}`}>
              <div className="max-w-xl">
                <Rise>
                  <p className="label flex items-center gap-3">
                    <span dir="ltr" className="font-mono text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                    </span>
                    {tr(s.label, locale)}
                  </p>
                </Rise>
                <h3 className="mt-6 font-display text-[clamp(2rem,4.2vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.03em] text-balance">
                  <SplitWords text={tr(s.title, locale)} />
                </h3>
                <Rise delay={0.15}>
                  <p className="mt-6 text-lg leading-relaxed text-[var(--text-muted)] text-pretty">{tr(s.body, locale)}</p>
                </Rise>
                <Rise delay={0.25}>
                  <ul className="mt-8 grid gap-x-6 border-t border-[var(--border)] sm:grid-cols-2">
                    {s.features[locale].map((f) => (
                      <li key={f} className="flex items-center gap-3 border-b border-[var(--border)] py-3 text-sm">
                        <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--accent)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Rise>
                <Rise delay={0.35}>
                  <Link
                    href={`/${locale}/services/${s.slug}`}
                    className="group mt-8 inline-flex items-center gap-3 text-sm font-medium"
                    data-cursor={locale === "ar" ? "عرض" : "open"}
                  >
                    <span className="relative">
                      {cta}
                      <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hover)] transition-all duration-500 group-hover:rotate-45 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]">
                      <ArrowUpRight className="h-4 w-4 rtl-flip" />
                    </span>
                  </Link>
                </Rise>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
