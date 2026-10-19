import Image from "next/image";
import { ArrowLeft, BatteryFull, CheckCheck, ChevronLeft, ChevronRight, CircleCheck, House, Mic, Moon, Phone, Receipt, Signal, Sparkles, User, UtensilsCrossed, Wifi } from "lucide-react";
import type { Locale } from "@/lib/site";
import { app, chat, money, photos } from "./copy";

/* Phone UIs: authored for a 300 × 640 screen, laid out at real size via zoom on the phone. */

function StatusBar({ time = "9:41" }: { time?: string }) {
  return (
    <div dir="ltr" className="flex h-[48px] shrink-0 items-center justify-between px-[26px] pt-[6px] text-[14px] font-semibold text-[#edeae3]">
      <span className="tabular-nums">{time}</span>
      <span className="flex items-center gap-[5px]">
        <Signal className="h-[14px] w-[14px]" strokeWidth={2.4} />
        <Wifi className="h-[14px] w-[14px]" strokeWidth={2.4} />
        <BatteryFull className="h-[17px] w-[17px]" strokeWidth={2} />
      </span>
    </div>
  );
}

/** A tiny street map with the delivery route; the route draws and the rider moves with scroll. */
function DeliveryMap() {
  return (
    <div className="relative h-[118px] overflow-hidden rounded-[16px] bg-[#1d1d21]">
      <svg viewBox="0 0 260 118" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g stroke="rgba(237,234,227,.09)" strokeWidth="9" fill="none" strokeLinecap="round">
          <path d="M-10 30 H270" />
          <path d="M-10 86 H270" />
          <path d="M60 -10 V130" />
          <path d="M170 -10 V130" />
          <path d="M120 30 L230 120" />
        </g>
        <path d="M30 100 C60 100 60 86 90 86 L170 86 C170 60 170 50 200 30 L232 30" stroke="rgba(255,91,31,.25)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path
          data-k="route"
          d="M30 100 C60 100 60 86 90 86 L170 86 C170 60 170 50 200 30 L232 30"
          stroke="#ff5b1f"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          pathLength={1}
          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
        />
        <circle cx="232" cy="30" r="9" fill="#edeae3" />
        <circle cx="232" cy="30" r="4" fill="#0f0f11" />
        <circle data-k="rider" cx="30" cy="100" r="8" fill="#ff5b1f" stroke="#0f0f11" strokeWidth="3" />
      </svg>
    </div>
  );
}

export function AppScreen({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const tabIcons = [House, UtensilsCrossed, Receipt, User];
  return (
    <div dir={ar ? "rtl" : "ltr"} className="relative flex h-full flex-col bg-[#0f0f11] font-sans text-[#edeae3]">
      <StatusBar />
      <div className="flex items-center justify-between px-[20px] pt-[6px]">
        <div>
          <div className="text-[21px] font-bold">{app.hello[locale]}</div>
          <div className="mt-[2px] text-[14px] text-white/55">{app.ask[locale]}</div>
        </div>
        <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#ff5b1f] text-[17px] font-bold text-[#0a0a0b]">{ar ? "س" : "S"}</span>
      </div>

      {/* One big product */}
      <div className="mx-[16px] mt-[16px] overflow-hidden rounded-[22px] bg-[#1a1a1d]">
        <div className="relative h-[190px]">
          <Image src={photos.appLatte} alt="" fill sizes="300px" unoptimized loading="eager" fetchPriority="low" className="object-cover" />
        </div>
        <div className="p-[16px]">
          <div className="flex items-baseline justify-between">
            <span className="text-[22px] font-bold">{app.name[locale]}</span>
            <span className="text-[19px] font-bold text-[#ff8a4c]">{money(app.price, locale)}</span>
          </div>
          <div className="mt-[2px] text-[14px] text-white/55">{app.desc[locale]}</div>
          <div data-k="appBtn" className="mt-[14px] flex h-[52px] items-center justify-center rounded-[16px] bg-[#ff5b1f] text-[17px] font-bold text-[#0a0a0b]">
            {app.order[locale]}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="absolute inset-x-0 bottom-0 h-[74px] border-t border-white/[0.07] bg-[#121214]">
        <div className="grid grid-cols-4 pt-[9px]">
          {app.tabs[locale].map((tab, i) => {
            const Icon = tabIcons[i];
            return (
              <span key={tab} className={`flex flex-col items-center gap-[3px] text-[12px] ${i === 0 ? "text-[#ff8a4c]" : "text-white/45"}`}>
                <Icon className="h-[21px] w-[21px]" strokeWidth={i === 0 ? 2.3 : 1.8} />
                {tab}
              </span>
            );
          })}
        </div>
        <span className="absolute bottom-[7px] left-1/2 h-[5px] w-[110px] -translate-x-1/2 rounded-full bg-white/70" />
      </div>

      {/* Order tracking sheet (slides up after "Order now") */}
      <div
        data-k="appSheet"
        className="absolute inset-x-0 bottom-0 rounded-t-[26px] border-t border-white/10 bg-[#151518] px-[18px] pb-[30px] pt-[12px] shadow-[0_-20px_40px_-10px_rgba(0,0,0,.8)]"
        style={{ transform: "translateY(105%)" }}
      >
        <span className="mx-auto block h-[5px] w-[40px] rounded-full bg-white/20" />
        <div className="mt-[12px] flex items-center justify-between">
          <span className="text-[18px] font-bold leading-tight">{app.onWay[locale]}</span>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-[#ff5b1f] px-[11px] py-[4px] text-[14px] font-bold text-[#0a0a0b]">{app.eta[locale]}</span>
        </div>
        <div className="mt-[12px]" dir="ltr">
          <DeliveryMap />
        </div>
        <div className="mt-[14px] grid grid-cols-3 gap-[6px]">
          {app.steps[locale].map((s) => (
            <div key={s}>
              <span className="block h-[6px] overflow-hidden rounded-full bg-white/10">
                <span data-step className="block h-full origin-left rounded-full bg-[#ff5b1f] rtl:origin-right" style={{ transform: "scaleX(0)" }} />
              </span>
              <span className="mt-[6px] block text-center text-[13px] text-white/70">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChatScreen({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const Back = ar ? ChevronRight : ChevronLeft;
  return (
    <div dir={ar ? "rtl" : "ltr"} className="relative flex h-full flex-col bg-[#0b141a] font-sans text-[#e9edef]">
      <div className="bg-[#1f2c34]">
        <StatusBar time={ar ? "11:48" : "11:48"} />
        <div className="flex items-center gap-[9px] px-[10px] pb-[11px] pt-[2px]">
          <Back className="h-[22px] w-[22px] text-[#e9edef]" />
          <span className="relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full">
            <Image src={photos.cafe} alt="" fill sizes="40px" unoptimized loading="eager" fetchPriority="low" className="object-cover" />
          </span>
          <div className="min-w-0 flex-1">
            <div dir="ltr" className={`text-[16px] font-semibold ${ar ? "text-end" : ""}`}>
              {chat.name}
            </div>
            <div className="flex items-center gap-[5px] text-[13px] text-[#8696a0]">
              <Sparkles className="h-[12px] w-[12px] text-[#00a884]" />
              {chat.status[locale]}
            </div>
          </div>
          <Phone className="h-[19px] w-[19px] text-[#aebac1]" />
        </div>
      </div>

      <div
        className="relative min-h-0 flex-1 overflow-hidden"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.035) 1px, transparent 1.2px)", backgroundSize: "14px 14px" }}
      >
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-[8px] px-[12px] pb-[12px]">
          <div className="mx-auto mb-[6px] flex max-w-[240px] items-center gap-[7px] rounded-[10px] bg-[#182229] px-[11px] py-[7px] text-[13px] leading-[1.35] text-[#ffd279]">
            <Moon className="h-[14px] w-[14px] shrink-0" />
            {chat.closed[locale]}
          </div>
          {chat.messages.map((m, i) => {
            const me = m.from === "me";
            return (
              <div key={i} data-msg={i} className={`flex max-w-[84%] ${me ? "self-end" : "self-start"}`} style={{ display: "none" }}>
                <div className={`rounded-[12px] px-[11px] pb-[6px] pt-[8px] text-[15.5px] leading-[1.4] ${me ? "rounded-se-[3px] bg-[#005c4b]" : "rounded-ss-[3px] bg-[#202c33]"}`}>
                  {!me && (
                    <span data-dots className="hidden h-[22px] items-center gap-[5px] px-[4px]">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="h-[8px] w-[8px] rounded-full bg-[#8696a0]" style={{ opacity: 0.45 + d * 0.25 }} />
                      ))}
                    </span>
                  )}
                  <span data-text data-full={m.text[locale]} />
                  <span data-meta className="ms-[8px] inline-flex translate-y-[3px] items-center gap-[3px] align-baseline text-[12px] text-white/55">
                    {chat.time[locale]}
                    {me && <CheckCheck className="h-[14px] w-[14px] text-[#53bdeb]" />}
                  </span>
                </div>
              </div>
            );
          })}
          {/* Order card attached to the last reply */}
          <div data-k="chatCard" className="flex w-[244px] items-center gap-[10px] self-start rounded-[12px] bg-[#202c33] p-[9px]" style={{ display: "none" }}>
            <span className="relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[9px]">
              <Image src={photos.latte} alt="" fill sizes="48px" unoptimized loading="eager" fetchPriority="low" className="object-cover" />
            </span>
            <div className="min-w-0 flex-1 whitespace-nowrap">
              <div className="text-[15px] font-semibold">{chat.card[locale]}</div>
              <div className="text-[14px] text-white/65">{money(chat.total, locale)}</div>
            </div>
            <span className="flex shrink-0 items-center whitespace-nowrap gap-[4px] rounded-full bg-[#00a884]/20 px-[8px] py-[3px] text-[13px] font-semibold text-[#25d366]">
              <CircleCheck className="h-[13px] w-[13px]" />
              {chat.onWay[locale]}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-[8px] bg-[#0b141a] px-[8px] pb-[28px] pt-[6px]">
        <span className="flex h-[44px] min-w-0 flex-1 items-center rounded-full bg-[#1f2c34] px-[16px]">
          <span data-k="chatInput" data-placeholder={chat.input[locale]} className="truncate text-[15px] text-[#8696a0]">
            {chat.input[locale]}
          </span>
        </span>
        <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#00a884] text-[#0b141a]">
          <span data-k="chatMic">
            <Mic className="h-[20px] w-[20px]" />
          </span>
          <span data-k="chatSend" className="hidden">
            <ArrowLeft className={`h-[20px] w-[20px] ${ar ? "" : "rotate-180"}`} />
          </span>
        </span>
      </div>
      <span className="absolute bottom-[8px] left-1/2 h-[5px] w-[110px] -translate-x-1/2 rounded-full bg-white/60" />
    </div>
  );
}
