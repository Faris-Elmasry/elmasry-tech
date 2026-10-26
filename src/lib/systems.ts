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
  // Our own finished products first; every entry describes only what the product really does.
  {
    slug: "cafe-playstation",
    icon: "Gamepad2",
    name: { en: "Café & PlayStation system", ar: "نظام الكافيه والبلايستيشن" },
    hint: { en: "Rooms by the hour, orders, shifts", ar: "الرومات بالساعة والطلبات والورديات" },
    tagline: { en: "Every minute on every console, every cup on every bill.", ar: "كل دقيقة على كل جهاز، وكل كوباية على كل حساب." },
    summary: {
      en: "For cafés, PlayStation and gaming lounges, billiards and VIP rooms: time by the hour with single/multi prices, packages and fixed hours, table and room orders, a bar screen, reservations with deposits, blind cash counts at shift close and a Z report — on a PC in the shop, working without internet, with the owner's numbers on his phone.",
      ar: "للكافيهات وصالات البلايستيشن والجيمنج والبلياردو والرومات الـ VIP: الوقت بالساعة بسعر سنجل ومالتي، والباقات والساعات الثابتة، وطلبات الترابيزات والرومات، وشاشة للبار، والحجوزات بعربون، وعدّ الدرج «أعمى» في قفل الوردية وتقرير Z — على كمبيوتر في المحل، شغال من غير نت، وأرقام صاحب المحل على موبايله.",
    },
    audience: {
      en: ["PlayStation & gaming lounges", "Cafés and coffee shops", "Billiards halls", "VIP gaming rooms"],
      ar: ["صالات البلايستيشن والجيمنج", "الكافيهات والقهاوي", "صالات البلياردو", "رومات الـ VIP"],
    },
    modules: [
      { title: { en: "Time & rooms", ar: "الوقت والرومات" }, text: { en: "Open time, fixed hours or an amount; single/multi prices by the hour; pause, change room or mode.", ar: "وقت مفتوح أو ساعات ثابتة أو بمبلغ؛ سعر سنجل ومالتي بالساعة؛ إيقاف مؤقت ونقل روم أو وضع." } },
      { title: { en: "Orders & bar", ar: "الطلبات والبار" }, text: { en: "Orders on tables and rooms, with sugar and extras; the bar sees them on its screen and the floor knows when they're ready.", ar: "طلبات على الترابيزات والرومات بالسكر والإضافات؛ البار بيشوفها على شاشته، والصالة بتعرف لما تجهز." } },
      { title: { en: "Packages & reservations", ar: "الباقات والحجوزات" }, text: { en: "Hours + a free drink packages; bookings with a deposit that follows the guests.", ar: "باقات ساعات ومعاها مشروب ببلاش؛ حجوزات بعربون بيمشي مع الزباين." } },
      { title: { en: "Shift & drawer", ar: "الوردية والدرج" }, text: { en: "Blind count at close, approvals for discounts and voids, a Z report that reconciles line by line.", ar: "عدّ أعمى في القفل، وموافقات على الخصم والإلغاء، وتقرير Z بيتطابق سطر بسطر." } },
      { title: { en: "Stock & tab", ar: "المخزون والنوتة" }, text: { en: "Recipes take stock as you sell; suppliers, purchases and customers on a tab with a limit.", ar: "الوصفات بتخصم من المخزون مع البيع؛ الموردين والمشتريات، والزباين على النوتة بحد." } },
      { title: { en: "Owner's phone", ar: "موبايل صاحب المحل" }, text: { en: "Today's sales, running rooms and the month — from anywhere, through the cloud link.", ar: "مبيعات النهارده والرومات الشغالة والشهر — من أي مكان عن طريق ربط السحابة." } },
    ],
    highlights: {
      en: ["Works offline on the shop PC", "Power-cut handling for running rooms", "Blind shift count", "Approvals by PIN or by code", "Tablets for waiters", "58/80 mm receipt printers"],
      ar: ["شغال من غير نت على كمبيوتر المحل", "التعامل مع قطع الكهربا والرومات شغالة", "عدّ الوردية الأعمى", "موافقات برقم سري أو بكود", "تابلت للويتر", "طابعات إيصالات 58 و80 مم"],
    },
    integrations: {
      en: ["Receipt and bar printers", "Cloud link for the owner", "Telegram shift summaries"],
      ar: ["طابعات الإيصالات والبار", "ربط السحابة لصاحب المحل", "ملخص الوردية على تيليجرام"],
    },
    before: {
      en: ["Start times written on paper", "Drinks forgotten on the bill", "The drawer never matches at night"],
      ar: ["وقت البداية مكتوب على ورقة", "مشروبات بتتنسي من الحساب", "الدرج عمره ما بيظبط آخر الليل"],
    },
    photo: "/images/site/cafe-cashier-v2.webp",
    photoAlt: { en: "A cashier at the counter of a café", ar: "كاشير على كاونتر كافيه" },
    screen: {
      nav: [{ en: "Floor", ar: "الصالة" }, { en: "Bar", ar: "البار" }, { en: "Reservations", ar: "الحجوزات" }, { en: "Shift", ar: "الوردية" }],
      stats: [
        { label: { en: "Rooms running", ar: "رومات شغالة" }, value: "6/9" },
        { label: { en: "Open checks", ar: "حسابات مفتوحة" }, value: "14" },
        { label: { en: "Sales today", ar: "مبيعات النهارده" }, value: "4,860" },
      ],
      chart: [24, 38, 52, 46, 70, 92, 80],
      rows: [
        { name: { en: "PS5-2 · Multi", ar: "PS5-2 · مالتي" }, meta: { en: "Started 19:10 · 1 h 32 m", ar: "بدأ 19:10 · ساعة و32 د" }, value: "118" },
        { name: { en: "Table 4 · 3 orders", ar: "ترابيزة 4 · 3 طلبات" }, meta: { en: "Bar: ready", ar: "البار: جاهز" }, value: "95" },
        { name: { en: "VIP room · package", ar: "روم VIP · باقة" }, meta: { en: "Free drink left: 1", ar: "فاضل مشروب ببلاش: 1" }, value: "250" },
      ],
    },
    keywords: {
      en: ["PlayStation cafe management software Egypt", "gaming lounge system", "cafe POS Egypt"],
      ar: ["برنامج بلايستيشن", "برنامج كافيه وبلايستيشن", "سيستم بلايستيشن", "برنامج حساب وقت البلايستيشن", "برنامج كافيه"],
    },
  },
  {
    slug: "wifi-cards",
    icon: "Wifi",
    name: { en: "WiFi cards system", ar: "نظام كروت الواي فاي" },
    hint: { en: "Prepaid internet on MikroTik", ar: "إنترنت بالكروت على ميكروتيك" },
    tagline: { en: "Sell internet by the card — the router enforces every limit.", ar: "بيع النت بالكارت — والراوتر نفسه بيطبّق كل حد." },
    summary: {
      en: "For cafés, shops, hostels and residential areas that sell internet: you set each card's data, speed, validity, time and devices; print cards that look like the familiar ones; sell and top up from a cashier screen; let customers buy online from the WiFi login page; and get Telegram alerts. Limits live on the MikroTik router, so they hold even if the server or the power goes down.",
      ar: "للكافيهات والمحلات والهوستلات والمناطق السكنية اللي بتبيع نت: انت بتحدد لكل كارت الجيجات والسرعة والصلاحية والوقت وعدد الأجهزة؛ وبتطبع كروت شكل الكروت المعروفة؛ وبتبيع وتشحن من شاشة كاشير؛ والزبون يقدر يشتري أونلاين من صفحة دخول الواي فاي؛ وتنبيهات على تيليجرام. الحدود متسجّلة على راوتر ميكروتيك نفسه، فبتفضل شغالة حتى لو السيرفر أو الكهربا قطعت.",
    },
    audience: {
      en: ["Cafés & lounges", "Shops selling internet", "Hostels & furnished apartments", "Residential areas"],
      ar: ["الكافيهات والصالات", "محلات بيع النت", "الهوستلات والشقق المفروشة", "المناطق السكنية"],
    },
    modules: [
      { title: { en: "Plans you define", ar: "باقات بتحددها انت" }, text: { en: "Data in MB/GB, upload/download speed, validity from first use, time and devices — empty means no limit.", ar: "الجيجات، وسرعة التحميل والرفع، والصلاحية من أول استخدام، والوقت، وعدد الأجهزة — الخانة الفاضية يعني من غير حد." } },
      { title: { en: "Printed cards", ar: "كروت مطبوعة" }, text: { en: "Your logo, shop name, price, the code in large print and your support number — on 58/80 mm or A4.", ar: "لوجوك واسم المحل والسعر، والكود بخط كبير ورقم الدعم بتاعك — على 58 أو 80 مم أو ورق A4." } },
      { title: { en: "Cashier screen", ar: "شاشة الكاشير" }, text: { en: "Sell and print in two taps, top up a card, close the shift with the real cash and the difference.", ar: "بيع وطباعة بضغطتين، وشحن الكارت، وقفل الوردية بالنقدية الفعلية والفرق." } },
      { title: { en: "Buy online", ar: "شراء أونلاين" }, text: { en: "A customer without a card pays from the WiFi login page (wallets and cards) and connects at once.", ar: "الزبون اللي معهوش كارت يدفع من صفحة دخول الواي فاي (محافظ وكروت) ويتصل على طول." } },
      { title: { en: "Reports & alerts", ar: "التقارير والتنبيهات" }, text: { en: "Revenue by day, plan, staff and hour; Telegram alerts when a router drops or cards run low.", ar: "الإيراد باليوم والباقة والموظف والساعة؛ وتنبيه تيليجرام لما راوتر يفصل أو الكروت تقرّب تخلص." } },
      { title: { en: "Easy setup", ar: "تركيب سهل" }, text: { en: "A wizard prepares a MikroTik router — even factory-new — from its IP and admin password.", ar: "معالج بيجهّز راوتر ميكروتيك — حتى لو جديد — من الـ IP وباسورد الأدمن بس." } },
    ],
    highlights: {
      en: ["Limits enforced by the router itself", "Survives power cuts", "Owner and cashier roles", "Daily backup", "One server for many shops", "Dashboard as a phone app"],
      ar: ["الحدود بيطبّقها الراوتر نفسه", "بيستحمل قطع الكهربا", "صلاحيات المالك والكاشير", "نسخة احتياطية كل يوم", "سيرفر واحد لكذا محل", "لوحة التحكم كتطبيق على الموبايل"],
    },
    integrations: {
      en: ["MikroTik routers", "Online payments (wallets and cards)", "Telegram alerts", "Thermal printers"],
      ar: ["راوترات ميكروتيك", "الدفع الأونلاين (محافظ وكروت)", "تنبيهات تيليجرام", "الطابعات الحرارية"],
    },
    before: {
      en: ["Cards written by hand in a notebook", "A user who keeps going after his quota", "No idea what was sold today"],
      ar: ["الكروت متكتبة بإيد في كشكول", "يوزر خلّص الجيجات ولسه شغال", "مش عارف اتباع إيه النهارده"],
    },
    photo: "/images/site/shop-phone-v2.webp",
    photoAlt: { en: "A customer using his phone in a shop", ar: "زبون بيستخدم موبايله في محل" },
    screen: {
      nav: [{ en: "Cards", ar: "الكروت" }, { en: "Sell", ar: "البيع" }, { en: "Routers", ar: "الراوترات" }, { en: "Reports", ar: "التقارير" }],
      stats: [
        { label: { en: "Cards sold today", ar: "كروت اتباعت النهارده" }, value: "86" },
        { label: { en: "Online now", ar: "متصلين دلوقتي" }, value: "41" },
        { label: { en: "Revenue today", ar: "إيراد النهارده" }, value: "1,720" },
      ],
      chart: [40, 46, 58, 52, 66, 74, 88],
      rows: [
        { name: { en: "Card 10 GB · 30 days", ar: "كارت 10 جيجا · 30 يوم" }, meta: { en: "Sold by cashier 1", ar: "باعه كاشير 1" }, value: "100" },
        { name: { en: "Router · main hall", ar: "راوتر · الصالة" }, meta: { en: "Online · 27 users", ar: "شغال · 27 مستخدم" }, value: { en: "OK", ar: "تمام" } },
        { name: { en: "Online purchase · 2 GB", ar: "شراء أونلاين · 2 جيجا" }, meta: { en: "Paid by wallet", ar: "اتدفع بمحفظة" }, value: "25" },
      ],
    },
    keywords: {
      en: ["WiFi hotspot cards software Egypt", "MikroTik hotspot billing", "prepaid internet cards system"],
      ar: ["برنامج كروت واي فاي", "سيستم كروت نت", "برنامج هوت سبوت ميكروتيك", "برنامج بيع كروت انترنت"],
    },
  },
  {
    slug: "pos-cashier",
    icon: "ScanBarcode",
    name: { en: "Cashier, sales & instalments", ar: "الكاشير والمبيعات والتقسيط" },
    hint: { en: "Shops, phone stores, instalments", ar: "المحلات والموبايلات والتقسيط" },
    tagline: { en: "A fast cashier that sells on instalments and tracks every phone by IMEI.", ar: "كاشير سريع، وبيع بالتقسيط، وكل موبايل متتبّع بالـ IMEI." },
    summary: {
      en: "For shops, supermarkets and mobile stores: scan, print the receipt and close the shift — then sell on instalments with a down payment, months, optional interest and a guarantor, collect each instalment with a receipt, and chase late payers on WhatsApp. Phone shops get IMEI tracking, warranty and a repair desk. It keeps working offline, catches up by itself, and is ready to connect to the e-receipt system.",
      ar: "للمحلات والسوبر ماركت ومحلات الموبايلات: امسح الباركود، اطبع الفاتورة، اقفل الوردية — وبيع بالتقسيط بمقدم وعدد شهور وفايدة اختيارية وضامن، وحصّل كل قسط بإيصال، وافتكر المتأخرين على واتساب. ومحلات الموبايلات معاها تتبع بالـ IMEI والضمان وقسم صيانة. بيشتغل من غير نت ويحدّث نفسه أول ما يرجع، وجاهز للربط بمنظومة الإيصال الإلكتروني.",
    },
    audience: {
      en: ["Shops & supermarkets", "Mobile & electronics stores", "Shops that sell on instalments", "Chains with branches"],
      ar: ["المحلات والسوبر ماركت", "محلات الموبايلات والإلكترونيات", "المحلات اللي بتبيع بالتقسيط", "السلاسل اللي ليها فروع"],
    },
    modules: [
      { title: { en: "Selling screen", ar: "شاشة البيع" }, text: { en: "Barcode, quick buttons, discounts, half cash half card, parked bills — and returns linked to the original receipt.", ar: "باركود، وزراير سريعة، وخصومات، ونص كاش ونص فيزا، وتعليق الفاتورة — والمرتجع مربوط بالفاتورة الأصلية." } },
      { title: { en: "Shifts & cash drawer", ar: "الورديات والدرج" }, text: { en: "Open and close shifts, count the cash, and see any difference per cashier.", ar: "افتح واقفل الوردية، اعدّ الفلوس، وشوف أي فرق لكل كاشير." } },
      { title: { en: "Instalments", ar: "التقسيط" }, text: { en: "Down payment, months, interest (none, a percentage or a fixed sum), a guarantor — and instalments that add up exactly. Collect in full or in part, with a printed receipt.", ar: "مقدم، وشهور، وفايدة (من غير أو نسبة أو مبلغ ثابت)، وضامن — وأقساط مجموعها بالظبط. حصّل كامل أو جزء، والإيصال بيتطبع." } },
      { title: { en: "Late payers", ar: "المتأخرين" }, text: { en: "Every late instalment with its days and amount, an optional late fee once per instalment, and a WhatsApp button with a ready message.", ar: "كل قسط متأخر بأيامه ومبلغه، وغرامة تأخير اختيارية مرة واحدة لكل قسط، وزرار واتساب برسالة جاهزة." } },
      { title: { en: "Phones by IMEI & warranty", ar: "الموبايلات بالـ IMEI والضمان" }, text: { en: "Receive devices by IMEI; the same IMEI can never be sold twice; look one up to see who bought it, when, and whether the warranty is still valid.", ar: "استلام الأجهزة بالـ IMEI، ونفس الـ IMEI مستحيل يتباع مرتين، وبحث بيقولك اتباع لمين وإمتى والضمان ساري ولا خلص." } },
      { title: { en: "Repairs", ar: "الصيانة" }, text: { en: "Take a device in with the fault and a deposit, follow it from inspection to ready, and hand it over with the balance worked out.", ar: "استلم الجهاز بالعطل وعربون، وتابعه من الفحص لحد الجاهز، وسلّمه والمطلوب متحسب بعد العربون." } },
    ],
    highlights: {
      en: ["Works offline, catches up online", "Instalments that add up to the last piastre", "A phone can't be sold twice", "Early settlement and rescheduling", "Each cashier sees only their part", "Ready to connect to the e-receipt system"],
      ar: ["يشتغل من غير نت ويحدّث لما يرجع", "أقساط مجموعها بالظبط للقرش", "الموبايل مستحيل يتباع مرتين", "سداد مبكر وإعادة جدولة", "كل كاشير يشوف اللي يخصه", "جاهز للربط بمنظومة الإيصال الإلكتروني"],
    },
    integrations: {
      en: ["Barcode scanners", "Receipt printers", "Cash drawers", "WhatsApp messages", "Consumer-finance companies (recorded and settled)"],
      ar: ["قارئ الباركود", "طابعة الفواتير", "درج الفلوس", "رسائل واتساب", "شركات التمويل الاستهلاكي (تسجيل وتسوية)"],
    },
    before: {
      en: ["Instalments in a notebook, and nobody follows the dates", "The phone’s IMEI on a paper slip, the warranty argued over", "“Who is late this month?” — nobody knows"],
      ar: ["الأقساط في كشكول ومحدش بيتابع المواعيد", "الـ IMEI على ورقة والضمان بيتخانق عليه", "«مين متأخر الشهر ده؟» — محدش عارف"],
    },
    photo: "/images/site/grocery.webp",
    photoAlt: { en: "A grocer arranging fruit in his shop", ar: "صاحب محل بيرتّب الفاكهة في محله" },
    screen: {
      nav: [{ en: "Sales", ar: "البيع" }, { en: "Instalments", ar: "التقسيط" }, { en: "Devices", ar: "الأجهزة" }, { en: "Repairs", ar: "الصيانة" }],
      stats: [
        { label: { en: "Due this month", ar: "مستحق الشهر ده" }, value: "38,400" },
        { label: { en: "Late contracts", ar: "عقود متأخرة" }, value: "7" },
        { label: { en: "Devices in stock", ar: "أجهزة في المخزن" }, value: "53" },
      ],
      chart: [38, 52, 46, 70, 64, 88, 76],
      rows: [
        { name: { en: "Contract C-0127 · 12 months", ar: "عقد C-0127 · 12 شهر" }, meta: { en: "Instalment 3 collected", ar: "القسط 3 اتحصّل" }, value: "1,450" },
        { name: { en: "IMEI …4821", ar: "IMEI …4821" }, meta: { en: "Sold · warranty valid", ar: "اتباع · الضمان ساري" }, value: { en: "Valid", ar: "ساري" } },
        { name: { en: "Repair ticket #31", ar: "تذكرة صيانة 31" }, meta: { en: "Waiting for approval", ar: "مستني موافقة" }, value: { en: "Open", ar: "مفتوحة" } },
      ],
    },
    keywords: {
      en: ["POS system Egypt", "cashier system", "installment sales software Egypt", "mobile shop software IMEI", "offline POS"],
      ar: ["برنامج كاشير", "سيستم كاشير", "برنامج تقسيط", "برنامج محل موبايلات", "برنامج بيع بالتقسيط", "برنامج كاشير يعمل بدون انترنت"],
    },
  },
  {
    slug: "pharmacy-system",
    icon: "Pill",
    name: { en: "Pharmacy system", ar: "نظام الصيدليات" },
    hint: { en: "Alternatives, expiry, insurance, delivery", ar: "البدايل والصلاحية والتأمين والتوصيل" },
    tagline: { en: "Fewer expired boxes, a faster counter, clearer profit.", ar: "هالك أقل، وصرف أسرع، ومكسب أوضح." },
    summary: {
      en: "For pharmacies: search by name, active ingredient or barcode and sell by the strip or the box; suggest alternatives with the same ingredient; sell the earliest expiry first and never sell an expired batch; handle insurance and contract companies with the patient’s co-pay; keep a controlled-drugs register; run home-delivery orders. Ready to connect to the e-receipt system.",
      ar: "للصيدليات: دوّر بالاسم أو المادة الفعالة أو الباركود وبيع بالشريط أو بالعلبة؛ والسيستم يقترح بدايل بنفس المادة؛ ويصرف الأقرب انتهاءً الأول ومستحيل يبيع تشغيلة منتهية؛ ويتعامل مع شركات التأمين والتعاقدات بنسبة تحمّل المريض؛ وفيه سجل للأدوية المخدرة؛ وطلبات التوصيل للمنزل. وجاهز للربط بمنظومة الإيصال الإلكتروني.",
    },
    audience: {
      en: ["Independent pharmacies", "Pharmacies that work with insurance companies", "Pharmacies with delivery", "Medical supply shops"],
      ar: ["الصيدليات المستقلة", "الصيدليات اللي بتتعامل مع شركات تأمين", "الصيدليات اللي بتوصّل", "محلات المستلزمات الطبية"],
    },
    modules: [
      { title: { en: "Counter", ar: "شاشة الصرف" }, text: { en: "Search by name (Arabic or English), ingredient or barcode; sell by strip or box, with a prescription alert before adding such a drug.", ar: "دوّر بالاسم (عربي أو إنجليزي) أو المادة الفعالة أو الباركود، وبيع بالشريط أو بالعلبة، وتنبيه روشتة قبل ما تضيف دواء محتاج روشتة." } },
      { title: { en: "Alternatives", ar: "البدايل" }, text: { en: "Same active ingredient and strength, shown with stock, price and the nearest expiry — add or swap right from the counter.", ar: "نفس المادة الفعالة ونفس التركيز، ومعاها المخزون والسعر وأقرب تاريخ انتهاء — إضافة أو استبدال من الكاشير." } },
      { title: { en: "Expiry & batches", ar: "الصلاحية والتشغيلات" }, text: { en: "The earliest expiry goes out first, an expired batch can’t be sold, and a report shows expired / 30 / 90 days with a daily alert.", ar: "الأقرب انتهاءً بيخرج الأول، والتشغيلة المنتهية مستحيل تتباع، وتقرير منتهي / 30 / 90 يوم وتنبيه يومي." } },
      { title: { en: "Insurance & contracts", ar: "التأمين والتعاقدات" }, text: { en: "Contract discount or price list, the patient’s co-pay by product category, what the insurer owes you, and a monthly statement per company.", ar: "خصم التعاقد أو قايمة أسعار، ونسبة تحمّل المريض حسب فئة الصنف، والمستحق على شركة التأمين، وكشف شهري لكل شركة." } },
      { title: { en: "Controlled drugs", ar: "الأدوية المخدرة" }, text: { en: "Flag the drug, ask for the prescription number, doctor and patient ID at sale, and print the register: receipts, dispensing and balance.", ar: "علّم الدواء، واطلب رقم الروشتة والدكتور وبطاقة المريض وقت البيع، واطبع السجل: وارد ومنصرف ورصيد." } },
      { title: { en: "Delivery orders", ar: "طلبات التوصيل" }, text: { en: "Choose home delivery at the counter for a customer with an address, then follow the order: new, out for delivery, delivered.", ar: "اختار «توصيل للمنزل» من الكاشير لعميل ليه عنوان، وتابع الطلب: جديد، خرج للتوصيل، تم التسليم." } },
    ],
    highlights: {
      en: ["Sell by strip or by box", "Earliest expiry out first", "An expired batch can’t be sold", "Insurance co-pay by category", "Controlled-drugs register", "Ready to connect to the e-receipt system"],
      ar: ["بيع بالشريط أو بالعلبة", "الأقرب انتهاءً يخرج الأول", "التشغيلة المنتهية مستحيل تتباع", "تحمّل المريض حسب الفئة", "سجل الأدوية المخدرة", "جاهز للربط بمنظومة الإيصال الإلكتروني"],
    },
    integrations: {
      en: ["Barcode scanners", "Import your medicine list from a CSV file", "Insurance & contract companies", "Daily backup with a tested restore"],
      ar: ["قارئ الباركود", "استيراد قايمة أدويتك من ملف CSV", "شركات التأمين والتعاقدات", "نسخة احتياطية يومية واسترجاع متجرّب"],
    },
    before: {
      en: ["Expired boxes found on the shelf too late", "Hunting for an alternative from memory", "The insurer’s balance counted by hand at month end"],
      ar: ["علب منتهية بتتلاقي على الرف متأخر", "البحث عن بديل من الذاكرة", "مستحق شركة التأمين بيتحسب بالإيد آخر الشهر"],
    },
    photo: "/images/site/pharmacy.webp",
    photoAlt: { en: "A pharmacist reaching for a box on the pharmacy shelves", ar: "صيدلي بيجيب علبة من على رفوف الصيدلية" },
    screen: {
      nav: [{ en: "Counter", ar: "الصرف" }, { en: "Expiry", ar: "الصلاحية" }, { en: "Insurance", ar: "التأمين" }, { en: "Delivery", ar: "التوصيل" }],
      stats: [
        { label: { en: "Sales today", ar: "مبيعات اليوم" }, value: "21,780" },
        { label: { en: "Near expiry", ar: "قرب الانتهاء" }, value: "18" },
        { label: { en: "Due from insurers", ar: "مستحق على التأمين" }, value: "6,240" },
      ],
      chart: [44, 50, 62, 58, 70, 82, 66],
      rows: [
        { name: { en: "Painkiller 24 tabs", ar: "مسكن 24 قرص" }, meta: { en: "Batch 4471 · 2 months", ar: "تشغيلة 4471 · شهران" }, value: "36" },
        { name: { en: "Contract company · co-pay 20%", ar: "شركة تعاقد · تحمّل المريض 20%" }, meta: { en: "Invoice #I-205", ar: "فاتورة I-205" }, value: "184" },
        { name: { en: "Delivery #D-882", ar: "توصيل D-882" }, meta: { en: "Out for delivery", ar: "خرج للتوصيل" }, value: { en: "On the way", ar: "في الطريق" } },
      ],
    },
    keywords: {
      en: ["pharmacy management system Egypt", "pharmacy POS", "pharmacy insurance software Egypt"],
      ar: ["برنامج صيدليات", "برنامج إدارة صيدلية", "سيستم صيدلية", "برنامج صيدلية بالباركود", "برنامج صيدلية بالتأمين"],
    },
  },
  {
    slug: "school-management",
    icon: "GraduationCap",
    name: { en: "Tutoring centres system", ar: "نظام السناتر ومراكز الدروس" },
    hint: { en: "Groups, card attendance, fees", ar: "المجموعات والحضور بالكارت والمصاريف" },
    tagline: { en: "Groups, attendance and fees — with the parent always in the picture.", ar: "المجموعات والحضور والمصاريف — وولي الأمر دايمًا في الصورة." },
    summary: {
      en: "For private-lesson centres: students with their guardian’s number, groups by subject, grade, teacher and room with weekly times and monthly fees; attendance by QR card that flags who hasn’t paid; an absence message to the guardian; fees, exams and the teacher’s share — plus an app where students and parents see the card, timetable, attendance, fees, grades and homework.",
      ar: "لسناتر الدروس الخصوصية: الطلاب برقم ولي الأمر، والمجموعات بالمادة والصف والمدرس والقاعة ومواعيد أسبوعية ومصاريف شهرية؛ والحضور بكارت QR وبيقولك مين مدفعش؛ ورسالة غياب لولي الأمر؛ والمصاريف والامتحانات ونصيب المدرس — وتطبيق للطالب وولي الأمر يشوفوا فيه الكارت والمواعيد والحضور والمصاريف والدرجات والواجبات.",
    },
    audience: {
      en: ["Private-lesson centres", "Revision centres", "Teachers who run groups", "Academies that work in groups"],
      ar: ["سناتر الدروس الخصوصية", "مراكز التقوية", "المدرسين اللي شغالين بمجموعات", "الأكاديميات اللي بتشتغل بنظام المجموعات"],
    },
    modules: [
      { title: { en: "Students & groups", ar: "الطلاب والمجموعات" }, text: { en: "Student files with guardian’s name and number; groups with teacher, room, weekly times and monthly fee. A teacher in two groups at once, or a booked room, is refused.", ar: "ملف الطالب باسم ورقم ولي الأمر؛ ومجموعات بمدرس وقاعة ومواعيد أسبوعية ومصاريف شهرية. السيستم بيرفض مدرس في مجموعتين في نفس الوقت أو قاعة محجوزة." } },
      { title: { en: "Card attendance", ar: "الحضور بالكارت" }, text: { en: "Scan the QR card or the student code: present or late is recorded and reception is told if the month isn’t paid.", ar: "امسح كارت الـ QR أو كود الطالب: بيتسجّل حاضر أو متأخر، والاستقبال بيعرف لو الشهر مش مدفوع." } },
      { title: { en: "Session sheet & absences", ar: "كشف الحصة والغياب" }, text: { en: "Mark present, late, absent or excused; whoever didn’t come gets an absence message sent to the guardian.", ar: "علّم حاضر أو متأخر أو غايب أو بعذر؛ واللي مجاش بتروح لولي أمره رسالة غياب." } },
      { title: { en: "Fees", ar: "المصاريف" }, text: { en: "Monthly per group or a session pack, part payments, a “who hasn’t paid” page and reminders to the guardian — by hand or automatically.", ar: "شهري لكل مجموعة أو باقة حصص، ودفع جزء، وصفحة «مين مدفعش»، وتذكير لولي الأمر يدوي أو تلقائي." } },
      { title: { en: "Exams & teacher’s share", ar: "الامتحانات ونصيب المدرس" }, text: { en: "Fast grade entry with average and ranking, results sent to guardians; the teacher’s share is a percentage of what was actually collected.", ar: "إدخال درجات سريع بالمتوسط والترتيب وإرسال النتيجة لأولياء الأمور؛ ونصيب المدرس نسبة من اللي اتحصّل فعلًا." } },
      { title: { en: "Student & parent app", ar: "تطبيق الطالب وولي الأمر" }, text: { en: "The card, timetable, attendance, fees, grades and homework — and a parent with several children switches between them.", ar: "الكارت والمواعيد والحضور والمصاريف والدرجات والواجبات — وولي الأمر اللي عنده كذا ابن بيبدّل بينهم." } },
    ],
    highlights: {
      en: ["Sibling discount worked out at payment", "Cancel a session and the guardians are told", "Make-up sessions tracked", "Homework with a due date", "Supervisor approval for discounts", "Excel import and export"],
      ar: ["خصم الإخوة بيتحسب عند الدفع", "إلغاء الحصة وأولياء الأمور بيتبلّغوا", "متابعة الحصص التعويضية", "واجبات بميعاد تسليم", "موافقة المشرف على الخصومات", "استيراد وتصدير Excel"],
    },
    integrations: {
      en: ["WhatsApp messages to guardians", "QR cards and USB scanners", "Payments by cash, wallets, InstaPay or card", "Cashier shifts and daily backup"],
      ar: ["رسائل واتساب لأولياء الأمور", "كروت QR وماسح USB", "الدفع كاش أو محافظ أو إنستاباي أو فيزا", "ورديات الخزنة ونسخة احتياطية يومية"],
    },
    before: {
      en: ["Attendance on paper sheets", "“Who paid this month?” — ask the teacher", "Calling parents one by one about absences"],
      ar: ["الحضور على ورق", "«مين دفع الشهر ده؟» — اسأل المدرس", "الاتصال بأولياء الأمور واحد واحد عن الغياب"],
    },
    photo: "/images/site/classroom-v2.webp",
    photoAlt: { en: "A teacher writing on a whiteboard", ar: "مدرّس بيكتب على السبورة" },
    screen: {
      nav: [{ en: "Groups", ar: "المجموعات" }, { en: "Attendance", ar: "الحضور" }, { en: "Fees", ar: "المصاريف" }, { en: "Exams", ar: "الامتحانات" }],
      stats: [
        { label: { en: "Sessions today", ar: "حصص النهارده" }, value: "9" },
        { label: { en: "Present now", ar: "حاضرين دلوقتي" }, value: "42" },
        { label: { en: "Unpaid this month", ar: "مدفعوش الشهر ده" }, value: "17" },
      ],
      chart: [70, 74, 72, 78, 80, 84, 88],
      rows: [
        { name: { en: "Maths · Grade 3 secondary", ar: "رياضيات · تالتة ثانوي" }, meta: { en: "18:00 · Room 2 · 22 / 25", ar: "6:00 م · قاعة 2 · 22 من 25" }, value: { en: "Running", ar: "شغالة" } },
        { name: { en: "Card scan · late", ar: "مسح كارت · متأخر" }, meta: { en: "Month not paid", ar: "الشهر مش مدفوع" }, value: { en: "Alert", ar: "تنبيه" } },
        { name: { en: "Fees reminder", ar: "تذكير بالمصاريف" }, meta: { en: "Sent to guardians", ar: "اتبعت لأولياء الأمور" }, value: { en: "Sent", ar: "تم" } },
      ],
    },
    keywords: {
      en: ["tutoring center management software Egypt", "private lessons center system", "student attendance QR card system"],
      ar: ["برنامج سنتر دروس خصوصية", "برنامج إدارة سنتر", "برنامج حضور وغياب بالكارت", "برنامج مجموعات ومصاريف طلاب", "برنامج مراكز التقوية"],
    },
  },
  {
    slug: "salon-barber",
    icon: "Scissors",
    name: { en: "Salon & barbershop system", ar: "نظام الصالونات والحلاقين" },
    hint: { en: "Bookings, queue, commissions", ar: "الحجوزات والدور والعمولات" },
    tagline: { en: "Every chair booked once, every barber’s commission counted.", ar: "كل كرسي متحجز مرة واحدة، وعمولة كل حلاق متحسبة." },
    summary: {
      en: "For barbershops and salons, one branch or several: a booking calendar with a column per barber that never double-books, a numbered queue for walk-ins with a TV screen, online booking confirmed by WhatsApp, a cashier for services and products with tips, each barber’s commission, deposits, session packs and gift cards.",
      ar: "لمحلات الحلاقة والصالونات، فرع أو أكتر: كالندر حجوزات بعمود لكل حلاق ومستحيل يحجز اتنين في نفس الوقت، ودور بأرقام للي جاي من غير حجز وشاشة تلفزيون، وحجز أونلاين بتأكيد على واتساب، وكاشير للخدمات والمنتجات بالبقشيش، وعمولة كل حلاق، والعربون، وباقات الجلسات، وكروت الهدية.",
    },
    audience: {
      en: ["Barbershops", "Salons", "Shops with several barbers", "Branches under one owner"],
      ar: ["محلات الحلاقة", "الصالونات", "المحلات اللي فيها كذا حلاق", "الفروع تحت مالك واحد"],
    },
    modules: [
      { title: { en: "Booking calendar", ar: "كالندر الحجوزات" }, text: { en: "A column per barber with their own hours and days off; a booking takes the service’s length, and two bookings for one barber at the same time are blocked in the database itself.", ar: "عمود لكل حلاق بمواعيد شغله وإجازاته؛ والحجز بياخد مدة الخدمة، ومفيش حجزين لنفس الحلاق في نفس الوقت — مقفولة في الداتابيز نفسها." } },
      { title: { en: "Walk-in queue", ar: "دور الانتظار" }, text: { en: "A queue number and an estimated wait, “arrived → started → done”, and a TV screen for the shop.", ar: "رقم دور ووقت انتظار تقريبي، و«وصل ← بدأ ← خلص»، وشاشة دور للتلفزيون." } },
      { title: { en: "Online booking", ar: "الحجز أونلاين" }, text: { en: "The client picks the service, barber and time, confirms his number with a WhatsApp code, and gets a link to view or cancel.", ar: "العميل يختار الخدمة والحلاق والميعاد، ويتأكد من رقمه بكود واتساب، وياخد رابط يشوف منه الحجز أو يلغيه." } },
      { title: { en: "Cashier & shifts", ar: "الكاشير والورديات" }, text: { en: "Services and products with stock, discount, tips, cash / card / InstaPay / wallet or several at once, receipts, returns and a cash drawer.", ar: "خدمات ومنتجات بمخزون، وخصم، وبقشيش، ودفع كاش أو فيزا أو إنستاباي أو محفظة أو أكتر من طريقة، وفاتورة ومرتجع ودرج كاش." } },
      { title: { en: "Barber commission", ar: "عمولة الحلاقين" }, text: { en: "A percentage or fixed sum per barber, different per service if you like; daily and monthly reports, and settlement recorded as an expense.", ar: "نسبة أو مبلغ ثابت لكل حلاق، وممكن تختلف لكل خدمة؛ تقرير يومي وشهري، والتسوية بتتسجّل مصروف." } },
      { title: { en: "Clients, packs & loyalty", ar: "العملاء والباقات والولاء" }, text: { en: "Visit history and favourite barber, loyalty by visits, “10 haircuts” packs, gift cards with a code, and a deposit that’s kept if the client doesn’t show.", ar: "تاريخ الزيارات والحلاق المفضّل، وولاء بعدد الزيارات، وباقات «كارت 10 قصات»، وكروت هدية بكود، وعربون بيتحجز لو العميل مجاش." } },
    ],
    highlights: {
      en: ["No double booking, enforced in the database", "A TV screen for the queue", "WhatsApp confirmation and reminder", "A barber sees only his day and commission", "Several branches, roles per screen", "Excel export and a tested backup restore"],
      ar: ["مفيش حجز مزدوج — مقفول في الداتابيز", "شاشة دور للتلفزيون", "تأكيد وتذكير على واتساب", "الحلاق يشوف يومه وعمولته بس", "فروع كتير وصلاحيات لكل شاشة", "تصدير Excel واسترجاع نسخة متجرّب"],
    },
    integrations: {
      en: ["WhatsApp confirmations and reminders", "TV queue screen", "Payment methods recorded: cash, card, InstaPay, wallets", "Daily backup"],
      ar: ["تأكيدات وتذكيرات واتساب", "شاشة الدور للتلفزيون", "طرق الدفع المسجّلة: كاش وفيزا وإنستاباي ومحافظ", "نسخة احتياطية يومية"],
    },
    before: {
      en: ["Bookings in a notebook, two clients at the same hour", "“Who’s next?” shouted across the shop", "Commissions worked out on paper every month"],
      ar: ["الحجوزات في كشكول وعميلين في نفس الساعة", "«التالي مين؟» بتتنادي في المحل", "العمولات بتتحسب على ورق كل شهر"],
    },
    photo: "/images/site/boutique-v2.webp",
    photoAlt: { en: "A well-groomed man in a shop", ar: "راجل شيك في محل" },
    screen: {
      nav: [{ en: "Calendar", ar: "الكالندر" }, { en: "Queue", ar: "الدور" }, { en: "Cashier", ar: "الكاشير" }, { en: "Commissions", ar: "العمولات" }],
      stats: [
        { label: { en: "Bookings today", ar: "حجوزات النهارده" }, value: "34" },
        { label: { en: "In the queue", ar: "في الدور" }, value: "5" },
        { label: { en: "Sales today", ar: "مبيعات النهارده" }, value: "6,150" },
      ],
      chart: [30, 44, 58, 52, 74, 90, 82],
      rows: [
        { name: { en: "Haircut + beard · Barber 2", ar: "حلاقة وذقن · حلاق 2" }, meta: { en: "16:30 · 45 min", ar: "4:30 م · 45 د" }, value: "180" },
        { name: { en: "Queue #12", ar: "دور رقم 12" }, meta: { en: "Estimated wait 20 min", ar: "انتظار تقريبي 20 د" }, value: { en: "Waiting", ar: "منتظر" } },
        { name: { en: "Pack · 10 haircuts", ar: "باقة · 10 قصات" }, meta: { en: "Session 4 of 10", ar: "الجلسة 4 من 10" }, value: { en: "Active", ar: "شغالة" } },
      ],
    },
    keywords: {
      en: ["barbershop management software Egypt", "salon booking system Egypt", "barber commission software"],
      ar: ["برنامج حلاقة", "برنامج صالون", "برنامج حجوزات صالون", "برنامج إدارة صالون حلاقة", "سيستم حلاق"],
    },
  },
  {
    slug: "medical-lab",
    icon: "FlaskConical",
    name: { en: "Medical lab system", ar: "نظام معامل التحاليل" },
    hint: { en: "Samples, results, approval, reports", ar: "العينات والنتايج والاعتماد والتقارير" },
    tagline: { en: "From the tube label to an approved report — with the lab doctor in control.", ar: "من ليبل الأنبوبة لحد التقرير المعتمد — وطبيب المعمل ماسك الدفة." },
    summary: {
      en: "For medical labs: reception with tests and packages chosen from the keyboard, cash or contract companies, and a barcode label per tube; samples received or rejected with a reason; results typed with high/low/critical flags; approval by the lab doctor only; an Arabic/English report or a WhatsApp link for the patient; quality control, reagent stock, urgent orders and home visits.",
      ar: "لمعامل التحاليل: استقبال بتختار فيه التحاليل والباقات بالكيبورد، نقدي أو شركة تعاقد، وليبل باركود لكل أنبوبة؛ واستلام العينة أو رفضها بسبب؛ وكتابة النتايج بعلامة عالي/واطي/حرج؛ والاعتماد لطبيب المعمل بس؛ وتقرير عربي/إنجليزي أو رابط واتساب للمريض؛ ومراقبة جودة ومخزون كواشف والتحاليل المستعجلة والزيارات المنزلية.",
    },
    audience: {
      en: ["Medical laboratories", "Labs that work with contract companies", "Labs with home sample collection", "Labs that receive referrals from doctors"],
      ar: ["معامل التحاليل الطبية", "المعامل اللي بتتعاقد مع شركات", "المعامل اللي بتسحب عينات من البيت", "المعامل اللي بيحوّلها دكاترة"],
    },
    modules: [
      { title: { en: "Reception & billing", ar: "الاستقبال والحساب" }, text: { en: "Find or open a patient (age sets the reference range), pick tests and packages, cash or a contract company with the patient’s share, discounts above a limit need the supervisor’s code, and a barcode label per tube.", ar: "دوّر على المريض أو افتح ملف (السن بيحدد المدى المرجعي)، واختار التحاليل والباقات، نقدي أو شركة تعاقد بنسبة تحمّل المريض، والخصم فوق الحد بكود المشرف، وليبل باركود لكل أنبوبة." } },
      { title: { en: "Samples & results", ar: "العينات والنتايج" }, text: { en: "Receive a sample or reject it with a reason (clotted, too little…) and draw again; type results with the flag showing as you type; derived values such as LDL are calculated and marked.", ar: "استلم العينة أو ارفضها بسبب (متجلطة، قليلة…) واسحب تاني؛ واكتب النتايج والعلامة بتظهر وانت بتكتب؛ والقيم المحسوبة زي LDL بتتحسب لوحدها ومتعلّمة." } },
      { title: { en: "Lab-doctor approval", ar: "اعتماد طبيب المعمل" }, text: { en: "Only the lab doctor approves. A critical result needs confirmation that the treating doctor was told; any edit after approval needs a reason and is logged, then re-approved.", ar: "طبيب المعمل بس هو اللي يعتمد. والنتيجة الحرجة محتاجة تأكيد إنه بلّغ الطبيب المعالج؛ وأي تعديل بعد الاعتماد محتاج سبب وبيتسجّل ويتعتمد تاني." } },
      { title: { en: "Reports & delivery", ar: "التقارير والتسليم" }, text: { en: "An A4 Arabic/English report with the lab doctor’s signature (print or PDF), or an expiring, unguessable WhatsApp link that shows approved results only.", ar: "تقرير A4 عربي/إنجليزي بتوقيع طبيب المعمل (طباعة أو PDF)، أو رابط واتساب بينتهي ومستحيل يتخمّن وبيعرض المعتمد بس." } },
      { title: { en: "Quality & reagents", ar: "الجودة والكواشف" }, text: { en: "Daily quality-control readings checked by Westgard rules with a Levey-Jennings chart; if QC fails, approving that test is blocked. Reagent stock drops with every result, with low / near-expiry alerts.", ar: "قراءات مراقبة الجودة اليومية بقواعد Westgard ورسم Levey-Jennings؛ ولو الـ QC فشل اعتماد التحليل ده بيتمنع. ومخزون الكواشف بيتخصم مع كل نتيجة وتنبيهات «منخفض» و«قرب الانتهاء»." } },
      { title: { en: "Companies & doctors", ar: "الشركات والدكاترة" }, text: { en: "A monthly statement per contract company, and the referring doctor’s commission worked out when the order is placed and paid once.", ar: "كشف حساب شهري لكل شركة تعاقد، وعمولة الدكتور المحوّل بتتحسب وقت الطلب وبتتدفع مرة واحدة." } },
    ],
    highlights: {
      en: ["Urgent (STAT) orders jump the queue", "Home visits with address and rider", "Culture & sensitivity results", "Reception and accountant never see results", "Draft results survive a power cut", "Reference ranges reviewed by your lab doctor"],
      ar: ["الفوري (STAT) بيقدّم في الطابور", "زيارات منزلية بعنوان ومندوب", "نتيجة المزرعة والحساسية", "الاستقبال والمحاسب مبيشوفوش النتايج", "مسودة النتايج بتتحفظ لو الكهربا قطعت", "المدى المرجعي يراجعه طبيب المعمل"],
    },
    integrations: {
      en: ["Barcode tube labels", "WhatsApp result links", "Contract companies", "A4 reports in Arabic and English"],
      ar: ["ليبل باركود للأنابيب", "روابط النتايج على واتساب", "شركات التعاقد", "تقارير A4 بالعربي والإنجليزي"],
    },
    before: {
      en: ["Results written by hand and re-typed", "A tube with no label, a wrong name on the report", "Contract companies’ bills added up in Excel"],
      ar: ["النتايج بتتكتب بالإيد وتتعاد كتابتها", "أنبوبة من غير ليبل واسم غلط على التقرير", "فواتير شركات التعاقد بتتجمّع في إكسل"],
    },
    photo: "/images/site/clinic-v2.webp",
    photoAlt: { en: "Gloved hands of a medical worker holding tablets", ar: "إيدين بجوانتي لعامل طبي ماسكة أقراص" },
    screen: {
      nav: [{ en: "Reception", ar: "الاستقبال" }, { en: "Samples", ar: "العينات" }, { en: "Results", ar: "النتايج" }, { en: "Quality", ar: "الجودة" }],
      stats: [
        { label: { en: "Orders today", ar: "طلبات النهارده" }, value: "58" },
        { label: { en: "Waiting for approval", ar: "مستنية اعتماد" }, value: "11" },
        { label: { en: "Urgent", ar: "مستعجلة" }, value: "3" },
      ],
      chart: [34, 48, 60, 56, 72, 80, 68],
      rows: [
        { name: { en: "Order #A-1042 · Urgent", ar: "طلب A-1042 · مستعجل" }, meta: { en: "Critical result · confirm the call", ar: "نتيجة حرجة · أكّد الإبلاغ" }, value: { en: "Review", ar: "مراجعة" } },
        { name: { en: "Sample rejected", ar: "عينة مرفوضة" }, meta: { en: "Clotted · draw again", ar: "متجلطة · اسحب تاني" }, value: { en: "Redraw", ar: "سحب تاني" } },
        { name: { en: "Company statement · month", ar: "كشف شركة · الشهر" }, meta: { en: "Settlement due", ar: "التسوية مستحقة" }, value: { en: "Open", ar: "مفتوح" } },
      ],
    },
    keywords: {
      en: ["medical laboratory software Egypt", "lab information system Egypt", "lab results WhatsApp report"],
      ar: ["برنامج معمل تحاليل", "برنامج معامل طبية", "سيستم معمل", "برنامج نتايج تحاليل واتساب"],
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
  "website-development": ["clinic-management", "salon-barber", "school-management"],
  "mobile-app-development": ["restaurant-system", "gym-management", "pharmacy-system"],
  "custom-software": ["cafe-playstation", "pos-cashier", "pharmacy-system", "medical-lab", "inventory-warehouse", "accounting-hr"],
  "ai-chatbots": ["medical-lab", "salon-barber", "clinic-management"],
  "business-automation": ["wifi-cards", "accounting-hr", "inventory-warehouse"],
  "ecommerce-development": ["pos-cashier", "inventory-warehouse"],
};

/** "Gym system" stays as is, "Cashier & sales" becomes "Cashier & sales system" — no "Gym system system". */
export function sysName(name: string): string {
  return /system/i.test(name) ? name : `${name} system`;
}
