export type DemoLocale = "en" | "ar";
type T = Record<DemoLocale, string>;

export const hero = {
  label: { en: "Elmasry Tech — software house", ar: "Elmasry Tech — شركة برمجيات" } as T,
  titleA: { en: "From an idea to software that ", ar: "من الفكرة إلى برنامج " } as T,
  titleB: { en: "runs your business.", ar: "يُدير أعمالك." } as T,
  sub: {
    en: "Websites, mobile apps, business systems and AI tools — designed and built by one team, from the first sketch to launch day.",
    ar: "مواقع وتطبيقات موبايل وأنظمة إدارة وأدوات ذكاء اصطناعي، يصمّمها ويبنيها فريق واحد من أول فكرة حتى يوم الإطلاق.",
  } as T,
  cta: { en: "Start your project", ar: "ابدأ مشروعك" } as T,
  cue: { en: "Scroll to watch it ship", ar: "مرّر لتشاهد الرحلة" } as T,
};

export const scenes: { kicker: T; rail: T; title: T; line: T; tags: string[] }[] = [
  {
    kicker: { en: "Website", ar: "موقع إلكتروني" },
    rail: { en: "Website", ar: "الموقع" },
    title: { en: "Code becomes a website.", ar: "الكود يصبح موقعًا." },
    line: {
      en: "Clean, typed code ships as a fast, search-friendly site your customers can actually find.",
      ar: "كود نظيف ومنظّم يتحوّل إلى موقع سريع ومتوافق مع محركات البحث، يصل إليه عملاؤك بسهولة.",
    },
    tags: ["Next.js", "TypeScript", "SEO"],
  },
  {
    kicker: { en: "Mobile app", ar: "تطبيق موبايل" },
    rail: { en: "App", ar: "التطبيق" },
    title: { en: "…then a mobile app.", ar: "…ثم تطبيق موبايل." },
    line: {
      en: "The same product reaches iOS and Android — orders, alerts and payments in your customers' pockets.",
      ar: "المنتج نفسه يصل إلى iOS وAndroid: طلبات وإشعارات ومدفوعات في جيب عملائك.",
    },
    tags: ["iOS", "Android", "Push"],
  },
  {
    kicker: { en: "Business system", ar: "نظام إدارة" },
    rail: { en: "System", ar: "النظام" },
    title: { en: "…then a business system.", ar: "…ثم نظام يُدير العمل." },
    line: {
      en: "Sales, stock and teams in one live dashboard, so decisions come from numbers, not guesses.",
      ar: "المبيعات والمخزون والفريق في لوحة تحكم واحدة لحظية، لتأتي قراراتك من الأرقام لا من التخمين.",
    },
    tags: ["Dashboards", "Inventory", "Roles"],
  },
  {
    kicker: { en: "AI assistant", ar: "ذكاء اصطناعي" },
    rail: { en: "AI", ar: "الذكاء الاصطناعي" },
    title: { en: "…with AI built in.", ar: "…وبداخله ذكاء اصطناعي." },
    line: {
      en: "An assistant that knows your data — it answers questions, flags problems and drafts the next step.",
      ar: "مساعد يفهم بياناتك: يجيب عن أسئلتك، وينبّهك إلى المشكلات، ويجهّز الخطوة التالية.",
    },
    tags: ["LLM", "Your data", "Actions"],
  },
];

/* ── Sample product shown inside the canvas (fictional roastery) ── */

export const brand = { en: "Lumora", ar: "لومورا" } as T;

export const web = {
  nav: { en: ["Menu", "Branches", "Story"], ar: ["المنيو", "الفروع", "قصتنا"] },
  order: { en: "Order", ar: "اطلب" } as T,
  eyebrow: { en: "Small-batch roastery", ar: "تحميص بكميات صغيرة" } as T,
  title: { en: "Coffee, roasted every morning.", ar: "قهوة تُحمَّص كل صباح." } as T,
  sub: {
    en: "Specialty beans from nine origins, delivered within 24 hours.",
    ar: "بُن مختص من تسعة مناشئ، يصلك خلال 24 ساعة.",
  } as T,
  primary: { en: "Order now", ar: "اطلب الآن" } as T,
  secondary: { en: "Find a branch", ar: "أقرب فرع" } as T,
  rating: { en: "4.9 · 2,300 reviews", ar: "4.9 · 2,300 تقييم" } as T,
};

export const products: { name: T; price: number; tone: string }[] = [
  { name: { en: "Guji Natural", ar: "جوجي ناتشورال" }, price: 420, tone: "radial-gradient(circle at 30% 25%, #ffb27a 0%, #e8661f 45%, #8f3511 100%)" },
  { name: { en: "Huila Washed", ar: "هويلا مغسولة" }, price: 380, tone: "radial-gradient(circle at 30% 25%, #8a6a52 0%, #4b3426 55%, #2a1c14 100%)" },
  { name: { en: "House Blend", ar: "خلطة لومورا" }, price: 290, tone: "radial-gradient(circle at 30% 25%, #f6e2c4 0%, #ddb07a 55%, #b27a43 100%)" },
];

export const currency = (n: number, l: DemoLocale) => (l === "ar" ? `${n.toLocaleString("en-US")} ج.م` : `EGP ${n.toLocaleString("en-US")}`);

export const app = {
  greet: { en: "Good morning, Sara", ar: "صباح الخير، سارة" } as T,
  title: { en: "Your usual?", ar: "طلبك المعتاد؟" } as T,
  orderNo: { en: "Order", ar: "الطلب" } as T,
  ready: { en: "Ready in 4 min", ar: "جاهز خلال 4 دقائق" } as T,
  status: { en: "Brewing", ar: "قيد التحضير" } as T,
  steps: { en: ["Placed", "Brewing", "Ready"], ar: ["تم الطلب", "التحضير", "جاهز"] },
  popular: { en: "Popular near you", ar: "الأكثر طلبًا بالقرب منك" } as T,
  seeAll: { en: "See all", ar: "الكل" } as T,
  weight: { en: "250 g", ar: "250 جم" } as T,
  tabs: { en: ["Home", "Menu", "Orders", "Profile"], ar: ["الرئيسية", "المنيو", "طلباتي", "حسابي"] },
  notifTitle: { en: "Your flat white is ready", ar: "الفلات وايت جاهز" } as T,
  notifBody: { en: "Pick it up at the Downtown counter.", ar: "استلمه من كاونتر فرع وسط البلد." } as T,
  now: { en: "now", ar: "الآن" } as T,
};

export const dash = {
  url: "admin.lumora.coffee",
  title: { en: "Overview", ar: "نظرة عامة" } as T,
  range: { en: "Last 7 days", ar: "آخر 7 أيام" } as T,
  kpis: [
    { label: { en: "Revenue", ar: "الإيرادات" } as T, unit: { en: "EGP", ar: "ج.م" } as T, unitBefore: true, delta: { en: "+12.4%", ar: "+12.4%" } as T, warn: false },
    { label: { en: "Orders", ar: "الطلبات" } as T, unit: null, unitBefore: false, delta: { en: "+8.1%", ar: "+8.1%" } as T, warn: false },
    { label: { en: "Avg. order", ar: "متوسط الطلب" } as T, unit: { en: "EGP", ar: "ج.م" } as T, unitBefore: true, delta: { en: "+3.9%", ar: "+3.9%" } as T, warn: false },
    { label: { en: "Low stock", ar: "مخزون منخفض" } as T, unit: { en: "items", ar: "أصناف" } as T, unitBefore: false, delta: { en: "Reorder", ar: "اطلب" } as T, warn: true },
  ],
  kpiTargets: [184320, 1284, 143, 3],
  chart: { en: "Revenue by day", ar: "الإيرادات اليومية" } as T,
  chartTotal: { en: "EGP 184k", ar: "184 ألف ج.م" } as T,
  days: { en: ["M", "T", "W", "T", "F", "S", "S"], ar: ["ن", "ث", "ر", "خ", "ج", "س", "ح"] },
  bars: [0.48, 0.62, 0.55, 0.74, 0.66, 0.95, 0.82],
  top: { en: "Top products", ar: "الأكثر مبيعًا" } as T,
  topRows: [
    { name: { en: "Guji Natural", ar: "جوجي ناتشورال" } as T, pct: 38 },
    { name: { en: "House Blend", ar: "خلطة لومورا" } as T, pct: 27 },
    { name: { en: "Oat flat white", ar: "فلات وايت بالشوفان" } as T, pct: 19 },
  ],
  recent: { en: "Recent orders", ar: "أحدث الطلبات" } as T,
  viewAll: { en: "View all", ar: "عرض الكل" } as T,
  rows: [
    { id: "#1048", name: { en: "Sara M.", ar: "سارة م." }, branch: { en: "Downtown", ar: "وسط البلد" }, amount: 210, paid: true },
    { id: "#1047", name: { en: "Omar K.", ar: "عمر ك." }, branch: { en: "Riverside", ar: "الكورنيش" }, amount: 465, paid: true },
    { id: "#1046", name: { en: "Lina H.", ar: "لينا ح." }, branch: { en: "Old Town", ar: "المدينة القديمة" }, amount: 120, paid: false },
    { id: "#1045", name: { en: "Youssef A.", ar: "يوسف أ." }, branch: { en: "Downtown", ar: "وسط البلد" }, amount: 355, paid: true },
  ],
  paid: { en: "Paid", ar: "مدفوع" } as T,
  pending: { en: "Pending", ar: "قيد الانتظار" } as T,
};

export const chat = {
  title: { en: "Assistant", ar: "المساعد الذكي" } as T,
  sub: { en: "Knows your sales & stock", ar: "يعرف مبيعاتك ومخزونك" } as T,
  online: { en: "Online", ar: "متصل" } as T,
  user: { en: "Which items will run out this week?", ar: "ما الأصناف التي ستنفد هذا الأسبوع؟" } as T,
  reply: {
    en: "Three items drop below reorder level by Thursday: Guji 250 g, oat milk and 12 oz cups. I drafted a purchase order for EGP 8,450.",
    ar: "ثلاثة أصناف ستصل إلى حد إعادة الطلب قبل الخميس: جوجي 250 جم، وحليب الشوفان، وأكواب 12 أونصة. جهّزت لك أمر شراء بقيمة 8,450 ج.م.",
  } as T,
  po: { en: "Purchase order PO-0219", ar: "أمر شراء PO-0219" } as T,
  poMeta: { en: "3 items · EGP 8,450", ar: "3 أصناف · 8,450 ج.م" } as T,
  review: { en: "Review", ar: "مراجعة" } as T,
  send: { en: "Send to supplier", ar: "إرسال للمورّد" } as T,
  placeholder: { en: "Ask about sales, stock, customers…", ar: "اسأل عن المبيعات أو المخزون أو العملاء…" } as T,
};

/* ── After the story ── */

export const process = {
  label: { en: "How we work", ar: "طريقة عملنا" } as T,
  title: { en: "Four steps. No surprises.", ar: "أربع خطوات واضحة، بلا مفاجآت." } as T,
  sub: {
    en: "A short, transparent process — you see real progress every week.",
    ar: "عملية قصيرة وشفافة، ترى فيها تقدّمًا حقيقيًا كل أسبوع.",
  } as T,
  steps: [
    {
      title: { en: "Discover", ar: "الاكتشاف" } as T,
      text: {
        en: "A focused workshop to map your workflow, users and goals — then a clear scope and fixed quote.",
        ar: "جلسة مركّزة لفهم سير عملك وعملائك وأهدافك، ثم نطاق عمل واضح وعرض سعر ثابت.",
      } as T,
      out: { en: "Scope & quote", ar: "النطاق والسعر" } as T,
    },
    {
      title: { en: "Design", ar: "التصميم" } as T,
      text: {
        en: "Clickable prototypes before any code, so you see, test and approve the product early.",
        ar: "نماذج تفاعلية قبل أي سطر كود، لترى المنتج وتجرّبه وتعتمده مبكرًا.",
      } as T,
      out: { en: "Prototype", ar: "نموذج تفاعلي" } as T,
    },
    {
      title: { en: "Build", ar: "التطوير" } as T,
      text: {
        en: "Weekly releases on a live link you can try — no black box, no last-minute surprises.",
        ar: "إصدارات أسبوعية على رابط مباشر تجرّبه بنفسك، بلا صندوق أسود ولا مفاجآت في اللحظة الأخيرة.",
      } as T,
      out: { en: "Weekly builds", ar: "إصدار أسبوعي" } as T,
    },
    {
      title: { en: "Launch & grow", ar: "الإطلاق والنمو" } as T,
      text: {
        en: "We deploy, train your team and stay on for support, updates and the next feature.",
        ar: "نطلق المنتج وندرّب فريقك، ونبقى معك للدعم والتحديثات والميزة التالية.",
      } as T,
      out: { en: "Support", ar: "دعم مستمر" } as T,
    },
  ],
};

export const closing = {
  title: { en: "Have an idea? Let’s ship it.", ar: "لديك فكرة؟ لنحوّلها إلى منتج." } as T,
  sub: {
    en: "Tell us what you want to build. We’ll come back with a clear plan, timeline and price.",
    ar: "أخبرنا بما تريد بناءه، وسنعود إليك بخطة واضحة وجدول زمني وسعر محدد.",
  } as T,
  cta: { en: "Start your project", ar: "ابدأ مشروعك" } as T,
  work: { en: "See our work", ar: "شاهد أعمالنا" } as T,
};
