// Ready-made systems catalog (bilingual). Each entry powers /systems/[slug]
// and the system cards across the site. Visible copy is plain language for
// owners (no "POS", "ERP", "KPI" jargon); keywords keep the search terms.
// The `screen` block feeds illustrative UI mock-ups (sample data, labelled as
// such on the page). `before` is the paper/Excel life the system replaces.

import type { Locale } from "@/lib/site";

type T = Record<Locale, string>;

export interface SystemModule {
  title: T;
  text: T;
}

export interface SystemScreen {
  /** Sidebar entries of the mock app window. */
  nav: T[];
  stats: { label: T; value: string }[];
  /** Seven relative bar heights (0–100) for the mini chart. */
  chart: number[];
  rows: { name: T; meta: T; value: T | string }[];
}

export interface ReadySystem {
  slug: string;
  icon: string;
  name: T;
  hint: T;
  tagline: T;
  summary: T;
  audience: Record<Locale, string[]>;
  modules: SystemModule[];
  highlights: Record<Locale, string[]>;
  integrations: Record<Locale, string[]>;
  /** Handwritten-notebook lines: how the work is done before the system. */
  before: Record<Locale, string[]>;
  /** Photo under /public/images/site. */
  photo: string;
  photoAlt: T;
  screen: SystemScreen;
  keywords: Record<Locale, string[]>;
}

export const readySystems: ReadySystem[] = [
  {
    slug: "pos-cashier",
    icon: "ScanBarcode",
    name: { en: "Cashier & sales", ar: "الكاشير والمبيعات" },
    hint: { en: "Shops, cafés, restaurants", ar: "المحلات والكافيهات والمطاعم" },
    tagline: { en: "A fast cashier that keeps selling when the internet drops.", ar: "كاشير سريع، بيكمّل بيع حتى لو النت فصل." },
    summary: {
      en: "For shops, cafés and chains: scan, print the receipt, close the shift to the last pound — and see today’s sales from your phone. It keeps working offline and catches up by itself.",
      ar: "للمحلات والكافيهات والسلاسل: امسح الباركود، اطبع الفاتورة، اقفل الوردية بالمليم — وشوف مبيعات النهارده من موبايلك. بيشتغل من غير نت ويحدّث نفسه أول ما يرجع.",
    },
    audience: {
      en: ["Shops & supermarkets", "Cafés & restaurants", "Mobile & electronics stores", "Chains with branches"],
      ar: ["المحلات والسوبر ماركت", "الكافيهات والمطاعم", "محلات الموبايل والإلكترونيات", "السلاسل اللي ليها فروع"],
    },
    modules: [
      { title: { en: "Selling screen", ar: "شاشة البيع" }, text: { en: "Barcode, quick buttons, discounts, paying half cash half card, and parked bills.", ar: "باركود، وزراير سريعة، وخصومات، ودفع نص كاش ونص فيزا، وتعليق الفاتورة." } },
      { title: { en: "Shifts & cash drawer", ar: "الورديات والدرج" }, text: { en: "Open and close shifts, count the cash, and see any difference per cashier.", ar: "افتح واقفل الوردية، اعدّ الفلوس، وشوف أي فرق لكل كاشير." } },
      { title: { en: "Returns & exchanges", ar: "المرتجع والاستبدال" }, text: { en: "Linked to the original receipt, and the item goes back to stock by itself.", ar: "مربوط بالفاتورة الأصلية، والصنف بيرجع المخزن لوحده." } },
      { title: { en: "Customers & points", ar: "العملاء والنقاط" }, text: { en: "Customer accounts, money they owe, and loyalty points.", ar: "حسابات العملاء، والآجل، ونقاط الولاء." } },
      { title: { en: "Stock & buying", ar: "المخزن والمشتريات" }, text: { en: "Supplier bills, an alert before items run out, and stock counts.", ar: "فواتير الموردين، وتنبيه قبل ما الصنف يخلص، والجرد." } },
      { title: { en: "Reports", ar: "التقارير" }, text: { en: "Sales by item, cashier, branch and hour — and today’s profit.", ar: "المبيعات حسب الصنف والكاشير والفرع والساعة — ومكسب النهارده." } },
    ],
    highlights: {
      en: ["Works offline, catches up online", "Receipt and barcode printers", "Each cashier sees only their part", "All branches on one screen", "Ready for e-receipts", "Receipts in Arabic or English"],
      ar: ["يشتغل من غير نت ويحدّث لما يرجع", "طابعات فواتير وباركود", "كل كاشير يشوف اللي يخصه", "كل الفروع على شاشة واحدة", "جاهز للإيصال الإلكتروني", "فواتير بالعربي أو الإنجليزي"],
    },
    integrations: {
      en: ["Barcode scanners", "Receipt printers", "Cash drawers", "Card machines", "Your online store"],
      ar: ["قارئ الباركود", "طابعة الفواتير", "درج الفلوس", "ماكينة الفيزا", "متجرك الأونلاين"],
    },
    before: {
      en: ["Sales written in a notebook", "Cash counted twice, still short", "“How much did we sell today?” — nobody knows"],
      ar: ["المبيعات مكتوبة في كشكول", "الفلوس بتتعد مرتين وبرضه ناقصة", "«بعنا بكام النهارده؟» — محدش عارف"],
    },
    photo: "/images/site/grocery.webp",
    photoAlt: { en: "A grocer arranging fruit in his shop", ar: "صاحب محل بيرتّب الفاكهة في محله" },
    screen: {
      nav: [{ en: "Sales", ar: "البيع" }, { en: "Shifts", ar: "الورديات" }, { en: "Stock", ar: "المخزون" }, { en: "Reports", ar: "التقارير" }],
      stats: [
        { label: { en: "Today’s sales", ar: "مبيعات اليوم" }, value: "48,250" },
        { label: { en: "Invoices", ar: "الفواتير" }, value: "312" },
        { label: { en: "Avg. basket", ar: "متوسط الفاتورة" }, value: "154" },
      ],
      chart: [38, 52, 46, 70, 64, 88, 76],
      rows: [
        { name: { en: "Invoice #10482", ar: "فاتورة 10482" }, meta: { en: "Cashier 2 · Cash", ar: "كاشير 2 · نقدي" }, value: "620.00" },
        { name: { en: "Invoice #10481", ar: "فاتورة 10481" }, meta: { en: "Cashier 1 · Card", ar: "كاشير 1 · بطاقة" }, value: "1,140.50" },
        { name: { en: "Return #R-219", ar: "مرتجع R-219" }, meta: { en: "Linked to #10455", ar: "مرتبط بفاتورة 10455" }, value: "-85.00" },
      ],
    },
    keywords: {
      en: ["POS system Egypt", "cashier system", "offline POS", "retail POS"],
      ar: ["برنامج كاشير", "سيستم كاشير", "نظام نقاط البيع", "برنامج كاشير يعمل بدون انترنت"],
    },
  },
  {
    slug: "inventory-warehouse",
    icon: "Boxes",
    name: { en: "Stock & warehouses", ar: "المخازن والمخزون" },
    hint: { en: "Branch stock and transfers", ar: "مخزون الفروع والتحويلات" },
    tagline: { en: "Know what you have, where it is, and what it cost you.", ar: "اعرف عندك إيه، وفين، وكلّفك كام." },
    summary: {
      en: "For distributors, wholesalers and companies with branches: every item, every shelf and every move between branches — with expiry alerts and the real value of your stock, any time.",
      ar: "للموزعين وتجار الجملة والشركات اللي ليها فروع: كل صنف، وكل رف، وكل حركة بين الفروع — مع تنبيهات الصلاحية وقيمة مخزونك الحقيقية في أي وقت.",
    },
    audience: {
      en: ["Distributors & wholesalers", "Factories & workshops", "Importers", "Shops with branches"],
      ar: ["الموزعين وتجار الجملة", "المصانع والورش", "المستوردين", "المحلات اللي ليها فروع"],
    },
    modules: [
      { title: { en: "Items & units", ar: "الأصناف والوحدات" }, text: { en: "Sizes and colours, carton or piece, barcodes and price lists.", ar: "المقاسات والألوان، بالكرتونة أو بالقطعة، والباركود وقوايم الأسعار." } },
      { title: { en: "Warehouses & shelves", ar: "المخازن والأرفف" }, text: { en: "As many warehouses as you need, down to the shelf.", ar: "عدد مخازن زي ما تحب، لحد مستوى الرف." } },
      { title: { en: "Transfers", ar: "التحويلات" }, text: { en: "Send stock between branches with approval and a receiving note.", ar: "ابعت بضاعة بين الفروع بموافقة وإذن استلام." } },
      { title: { en: "Expiry dates", ar: "تواريخ الصلاحية" }, text: { en: "The nearest expiry goes out first, with alerts before it’s too late.", ar: "الأقرب في الصلاحية يخرج الأول، مع تنبيه قبل فوات الأوان." } },
      { title: { en: "Stock counts", ar: "الجرد" }, text: { en: "Count from a phone camera and see the differences straight away.", ar: "اجرد بكاميرا الموبايل وشوف الفروقات على طول." } },
      { title: { en: "Stock value", ar: "قيمة المخزون" }, text: { en: "What your stock is worth, and what’s been sitting too long.", ar: "مخزونك يسوى كام، وإيه اللي قاعد بقاله كتير." } },
    ],
    highlights: {
      en: ["Full history of every item", "Count stock with your phone", "Reorder alert per warehouse", "Linked to sales and buying", "Approvals for transfers", "Import and export Excel"],
      ar: ["تاريخ كامل لكل صنف", "جرد بالموبايل", "تنبيه إعادة طلب لكل مخزن", "مربوط بالبيع والشراء", "موافقات على التحويلات", "استيراد وتصدير إكسل"],
    },
    integrations: {
      en: ["Cashier", "Accounts", "Online store", "Barcode printers"],
      ar: ["الكاشير", "الحسابات", "المتجر الأونلاين", "طابعات الباركود"],
    },
    before: {
      en: ["Stock lives in someone’s head", "Branch calls: “do we have it?”", "Expired boxes found too late"],
      ar: ["المخزون عايش في دماغ حد", "الفرع يتصل: «عندنا منه؟»", "الكراتين المنتهية بتتلاقي متأخر"],
    },
    photo: "/images/site/warehouse.webp",
    photoAlt: { en: "A warehouse worker checking stock on a tablet", ar: "موظف مخزن بيراجع المخزون على تابلت" },
    screen: {
      nav: [{ en: "Items", ar: "الأصناف" }, { en: "Warehouses", ar: "المستودعات" }, { en: "Transfers", ar: "التحويلات" }, { en: "Stocktake", ar: "الجرد" }],
      stats: [
        { label: { en: "Stock value", ar: "قيمة المخزون" }, value: "1.84M" },
        { label: { en: "Items", ar: "الأصناف" }, value: "3,906" },
        { label: { en: "Below reorder", ar: "تحت حد الطلب" }, value: "27" },
      ],
      chart: [62, 58, 66, 60, 72, 68, 74],
      rows: [
        { name: { en: "Transfer TR-0931", ar: "تحويل TR-0931" }, meta: { en: "Main → Nasr City", ar: "الرئيسي ← مدينة نصر" }, value: { en: "48 items", ar: "48 صنفًا" } },
        { name: { en: "Batch B-2207", ar: "تشغيلة B-2207" }, meta: { en: "Expires in 21 days", ar: "تنتهي خلال 21 يومًا" }, value: "120" },
        { name: { en: "Stocktake #14", ar: "جرد رقم 14" }, meta: { en: "Variance 0.6%", ar: "فروقات 0.6%" }, value: { en: "Done", ar: "مكتمل" } },
      ],
    },
    keywords: {
      en: ["inventory management system Egypt", "warehouse software"],
      ar: ["برنامج مخازن", "برنامج إدارة المخازن", "برنامج مستودعات", "برنامج جرد"],
    },
  },
  {
    slug: "clinic-management",
    icon: "Stethoscope",
    name: { en: "Clinic system", ar: "نظام العيادات" },
    hint: { en: "Bookings, patient files, bills", ar: "الحجوزات وملفات المرضى والفواتير" },
    tagline: { en: "Bookings, patient files and bills — without the paper.", ar: "الحجوزات وملفات المرضى والفواتير — من غير ورق." },
    summary: {
      en: "For clinics, medical centres and dentists: bookings at reception or online, WhatsApp reminders so fewer patients forget, the patient’s full file, prescriptions and bills — private and protected.",
      ar: "للعيادات والمراكز الطبية وعيادات الأسنان: الحجز من الاستقبال أو أونلاين، وتذكير على واتساب عشان المريض مينساش، وملف المريض كامل، والروشتة والفاتورة — بخصوصية وأمان.",
    },
    audience: {
      en: ["Private clinics", "Medical centres", "Dental clinics", "Physiotherapy & beauty"],
      ar: ["العيادات الخاصة", "المراكز الطبية", "عيادات الأسنان", "العلاج الطبيعي والتجميل"],
    },
    modules: [
      { title: { en: "Appointments", ar: "المواعيد" }, text: { en: "Each doctor’s calendar, walk-ins, the waiting list and an online booking page.", ar: "جدول كل دكتور، والكشف الفوري، وقايمة الانتظار، وصفحة حجز أونلاين." } },
      { title: { en: "Patient file", ar: "ملف المريض" }, text: { en: "History, diagnoses, attachments and notes from every visit.", ar: "التاريخ المرضي، والتشخيص، والمرفقات، وملاحظات كل زيارة." } },
      { title: { en: "Prescriptions", ar: "الروشتات" }, text: { en: "Printed prescriptions with each doctor’s own template.", ar: "روشتات مطبوعة بقالب كل دكتور." } },
      { title: { en: "Bills & insurance", ar: "الفواتير والتأمين" }, text: { en: "Service prices, packages, insurance claims and receipts.", ar: "أسعار الخدمات، والباقات، ومطالبات التأمين، والإيصالات." } },
      { title: { en: "Reminders", ar: "التذكير" }, text: { en: "Automatic WhatsApp or SMS reminders, so fewer empty slots.", ar: "تذكير تلقائي على واتساب أو رسالة، فالمواعيد الفاضية تقل." } },
      { title: { en: "Reports", ar: "التقارير" }, text: { en: "Income per doctor and service, visits and follow-ups.", ar: "الدخل لكل دكتور وخدمة، والزيارات والمتابعات." } },
    ],
    highlights: {
      en: ["Medical files only for the right people", "Separate doctor and reception screens", "Online booking page", "WhatsApp reminders", "Many doctors and branches", "Automatic daily backup"],
      ar: ["الملف الطبي للي ليه حق بس", "شاشة للدكتور وشاشة للاستقبال", "صفحة حجز أونلاين", "تذكير على واتساب", "دكاترة وفروع كتير", "نسخة احتياطية كل يوم لوحدها"],
    },
    integrations: {
      en: ["WhatsApp", "SMS", "Payment links", "Lab results upload"],
      ar: ["واتساب", "الرسائل", "لينكات الدفع", "رفع نتايج التحاليل"],
    },
    before: {
      en: ["Bookings in a paper diary", "Patient files in a cabinet", "No-shows nobody reminded"],
      ar: ["الحجوزات في أجندة ورق", "ملفات المرضى في دولاب", "مواعيد ضاعت عشان محدش فكّر المريض"],
    },
    photo: "/images/site/clinic-v2.webp",
    photoAlt: { en: "A doctor holding a handful of medicine in a clinic", ar: "دكتور ماسك أدوية في إيده جوه العيادة" },
    screen: {
      nav: [{ en: "Calendar", ar: "المواعيد" }, { en: "Patients", ar: "المرضى" }, { en: "Billing", ar: "الفواتير" }, { en: "Reports", ar: "التقارير" }],
      stats: [
        { label: { en: "Appointments today", ar: "مواعيد اليوم" }, value: "64" },
        { label: { en: "Waiting", ar: "في الانتظار" }, value: "7" },
        { label: { en: "No-show rate", ar: "نسبة الغياب" }, value: "4%" },
      ],
      chart: [40, 66, 72, 58, 80, 54, 30],
      rows: [
        { name: { en: "10:30 · Follow-up", ar: "10:30 · متابعة" }, meta: { en: "Dr. Ahmed · Room 2", ar: "د. أحمد · غرفة 2" }, value: { en: "Checked in", ar: "حضر" } },
        { name: { en: "11:00 · New patient", ar: "11:00 · مريض جديد" }, meta: { en: "Dr. Omar · Room 1", ar: "د. عمر · غرفة 1" }, value: { en: "Confirmed", ar: "مؤكد" } },
        { name: { en: "11:15 · Consultation", ar: "11:15 · استشارة" }, meta: { en: "Reminder sent", ar: "تم إرسال التذكير" }, value: { en: "Booked", ar: "محجوز" } },
      ],
    },
    keywords: {
      en: ["clinic management system Egypt", "medical centre software"],
      ar: ["برنامج إدارة العيادات", "برنامج عيادات", "سيستم عيادة", "برنامج حجز مواعيد"],
    },
  },
  {
    slug: "pharmacy-system",
    icon: "Pill",
    name: { en: "Pharmacy system", ar: "نظام الصيدليات" },
    hint: { en: "Expiry alerts, stock, sales", ar: "تنبيهات الصلاحية والمخزون والمبيعات" },
    tagline: { en: "Fewer expired boxes, a faster counter, clearer profit.", ar: "هالك أقل، وصرف أسرع، ومكسب أوضح." },
    summary: {
      en: "For single pharmacies and chains: a fast counter, a medicine list with alternatives, expiry tracking, supplier orders and returns, delivery orders and transfers between branches.",
      ar: "للصيدليات الفردي والسلاسل: صرف سريع، وقايمة أدوية بالبدايل، ومتابعة الصلاحية، وطلبيات الموردين والمرتجع، وطلبات التوصيل، والتحويل بين الفروع.",
    },
    audience: {
      en: ["Independent pharmacies", "Pharmacy chains", "Medical supply shops", "Pharmacies with delivery"],
      ar: ["الصيدليات المستقلة", "سلاسل الصيدليات", "محلات المستلزمات الطبية", "الصيدليات اللي بتوصّل"],
    },
    modules: [
      { title: { en: "Counter", ar: "شاشة الصرف" }, text: { en: "Search by name, ingredient or barcode; sell by strip or box.", ar: "دوّر بالاسم أو المادة الفعالة أو الباركود، وبيع بالشريط أو بالعلبة." } },
      { title: { en: "Alternatives", ar: "البدايل" }, text: { en: "Suggests what you have with the same active ingredient.", ar: "يقترح الموجود عندك بنفس المادة الفعالة." } },
      { title: { en: "Expiry control", ar: "متابعة الصلاحية" }, text: { en: "Alerts before boxes expire, and returns to the supplier.", ar: "تنبيه قبل ما العلب تنتهي، والمرتجع للمورد." } },
      { title: { en: "Buying", ar: "المشتريات" }, text: { en: "Supplier orders, bonuses, discounts and balances.", ar: "طلبيات الموردين، والبونص، والخصم، والأرصدة." } },
      { title: { en: "Delivery orders", ar: "طلبات التوصيل" }, text: { en: "Phone and WhatsApp orders, the rider and the money he brings back.", ar: "طلبات التليفون والواتساب، والطيار، والفلوس اللي راجع بيها." } },
      { title: { en: "Branches", ar: "الفروع" }, text: { en: "Transfers, one price list and reports for all branches.", ar: "التحويلات، وقايمة أسعار واحدة، وتقارير لكل الفروع." } },
    ],
    highlights: {
      en: ["Expiry and shortage alerts", "Sell by strip or by box", "Each customer’s medicine history", "Supplier balances & bonuses", "Shift and cash control", "The counter works offline"],
      ar: ["تنبيهات الصلاحية والنواقص", "بيع بالشريط أو بالعلبة", "سجل أدوية كل عميل", "أرصدة الموردين والبونص", "متابعة الوردية والدرج", "شاشة الصرف تشتغل من غير نت"],
    },
    integrations: {
      en: ["Barcode scanners", "Receipt printers", "WhatsApp orders", "Accounts"],
      ar: ["قارئ الباركود", "طابعة الإيصالات", "طلبات الواتساب", "الحسابات"],
    },
    before: {
      en: ["Expiry dates checked by hand", "Shortages discovered at the counter", "Delivery money tracked on paper"],
      ar: ["الصلاحية بتتراجع بالإيد", "النواقص بتبان وأنت بتصرف", "فلوس التوصيل متسجلة في ورقة"],
    },
    photo: "/images/site/pharmacy.webp",
    photoAlt: { en: "A pharmacist reaching for a box on the pharmacy shelves", ar: "صيدلي بيجيب علبة من على رفوف الصيدلية" },
    screen: {
      nav: [{ en: "Counter", ar: "الصرف" }, { en: "Stock", ar: "المخزون" }, { en: "Suppliers", ar: "الموردون" }, { en: "Delivery", ar: "التوصيل" }],
      stats: [
        { label: { en: "Sales today", ar: "مبيعات اليوم" }, value: "21,780" },
        { label: { en: "Near expiry", ar: "قرب الانتهاء" }, value: "18" },
        { label: { en: "Shortages", ar: "النواقص" }, value: "9" },
      ],
      chart: [44, 50, 62, 58, 70, 82, 66],
      rows: [
        { name: { en: "Panadol Extra 24 tabs", ar: "بانادول إكسترا 24 قرص" }, meta: { en: "Batch 4471 · 2 months", ar: "تشغيلة 4471 · شهران" }, value: "36" },
        { name: { en: "Delivery #D-882", ar: "توصيل D-882" }, meta: { en: "Rider: Mahmoud", ar: "الطيار: محمود" }, value: { en: "On the way", ar: "في الطريق" } },
        { name: { en: "Supplier order PO-311", ar: "طلبية مورد PO-311" }, meta: { en: "Bonus 10+1", ar: "بونص 10+1" }, value: { en: "Received", ar: "تم الاستلام" } },
      ],
    },
    keywords: {
      en: ["pharmacy management system Egypt", "pharmacy POS"],
      ar: ["برنامج صيدليات", "برنامج إدارة صيدلية", "سيستم صيدلية", "برنامج صيدلية بالباركود"],
    },
  },
  {
    slug: "gym-management",
    icon: "Dumbbell",
    name: { en: "Gym system", ar: "نظام الجيم" },
    hint: { en: "Memberships, attendance", ar: "الاشتراكات والحضور" },
    tagline: { en: "Memberships that renew, and a door that knows who’s in.", ar: "اشتراكات بتتجدد بسهولة، وباب عارف مين دخل." },
    summary: {
      en: "For gyms, studios and sports academies: plans and freezes, check-in by QR, fingerprint or card, personal-training sessions, classes, renewals and payments — plus an app for your members.",
      ar: "للجيمات والاستوديوهات والأكاديميات الرياضية: الباقات والتجميد، والدخول بالـ QR أو البصمة أو الكارت، وحصص البرايفت، والكلاسات، والتجديد والتحصيل — ومعاه تطبيق لأعضائك.",
    },
    audience: {
      en: ["Gyms & clubs", "Ladies-only studios", "Sports academies", "CrossFit & martial arts"],
      ar: ["الجيمات والنوادي", "استوديوهات السيدات", "الأكاديميات الرياضية", "الكروس فيت والفنون القتالية"],
    },
    modules: [
      { title: { en: "Memberships", ar: "الاشتراكات" }, text: { en: "Plans, freezes, upgrades, family and company packages.", ar: "الباقات، والتجميد، والترقية، وباقات العيلة والشركات." } },
      { title: { en: "Check-in", ar: "الدخول والحضور" }, text: { en: "QR, fingerprint or card at the door.", ar: "QR أو بصمة أو كارت على الباب." } },
      { title: { en: "Classes & trainers", ar: "الكلاسات والمدربين" }, text: { en: "Class times, places left, trainer sessions and commissions.", ar: "مواعيد الكلاسات، والأماكن الفاضية، وحصص المدربين وعمولاتهم." } },
      { title: { en: "Renewals", ar: "التجديد والتحصيل" }, text: { en: "Reminders before a plan ends, instalments and payment links.", ar: "تذكير قبل الاشتراك ما يخلص، وأقساط، ولينكات دفع." } },
      { title: { en: "Member app", ar: "تطبيق الأعضاء" }, text: { en: "Bookings, a QR pass, progress and notifications.", ar: "الحجز، وكارت QR، والمتابعة، والإشعارات." } },
      { title: { en: "Shop & reports", ar: "الشوب والتقارير" }, text: { en: "Supplements shop, income, and who stopped coming.", ar: "شوب المكملات، والدخل، ومين بطّل ييجي." } },
    ],
    highlights: {
      en: ["Automatic renewal reminders", "Freeze and transfer rules", "Trainer commission reports", "Turnstiles and fingerprint", "Member mobile app", "One plan, many branches"],
      ar: ["تذكير تلقائي بالتجديد", "قواعد التجميد والنقل", "تقارير عمولات المدربين", "البوابات والبصمة", "تطبيق موبايل للأعضاء", "اشتراك واحد لكذا فرع"],
    },
    integrations: {
      en: ["Fingerprint devices", "Turnstiles", "Payment links", "WhatsApp reminders"],
      ar: ["أجهزة البصمة", "البوابات", "لينكات الدفع", "تذكير واتساب"],
    },
    before: {
      en: ["Members listed in an Excel sheet", "Expired plans still coming in", "Renewals chased by phone"],
      ar: ["الأعضاء في شيت إكسل", "اشتراكات خلصت ولسه بتدخل", "التجديد بالتليفون والتحايل"],
    },
    photo: "/images/site/gym-v2.webp",
    photoAlt: { en: "A member training on a machine at the gym", ar: "عضو بيتمرّن على جهاز في الجيم" },
    screen: {
      nav: [{ en: "Members", ar: "الأعضاء" }, { en: "Check-ins", ar: "الحضور" }, { en: "Classes", ar: "الكلاسات" }, { en: "Renewals", ar: "التجديد" }],
      stats: [
        { label: { en: "Active members", ar: "الأعضاء النشطون" }, value: "1,248" },
        { label: { en: "Check-ins today", ar: "حضور اليوم" }, value: "386" },
        { label: { en: "Expiring this week", ar: "ينتهي هذا الأسبوع" }, value: "42" },
      ],
      chart: [30, 48, 76, 60, 52, 84, 70],
      rows: [
        { name: { en: "Ahmed K. · Gold 12M", ar: "أحمد ك. · ذهبي 12 شهرًا" }, meta: { en: "Checked in 18:42", ar: "دخول 18:42" }, value: { en: "Active", ar: "نشط" } },
        { name: { en: "HIIT · 19:00", ar: "HIIT · 19:00" }, meta: { en: "Coach Nour", ar: "الكوتش نور" }, value: "18/20" },
        { name: { en: "Mahmoud S. · 3M", ar: "محمود س. · 3 أشهر" }, meta: { en: "Expires in 2 days", ar: "ينتهي خلال يومين" }, value: { en: "Reminded", ar: "تم التذكير" } },
      ],
    },
    keywords: {
      en: ["gym management software Egypt", "gym membership system"],
      ar: ["برنامج جيم", "برنامج إدارة صالات رياضية", "سيستم جيم", "برنامج اشتراكات جيم"],
    },
  },
  {
    slug: "restaurant-system",
    icon: "UtensilsCrossed",
    name: { en: "Restaurants & cafés", ar: "المطاعم والكافيهات" },
    hint: { en: "Orders, kitchen, delivery", ar: "الطلبات والمطبخ والتوصيل" },
    tagline: { en: "From the table to the kitchen to the rider — one flow.", ar: "من الترابيزة للمطبخ للطيار — في سكة واحدة." },
    summary: {
      en: "For restaurants and cafés: tables, takeaway and delivery, a kitchen screen, recipes that take ingredients out of stock with every sale, delivery areas and riders — and app orders on the same screen.",
      ar: "للمطاعم والكافيهات: الصالة والترابيزات، والتيك أواي والتوصيل، وشاشة المطبخ، ووصفات بتخصم الخامات مع كل بيعة، ومناطق التوصيل والطيارين — وطلبات التطبيقات على نفس الشاشة.",
    },
    audience: {
      en: ["Restaurants & cafés", "Delivery-only kitchens", "Bakeries & desserts", "Food chains"],
      ar: ["المطاعم والكافيهات", "مطابخ التوصيل", "المخابز والحلويات", "سلاسل الأكل"],
    },
    modules: [
      { title: { en: "Taking orders", ar: "استقبال الطلبات" }, text: { en: "Dine-in, takeaway, delivery and phone orders.", ar: "صالة وتيك أواي وتوصيل وطلبات التليفون." } },
      { title: { en: "Tables & waiters", ar: "الترابيزات والويترز" }, text: { en: "Floor plan, moving tables, splitting bills and service.", ar: "رسمة الصالة، ونقل الترابيزات، وتقسيم الحساب، والخدمة." } },
      { title: { en: "Kitchen screen", ar: "شاشة المطبخ" }, text: { en: "Each order goes to the right station with a timer.", ar: "كل طلب يروح للقسم الصح ومعاه عدّاد وقت." } },
      { title: { en: "Recipes & cost", ar: "الوصفات والتكلفة" }, text: { en: "Ingredients deducted with each sale; the real cost of every dish.", ar: "الخامات بتتخصم مع كل بيعة، والتكلفة الحقيقية لكل طبق." } },
      { title: { en: "Delivery", ar: "التوصيل" }, text: { en: "Areas, delivery fees, riders and their money.", ar: "المناطق، ومصاريف التوصيل، والطيارين وحسابهم." } },
      { title: { en: "Reports", ar: "التقارير" }, text: { en: "Best sellers, rush hours, waste and branch comparison.", ar: "الأكتر بيعًا، وساعات الزحمة، والهالك، ومقارنة الفروع." } },
    ],
    highlights: {
      en: ["Kitchen screen & printers", "Stock deducted by recipe", "Delivery areas & riders", "Order from a QR menu", "The cashier works offline", "Menus and prices per branch"],
      ar: ["شاشة وطابعات المطبخ", "خصم الخامات بالوصفة", "مناطق التوصيل والطيارين", "طلب من منيو QR", "الكاشير يشتغل من غير نت", "منيو وأسعار لكل فرع"],
    },
    integrations: {
      en: ["Kitchen printers", "Delivery apps", "Caller ID", "Online menu"],
      ar: ["طابعات المطبخ", "تطبيقات التوصيل", "إظهار رقم المتصل", "المنيو الأونلاين"],
    },
    before: {
      en: ["Orders shouted to the kitchen", "Delivery money counted at midnight", "Nobody knows the real cost of a dish"],
      ar: ["الطلبات بتتنده للمطبخ", "فلوس التوصيل بتتعد نص الليل", "محدش عارف الطبق بيتكلف كام بجد"],
    },
    photo: "/images/site/restaurant.webp",
    photoAlt: { en: "A restaurant worker taking an order on a touch screen", ar: "موظف مطعم بياخد طلب على شاشة تاتش" },
    screen: {
      nav: [{ en: "Orders", ar: "الطلبات" }, { en: "Tables", ar: "الطاولات" }, { en: "Kitchen", ar: "المطبخ" }, { en: "Delivery", ar: "التوصيل" }],
      stats: [
        { label: { en: "Orders today", ar: "طلبات اليوم" }, value: "214" },
        { label: { en: "Avg. prep time", ar: "متوسط التحضير" }, value: "11m" },
        { label: { en: "Food cost", ar: "تكلفة الخامات" }, value: "31%" },
      ],
      chart: [20, 34, 78, 52, 40, 90, 82],
      rows: [
        { name: { en: "Table 7 · 4 guests", ar: "طاولة 7 · 4 أفراد" }, meta: { en: "Grill station", ar: "قسم المشويات" }, value: { en: "Preparing", ar: "قيد التحضير" } },
        { name: { en: "Delivery #5521", ar: "توصيل 5521" }, meta: { en: "Zone: Maadi", ar: "منطقة: المعادي" }, value: { en: "Out", ar: "خرج للتوصيل" } },
        { name: { en: "Takeaway #5519", ar: "تيك أواي 5519" }, meta: { en: "Paid · Card", ar: "مدفوع · بطاقة" }, value: { en: "Ready", ar: "جاهز" } },
      ],
    },
    keywords: {
      en: ["restaurant POS Egypt", "restaurant management system"],
      ar: ["برنامج مطاعم", "سيستم مطعم", "برنامج كاشير مطاعم", "برنامج إدارة مطعم"],
    },
  },
  {
    slug: "school-management",
    icon: "GraduationCap",
    name: { en: "Schools & centres", ar: "المدارس ومراكز التعليم" },
    hint: { en: "Students, fees, timetables", ar: "الطلاب والمصاريف والجداول" },
    tagline: { en: "Students, fees and timetables — with parents in the loop.", ar: "الطلاب والمصاريف والجداول — وأولياء الأمور في الصورة." },
    summary: {
      en: "For schools, training centres and academies: registration, student files, timetables, attendance, grades, fees and instalments — with a page for parents and students and instant notifications.",
      ar: "للمدارس والسناتر والأكاديميات: التسجيل، وملفات الطلاب، والجداول، والحضور، والدرجات، والمصاريف والأقساط — مع صفحة لأولياء الأمور والطلاب وإشعارات فورية.",
    },
    audience: {
      en: ["Private & international schools", "Training centres", "Language & coding academies", "Nurseries"],
      ar: ["المدارس الخاصة والدولية", "مراكز التدريب", "أكاديميات اللغات والبرمجة", "الحضانات"],
    },
    modules: [
      { title: { en: "Registration", ar: "التسجيل والقبول" }, text: { en: "Applications, interviews, documents and enrolment.", ar: "طلبات الالتحاق، والمقابلات، والأوراق، والتسجيل." } },
      { title: { en: "Students & classes", ar: "الطلاب والفصول" }, text: { en: "Student files, classes, groups and transfers.", ar: "ملفات الطلاب، والفصول، والمجموعات، والتحويلات." } },
      { title: { en: "Timetables & attendance", ar: "الجداول والحضور" }, text: { en: "Weekly timetables, teacher loads and daily attendance.", ar: "الجدول الأسبوعي، ونصاب المدرسين، والحضور اليومي." } },
      { title: { en: "Exams & grades", ar: "الامتحانات والدرجات" }, text: { en: "Tests, grade sheets and report cards.", ar: "الامتحانات، وكشوف الدرجات، والشهادات." } },
      { title: { en: "Fees & instalments", ar: "المصاريف والأقساط" }, text: { en: "Fee plans, sibling discounts and late payments.", ar: "خطط المصاريف، وخصم الإخوات، والمتأخرات." } },
      { title: { en: "Parents’ page", ar: "صفحة ولي الأمر" }, text: { en: "Grades, attendance, invoices and announcements.", ar: "الدرجات، والحضور، والفواتير، والإعلانات." } },
    ],
    highlights: {
      en: ["A page for parents and students", "Instalments with reminders", "Bus and transport lists", "Teacher accounts", "Report cards in Arabic & English", "Pay fees online"],
      ar: ["صفحة لأولياء الأمور والطلاب", "أقساط بتذكير تلقائي", "قوايم الباصات", "حسابات للمدرسين", "شهادات بالعربي والإنجليزي", "دفع المصاريف أونلاين"],
    },
    integrations: {
      en: ["Online payment", "WhatsApp / SMS", "Zoom / Google Meet", "Accounts"],
      ar: ["الدفع الأونلاين", "واتساب ورسائل", "Zoom و Google Meet", "الحسابات"],
    },
    before: {
      en: ["Attendance on paper sheets", "Fees tracked in three notebooks", "Parents call to ask about grades"],
      ar: ["الحضور على ورق", "المصاريف متسجلة في تلات كشاكيل", "أولياء الأمور بيتصلوا يسألوا على الدرجات"],
    },
    photo: "/images/site/classroom-v2.webp",
    photoAlt: { en: "A teacher explaining a lesson at the whiteboard", ar: "مدرّس بيشرح الدرس على السبورة" },
    screen: {
      nav: [{ en: "Students", ar: "الطلاب" }, { en: "Attendance", ar: "الحضور" }, { en: "Grades", ar: "الدرجات" }, { en: "Fees", ar: "الرسوم" }],
      stats: [
        { label: { en: "Students", ar: "الطلاب" }, value: "860" },
        { label: { en: "Attendance today", ar: "حضور اليوم" }, value: "96%" },
        { label: { en: "Fees collected", ar: "الرسوم المحصّلة" }, value: "78%" },
      ],
      chart: [70, 74, 72, 78, 80, 84, 88],
      rows: [
        { name: { en: "Grade 5 — B", ar: "الصف الخامس — ب" }, meta: { en: "28 / 29 present", ar: "28 من 29 حاضر" }, value: { en: "Taken", ar: "تم التسجيل" } },
        { name: { en: "Instalment 2 / 4", ar: "القسط 2 من 4" }, meta: { en: "Due in 5 days · 124 students", ar: "يستحق خلال 5 أيام · 124 طالبًا" }, value: { en: "Reminded", ar: "تم التذكير" } },
        { name: { en: "Mid-term — Math", ar: "منتصف الفصل — رياضيات" }, meta: { en: "Grades published", ar: "تم نشر الدرجات" }, value: { en: "Done", ar: "مكتمل" } },
      ],
    },
    keywords: {
      en: ["school management system Egypt", "academy management software"],
      ar: ["برنامج إدارة مدارس", "برنامج مدرسة", "برنامج إدارة مراكز تدريب", "برنامج حضور وغياب"],
    },
  },
  {
    slug: "accounting-hr",
    icon: "Calculator",
    name: { en: "Accounts & payroll", ar: "الحسابات والمرتبات" },
    hint: { en: "Invoices, salaries, reports", ar: "الفواتير والمرتبات والتقارير" },
    tagline: { en: "Books that close on time, and salaries that add up.", ar: "حسابات بتتقفل في ميعادها، ومرتبات مظبوطة." },
    summary: {
      en: "Invoices, who owes you and whom you owe, banks and cheques, the Tax Authority e-invoice — plus your staff: files, attendance, leave, salaries and insurance. Your profit and loss whenever you ask.",
      ar: "الفواتير، واللي ليك واللي عليك، والبنوك والشيكات، والفاتورة الإلكترونية — ومعاها الموظفين: الملفات، والحضور، والإجازات، والمرتبات، والتأمينات. ومكسبك وخسارتك وقت ما تحب.",
    },
    audience: {
      en: ["Small & medium companies", "Contracting & services", "Accounting offices", "Teams of 10 to 500 people"],
      ar: ["الشركات الصغيرة والمتوسطة", "المقاولات والخدمات", "مكاتب المحاسبة", "فرق من 10 لـ 500 موظف"],
    },
    modules: [
      { title: { en: "Accounts", ar: "الحسابات" }, text: { en: "Your accounts list, daily entries and cost centres.", ar: "دليل الحسابات، والقيود اليومية، ومراكز التكلفة." } },
      { title: { en: "Sales & buying", ar: "المبيعات والمشتريات" }, text: { en: "Quotations, invoices, returns — who owes you and whom you owe.", ar: "عروض الأسعار، والفواتير، والمرتجعات — اللي ليك واللي عليك." } },
      { title: { en: "Banks & cheques", ar: "البنوك والشيكات" }, text: { en: "Bank accounts, matching statements and cheques.", ar: "حسابات البنوك، ومطابقة الكشوف، والشيكات." } },
      { title: { en: "E-invoice", ar: "الفاتورة الإلكترونية" }, text: { en: "Sent to the Egyptian Tax Authority directly.", ar: "بتتبعت لمصلحة الضرائب على طول." } },
      { title: { en: "Staff & attendance", ar: "الموظفين والحضور" }, text: { en: "Files, shifts, leave and fingerprint attendance.", ar: "الملفات، والورديات، والإجازات، وحضور البصمة." } },
      { title: { en: "Salaries", ar: "المرتبات" }, text: { en: "Allowances, deductions, advances, insurance and payslips.", ar: "البدلات، والخصومات، والسلف، والتأمينات، وكشف المرتب." } },
    ],
    highlights: {
      en: ["Tax Authority e-invoice", "Profit & loss on demand", "Cost per project or branch", "Salaries with insurance", "Approvals before payments", "A record of every change"],
      ar: ["الفاتورة الإلكترونية", "المكسب والخسارة وقت ما تحب", "التكلفة لكل مشروع أو فرع", "مرتبات بالتأمينات", "موافقات قبل الصرف", "سجل بكل تعديل"],
    },
    integrations: {
      en: ["Tax Authority e-invoice", "Fingerprint devices", "Bank statements (Excel)", "Cashier & stock"],
      ar: ["منظومة الفاتورة الإلكترونية", "أجهزة البصمة", "كشوف البنك (إكسل)", "الكاشير والمخزن"],
    },
    before: {
      en: ["Invoices in a drawer, entries in Excel", "Salaries recalculated every month", "Profit known only at year end"],
      ar: ["الفواتير في درج والقيود في إكسل", "المرتبات بتتحسب من الأول كل شهر", "المكسب بيتعرف آخر السنة بس"],
    },
    photo: "/images/site/receipts-v2.webp",
    photoAlt: { en: "An accountant going over invoices and cash with a phone calculator", ar: "محاسب بيراجع فواتير وفلوس بالآلة الحاسبة على الموبايل" },
    screen: {
      nav: [{ en: "Ledger", ar: "الأستاذ" }, { en: "Invoices", ar: "الفواتير" }, { en: "Payroll", ar: "الرواتب" }, { en: "Reports", ar: "التقارير" }],
      stats: [
        { label: { en: "Receivables", ar: "المدينون" }, value: "412K" },
        { label: { en: "Payables", ar: "الدائنون" }, value: "268K" },
        { label: { en: "Payroll (month)", ar: "رواتب الشهر" }, value: "196K" },
      ],
      chart: [55, 60, 52, 64, 70, 66, 78],
      rows: [
        { name: { en: "INV-2026-0418", ar: "فاتورة 2026-0418" }, meta: { en: "Submitted to ETA", ar: "أُرسلت للمنظومة" }, value: { en: "Valid", ar: "مقبولة" } },
        { name: { en: "JV-1192 · Rent", ar: "قيد 1192 · إيجار" }, meta: { en: "Cost centre: HQ", ar: "مركز التكلفة: الإدارة" }, value: { en: "Posted", ar: "مُرحّل" } },
        { name: { en: "Payroll · September", ar: "رواتب سبتمبر" }, meta: { en: "64 employees", ar: "64 موظفًا" }, value: { en: "Approved", ar: "معتمد" } },
      ],
    },
    keywords: {
      en: ["accounting software Egypt", "payroll software Egypt", "e-invoice integration"],
      ar: ["برنامج حسابات", "برنامج محاسبة", "برنامج رواتب وشؤون عاملين", "برنامج متوافق مع الفاتورة الإلكترونية"],
    },
  },
];

export function getSystem(slug: string) {
  return readySystems.find((s) => s.slug === slug);
}

/** Shared steps for every ready-made system. */
export const systemSteps: { title: T; text: T }[] = [
  {
    title: { en: "A free demo", ar: "عرض تجريبي مجاني" },
    text: { en: "30 minutes on your own day-to-day — online, or at your place.", ar: "30 دقيقة على شغلك أنت — أونلاين أو عندك في المكان." },
  },
  {
    title: { en: "We set it up for you", ar: "نجهّزه لك" },
    text: { en: "Branches, users, prices and your logo — and we move your old data in ourselves.", ar: "الفروع والمستخدمين والأسعار واللوجو بتاعك — وننقل بياناتك القديمة بنفسنا." },
  },
  {
    title: { en: "Training & first day", ar: "التدريب وأول يوم" },
    text: { en: "Hands-on training for each person, and we stay with you through the first weeks.", ar: "تدريب عملي لكل شخص، ونفضل معاك أول كام أسبوع." },
  },
  {
    title: { en: "Support & updates", ar: "الدعم والتحديثات" },
    text: { en: "Help on WhatsApp and phone, regular updates and automatic backups.", ar: "دعم على واتساب والتليفون، وتحديثات مستمرة، ونسخة احتياطية لوحدها." },
  },
];

export const systemFaqs: { q: T; a: T }[] = [
  {
    q: { en: "Can it be adjusted to how I work?", ar: "ينفع يتظبط على طريقة شغلي؟" },
    a: {
      en: "Yes. Branches, permissions, prices and printed layouts are all set up for you, and we can add extra screens or reports with a clear price.",
      ar: "أيوه. الفروع والصلاحيات والأسعار وشكل المطبوعات كلها بتتظبط لك، ونقدر نضيف شاشات أو تقارير زيادة بسعر واضح.",
    },
  },
  {
    q: { en: "Does it work without internet?", ar: "بيشتغل من غير نت؟" },
    a: {
      en: "The counter (cashier, pharmacy, restaurant) keeps working offline and catches up automatically when the internet is back. Owner dashboards need a connection.",
      ar: "الكاشير والصيدلية والمطعم بيكمّلوا شغل من غير نت ويتحدّثوا لوحدهم أول ما يرجع. لوحة صاحب الشغل محتاجة نت.",
    },
  },
  {
    q: { en: "Can you move my data from my current program?", ar: "تقدروا تنقلوا بياناتي من البرنامج اللي عندي؟" },
    a: {
      en: "Yes. We move items, customers, suppliers and opening balances from Excel or most common programs — it’s part of the setup.",
      ar: "أيوه. بننقل الأصناف والعملاء والموردين والأرصدة من الإكسل أو من أغلب البرامج المنتشرة — وده جزء من التجهيز.",
    },
  },
  {
    q: { en: "Where is my data kept? Is there a backup?", ar: "بياناتي بتتحفظ فين؟ وفيه نسخة احتياطية؟" },
    a: {
      en: "On our managed servers with a protected backup every day — or on your own computer if you buy it once. Your data is always yours, and you can export it any time.",
      ar: "على السيرفرات بتاعتنا بنسخة احتياطية محمية كل يوم — أو على جهازك أنت لو اشتريته مرة واحدة. بياناتك ملكك دايمًا وتقدر تطلّعها في أي وقت.",
    },
  },
  {
    q: { en: "What devices do I need?", ar: "محتاج أجهزة إيه؟" },
    a: {
      en: "Any recent Windows computer, laptop or tablet. We recommend tested barcode scanners and printers, and can supply and install them.",
      ar: "أي كمبيوتر ويندوز حديث أو لابتوب أو تابلت. وبنرشّح لك قارئ باركود وطابعات مجرّبة، ونقدر نوردها ونركّبها.",
    },
  },
];

/**
 * Which ready-made systems fit each service (used for internal links both
 * ways: service page → systems, system page → services).
 */
export const serviceSystems: Record<string, string[]> = {
  "website-development": ["clinic-management", "restaurant-system", "school-management"],
  "mobile-app-development": ["restaurant-system", "gym-management", "pharmacy-system"],
  "custom-software": ["inventory-warehouse", "accounting-hr", "pos-cashier"],
  "ai-chatbots": ["clinic-management", "restaurant-system"],
  "business-automation": ["accounting-hr", "inventory-warehouse"],
  "ecommerce-development": ["pos-cashier", "inventory-warehouse"],
};
