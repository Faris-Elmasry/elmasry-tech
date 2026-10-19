import type { ReactNode } from "react";
import Image from "next/image";
import { Check, CheckCheck, ChevronLeft, House, MapPin, Mic, Minus, Plus, Receipt, Search, ShoppingBag, Smile, Star, User, UtensilsCrossed, Video } from "lucide-react";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import type { ReadySystem } from "@/lib/systems";
import type { Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────────────
   MINI SCREENS — HTML/CSS mock-ups of what a client actually receives:
   websites, apps, dashboards, chats, automations. Big, readable text; sample
   data is generic and every frame is labelled as illustrative.
   ──────────────────────────────────────────────────────────────────────── */

type L = { locale: Locale };
const pick = (locale: Locale, en: string, ar: string) => (locale === "ar" ? ar : en);

/** "Sample" tag shown on every mock so nobody mistakes it for a client. */
export function SampleTag({ locale, className }: L & { className?: string }) {
  return <span className={cn("rounded-full border border-[var(--border)] px-2 py-0.5 text-[0.68rem] text-[var(--text-subtle)]", className)}>{pick(locale, "Sample", "مثال توضيحي")}</span>;
}

/** Browser window chrome with a URL pill. */
export function BrowserFrame({ url, locale, children, className, label }: L & { url: string; children: ReactNode; className?: string; label: string }) {
  return (
    <figure role="img" aria-label={label} className={cn("overflow-hidden rounded-2xl border border-[var(--border-hover)] bg-[#0e0e10] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]", className)}>
      <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[#141416] px-4 py-3" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3f]" />
        </span>
        <span dir="ltr" className="mx-auto flex min-w-0 max-w-[60%] items-center gap-2 truncate rounded-full bg-[#1d1d20] px-4 py-1 text-xs text-[var(--text-muted)]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--success)]" />
          {url}
        </span>
        <SampleTag locale={locale} className="hidden sm:inline" />
      </div>
      <div aria-hidden="true" className="@container">
        {children}
      </div>
    </figure>
  );
}

/**
 * A real-looking phone: metal edge with side buttons, black bezel, status bar
 * (time, signal, wifi, battery), camera island and home indicator. The screen
 * has phone proportions and its content fills it as a flex column.
 */
export function PhoneFrame({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  return (
    <figure role="img" aria-label={label} className={cn("relative mx-auto w-full max-w-[18.5rem]", className)}>
      <div aria-hidden="true" dir="ltr">
        <span className="absolute -left-[2px] top-[17%] h-[5%] w-[3px] rounded-l-sm bg-[#4a4a50]" />
        <span className="absolute -left-[2px] top-[25%] h-[9%] w-[3px] rounded-l-sm bg-[#4a4a50]" />
        <span className="absolute -left-[2px] top-[36%] h-[9%] w-[3px] rounded-l-sm bg-[#4a4a50]" />
        <span className="absolute -right-[2px] top-[27%] h-[13%] w-[3px] rounded-r-sm bg-[#4a4a50]" />
      </div>
      <div
        className="relative aspect-[9/19] rounded-[3rem] p-[3px] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(0,0,0,0.7)]"
        style={{ background: "linear-gradient(140deg,#8a8a90 0%,#36363b 18%,#1d1d20 55%,#5c5c62 100%)" }}
      >
        <div className="h-full rounded-[2.85rem] bg-[#040405] p-[8px]">
          <div aria-hidden="true" className="relative flex h-full flex-col overflow-hidden rounded-[2.4rem] bg-[#0f0f11] text-[var(--text-primary)]">
            <div dir="ltr" className="relative z-10 flex h-11 shrink-0 items-center justify-between px-7 pt-1 text-[0.78rem] font-semibold">
              <span>9:41</span>
              <span className="flex items-center gap-1.5">
                <span className="flex items-end gap-[2px]">
                  {[4, 6, 8, 10].map((h) => (
                    <span key={h} className="w-[3px] rounded-[1px] bg-current" style={{ height: h }} />
                  ))}
                </span>
                <svg viewBox="0 0 16 12" className="h-[11px] w-[15px] fill-current">
                  <path d="M8 2.2c2.4 0 4.6.9 6.2 2.5l1.3-1.3A10.6 10.6 0 0 0 8 .4 10.6 10.6 0 0 0 .5 3.4l1.3 1.3A8.8 8.8 0 0 1 8 2.2Zm0 3.5c1.4 0 2.8.6 3.8 1.5l1.3-1.3A7.2 7.2 0 0 0 8 3.9 7.2 7.2 0 0 0 2.9 5.9l1.3 1.3c1-.9 2.4-1.5 3.8-1.5Zm0 3.4c.5 0 1 .2 1.4.6L8 11.1 6.6 9.7c.4-.4.9-.6 1.4-.6Z" />
                </svg>
                <span className="relative flex h-[12px] w-[24px] items-center rounded-[4px] border border-current/50 p-[1.5px]">
                  <span className="h-full w-[70%] rounded-[2px] bg-current" />
                  <span className="absolute -right-[3px] top-1/2 h-[4px] w-[2px] -translate-y-1/2 rounded-r-sm bg-current/50" />
                </span>
              </span>
            </div>
            <span className="absolute left-1/2 top-[9px] z-20 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
            <span className="pointer-events-none absolute bottom-[7px] left-1/2 z-20 h-[4px] w-[34%] -translate-x-1/2 rounded-full bg-white/75" />
          </div>
        </div>
      </div>
    </figure>
  );
}

/* ── Website ─────────────────────────────────────────────────────────── */

export function SiteMock({ locale, className }: L & { className?: string }) {
  const isAr = locale === "ar";
  const menu = isAr
    ? [["لاتيه", "65"], ["كابتشينو", "60"], ["كرواسون زبدة", "45"]]
    : [["Latte", "65"], ["Cappuccino", "60"], ["Butter croissant", "45"]];
  return (
    <BrowserFrame locale={locale} url="nourcafe.com" className={className} label={pick(locale, "Sample website for a café", "مثال لموقع كافيه")}>
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between px-1 text-sm">
          <span className="font-semibold">{isAr ? "كافيه نور" : "Nour Café"}</span>
          <span className="flex gap-4 text-[var(--text-muted)]">
            <span>{isAr ? "المنيو" : "Menu"}</span>
            <span>{isAr ? "الفروع" : "Branches"}</span>
          </span>
        </div>
        <div className="relative mt-4 overflow-hidden rounded-xl">
          <div className="relative aspect-[16/11] @md:aspect-[16/8]">
            <Image src="/images/site/cafe-cashier-v2.webp" alt="" fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <p className="text-[0.8rem] text-[#ffb38a]">{isAr ? "مفتوح لحد 12 بالليل" : "Open until midnight"}</p>
            <p className="mt-1 text-[1.45rem] font-bold leading-[1.15] text-white sm:text-[1.7rem]">{isAr ? "قهوة حلوة، وقعدة أحلى." : "Good coffee, better company."}</p>
            <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-[#06210f]">
              <WhatsAppIcon className="h-4 w-4" />
              {isAr ? "اطلب على واتساب" : "Order on WhatsApp"}
            </span>
          </div>
        </div>
        <ul className="mt-3 divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[0.95rem]">
          {menu.map(([n, p]) => (
            <li key={n} className="flex items-center justify-between px-4 py-2.5">
              <span>{n}</span>
              <span dir="ltr" className="text-[var(--text-muted)]">
                {p} {locale === "ar" ? "ج.م" : "EGP"}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm">
          <span className="flex shrink-0 text-[var(--warning)]">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </span>
          <span className="truncate text-[var(--text-muted)]">{isAr ? "بيظهر لما حد يدوّر على «كافيه في المعادي»" : "Shows up for “café in Maadi”"}</span>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ── Mobile app ─────────────────────────────────────────────────────── */

export function AppMock({ locale, className }: L & { className?: string }) {
  const isAr = locale === "ar";
  const items = isAr
    ? [["بيتزا مارجريتا", "180", "#c2410c"], ["سلطة سيزر", "95", "#4d7c0f"], ["ليمون بالنعناع", "40", "#a16207"]]
    : [["Margherita pizza", "180", "#c2410c"], ["Caesar salad", "95", "#4d7c0f"], ["Mint lemonade", "40", "#a16207"]];
  const tabs: [typeof House, string][] = [
    [House, isAr ? "الرئيسية" : "Home"],
    [UtensilsCrossed, isAr ? "المنيو" : "Menu"],
    [Receipt, isAr ? "طلباتي" : "Orders"],
    [User, isAr ? "حسابي" : "Account"],
  ];
  return (
    <PhoneFrame className={className} label={pick(locale, "Sample ordering app", "مثال لتطبيق طلبات")}>
      <div className="flex min-h-0 flex-1 flex-col px-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.72rem] text-[var(--text-muted)]">{isAr ? "مطعم الشيف" : "Chef's Kitchen"}</p>
            <p className="text-lg font-bold leading-tight">{isAr ? "طلبك" : "Your order"}</p>
          </div>
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-card)]">
            <ShoppingBag className="h-[18px] w-[18px] text-[var(--accent)]" />
            <span className="absolute -end-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[0.6rem] font-bold text-[var(--accent-ink)]">3</span>
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {items.map(([n, p, c]) => (
            <li key={n} className="flex items-center gap-3 rounded-2xl bg-[var(--bg-card)] p-2 text-[0.9rem]">
              <span className="h-10 w-10 shrink-0 rounded-xl" style={{ background: `radial-gradient(circle at 35% 30%, ${c}, #1a1a1c 80%)` }} />
              <span className="min-w-0 flex-1">
                <span className="block truncate">{n}</span>
                <span dir="ltr" className="block text-start text-[0.75rem] text-[var(--text-muted)]">
                  {p} {locale === "ar" ? "ج.م" : "EGP"}
                </span>
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-[var(--border)] px-1.5 py-1 text-[0.8rem]">
                <Minus className="h-3 w-3 text-[var(--text-muted)]" />1<Plus className="h-3 w-3 text-[var(--accent)]" />
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 rounded-2xl border border-[var(--border)] p-3">
          <div className="flex items-center gap-2 text-[0.8rem] text-[var(--text-muted)]">
            <MapPin className="h-4 w-4 shrink-0 text-[var(--accent)]" />
            {isAr ? "الطيار في الطريق — 12 دقيقة" : "Rider on the way — 12 min"}
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
            <div className="h-full w-2/3 rounded-full bg-[var(--accent)]" />
          </div>
        </div>
        <div className="mt-3 divide-y divide-[var(--border)] rounded-2xl bg-[var(--bg-card)] text-[0.8rem]">
          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="text-[var(--text-muted)]">{isAr ? "التوصيل" : "Delivery"}</span>
            <span>{isAr ? "المعادي، شارع 9" : "Maadi, Street 9"}</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="text-[var(--text-muted)]">{isAr ? "الدفع" : "Payment"}</span>
            <span className="rounded-full bg-[#e60000]/15 px-2 py-0.5 text-[0.72rem] text-[#ff6b6b]">{isAr ? "فودافون كاش" : "Vodafone Cash"}</span>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between rounded-full bg-[var(--accent)] px-5 py-3 text-[0.92rem] font-semibold text-[var(--accent-ink)]">
          <span>{isAr ? "ادفع" : "Pay"}</span>
          <span dir="ltr">{locale === "ar" ? "315 ج.م" : "315 EGP"}</span>
        </div>
      </div>
      <nav className="mt-3 grid shrink-0 grid-cols-4 border-t border-[var(--border)] bg-[#141416] px-2 pb-5 pt-2">
        {tabs.map(([Icon, t], i) => (
          <span key={t} className={cn("flex flex-col items-center gap-0.5 text-[0.62rem]", i === 2 ? "text-[var(--accent)]" : "text-[var(--text-muted)]")}>
            <Icon className="h-[18px] w-[18px]" />
            {t}
          </span>
        ))}
      </nav>
    </PhoneFrame>
  );
}

/* ── WhatsApp assistant ─────────────────────────────────────────────── */

export function ChatMock({ locale, className, compact = false }: L & { className?: string; compact?: boolean }) {
  const isAr = locale === "ar";
  // the phone is the customer's (the header is the clinic): the customer's lines go out (green), the clinic's come in
  const msgs: [boolean, string, string][] = isAr
    ? [
        [true, "مساء الخير، الكشف بكام؟ وفيه مواعيد بكرة؟", "11:42 م"],
        [false, "مساء النور! الكشف 350 جنيه. بكرة فيه 5:30 و 7:00 مع د. أحمد. أحجز لحضرتك أنهي ميعاد؟", "11:42 م"],
        [true, "7 لو سمحت", "11:43 م"],
        [false, "تم الحجز. بكرة 7:00 م. هبعت لك تذكير قبلها بساعتين.", "11:43 م"],
      ]
    : [
        [true, "Hi, how much is a check-up? Any slots tomorrow?", "11:42 pm"],
        [false, "Good evening! A check-up is 350 EGP. Tomorrow we have 5:30 and 7:00 with Dr. Ahmed. Which one suits you?", "11:42 pm"],
        [true, "7 please", "11:43 pm"],
        [false, "Booked. Tomorrow at 7:00 pm. I’ll remind you two hours before.", "11:43 pm"],
      ];
  return (
    <PhoneFrame className={className} label={pick(locale, "Sample WhatsApp conversation with an assistant", "مثال لمحادثة واتساب مع مساعد ذكي")}>
      <WhatsAppScreen locale={locale} name={isAr ? "عيادة السلام" : "Salam Clinic"} avatar={isAr ? "س" : "S"} msgs={compact ? msgs.slice(0, 2) : msgs} />
    </PhoneFrame>
  );
}

/** WhatsApp-style chat: header, patterned conversation, message bar. `ours` = sent by this phone's owner. */
function WhatsAppScreen({ locale, name, avatar, msgs, mono }: L & { name: string; avatar: string; msgs: [boolean, string, string?][]; mono?: boolean }) {
  const isAr = locale === "ar";
  return (
    <>
      <div className="flex shrink-0 items-center gap-2.5 bg-[#1f2c34] px-3 pb-2.5 pt-1">
        <ChevronLeft className="h-5 w-5 shrink-0 text-[#aebac1] rtl:rotate-180" />
        <span dir="ltr" className={cn("inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--accent-ink)]", mono && "font-mono")}>{avatar}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.92rem] font-semibold text-[#e9edef]">{name}</p>
          <p className="text-[0.7rem] text-[#8fd5a6]">{isAr ? "متصل الآن" : "online"}</p>
        </div>
        <Video className="h-[18px] w-[18px] shrink-0 text-[#aebac1]" />
      </div>
      <div
        className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-2.5 py-3"
        style={{ backgroundColor: "#0b141a", backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "14px 14px" }}
      >
        <span className="mx-auto mb-1 rounded-md bg-[#182229] px-2 py-0.5 text-[0.65rem] text-[#aebac1]">{isAr ? "النهارده" : "Today"}</span>
        {msgs.map(([ours, text, time], i) => (
          <div key={i} className={cn("flex", ours ? "justify-end" : "justify-start")}>
            <p className={cn("max-w-[85%] rounded-xl px-2.5 py-1.5 text-[0.86rem] leading-snug text-[#e9edef]", ours ? "rounded-se-sm bg-[#005c4b]" : "rounded-ss-sm bg-[#202c33]")}>
              {text}
              <span className="ms-2 inline-flex items-center gap-1 align-bottom text-[0.62rem] text-[#c4cdd2]">
                {time && <span dir="ltr">{time}</span>}
                {ours && <CheckCheck className="h-3 w-3 text-[#53bdeb]" />}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-2 bg-[#0b141a] px-2 pb-6 pt-1.5">
        <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#202c33] px-3 py-2 text-[0.8rem] text-[#8696a0]">
          <Smile className="h-4 w-4 shrink-0" />
          <span className="truncate">{isAr ? "اكتب رسالة" : "Message"}</span>
        </span>
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00a884]">
          <Mic className="h-4 w-4 text-[#0b141a]" />
        </span>
      </div>
    </>
  );
}

/* ── Automation flow ────────────────────────────────────────────────── */

export function FlowMock({ locale, className }: L & { className?: string }) {
  const isAr = locale === "ar";
  const steps = isAr
    ? [
        ["طلب جديد على واتساب", "محمود — 2 تيشيرت مقاس M", "دلوقتي"],
        ["الفاتورة طلعت", "فاتورة 1042 · 640 جنيه", "+2 ث"],
        ["المخزن اتحدّث", "تيشيرت أبيض M: فاضل 7", "+3 ث"],
        ["الشحنة اتحجزت", "بوليصة رقم 88213", "+5 ث"],
        ["العميلة وصلها تحديث", "«طلبك اتشحن وهيوصل بكرة»", "+6 ث"],
      ]
    : [
        ["New order on WhatsApp", "Mahmoud — 2 T-shirts, size M", "now"],
        ["Invoice created", "Invoice 1042 · 640 EGP", "+2s"],
        ["Stock updated", "White T-shirt M: 7 left", "+3s"],
        ["Shipping booked", "Waybill 88213", "+5s"],
        ["Customer updated", "“Your order has shipped, arriving tomorrow”", "+6s"],
      ];
  return (
    <figure role="img" aria-label={pick(locale, "Sample automation: one order flowing through five steps by itself", "مثال لأتمتة: طلب واحد بيمشي في خمس خطوات لوحده")} className={cn("rounded-2xl border border-[var(--border-hover)] bg-[#0e0e10] p-5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] sm:p-6", className)}>
      <div className="flex items-center justify-between" aria-hidden="true">
        <p className="text-sm text-[var(--text-muted)]">{isAr ? "طلب واحد · صفر نقل يدوي" : "One order · zero copy-paste"}</p>
        <SampleTag locale={locale} />
      </div>
      <ol className="relative mt-5 space-y-3" aria-hidden="true">
        <span className="absolute bottom-6 start-[1.15rem] top-6 w-px bg-[var(--border-hover)]" />
        {steps.map(([t, m, time], i) => (
          <li key={t} className="relative flex items-center gap-4">
            <span className={cn("relative z-10 inline-flex h-[2.3rem] w-[2.3rem] shrink-0 items-center justify-center rounded-full border", i === steps.length - 1 ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]" : "border-[var(--border-hover)] bg-[#141416] text-[var(--success)]")}>
              <Check className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="truncate text-[0.95rem] font-semibold">{t}</p>
                <span dir="ltr" className="shrink-0 font-mono text-[0.7rem] text-[var(--text-subtle)]">
                  {time}
                </span>
              </div>
              <p className="truncate text-sm text-[var(--text-muted)]">{m}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* ── Online store + shop cashier ────────────────────────────────────── */

export function StoreMock({ locale, className }: L & { className?: string }) {
  const isAr = locale === "ar";
  return (
    <div className={className}>
      <BrowserFrame locale={locale} url="layla-store.com" label={pick(locale, "Sample online store product page", "مثال لصفحة منتج في متجر أونلاين")}>
        <div className="grid gap-5 p-4 sm:grid-cols-[1fr_1.1fr] sm:p-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[var(--bg-card)]">
            <Image src="/images/site/boutique-v2.webp" alt="" fill sizes="(min-width: 1024px) 14vw, 45vw" className="object-cover object-[48%_center]" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-[var(--text-muted)]">{isAr ? "قمصان" : "Shirts"}</p>
            <p className="mt-1 text-[1.35rem] font-bold leading-tight">{isAr ? "قميص كتان أبيض" : "White linen shirt"}</p>
            <p dir="ltr" className="mt-2 text-start text-lg rtl:text-end">
              650 {locale === "ar" ? "ج.م" : "EGP"}
            </p>
            <div className="mt-4 flex gap-2">
              {["S", "M", "L"].map((sz) => (
                <span key={sz} className={cn("inline-flex h-9 w-9 items-center justify-center rounded-lg border text-sm", sz === "M" ? "border-[var(--text-primary)]" : "border-[var(--border)] text-[var(--text-muted)]")}>
                  {sz}
                </span>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-[var(--success)]">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--success)]" />
              {isAr ? "متاح — 3 قطع في فرع المعادي" : "In stock — 3 left at the Maadi shop"}
            </p>
            <div className="mt-auto pt-5">
              <span className="block rounded-full bg-[var(--accent)] px-4 py-3 text-center text-[0.95rem] font-semibold text-[var(--accent-ink)]">{isAr ? "اشتري — كاش عند الاستلام" : "Buy — cash on delivery"}</span>
            </div>
          </div>
        </div>
      </BrowserFrame>
      <div aria-hidden="true" className="mt-3 flex items-center gap-3 rounded-xl border border-[var(--border-hover)] bg-[#141416] px-4 py-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]">
          <Check className="h-4 w-4" />
        </span>
        <p className="min-w-0 text-sm">
          <span className="block text-[var(--text-muted)]">{isAr ? "كاشير المحل · بيشتغل من غير نت" : "Shop cashier · works offline"}</span>
          <span className="block truncate">{isAr ? "اتباعت قطعة في المحل — المتجر اتحدّث لوحده" : "1 sold in the shop — the website updated itself"}</span>
        </p>
      </div>
    </div>
  );
}

/* ── Paper "before" ─────────────────────────────────────────────────── */

/** A ruled notebook page with the messy, handwritten way things are done today. */
export function NotebookMock({ locale, lines, title, className }: L & { lines: string[]; title?: string; className?: string }) {
  const isAr = locale === "ar";
  return (
    <div
      aria-label={pick(locale, "A handwritten notebook page", "صفحة كشكول مكتوبة بخط اليد")}
      role="img"
      className={cn("paper relative overflow-hidden rounded-2xl border border-[#d8cfbd] py-6 pe-6 ps-14 text-[#2b2620] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] sm:py-8 sm:pe-8", className)}
    >
      <div aria-hidden="true">
        <p className="text-sm text-[#655b4c]">{title ?? (isAr ? "دفتر المحل — الأسبوع ده" : "Shop notebook — this week")}</p>
        <ul className="paper-lines mt-4">
          {lines.map((l, i) => (
            <li key={l} className={cn("text-[1.12rem] leading-[2.75rem]", i % 2 ? "-rotate-[0.5deg]" : "rotate-[0.35deg]")}>
              {l}
            </li>
          ))}
          <li className="text-[1.12rem] leading-[2.75rem] text-[#655b4c] line-through decoration-[#b4443a] decoration-2">{isAr ? "الحساب: 12,450 ؟؟" : "Total: 12,450 ??"}</li>
        </ul>
        <span className="absolute -end-6 bottom-8 h-24 w-24 rounded-full border-[6px] border-[#b98b5e]/25" />
      </div>
    </div>
  );
}

/* ── System dashboard (from catalog sample data) ────────────────────── */

/**
 * Dashboard window drawn from the catalog sample data. `activeNav` highlights
 * one sidebar entry and swaps the window title (used by the module tour).
 */
export function DashMock({
  system,
  locale,
  className,
  title,
  callout,
  activeNav = 0,
}: {
  system: ReadySystem;
  locale: Locale;
  className?: string;
  title?: string;
  callout?: ReactNode;
  activeNav?: number;
}) {
  const { screen } = system;
  const max = Math.max(...screen.chart);
  return (
    <BrowserFrame locale={locale} url={`app.elmasry.tech/${system.slug}`} className={className} label={pick(locale, `Illustrative screen of the ${system.name.en}`, `واجهة توضيحية لـ ${system.name.ar}`)}>
      <div className="grid @2xl:grid-cols-[10rem_1fr]">
        <ul className="hidden border-e border-[var(--border)] p-3 text-[0.95rem] @2xl:block">
          {screen.nav.map((n, i) => (
            <li key={n.en} className={cn("rounded-lg px-3 py-2.5 transition-colors duration-500", i === activeNav ? "bg-[var(--bg-card-hover)] text-[var(--text-primary)]" : "text-[var(--text-muted)]")}>
              {n[locale]}
            </li>
          ))}
        </ul>
        <div className="relative min-w-0 space-y-4 p-4 sm:p-5">
          <p className="text-lg font-semibold">{title ?? system.name[locale]}</p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {screen.stats.map((s) => (
              <div key={s.label.en} className="min-w-0 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3">
                <p className="line-clamp-2 min-h-[2.4em] text-[0.78rem] leading-tight text-[var(--text-muted)]">{s.label[locale]}</p>
                <p dir="ltr" className="mt-1 truncate text-start font-mono text-base font-semibold @md:text-lg @2xl:text-xl rtl:text-end">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
          <div className="flex h-24 items-end gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3 sm:h-28">
            {screen.chart.map((h, i) => (
              <span key={i} className={cn("flex-1 rounded-t-md", i === screen.chart.length - 1 ? "bg-[var(--accent)]" : "bg-[var(--border-hover)]")} style={{ height: `${(h / max) * 100}%` }} />
            ))}
          </div>
          <ul className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[0.95rem]">
            {screen.rows.map((r) => (
              <li key={r.name.en} className="flex items-center justify-between gap-3 px-3 py-2.5">
                <span className="min-w-0">
                  <span className="block truncate">{r.name[locale]}</span>
                  <span className="block truncate text-[0.8rem] text-[var(--text-muted)]">{r.meta[locale]}</span>
                </span>
                <span className="shrink-0 rounded-full border border-[var(--border)] px-2.5 py-1 text-xs">{typeof r.value === "string" ? <span dir="ltr">{r.value}</span> : r.value[locale]}</span>
              </li>
            ))}
          </ul>
          {callout}
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ── Custom system (generic multi-branch overview) ──────────────────── */

export function OverviewMock({ locale, className }: L & { className?: string }) {
  const isAr = locale === "ar";
  const branches = isAr
    ? [["فرع مدينة نصر", "48,250", 86], ["فرع المعادي", "36,900", 64], ["فرع الشيخ زايد", "29,410", 52]]
    : [["Nasr City branch", "48,250", 86], ["Maadi branch", "36,900", 64], ["Sheikh Zayed branch", "29,410", 52]];
  return (
    <BrowserFrame locale={locale} url="app.yourcompany.com" className={className} label={pick(locale, "Sample overview of every branch on one screen", "مثال لشاشة واحدة فيها كل الفروع")}>
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-semibold">{isAr ? "صباح الخير، أستاذ أحمد" : "Good morning, Ahmed"}</p>
          <span className="flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-muted)]">
            <Search className="h-3.5 w-3.5" />
            {isAr ? "دوّر" : "Search"}
          </span>
        </div>
        <ul className="space-y-2">
          {branches.map(([n, v, w]) => (
            <li key={n as string} className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-[0.95rem]">{n}</span>
                <span dir="ltr" className="font-mono text-[0.95rem]">
                  {v} {locale === "ar" ? "ج.م" : "EGP"}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
                <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${w}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3">
            <p className="text-xs text-[var(--text-muted)]">{isAr ? "أصناف قربت تخلص" : "Running low"}</p>
            <p className="mt-1 font-mono text-xl text-[var(--warning)]">12</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3">
            <p className="text-xs text-[var(--text-muted)]">{isAr ? "فلوس في الخزنة" : "Cash in hand"}</p>
            <p dir="ltr" className="mt-1 text-start font-mono text-xl rtl:text-end">
              18,300
            </p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/** The right mini screen for each service. */
export function ServiceMock({ slug, locale, className }: L & { slug: string; className?: string }) {
  switch (slug) {
    case "website-development":
      return <SiteMock locale={locale} className={className} />;
    case "mobile-app-development":
      return <AppMock locale={locale} className={className} />;
    case "ai-chatbots":
      return <ChatMock locale={locale} className={className} />;
    case "business-automation":
      return <FlowMock locale={locale} className={className} />;
    case "ecommerce-development":
      return <StoreMock locale={locale} className={className} />;
    default:
      return <OverviewMock locale={locale} className={className} />;
  }
}

/** A first WhatsApp message to us, and our reply — used by the homepage's closing call to action. */
export function HelloPhone({ locale, className }: L & { className?: string }) {
  const isAr = locale === "ar";
  const msgs: [boolean, string, string][] = isAr
    ? [
        [true, "أهلًا، عندي صيدلية وفرعين، والجرد والصلاحية تاعبيني. ممكن نتكلم؟", "10:02 ص"],
        [false, "أهلًا بيك! أكيد. يناسبك بكرة الساعة 12 الضهر؟ هي مكالمة 30 دقيقة، هنسمع منك الأول ومن غير أي التزام.", "10:04 ص"],
        [true, "تمام، مستني.", "10:05 ص"],
      ]
    : [
        [true, "Hi, I run a pharmacy with two branches — stock and expiry dates are driving me crazy. Can we talk?", "10:02 am"],
        [false, "Hi! Of course. Would tomorrow at 12 work for a 30-minute call? We’ll listen first — no commitment.", "10:04 am"],
        [true, "Perfect, talk then.", "10:05 am"],
      ];
  return (
    <PhoneFrame className={className} label={pick(locale, "Sample first message to Elmasry Tech on WhatsApp", "مثال لأول رسالة لـ Elmasry Tech على واتساب")}>
      <WhatsAppScreen locale={locale} name="Elmasry Tech" avatar="e/" mono msgs={msgs} />
    </PhoneFrame>
  );
}
