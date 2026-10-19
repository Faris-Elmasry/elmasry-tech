import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { closing, type DemoLocale } from "./copy";

export function ClosingCta({ locale }: { locale: DemoLocale }) {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-28 sm:px-8 sm:pb-36">
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center sm:px-12 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,#000_10%,transparent_70%)]" />
          <div className="absolute left-1/2 top-0 h-[28rem] w-[46rem] max-w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,91,31,0.22),transparent)]" />
        </div>

        <p dir="ltr" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-1.5 font-mono text-[12px] text-[var(--text-muted)]">
          <span className="text-[var(--accent)]">$</span> git push origin launch
          <span className="text-[var(--success)]">✓ live</span>
        </p>
        <h2 className="mx-auto mt-7 max-w-4xl font-display text-[clamp(2.2rem,5.6vw,4.8rem)] font-bold leading-[1.02] tracking-[-0.035em] text-balance">
          {closing.title[locale]}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[var(--text-muted)] text-pretty">{closing.sub[locale]}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={`/${locale}/contact`} size="lg" rightIcon={<ArrowUpRight className="rtl-flip h-4 w-4" />}>
            {closing.cta[locale]}
          </Button>
          <Button href={`/${locale}/portfolio`} variant="outline" size="lg">
            {closing.work[locale]}
          </Button>
        </div>
      </div>
    </section>
  );
}
