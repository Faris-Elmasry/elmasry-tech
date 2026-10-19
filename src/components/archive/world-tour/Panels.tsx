import type { CSSProperties, ReactNode } from "react";
import {
  Bike,
  CheckCheck,
  Clock3,
  Coffee,
  Lightbulb,
  Lock,
  MapPin,
  Moon,
  PackageX,
  Phone as PhoneIcon,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Sun,
  Wallet,
  Wifi,
} from "lucide-react";
import type { PanelKind } from "./layout";

/*
 * The floating "real-life moments" — a café's website on a laptop, an order
 * arriving on a phone, the owner's numbers on a tablet, a WhatsApp-style
 * chat. Real photos (Pexels, see public/images/demos/world/credits.json),
 * prices in EGP, big readable text, no technical words. Rendered as real DOM
 * inside the CSS3D layer, so text stays razor sharp at any distance. Sizes are
 * authored ~1.6x a normal UI because the panels are seen from afar.
 */

const IMG = "/images/demos/world";

type Bi = (en: string, ar: string) => string;

/** Decorative photo (background-image keeps it out of the a11y tree and lint-clean). */
function Photo({ src, className = "", style }: { src: string; className?: string; style?: CSSProperties }) {
  return <div aria-hidden="true" className={`bg-cover bg-center ${className}`} style={{ backgroundImage: `url(${IMG}/${src})`, ...style }} />;
}

function Glass({ children, radius = 26, style }: { children: ReactNode; radius?: number; style?: CSSProperties }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden text-[#edeae3]"
      style={{
        borderRadius: radius,
        border: "1px solid rgba(237,234,227,0.16)",
        background: "linear-gradient(180deg, rgba(36,36,40,0.97) 0%, rgba(20,20,22,0.96) 100%)",
        boxShadow: "0 50px 100px -40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Phone hardware: aluminium edge, side buttons, bezel, dynamic island, status bar. */
function Phone({ children, bg = "#111113", lightStatus = false }: { children: ReactNode; bg?: string; lightStatus?: boolean }) {
  return (
    <div
      className="relative h-full w-full rounded-[54px] p-[11px]"
      style={{
        background: "linear-gradient(150deg, #4a4a50 0%, #1a1a1d 22%, #0c0c0e 55%, #2c2c31 100%)",
        boxShadow: "0 60px 120px -40px rgba(0,0,0,0.95), inset 0 0 0 1.5px rgba(237,234,227,0.22), inset 0 0 0 4px #0b0b0d",
      }}
    >
      <span aria-hidden="true" className="absolute -left-[3px] top-[130px] h-14 w-[3px] rounded-l bg-[#3a3a3f]" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[170px] h-20 w-[3px] rounded-r bg-[#3a3a3f]" />
      <div className="relative h-full w-full overflow-hidden rounded-[44px] text-[#edeae3]" style={{ background: bg }}>
        <div className="absolute left-1/2 top-[12px] z-20 h-[30px] w-[100px] -translate-x-1/2 rounded-full bg-black" />
        <div
          className={`absolute inset-x-0 top-0 z-10 flex h-[54px] items-center justify-between px-8 text-[16px] font-semibold ${lightStatus ? "text-white drop-shadow" : ""}`}
          dir="ltr"
        >
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <Wifi className="h-[18px] w-[18px]" />
            <span className="h-[12px] w-[24px] rounded-[3px] border border-white/70 p-[1.5px]">
              <span className="block h-full w-[75%] rounded-[1.5px] bg-white" />
            </span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

/** Laptop: screen with a thin bezel and camera, plus the base seen from the front. */
function Laptop({ children, url }: { children: ReactNode; url: string }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <div
        className="relative w-full flex-1 rounded-t-[22px] p-[14px] pb-[18px]"
        style={{ background: "linear-gradient(180deg,#2a2a2e,#141416)", boxShadow: "0 60px 120px -40px rgba(0,0,0,0.95), inset 0 0 0 1.5px rgba(237,234,227,0.2)" }}
      >
        <span aria-hidden="true" className="absolute left-1/2 top-[5px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#3c3c42]" />
        <div className="relative h-full w-full overflow-hidden rounded-[6px] bg-[#f6f1ea] text-[#1f1a16]">
          <div className="flex h-[48px] items-center gap-4 border-b border-black/10 bg-[#e9e4dc] px-4" dir="ltr">
            <div className="flex gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-[#ff5f57]" />
              <span className="h-3.5 w-3.5 rounded-full bg-[#febc2e]" />
              <span className="h-3.5 w-3.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto flex h-[32px] w-[60%] items-center justify-center gap-2 rounded-lg bg-white text-[17px] text-[#6b645c]">
              <Lock className="h-4 w-4" /> {url}
            </div>
            <div className="w-[60px]" />
          </div>
          {children}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="relative h-[22px] w-[108%] rounded-b-[18px] rounded-t-[4px]"
        style={{ background: "linear-gradient(180deg,#5a5a60 0%,#2e2e33 45%,#18181b 100%)", boxShadow: "0 30px 50px -20px rgba(0,0,0,0.9)" }}
      >
        <span className="absolute left-1/2 top-0 h-[8px] w-[130px] -translate-x-1/2 rounded-b-[8px] bg-[#1d1d20]" />
      </div>
    </div>
  );
}

/** Tablet: even bezel, rounded corners. */
function Tablet({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative h-full w-full rounded-[40px] p-[18px]"
      style={{
        background: "linear-gradient(150deg, #3a3a40 0%, #141416 30%, #0c0c0e 70%, #26262b 100%)",
        boxShadow: "0 60px 120px -40px rgba(0,0,0,0.95), inset 0 0 0 1.5px rgba(237,234,227,0.2)",
      }}
    >
      <span aria-hidden="true" className="absolute left-1/2 top-[7px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#3c3c42]" />
      <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-[#121214] text-[#edeae3]">{children}</div>
    </div>
  );
}

function Stars({ size = 18 }: { size?: number }) {
  return (
    <span className="flex gap-0.5" dir="ltr">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} style={{ width: size, height: size }} className="fill-[#f5a623] text-[#f5a623]" />
      ))}
    </span>
  );
}

const egp = (t: Bi, n: string) => t(`${n} EGP`, `${n} ج.م`);

/* ───────────────────────── 0 Your idea ───────────────────────── */

function IdeaNote({ t }: { t: Bi }) {
  return (
    <div
      className="relative h-full w-full rounded-[10px] p-7 text-[#2a1d0b]"
      style={{
        background: "linear-gradient(170deg, #fff3c4 0%, #f6dd8c 100%)",
        boxShadow: "0 50px 100px -40px rgba(0,0,0,0.9), 0 0 60px -20px rgba(255,180,80,0.35)",
      }}
    >
      <span aria-hidden="true" className="absolute left-1/2 top-[-12px] h-6 w-24 -translate-x-1/2 rotate-[-3deg] bg-white/45" />
      <p className="flex items-center gap-2.5 text-[23px] font-bold">
        <Lightbulb className="h-7 w-7 text-[#d9400d]" /> {t("My idea:", "فكرتي:")}
      </p>
      <p className="mt-3 text-[29px] font-semibold leading-[1.3]">
        {t("Patients book at my clinic from their phone.", "المرضى يحجزوا في عيادتي من موبايلهم.")}
      </p>
    </div>
  );
}

/* ───────────────────────── 1 Website ───────────────────────── */

function WebShop({ t, ar }: { t: Bi; ar: boolean }) {
  return (
    <Laptop url="cafenour.com">
      <div className="flex items-center justify-between px-7 pt-4">
        <p className="flex items-center gap-2 text-[23px] font-bold">
          <Coffee className="h-6 w-6 text-[#d9400d]" /> {t("Café Nour", "كافيه نور")}
        </p>
        <p className="flex gap-6 text-[18px] text-[#6b645c]">
          <span>{t("Menu", "المنيو")}</span>
          <span>{t("Branches", "الفروع")}</span>
        </p>
      </div>
      <div className="grid grid-cols-[1fr_1.08fr] gap-6 px-7 pt-5">
        <div className="pt-2">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#e3f5e8] px-3 py-1.5 text-[16px] font-semibold text-[#1d7a3c]">
            <Clock3 className="h-4 w-4" /> {t("Open now · delivery in 30 min", "مفتوح دلوقتي · توصيل في 30 دقيقة")}
          </p>
          <h3 className={`mt-4 text-[44px] font-bold leading-[1.08] ${ar ? "font-sans" : "font-display tracking-[-0.02em]"}`}>
            {t("Fresh coffee, to your door.", "قهوة طازة لحد باب البيت.")}
          </h3>
          <span className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#ff5b1f] px-8 py-4 text-[25px] font-bold text-white shadow-[0_12px_34px_-8px_rgba(255,91,31,0.85)]">
            <ShoppingBag className="h-6 w-6" /> {t("Order now", "اطلب دلوقتي")}
          </span>
          <p className="mt-4 flex items-center gap-2 text-[17px] text-[#6b645c]">
            <span className="font-bold text-[#1f1a16]">4.8</span> <Stars size={16} /> {t("· 320 reviews", "· 320 تقييم")}
          </p>
        </div>
        <div className="relative">
          <Photo src="cafe-latte.webp" className="h-[350px] rounded-[20px]" />
          <span className="absolute bottom-4 start-4 rounded-2xl bg-white/95 px-4 py-2.5 text-[19px] font-bold shadow-lg">
            {t("Latte", "لاتيه")} · <span className="text-[#d9400d]">{egp(t, "65")}</span>
          </span>
        </div>
      </div>
    </Laptop>
  );
}

function WebSearch({ t }: { t: Bi }) {
  return (
    <Glass radius={24} style={{ background: "#ffffff", color: "#1d1d1f", border: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="p-5">
        <div className="flex h-[54px] items-center gap-3 rounded-full border border-black/10 bg-white px-5 text-[21px] shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
          <Search className="h-5 w-5 text-[#6b6b6b]" />
          {t("coffee near me", "كافيه قريب مني")}
        </div>
        <div className="mt-4 flex gap-4 px-1">
          <Photo src="croissants.webp" className="h-[104px] w-[104px] shrink-0 rounded-2xl" />
          <div className="min-w-0 flex-1">
            <p className="text-[25px] font-bold leading-tight text-[#1a0dab]">{t("Café Nour", "كافيه نور")}</p>
            <p className="mt-1 flex items-center gap-2 text-[17px] text-[#4d5156]">
              <span className="font-bold text-[#1d1d1f]">4.8</span> <Stars size={16} />
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[17px] font-semibold text-[#188038]">
              <MapPin className="h-4 w-4" /> {t("Open now · 5 min away", "مفتوح · على بعد 5 دقايق")}
            </p>
          </div>
        </div>
        <span className="mt-4 flex h-[48px] items-center justify-center rounded-full bg-[#ff5b1f] text-[20px] font-bold text-white">
          {t("Order online", "اطلب أونلاين")}
        </span>
      </div>
    </Glass>
  );
}

/* ───────────────────────── 2 App ───────────────────────── */

/** A snapshot of the customer, ordering from her sofa — the "real life" side of the app. */
function AppPhoto({ t }: { t: Bi }) {
  return (
    <div className="relative h-full w-full rounded-[8px] bg-[#fbf8f2] p-[14px] pb-0" style={{ boxShadow: "0 50px 100px -40px rgba(0,0,0,0.95)" }}>
      <Photo src="customer-on-sofa.webp" className="h-[318px] w-full rounded-[3px]" />
      <p className="flex h-[84px] items-center justify-center text-center text-[25px] font-semibold leading-tight text-[#2a2420]">
        {t("Mona ordered from her sofa", "منى طلبت وهي قاعدة في البيت")}
      </p>
    </div>
  );
}

function AppPhone({ t }: { t: Bi }) {
  return (
    <Phone lightStatus>
      <Photo src="croissants.webp" className="absolute inset-x-0 top-0 h-[300px]" />
      <div className="absolute inset-x-0 top-[200px] h-[100px]" style={{ background: "linear-gradient(to bottom, transparent, #111113)" }} />
      <div className="absolute inset-x-0 top-[262px] px-5">
        <p className="text-[17px] text-[#b5b0a7]">{t("Café Nour · your order", "كافيه نور · طلبك")}</p>
        <p className="mt-1 text-[21px] font-semibold">{t("2 lattes + 2 croissants", "2 لاتيه + 2 كرواسون")}</p>
        <div className="mt-4 rounded-[24px] bg-[#1c1c1f] p-5">
          <p className="text-[26px] font-bold leading-tight">{t("Your order is on the way", "طلبك في الطريق")}</p>
          <p className="mt-2 text-[54px] font-bold leading-none text-[#ff8a4c]">
            12 <span className="text-[24px] font-semibold text-[#9a958c]">{t("min", "دقيقة")}</span>
          </p>
          <div className="mt-4 flex items-center gap-1.5" dir="ltr">
            {[1, 1, 1, 0].map((on, i) => (
              <span key={i} className={`h-2.5 flex-1 rounded-full ${on ? "bg-[#ff5b1f]" : "bg-white/12"}`} />
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/[0.08]">
              <Bike className="h-6 w-6" />
            </span>
            <span className="flex-1 text-[19px] font-semibold">{t("Omar is bringing it", "عمر جايبهولك")}</span>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#34c759] text-[#0a0a0b]">
              <PhoneIcon className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>
    </Phone>
  );
}

function AppNotify({ t }: { t: Bi }) {
  return (
    <div
      className="flex h-full w-full items-center gap-4 rounded-[30px] px-5 text-[#edeae3]"
      style={{
        background: "rgba(48,48,52,0.97)",
        border: "1px solid rgba(237,234,227,0.18)",
        boxShadow: "0 40px 90px -30px rgba(0,0,0,0.9), 0 0 50px -16px rgba(255,91,31,0.5)",
      }}
    >
      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-[18px] bg-[#ff5b1f] text-[#0a0a0b]">
        <Coffee className="h-8 w-8" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center justify-between text-[16px] text-[#b5b0a7]">
          <span>{t("Café Nour", "كافيه نور")}</span>
          <span>{t("now", "دلوقتي")}</span>
        </p>
        <p className="text-[24px] font-bold leading-tight">{t("Your order is on the way!", "طلبك في الطريق!")}</p>
        <p className="text-[18px] text-[#b5b0a7]">{t("Arriving in 12 minutes", "هيوصلك خلال 12 دقيقة")}</p>
      </div>
    </div>
  );
}

/* ───────────────────────── 3 One screen ───────────────────────── */

function BizToday({ t }: { t: Bi }) {
  const tiles = [
    { Icon: Wallet, label: t("Sales today", "مبيعات النهارده"), value: "18,450", unit: t("EGP", "ج.م"), tone: "#ff8a4c" },
    { Icon: ShoppingBag, label: t("Orders", "عدد الطلبات"), value: "126", unit: "", tone: "#5ee38a" },
    { Icon: PackageX, label: t("Running low", "قرب يخلص"), value: "3", unit: t("items", "أصناف"), tone: "#ffc04d" },
  ];
  const bars = [52, 64, 48, 80, 70, 58, 96];
  const days = [t("Sat", "سبت"), t("Sun", "حد"), t("Mon", "اتنين"), t("Tue", "تلات"), t("Wed", "أربع"), t("Thu", "خميس"), t("Fri", "جمعة")];
  return (
    <Tablet>
      <div className="p-8">
        <div className="flex items-center gap-4">
          <Photo src="shop-owner.webp" className="h-[64px] w-[64px] shrink-0 rounded-full ring-2 ring-[#ff8a4c]" />
          <div className="flex-1">
            <p className="text-[30px] font-bold leading-tight">{t("Good morning, Hassan", "صباح الخير يا حسن")}</p>
            <p className="text-[19px] text-[#b5b0a7]">{t("Here’s your shop today", "ده محلك النهارده")}</p>
          </div>
          <p className="flex items-center gap-2 text-[17px] text-[#b5b0a7]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#5ee38a]" /> {t("live", "مباشر")}
          </p>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {tiles.map(({ Icon, label, value, unit, tone }) => (
            <div key={label} className="rounded-[22px] bg-white/[0.06] p-5">
              <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: `${tone}22`, color: tone }}>
                <Icon className="h-8 w-8" />
              </span>
              <p className="mt-3 text-[21px] text-[#d6d1c8]">{label}</p>
              <p className="mt-1 text-[54px] font-bold leading-none">
                {value} <span className="text-[21px] font-semibold text-[#9a958c]">{unit}</span>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[20px] font-semibold text-[#d6d1c8]">{t("Sales this week", "مبيعات الأسبوع ده")}</p>
        <div className="mt-3 flex h-[96px] items-end gap-3">
          {bars.map((b, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <span className={`w-full rounded-lg ${i === 6 ? "bg-[#ff5b1f]" : "bg-white/[0.16]"}`} style={{ height: b * 0.74 }} />
              <span className={`text-[15px] ${i === 6 ? "font-bold text-[#ff8a4c]" : "text-[#9a958c]"}`}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </Tablet>
  );
}

/* ───────────────────────── 4 Assistant ───────────────────────── */

function AiChat({ t }: { t: Bi }) {
  const inBubble = "max-w-[84%] self-start rounded-[18px] rounded-ss-[4px] bg-[#202c33] px-3.5 py-2.5";
  const outBubble = "max-w-[86%] self-end rounded-[18px] rounded-se-[4px] bg-[#005c4b] px-3.5 py-2.5";
  const time = (v: string, read = false) => (
    <span className="mt-0.5 flex items-center justify-end gap-1 text-[13px] text-white/55" dir="ltr">
      {v}
      {read ? <CheckCheck className="h-4 w-4 text-[#53bdeb]" /> : null}
    </span>
  );
  const tag = (
    <span className="mb-0.5 flex items-center gap-1 text-[13px] font-semibold text-[#7ee0c3]">
      <Sparkles className="h-3.5 w-3.5" /> {t("Your smart assistant", "مساعدك الذكي")}
    </span>
  );
  return (
    <Phone bg="#0b141a">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 bg-[#1f2c34] px-4 pb-3 pt-[60px]">
          <Photo src="customer-avatar.webp" className="h-12 w-12 shrink-0 rounded-full" />
          <div>
            <p className="text-[20px] font-bold leading-tight">{t("Ahmed", "أحمد")}</p>
            <p className="text-[15px] text-[#8696a0]">{t("customer · online", "عميل · متصل")}</p>
          </div>
        </div>
        <div
          className="flex flex-1 flex-col gap-2.5 px-3 py-4 text-[18px] leading-snug text-[#e9edef]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        >
          <div className={inBubble}>
            {t("Hi! How much is a large latte?", "السلام عليكم، اللاتيه الكبير بكام؟")}
            {time(t("11:42 PM", "11:42 م"))}
          </div>
          <div className={outBubble}>
            {tag}
            {t("A large latte is 65 EGP. Shall we send you one?", "اللاتيه الكبير بـ 65 جنيه. تحب نبعتلك واحد؟")}
            {time(t("11:42 PM", "11:42 م"), true)}
          </div>
          <div className={inBubble}>
            {t("Yes please, same address.", "أيوه لو سمحت، نفس العنوان.")}
            {time(t("11:43 PM", "11:43 م"))}
          </div>
          <div className={outBubble}>
            {tag}
            {t("Done! It will reach you in about 20 minutes.", "تمام! هيوصلك خلال 20 دقيقة تقريبًا.")}
            {time(t("11:43 PM", "11:43 م"), true)}
          </div>
        </div>
        <div className="flex items-center gap-3 bg-[#1f2c34] px-3 pb-7 pt-3">
          <span className="flex h-[46px] flex-1 items-center rounded-full bg-[#2a3942] px-5 text-[17px] text-[#8696a0]">{t("Message", "اكتب رسالة")}</span>
        </div>
      </div>
    </Phone>
  );
}

function Ai247({ t }: { t: Bi }) {
  return (
    <Glass radius={24}>
      <div className="flex h-full flex-col justify-center gap-2.5 px-6">
        <p className="flex items-center gap-3 text-[17px] font-semibold text-[#ff8a4c]">
          <Moon className="h-6 w-6" /> <span className="h-px flex-1 bg-white/15" /> <Sun className="h-6 w-6" />
        </p>
        <p className="text-[26px] font-bold leading-tight">{t("Replied at 11:42 PM", "رد الساعة 11:42 بالليل")}</p>
        <p className="text-[19px] text-[#b5b0a7]">{t("…while you were asleep.", "…وإنت نايم.")}</p>
      </div>
    </Glass>
  );
}

/** One floating panel's UI. Pure markup, no hooks — safe in portals and static layouts. */
export function PanelView({ kind, ar }: { kind: PanelKind; ar: boolean }) {
  const t: Bi = (en, arText) => (ar ? arText : en);
  switch (kind) {
    case "idea-note":
      return <IdeaNote t={t} />;
    case "web-shop":
      return <WebShop t={t} ar={ar} />;
    case "web-search":
      return <WebSearch t={t} />;
    case "app-photo":
      return <AppPhoto t={t} />;
    case "app-phone":
      return <AppPhone t={t} />;
    case "app-notify":
      return <AppNotify t={t} />;
    case "biz-today":
      return <BizToday t={t} />;
    case "ai-chat":
      return <AiChat t={t} />;
    case "ai-247":
      return <Ai247 t={t} />;
  }
}
