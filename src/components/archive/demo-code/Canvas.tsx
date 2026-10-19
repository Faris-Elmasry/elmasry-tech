import type { ReactNode } from "react";
import {
  ArrowUp,
  BatteryFull,
  Box,
  CalendarDays,
  Coffee,
  FileText,
  GitBranch,
  Home,
  LayoutDashboard,
  Lock,
  Plus,
  Receipt,
  Settings,
  ShoppingBag,
  Signal,
  Sparkles,
  Star,
  User,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { CODE_LINES, TOKEN_COLOR } from "./code";
import { app, brand, chat, currency, dash, products, web, type DemoLocale } from "./copy";

/*
 * Everything inside the canvas is laid out in fixed design pixels; the engine
 * scales the whole rig to fit the free area. Elements tagged with data-a are
 * driven frame-by-frame by engine.ts — no React state is involved.
 */

const CREAM_INK = "text-[#1d1712]";
const CREAM_MUTED = "text-[#7d7266]";
const DARK_MUTED = "text-[#8f8a81]";
const DARK_CARD = "rounded-[12px] border border-[rgba(237,234,227,0.07)] bg-[#17171a]";

function Layer({ w, h, dir, className = "", children }: { w: number; h: number; dir: "ltr" | "rtl"; className?: string; children: ReactNode }) {
  return (
    <div dir={dir} className={`absolute left-1/2 top-1/2 ${className}`} style={{ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2 }}>
      {children}
    </div>
  );
}

/** Fictional client mark. */
function Mark({ size = 18, radius = 6 }: { size?: number; radius?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center bg-[var(--accent)] font-bold text-[#1d1712]"
      style={{ width: size, height: size, borderRadius: radius, fontSize: size * 0.56, lineHeight: 1 }}
    >
      L
    </span>
  );
}

/** Small coffee-bag illustration for product thumbnails. */
function Bag({ scale = 1 }: { scale?: number }) {
  return (
    <span
      className="absolute left-1/2 top-1/2 block h-[42px] w-[30px] rounded-[5px] bg-[#fbf7f0] shadow-[0_8px_14px_-6px_rgba(0,0,0,0.45)]"
      style={{ transform: `translate(-50%,-46%) scale(${scale})` }}
    >
      <span className="absolute inset-x-0 top-0 block h-[7px] rounded-t-[5px] bg-[#e7ddcf]" />
      <span className="absolute inset-x-[6px] bottom-[8px] block h-[14px] rounded-[3px] bg-[#1d1712]">
        <span className="absolute left-1/2 top-1/2 block h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]" />
      </span>
    </span>
  );
}

/** Hero visual of the sample site: top-down flat white on a warm backdrop. */
function CupArt() {
  return (
    <div className="absolute inset-0" style={{ background: "radial-gradient(120% 95% at 78% 22%, #ff8a4c 0%, #d9541a 30%, #6a2a0e 68%, #2a1006 100%)" }}>
      {[
        { l: 196, t: 24, r: 28 },
        { l: 214, t: 112, r: -18 },
        { l: 168, t: 128, r: 64 },
      ].map((b, i) => (
        <span
          key={i}
          className="absolute block h-[11px] w-[16px] rounded-[50%] bg-[#3b1a0a] shadow-[inset_0_-2px_3px_rgba(0,0,0,0.4)]"
          style={{ left: b.l, top: b.t, transform: `rotate(${b.r}deg)` }}
        >
          <span className="absolute left-[3px] right-[3px] top-1/2 block h-px bg-[#1c0a03]" />
        </span>
      ))}
      <span className="absolute left-[40px] top-1/2 block h-[118px] w-[118px] -translate-y-1/2 rounded-full bg-[#f3ece2] shadow-[0_22px_30px_-14px_rgba(0,0,0,0.6)]">
        <span className="absolute left-[94px] top-[52px] block h-[14px] w-[24px] rounded-[7px] bg-[#fbf8f3] shadow-[0_2px_4px_rgba(0,0,0,0.12)]" />
        <span className="absolute inset-[18px] block rounded-full bg-[#fdfbf8] shadow-[inset_0_-3px_6px_rgba(0,0,0,0.08)]">
          <span
            className="absolute inset-[7px] block rounded-full"
            style={{ background: "radial-gradient(circle at 50% 50%, #f1dcc2 0 18%, #c88a57 30%, #8a4a22 55%, #4a2210 100%)" }}
          />
        </span>
      </span>
      <span dir="ltr" className="absolute left-[12px] top-[12px] flex items-center gap-[5px] rounded-full bg-[rgba(10,10,11,0.35)] px-[8px] py-[3px] font-mono text-[8.5px] uppercase tracking-[0.12em] text-[#f5f0e8] backdrop-blur-sm">
        <span className="h-[5px] w-[5px] rounded-full bg-[#5ee38a]" />
        Roast #214 · 06:30
      </span>
    </div>
  );
}

/* ── Window bar (shared by editor, website and dashboard) ── */
function WindowBar() {
  return (
    <div data-a="bar" dir="ltr" className="absolute inset-x-0 top-0 z-20 h-[40px] border-b border-[rgba(128,128,128,0.16)]" style={{ color: "#edeae3" }}>
      <div className="absolute left-[16px] top-1/2 flex -translate-y-1/2 gap-[7px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="block h-[10px] w-[10px] rounded-full bg-[rgba(128,128,128,0.4)]" />
        ))}
      </div>
      <div data-a="bar-tabs" className="absolute bottom-0 left-[86px] flex h-[30px] items-stretch font-mono text-[11px]">
        <span className="relative -mb-px flex items-center gap-[8px] rounded-t-[8px] border border-b-0 border-[rgba(237,234,227,0.09)] bg-[#0e0e10] px-[12px] text-[#edeae3]">
          <span className="h-[6px] w-[6px] rounded-full bg-[var(--accent)]" />
          page.tsx
          <X className="h-[10px] w-[10px] text-[#6f6b64]" strokeWidth={2.2} />
        </span>
        <span className="flex items-center px-[12px] text-[#6f6b64]">layout.tsx</span>
        <span className="flex items-center px-[12px] text-[#6f6b64]">catalog.ts</span>
      </div>
      <div
        data-a="bar-url"
        className="absolute left-1/2 top-1/2 flex h-[24px] w-[240px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[6px] rounded-full bg-[rgba(128,128,128,0.13)] text-[11px]"
        style={{ opacity: 0 }}
      >
        <Lock className="h-[10px] w-[10px] opacity-60" strokeWidth={2.4} />
        <span className="grid justify-items-center whitespace-nowrap">
          <span data-a="url-web" className="col-start-1 row-start-1">
            lumora.coffee
          </span>
          <span data-a="url-dash" className="col-start-1 row-start-1" style={{ opacity: 0 }}>
            {dash.url}
          </span>
        </span>
      </div>
    </div>
  );
}

/* ── Scene 0: code editor ── */
function EditorLayer() {
  return (
    <Layer w={560} h={440} dir="ltr" className="font-mono">
      <div className="absolute inset-x-0 top-[40px] pt-[14px] [perspective:900px]">
        {CODE_LINES.map((line, i) => (
          <div key={i} data-a="code-row" className="group flex h-[19px] origin-top items-center text-[12.5px] leading-[19px] data-[on=true]:bg-[rgba(237,234,227,0.035)]">
            <span className="w-[46px] shrink-0 pe-[16px] text-end text-[11px] tabular-nums text-[#4a4741] group-data-[on=true]:text-[#9a958c]">{i + 1}</span>
            <span className="whitespace-pre">
              {line.tokens.map((t, j) => (
                <span key={j} data-a="code-tok" className={TOKEN_COLOR[t.kind]} />
              ))}
              <span
                data-a="caret"
                className="ms-px inline-block h-[15px] w-[2px] translate-y-[3px] bg-[var(--accent)] opacity-0 data-[on=true]:opacity-100 data-[blink=true]:animate-pulse"
              />
            </span>
          </div>
        ))}
      </div>
      <div
        data-a="editor-chrome"
        className="absolute inset-x-0 bottom-0 flex h-[26px] items-center justify-between border-t border-[rgba(237,234,227,0.07)] px-[14px] text-[10px] text-[#77726a]"
      >
        <span className="flex items-center gap-[6px]">
          <GitBranch className="h-[11px] w-[11px]" />
          main
        </span>
        <span className="flex items-center gap-[16px]">
          <span className="flex items-center gap-[6px]">
            <span className="h-[6px] w-[6px] rounded-full bg-[var(--success)]" />0 problems
          </span>
          <span>TypeScript JSX</span>
          <span>UTF-8</span>
        </span>
      </div>
    </Layer>
  );
}

/* ── Scene 1: website ── */
function WebLayer({ locale, dir }: { locale: DemoLocale; dir: "ltr" | "rtl" }) {
  const ar = locale === "ar";
  return (
    <Layer w={640} h={440} dir={dir} className={CREAM_INK}>
      <div data-a="web" className="absolute inset-x-[30px] top-[52px] flex h-[30px] items-center justify-between">
        <span className="flex items-center gap-[8px] text-[14px] font-bold tracking-[-0.01em]">
          <Mark />
          {brand[locale]}
        </span>
        <span className="flex items-center gap-[24px] text-[11.5px] text-[#6f655a]">
          {web.nav[locale].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </span>
        <span className="flex h-[28px] items-center rounded-full bg-[#1d1712] px-[14px] text-[11px] font-semibold text-[#f5f0e8]">{web.order[locale]}</span>
      </div>

      <div className="absolute start-[30px] top-[100px] flex w-[300px] flex-col">
        <div data-a="web">
          <p className={ar ? "text-[10.5px] font-medium text-[var(--accent)]" : "font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--accent)]"}>{web.eyebrow[locale]}</p>
          <p className={`mt-[8px] font-bold tracking-[-0.02em] ${ar ? "text-[26px] leading-[1.3]" : "font-display text-[28px] leading-[1.06]"}`}>{web.title[locale]}</p>
        </div>
        <div data-a="web" className="mt-[10px]">
          <p className={`w-[280px] text-[11.5px] leading-[1.55] text-[#6f655a]`}>{web.sub[locale]}</p>
          <div className="mt-[12px] flex gap-[8px]">
            <span className="flex h-[28px] items-center rounded-full bg-[var(--accent)] px-[14px] text-[11px] font-semibold text-[#1d1712]">{web.primary[locale]}</span>
            <span className="flex h-[28px] items-center rounded-full border border-[rgba(29,23,18,0.18)] px-[14px] text-[11px] font-medium">{web.secondary[locale]}</span>
          </div>
        </div>
      </div>

      <div data-a="web" className="absolute end-[30px] top-[100px] h-[156px] w-[262px] overflow-hidden rounded-[14px]">
        <CupArt />
      </div>
      <div
        data-a="web"
        className="absolute end-[214px] top-[238px] flex h-[28px] items-center gap-[6px] rounded-full bg-white px-[11px] text-[10.5px] font-medium shadow-[0_10px_22px_-10px_rgba(29,23,18,0.45)]"
      >
        <Star className="h-[11px] w-[11px] fill-[var(--accent)] text-[var(--accent)]" />
        <bdi>{web.rating[locale]}</bdi>
      </div>
    </Layer>
  );
}

/** Product cards morph from web card (scene 1) into app list rows (scene 2). */
function SharedCards({ locale, dir }: { locale: DemoLocale; dir: "ltr" | "rtl" }) {
  return (
    <>
      {products.map((p) => (
        <div
          key={p.name.en}
          data-a="card"
          dir={dir}
          className={`absolute z-10 overflow-hidden border border-[rgba(29,23,18,0.08)] bg-white shadow-[0_12px_26px_-16px_rgba(29,23,18,0.5)] ${CREAM_INK}`}
          style={{ left: "50%", top: "50%", width: 184, height: 122, borderRadius: 12, opacity: 0, visibility: "hidden" }}
        >
          <div data-a="card-web" className="absolute start-0 top-0 h-[122px] w-[184px] p-[8px]">
            <div className="relative h-[62px] overflow-hidden rounded-[8px]" style={{ background: p.tone }}>
              <Bag scale={0.86} />
            </div>
            <div className="mt-[8px] flex items-end justify-between px-[3px]">
              <div>
                <p className="text-[11.5px] font-semibold leading-tight">{p.name[locale]}</p>
                <p className={`mt-[3px] text-[10.5px] ${CREAM_MUTED}`}>{currency(p.price, locale)}</p>
              </div>
              <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#1d1712] text-[#f5f0e8]">
                <Plus className="h-[12px] w-[12px]" strokeWidth={2.4} />
              </span>
            </div>
          </div>
          <div data-a="card-app" className="absolute start-0 top-0 flex h-[54px] w-[238px] items-center gap-[10px] px-[8px]" style={{ opacity: 0 }}>
            <div className="relative h-[38px] w-[38px] shrink-0 overflow-hidden rounded-[10px]" style={{ background: p.tone }}>
              <Bag scale={0.62} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11.5px] font-semibold leading-tight">{p.name[locale]}</p>
              <p className={`mt-[2px] text-[10px] ${CREAM_MUTED}`}>
                {app.weight[locale]} · {currency(p.price, locale)}
              </p>
            </div>
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[var(--accent)] text-[#1d1712]">
              <Plus className="h-[13px] w-[13px]" strokeWidth={2.4} />
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

/* ── Scene 2: mobile app ── */
function AppLayer({ locale, dir }: { locale: DemoLocale; dir: "ltr" | "rtl" }) {
  const tabIcons = [Home, Coffee, Receipt, User];
  return (
    <Layer w={272} h={540} dir={dir} className={CREAM_INK}>
      <div data-a="app" dir="ltr" className="absolute inset-x-[26px] top-[17px] flex h-[16px] items-center justify-between text-[11px] font-semibold">
        <span>9:41</span>
        <span className="flex items-center gap-[4px]">
          <Signal className="h-[12px] w-[12px]" strokeWidth={2.4} />
          <Wifi className="h-[12px] w-[12px]" strokeWidth={2.4} />
          <BatteryFull className="h-[14px] w-[14px]" strokeWidth={2} />
        </span>
      </div>
      <div data-a="island" className="absolute left-1/2 top-[13px] h-[24px] w-[84px] -translate-x-1/2 rounded-full bg-[#050505]" style={{ opacity: 0 }} />

      <div data-a="app" className="absolute inset-x-[18px] top-[56px] flex items-center justify-between">
        <div>
          <p className={`text-[10.5px] ${CREAM_MUTED}`}>{app.greet[locale]}</p>
          <p className="mt-[1px] text-[19px] font-bold leading-tight tracking-[-0.01em]">{app.title[locale]}</p>
        </div>
        <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#ffb27a,#e8661f)] text-[12px] font-bold">
          {locale === "ar" ? "س" : "S"}
        </span>
      </div>

      <div data-a="app" className="absolute inset-x-[17px] top-[106px] h-[100px] rounded-[18px] bg-[#1d1712] p-[13px] text-[#f5f0e8]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] text-[rgba(245,240,232,0.55)]">
              {app.orderNo[locale]} <bdi dir="ltr">#1048</bdi>
            </p>
            <p className="mt-[2px] text-[15px] font-semibold">{app.ready[locale]}</p>
          </div>
          <span className="rounded-full bg-[var(--accent)] px-[8px] py-[3px] text-[9.5px] font-semibold text-[#1d1712]">{app.status[locale]}</span>
        </div>
        <div className="mt-[14px] flex gap-[4px]">
          {[1, 1, 0].map((on, i) => (
            <span key={i} className={`h-[4px] flex-1 rounded-full ${on ? "bg-[var(--accent)]" : "bg-[rgba(245,240,232,0.15)]"}`} />
          ))}
        </div>
        <div className="mt-[7px] flex justify-between text-[9px] text-[rgba(245,240,232,0.55)]">
          {app.steps[locale].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>

      <div data-a="app" className="absolute inset-x-[18px] top-[222px] flex items-center justify-between">
        <p className="text-[12px] font-semibold">{app.popular[locale]}</p>
        <p className="text-[10px] font-medium text-[var(--accent)]">{app.seeAll[locale]}</p>
      </div>

      <div data-a="app" className="absolute inset-x-0 bottom-0 h-[66px] border-t border-[rgba(29,23,18,0.07)] bg-[rgba(255,255,255,0.65)]">
        <div className="flex justify-around px-[12px] pt-[9px]">
          {app.tabs[locale].map((label, i) => {
            const Icon = tabIcons[i];
            return (
              <span key={label} className={`flex w-[52px] flex-col items-center gap-[3px] text-[9px] ${i === 0 ? "font-semibold text-[var(--accent)]" : "text-[#9a8f83]"}`}>
                <Icon className="h-[17px] w-[17px]" strokeWidth={i === 0 ? 2.4 : 2} />
                {label}
              </span>
            );
          })}
        </div>
        <span className="absolute bottom-[8px] left-1/2 block h-[4px] w-[96px] -translate-x-1/2 rounded-full bg-[#1d1712]" />
      </div>

      <div
        data-a="notif"
        className="absolute inset-x-[12px] top-[46px] z-10 flex items-center gap-[10px] rounded-[16px] border border-[rgba(29,23,18,0.06)] bg-[rgba(255,255,255,0.96)] p-[10px] shadow-[0_16px_32px_-14px_rgba(29,23,18,0.5)]"
        style={{ opacity: 0 }}
      >
        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[var(--accent)]">
          <Coffee className="h-[17px] w-[17px] text-[#1d1712]" strokeWidth={2.2} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex justify-between text-[9px] uppercase tracking-[0.06em] text-[#9a8f83]">
            <span>{brand[locale]}</span>
            <span>{app.now[locale]}</span>
          </div>
          <p className="text-[11px] font-semibold leading-snug">{app.notifTitle[locale]}</p>
          <p className={`truncate text-[10px] ${CREAM_MUTED}`}>{app.notifBody[locale]}</p>
        </div>
      </div>
    </Layer>
  );
}

/* ── Scene 3: dashboard ── */
function DashLayer({ locale, dir }: { locale: DemoLocale; dir: "ltr" | "rtl" }) {
  const navIcons = [LayoutDashboard, ShoppingBag, Box, Users, Settings];
  const maxBar = Math.max(...dash.bars);
  return (
    <Layer w={660} h={450} dir={dir} className="text-[#edeae3]">
      <div data-a="dash" className="absolute bottom-0 start-0 top-[40px] flex w-[52px] flex-col items-center gap-[6px] border-e border-[rgba(237,234,227,0.06)] bg-[#0c0c0e] pt-[12px]">
        <span className="mb-[8px]">
          <Mark size={26} radius={8} />
        </span>
        {navIcons.map((Icon, i) => (
          <span key={i} className={`flex h-[32px] w-[32px] items-center justify-center rounded-[9px] ${i === 0 ? "bg-[rgba(237,234,227,0.07)] text-[#edeae3]" : "text-[#6f6b64]"}`}>
            <Icon className="h-[15px] w-[15px]" strokeWidth={2} />
          </span>
        ))}
        <span className="relative mt-auto mb-[14px] flex h-[32px] w-[32px] items-center justify-center rounded-[9px] text-[var(--accent)]">
          <span data-a="ai-nav" className="absolute inset-0 rounded-[9px] border border-[rgba(255,91,31,0.45)] bg-[rgba(255,91,31,0.14)]" style={{ opacity: 0 }} />
          <Sparkles className="relative h-[15px] w-[15px]" strokeWidth={2} />
        </span>
      </div>

      <div data-a="dash" className="absolute end-[18px] start-[70px] top-[52px] flex h-[28px] items-center justify-between">
        <p className="text-[15px] font-bold tracking-[-0.01em]">{dash.title[locale]}</p>
        <div className="flex items-center gap-[8px]">
          <span className="flex h-[24px] items-center gap-[5px] rounded-full border border-[rgba(237,234,227,0.1)] px-[10px] text-[10px] text-[#9a958c]">
            <CalendarDays className="h-[11px] w-[11px]" />
            {dash.range[locale]}
          </span>
          <span className="block h-[24px] w-[24px] rounded-full bg-[linear-gradient(135deg,#ffb27a,#e8661f)]" />
        </div>
      </div>

      {dash.kpis.map((kpi, i) => {
        const before = kpi.unitBefore && locale === "en";
        const unit = kpi.unit ? <span className={`text-[9px] ${DARK_MUTED}`}>{kpi.unit[locale]}</span> : null;
        return (
          <div key={kpi.label.en} data-a="dash" className={`absolute top-[90px] h-[62px] w-[134px] p-[10px] ${DARK_CARD}`} style={{ insetInlineStart: 70 + i * 146 }}>
            {i === 3 && (
              <span
                data-a="kpi-ring"
                className="pointer-events-none absolute -inset-px rounded-[12px] border border-[var(--accent)] shadow-[0_0_0_4px_rgba(255,91,31,0.12),0_0_24px_-4px_rgba(255,91,31,0.5)]"
                style={{ opacity: 0 }}
              />
            )}
            <p className={`text-[9.5px] ${DARK_MUTED}`}>{kpi.label[locale]}</p>
            <p className="mt-[9px] flex items-baseline gap-[4px] tabular-nums">
              {before && unit}
              <span data-a="kpi-val" className="text-[17px] font-semibold tracking-[-0.01em]">
                0
              </span>
              {!before && unit}
            </p>
            <span
              className={`absolute end-[9px] top-[9px] rounded-[5px] px-[5px] py-[1px] text-[9px] font-medium ${
                kpi.warn ? "bg-[rgba(255,91,31,0.13)] text-[#ff8a4c]" : "bg-[rgba(94,227,138,0.1)] text-[#5ee38a]"
              }`}
            >
              <bdi dir="ltr">{kpi.delta[locale]}</bdi>
            </span>
          </div>
        );
      })}

      <div data-a="dash" className={`absolute start-[70px] top-[164px] h-[136px] w-[342px] ${DARK_CARD}`}>
        <div className="flex items-center justify-between px-[12px] pt-[10px]">
          <p className="text-[10.5px] font-medium">{dash.chart[locale]}</p>
          <p className={`text-[9.5px] tabular-nums ${DARK_MUTED}`}>{dash.chartTotal[locale]}</p>
        </div>
        <div className="absolute inset-x-[14px] bottom-[24px] top-[38px]">
          {[0, 50, 100].map((t) => (
            <span key={t} className="absolute inset-x-0 block h-px bg-[rgba(237,234,227,0.05)]" style={{ top: `${t}%` }} />
          ))}
          <div className="absolute inset-0 flex items-end gap-[12px] px-[4px]">
            {dash.bars.map((v, j) => (
              <span
                key={j}
                data-a="bar-col"
                className="block flex-1 origin-bottom rounded-t-[4px]"
                style={{ height: `${v * 100}%`, transform: "scaleY(0)", background: v === maxBar ? "var(--accent)" : "rgba(237,234,227,0.16)" }}
              />
            ))}
          </div>
        </div>
        <div className={`absolute inset-x-[14px] bottom-[8px] flex gap-[12px] px-[4px] text-[8.5px] ${DARK_MUTED}`}>
          {dash.days[locale].map((d, j) => (
            <span key={j} className="flex-1 text-center">
              {d}
            </span>
          ))}
        </div>
      </div>

      <div data-a="dash" className={`absolute start-[424px] top-[164px] h-[136px] w-[218px] ${DARK_CARD}`}>
        <p className="px-[12px] pt-[10px] text-[10.5px] font-medium">{dash.top[locale]}</p>
        <div className="mt-[12px] space-y-[11px] px-[12px]">
          {dash.topRows.map((row, j) => (
            <div key={row.name.en}>
              <div className="flex justify-between text-[10px]">
                <span>{row.name[locale]}</span>
                <span className={`tabular-nums ${DARK_MUTED}`}>{row.pct}%</span>
              </div>
              <div className="mt-[5px] h-[4px] overflow-hidden rounded-full bg-[rgba(237,234,227,0.06)]">
                <span
                  data-a="top-fill"
                  className="block h-full origin-left rounded-full rtl:origin-right"
                  style={{ width: `${(row.pct / 38) * 100}%`, transform: "scaleX(0)", background: `rgba(255,91,31,${[1, 0.6, 0.38][j]})` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div data-a="dash" className={`absolute end-[18px] start-[70px] top-[312px] h-[122px] ${DARK_CARD}`}>
        <div className="flex items-center justify-between px-[12px] pb-[6px] pt-[10px]">
          <p className="text-[10.5px] font-medium">{dash.recent[locale]}</p>
          <p className="text-[9.5px] text-[var(--accent)]">{dash.viewAll[locale]}</p>
        </div>
        {dash.rows.map((row) => (
          <div
            key={row.id}
            data-a="row"
            className="mx-[12px] grid h-[22px] grid-cols-[56px_1fr_1fr_84px_76px] items-center border-t border-[rgba(237,234,227,0.05)] text-[10px]"
          >
            <span className={`font-mono text-[9.5px] ${DARK_MUTED}`}>
              <bdi dir="ltr">{row.id}</bdi>
            </span>
            <span className="truncate">{row.name[locale]}</span>
            <span className={`truncate ${DARK_MUTED}`}>{row.branch[locale]}</span>
            <span className="tabular-nums">{currency(row.amount, locale)}</span>
            <span className="justify-self-end">
              <span
                className={`rounded-full px-[7px] py-[2px] text-[9px] font-medium ${
                  row.paid ? "bg-[rgba(94,227,138,0.1)] text-[#5ee38a]" : "bg-[rgba(255,192,77,0.12)] text-[#ffc04d]"
                }`}
              >
                {row.paid ? dash.paid[locale] : dash.pending[locale]}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Layer>
  );
}

/* ── Scene 4: assistant card (hangs off the dashboard) ── */
function ChatCard({ locale, dir }: { locale: DemoLocale; dir: "ltr" | "rtl" }) {
  return (
    <div
      data-a="chat"
      dir={dir}
      className="absolute left-0 top-0 z-20 flex h-[350px] w-[300px] flex-col overflow-hidden rounded-[18px] border border-[rgba(237,234,227,0.12)] bg-[#141416] text-[#edeae3] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,0,0,0.4)]"
      style={{ opacity: 0, visibility: "hidden" }}
    >
      <div className="flex h-[52px] shrink-0 items-center gap-[10px] border-b border-[rgba(237,234,227,0.07)] px-[14px]">
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-[rgba(255,91,31,0.14)] text-[var(--accent)]">
          <Sparkles className="h-[15px] w-[15px]" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold leading-tight">{chat.title[locale]}</p>
          <p className={`mt-[2px] text-[9.5px] ${DARK_MUTED}`}>{chat.sub[locale]}</p>
        </div>
        <span className={`flex items-center gap-[5px] text-[9.5px] ${DARK_MUTED}`}>
          <span className="h-[6px] w-[6px] rounded-full bg-[var(--success)]" />
          {chat.online[locale]}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-end gap-[10px] overflow-hidden p-[14px]">
        <div data-a="chat-user" className="max-w-[230px] self-end rounded-[14px] rounded-ee-[4px] bg-[var(--accent)] px-[11px] py-[8px] text-[11px] leading-[1.45] text-[#0a0a0b]" style={{ display: "none" }}>
          {chat.user[locale]}
        </div>
        <div data-a="chat-reply" className="max-w-[252px] self-start rounded-[14px] rounded-es-[4px] bg-[rgba(237,234,227,0.07)] px-[11px] py-[9px] text-[11px] leading-[1.55]" style={{ display: "none" }}>
          <span data-a="chat-dots" className="flex h-[16px] items-center gap-[4px] px-[2px]">
            {[0, 160, 320].map((d) => (
              <span key={d} className="h-[5px] w-[5px] animate-pulse rounded-full bg-[#9a958c]" style={{ animationDelay: `${d}ms` }} />
            ))}
          </span>
          <span data-a="chat-reply-text" />
        </div>
        <div data-a="chat-po" className="rounded-[12px] border border-[rgba(237,234,227,0.1)] bg-[rgba(0,0,0,0.25)] p-[9px]" style={{ display: "none" }}>
          <div className="flex items-center gap-[9px]">
            <span className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-[rgba(237,234,227,0.06)]">
              <FileText className="h-[13px] w-[13px]" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[10.5px] font-semibold">{chat.po[locale]}</p>
              <p className={`text-[9.5px] ${DARK_MUTED}`}>{chat.poMeta[locale]}</p>
            </div>
          </div>
          <div className="mt-[8px] flex gap-[6px]">
            <span className="flex h-[24px] flex-1 items-center justify-center rounded-full border border-[rgba(237,234,227,0.15)] text-[10px]">{chat.review[locale]}</span>
            <span className="flex h-[24px] flex-[1.6] items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-semibold text-[#0a0a0b]">{chat.send[locale]}</span>
          </div>
        </div>
      </div>

      <div className="flex h-[46px] shrink-0 items-center gap-[8px] border-t border-[rgba(237,234,227,0.07)] px-[12px]">
        <p className="min-w-0 flex-1 truncate text-[10.5px]">
          <span data-a="chat-input" />
          <span data-a="chat-caret" className="inline-block h-[12px] w-[1.5px] translate-y-[2px] bg-[var(--accent)]" style={{ opacity: 0 }} />
          <span data-a="chat-placeholder" className="text-[#6f6b64]">
            {chat.placeholder[locale]}
          </span>
        </p>
        <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[#0a0a0b]">
          <ArrowUp className="h-[14px] w-[14px]" strokeWidth={2.4} />
        </span>
      </div>
    </div>
  );
}

/** The transforming canvas. Positioned and scaled by the engine (starts hidden until measured). */
export function Canvas({ locale }: { locale: DemoLocale }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <div
      data-a="rig"
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-10 h-0 w-0 origin-top-left select-none font-sans transition-opacity duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
      style={{ opacity: 0 }}
    >
      <div
        data-a="glow"
        className="absolute left-0 top-0 rounded-full"
        style={{ width: 780, height: 660, background: "radial-gradient(closest-side, rgba(255,91,31,0.16), rgba(255,91,31,0.05) 55%, transparent)" }}
      />
      <div
        data-a="panel"
        className="absolute left-0 top-0 isolate overflow-hidden border border-[rgba(237,234,227,0.14)] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.95),0_30px_60px_-30px_rgba(0,0,0,0.7)]"
        style={{ width: 560, height: 440, borderRadius: 16, backgroundColor: "#0e0e10", transform: "translate3d(-280px,-220px,0)" }}
      >
        <EditorLayer />
        <WebLayer locale={locale} dir={dir} />
        <AppLayer locale={locale} dir={dir} />
        <DashLayer locale={locale} dir={dir} />
        <SharedCards locale={locale} dir={dir} />
        <WindowBar />
        <div data-a="bezel" className="pointer-events-none absolute inset-0 z-30 rounded-[inherit]" />
      </div>
      <ChatCard locale={locale} dir={dir} />
    </div>
  );
}
