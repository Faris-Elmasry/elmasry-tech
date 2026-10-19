import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Magnetic, Rise } from "@/components/motion/Kinetic";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { whatsappLink, type Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────────────
   STUDIO KIT — the shared vocabulary of every inner page.
   Editorial "title block" heroes, numbered chapters that sit on a hairline
   with a margin note, figure captions, and one closing sign-off.
   Server components only (no client JS); motion comes from <Rise>.
   ──────────────────────────────────────────────────────────────────────── */

export const shell = "mx-auto w-full max-w-[1400px] px-5 sm:px-8";

/** Wraps a string in Unicode LTR isolates so "04 / 06" never flips inside RTL text. */
export const ltr = (s: string) => `\u2066${s}\u2069`;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Visual breadcrumb (structured data is emitted separately as JSON-LD). */
export function Crumbs({ locale, items }: { locale: Locale; items: { name: string; href?: string }[] }) {
  const home = locale === "ar" ? "الرئيسية" : "Home";
  const all = [{ name: home, href: `/${locale}` }, ...items];
  return (
    <nav aria-label={locale === "ar" ? "مسار الصفحة" : "Breadcrumb"} className="min-w-0">
      <ol className="label flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => (
          <li key={i} className="flex min-w-0 items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="inline-block h-3 w-px rotate-[20deg] bg-[var(--border-hover)]" />}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className="transition-colors hover:text-[var(--text-primary)]">
                {c.name}
              </Link>
            ) : (
              <span aria-current={i === all.length - 1 ? "page" : undefined} className="truncate text-[var(--text-primary)]">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Page "title block": a hairline row (breadcrumb · sheet number), then a big
 * editorial H1 with an optional visual on the side. The H1 is never animated
 * (it is the LCP element); everything around it eases in with CSS.
 */
export function StudioHero({
  locale,
  crumbs,
  sheet,
  kicker,
  keyword,
  title,
  sub,
  actions,
  aside,
  children,
  wide = false,
}: {
  locale: Locale;
  crumbs: { name: string; href?: string }[];
  /** Small mono tag at the end of the top row, e.g. "02 / 06". */
  sheet?: string;
  kicker: string;
  /** Primary-keyword line, rendered small inside the <h1> above the big creative line (replaces the kicker visually). */
  keyword?: string;
  title: ReactNode;
  sub?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  /** Title spans the full width (no aside). */
  wide?: boolean;
}) {
  return (
    <header className="relative pt-24 sm:pt-28">
      <div className={shell}>
        <div className="in flex items-center justify-between gap-6 border-b border-[var(--border)] pb-4">
          <Crumbs locale={locale} items={crumbs} />
          {sheet && (
            <span className="label hidden shrink-0 tabular-nums sm:inline">
              {sheet}
            </span>
          )}
        </div>

        <div className={cn("grid gap-12 pb-16 pt-12 sm:pt-16 lg:gap-16 lg:pb-24", aside && !wide && "lg:grid-cols-12 lg:items-center")}>
          <div className={cn(aside && !wide ? "lg:col-span-7" : "max-w-5xl")}>
            {keyword ? (
              // One <h1>: the keyword line (what the page is, for people and search engines) + the creative line.
              <h1 className="text-balance">
                <span className="flex items-center gap-3 font-sans text-[0.95rem] font-semibold leading-snug text-[var(--text-muted)] sm:text-lg">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  {keyword}
                </span>{" "}
                <span className="mt-5 block font-display text-[clamp(2.5rem,6.2vw,5.6rem)] font-bold leading-[1] tracking-[-0.04em] text-[var(--text-primary)]">{title}</span>
              </h1>
            ) : (
              <>
                <p className="label in flex items-center gap-3">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {kicker}
                </p>
                <h1 className="mt-6 font-display text-[clamp(2.5rem,6.2vw,5.6rem)] font-bold leading-[1] tracking-[-0.04em] text-balance">{title}</h1>
              </>
            )}
            {sub && (
              <p className="in mt-7 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] text-pretty sm:text-xl sm:leading-relaxed" style={d(120)}>
                {sub}
              </p>
            )}
            {actions && (
              <div className="in mt-10 flex flex-wrap items-center gap-3" style={d(200)}>
                {actions}
              </div>
            )}
          </div>
          {aside && (
            <div className={cn("in min-w-0", !wide && "lg:col-span-5")} style={d(260)}>
              {aside}
            </div>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}

/**
 * "The short version": four plain answers every visitor is looking for —
 * what is it, what do I get, how much effort for me, what happens next.
 */
export function ShortVersion({ locale, items }: { locale: Locale; items: [string, string, string, string] }) {
  const isAr = locale === "ar";
  const q = isAr ? ["ده إيه؟", "هتاخد إيه؟", "مجهودك قد إيه؟", "الخطوة الجاية"] : ["What is it?", "What do you get?", "Your effort", "What’s next"];
  return (
    <section aria-label={isAr ? "باختصار" : "The short version"} className="in mb-6" style={d(320)}>
      <p className="label mb-4">{isAr ? "باختصار" : "The short version"}</p>
      <dl className="grid overflow-hidden rounded-[1.25rem] border border-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((a, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col gap-3 bg-[var(--bg-card)]/60 p-6 sm:p-7",
              i > 0 && "border-t border-[var(--border)] sm:border-t-0",
              i % 2 === 1 && "sm:border-s",
              i >= 2 && "sm:border-t lg:border-t-0",
              i === 2 && "lg:border-s"
            )}
          >
            <dt className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <span className="font-mono text-xs text-[var(--accent)]">
                0{i + 1}
              </span>
              {q[i]}
            </dt>
            <dd className="text-lg leading-snug text-[var(--text-primary)]">{a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/**
 * A numbered chapter that sits on a full-width hairline. The label lives in a
 * narrow "margin" column, the heading in the wide one — like an annotated page.
 */
export function Chapter({
  id,
  index,
  label,
  title,
  sub,
  children,
  className,
  tone = "plain",
  aside,
}: {
  id?: string;
  index: string;
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  className?: string;
  tone?: "plain" | "card";
  /** Optional element on the end side of the heading row (e.g. a link). */
  aside?: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-20 border-t border-[var(--border)]", tone === "card" && "bg-[var(--bg-secondary)]", className)}>
      <div className={cn(shell, "py-20 sm:py-28")}>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <Rise className="lg:col-span-3">
            <p className="label flex items-center gap-3 lg:pt-3">
              <span className="text-[var(--accent)]">
                {index}
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-[var(--border-hover)]" />
              {label}
            </p>
          </Rise>
          <div className="lg:col-span-9">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <Rise as="div" className="max-w-4xl">
                <h2 className="font-display text-[clamp(2.1rem,4.4vw,4rem)] font-bold leading-[1.04] tracking-[-0.035em] text-balance">{title}</h2>
                {sub && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] text-pretty">{sub}</p>}
              </Rise>
              {aside && <Rise className="shrink-0">{aside}</Rise>}
            </div>
          </div>
        </div>
        {children && <div className="mt-14 sm:mt-16">{children}</div>}
      </div>
    </section>
  );
}

/** Photo with an editorial caption ("Fig. 02 — …"). Graded slightly into the dark theme. */
export function Figure({
  src,
  alt,
  caption,
  fig,
  className,
  ratio = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  preload = false,
  children,
}: {
  src: string;
  alt: string;
  caption?: string;
  fig?: string;
  className?: string;
  ratio?: string;
  sizes?: string;
  preload?: boolean;
  /** Overlay content (e.g. a mini screen) placed over the photo's corner. */
  children?: ReactNode;
}) {
  return (
    <figure className={cn("relative", className)}>
      <div className={cn("relative overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-card)]", ratio)}>
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover saturate-[0.85]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/55 via-transparent to-transparent" />
      </div>
      {children}
      {caption && (
        <figcaption className="mt-3 flex items-baseline gap-3 text-sm text-[var(--text-muted)]">
          {fig && (
            <span dir="ltr" className="shrink-0 font-mono text-xs text-[var(--accent)]">
              Fig. {fig}
            </span>
          )}
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}

/** Check-mark list in two columns. */
export function Ticks({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("grid gap-x-10 sm:grid-cols-2", className)}>
      {items.map((it) => (
        <li key={it} className="flex items-start gap-4 border-t border-[var(--border)] py-4 text-lg leading-snug">
          <span aria-hidden="true" className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

/** FAQ accordion (native <details>: accessible, works without JS, answers stay crawlable). */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-b border-[var(--border)]">
      {items.map((f, i) => (
        <details key={i} className="group border-t border-[var(--border)]" {...(i === 0 ? { open: true } : {})}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 title-sm text-xl font-semibold transition-colors duration-500 hover:text-[var(--accent)] sm:text-2xl [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-hover)] transition-[transform,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45 group-open:border-[var(--accent)] group-open:bg-[var(--accent)] group-open:text-[var(--accent-ink)]"
            >
              <Plus className="h-4 w-4" />
            </span>
          </summary>
          <p className="max-w-3xl pb-8 text-lg sm:pe-14 leading-relaxed text-[var(--text-muted)]">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Arrow link with a drawn underline. */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const external = /^https?:/.test(href);
  const cls = cn("group inline-flex items-center gap-2 font-medium text-[var(--text-primary)]", className);
  const inner = (
    <>
      <span className="link-draw pb-0.5">{children}</span>
      <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Primary pair of actions used across the site: free consultation + WhatsApp. */
export function ConsultActions({ locale, message, size = "lg", consultLabel }: { locale: Locale; message?: string; size?: "md" | "lg"; consultLabel?: string }) {
  const isAr = locale === "ar";
  return (
    <>
      <Magnetic strength={0.3}>
        <Button href={`/${locale}/contact`} size={size} rightIcon={<ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" />}>
          {consultLabel ?? (isAr ? "استشارة مجانية" : "Free consultation")}
        </Button>
      </Magnetic>
      <Button
        href={whatsappLink(message ?? (isAr ? "أهلًا Elmasry Tech، عايز أتكلم عن شغلي." : "Hi Elmasry Tech, I’d like to talk about my business."))}
        variant="outline"
        size={size}
        leftIcon={<WhatsAppIcon className="h-5 w-5 text-[#25D366]" />}
      >
        WhatsApp
      </Button>
    </>
  );
}

/**
 * Closing sign-off: one big sentence, one primary action, one reassurance
 * line. A real photo sits in a framed window beside it.
 */
export function SignOff({
  locale,
  title,
  sub,
  photo = "/images/site/consultation-v2.webp",
  photoAlt,
  message,
}: {
  locale: Locale;
  title: string;
  sub?: string;
  photo?: string;
  photoAlt?: string;
  message?: string;
}) {
  const isAr = locale === "ar";
  return (
    <section className="relative border-t border-[var(--border)]">
      <div className={cn(shell, "grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-12")}>
        <div className="lg:col-span-7">
          <Rise>
            <p className="label flex items-center gap-3">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {isAr ? "الخطوة الجاية" : "Next step"}
            </p>
          </Rise>
          <Rise delay={0.05}>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,5.6vw,5rem)] font-bold leading-[1] tracking-[-0.04em] text-balance">{title}</h2>
          </Rise>
          <Rise delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">
              {sub ??
                (isAr
                  ? "مكالمة مجانية 30 دقيقة. بنسمع، ونقول لك بصراحة إيه اللي يفيدك — حتى لو الإجابة إنك مش محتاجنا."
                  : "A free 30-minute call. We listen, then tell you honestly what would help — even if the answer is that you don’t need us.")}
            </p>
          </Rise>
          <Rise delay={0.15} className="mt-10 flex flex-wrap items-center gap-3">
            <ConsultActions locale={locale} message={message} />
          </Rise>
        </div>
        <Rise delay={0.1} className="lg:col-span-5">
          <Figure
            src={photo}
            alt={photoAlt ?? (isAr ? "اتنين بيراجعوا شغلهم على لابتوب وتابلت" : "Two people reviewing their work on a laptop and a tablet")}
            ratio="aspect-[5/4]"
            sizes="(min-width: 1024px) 34vw, 100vw"
          />
        </Rise>
      </div>
    </section>
  );
}
