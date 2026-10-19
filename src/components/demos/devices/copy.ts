import type { Locale } from "@/lib/site";

/**
 * Bilingual strings for the "scroll-built product" demo. Plain words on
 * purpose: a shop owner with no tech background should get every scene at a
 * glance. Sample brand ("Ember") and people are fictional.
 */
export type L = Record<Locale, string>;

export const hero = {
  // Keyword line (rendered inside the H1, above the big creative line).
  label: { en: "Software company in Egypt · Elmasry Tech", ar: "شركة برمجة في مصر · Elmasry Tech" },
  title: { en: "We build the software your business runs on.", ar: "بنبني البرامج اللي شغلك ماشي عليها." },
  sub: {
    en: "A Cairo software company: websites, apps, shop systems and AI assistants.",
    ar: "شركة برمجة من القاهرة: موقع، تطبيق، سيستم لمحلك، ومساعد ذكي.",
  },
  cta: { en: "Start a project", ar: "ابدأ مشروعك" },
  hint: { en: "Scroll to see it built", ar: "انزل لتحت وشوف" },
} satisfies Record<string, L>;

export type Scene = { key: string; label: L; title: L; line: L };

export const scenes: Scene[] = [
  {
    key: "web",
    label: { en: "Website", ar: "موقع" },
    title: { en: "A website that brings you customers.", ar: "موقعك اللي بيجيبلك زباين." },
    line: {
      en: "People find you on Google, see your products and prices, and order in a minute.",
      ar: "الناس تلاقيك على جوجل، تشوف منتجاتك وأسعارك، وتطلب في دقيقة.",
    },
  },
  {
    key: "mobile",
    label: { en: "Mobile app", ar: "تطبيق موبايل" },
    title: { en: "Your customers order from their phone.", ar: "عملاءك يطلبوا من موبايلهم." },
    line: {
      en: "An app with your name on it: they order, pay and follow the delivery to their door.",
      ar: "تطبيق باسمك على موبايل كل عميل: يطلب، يدفع، ويتابع الطلب لحد باب البيت.",
    },
  },
  {
    key: "systems",
    label: { en: "Shop system", ar: "سيستم المحل" },
    title: { en: "See your profit and stock on one screen.", ar: "تعرف مكسبك وبضاعتك من شاشة واحدة." },
    line: {
      en: "Today’s sales, your profit and what’s running low — all in front of you, live.",
      ar: "مبيعات النهارده، المكسب، والبضاعة اللي قربت تخلص — كله قدامك لحظة بلحظة.",
    },
  },
  {
    key: "ai",
    label: { en: "AI assistant", ar: "مساعد ذكي" },
    title: { en: "An assistant that answers customers while you sleep.", ar: "مساعد بيرد على زباينك وأنت نايم." },
    line: {
      en: "It answers questions and takes orders on WhatsApp and your website, 24 hours a day.",
      ar: "بيرد على الأسئلة وياخد الطلبات على واتساب وموقعك، 24 ساعة في اليوم.",
    },
  },
];

export const closing = {
  label: { en: "Your turn", ar: "دورك" },
  title: { en: "Have an idea? Let’s build it together.", ar: "عندك فكرة؟ يلا نبنيها سوا." },
  sub: {
    en: "Tell us what you need. We reply within one working day with a clear plan and a price.",
    ar: "احكيلنا محتاج إيه، ونرد عليك خلال يوم عمل بخطة واضحة وسعر.",
  },
  primary: { en: "Start a project", ar: "ابدأ مشروعك" },
  secondary: { en: "See our work", ar: "شوف شغلنا" },
} satisfies Record<string, L>;

/* ── Screen content ── */

const IMG = "/images/demos/devices";
export const photos = {
  webHero: `${IMG}/web-hero.webp`,
  latte: `${IMG}/latte.webp`,
  croissant: `${IMG}/croissant.webp`,
  iced: `${IMG}/iced-latte.webp`,
  appLatte: `${IMG}/app-latte.webp`,
  beans: `${IMG}/beans.webp`,
  cake: `${IMG}/cake.webp`,
  cafe: `${IMG}/cafe-v2.webp`,
};

export { money } from "./format";

export const web = {
  url: "embercafe.com",
  nav: { en: ["Menu", "Offers", "Branches"], ar: ["المنيو", "العروض", "الفروع"] },
  cart: { en: "Cart", ar: "السلة" },
  tag: { en: "Fresh every morning", ar: "طازة كل يوم الصبح" },
  title: { en: "Fresh coffee, delivered to your door.", ar: "قهوة طازة توصلك لحد البيت." },
  sub: { en: "Order online in a minute — hot and on time.", ar: "اطلب أونلاين في دقيقة، وتوصلك سخنة وفي ميعادها." },
  from: { en: "From EGP 85", ar: "من 85 ج.م" },
  order: { en: "Order now", ar: "اطلب دلوقتي" },
  rating: { en: "4.9 · 2,300 reviews", ar: "4.9 · 2,300 تقييم" },
  delivery: { en: "Delivered in 30 min", ar: "توصيل في 30 دقيقة" },
  best: { en: "Most ordered", ar: "الأكثر طلبًا" },
  add: { en: "Add", ar: "أضف" },
  products: [
    { name: { en: "Latte", ar: "لاتيه" }, price: 85, img: photos.latte },
    { name: { en: "Butter croissant", ar: "كرواسون زبدة" }, price: 60, img: photos.croissant },
    { name: { en: "Iced latte", ar: "آيس لاتيه" }, price: 95, img: photos.iced },
  ],
};

export const app = {
  hello: { en: "Hi Omar", ar: "أهلًا عمر" },
  ask: { en: "What would you like today?", ar: "تحب تشرب إيه النهارده؟" },
  name: { en: "Latte", ar: "لاتيه" },
  desc: { en: "Espresso with steamed milk", ar: "إسبريسو مع لبن" },
  price: 85,
  order: { en: "Order now", ar: "اطلب دلوقتي" },
  onWay: { en: "Your order is on its way", ar: "طلبك في الطريق" },
  eta: { en: "12 min", ar: "12 دقيقة" },
  steps: { en: ["Confirmed", "Preparing", "On the way"], ar: ["اتأكد", "بيتجهز", "في الطريق"] },
  tabs: { en: ["Home", "Menu", "Orders", "Account"], ar: ["الرئيسية", "المنيو", "طلباتي", "حسابي"] },
};

export const dash = {
  title: { en: "Today", ar: "النهارده" },
  date: { en: "Mon, 12 Oct", ar: "الاتنين 12 أكتوبر" },
  tiles: [
    { label: { en: "Sales today", ar: "مبيعات النهارده" }, value: 12450, money: true, note: { en: "12% more than yesterday", ar: "12% أكتر من امبارح" }, tone: "up" },
    { label: { en: "Profit", ar: "المكسب" }, value: 3980, money: true, note: { en: "8% more than yesterday", ar: "8% أكتر من امبارح" }, tone: "up" },
    { label: { en: "Running low", ar: "بضاعة قربت تخلص" }, value: 3, money: false, note: { en: "items to reorder", ar: "أصناف محتاجة تتطلب" }, tone: "warn" },
  ] as { label: L; value: number; money: boolean; note: L; tone: "up" | "warn" }[],
  week: { en: "Sales this week", ar: "مبيعات الأسبوع" },
  days: { en: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"], ar: ["سبت", "حد", "اتنين", "تلات", "أربع", "خميس", "جمعة"] },
  bars: [0.52, 0.64, 0.48, 0.7, 0.61, 0.86, 1],
  low: { en: "Running low", ar: "قرب يخلص" },
  left: { en: "left", ar: "باقي" },
  stock: [
    { name: { en: "Coffee beans", ar: "بن محوج" }, left: 2, img: photos.beans },
    { name: { en: "Croissant", ar: "كرواسون" }, left: 4, img: photos.croissant },
    { name: { en: "Carrot cake", ar: "كيكة جزر" }, left: 3, img: photos.cake },
  ],
};

export const chat = {
  name: "Ember Café",
  status: { en: "AI assistant · online", ar: "مساعد ذكي · متصل" },
  closed: { en: "The shop is closed — the AI assistant is replying", ar: "المحل مقفول دلوقتي — المساعد الذكي بيرد" },
  time: { en: "11:48 PM", ar: "11:48 م" },
  input: { en: "Message", ar: "اكتب رسالة" },
  messages: [
    { from: "me", text: { en: "Still taking orders? I’d like 2 lattes.", ar: "لسه بتاخدوا طلبات؟ عايز 2 لاتيه." } },
    { from: "ai", text: { en: "Of course! 2 lattes come to EGP 170. Send them to your Maadi address?", ar: "أكيد! 2 لاتيه بـ 170 ج.م. أبعتهم على عنوانك في المعادي؟" } },
    { from: "me", text: { en: "Yes, perfect.", ar: "أيوه، تمام." } },
    { from: "ai", text: { en: "Done! Your order arrives in about 30 minutes.", ar: "تم! طلبك هيوصلك خلال 30 دقيقة." } },
  ] as { from: "ai" | "me"; text: L }[],
  card: { en: "2 × Latte", ar: "2 × لاتيه" },
  total: 170,
  onWay: { en: "On the way", ar: "في الطريق" },
};
