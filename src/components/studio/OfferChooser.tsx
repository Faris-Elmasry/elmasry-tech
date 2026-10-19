"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { whatsappLink, type Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

export type ChooserSystem = {
  slug: string;
  icon: string;
  name: string;
  hint: string;
  tagline: string;
  highlights: string[];
  photo: string;
  photoAlt: string;
};

type Pay = "rent" | "own" | "unsure";
type Size = "one" | "few" | "many";

/**
 * Three quick choices → a clear recommendation. No prices are invented here:
 * the result explains what you'd get and how paying works, then hands off to
 * a WhatsApp message pre-filled with the visitor's answers.
 */
export function OfferChooser({ locale, systems }: { locale: Locale; systems: ChooserSystem[] }) {
  const isAr = locale === "ar";
  const [slug, setSlug] = useState(systems[0]?.slug ?? "");
  const [pay, setPay] = useState<Pay>("rent");
  const [size, setSize] = useState<Size>("one");
  const uid = useId();
  const sys = systems.find((s) => s.slug === slug) ?? systems[0];

  const payCopy: Record<Pay, { label: string; text: string }> = isAr
    ? {
        rent: { label: "إيجار شهري", text: "مبلغ شهري بسيط. الاستضافة والتحديثات والنسخة الاحتياطية والدعم علينا." },
        own: { label: "شراء مرة واحدة", text: "تدفع مرة واحدة ويتثبت على أجهزتك، ومعاه سنة دعم كاملة." },
        unsure: { label: "لسه مش عارف", text: "عادي جدًا. في العرض التجريبي هنشرح لك الفرق ونرشّح الأنسب بصراحة." },
      }
    : {
        rent: { label: "Rent monthly", text: "A small monthly fee. Hosting, updates, backups and support are on us." },
        own: { label: "Buy once", text: "Pay once, it’s installed on your own computers, with a full year of support." },
        unsure: { label: "Not sure yet", text: "Totally fine. In the demo we’ll explain the difference and honestly recommend one." },
      };
  const sizeCopy: Record<Size, { label: string; text: string }> = isAr
    ? {
        one: { label: "مكان واحد", text: "بيشتغل خلال أيام من الموافقة." },
        few: { label: "2–3 فروع", text: "كل الفروع على شاشة واحدة، وبيشتغل خلال أسبوع تقريبًا." },
        many: { label: "4 فروع أو أكتر", text: "نجهّز الفروع على مراحل خلال أسبوعين تقريبًا، فرع ورا فرع." },
      }
    : {
        one: { label: "One place", text: "Running within days of saying yes." },
        few: { label: "2–3 branches", text: "Every branch on one screen, running in about a week." },
        many: { label: "4+ branches", text: "We set branches up in stages over about two weeks." },
      };

  if (!sys) return null;

  const message = isAr
    ? `أهلًا، عايز عرض تجريبي لـ ${sys.name}. طريقة الدفع: ${payCopy[pay].label}. عدد الأماكن: ${sizeCopy[size].label}.`
    : `Hi, I’d like a free demo of the ${sys.name} system. Payment: ${payCopy[pay].label}. Size: ${sizeCopy[size].label}.`;

  const option = (checked: boolean) =>
    cn(
      "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 text-start transition-[background-color,border-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--accent)]",
      checked ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]" : "border-[var(--border-hover)] hover:border-[var(--text-primary)]"
    );

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <form className="space-y-10 lg:col-span-7" onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend className="title-sm flex items-baseline gap-3 text-xl font-bold sm:text-2xl">
            <span className="font-mono text-sm text-[var(--accent)]">
              01
            </span>
            {isAr ? "شغلك إيه؟" : "What’s your business?"}
          </legend>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {systems.map((s) => (
              <label key={s.slug} className={option(slug === s.slug)}>
                <input type="radio" name={`${uid}-biz`} value={s.slug} checked={slug === s.slug} onChange={() => setSlug(s.slug)} className="sr-only" />
                <DynamicIcon name={s.icon} className={cn("h-5 w-5 shrink-0", slug === s.slug ? "text-[var(--accent)]" : "text-[var(--text-muted)]")} />
                <span className="min-w-0">
                  <span className="block truncate font-medium">{s.name}</span>
                  <span className={cn("block truncate text-sm", slug === s.slug ? "opacity-70" : "text-[var(--text-muted)]")}>{s.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="title-sm flex items-baseline gap-3 text-xl font-bold sm:text-2xl">
            <span className="font-mono text-sm text-[var(--accent)]">
              02
            </span>
            {isAr ? "تحب تدفع إزاي؟" : "How would you like to pay?"}
          </legend>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {(Object.keys(payCopy) as Pay[]).map((k) => (
              <label key={k} className={option(pay === k)}>
                <input type="radio" name={`${uid}-pay`} value={k} checked={pay === k} onChange={() => setPay(k)} className="sr-only" />
                <span className="font-medium">{payCopy[k].label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="title-sm flex items-baseline gap-3 text-xl font-bold sm:text-2xl">
            <span className="font-mono text-sm text-[var(--accent)]">
              03
            </span>
            {isAr ? "عندك كام فرع؟" : "How many places?"}
          </legend>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {(Object.keys(sizeCopy) as Size[]).map((k) => (
              <label key={k} className={option(size === k)}>
                <input type="radio" name={`${uid}-size`} value={k} checked={size === k} onChange={() => setSize(k)} className="sr-only" />
                <span className="font-medium">{sizeCopy[k].label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      {/* Result — updates live, announced politely to screen readers */}
      <div className="lg:col-span-5">
        <div aria-live="polite" className="overflow-hidden rounded-[1.75rem] border border-[var(--border-hover)] bg-[var(--bg-card)] lg:sticky lg:top-24">
          <div key={sys.slug} className="swap-in">
            <div className="relative aspect-[16/9]">
              <Image src={sys.photo} alt={sys.photoAlt} fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover saturate-[0.85]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/20 to-transparent" />
              <span className="absolute start-5 top-5 rounded-full bg-[var(--accent)] px-3 py-1 text-sm font-medium text-[var(--accent-ink)]">{isAr ? "الأنسب ليك" : "Your match"}</span>
            </div>
            <div className="p-6 pt-2 sm:p-8 sm:pt-2">
              <p className="title-sm text-3xl font-bold">{sys.name}</p>
              <p className="mt-2 text-lg leading-snug text-[var(--text-muted)]">{sys.tagline}</p>
              <ul className="mt-5 space-y-2">
                {sys.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <dl className="grid border-t border-[var(--border)] sm:grid-cols-2">
            <div className="p-6 sm:p-7">
              <dt className="label">{isAr ? "الدفع" : "Paying"}</dt>
              <dd key={pay} className="swap-in mt-2 leading-snug">{payCopy[pay].text}</dd>
            </div>
            <div className="border-t border-[var(--border)] p-6 sm:border-s sm:border-t-0 sm:p-7">
              <dt className="label">{isAr ? "التشغيل" : "Getting started"}</dt>
              <dd key={size} className="swap-in mt-2 leading-snug">{sizeCopy[size].text}</dd>
            </div>
          </dl>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-[var(--border)] p-6 sm:p-7">
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-[var(--accent)] px-6 font-medium text-[var(--accent-ink)] transition-colors duration-300 hover:bg-[var(--text-primary)]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {isAr ? "احجز العرض التجريبي" : "Book the free demo"}
            </a>
            <Link href={`/${locale}/systems/${sys.slug}`} className="group inline-flex items-center gap-2 font-medium">
              <span className="link-draw">{isAr ? "تفاصيل النظام" : "System details"}</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[var(--accent)] rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
