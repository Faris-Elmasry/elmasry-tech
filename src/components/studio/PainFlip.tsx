"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { useScrollProgress } from "@/components/studio/useScroll";
import type { Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

type T = Record<Locale, string>;

const NOTES: { pain: T; fix: T }[] = [
  {
    pain: { en: "The notebook got lost — and the accounts with it.", ar: "الدفتر ضاع… والحسابات ضاعت معاه." },
    fix: { en: "Every invoice saved and found in a second.", ar: "كل فاتورة محفوظة، وتلاقيها في ثانية." },
  },
  {
    pain: { en: "Nobody knows what’s really in the stockroom.", ar: "محدش عارف المخزن فيه إيه بالظبط." },
    fix: { en: "Live stock, with an alert before an item runs out.", ar: "المخزون لحظة بلحظة، وتنبيه قبل ما الصنف يخلص." },
  },
  {
    pain: { en: "The cash never matches at closing time.", ar: "الفلوس آخر اليوم مش بتظبط." },
    fix: { en: "Shift closing to the last pound, per cashier.", ar: "تقفيل وردية بالمليم لكل كاشير." },
  },
  {
    pain: { en: "Things only run when you’re standing there.", ar: "الشغل مش بيمشي غير وأنت واقف بنفسك." },
    fix: { en: "Follow every branch from your phone, anywhere.", ar: "تابع كل فروعك من موبايلك، من أي مكان." },
  },
];

/** Slight, fixed tilts so the notes look stuck on by hand. */
const TILT = ["-rotate-2", "rotate-[1.5deg]", "rotate-1", "-rotate-[1.5deg]"];
/** Scroll progress at which each note flips, and at which the headline resolves. */
const FLIP_AT = [0.12, 0.3, 0.48, 0.66];
const RESOLVE_AT = 0.84;

/**
 * "Sound familiar?" — a pinned stage with four sticky notes, each an everyday
 * pain. As you scroll, the notes flip in 3D one after another to reveal the
 * fix on their back, and the headline resolves from the problem to the
 * answer. Driven by the shared scroll loop: classes toggle only when a
 * threshold is crossed (the flip itself is a compositor-friendly CSS
 * transform transition), and the progress line is a scaleX transform.
 * Fully reversible; reduced motion flips instantly.
 */
export function PainFlip({ locale, index }: { locale: Locale; index: string }) {
  const isAr = locale === "ar";
  const section = useRef<HTMLElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const state = useRef({ flipped: -1, resolved: false });

  useScrollProgress(
    section,
    (p) => {
      const el = section.current;
      if (!el) return;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const flipped = FLIP_AT.filter((t) => p >= t).length;
      const resolved = p >= RESOLVE_AT;
      const s = state.current;
      if (flipped !== s.flipped) {
        s.flipped = flipped;
        el.querySelectorAll<HTMLElement>("[data-note]").forEach((n, i) => n.classList.toggle("is-flipped", i < flipped));
      }
      if (resolved !== s.resolved) {
        s.resolved = resolved;
        el.classList.toggle("is-resolved", resolved);
      }
    },
    // 0 when the section's top reaches the top of the screen, 1 when its bottom reaches the bottom.
    { start: 0, end: 1 }
  );

  const fade = "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

  return (
    <section ref={section} aria-labelledby="pain-title" className="group/pain relative border-t border-[var(--border)]" style={{ height: "300svh" }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1400px] items-center gap-7 px-5 pb-24 pt-20 sm:gap-8 sm:px-8 sm:pb-8 lg:grid-cols-12 lg:gap-16 lg:py-0">
          {/* Start column: label, headline (problem → answer), hint, progress */}
          <div className="lg:col-span-5">
            <p className="label flex items-center gap-3">
              <span className="text-[var(--accent)]">{index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-[var(--border-hover)]" />
              {isAr ? "مألوف لك؟" : "Sound familiar?"}
            </p>
            <h2 id="pain-title" className="mt-5 grid font-display text-[clamp(1.9rem,4.2vw,3.7rem)] font-bold leading-[1.08] tracking-[-0.035em] text-balance [grid-template-areas:'h'] sm:mt-6">
              <span className={cn("[grid-area:h]", fade, "group-[.is-resolved]/pain:-translate-y-2 group-[.is-resolved]/pain:opacity-0")}>
                {isAr ? "كل يوم من غير نظام، فيه فلوس بتضيع وأنت مش واخد بالك." : "Every day without a system, money slips away unnoticed."}
              </span>
              <span aria-hidden="true" className={cn("[grid-area:h] translate-y-2 opacity-0", fade, "group-[.is-resolved]/pain:translate-y-0 group-[.is-resolved]/pain:opacity-100")}>
                {isAr ? "نظام واحد، " : "One system, "}
                <span className="text-[var(--accent)]">{isAr ? "وكل حاجة اتحلّت." : "and it’s all handled."}</span>
              </span>
            </h2>
            <p className="mt-5 max-w-md text-[var(--text-muted)] sm:text-lg">
              {isAr ? "انزل لتحت — كل ورقة هتتقلب وتوريك الحل." : "Keep scrolling — each note flips to show the fix."}
            </p>
            <div aria-hidden="true" className="mt-6 h-px w-full max-w-md overflow-hidden bg-[var(--border)]">
              <span ref={bar} className="block h-px origin-left bg-[var(--accent)] will-change-transform rtl:origin-right" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>

          {/* End column: 2×2 sticky notes that flip */}
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-7 lg:gap-7">
            {NOTES.map((n, i) => (
              <li key={n.pain.en} className={cn("[perspective:1200px]", TILT[i])}>
                <div
                  data-note
                  className="group/note relative aspect-square transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] motion-reduce:transition-none sm:aspect-[4/3] [&.is-flipped]:[transform:rotateY(180deg)]"
                >
                  {/* Front: the pain, on cream paper with a strip of tape */}
                  <div className="absolute inset-0 flex flex-col justify-between rounded-md bg-[#efe9dc] p-3.5 text-[#1d1a16] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)] [backface-visibility:hidden] sm:p-6">
                    <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-3deg] bg-[rgba(237,234,227,0.55)] shadow-sm sm:w-24" />
                    <span className="font-mono text-[0.7rem] text-[#655b4c]">{String(i + 1).padStart(2, "0")}</span>
                    <p className="title-sm text-[0.98rem] font-bold leading-snug sm:text-xl lg:text-[1.35rem]">{n.pain[locale]}</p>
                  </div>
                  {/* Back: the fix */}
                  <div className="absolute inset-0 flex flex-col justify-between rounded-md border border-[var(--accent)] bg-[var(--bg-card)] p-3.5 shadow-[0_0_0_1px_rgba(255,91,31,0.25),0_18px_50px_-18px_rgba(255,91,31,0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] sm:h-8 sm:w-8">
                      <Check aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <p className="title-sm text-[0.98rem] font-bold leading-snug text-[var(--text-primary)] sm:text-xl lg:text-[1.35rem]">{n.fix[locale]}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
