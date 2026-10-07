// Structured, bilingual marketing content. Copy is written for search intent
// in Egypt (Arabic + English) — see docs/12-seo.md for the keyword map.
// Tone: professional Modern Standard Arabic / confident, specific English.
// Keyword lists intentionally keep the colloquial terms people actually search
// (e.g. "سيستم كاشير"), even where the visible copy uses formal Arabic.

import type { Locale } from "@/lib/site";

export type T = Record<Locale, string>;
export const tr = (value: T, locale: Locale) => value[locale];

export interface Service {
  slug: string;
  icon: string;
  /** Short label used in nav, chips and the contact form. */
  label: T;
  /** H1 / H2 — contains the primary keyword. */
  title: T;
  summary: T;
  body: T;
  features: Record<Locale, string[]>;
  /** Meta title/description for the service's own page. */
  seoTitle: T;
  seoDescription: T;
  keywords: Record<Locale, string[]>;
}

export const services: Service[] = [
  {
    slug: "website-development",
    icon: "Globe",
    label: { en: "Websites & Web Apps", ar: "المواقع وتطبيقات الويب" },
    title: { en: "Website design & web application development", ar: "تصميم المواقع وتطوير تطبيقات الويب" },
    summary: {
      en: "Fast, bilingual websites and web platforms engineered to rank on Google and convert visitors into customers.",
      ar: "مواقع ومنصات ويب سريعة وثنائية اللغة، مصممة لتتصدر نتائج البحث وتحوّل الزوار إلى عملاء.",
    },
    body: {
      en: "From corporate websites and landing pages to customer portals and SaaS dashboards. We build on Next.js and modern infrastructure, structure Arabic and English content properly, and ship technical SEO from day one — so your site loads instantly, works on every device, and scales with your business.",
      ar: "من مواقع الشركات وصفحات الهبوط إلى بوابات العملاء ولوحات التحكم ومنصات SaaS. نعتمد على Next.js وبنية تحتية حديثة، وننظّم المحتوى العربي والإنجليزي باحترافية، ونطبّق أساسيات السيو التقني منذ اليوم الأول؛ ليُحمَّل موقعك فورًا، ويعمل على جميع الأجهزة، وينمو مع نمو أعمالك.",
    },
    features: {
      en: ["Corporate websites & landing pages", "Custom web apps & portals", "Arabic RTL + English", "Technical SEO & Core Web Vitals", "Content management dashboard"],
      ar: ["مواقع الشركات وصفحات الهبوط", "تطبيقات ويب وبوابات مخصصة", "دعم كامل للعربية والإنجليزية", "سيو تقني وأداء عالٍ", "لوحة تحكم لإدارة المحتوى"],
    },
    seoTitle: { en: "Website Design & Web Development in Egypt", ar: "تصميم مواقع في مصر | تطوير مواقع الشركات" },
    seoDescription: {
      en: "Professional website design and web app development in Egypt. Bilingual Arabic/English, SEO-ready, fast and fully custom. Get a free consultation.",
      ar: "شركة تصميم مواقع وتطوير تطبيقات ويب في مصر. مواقع احترافية بالعربية والإنجليزية، سريعة ومتوافقة مع محركات البحث. احصل على استشارة مجانية.",
    },
    keywords: {
      en: ["website design Egypt", "web development company Egypt", "web application development", "landing page design"],
      ar: ["تصميم مواقع", "شركة تصميم مواقع في مصر", "برمجة مواقع", "تصميم موقع شركة", "أسعار تصميم المواقع في مصر"],
    },
  },
  {
    slug: "mobile-app-development",
    icon: "Smartphone",
    label: { en: "Mobile Apps", ar: "تطبيقات الجوال" },
    title: { en: "iOS & Android mobile app development", ar: "تصميم وتطوير تطبيقات الجوال لأندرويد و iOS" },
    summary: {
      en: "Native-quality iOS and Android apps from a single codebase — designed, engineered and published to the stores.",
      ar: "تطبيقات أندرويد و iOS بجودة التطبيقات الأصلية من قاعدة كود واحدة — تصميمًا وتطويرًا ونشرًا على المتاجر.",
    },
    body: {
      en: "We design and build cross-platform apps with Flutter and React Native: customer apps, delivery and booking apps, internal staff tools and companion apps for your systems. Every engagement covers UX design, API and admin panel, push notifications, payments, analytics and App Store / Google Play publishing.",
      ar: "نطوّر تطبيقات متعددة المنصات باستخدام Flutter و React Native: تطبيقات العملاء، وتطبيقات التوصيل والحجز، وأدوات الموظفين الداخلية، والتطبيقات المرتبطة بأنظمتك. ويشمل كل مشروع تصميم تجربة المستخدم، وواجهة API ولوحة تحكم، والإشعارات، والدفع الإلكتروني، والتحليلات، والنشر على App Store و Google Play.",
    },
    features: {
      en: ["Flutter / React Native", "UI/UX design & interactive prototype", "Payments & push notifications", "Admin panel & API", "Store publishing & updates"],
      ar: ["Flutter / React Native", "تصميم واجهات ونموذج تفاعلي", "دفع إلكتروني وإشعارات فورية", "لوحة تحكم وواجهة API", "النشر على المتاجر والتحديثات"],
    },
    seoTitle: { en: "Mobile App Development in Egypt — iOS & Android", ar: "تصميم وبرمجة تطبيقات الجوال في مصر" },
    seoDescription: {
      en: "Mobile app development company in Egypt. iOS and Android apps with Flutter & React Native — design, backend, admin panel and store launch.",
      ar: "شركة برمجة تطبيقات جوال في مصر. تصميم وتطوير تطبيقات أندرويد و iOS باستخدام Flutter و React Native مع لوحة تحكم ونشر على المتاجر.",
    },
    keywords: {
      en: ["mobile app development Egypt", "app development company Cairo", "iOS app development", "Android app development", "Flutter developers Egypt"],
      ar: ["برمجة تطبيقات موبايل", "تصميم تطبيقات موبايل", "شركة برمجة تطبيقات في مصر", "برمجة تطبيقات اندرويد وايفون", "تكلفة عمل تطبيق في مصر"],
    },
  },
  {
    slug: "custom-software",
    icon: "LayoutDashboard",
    label: { en: "Custom Software & ERP", ar: "الأنظمة والبرامج المخصصة" },
    title: { en: "Custom software, ERP & business management systems", ar: "تطوير الأنظمة المخصصة وبرامج ERP وإدارة الأعمال" },
    summary: {
      en: "Systems designed around how your business actually operates — sales, inventory, accounting, HR and reporting in one place.",
      ar: "أنظمة مصممة وفق آلية عمل شركتك الفعلية — المبيعات والمخازن والحسابات والموارد البشرية والتقارير في منصة واحدة.",
    },
    body: {
      en: "Off-the-shelf software forces you to change your workflow. We build ERP, CRM and management systems that fit it: multi-branch inventory, invoicing, e-invoice-ready accounting, HR and payroll, role-based permissions and live dashboards — cloud or on-premise, online or offline.",
      ar: "تفرض البرامج الجاهزة عليك تغيير إجراءات عملك؛ أما نحن فنبني أنظمة ERP و CRM وإدارة أعمال تناسبها: مخازن متعددة الفروع، وفوترة، وحسابات متوافقة مع منظومة الفاتورة الإلكترونية، وموارد بشرية ورواتب، وصلاحيات حسب الدور، ولوحات متابعة لحظية — سحابيًا أو على خوادمك، متصلًا أو دون اتصال.",
    },
    features: {
      en: ["ERP / CRM tailored to your workflow", "Multi-branch inventory", "E-invoice (ETA) ready accounting", "Roles, permissions & audit log", "Cloud or on-premise"],
      ar: ["ERP / CRM مصمم وفق إجراءاتك", "مخازن متعددة الفروع", "حسابات متوافقة مع الفاتورة الإلكترونية", "صلاحيات وسجل كامل للعمليات", "سحابي أو على خوادمك"],
    },
    seoTitle: { en: "Custom Software & ERP Development in Egypt", ar: "برمجة الأنظمة المخصصة وبرامج ERP في مصر" },
    seoDescription: {
      en: "Custom software development in Egypt: ERP, CRM, inventory, accounting and management systems built around your workflow. Cloud or on-premise.",
      ar: "تطوير أنظمة وبرامج إدارة مخصصة في مصر: ERP و CRM ومخازن وحسابات ومبيعات مصممة وفق إجراءات عملك، سحابيًا أو على خوادمك.",
    },
    keywords: {
      en: ["custom software development Egypt", "ERP development Egypt", "business management system", "CRM development"],
      ar: ["برمجة برامج حسب الطلب", "برنامج ERP", "برامج إدارة الشركات", "برنامج مخازن", "برنامج حسابات", "سيستم ERP", "برنامج متوافق مع الفاتورة الإلكترونية"],
    },
  },
  {
    slug: "ai-chatbots",
    icon: "BrainCircuit",
    label: { en: "AI Solutions", ar: "حلول الذكاء الاصطناعي" },
    title: { en: "AI solutions, chatbots & WhatsApp bots", ar: "حلول الذكاء الاصطناعي وروبوتات المحادثة وواتساب" },
    summary: {
      en: "Practical AI that answers customers, reads documents and drafts work — connected securely to your own data.",
      ar: "ذكاء اصطناعي عملي يرد على العملاء، ويقرأ المستندات، ويُنجز المهام — متصلًا ببياناتك بشكل آمن.",
    },
    body: {
      en: "We integrate large language models into real workflows: Arabic-speaking customer-service assistants on WhatsApp and your website, assistants that search your internal documents, invoice and ID data extraction, and intelligent reporting. Our focus is measurable time saved, data privacy and controlled running costs.",
      ar: "ندمج النماذج اللغوية الكبيرة في سير العمل الفعلي: مساعدون يتحدثون العربية لخدمة العملاء عبر واتساب وموقعك، ومساعدون يبحثون في مستنداتك الداخلية، واستخراج البيانات من الفواتير والهويات، وتقارير ذكية. ونركّز على توفير وقت يمكن قياسه، وحماية خصوصية بياناتك، وضبط تكاليف التشغيل.",
    },
    features: {
      en: ["Arabic customer-service chatbots", "WhatsApp Business bots", "Document Q&A on your data", "OCR & data extraction", "AI features inside your app"],
      ar: ["روبوتات محادثة عربية لخدمة العملاء", "روبوتات واتساب للأعمال", "مساعد يجيب من مستنداتك", "استخراج البيانات من الصور والفواتير", "خصائص ذكاء اصطناعي داخل تطبيقك"],
    },
    seoTitle: { en: "AI Solutions, Chatbots & WhatsApp Bots in Egypt", ar: "حلول الذكاء الاصطناعي وروبوتات المحادثة في مصر" },
    seoDescription: {
      en: "AI development in Egypt: Arabic chatbots, WhatsApp bots, document assistants and data extraction integrated with your systems.",
      ar: "حلول ذكاء اصطناعي في مصر: روبوتات محادثة عربية، وروبوتات واتساب لخدمة العملاء، ومساعدون أذكياء لمستنداتك، واستخراج البيانات — متكاملة مع أنظمتك.",
    },
    keywords: {
      en: ["AI solutions Egypt", "chatbot development Egypt", "WhatsApp bot", "AI integration"],
      ar: ["حلول الذكاء الاصطناعي", "شات بوت", "واتساب بوت", "عمل شات بوت للشركات", "رد آلي واتساب", "ربط واتساب بزنس API"],
    },
  },
  {
    slug: "business-automation",
    icon: "Workflow",
    label: { en: "Automation", ar: "أتمتة الأعمال" },
    title: { en: "Business process automation & integrations", ar: "أتمتة العمليات وتكامل الأنظمة" },
    summary: {
      en: "Eliminate copy-paste between spreadsheets and apps. We connect your tools and automate the repetitive work.",
      ar: "تخلّص من النقل اليدوي للبيانات بين الجداول والبرامج؛ نربط أدواتك ونؤتمت المهام المتكررة.",
    },
    body: {
      en: "We map your manual processes and replace them with reliable automations: order and invoice flows, CRM and accounting sync, automated WhatsApp and email notifications, scheduled reports, and integrations with payment gateways, couriers and e-invoicing.",
      ar: "نحلّل إجراءاتك اليدوية ونستبدلها بأتمتة موثوقة: دورة الطلبات والفواتير، ومزامنة نظام العملاء مع الحسابات، وإشعارات واتساب والبريد الإلكتروني التلقائية، والتقارير المجدولة، والتكامل مع بوابات الدفع وشركات الشحن والفاتورة الإلكترونية.",
    },
    features: {
      en: ["Workflow automation (n8n & custom)", "API integrations", "Automated WhatsApp & email", "Scheduled reporting", "Payment & courier integrations"],
      ar: ["أتمتة سير العمل", "تكامل الأنظمة عبر API", "رسائل واتساب وبريد تلقائية", "تقارير مجدولة", "تكامل بوابات الدفع والشحن"],
    },
    seoTitle: { en: "Business Process Automation & Integrations in Egypt", ar: "أتمتة العمليات وتكامل الأنظمة في مصر" },
    seoDescription: {
      en: "Automate repetitive work: workflow automation, API integrations, automated WhatsApp/email and reports for businesses in Egypt.",
      ar: "أتمتة الأعمال في مصر: تكامل الأنظمة، ورسائل واتساب وبريد تلقائية، وتقارير مجدولة لتقليل العمل اليدوي والأخطاء.",
    },
    keywords: {
      en: ["business process automation Egypt", "workflow automation", "API integration services"],
      ar: ["أتمتة العمليات", "أتمتة الأعمال", "ربط الأنظمة", "تحويل رقمي للشركات"],
    },
  },
  {
    slug: "ecommerce-development",
    icon: "ShoppingCart",
    label: { en: "E-commerce & POS", ar: "المتاجر ونقاط البيع" },
    title: { en: "E-commerce stores & POS (cashier) systems", ar: "المتاجر الإلكترونية وأنظمة نقاط البيع (الكاشير)" },
    summary: {
      en: "Sell online and in-store from one stock — online store, POS and inventory always in sync.",
      ar: "بِع عبر الإنترنت وفي فروعك من مخزون واحد — متجر إلكتروني ونقطة بيع ومخازن متزامنة دائمًا.",
    },
    body: {
      en: "Online stores with local payment gateways and shipping, plus POS systems for retail, restaurants and cafés that keep working when the connection drops. Stock, pricing and reports stay in sync across every branch and channel.",
      ar: "متاجر إلكترونية متكاملة مع بوابات الدفع وشركات الشحن المحلية، وأنظمة نقاط بيع للمحلات والمطاعم والمقاهي تستمر في العمل حتى عند انقطاع الإنترنت. ويبقى المخزون والأسعار والتقارير متزامنة بين جميع الفروع والقنوات.",
    },
    features: {
      en: ["Online store with local payments", "Offline-capable POS", "Barcode & receipt printers", "Multi-branch stock sync", "Sales & profit reporting"],
      ar: ["متجر إلكتروني بوسائل دفع محلية", "نقطة بيع تعمل دون إنترنت", "قارئ باركود وطابعة فواتير", "مزامنة المخزون بين الفروع", "تقارير المبيعات والأرباح"],
    },
    seoTitle: { en: "E-commerce Development & POS Systems in Egypt", ar: "تصميم متجر إلكتروني ونظام كاشير في مصر" },
    seoDescription: {
      en: "E-commerce store development and POS systems in Egypt — local payment gateways, offline cashier, inventory and multi-branch reporting.",
      ar: "تصميم متاجر إلكترونية وأنظمة نقاط بيع (كاشير) في مصر — دفع محلي، وكاشير يعمل دون إنترنت، ومخازن وتقارير لجميع الفروع.",
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

/** Ready-made systems we build/deploy (seed for the upcoming systems catalog). */
export const systems: { icon: string; name: T; hint: T }[] = [
  { icon: "ScanBarcode", name: { en: "POS & cashier", ar: "نقاط البيع والكاشير" }, hint: { en: "Retail, cafés, restaurants", ar: "المحلات والمقاهي والمطاعم" } },
  { icon: "Boxes", name: { en: "Inventory & warehouses", ar: "المخازن والمستودعات" }, hint: { en: "Multi-branch stock, transfers", ar: "مخزون الفروع والتحويلات" } },
  { icon: "Stethoscope", name: { en: "Clinic management", ar: "إدارة العيادات" }, hint: { en: "Bookings, records, billing", ar: "الحجوزات وملفات المرضى والفواتير" } },
  { icon: "Pill", name: { en: "Pharmacy system", ar: "نظام الصيدليات" }, hint: { en: "Expiry alerts, stock, sales", ar: "تنبيهات الصلاحية والمخزون والمبيعات" } },
  { icon: "Dumbbell", name: { en: "Gym management", ar: "إدارة الصالات الرياضية" }, hint: { en: "Memberships, attendance", ar: "الاشتراكات والحضور" } },
  { icon: "UtensilsCrossed", name: { en: "Restaurant system", ar: "نظام المطاعم" }, hint: { en: "Orders, kitchen, delivery", ar: "الطلبات والمطبخ والتوصيل" } },
  { icon: "GraduationCap", name: { en: "Schools & academies", ar: "المدارس والأكاديميات" }, hint: { en: "Students, fees, schedules", ar: "الطلاب والرسوم والجداول" } },
  { icon: "Calculator", name: { en: "Accounting & HR", ar: "الحسابات والموارد البشرية" }, hint: { en: "Invoices, payroll, reports", ar: "الفواتير والرواتب والتقارير" } },
];

/** How clients can engage (pricing is shared on request until the pricing module ships). */
export const engagement: { icon: string; title: T; text: T }[] = [
  {
    icon: "PlayCircle",
    title: { en: "Live demo", ar: "عرض تجريبي" },
    text: { en: "See the system running with your scenarios before you decide.", ar: "شاهد النظام يعمل على سيناريوهات عملك قبل اتخاذ القرار." },
  },
  {
    icon: "CalendarClock",
    title: { en: "Monthly subscription", ar: "اشتراك شهري" },
    text: { en: "Fully hosted, with updates and support included.", ar: "استضافة كاملة مع التحديثات والدعم الفني." },
  },
  {
    icon: "KeyRound",
    title: { en: "Perpetual licence", ar: "ترخيص دائم" },
    text: { en: "One-time licence installed on your own devices or servers.", ar: "ترخيص لمرة واحدة يُثبَّت على أجهزتك أو خوادمك." },
  },
  {
    icon: "PencilRuler",
    title: { en: "Custom build", ar: "تطوير مخصص" },
    text: { en: "Scoped to your workflow, with a fixed proposal in 48 hours.", ar: "مصمم وفق إجراءاتك، مع عرض محدد النطاق والتكلفة خلال 48 ساعة." },
  },
];

export const process: { title: T; text: T }[] = [
  {
    title: { en: "Discovery", ar: "التحليل والاستكشاف" },
    text: { en: "A free 30-minute session to understand your operations, goals and constraints.", ar: "جلسة مجانية لمدة 30 دقيقة لفهم طبيعة عملك وأهدافك ومتطلباتك." },
  },
  {
    title: { en: "Proposal", ar: "العرض الفني والمالي" },
    text: { en: "A clear scope, timeline and fixed price within 48 hours.", ar: "نطاق عمل وجدول زمني وتكلفة محددة خلال 48 ساعة." },
  },
  {
    title: { en: "Iterative delivery", ar: "التطوير على مراحل" },
    text: { en: "Weekly demos so you see progress and can steer early.", ar: "عرض أسبوعي لما تم إنجازه لتتابع التقدم وتوجّه العمل مبكرًا." },
  },
  {
    title: { en: "Launch & support", ar: "الإطلاق والدعم" },
    text: { en: "Deployment, team training, documentation and a dedicated support period.", ar: "النشر وتدريب فريقك والتوثيق، مع فترة دعم فني مخصصة." },
  },
];

export const faqs: { q: T; a: T }[] = [
  {
    q: { en: "How much does a website or app cost in Egypt?", ar: "كم تبلغ تكلفة تصميم موقع أو تطبيق في مصر؟" },
    a: {
      en: "Cost depends on scope: the number of pages or screens, integrations, admin features and languages. After a free discovery session we send a fixed, itemised proposal within 48 hours.",
      ar: "تعتمد التكلفة على نطاق المشروع: عدد الصفحات أو الشاشات، والتكامل مع الأنظمة الأخرى، ولوحة التحكم، واللغات المطلوبة. وبعد جلسة استكشاف مجانية نرسل لك عرضًا مفصّلًا بتكلفة ثابتة خلال 48 ساعة.",
    },
  },
  {
    q: { en: "How long does a project take?", ar: "ما المدة المتوقعة لتنفيذ المشروع؟" },
    a: {
      en: "A corporate website typically takes 2–4 weeks, a mobile app or custom system 6–12 weeks, and larger ERP projects are delivered in phases.",
      ar: "يستغرق موقع الشركة عادةً من أسبوعين إلى أربعة أسابيع، وتطبيق الجوال أو النظام المخصص من 6 إلى 12 أسبوعًا، بينما تُسلَّم مشاريع ERP الكبيرة على مراحل.",
    },
  },
  {
    q: { en: "Can I try a system before buying?", ar: "هل يمكنني تجربة النظام قبل الشراء؟" },
    a: {
      en: "Yes. Our ready-made systems come with a live demo, and you can choose a monthly subscription or a perpetual licence.",
      ar: "نعم. تتوفر لأنظمتنا الجاهزة عروض تجريبية حيّة، ويمكنك الاختيار بين الاشتراك الشهري أو الترخيص الدائم.",
    },
  },
  {
    q: { en: "Do I own the source code?", ar: "هل أمتلك الكود المصدري؟" },
    a: {
      en: "For custom projects, yes — you receive the source code, documentation and every account. Ready-made systems are covered by their licence terms.",
      ar: "في المشاريع المخصصة نعم؛ تستلم الكود المصدري والتوثيق وجميع الحسابات. أما الأنظمة الجاهزة فتخضع لشروط الترخيص الخاصة بها.",
    },
  },
  {
    q: { en: "Can I pay in installments?", ar: "هل يمكن الدفع على دفعات؟" },
    a: {
      en: "Yes. Custom projects are paid in milestones tied to delivery.",
      ar: "نعم. تُسدَّد المشاريع المخصصة على دفعات مرتبطة بمراحل التسليم.",
    },
  },
  {
    q: { en: "Do you work with clients outside Egypt?", ar: "هل تعملون مع عملاء خارج مصر؟" },
    a: {
      en: "Yes. We work remotely with clients in the Gulf and worldwide, in Arabic and English, over WhatsApp, Zoom and email.",
      ar: "نعم. نعمل عن بُعد مع عملاء في الخليج وحول العالم بالعربية والإنجليزية، عبر واتساب و Zoom والبريد الإلكتروني.",
    },
  },
];

export const stack = [
  "Next.js", "React", "TypeScript", "Node.js", "Laravel", "Flutter", "React Native",
  "PostgreSQL", "MySQL", "Tailwind CSS", "Docker", "OpenAI", "n8n", "AWS",
];
