"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Cloud, HardDrive, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { contactSchema, requestPlans } from "@/lib/validators";
import type { Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

type Plan = (typeof requestPlans)[number];

const PLANS: Record<Plan, { icon: typeof Cloud; title: Record<Locale, string>; text: Record<Locale, string> }> = {
  cloud: {
    icon: Cloud,
    title: { ar: "اشتراك شهري أونلاين", en: "Monthly online subscription" },
    text: { ar: "شغال من أي مكان، والتحديثات والنسخ الاحتياطي علينا.", en: "Works from anywhere; updates and backups are on us." },
  },
  local: {
    icon: HardDrive,
    title: { ar: "تثبيت على أجهزتك", en: "Installed on your machines" },
    text: { ar: "يشتغل من غير نت. تدفع مرة واحدة، والدعم السنوي اختياري.", en: "Works offline. Pay once; yearly support is optional." },
  },
  source: {
    icon: PackageOpen,
    title: { ar: "شراء المشروع بالكود", en: "Buy the project with source" },
    text: { ar: "ملكية كاملة للكود بعقد، لو عايز تطوّره بفريقك.", en: "Full ownership of the code, under contract, to build on with your team." },
  },
};

const field =
  "w-full border-0 border-b border-[var(--border-hover)] bg-transparent px-0 py-3 text-lg text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] transition-colors duration-500 focus:border-[var(--accent)] focus:outline-none focus:ring-0 aria-[invalid=true]:border-[var(--danger)]";

/**
 * "Request this system": pick how you want it (online / on your machines /
 * the source), leave a name and a phone number, and the request lands in the
 * admin Requests page (plus a Telegram/email alert).
 */
export function SystemRequest({ locale, system, systemName, whatsappHref }: { locale: Locale; system: string; systemName: string; whatsappHref: string }) {
  const isAr = locale === "ar";
  const [plan, setPlan] = useState<Plan>("cloud");
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean }>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error" | "rate">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      name: String(f.get("name") ?? ""),
      phone: String(f.get("phone") ?? ""),
      company: String(f.get("company") ?? ""),
      message: String(f.get("message") ?? ""),
      website: String(f.get("website") ?? ""),
      service: "ready-made-system" as const,
      kind: "quote" as const,
      system,
      plan,
      page: window.location.pathname,
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const bad = new Set(parsed.error.issues.map((i) => i.path[0]));
      setErrors({ name: bad.has("name"), phone: bad.has("phone") });
      (e.currentTarget.querySelector(bad.has("name") ? "#rq-name" : "#rq-phone") as HTMLInputElement | null)?.focus();
      return;
    }
    setErrors({});
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setState(res.ok ? "sent" : res.status === 429 ? "rate" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <p className="label mb-5">{isAr ? "عايزه إزاي؟" : "How would you like it?"}</p>
        <div role="radiogroup" aria-label={isAr ? "طريقة الشراء" : "How you want it"} className="space-y-3">
          {requestPlans.map((p) => {
            const P = PLANS[p];
            const on = plan === p;
            return (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setPlan(p)}
                className={cn(
                  "flex w-full cursor-pointer items-start gap-4 rounded-2xl border p-5 text-start transition-[border-color,background-color] duration-500",
                  on ? "border-[var(--accent)] bg-[var(--accent)]/[0.07]" : "border-[var(--border)] hover:border-[var(--border-hover)]",
                )}
              >
                <P.icon aria-hidden="true" className={cn("mt-0.5 h-6 w-6 shrink-0", on ? "text-[var(--accent)]" : "text-[var(--text-muted)]")} />
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-semibold">{P.title[locale]}</span>
                  <span className="mt-1 block leading-snug text-[var(--text-muted)]">{P.text[locale]}</span>
                </span>
                <span aria-hidden="true" className={cn("mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border", on ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]" : "border-[var(--border-hover)]")}>
                  {on && <Check className="h-3.5 w-3.5" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-7">
        {state === "sent" ? (
          <div className="swap-in flex min-h-[22rem] flex-col items-start justify-center" role="status">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]">
              <Check className="h-7 w-7" aria-hidden="true" />
            </span>
            <h3 className="mt-6 title-sm text-3xl font-bold">{isAr ? "وصلنا طلبك." : "We’ve got your request."}</h3>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-[var(--text-muted)]">
              {isAr ? `هنكلّمك على رقمك خلال يوم عمل بخصوص ${systemName}. مستعجل؟ ابعتلنا على واتساب.` : `We’ll call you within one working day about ${systemName}. In a hurry? Message us on WhatsApp.`}
            </p>
            <Button href={whatsappHref} variant="outline" size="lg" className="mt-8" leftIcon={<WhatsAppIcon className="h-5 w-5 text-[#25D366]" />}>
              {isAr ? "كلّمنا على واتساب" : "Chat on WhatsApp"}
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="rq-name" className="block text-sm text-[var(--text-muted)]">
                  {isAr ? "اسمك" : "Your name"}
                </label>
                <input id="rq-name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "rq-name-err" : undefined} />
                {errors.name && (
                  <p id="rq-name-err" role="alert" className="mt-1.5 text-sm text-[var(--danger)]">
                    {isAr ? "اكتب اسمك" : "Enter your name"}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="rq-phone" className="block text-sm text-[var(--text-muted)]">
                  {isAr ? "الموبايل / واتساب" : "Phone / WhatsApp"}
                </label>
                <input id="rq-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder="01X XXXX XXXX" className={cn(field, "text-start rtl:text-end")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "rq-phone-err" : undefined} />
                {errors.phone && (
                  <p id="rq-phone-err" role="alert" className="mt-1.5 text-sm text-[var(--danger)]">
                    {isAr ? "اكتب رقم موبايل صحيح، زي 01012345678" : "Enter a valid mobile number, e.g. 01012345678"}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="rq-company" className="block text-sm text-[var(--text-muted)]">
                  {isAr ? "اسم النشاط وعدد الفروع (اختياري)" : "Business name and number of branches (optional)"}
                </label>
                <input id="rq-company" name="company" autoComplete="organization" maxLength={100} className={field} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="rq-message" className="block text-sm text-[var(--text-muted)]">
                  {isAr ? "عايز تسأل عن حاجة؟ (اختياري)" : "Anything you’d like to ask? (optional)"}
                </label>
                <textarea id="rq-message" name="message" rows={2} maxLength={2000} className={cn(field, "resize-none")} />
              </div>
            </div>
            {/* Honeypot: a zero-size box (no overflow, so RTL pages don't grow sideways); bots fill it, people never see it. */}
            <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {(state === "error" || state === "rate") && (
              <p role="alert" className="rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 p-4 text-[var(--danger)]">
                {state === "rate"
                  ? isAr ? "بعت طلبات كتير. جرّب كمان شوية أو كلّمنا واتساب." : "Too many requests. Try again later or message us on WhatsApp."
                  : isAr ? "حصلت مشكلة في الإرسال. جرّب تاني أو كلّمنا واتساب." : "Something went wrong. Try again or message us on WhatsApp."}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" size="lg" loading={state === "sending"} rightIcon={<ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" />}>
                {isAr ? "ابعت الطلب" : "Send request"}
              </Button>
              <p className="text-sm text-[var(--text-muted)]">{isAr ? "هنكلّمك خلال يوم عمل. من غير أي التزام." : "We’ll call within one working day. No commitment."}</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
