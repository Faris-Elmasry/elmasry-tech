import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/site";
import { closing, scenes } from "./copy";

/** Short closing call to action after the pinned device story. */
export function ClosingCta({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <section className="relative overflow-hidden border-t border-[var(--border)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-40%] h-[90%]"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(255,91,31,.16), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1100px] px-5 py-28 text-center sm:px-8 sm:py-40">
        <p className="label inline-flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          {closing.label[locale]}
        </p>
        <h2
          className={`mx-auto mt-6 max-w-4xl font-display font-bold text-balance ${
            ar ? "text-[clamp(2.2rem,5.4vw,4.4rem)] leading-[1.25]" : "text-[clamp(2.3rem,5.6vw,4.9rem)] leading-[1.02] tracking-[-0.04em]"
          }`}
        >
          {closing.title[locale]}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">{closing.sub[locale]}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={`/${locale}/contact`} size="lg" rightIcon={<ArrowUpRight className="rtl-flip h-4 w-4" />}>
            {closing.primary[locale]}
          </Button>
          <Button href={`/${locale}/portfolio`} size="lg" variant="outline">
            {closing.secondary[locale]}
          </Button>
        </div>
        <ul className="mx-auto mt-16 flex max-w-2xl flex-wrap justify-center gap-2" aria-label={ar ? "خدماتنا" : "What we build"}>
          {scenes.map((s, i) => (
            <li key={s.key} className="flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)]">
              <span dir="ltr" className="font-mono text-xs text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.label[locale]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
