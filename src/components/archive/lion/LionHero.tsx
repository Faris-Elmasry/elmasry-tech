import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, Cloud, Code2, Cpu, MousePointer2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LionCanvas } from "@/components/archive/lion/LionCanvas";
import { HeroSnow } from "@/components/archive/lion/HeroSnow";
import { heroCopy } from "@/lib/landing";
import type { Locale } from "@/lib/site";

const icons = [Code2, Smartphone, Cpu, Cloud];

/**
 * Hero: a two-column CSS grid (copy | lion) inside a 1440px container, placed
 * below the fixed 4rem navbar. Below 1024px it stacks: copy first, lion after.
 * The dark lion is a normal <Image> (fast LCP, works without JS); the
 * fire-reveal canvas fades in on top of it once loaded.
 */
export function LionHero({ locale }: { locale: Locale }) {
  const rtl = locale === "ar";
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
  const lead = heroCopy.titleLead[locale];

  return (
    <section id="top" className="relative isolate overflow-hidden pt-16">
      <HeroSnow />

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 pb-12 pt-8 sm:px-8 md:gap-12 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:py-8 xl:px-12">
        {/* Copy */}
        <div className="relative z-[2] lg:py-4">
          <p
            className="in flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] rtl:font-sans rtl:text-sm rtl:tracking-normal"
            style={d(0)}
          >
            {heroCopy.steps[locale].map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                {i > 0 && <ArrowRight className="h-3.5 w-3.5 rtl-flip" aria-hidden="true" />}
                {s}
              </span>
            ))}
          </p>

          {/* Two deliberate lines on wide screens; natural wrapping below 1200px. */}
          <h1 className="mt-5 font-display text-[clamp(2rem,6.4vw,3.6rem)] font-bold leading-[1.08] tracking-[-0.035em] lg:max-[1199px]:text-[clamp(2.4rem,3.9vw,3.4rem)] min-[1200px]:text-[clamp(3rem,3.3vw+0.75rem,4.25rem)]">
            <span className="block min-[1200px]:whitespace-nowrap">{heroCopy.titleA[locale]}</span>
            <span className="block min-[1200px]:whitespace-nowrap">
              {lead && `${lead} `}
              <span className="bg-gradient-to-r from-[#ff8a3d] to-[#ff5b1f] bg-clip-text text-transparent rtl:bg-gradient-to-l">{heroCopy.titleB[locale]}</span>
            </span>
          </h1>

          <p className="in mt-6 max-w-[34rem] text-base leading-relaxed text-[#d6d1c7] text-pretty sm:text-lg" style={d(120)}>
            {heroCopy.sub[locale]}
          </p>

          <div className="in mt-8 flex flex-wrap items-center gap-3 sm:gap-4" style={d(220)}>
            <Button
              href={`/${locale}/contact`}
              size="lg"
              className="bg-gradient-to-r from-[#ff8a3d] to-[#ff5b1f] shadow-[0_18px_40px_-12px_rgba(255,91,31,0.7)] max-[389px]:w-full"
              rightIcon={<ArrowRight className="h-5 w-5 rtl-flip" />}
            >
              {heroCopy.cta[locale]}
            </Button>
            <Button href="#systems" variant="outline" size="lg" className="max-[389px]:w-full">
              {heroCopy.secondary[locale]}
            </Button>
          </div>

          <ul className="in mt-10 grid max-w-[40rem] grid-cols-2 gap-x-6 gap-y-6 border-t border-[var(--border)] pt-8 sm:grid-cols-4 sm:gap-x-0 lg:mt-12" style={d(320)}>
            {heroCopy.features[locale].map((f, i) => {
              const Icon = icons[i];
              return (
                <li
                  key={f}
                  className="flex flex-col gap-2.5 text-sm leading-snug text-[#d6d1c7] sm:border-s sm:border-[var(--border-hover)] sm:px-4 sm:first:border-s-0 sm:first:ps-0 xl:px-5"
                >
                  <Icon className="h-6 w-6 text-[var(--accent)]" aria-hidden="true" />
                  {f}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Lion: dominant, never under the copy; edges blend into the background. */}
        <figure
          aria-hidden="true"
          data-sparks
          className="lion-mask relative z-0 mx-auto aspect-[4/5] max-h-[78svh] w-full max-w-[560px] lg:aspect-auto lg:h-[min(calc(100svh-7rem),880px)] lg:max-h-none lg:min-h-[480px] lg:max-w-none"
        >
          <Image
            src="/images/hero/lion-dark.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={80}
            className={`object-cover object-[92%_50%] ${rtl ? "-scale-x-100" : ""}`}
          />
          <LionCanvas rtl={rtl} />
          <figcaption className="label absolute inset-x-0 bottom-3 hidden items-center justify-center gap-2 text-[#d6d1c7] [@media(pointer:fine)]:flex">
            <MousePointer2 className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
            {heroCopy.hint[locale]}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
