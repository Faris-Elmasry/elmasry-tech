import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Lock, Package, Plus, ShoppingBag, Star, TrendingUp, Truck, Wallet } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import type { Locale } from "@/lib/site";
import { dash, money, photos, web } from "./copy";

/*
 * Laptop screen UIs, authored at SCREEN_W (640 px) wide and ~396 px tall, then
 * laid out at their real size with CSS zoom by the 2D overlay. Few, big,
 * obvious elements: a shop owner should recognise them from across the room.
 */

const Arrow = ({ ar, className }: { ar: boolean; className?: string }) => (ar ? <ArrowLeft className={className} /> : <ArrowRight className={className} />);

export function BootScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[14px] bg-black text-[#edeae3]">
      <LogoMark className="h-[56px] w-[56px]" />
      <span dir="ltr" className="font-display text-[20px] font-bold tracking-tight">
        elmasry<span className="text-[#ff5b1f]">/</span>tech
      </span>
      <span className="mt-[6px] h-[4px] w-[120px] overflow-hidden rounded-full bg-white/10">
        <span data-k="bootBar" className="block h-full w-full origin-left bg-[#ff5b1f]" style={{ transform: "scaleX(0)" }} />
      </span>
    </div>
  );
}

export function WebsiteScreen({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <div dir={ar ? "rtl" : "ltr"} className="flex h-full flex-col bg-[#f7f3ec] font-sans text-[#1b1714]">
      {/* Browser bar */}
      <div dir="ltr" className="relative flex h-[30px] shrink-0 items-center gap-[6px] border-b border-black/[0.06] bg-[#ebe6de] px-[12px]">
        <span className="h-[9px] w-[9px] rounded-full bg-black/15" />
        <span className="h-[9px] w-[9px] rounded-full bg-black/15" />
        <span className="h-[9px] w-[9px] rounded-full bg-black/15" />
        <span className="absolute left-1/2 top-1/2 flex h-[20px] w-[220px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[5px] rounded-[6px] bg-white text-[13px] text-black/60">
          <Lock className="h-[10px] w-[10px]" strokeWidth={2.5} />
          {web.url}
        </span>
      </div>

      <div data-k="webViewport" className="relative min-h-0 flex-1 overflow-hidden">
        <div data-k="webPage" className="absolute inset-x-0 top-0">
          {/* Nav */}
          <div className="flex h-[54px] items-center justify-between px-[26px]">
            <span dir="ltr" className="flex items-center gap-[8px] text-[19px] font-bold tracking-[-0.02em]">
              <span className="h-[18px] w-[18px] rounded-full bg-[#ff5b1f]" />
              Ember
            </span>
            <nav className="flex gap-[22px] text-[14px] text-black/60">
              {web.nav[locale].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </nav>
            <span className="flex h-[32px] items-center gap-[6px] rounded-full bg-[#1b1714] px-[14px] text-[13px] font-semibold text-white">
              <ShoppingBag className="h-[14px] w-[14px]" />
              {web.cart[locale]} · 2
            </span>
          </div>

          {/* Hero */}
          <div className="grid grid-cols-[1.08fr_1fr] items-center gap-[22px] px-[26px] pt-[4px]">
            <div>
              <span className="inline-flex h-[26px] items-center rounded-full bg-[#ff5b1f]/12 px-[12px] text-[13px] font-semibold text-[#c2410c]">{web.tag[locale]}</span>
              <h3 className={`mt-[12px] font-bold ${ar ? "text-[30px] leading-[1.35]" : "text-[31px] leading-[1.08] tracking-[-0.03em]"}`}>{web.title[locale]}</h3>
              <p className="mt-[10px] text-[14px] leading-[1.55] text-black/60">{web.sub[locale]}</p>
              <div className="mt-[18px] flex items-center gap-[14px]">
                <span className="flex h-[46px] items-center gap-[8px] rounded-full bg-[#ff5b1f] px-[22px] text-[16px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(255,91,31,.9)]">
                  {web.order[locale]}
                  <Arrow ar={ar} className="h-[16px] w-[16px]" />
                </span>
                <span className="text-[15px] font-semibold">{web.from[locale]}</span>
              </div>
              <div className="mt-[14px] flex items-center gap-[6px] text-[13px] text-black/60">
                <span className="flex text-[#ff8a1f]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-[13px] w-[13px]" fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                {web.rating[locale]}
              </div>
            </div>
            <div className="relative h-[262px] overflow-hidden rounded-[20px] shadow-[0_20px_40px_-20px_rgba(0,0,0,.45)]">
              <Image src={photos.webHero} alt="" fill sizes="300px" unoptimized loading="eager" fetchPriority="low" className="object-cover" />
              <span className="absolute bottom-[12px] start-[12px] flex h-[34px] items-center gap-[7px] rounded-full bg-white px-[13px] text-[13px] font-semibold shadow-[0_8px_20px_-8px_rgba(0,0,0,.5)]">
                <Truck className="h-[15px] w-[15px] text-[#ff5b1f]" />
                {web.delivery[locale]}
              </span>
            </div>
          </div>

          {/* Products */}
          <div className="mt-[30px] px-[26px] pb-[26px]">
            <h4 className="text-[20px] font-bold tracking-[-0.01em]">{web.best[locale]}</h4>
            <div className="mt-[12px] grid grid-cols-3 gap-[14px]">
              {web.products.map((p) => (
                <div key={p.name.en} className="overflow-hidden rounded-[16px] bg-white shadow-[0_10px_24px_-16px_rgba(0,0,0,.35)]">
                  <div className="relative h-[112px]">
                    <Image src={p.img} alt="" fill sizes="190px" unoptimized loading="eager" fetchPriority="low" className="object-cover" />
                  </div>
                  <div className="flex items-center justify-between gap-[8px] p-[12px]">
                    <div className="min-w-0">
                      <div className="truncate text-[15px] font-bold">{p.name[locale]}</div>
                      <div className="mt-[2px] text-[14px] text-black/60">{money(p.price, locale)}</div>
                    </div>
                    <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#ff5b1f] text-white">
                      <Plus className="h-[17px] w-[17px]" strokeWidth={2.6} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardScreen({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const icons = [Wallet, TrendingUp, Package];
  return (
    <div dir={ar ? "rtl" : "ltr"} className="flex h-full flex-col gap-[14px] bg-[#0f0f11] p-[20px] font-sans text-[#edeae3]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-[#ff5b1f] text-[15px] font-bold text-[#0a0a0b]">E</span>
          <span className="text-[22px] font-bold tracking-[-0.01em]">{dash.title[locale]}</span>
        </div>
        <span className="flex h-[32px] items-center gap-[7px] rounded-full border border-white/10 px-[13px] text-[13px] text-white/70">
          <Calendar className="h-[14px] w-[14px]" />
          {dash.date[locale]}
        </span>
      </div>

      {/* Three big numbers */}
      <div className="grid grid-cols-3 gap-[12px]">
        {dash.tiles.map((t, i) => {
          const Icon = icons[i];
          const warn = t.tone === "warn";
          return (
            <div key={t.label.en} className={`rounded-[16px] border p-[14px] ${warn ? "border-[#ff5b1f]/40 bg-[#ff5b1f]/[0.08]" : "border-white/[0.07] bg-[#18181b]"}`}>
              <div className="flex items-center gap-[8px] text-[13px] text-white/65">
                <span className={`flex h-[28px] w-[28px] items-center justify-center rounded-full ${warn ? "bg-[#ff5b1f] text-[#0a0a0b]" : "bg-white/[0.08] text-[#ff8a4c]"}`}>
                  <Icon className="h-[15px] w-[15px]" />
                </span>
                {t.label[locale]}
              </div>
              <div data-count={t.value} data-money={t.money ? "1" : ""} className="mt-[10px] text-[27px] font-bold leading-none tracking-[-0.02em] tabular-nums">
                {t.money ? money(t.value, locale) : t.value}
              </div>
              <div className={`mt-[8px] text-[13px] ${warn ? "text-[#ff8a4c]" : "text-[#5ee38a]"}`}>{t.note[locale]}</div>
            </div>
          );
        })}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.45fr_1fr] gap-[12px]">
        {/* Week chart */}
        <div className="flex flex-col rounded-[16px] border border-white/[0.07] bg-[#18181b] p-[14px]">
          <span className="text-[14px] font-semibold">{dash.week[locale]}</span>
          <div className="mt-[10px] flex min-h-0 flex-1 items-end gap-[10px]">
            {dash.bars.map((b, i) => (
              <span
                key={i}
                data-bar
                className="flex-1 origin-bottom rounded-[6px]"
                style={{ height: `${b * 100}%`, background: i === dash.bars.length - 1 ? "#ff5b1f" : "rgba(237,234,227,.16)" }}
              />
            ))}
          </div>
          <div className="mt-[6px] flex gap-[10px]">
            {dash.days[locale].map((d, i) => (
              <span key={d} className={`flex-1 text-center text-[13px] ${i === 6 ? "font-semibold text-[#ff8a4c]" : "text-white/45"}`}>
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Running low */}
        <div className="flex flex-col rounded-[16px] border border-white/[0.07] bg-[#18181b] p-[14px]">
          <span className="text-[14px] font-semibold">{dash.low[locale]}</span>
          <div className="mt-[8px] flex flex-1 flex-col justify-around">
            {dash.stock.map((it) => (
              <div key={it.name.en} data-row className="flex items-center gap-[10px]">
                <span className="relative h-[36px] w-[36px] shrink-0 overflow-hidden rounded-[10px]">
                  <Image src={it.img} alt="" fill sizes="40px" unoptimized loading="eager" fetchPriority="low" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1 truncate text-[14px]">{it.name[locale]}</span>
                <span className="rounded-full bg-[#ff5b1f]/15 px-[9px] py-[3px] text-[13px] font-semibold text-[#ff8a4c]">
                  {dash.left[locale]} {it.left}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
