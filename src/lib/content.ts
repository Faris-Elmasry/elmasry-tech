// Structured, bilingual marketing content.
// Visible copy is written for business owners, not engineers: plain words,
// no jargon (no "ERP", "POS", "SaaS", "KPI" in what people read). Arabic is
// warm, simple and Egyptian-friendly. `keywords` keeps the terms people
// actually type into Google; page titles, meta descriptions and H1 keyword
// lines live in lib/seo-copy.ts.

import type { Locale } from "@/lib/site";

export type T = Record<Locale, string>;
export const tr = (value: T, locale: Locale) => value[locale];

export interface Service {
  slug: string;
  icon: string;
  /** Short label used in nav, chips and the contact form. */
  label: T;
  /** Descriptive title (keyword-friendly, still plain). */
  title: T;
  /** One plain sentence: what it is. */
  summary: T;
  /** Two or three plain sentences: what changes for you. */
  body: T;
  /** What you get, in everyday words. */
  features: Record<Locale, string[]>;
  keywords: Record<Locale, string[]>;
}

export const services: Service[] = [
  {
    slug: "website-development",
    icon: "Globe",
    label: { en: "Websites", ar: "المواقع الإلكترونية" },
    title: { en: "Website design & development", ar: "تصميم وبرمجة المواقع" },
    summary: {
      en: "A fast, good-looking website that explains what you do and turns visitors into calls and WhatsApp messages.",
      ar: "موقع سريع وشكله محترم، بيشرح شغلك ببساطة ويحوّل الزائر لمكالمة أو رسالة واتساب.",
    },
    body: {
      en: "We write and design every page around one question: what should the visitor do next? Your site works on every phone, in Arabic and English, shows up on Google, and comes with a simple dashboard so you can change prices, photos and text yourself.",
      ar: "بنصمّم كل صفحة حوالين سؤال واحد: الزائر المفروض يعمل إيه بعد كده؟ موقعك هيشتغل على أي موبايل، بالعربي والإنجليزي، ويظهر على جوجل، ومعاه لوحة تحكم بسيطة تغيّر منها الأسعار والصور والكلام بنفسك.",
    },
    features: {
      en: ["Company websites & one-page offers", "Arabic and English", "Shows up on Google", "WhatsApp & call buttons everywhere", "Edit it yourself — no developer needed"],
      ar: ["مواقع شركات وصفحات عروض", "عربي وإنجليزي", "يظهر في بحث جوجل", "زرار واتساب واتصال في كل صفحة", "تعدّل بنفسك من غير مبرمج"],
    },
    keywords: {
      en: ["website design Egypt", "web development company Egypt", "web application development", "landing page design"],
      ar: ["تصميم مواقع", "شركة تصميم مواقع في مصر", "برمجة مواقع", "تصميم موقع شركة", "أسعار تصميم المواقع في مصر"],
    },
  },
  {
    slug: "mobile-app-development",
    icon: "Smartphone",
    label: { en: "Mobile apps", ar: "تطبيقات الموبايل" },
    title: { en: "iPhone & Android app development", ar: "تصميم وبرمجة تطبيقات الموبايل" },
    summary: {
      en: "An app with your name on it, on the App Store and Google Play — for orders, bookings or your own team.",
      ar: "تطبيق باسمك على App Store و Google Play — للطلبات أو الحجوزات أو لفريق شغلك.",
    },
    body: {
      en: "Your customers order, book and pay from their phone, and you see everything in one dashboard. We design it, build it once for both iPhone and Android, publish it to the stores under your name, and keep it updated.",
      ar: "عميلك يطلب ويحجز ويدفع من موبايله، وأنت تشوف كل حاجة في لوحة واحدة. بنصمّمه ونبنيه مرة واحدة يشتغل على الآيفون والأندرويد، وننزّله على المتاجر باسمك، ونفضل نحدّثه.",
    },
    features: {
      en: ["One app for iPhone and Android", "Orders, bookings and payments", "Notifications to your customers", "A dashboard for you and your team", "Published on the stores in your name"],
      ar: ["تطبيق واحد للآيفون والأندرويد", "طلبات وحجوزات ودفع", "إشعارات توصل لعملائك", "لوحة تحكم ليك ولفريقك", "منشور على المتاجر باسمك"],
    },
    keywords: {
      en: ["mobile app development Egypt", "app development company Cairo", "iOS app development", "Android app development", "Flutter developers Egypt"],
      ar: ["برمجة تطبيقات موبايل", "تصميم تطبيقات موبايل", "شركة برمجة تطبيقات في مصر", "برمجة تطبيقات اندرويد وايفون", "تكلفة عمل تطبيق في مصر"],
    },
  },
  {
    slug: "custom-software",
    icon: "LayoutDashboard",
    label: { en: "Custom systems", ar: "أنظمة مفصّلة على شغلك" },
    title: { en: "Custom business systems", ar: "برمجة أنظمة إدارة حسب الطلب" },
    summary: {
      en: "One program for sales, stock, money and staff — built around the way your business already works.",
      ar: "برنامج واحد للمبيعات والمخزن والفلوس والموظفين — متفصّل على طريقة شغلك أنت.",
    },
    body: {
      en: "Ready-made programs make you change how you work. We do the opposite: we sit with you, learn your daily routine, and build a system that follows it — with clear permissions for each employee and live numbers you can check from your phone.",
      ar: "البرامج الجاهزة بتخليك تغيّر طريقة شغلك. إحنا بنعمل العكس: نقعد معاك، نفهم يومك ماشي إزاي، ونبني نظام ماشي على نفس الطريقة — بصلاحيات واضحة لكل موظف، وأرقام لحظية تشوفها من موبايلك.",
    },
    features: {
      en: ["Sales, stock, money and staff in one place", "Every branch on one screen", "Each employee sees only what they need", "Ready for the Tax Authority e-invoice", "On the internet or on your own computer"],
      ar: ["المبيعات والمخزن والفلوس والموظفين في مكان واحد", "كل الفروع على شاشة واحدة", "كل موظف يشوف اللي يخصه بس", "جاهز للفاتورة الإلكترونية", "على النت أو على جهازك عندك"],
    },
    keywords: {
      en: ["custom software development Egypt", "ERP development Egypt", "business management system", "CRM development"],
      ar: ["برمجة برامج حسب الطلب", "برنامج ERP", "برامج إدارة الشركات", "برنامج مخازن", "برنامج حسابات", "سيستم ERP", "برنامج متوافق مع الفاتورة الإلكترونية"],
    },
  },
  {
    slug: "ai-chatbots",
    icon: "BrainCircuit",
    label: { en: "AI assistants", ar: "مساعد ذكي وردود آلية" },
    title: { en: "AI assistants & WhatsApp chatbots", ar: "شات بوت وردود آلية على واتساب بالذكاء الاصطناعي" },
    summary: {
      en: "A smart assistant that answers your customers on WhatsApp day and night — and passes them to you when it should.",
      ar: "مساعد ذكي بيرد على عملائك على واتساب ليل ونهار — ويحوّلهم ليك لما يكون لازم.",
    },
    body: {
      en: "Most messages are the same few questions: prices, opening hours, availability, bookings. Your assistant answers them instantly in Egyptian Arabic or English, only from information you approve, and hands the chat to a real person whenever it isn’t sure.",
      ar: "أغلب الرسائل هي نفس الأسئلة: السعر كام، مواعيدكم إيه، الحاجة متاحة، عايز أحجز. المساعد بيرد عليها فورًا بالمصري أو بالإنجليزي، ومن المعلومات اللي أنت موافق عليها بس، ولو مش متأكد بيحوّل المحادثة لحد من فريقك.",
    },
    features: {
      en: ["Replies on WhatsApp and your website", "Understands Egyptian Arabic", "Takes bookings and orders", "Hands over to a person when needed", "Reads invoices and IDs into your system"],
      ar: ["يرد على واتساب وعلى موقعك", "فاهم اللهجة المصرية", "ياخد حجوزات وطلبات", "يحوّل لموظف وقت اللزوم", "يقرأ الفواتير والبطاقات ويدخّلها على نظامك"],
    },
    keywords: {
      en: ["AI solutions Egypt", "chatbot development Egypt", "WhatsApp bot", "AI integration"],
      ar: ["حلول الذكاء الاصطناعي", "شات بوت", "واتساب بوت", "عمل شات بوت للشركات", "رد آلي واتساب", "ربط واتساب بزنس API"],
    },
  },
  {
    slug: "business-automation",
    icon: "Workflow",
    label: { en: "Automation", ar: "أتمتة الشغل المتكرر" },
    title: { en: "Automating repetitive work", ar: "أتمتة العمليات وربط البرامج ببعض" },
    summary: {
      en: "Stop copying the same order into three places. Your tools talk to each other and the routine work does itself.",
      ar: "كفاية تنقل نفس الطلب في تلات أماكن. برامجك تكلّم بعض، والشغل المتكرر يخلص لوحده.",
    },
    body: {
      en: "We watch how an order, an invoice or a report moves through your business today, then connect the steps so it flows by itself: the order lands, the invoice is made, the customer gets a WhatsApp update and you get a summary every morning.",
      ar: "بنشوف الطلب أو الفاتورة أو التقرير بيمشي إزاي عندك النهارده، وبعدين نربط الخطوات ببعض فتمشي لوحدها: الطلب يوصل، الفاتورة تطلع، العميل يجيله تحديث على واتساب، وأنت يوصلك ملخص كل صباح.",
    },
    features: {
      en: ["Orders flow from WhatsApp to invoice", "Automatic WhatsApp and email updates", "A daily report every morning", "Your current programs, connected", "Alerts if anything goes wrong"],
      ar: ["الطلب يمشي من واتساب للفاتورة لوحده", "تحديثات واتساب وإيميل تلقائية", "تقرير يومي كل صباح", "برامجك الحالية متوصلة ببعض", "تنبيه لو حاجة وقفت"],
    },
    keywords: {
      en: ["business process automation Egypt", "workflow automation", "API integration services"],
      ar: ["أتمتة العمليات", "أتمتة الأعمال", "ربط الأنظمة", "تحويل رقمي للشركات"],
    },
  },
  {
    slug: "ecommerce-development",
    icon: "ShoppingCart",
    label: { en: "Online stores", ar: "المتاجر الأونلاين" },
    title: { en: "Online stores & shop cashier systems", ar: "تصميم متجر إلكتروني ونظام كاشير" },
    summary: {
      en: "Sell online and in your shop from the same stock — the website, the cashier and every branch always agree.",
      ar: "بيع أونلاين وفي المحل من نفس المخزون — الموقع والكاشير وكل الفروع دايمًا متفقين.",
    },
    body: {
      en: "Customers pay the way they like — card, wallet, instalments or cash on delivery — and shipping is booked for you. In the shop, the cashier keeps selling even when the internet drops, and every sale updates the same stock.",
      ar: "العميل يدفع بالطريقة اللي تريحه — فيزا أو محفظة أو تقسيط أو كاش عند الاستلام — والشحن بيتحجز لوحده. وفي المحل، الكاشير بيكمّل بيع حتى لو النت فصل، وكل بيعة بتتخصم من نفس المخزون.",
    },
    features: {
      en: ["A store that’s easy to buy from", "Card, wallets, instalments, cash on delivery", "Shipping booked automatically", "A shop cashier that works offline", "One stock for the store and every branch"],
      ar: ["متجر سهل الشراء منه", "فيزا ومحافظ وتقسيط وكاش عند الاستلام", "حجز الشحن تلقائي", "كاشير للمحل يشتغل من غير نت", "مخزون واحد للمتجر وكل الفروع"],
    },
    keywords: {
      en: ["ecommerce development Egypt", "POS system Egypt", "cashier system"],
      ar: ["تصميم متجر إلكتروني", "برنامج كاشير", "سيستم كاشير", "نظام نقاط البيع POS", "سعر سيستم كاشير", "تصميم متجر إلكتروني سعر"],
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const process: { title: T; text: T }[] = [
  {
    title: { en: "A free chat", ar: "مكالمة مجانية" },
    text: { en: "30 minutes to understand your business, your goals and what’s getting in the way.", ar: "30 دقيقة نفهم فيها شغلك وهدفك وإيه اللي معطّلك." },
  },
  {
    title: { en: "A clear offer", ar: "عرض واضح" },
    text: { en: "What we’ll build, how long it takes and the exact price — in writing, within 48 hours.", ar: "هنبني إيه، وفي قد إيه، وبكام بالظبط — مكتوب، خلال 48 ساعة." },
  },
  {
    title: { en: "Built step by step", ar: "بناء خطوة بخطوة" },
    text: { en: "Every week you see and try what’s ready, and tell us what to change.", ar: "كل أسبوع تشوف وتجرّب اللي خلص، وتقول لنا نعدّل إيه." },
  },
  {
    title: { en: "Launch & support", ar: "التشغيل والدعم" },
    text: { en: "We launch it, train your team and stay with you after.", ar: "بنشغّله، وندرّب فريقك، ونفضل معاك بعدها." },
  },
];

export const faqs: { q: T; a: T }[] = [
  {
    q: { en: "How much will it cost?", ar: "التكلفة هتبقى كام؟" },
    a: {
      en: "It depends on what you need — how many pages or screens, and what it should connect to. After a free chat we send a written offer with one fixed price within 48 hours. No surprises later.",
      ar: "بتعتمد على اللي محتاجه — عدد الصفحات أو الشاشات، وهيتربط بإيه. بعد مكالمة مجانية بنبعت لك عرض مكتوب بسعر ثابت خلال 48 ساعة. من غير مفاجآت بعد كده.",
    },
  },
  {
    q: { en: "How long does it take?", ar: "بياخد وقت قد إيه؟" },
    a: {
      en: "A company website usually takes 2–4 weeks. An app or a custom system takes 6–12 weeks, and bigger systems are delivered in parts so you start using them early.",
      ar: "موقع الشركة غالبًا من أسبوعين لأربعة. التطبيق أو النظام المخصوص من 6 لـ 12 أسبوع، والأنظمة الكبيرة بنسلّمها على أجزاء عشان تبدأ تستخدمها بدري.",
    },
  },
  {
    q: { en: "Can I try a system before I pay?", ar: "ينفع أجرّب النظام قبل ما أدفع؟" },
    a: {
      en: "Yes. Every ready-made system has a free live demo on your own scenarios. Then you choose: rent it monthly or buy it once.",
      ar: "أيوه. كل نظام جاهز ليه عرض تجريبي مجاني على شغلك أنت. وبعدها تختار: إيجار شهري أو شراء مرة واحدة.",
    },
  },
  {
    q: { en: "Will it be mine?", ar: "هيبقى ملكي؟" },
    a: {
      en: "For anything we build for you, yes — you receive the full source, the accounts and the documentation in your name. Ready-made systems come with a licence to use them.",
      ar: "أي حاجة بنبنيها مخصوص ليك، أيوه — بتستلم الكود كامل والحسابات والتوثيق باسمك. والأنظمة الجاهزة بتيجي بترخيص استخدام.",
    },
  },
  {
    q: { en: "Can I pay in parts?", ar: "ينفع أدفع على دفعات؟" },
    a: {
      en: "Yes. Projects are paid in parts, each one tied to something you receive.",
      ar: "أيوه. المشاريع بتتدفع على دفعات، كل دفعة قصادها حاجة بتستلمها.",
    },
  },
  {
    q: { en: "Do you work with clients outside Egypt?", ar: "بتشتغلوا مع عملاء برّه مصر؟" },
    a: {
      en: "Yes. We work with clients in the Gulf and beyond, in Arabic and English, over WhatsApp, video calls and email.",
      ar: "أيوه. بنشتغل مع عملاء في الخليج وبرّه، بالعربي والإنجليزي، على واتساب ومكالمات الفيديو والإيميل.",
    },
  },
];
