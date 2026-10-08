// In-depth, bilingual content for each /services/[slug] page: the problems a
// service solves, what is delivered, typical projects, timeline, stack and
// service-specific FAQs. Keyed by the slugs in lib/content.ts `services`.

import type { Locale } from "@/lib/site";

type T = Record<Locale, string>;

export interface ServiceDetail {
  challenges: { problem: T; solution: T }[];
  deliverables: Record<Locale, string[]>;
  useCases: { title: T; text: T }[];
  timeline: T;
  stack: string[];
  faqs: { q: T; a: T }[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "website-development": {
    challenges: [
      {
        problem: { en: "Your website looks dated and doesn’t bring in enquiries.", ar: "موقعك قديم المظهر ولا يجلب استفسارات." },
        solution: { en: "A clear, modern site built around one goal per page, with calls to action to WhatsApp, calls and forms.", ar: "موقع حديث وواضح، لكل صفحة فيه هدف محدد، مع أزرار تواصل مباشرة عبر واتساب والاتصال والنماذج." },
      },
      {
        problem: { en: "Customers can’t find you on Google.", ar: "العملاء لا يجدونك على جوجل." },
        solution: { en: "Technical SEO from day one: speed, structured data, bilingual pages and content mapped to real search terms.", ar: "سيو تقني منذ اليوم الأول: سرعة عالية، وبيانات منظمة، وصفحات بالعربية والإنجليزية، ومحتوى مبني على كلمات البحث الفعلية." },
      },
      {
        problem: { en: "Every small change needs a developer.", ar: "كل تعديل بسيط يحتاج إلى مبرمج." },
        solution: { en: "An easy dashboard to edit pages, products, news and images yourself.", ar: "لوحة تحكم سهلة لتعديل الصفحات والمنتجات والأخبار والصور بنفسك." },
      },
    ],
    deliverables: {
      en: ["Sitemap, wireframes and UI design", "Responsive development (mobile-first)", "Arabic RTL + English versions", "Content dashboard (CMS)", "Technical SEO, analytics & Search Console", "Hosting, domain, SSL and business email setup"],
      ar: ["هيكل الموقع والتخطيط الأولي وتصميم الواجهات", "تطوير متجاوب يبدأ من الجوال", "نسخة عربية RTL ونسخة إنجليزية", "لوحة تحكم لإدارة المحتوى", "سيو تقني وربط Analytics و Search Console", "إعداد الاستضافة والدومين وشهادة SSL والبريد الرسمي"],
    },
    useCases: [
      { title: { en: "Corporate website", ar: "موقع شركة" }, text: { en: "Services, projects, team and contact for a company or factory.", ar: "الخدمات والمشروعات والفريق والتواصل لشركة أو مصنع." } },
      { title: { en: "Landing pages", ar: "صفحات الهبوط" }, text: { en: "High-converting pages for ads campaigns and launches.", ar: "صفحات عالية التحويل للحملات الإعلانية وإطلاق المنتجات." } },
      { title: { en: "Customer portal", ar: "بوابة العملاء" }, text: { en: "Accounts, requests, invoices and tracking for your clients.", ar: "حسابات وطلبات وفواتير ومتابعة لعملائك." } },
      { title: { en: "SaaS / web platform", ar: "منصة ويب / SaaS" }, text: { en: "Subscription products with dashboards and payments.", ar: "منتجات باشتراك مع لوحات تحكم ودفع إلكتروني." } },
    ],
    timeline: { en: "2–4 weeks for a corporate site · 6–12 weeks for a web platform", ar: "من 2 إلى 4 أسابيع لموقع الشركة · من 6 إلى 12 أسبوعًا لمنصة الويب" },
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Laravel", "PostgreSQL", "Vercel"],
    faqs: [
      {
        q: { en: "Will my website appear on Google?", ar: "هل سيظهر موقعي على جوجل؟" },
        a: { en: "We build every site to be indexable and fast, submit it to Google Search Console and set up structured data. Ranking for competitive terms also needs content over time — we can advise or handle it.", ar: "نبني كل موقع ليكون سريعًا وقابلًا للأرشفة، ونسجّله في Google Search Console ونضيف البيانات المنظمة. أما تصدّر الكلمات التنافسية فيحتاج إلى محتوى مستمر بمرور الوقت، ويمكننا تقديم الاستشارة أو تولّي ذلك." },
      },
      {
        q: { en: "Can I edit the content myself?", ar: "هل يمكنني تعديل المحتوى بنفسي؟" },
        a: { en: "Yes. You get a dashboard for pages, images, products and posts, plus a short training session.", ar: "نعم. تحصل على لوحة تحكم للصفحات والصور والمنتجات والمقالات، مع جلسة تدريب قصيرة." },
      },
      {
        q: { en: "Who owns the domain and hosting?", ar: "باسم من يُسجَّل الدومين والاستضافة؟" },
        a: { en: "You do. We register or transfer everything to your name and hand over all credentials.", ar: "باسمك أنت. نسجّل أو ننقل كل شيء باسمك ونسلّمك جميع بيانات الدخول." },
      },
    ],
  },
  "mobile-app-development": {
    challenges: [
      {
        problem: { en: "Customers order by phone and WhatsApp, and orders get lost.", ar: "العملاء يطلبون عبر الهاتف وواتساب، وتضيع الطلبات." },
        solution: { en: "An app where customers order, pay and track — and your team sees every order in one dashboard.", ar: "تطبيق يطلب فيه العميل ويدفع ويتابع طلبه، ويرى فريقك كل الطلبات في لوحة واحدة." },
      },
      {
        problem: { en: "Building separate iOS and Android apps is too expensive.", ar: "تطوير تطبيقين منفصلين لأندرويد و iOS مكلف جدًا." },
        solution: { en: "One cross-platform codebase (Flutter / React Native) with native performance on both stores.", ar: "قاعدة كود واحدة متعددة المنصات (Flutter / React Native) بأداء التطبيقات الأصلية على المتجرين." },
      },
      {
        problem: { en: "Your field team works on paper.", ar: "فريقك الميداني يعمل بالورق." },
        solution: { en: "A staff app for visits, orders, photos and GPS check-ins that syncs with your system.", ar: "تطبيق للموظفين لتسجيل الزيارات والطلبات والصور والموقع، متزامن مع نظامك." },
      },
    ],
    deliverables: {
      en: ["UX research & interactive prototype", "iOS and Android apps", "Backend API & admin panel", "Payments, maps & push notifications", "Analytics & crash reporting", "App Store & Google Play publishing"],
      ar: ["دراسة تجربة المستخدم ونموذج تفاعلي", "تطبيق iOS وتطبيق أندرويد", "واجهة API ولوحة تحكم", "دفع إلكتروني وخرائط وإشعارات", "تحليلات ومتابعة الأعطال", "النشر على App Store و Google Play"],
    },
    useCases: [
      { title: { en: "Ordering & delivery", ar: "الطلب والتوصيل" }, text: { en: "Restaurants, groceries and pharmacies with rider tracking.", ar: "للمطاعم والبقالة والصيدليات مع تتبع الطيار." } },
      { title: { en: "Booking apps", ar: "تطبيقات الحجز" }, text: { en: "Clinics, salons, courts and services with reminders.", ar: "للعيادات والصالونات والملاعب والخدمات مع التذكيرات." } },
      { title: { en: "Field-force apps", ar: "تطبيقات الفرق الميدانية" }, text: { en: "Sales reps, technicians and inspectors.", ar: "لمندوبي المبيعات والفنيين والمفتشين." } },
      { title: { en: "Membership & loyalty", ar: "العضويات والولاء" }, text: { en: "Members, points, offers and digital cards.", ar: "الأعضاء والنقاط والعروض والكروت الرقمية." } },
    ],
    timeline: { en: "6–12 weeks for a first release, then monthly updates", ar: "من 6 إلى 12 أسبوعًا للإصدار الأول، ثم تحديثات شهرية" },
    stack: ["Flutter", "React Native", "TypeScript", "Node.js", "Laravel", "Firebase", "PostgreSQL"],
    faqs: [
      {
        q: { en: "Do you publish the app to the stores?", ar: "هل تتولون نشر التطبيق على المتاجر؟" },
        a: { en: "Yes. We prepare store listings, screenshots and privacy details and publish under your own developer accounts.", ar: "نعم. نجهّز صفحات المتجر والصور وبيانات الخصوصية، وننشر التطبيق من حسابات المطوّر الخاصة بك." },
      },
      {
        q: { en: "Can the app work with my existing system?", ar: "هل يمكن ربط التطبيق بنظامي الحالي؟" },
        a: { en: "Usually yes — through an API or a small integration layer we build to sync orders, customers and stock.", ar: "غالبًا نعم — من خلال API أو طبقة تكامل صغيرة نبنيها لمزامنة الطلبات والعملاء والمخزون." },
      },
      {
        q: { en: "What happens after launch?", ar: "ماذا بعد الإطلاق؟" },
        a: { en: "We monitor crashes and performance, ship OS-compatibility updates and keep improving the app on a monthly plan.", ar: "نتابع الأعطال والأداء، ونحدّث التطبيق ليتوافق مع إصدارات الأنظمة الجديدة، ونواصل التطوير ضمن خطة شهرية." },
      },
    ],
  },
  "custom-software": {
    challenges: [
      {
        problem: { en: "The business runs on scattered Excel sheets.", ar: "العمل يُدار عبر ملفات Excel متفرقة." },
        solution: { en: "One system and one source of truth, with permissions and a history of every change.", ar: "نظام واحد ومصدر واحد للبيانات، مع صلاحيات وسجل لكل تعديل." },
      },
      {
        problem: { en: "Ready-made ERPs force you to change how you work.", ar: "برامج ERP الجاهزة تفرض عليك تغيير طريقة عملك." },
        solution: { en: "Modules designed around your actual cycle — approvals, pricing rules and reports included.", ar: "وحدات مصممة حول دورة عملك الفعلية — بما فيها الاعتمادات وقواعد التسعير والتقارير." },
      },
      {
        problem: { en: "Management can’t see branch performance in real time.", ar: "الإدارة لا ترى أداء الفروع لحظيًا." },
        solution: { en: "Live dashboards for sales, stock, cash and KPIs across every branch.", ar: "لوحات متابعة لحظية للمبيعات والمخزون والنقدية ومؤشرات الأداء في كل الفروع." },
      },
    ],
    deliverables: {
      en: ["Process analysis & requirements document", "System architecture & database design", "Web system with role-based permissions", "Data migration from your current files", "Reports, dashboards & exports", "Training, documentation & source code"],
      ar: ["تحليل الإجراءات ووثيقة المتطلبات", "تصميم بنية النظام وقاعدة البيانات", "نظام ويب بصلاحيات حسب الدور", "نقل البيانات من ملفاتك الحالية", "تقارير ولوحات متابعة وتصدير", "تدريب وتوثيق وتسليم الكود المصدري"],
    },
    useCases: [
      { title: { en: "ERP for distributors", ar: "ERP للموزعين" }, text: { en: "Sales reps, routes, collections and warehouses.", ar: "المندوبون وخطوط السير والتحصيل والمستودعات." } },
      { title: { en: "Factory systems", ar: "أنظمة المصانع" }, text: { en: "Bills of materials, production orders and costing.", ar: "مكونات المنتج وأوامر الإنتاج والتكاليف." } },
      { title: { en: "CRM & sales pipeline", ar: "CRM ومتابعة المبيعات" }, text: { en: "Leads, follow-ups, quotations and contracts.", ar: "العملاء المحتملون والمتابعات وعروض الأسعار والعقود." } },
      { title: { en: "Real-estate & contracting", ar: "العقارات والمقاولات" }, text: { en: "Units, instalments, projects and sub-contractors.", ar: "الوحدات والأقساط والمشروعات ومقاولو الباطن." } },
    ],
    timeline: { en: "8–16 weeks for a first phase, delivered in modules", ar: "من 8 إلى 16 أسبوعًا للمرحلة الأولى، والتسليم على وحدات" },
    stack: ["Laravel", "Next.js", "TypeScript", "PostgreSQL", "MySQL", "Redis", "Docker"],
    faqs: [
      {
        q: { en: "Can the system run on our own server?", ar: "هل يمكن تشغيل النظام على خادمنا الخاص؟" },
        a: { en: "Yes — cloud, your own server, or a hybrid setup where branches keep working offline.", ar: "نعم — سحابيًا، أو على خادمك الخاص، أو بشكل مختلط تستمر فيه الفروع في العمل دون اتصال." },
      },
      {
        q: { en: "How do you handle changing requirements?", ar: "كيف تتعاملون مع تغيّر المتطلبات؟" },
        a: { en: "We deliver in modules with weekly demos, so changes are caught early. Larger changes are scoped and priced transparently before work starts.", ar: "نسلّم على وحدات مع عرض أسبوعي، فتظهر التعديلات مبكرًا. أما التغييرات الكبيرة فتُحدَّد وتُسعَّر بوضوح قبل البدء فيها." },
      },
      {
        q: { en: "Is our data secure?", ar: "هل بياناتنا آمنة؟" },
        a: { en: "Encrypted connections, role-based access, audit logs, and automatic encrypted backups are standard in every system.", ar: "الاتصال المشفّر، والصلاحيات حسب الدور، وسجل العمليات، والنسخ الاحتياطي المشفّر التلقائي معايير أساسية في كل نظام." },
      },
    ],
  },
  "ai-chatbots": {
    challenges: [
      {
        problem: { en: "Your team answers the same WhatsApp questions all day.", ar: "فريقك يرد على نفس أسئلة واتساب طوال اليوم." },
        solution: { en: "An Arabic-speaking assistant that answers prices, availability and bookings 24/7 and hands over to a human when needed.", ar: "مساعد يتحدث العربية يرد على الأسعار والتوفر والحجوزات على مدار الساعة، ويحوّل للموظف عند الحاجة." },
      },
      {
        problem: { en: "Staff spend hours typing data from invoices and IDs.", ar: "الموظفون يقضون ساعات في إدخال بيانات الفواتير والبطاقات." },
        solution: { en: "Automatic extraction from photos and PDFs straight into your system, with human review.", ar: "استخراج تلقائي من الصور وملفات PDF مباشرة إلى نظامك، مع مراجعة بشرية." },
      },
      {
        problem: { en: "Knowledge is buried in documents nobody reads.", ar: "المعلومات مدفونة في مستندات لا يقرؤها أحد." },
        solution: { en: "An internal assistant that answers from your policies, manuals and contracts — citing the source.", ar: "مساعد داخلي يجيب من سياساتك وأدلتك وعقودك — مع ذكر المصدر." },
      },
    ],
    deliverables: {
      en: ["Use-case workshop & success metrics", "Chatbot for WhatsApp and website", "Knowledge base built from your content", "Human hand-over & conversation inbox", "Integration with CRM / booking / orders", "Usage dashboard & cost controls"],
      ar: ["ورشة لتحديد الاستخدامات ومؤشرات النجاح", "روبوت محادثة لواتساب والموقع", "قاعدة معرفة مبنية على محتواك", "تحويل للموظف وصندوق للمحادثات", "تكامل مع CRM والحجوزات والطلبات", "لوحة استخدام وضبط للتكاليف"],
    },
    useCases: [
      { title: { en: "Customer service bot", ar: "روبوت خدمة العملاء" }, text: { en: "FAQs, prices, order status and complaints.", ar: "الأسئلة الشائعة والأسعار وحالة الطلب والشكاوى." } },
      { title: { en: "Booking assistant", ar: "مساعد الحجوزات" }, text: { en: "Books, reschedules and reminds over WhatsApp.", ar: "يحجز ويعدّل المواعيد ويذكّر عبر واتساب." } },
      { title: { en: "Document intelligence", ar: "تحليل المستندات" }, text: { en: "Invoices, receipts, IDs and contracts to data.", ar: "تحويل الفواتير والإيصالات والبطاقات والعقود إلى بيانات." } },
      { title: { en: "Internal knowledge assistant", ar: "مساعد المعرفة الداخلي" }, text: { en: "Answers staff questions from company documents.", ar: "يجيب عن أسئلة الموظفين من مستندات الشركة." } },
    ],
    timeline: { en: "2–6 weeks depending on integrations", ar: "من 2 إلى 6 أسابيع حسب التكاملات المطلوبة" },
    stack: ["OpenAI", "Claude", "WhatsApp Cloud API", "LangChain", "pgvector", "Node.js", "Python"],
    faqs: [
      {
        q: { en: "Does the bot understand Egyptian Arabic?", ar: "هل يفهم الروبوت اللهجة المصرية؟" },
        a: { en: "Yes. It understands Egyptian and Gulf dialects as well as Modern Standard Arabic and English, and replies in the customer’s style.", ar: "نعم. يفهم اللهجتين المصرية والخليجية والعربية الفصحى والإنجليزية، ويرد بأسلوب العميل." },
      },
      {
        q: { en: "What if the bot doesn’t know the answer?", ar: "ماذا لو لم يعرف الروبوت الإجابة؟" },
        a: { en: "It is restricted to your approved content and hands the conversation to a team member instead of guessing.", ar: "يقتصر على المحتوى الذي تعتمده، ويحوّل المحادثة إلى أحد أفراد فريقك بدلًا من التخمين." },
      },
      {
        q: { en: "How much does it cost to run?", ar: "كم تبلغ تكلفة التشغيل؟" },
        a: { en: "Running costs depend on message volume. We estimate them upfront, set spending caps and choose the most cost-effective model for each task.", ar: "تعتمد تكلفة التشغيل على حجم الرسائل. نقدّرها مسبقًا، ونضع حدًا أقصى للإنفاق، ونختار النموذج الأنسب تكلفةً لكل مهمة." },
      },
    ],
  },
  "business-automation": {
    challenges: [
      {
        problem: { en: "Orders are copied by hand between WhatsApp, Excel and accounting.", ar: "الطلبات تُنقل يدويًا بين واتساب و Excel والحسابات." },
        solution: { en: "Each order flows automatically from where it arrives to stock, invoice and delivery.", ar: "ينتقل كل طلب تلقائيًا من مكان وصوله إلى المخزون والفاتورة والتوصيل." },
      },
      {
        problem: { en: "Reports take a day to prepare every week.", ar: "إعداد التقارير يستغرق يومًا كل أسبوع." },
        solution: { en: "Scheduled reports land in your inbox or WhatsApp every morning.", ar: "تقارير مجدولة تصل إلى بريدك أو واتساب كل صباح." },
      },
      {
        problem: { en: "Customers aren’t updated about their orders.", ar: "العملاء لا يعرفون حالة طلباتهم." },
        solution: { en: "Automatic WhatsApp and email notifications at every step.", ar: "إشعارات تلقائية عبر واتساب والبريد في كل مرحلة." },
      },
    ],
    deliverables: {
      en: ["Process mapping & automation plan", "Workflows (n8n or custom code)", "API integrations between your tools", "Automated notifications & reports", "Error alerts & retry logic", "Documentation & handover"],
      ar: ["تحليل الإجراءات وخطة الأتمتة", "مسارات عمل آلية (n8n أو كود مخصص)", "تكامل بين أدواتك عبر API", "إشعارات وتقارير تلقائية", "تنبيهات للأخطاء وإعادة المحاولة", "توثيق وتسليم كامل"],
    },
    useCases: [
      { title: { en: "Order-to-cash", ar: "من الطلب إلى التحصيل" }, text: { en: "Order → invoice → payment → delivery, automatically.", ar: "طلب ← فاتورة ← دفع ← توصيل، تلقائيًا." } },
      { title: { en: "Lead routing", ar: "توزيع العملاء المحتملين" }, text: { en: "Ads and forms into CRM, assigned and followed up.", ar: "من الإعلانات والنماذج إلى CRM مع التوزيع والمتابعة." } },
      { title: { en: "E-invoice sync", ar: "مزامنة الفاتورة الإلكترونية" }, text: { en: "Invoices submitted to the tax portal without re-typing.", ar: "إرسال الفواتير للمنظومة دون إعادة إدخال." } },
      { title: { en: "Daily management reports", ar: "تقارير الإدارة اليومية" }, text: { en: "Sales, cash and stock summaries every morning.", ar: "ملخص المبيعات والنقدية والمخزون كل صباح." } },
    ],
    timeline: { en: "1–4 weeks per workflow", ar: "من أسبوع إلى 4 أسابيع لكل مسار عمل" },
    stack: ["n8n", "Node.js", "Python", "WhatsApp Cloud API", "Google Workspace", "Zapier", "PostgreSQL"],
    faqs: [
      {
        q: { en: "Do I need to replace my current tools?", ar: "هل أحتاج إلى استبدال أدواتي الحالية؟" },
        a: { en: "No. Automation connects the tools you already use; we only suggest replacing something if it blocks the workflow.", ar: "لا. الأتمتة تربط الأدوات التي تستخدمها بالفعل، ولا نقترح استبدال أداة إلا إذا كانت تعطّل سير العمل." },
      },
      {
        q: { en: "What if an automation fails?", ar: "ماذا لو تعطّل أحد مسارات الأتمتة؟" },
        a: { en: "Every workflow has error alerts and retries, and failures are logged so nothing is silently lost.", ar: "لكل مسار تنبيهات للأخطاء وإعادة محاولة تلقائية، وتُسجَّل الأعطال حتى لا يضيع شيء دون علمك." },
      },
      {
        q: { en: "How do I know it’s worth it?", ar: "كيف أعرف أن الأتمتة تستحق؟" },
        a: { en: "We estimate hours saved per month for each workflow before building, and start with the one with the fastest payback.", ar: "نقدّر عدد الساعات الموفَّرة شهريًا لكل مسار قبل التنفيذ، ونبدأ بالمسار الأسرع في استرداد تكلفته." },
      },
    ],
  },
  "ecommerce-development": {
    challenges: [
      {
        problem: { en: "Online and in-store stock never match.", ar: "مخزون المتجر الإلكتروني لا يطابق مخزون الفروع." },
        solution: { en: "One inventory shared by the store, the POS and every branch, updated in real time.", ar: "مخزون واحد مشترك بين المتجر ونقاط البيع وكل الفروع، يُحدَّث لحظيًا." },
      },
      {
        problem: { en: "Customers abandon checkout.", ar: "العملاء يتركون السلة قبل الدفع." },
        solution: { en: "A fast checkout with local payment methods, cash on delivery and saved addresses.", ar: "دفع سريع بوسائل الدفع المحلية والدفع عند الاستلام وحفظ العناوين." },
      },
      {
        problem: { en: "Shipping is managed by phone calls.", ar: "الشحن يُدار بالمكالمات الهاتفية." },
        solution: { en: "Courier integration for waybills, tracking and cash-on-delivery settlement.", ar: "تكامل مع شركات الشحن لإصدار البوالص والتتبع وتسوية الدفع عند الاستلام." },
      },
    ],
    deliverables: {
      en: ["Store design & product catalogue", "Checkout with local payment gateways", "Shipping & courier integration", "POS for branches (offline-capable)", "Orders, stock & customers dashboard", "Marketing: coupons, SEO & pixels"],
      ar: ["تصميم المتجر وكتالوج المنتجات", "دفع ببوابات الدفع المحلية", "تكامل مع شركات الشحن", "نقطة بيع للفروع تعمل دون إنترنت", "لوحة للطلبات والمخزون والعملاء", "أدوات تسويق: كوبونات وسيو وبكسل الإعلانات"],
    },
    useCases: [
      { title: { en: "Fashion & retail stores", ar: "متاجر الأزياء والتجزئة" }, text: { en: "Sizes, colours and branch stock.", ar: "المقاسات والألوان ومخزون الفروع." } },
      { title: { en: "Electronics & mobiles", ar: "الإلكترونيات والموبايلات" }, text: { en: "Serial numbers, warranties and instalments.", ar: "الأرقام التسلسلية والضمان والتقسيط." } },
      { title: { en: "Groceries & pharmacies", ar: "البقالة والصيدليات" }, text: { en: "Fast reordering and scheduled delivery.", ar: "إعادة طلب سريعة وتوصيل مجدول." } },
      { title: { en: "B2B wholesale portals", ar: "بوابات البيع بالجملة" }, text: { en: "Customer price lists and credit limits.", ar: "قوائم أسعار لكل عميل وحدود ائتمان." } },
    ],
    timeline: { en: "4–8 weeks for store + POS", ar: "من 4 إلى 8 أسابيع للمتجر ونقاط البيع" },
    stack: ["Next.js", "Laravel", "Shopify", "WooCommerce", "PostgreSQL", "Paymob", "Fawry"],
    faqs: [
      {
        q: { en: "Which payment methods do you support?", ar: "ما وسائل الدفع المتاحة؟" },
        a: { en: "Cards, mobile wallets, instalment providers, Fawry and cash on delivery through local gateways such as Paymob and Fawry.", ar: "البطاقات، والمحافظ الإلكترونية، وشركات التقسيط، وفوري، والدفع عند الاستلام عبر بوابات محلية مثل Paymob و Fawry." },
      },
      {
        q: { en: "Custom store or Shopify?", ar: "متجر مخصص أم Shopify؟" },
        a: { en: "Shopify is fastest for simple catalogues; a custom store is better when you need POS sync, B2B pricing or special logic. We recommend honestly after discovery.", ar: "Shopify أسرع للكتالوجات البسيطة، أما المتجر المخصص فأفضل عند الحاجة إلى مزامنة نقاط البيع أو أسعار الجملة أو منطق خاص. ونرشّح لك الأنسب بصراحة بعد التحليل." },
      },
      {
        q: { en: "Can the POS work during internet outages?", ar: "هل تعمل نقطة البيع عند انقطاع الإنترنت؟" },
        a: { en: "Yes. Branch POS keeps selling offline and syncs stock and sales once the connection is back.", ar: "نعم. تستمر نقطة البيع في الفرع في البيع دون إنترنت، وتزامن المخزون والمبيعات عند عودة الاتصال." },
      },
    ],
  },
};
