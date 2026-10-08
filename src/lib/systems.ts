// Ready-made systems catalog (bilingual). Each entry powers /systems/[slug]
// and the cards on /systems and /portfolio. The `screen` block feeds an
// illustrative UI mock-up (sample data, clearly labelled as such on the page).

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
  screen: SystemScreen;
  keywords: Record<Locale, string[]>;
}

export const readySystems: ReadySystem[] = [
  {
    slug: "pos-cashier",
    icon: "ScanBarcode",
    name: { en: "POS & cashier", ar: "نقاط البيع والكاشير" },
    hint: { en: "Retail, cafés, restaurants", ar: "المحلات والمقاهي والمطاعم" },
    tagline: { en: "A fast cashier that keeps selling when the internet drops.", ar: "كاشير سريع يواصل البيع حتى عند انقطاع الإنترنت." },
    summary: {
      en: "Point-of-sale for shops, cafés and multi-branch retail: barcode scanning, receipts, shifts, returns and live sales reports — working offline and syncing automatically when the connection is back.",
      ar: "نظام نقاط بيع للمحلات والمقاهي وسلاسل الفروع: قراءة الباركود، وطباعة الفواتير، وإدارة الورديات والمرتجعات، وتقارير مبيعات لحظية — يعمل دون إنترنت ويزامن البيانات تلقائيًا عند عودة الاتصال.",
    },
    audience: {
      en: ["Retail shops & supermarkets", "Cafés & restaurants", "Mobile & electronics stores", "Multi-branch chains"],
      ar: ["المحلات والسوبر ماركت", "المقاهي والمطاعم", "محلات الموبايل والإلكترونيات", "السلاسل متعددة الفروع"],
    },
    modules: [
      { title: { en: "Sales screen", ar: "شاشة البيع" }, text: { en: "Barcode, quick keys, discounts, split payments and held invoices.", ar: "باركود، وأزرار سريعة، وخصومات، ودفع مقسّم، وتعليق الفواتير." } },
      { title: { en: "Shifts & cash drawer", ar: "الورديات والخزينة" }, text: { en: "Open/close shifts, cash counts and variance per cashier.", ar: "فتح وإغلاق الورديات، وجرد النقدية، وفروقات كل كاشير." } },
      { title: { en: "Returns & exchanges", ar: "المرتجعات والاستبدال" }, text: { en: "Linked to the original invoice with stock restored automatically.", ar: "مرتبطة بالفاتورة الأصلية مع إعادة الكمية للمخزون تلقائيًا." } },
      { title: { en: "Customers & loyalty", ar: "العملاء والولاء" }, text: { en: "Customer accounts, credit balances and loyalty points.", ar: "حسابات العملاء، والأرصدة الآجلة، ونقاط الولاء." } },
      { title: { en: "Stock & purchasing", ar: "المخزون والمشتريات" }, text: { en: "Purchase invoices, suppliers, reorder alerts and stocktakes.", ar: "فواتير الشراء، والموردون، وتنبيهات إعادة الطلب، والجرد." } },
      { title: { en: "Reports", ar: "التقارير" }, text: { en: "Sales by item, cashier, branch and hour; gross profit per day.", ar: "المبيعات حسب الصنف والكاشير والفرع والساعة، وإجمالي الربح اليومي." } },
    ],
    highlights: {
      en: ["Works offline, syncs when online", "Thermal receipt & barcode printers", "Role-based cashier permissions", "Multi-branch, one dashboard", "E-invoice / e-receipt ready", "Arabic & English receipts"],
      ar: ["يعمل دون إنترنت ويزامن عند الاتصال", "طابعات فواتير حرارية وطابعات باركود", "صلاحيات مخصصة لكل كاشير", "فروع متعددة بلوحة متابعة واحدة", "جاهز للفاتورة والإيصال الإلكتروني", "فواتير بالعربية والإنجليزية"],
    },
    integrations: {
      en: ["Barcode scanners", "Thermal printers", "Cash drawers", "Card terminals", "Online store sync"],
      ar: ["قارئات الباركود", "الطابعات الحرارية", "أدراج النقدية", "ماكينات الدفع بالبطاقة", "مزامنة المتجر الإلكتروني"],
    },
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
    name: { en: "Inventory & warehouses", ar: "المخازن والمستودعات" },
    hint: { en: "Multi-branch stock, transfers", ar: "مخزون الفروع والتحويلات" },
    tagline: { en: "Know exactly what you have, where it is, and what it cost.", ar: "اعرف بدقة ما لديك، وأين هو، وكم كلّفك." },
    summary: {
      en: "Inventory control for distributors, wholesalers and multi-branch businesses: warehouses and locations, transfers, batches and expiry, average cost and stock valuation — with a full movement history for every item.",
      ar: "إدارة مخزون للموزعين وتجار الجملة والشركات متعددة الفروع: المستودعات والمواقع، والتحويلات، والتشغيلات وتواريخ الصلاحية، ومتوسط التكلفة وتقييم المخزون — مع سجل حركة كامل لكل صنف.",
    },
    audience: {
      en: ["Distributors & wholesalers", "Factories & workshops", "Import / export companies", "Multi-branch retailers"],
      ar: ["الموزعون وتجار الجملة", "المصانع والورش", "شركات الاستيراد والتصدير", "متاجر التجزئة متعددة الفروع"],
    },
    modules: [
      { title: { en: "Items & units", ar: "الأصناف والوحدات" }, text: { en: "Variants, multiple units, barcodes and price lists.", ar: "الأصناف المتغيرة، والوحدات المتعددة، والباركود، وقوائم الأسعار." } },
      { title: { en: "Warehouses & locations", ar: "المستودعات والمواقع" }, text: { en: "Unlimited warehouses with shelves and bins.", ar: "عدد غير محدود من المستودعات مع الأرفف والخانات." } },
      { title: { en: "Transfers", ar: "التحويلات" }, text: { en: "Branch-to-branch transfers with approval and receipt.", ar: "تحويلات بين الفروع مع الاعتماد وإذن الاستلام." } },
      { title: { en: "Batches & expiry", ar: "التشغيلات والصلاحية" }, text: { en: "FEFO picking and near-expiry alerts.", ar: "صرف الأقرب انتهاءً أولًا وتنبيهات قرب انتهاء الصلاحية." } },
      { title: { en: "Stocktaking", ar: "الجرد" }, text: { en: "Full or cycle counts from a phone, with variance reports.", ar: "جرد كامل أو دوري من الهاتف مع تقارير الفروقات." } },
      { title: { en: "Valuation", ar: "تقييم المخزون" }, text: { en: "Average cost, stock value and slow-moving items.", ar: "متوسط التكلفة، وقيمة المخزون، والأصناف الراكدة." } },
    ],
    highlights: {
      en: ["Item movement history (audit trail)", "Mobile stocktaking with camera barcode", "Reorder points per warehouse", "Purchase & sales integration", "Approvals for transfers & adjustments", "Excel import / export"],
      ar: ["سجل حركة لكل صنف", "جرد من الهاتف بكاميرا الباركود", "حد إعادة طلب لكل مستودع", "تكامل مع المشتريات والمبيعات", "اعتمادات للتحويلات والتسويات", "استيراد وتصدير Excel"],
    },
    integrations: {
      en: ["POS", "Accounting", "Online store", "Barcode printers"],
      ar: ["نقاط البيع", "الحسابات", "المتجر الإلكتروني", "طابعات الباركود"],
    },
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
    name: { en: "Clinic management", ar: "إدارة العيادات" },
    hint: { en: "Bookings, records, billing", ar: "الحجوزات وملفات المرضى والفواتير" },
    tagline: { en: "Bookings, patient files and billing — without the paper.", ar: "الحجوزات وملفات المرضى والفواتير — دون أوراق." },
    summary: {
      en: "For clinics, medical centres and dental practices: online and reception booking, WhatsApp reminders, electronic patient records, prescriptions, billing and insurance — with privacy and permissions built in.",
      ar: "للعيادات والمراكز الطبية وعيادات الأسنان: حجز من الاستقبال أو أونلاين، وتذكير عبر واتساب، وملف طبي إلكتروني، وروشتات، وفواتير وتأمين — مع خصوصية وصلاحيات مدمجة.",
    },
    audience: {
      en: ["Private clinics", "Multi-specialty medical centres", "Dental practices", "Physiotherapy & beauty clinics"],
      ar: ["العيادات الخاصة", "المراكز الطبية متعددة التخصصات", "عيادات الأسنان", "مراكز العلاج الطبيعي والتجميل"],
    },
    modules: [
      { title: { en: "Appointments", ar: "المواعيد" }, text: { en: "Doctor calendars, walk-ins, queue and online booking page.", ar: "جداول الأطباء، والكشف الفوري، وقائمة الانتظار، وصفحة حجز أونلاين." } },
      { title: { en: "Patient records", ar: "الملف الطبي" }, text: { en: "History, diagnoses, attachments and visit notes.", ar: "التاريخ المرضي، والتشخيصات، والمرفقات، وملاحظات الزيارة." } },
      { title: { en: "Prescriptions", ar: "الروشتات" }, text: { en: "Printable prescriptions with templates per doctor.", ar: "روشتات قابلة للطباعة بقوالب لكل طبيب." } },
      { title: { en: "Billing & insurance", ar: "الفواتير والتأمين" }, text: { en: "Services price list, packages, insurance claims and receipts.", ar: "قائمة أسعار الخدمات، والباقات، ومطالبات التأمين، والإيصالات." } },
      { title: { en: "Reminders", ar: "التذكيرات" }, text: { en: "Automatic WhatsApp / SMS reminders to cut no-shows.", ar: "تذكير تلقائي عبر واتساب أو SMS لتقليل حالات عدم الحضور." } },
      { title: { en: "Reports", ar: "التقارير" }, text: { en: "Revenue per doctor and service, visits and follow-ups.", ar: "الإيرادات لكل طبيب وخدمة، وعدد الزيارات والمتابعات." } },
    ],
    highlights: {
      en: ["Role-based access to medical data", "Doctor & reception views", "Online booking page", "WhatsApp reminders", "Multi-branch & multi-doctor", "Daily automatic backups"],
      ar: ["صلاحيات دقيقة للبيانات الطبية", "واجهات للطبيب والاستقبال", "صفحة حجز أونلاين", "تذكيرات عبر واتساب", "فروع وأطباء متعددون", "نسخ احتياطي يومي تلقائي"],
    },
    integrations: {
      en: ["WhatsApp Business", "SMS gateway", "Payment links", "Lab results upload"],
      ar: ["واتساب للأعمال", "بوابة الرسائل النصية", "روابط الدفع", "رفع نتائج التحاليل"],
    },
    screen: {
      nav: [{ en: "Calendar", ar: "المواعيد" }, { en: "Patients", ar: "المرضى" }, { en: "Billing", ar: "الفواتير" }, { en: "Reports", ar: "التقارير" }],
      stats: [
        { label: { en: "Appointments today", ar: "مواعيد اليوم" }, value: "64" },
        { label: { en: "Waiting", ar: "في الانتظار" }, value: "7" },
        { label: { en: "No-show rate", ar: "نسبة الغياب" }, value: "4%" },
      ],
      chart: [40, 66, 72, 58, 80, 54, 30],
      rows: [
        { name: { en: "10:30 · Follow-up", ar: "10:30 · متابعة" }, meta: { en: "Dr. Sara · Room 2", ar: "د. سارة · غرفة 2" }, value: { en: "Checked in", ar: "حضر" } },
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
    tagline: { en: "Fewer expired boxes, faster counters, clearer margins.", ar: "هالك أقل، وصرف أسرع، وأرباح أوضح." },
    summary: {
      en: "Built for single pharmacies and chains: a fast dispensing counter, drug database with alternatives, batches and expiry tracking, supplier purchasing and returns, delivery orders and branch transfers.",
      ar: "مصمم للصيدليات المستقلة والسلاسل: شاشة صرف سريعة، وقاعدة أدوية مع البدائل، وتتبع التشغيلات وتواريخ الصلاحية، ومشتريات ومرتجعات الموردين، وطلبات التوصيل، والتحويل بين الفروع.",
    },
    audience: {
      en: ["Independent pharmacies", "Pharmacy chains", "Medical supply stores", "Pharmacies with delivery"],
      ar: ["الصيدليات المستقلة", "سلاسل الصيدليات", "محلات المستلزمات الطبية", "الصيدليات التي تقدم التوصيل"],
    },
    modules: [
      { title: { en: "Dispensing counter", ar: "شاشة الصرف" }, text: { en: "Search by name, active ingredient or barcode; strips and boxes.", ar: "بحث بالاسم أو المادة الفعالة أو الباركود، والبيع بالشريط أو العلبة." } },
      { title: { en: "Alternatives", ar: "البدائل" }, text: { en: "Suggests available alternatives with the same active ingredient.", ar: "يقترح البدائل المتاحة بنفس المادة الفعالة." } },
      { title: { en: "Expiry control", ar: "متابعة الصلاحية" }, text: { en: "Batch tracking, near-expiry alerts and returns to supplier.", ar: "تتبع التشغيلات، وتنبيهات قرب الانتهاء، والمرتجع للمورد." } },
      { title: { en: "Purchasing", ar: "المشتريات" }, text: { en: "Supplier orders, bonuses, discounts and balances.", ar: "طلبيات الموردين، والبونص، والخصومات، والأرصدة." } },
      { title: { en: "Delivery orders", ar: "طلبات التوصيل" }, text: { en: "Phone/WhatsApp orders, rider assignment and settlement.", ar: "طلبات الهاتف وواتساب، وتعيين الطيار، والتسوية." } },
      { title: { en: "Chain management", ar: "إدارة السلسلة" }, text: { en: "Transfers, central pricing and reports across branches.", ar: "التحويلات، والتسعير المركزي، والتقارير لجميع الفروع." } },
    ],
    highlights: {
      en: ["Near-expiry & shortage alerts", "Sell by strip or box", "Customer medication history", "Supplier balances & bonuses", "Shift & cash control", "Works offline at the counter"],
      ar: ["تنبيهات قرب الانتهاء والنواقص", "البيع بالشريط أو بالعلبة", "سجل أدوية العميل", "أرصدة الموردين والبونص", "متابعة الورديات والخزينة", "شاشة الصرف تعمل دون إنترنت"],
    },
    integrations: {
      en: ["Barcode scanners", "Receipt printers", "WhatsApp orders", "Accounting"],
      ar: ["قارئات الباركود", "طابعات الإيصالات", "طلبات واتساب", "الحسابات"],
    },
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
    name: { en: "Gym management", ar: "إدارة الصالات الرياضية" },
    hint: { en: "Memberships, attendance", ar: "الاشتراكات والحضور" },
    tagline: { en: "Memberships that renew themselves, doors that know who’s in.", ar: "اشتراكات تتجدد بسهولة، وبوابة تعرف من دخل." },
    summary: {
      en: "For gyms, fitness studios and sports academies: membership plans and freezes, attendance by QR, fingerprint or card, personal-training sessions, classes, renewals and collections — plus a member app.",
      ar: "للصالات الرياضية واستوديوهات اللياقة والأكاديميات الرياضية: باقات الاشتراك والتجميد، والحضور بالـ QR أو البصمة أو الكارت، وحصص التدريب الشخصي، والكلاسات، والتجديد والتحصيل — مع تطبيق للأعضاء.",
    },
    audience: {
      en: ["Gyms & fitness clubs", "Ladies-only studios", "Sports academies", "CrossFit & martial-arts boxes"],
      ar: ["الصالات والأندية الرياضية", "استوديوهات السيدات", "الأكاديميات الرياضية", "صالات الكروس فيت والفنون القتالية"],
    },
    modules: [
      { title: { en: "Memberships", ar: "الاشتراكات" }, text: { en: "Plans, freezes, upgrades, family and corporate packages.", ar: "الباقات، والتجميد، والترقية، وباقات العائلة والشركات." } },
      { title: { en: "Access & attendance", ar: "الدخول والحضور" }, text: { en: "QR, fingerprint or RFID card at the door.", ar: "الدخول بالـ QR أو البصمة أو كارت RFID." } },
      { title: { en: "Classes & PT", ar: "الكلاسات والتدريب الشخصي" }, text: { en: "Class schedules, capacity, trainer sessions and commissions.", ar: "جداول الكلاسات، والسعة، وحصص المدربين، وعمولاتهم." } },
      { title: { en: "Renewals & collections", ar: "التجديد والتحصيل" }, text: { en: "Expiry reminders, instalments and payment links.", ar: "تذكير بانتهاء الاشتراك، والأقساط، وروابط الدفع." } },
      { title: { en: "Member app", ar: "تطبيق الأعضاء" }, text: { en: "Bookings, QR pass, progress and notifications.", ar: "الحجوزات، وكارت QR، والمتابعة، والإشعارات." } },
      { title: { en: "Shop & reports", ar: "المتجر والتقارير" }, text: { en: "Supplements shop, revenue and retention reports.", ar: "متجر المكملات، وتقارير الإيرادات واستمرار الأعضاء." } },
    ],
    highlights: {
      en: ["Automatic expiry reminders", "Freeze & transfer rules", "Trainer commission reports", "Turnstile & fingerprint support", "Member mobile app", "Multi-branch memberships"],
      ar: ["تذكير تلقائي بانتهاء الاشتراك", "قواعد التجميد والنقل", "تقارير عمولات المدربين", "دعم البوابات وأجهزة البصمة", "تطبيق جوال للأعضاء", "اشتراكات صالحة لعدة فروع"],
    },
    integrations: {
      en: ["Fingerprint devices", "Turnstiles", "Payment links", "WhatsApp reminders"],
      ar: ["أجهزة البصمة", "البوابات الدوارة", "روابط الدفع", "تذكيرات واتساب"],
    },
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
        { name: { en: "Mona S. · 3M", ar: "منى س. · 3 أشهر" }, meta: { en: "Expires in 2 days", ar: "ينتهي خلال يومين" }, value: { en: "Reminded", ar: "تم التذكير" } },
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
    name: { en: "Restaurant system", ar: "نظام المطاعم" },
    hint: { en: "Orders, kitchen, delivery", ar: "الطلبات والمطبخ والتوصيل" },
    tagline: { en: "From the table to the kitchen to the rider — one flow.", ar: "من الطاولة إلى المطبخ إلى الطيار — في مسار واحد." },
    summary: {
      en: "Restaurant and café operations: dine-in tables, takeaway and delivery, kitchen display, recipes that deduct ingredients, delivery zones and riders, and aggregator orders in the same screen.",
      ar: "تشغيل المطاعم والمقاهي: الصالة والطاولات، والتيك أواي والتوصيل، وشاشة المطبخ، ووصفات تخصم الخامات تلقائيًا، ومناطق التوصيل والطيارين، وطلبات التطبيقات الخارجية في شاشة واحدة.",
    },
    audience: {
      en: ["Restaurants & cafés", "Cloud kitchens", "Bakeries & dessert shops", "Food chains"],
      ar: ["المطاعم والمقاهي", "المطابخ السحابية", "المخابز ومحلات الحلويات", "سلاسل الأطعمة"],
    },
    modules: [
      { title: { en: "Order taking", ar: "استقبال الطلبات" }, text: { en: "Dine-in, takeaway, delivery and call-centre orders.", ar: "طلبات الصالة والتيك أواي والتوصيل والكول سنتر." } },
      { title: { en: "Tables & waiters", ar: "الطاولات والويترز" }, text: { en: "Floor plan, table transfer, split bills and service charge.", ar: "مخطط الصالة، ونقل الطاولات، وتقسيم الحساب، والخدمة." } },
      { title: { en: "Kitchen display", ar: "شاشة المطبخ" }, text: { en: "Orders routed by station with prep timers.", ar: "توجيه الطلبات لكل قسم مع مؤقت التحضير." } },
      { title: { en: "Recipes & costing", ar: "الوصفات والتكلفة" }, text: { en: "Ingredients deducted per sale; food-cost per dish.", ar: "خصم الخامات مع كل بيع، وتكلفة كل صنف." } },
      { title: { en: "Delivery", ar: "التوصيل" }, text: { en: "Zones, delivery fees, rider assignment and settlement.", ar: "المناطق، ورسوم التوصيل، وتعيين الطيار، والتسوية." } },
      { title: { en: "Reports", ar: "التقارير" }, text: { en: "Best sellers, peak hours, waste and branch comparison.", ar: "الأكثر مبيعًا، وساعات الذروة، والهالك، ومقارنة الفروع." } },
    ],
    highlights: {
      en: ["Kitchen display & printers", "Recipe-based stock deduction", "Delivery zones & riders", "Menu QR ordering", "Offline-capable cashier", "Multi-branch menus & prices"],
      ar: ["شاشة وطابعات المطبخ", "خصم المخزون حسب الوصفة", "مناطق التوصيل والطيارون", "طلب من المنيو عبر QR", "كاشير يعمل دون إنترنت", "منيو وأسعار لكل فرع"],
    },
    integrations: {
      en: ["Kitchen printers", "Delivery apps", "Caller ID", "Online menu"],
      ar: ["طابعات المطبخ", "تطبيقات التوصيل", "إظهار رقم المتصل", "المنيو الإلكتروني"],
    },
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
    name: { en: "Schools & academies", ar: "المدارس والأكاديميات" },
    hint: { en: "Students, fees, schedules", ar: "الطلاب والرسوم والجداول" },
    tagline: { en: "Students, fees and timetables — and parents kept in the loop.", ar: "الطلاب والرسوم والجداول — وأولياء الأمور على اطلاع دائم." },
    summary: {
      en: "For schools, training centres and online academies: admissions, student files, timetables, attendance, grades, fee plans and instalments — with a parent/student portal and notifications.",
      ar: "للمدارس ومراكز التدريب والأكاديميات الأونلاين: القبول، وملفات الطلاب، والجداول، والحضور، والدرجات، وخطط الرسوم والأقساط — مع بوابة لأولياء الأمور والطلاب وإشعارات فورية.",
    },
    audience: {
      en: ["Private & international schools", "Training centres", "Language & coding academies", "Nurseries"],
      ar: ["المدارس الخاصة والدولية", "مراكز التدريب", "أكاديميات اللغات والبرمجة", "الحضانات"],
    },
    modules: [
      { title: { en: "Admissions", ar: "القبول والتسجيل" }, text: { en: "Applications, interviews, documents and enrolment.", ar: "طلبات الالتحاق، والمقابلات، والمستندات، والتسجيل." } },
      { title: { en: "Students & classes", ar: "الطلاب والفصول" }, text: { en: "Student files, classes, groups and transfers.", ar: "ملفات الطلاب، والفصول، والمجموعات، والتحويلات." } },
      { title: { en: "Timetables & attendance", ar: "الجداول والحضور" }, text: { en: "Weekly schedules, teacher loads and daily attendance.", ar: "الجداول الأسبوعية، ونصاب المعلمين، والحضور اليومي." } },
      { title: { en: "Exams & grades", ar: "الامتحانات والدرجات" }, text: { en: "Assessments, grade books and report cards.", ar: "التقييمات، وكشوف الدرجات، والشهادات." } },
      { title: { en: "Fees & instalments", ar: "الرسوم والأقساط" }, text: { en: "Fee plans, discounts, siblings and overdue follow-up.", ar: "خطط الرسوم، والخصومات، وخصم الإخوة، ومتابعة المتأخرات." } },
      { title: { en: "Parent portal", ar: "بوابة أولياء الأمور" }, text: { en: "Grades, attendance, invoices and announcements.", ar: "الدرجات، والحضور، والفواتير، والإعلانات." } },
    ],
    highlights: {
      en: ["Parent & student portal", "Instalment plans with reminders", "Bus & transport lists", "Teacher accounts & permissions", "Arabic & English report cards", "Online payments"],
      ar: ["بوابة لأولياء الأمور والطلاب", "خطط أقساط مع تذكير تلقائي", "قوائم الباصات والنقل", "حسابات وصلاحيات للمعلمين", "شهادات بالعربية والإنجليزية", "دفع إلكتروني للرسوم"],
    },
    integrations: {
      en: ["Payment gateways", "WhatsApp / SMS", "Zoom / Google Meet", "Accounting"],
      ar: ["بوابات الدفع", "واتساب ورسائل SMS", "Zoom و Google Meet", "الحسابات"],
    },
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
    name: { en: "Accounting & HR", ar: "الحسابات والموارد البشرية" },
    hint: { en: "Invoices, payroll, reports", ar: "الفواتير والرواتب والتقارير" },
    tagline: { en: "Books that close on time and payroll that adds up.", ar: "حسابات تُقفل في موعدها، ورواتب دقيقة دون مراجعات مرهقة." },
    summary: {
      en: "General ledger, invoicing, receivables and payables, banks and cheques, e-invoice (ETA) integration, plus HR: employee files, attendance, leave, payroll and social insurance — with financial statements on demand.",
      ar: "دفتر الأستاذ العام، والفوترة، والمدينون والدائنون، والبنوك والشيكات، والتكامل مع منظومة الفاتورة الإلكترونية، بالإضافة إلى الموارد البشرية: ملفات الموظفين، والحضور، والإجازات، والرواتب، والتأمينات — مع قوائم مالية عند الطلب.",
    },
    audience: {
      en: ["SMEs & trading companies", "Contracting & services firms", "Accounting offices", "Companies with 10–500 employees"],
      ar: ["الشركات الصغيرة والمتوسطة والتجارية", "شركات المقاولات والخدمات", "مكاتب المحاسبة", "الشركات من 10 إلى 500 موظف"],
    },
    modules: [
      { title: { en: "General ledger", ar: "الأستاذ العام" }, text: { en: "Chart of accounts, journal entries, cost centres and periods.", ar: "دليل الحسابات، والقيود اليومية، ومراكز التكلفة، والفترات." } },
      { title: { en: "Sales & purchases", ar: "المبيعات والمشتريات" }, text: { en: "Quotes, invoices, credit notes, receivables and payables.", ar: "عروض الأسعار، والفواتير، والإشعارات الدائنة، والمدينون والدائنون." } },
      { title: { en: "Banks & cheques", ar: "البنوك والشيكات" }, text: { en: "Bank accounts, reconciliation and cheque portfolio.", ar: "الحسابات البنكية، والتسويات، وحافظة الشيكات." } },
      { title: { en: "E-invoicing", ar: "الفاتورة الإلكترونية" }, text: { en: "Submission to the Egyptian Tax Authority portal.", ar: "إرسال الفواتير إلى منظومة مصلحة الضرائب المصرية." } },
      { title: { en: "HR & attendance", ar: "شؤون الموظفين والحضور" }, text: { en: "Employee files, shifts, leave and fingerprint import.", ar: "ملفات الموظفين، والورديات، والإجازات، واستيراد البصمة." } },
      { title: { en: "Payroll", ar: "الرواتب" }, text: { en: "Allowances, deductions, loans, insurance and payslips.", ar: "البدلات، والاستقطاعات، والسلف، والتأمينات، وكشوف الرواتب." } },
    ],
    highlights: {
      en: ["ETA e-invoice integration", "Trial balance, P&L, balance sheet", "Cost centres & projects", "Payroll with social insurance", "Approval workflows", "Full audit log"],
      ar: ["تكامل مع منظومة الفاتورة الإلكترونية", "ميزان المراجعة وقائمة الدخل والميزانية", "مراكز التكلفة والمشروعات", "رواتب مع التأمينات الاجتماعية", "دورات اعتماد للمستندات", "سجل كامل لكل العمليات"],
    },
    integrations: {
      en: ["ETA e-invoice", "Fingerprint devices", "Banks (Excel import)", "POS & inventory"],
      ar: ["منظومة الفاتورة الإلكترونية", "أجهزة البصمة", "البنوك (استيراد Excel)", "نقاط البيع والمخازن"],
    },
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

/** Shared facts for every ready-made system (shown on the catalog and detail pages). */
export const systemSteps: { title: T; text: T }[] = [
  {
    title: { en: "Live demo", ar: "عرض تجريبي حيّ" },
    text: { en: "A 30-minute walkthrough using your own scenarios, online or at your site.", ar: "جولة لمدة 30 دقيقة على سيناريوهات عملك الفعلية، أونلاين أو في مقرّك." },
  },
  {
    title: { en: "Configuration", ar: "التهيئة" },
    text: { en: "We set up branches, users, price lists and your branding, and import your existing data.", ar: "نهيّئ الفروع والمستخدمين وقوائم الأسعار وهويتك البصرية، وننقل بياناتك الحالية." },
  },
  {
    title: { en: "Training & go-live", ar: "التدريب والتشغيل" },
    text: { en: "Hands-on training for each role, then we stay with you through the first weeks of operation.", ar: "تدريب عملي لكل دور وظيفي، ثم نرافقك خلال الأسابيع الأولى من التشغيل." },
  },
  {
    title: { en: "Support & updates", ar: "الدعم والتحديثات" },
    text: { en: "Support over WhatsApp and phone, regular updates and automatic backups.", ar: "دعم فني عبر واتساب والهاتف، وتحديثات دورية، ونسخ احتياطي تلقائي." },
  },
];

export const systemFaqs: { q: T; a: T }[] = [
  {
    q: { en: "Can the system be customised for my business?", ar: "هل يمكن تخصيص النظام حسب طبيعة عملي؟" },
    a: {
      en: "Yes. Every ready-made system is configurable (branches, roles, price lists, print layouts), and we can add custom modules or reports on top as a separate, clearly priced scope.",
      ar: "نعم. جميع أنظمتنا الجاهزة قابلة للتهيئة (الفروع، والصلاحيات، وقوائم الأسعار، وتصميم المطبوعات)، ويمكننا إضافة وحدات أو تقارير مخصصة كنطاق عمل منفصل بتكلفة واضحة.",
    },
  },
  {
    q: { en: "Does it work without internet?", ar: "هل يعمل النظام دون إنترنت؟" },
    a: {
      en: "Counter-facing systems (POS, pharmacy, restaurant) keep working offline and sync automatically once the connection is back. Management dashboards need a connection.",
      ar: "الأنظمة التي تعمل على الكاشير (نقاط البيع، والصيدليات، والمطاعم) تستمر في العمل دون إنترنت وتزامن البيانات تلقائيًا عند عودة الاتصال، أما لوحات الإدارة فتحتاج إلى اتصال.",
    },
  },
  {
    q: { en: "Can you move my data from my current program?", ar: "هل يمكنكم نقل بياناتي من البرنامج الحالي؟" },
    a: {
      en: "Yes. We import items, customers, suppliers and opening balances from Excel or from most common systems as part of setup.",
      ar: "نعم. ننقل الأصناف والعملاء والموردين والأرصدة الافتتاحية من ملفات Excel أو من أغلب البرامج المنتشرة كجزء من التهيئة.",
    },
  },
  {
    q: { en: "Where is my data stored, and is it backed up?", ar: "أين تُحفظ بياناتي، وهل يوجد نسخ احتياطي؟" },
    a: {
      en: "On our managed cloud with daily encrypted backups, or on your own server if you choose a perpetual licence. Your data is always yours and can be exported at any time.",
      ar: "على سحابتنا المُدارة مع نسخ احتياطي يومي مشفّر، أو على خادمك الخاص إذا اخترت الترخيص الدائم. بياناتك ملكك دائمًا ويمكن تصديرها في أي وقت.",
    },
  },
  {
    q: { en: "What hardware do I need?", ar: "ما الأجهزة التي أحتاجها؟" },
    a: {
      en: "Any modern Windows PC, laptop or tablet works. We recommend tested barcode scanners and printers, and can supply and install them.",
      ar: "يعمل النظام على أي كمبيوتر ويندوز حديث أو لابتوب أو تابلت. ونرشّح لك قارئات باركود وطابعات مُجرّبة، ويمكننا توريدها وتركيبها.",
    },
  },
];
