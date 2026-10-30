// On-page SEO copy for every live page (Egyptian market), in one place so
// titles, descriptions and the H1 keyword lines stay consistent.
//   title        → <title> (the layout template appends " | Elmasry Tech";
//                  the homepage uses its own absolute title with the brand once)
//   description  → meta description (140–155 chars: primary + secondary keyword + call to action)
//   h1           → the small keyword line rendered inside the page's single <h1>
//   intro        → first paragraph; mentions the primary keyword in its first sentence
// Keyword map: see the coordinator brief / docs/12-seo.md.

import type { Locale } from "@/lib/site";

type T = Record<Locale, string>;

export type PageSeo = { title: T; description: T; h1?: T; intro?: T };

export const pageSeo: Record<string, PageSeo> = {
  "home": {
    title: { en: "Software Company in Egypt — Apps & Systems", ar: "شركة برمجة في مصر — مواقع وتطبيقات وأنظمة" },
    description: { en: "Software company in Egypt building websites, mobile apps and ready business systems for shops, clinics and companies. Book a free consultation today.", ar: "شركة برمجة في مصر بتعمل تصميم مواقع وتطبيقات وأنظمة جاهزة للمحلات والعيادات والشركات من القاهرة. احجز استشارة مجانية أو عرض تجريبي مجاني النهارده." },
  },
  "services": {
    title: { en: "Software Development Services in Egypt", ar: "خدمات البرمجة وتصميم المواقع في مصر" },
    description: { en: "Software development services in Egypt: website design, mobile apps, custom systems, AI chatbots and automation by one Cairo team. Get a free consultation.", ar: "خدمات البرمجة وتصميم المواقع في مصر: تطبيقات موبايل، أنظمة حسب الطلب، شات بوت واتساب وأتمتة الشغل من فريق واحد في القاهرة. احجز استشارة مجانية دلوقتي." },
    h1: { en: "Software development services in Egypt", ar: "خدمات البرمجة وتصميم المواقع في مصر" },
    intro: { en: "Our software development services in Egypt cover everything a business needs on screen: a website that brings customers, an app with your name, one system for your whole business, or an assistant that answers WhatsApp — explained in plain words, with progress you can see every week.", ar: "خدمات البرمجة وتصميم المواقع في مصر اللي بنقدمها بتغطي كل اللي شغلك محتاجه على الشاشة: موقع يجيب لك عملاء، تطبيق باسمك، نظام يلمّ شغلك كله، أو مساعد يرد على الواتساب. بنشرح كل حاجة بالبلدي، وبتشوف الشغل كل أسبوع." },
  },
  "systems": {
    title: { en: "Ready-made Business Software in Egypt", ar: "أنظمة وبرامج جاهزة للمحلات والشركات" },
    description: { en: "Ready-made business software in Egypt: POS, inventory, clinic, pharmacy, gym, restaurant, school and accounting systems. Rent or buy — book a free demo.", ar: "أنظمة وبرامج جاهزة للمحلات والشركات في مصر: برنامج كاشير، برنامج مخازن، برنامج حسابات، عيادات وصيدليات ومطاعم وجيم. إيجار أو شراء — احجز عرض تجريبي مجاني." },
    h1: { en: "Ready-made business software in Egypt", ar: "أنظمة وبرامج جاهزة للمحلات والشركات" },
    intro: { en: "Ready-made business software for shops, pharmacies, clinics, restaurants, gyms and schools in Egypt. We set it up for your business, move your data ourselves and train your team — running from the first week, rented monthly or bought once.", ar: "أنظمة وبرامج جاهزة للمحلات والشركات: كاشير وصيدليات وعيادات ومطاعم وجيم ومدارس. بنجهّزها على شغلك، وننقل بياناتك بنفسنا، وندرّب فريقك — وتشتغل من أول أسبوع، بالإيجار الشهري أو بالشراء مرة واحدة." },
  },
  "portfolio": {
    title: { en: "Our Software & Web Design Work in Egypt", ar: "أعمالنا في البرمجة وتصميم المواقع" },
    description: { en: "Our software and web design work: live websites, apps and systems for clients in Egypt and the Netherlands, plus ready-made business systems. Ask for a free demo.", ar: "أعمالنا في البرمجة وتصميم المواقع: مواقع وتطبيقات وأنظمة شغالة لعملاء في مصر وهولندا، وأنظمة جاهزة بنقدّمها لنشاطك. اطلب عرض تجريبي أو استشارة مجانية." },
    h1: { en: "Our software & web design work", ar: "أعمالنا في البرمجة وتصميم المواقع" },
    intro: { en: "Our software and web design work, shown as real screens: live projects for our clients that you can open yourself, and the ready-made systems we offer — ask for a demo of any of them. Client work that isn't public is shown only in a private meeting.", ar: "أعمالنا في البرمجة وتصميم المواقع على الشاشة: مشاريع شغالة لعملائنا تقدر تفتحها بنفسك، وأنظمة جاهزة بنقدّمها — واطلب عرض لأي واحد منها. وشغل العملاء اللي مش منشور بنعرضه في اجتماع خاص بس." },
  },
  "about": {
    title: { en: "About Us — Software Company in Cairo, Egypt", ar: "عن شركة برمجة مصرية في القاهرة" },
    description: { en: "About Elmasry Tech, a software company in Cairo: websites, apps and business systems for clients in Egypt and abroad, with support after launch.", ar: "عن Elmasry Tech، شركة برمجة مصرية في القاهرة: بنعمل مواقع وتطبيقات وأنظمة لعملاء في مصر وبره مصر، ونفضل معاك بعد التسليم. احجز استشارة مجانية." },
    h1: { en: "About our software company in Cairo", ar: "عن شركة برمجة مصرية في القاهرة" },
    intro: { en: "Elmasry Tech is a software company in Cairo, Egypt. We build websites, apps and business systems for clients in Egypt and abroad — and we stay after launch.", ar: "Elmasry Tech شركة برمجة مصرية في القاهرة. بنبني مواقع وتطبيقات وأنظمة لعملاء في مصر وبره مصر — وبنفضل موجودين بعد التسليم." },
  },
  "contact": {
    title: { en: "Contact Our Software Team — Free Consultation", ar: "تواصل مع شركة برمجة — استشارة مجانية" },
    description: { en: "Contact our software company in Cairo for a free consultation on your website, app or business system. WhatsApp us — we reply within one working day.", ar: "تواصل مع شركة برمجة في القاهرة واحجز استشارة مجانية لموقعك أو تطبيقك أو نظام شركتك. ابعت لنا على واتساب أو اكتب رسالتك، وبنرد عليك خلال يوم عمل واحد بس." },
    h1: { en: "Contact our software company — free consultation", ar: "تواصل مع شركة برمجة — استشارة مجانية" },
    intro: { en: "Contact a software company that answers in plain words: a few lines are enough. A real person replies within one working day — or message us on WhatsApp right now.", ar: "تواصل مع شركة برمجة بترد عليك بالبلدي: كام سطر كفاية. شخص حقيقي هيرد عليك خلال يوم عمل — أو ابعت لنا على واتساب دلوقتي." },
  },
  "privacy": {
    title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    description: { en: "Elmasry Tech privacy policy in plain words: what this website collects, why, how long we keep it, and how to get a copy or deletion. Questions? Message us on WhatsApp.", ar: "سياسة الخصوصية في Elmasry Tech بكلام واضح: بنجمع إيه من الموقع وليه، وبنحتفظ بيه قد إيه، وإزاي تطلب نسخة من بياناتك أو تمسحها. عندك سؤال؟ ابعت لنا على واتساب." },
  },
  "terms": {
    title: { en: "Terms of Service", ar: "الشروط والأحكام" },
    description: { en: "Elmasry Tech terms of service in plain words: written offers, payment in parts, who owns the code, support periods and confidentiality. Questions? Message us on WhatsApp.", ar: "الشروط والأحكام في Elmasry Tech بكلام واضح: العرض المكتوب، والدفع على دفعات، ومين يملك الكود، وفترة الدعم والسرية. عندك سؤال عن أي بند؟ ابعت لنا على واتساب." },
  },
  "service:website-development": {
    title: { en: "Website Design in Egypt — Sites That Sell", ar: "تصميم مواقع في مصر — موقع يجيب لك عملاء" },
    description: { en: "Website design in Egypt for companies, clinics and shops: fast Arabic and English sites built for Google and WhatsApp orders. Free consultation and quote.", ar: "تصميم مواقع في مصر للشركات والعيادات والمحلات: موقع شركة سريع بالعربي والإنجليزي، يظهر على جوجل ويجيب طلبات واتساب. اعرف سعر تصميم موقع باستشارة مجانية." },
    h1: { en: "Website design in Egypt", ar: "تصميم مواقع في مصر" },
    intro: { en: "Website design in Egypt, done around one question: what should the visitor do next? Your site works on every phone, in Arabic and English, shows up on Google, and comes with a simple dashboard so you can change prices, photos and text yourself.", ar: "تصميم مواقع في مصر بيبدأ عندنا بسؤال واحد: الزائر المفروض يعمل إيه بعد كده؟ موقعك هيشتغل على أي موبايل، بالعربي والإنجليزي، ويظهر على جوجل، ومعاه لوحة تحكم بسيطة تغيّر منها الأسعار والصور والكلام بنفسك." },
  },
  "service:mobile-app-development": {
    title: { en: "Mobile App Development Egypt — iOS & Android", ar: "برمجة تطبيقات موبايل في مصر أندرويد وآيفون" },
    description: { en: "Mobile app development in Egypt: one iOS and Android app for orders, bookings and payments, published on the stores in your name. Free consultation.", ar: "برمجة تطبيقات موبايل في مصر: تصميم تطبيقات أندرويد وايفون للطلبات والحجوزات والدفع، وننشرها باسمك على المتاجر. اعرف تكلفة عمل تطبيق في استشارة مجانية." },
    h1: { en: "Mobile app development in Egypt", ar: "برمجة تطبيقات موبايل في مصر" },
    intro: { en: "Mobile app development in Egypt for businesses that want their own app: customers order, book and pay from their phone, and you see everything in one dashboard. We build it once for iPhone and Android, publish it under your name, and keep it updated.", ar: "برمجة تطبيقات موبايل في مصر لكل صاحب شغل عايز تطبيق باسمه: عميلك يطلب ويحجز ويدفع من موبايله، وأنت تشوف كل حاجة في لوحة واحدة. بنبنيه مرة واحدة للآيفون والأندرويد، وننزّله باسمك على المتاجر، ونفضل نحدّثه." },
  },
  "service:custom-software": {
    title: { en: "Custom Software & ERP Development in Egypt", ar: "برمجة أنظمة وبرامج حسب الطلب — ERP وCRM" },
    description: { en: "Custom software development in Egypt: ERP, CRM and business systems built around how you work, with every branch on one screen. Book a free consultation.", ar: "برمجة أنظمة وبرامج حسب الطلب في مصر: برنامج ERP ونظام CRM وبرنامج إدارة شركات متفصّل على شغلك، وكل فروعك على شاشة واحدة. احجز استشارة مجانية دلوقتي." },
    h1: { en: "Custom software & ERP development in Egypt", ar: "برمجة أنظمة وبرامج حسب الطلب" },
    intro: { en: "Custom software development in Egypt that follows your business, not the other way round. We sit with you, learn your daily routine, and build one system for sales, stock, money and staff — with clear permissions and live numbers on your phone.", ar: "برمجة أنظمة وبرامج حسب الطلب بتمشي على طريقة شغلك، مش العكس. بنقعد معاك، نفهم يومك ماشي إزاي، ونبني نظام واحد للمبيعات والمخزن والفلوس والموظفين — بصلاحيات واضحة لكل موظف، وأرقام لحظية تشوفها من موبايلك." },
  },
  "service:ai-chatbots": {
    title: { en: "WhatsApp Chatbot & AI in Egypt", ar: "شات بوت واتساب للشركات — رد آلي بالمصري" },
    description: { en: "WhatsApp chatbot for businesses in Egypt: an AI assistant that answers prices, bookings and orders in Egyptian Arabic, day and night. Free consultation.", ar: "شات بوت واتساب للشركات في مصر: رد آلي واتساب بالذكاء الاصطناعي بيجاوب على الأسعار والحجوزات والطلبات بالمصري ليل ونهار. اطلب استشارة مجانية وجرّبه بنفسك." },
    h1: { en: "WhatsApp chatbots & AI solutions in Egypt", ar: "شات بوت واتساب للشركات" },
    intro: { en: "A WhatsApp chatbot for your business answers the questions you get all day — prices, opening hours, availability, bookings — instantly, in Egyptian Arabic or English, only from information you approve, and hands the chat to a real person whenever it isn’t sure.", ar: "شات بوت واتساب للشركات بيرد على الأسئلة اللي بتجيلك طول اليوم: السعر كام، مواعيدكم إيه، الحاجة متاحة، عايز أحجز. بيرد فورًا بالمصري أو بالإنجليزي، ومن المعلومات اللي أنت موافق عليها بس، ولو مش متأكد بيحوّل المحادثة لحد من فريقك." },
  },
  "service:business-automation": {
    title: { en: "Business Process Automation in Egypt", ar: "أتمتة الأعمال في مصر — ربط الأنظمة وواتساب" },
    description: { en: "Business process automation in Egypt: connect WhatsApp, Excel, accounts and couriers so orders, invoices and reports run by themselves. Free consultation.", ar: "أتمتة الأعمال في مصر: ربط الأنظمة والواتساب والإكسل والحسابات عشان الطلب والفاتورة والتقارير التلقائية تمشي لوحدها من غير نقل يدوي. احجز استشارة مجانية." },
    h1: { en: "Business process automation in Egypt", ar: "أتمتة الأعمال في مصر" },
    intro: { en: "Business process automation in Egypt, in plain terms: we watch how an order, an invoice or a report moves through your business today, then connect the steps so it flows by itself — the invoice is made, the customer gets a WhatsApp update, and you get a summary every morning.", ar: "أتمتة الأعمال في مصر ببساطة: بنشوف الطلب أو الفاتورة أو التقرير بيمشي إزاي عندك النهارده، وبعدين نربط الخطوات ببعض فتمشي لوحدها — الفاتورة تطلع، العميل يجيله تحديث على واتساب، وأنت يوصلك ملخص كل صباح." },
  },
  "service:ecommerce-development": {
    title: { en: "E-commerce Website Development in Egypt", ar: "تصميم متجر إلكتروني في مصر مع بوابات الدفع" },
    description: { en: "E-commerce website development in Egypt: an online store with cards, wallets and cash on delivery, linked to your shop cashier and stock. Free consultation", ar: "تصميم متجر إلكتروني في مصر: متجر أونلاين بربط بوابات الدفع (فيزا ومحافظ وكاش عند الاستلام) ومتوصل بكاشير المحل والمخزون. احجز استشارة مجانية واعرف السعر." },
    h1: { en: "E-commerce website development in Egypt", ar: "تصميم متجر إلكتروني في مصر" },
    intro: { en: "E-commerce website development in Egypt that sells online and in your shop from the same stock. Customers pay the way they like — card, wallet, instalments or cash on delivery — shipping is booked for you, and the shop cashier keeps selling even when the internet drops.", ar: "تصميم متجر إلكتروني في مصر يبيع أونلاين وفي المحل من نفس المخزون. العميل يدفع بالطريقة اللي تريحه — فيزا أو محفظة أو تقسيط أو كاش عند الاستلام — والشحن بيتحجز لوحده، وكاشير المحل بيكمّل بيع حتى لو النت فصل." },
  },
  "system:cafe-playstation": {
    title: { en: "PlayStation & Café Management Software in Egypt", ar: "برنامج بلايستيشن وكافيه لحساب الوقت والطلبات" },
    description: { en: "PlayStation and café software in Egypt: time by the hour with single/multi prices, packages, table and room orders, a bar screen, reservations and blind shift counts — works offline.", ar: "برنامج بلايستيشن وكافيه في مصر: حساب الوقت بالساعة سنجل ومالتي، والباقات، وطلبات الترابيزات والرومات، وشاشة البار، والحجوزات، وقفل الوردية — وشغال من غير نت." },
    h1: { en: "PlayStation & café management software", ar: "برنامج بلايستيشن وكافيه" },
    intro: { en: "PlayStation and café management software for gaming lounges, cafés, billiards and VIP rooms in Egypt: time by the hour, packages, orders and a bar screen, reservations with deposits, blind cash counts and a Z report — on a PC in the shop, working without internet.", ar: "برنامج بلايستيشن وكافيه لصالات الجيمنج والكافيهات والبلياردو والرومات الـ VIP: الوقت بالساعة، والباقات، والطلبات وشاشة البار، والحجوزات بعربون، وعدّ الدرج وتقرير Z — على كمبيوتر في المحل وشغال من غير نت." },
  },
  "system:wifi-cards": {
    title: { en: "WiFi Cards & MikroTik Hotspot Software in Egypt", ar: "برنامج كروت واي فاي وهوت سبوت ميكروتيك" },
    description: { en: "WiFi cards software for MikroTik in Egypt: plans by data, speed and validity, printed cards, a cashier screen, online purchase from the login page and Telegram alerts.", ar: "برنامج كروت واي فاي لميكروتيك في مصر: باقات بالجيجات والسرعة والصلاحية، وطباعة الكروت، وشاشة كاشير، وشراء أونلاين من صفحة الدخول، وتنبيهات تيليجرام." },
    h1: { en: "WiFi cards software for MikroTik", ar: "برنامج كروت واي فاي لميكروتيك" },
    intro: { en: "WiFi cards software for cafés, shops, hostels and residential areas that sell internet on MikroTik: you set each card's data, speed, validity and devices, print cards, sell and top up from a cashier screen — and the router itself enforces every limit, even through power cuts.", ar: "برنامج كروت واي فاي للكافيهات والمحلات والهوستلات والمناطق السكنية اللي بتبيع نت على ميكروتيك: بتحدد لكل كارت الجيجات والسرعة والصلاحية وعدد الأجهزة، وبتطبع الكروت وتبيع وتشحن من شاشة كاشير — والراوتر نفسه بيطبّق كل حد حتى لو الكهربا قطعت." },
  },
  "system:pos-cashier": {
    title: { en: "POS Cashier & Instalment Software in Egypt", ar: "برنامج كاشير وتقسيط ومحلات موبايلات" },
    description: { en: "Cashier software in Egypt for shops and mobile stores: barcode, shifts, instalment contracts, IMEI and warranty, repairs — works offline. Book a free demo.", ar: "برنامج كاشير وتقسيط في مصر للمحلات ومحلات الموبايلات: باركود وورديات وعقود أقساط وتتبع IMEI والضمان وصيانة، وبيشتغل من غير نت. احجز عرض تجريبي مجاني." },
    h1: { en: "POS, instalments & mobile-shop software", ar: "برنامج كاشير وتقسيط ومحلات موبايلات" },
    intro: { en: "Cashier software for shops, supermarkets and mobile stores in Egypt: scan, print the receipt and close the shift; sell on instalments with a down payment, months and a guarantor; track every phone by IMEI with its warranty; run repairs. It works offline and is ready to connect to the e-receipt system.", ar: "برنامج كاشير للمحلات والسوبر ماركت ومحلات الموبايلات في مصر: امسح الباركود، اطبع الفاتورة، اقفل الوردية؛ وبيع بالتقسيط بمقدم وشهور وضامن؛ وتتبّع كل موبايل بالـ IMEI وضمانه؛ وقسم صيانة. بيشتغل من غير نت وجاهز للربط بمنظومة الإيصال الإلكتروني." },
  },
  "system:inventory-warehouse": {
    title: { en: "Inventory & Warehouse Software in Egypt", ar: "برنامج مخازن وجرد للشركات والمحلات" },
    description: { en: "Inventory and warehouse software in Egypt: stock per branch, transfers, expiry alerts and phone stocktaking for distributors and shops. Book a free demo.", ar: "برنامج مخازن في مصر للموزعين والمحلات: برنامج إدارة المخازن والفروع والتحويلات وتنبيهات الصلاحية، وبرنامج جرد من الموبايل بالباركود. احجز عرض تجريبي مجاني." },
    h1: { en: "Inventory & warehouse software in Egypt", ar: "برنامج مخازن وجرد في مصر" },
    intro: { en: "Inventory and warehouse software for distributors, wholesalers and companies with branches in Egypt: every item, every shelf and every move between branches — with expiry alerts and the real value of your stock, any time.", ar: "برنامج مخازن للموزعين وتجار الجملة والشركات اللي ليها فروع: كل صنف، وكل رف، وكل حركة بين الفروع — مع تنبيهات الصلاحية وقيمة مخزونك الحقيقية في أي وقت." },
  },
  "system:clinic-management": {
    title: { en: "Clinic Management Software in Egypt", ar: "برنامج عيادات وحجز مواعيد بتذكير واتساب" },
    description: { en: "Clinic management software in Egypt: bookings, WhatsApp reminders, patient files, prescriptions and billing for clinics and dentists. Book a free demo.", ar: "برنامج عيادات في مصر: برنامج حجز مواعيد بتذكير واتساب، وملف المريض والروشتة والفواتير — سيستم عيادة للعيادات والمراكز الطبية. احجز عرض تجريبي مجاني." },
    h1: { en: "Clinic management software in Egypt", ar: "برنامج عيادات وحجز مواعيد" },
    intro: { en: "Clinic management software for clinics, medical centres and dentists in Egypt: bookings at reception or online, WhatsApp reminders so fewer patients forget, the patient’s full file, prescriptions and bills — private and protected.", ar: "برنامج عيادات للعيادات والمراكز الطبية وعيادات الأسنان: الحجز من الاستقبال أو أونلاين، وتذكير على واتساب عشان المريض مينساش، وملف المريض كامل، والروشتة والفاتورة — بخصوصية وأمان." },
  },
  "system:pharmacy-system": {
    title: { en: "Pharmacy Software in Egypt — Alternatives, Expiry, Insurance", ar: "برنامج صيدليات بالبدايل والصلاحية والتأمين" },
    description: { en: "Pharmacy software in Egypt: sell by strip or box, alternatives, earliest-expiry-first, insurance co-pay, controlled-drugs register and delivery. Free demo.", ar: "برنامج صيدليات في مصر: بيع بالشريط والعلبة، وبدايل بنفس المادة الفعالة، وصرف الأقرب انتهاءً، وتحمّل شركات التأمين، وسجل المخدرة، والتوصيل. احجز عرض مجاني." },
    h1: { en: "Pharmacy management software in Egypt", ar: "برنامج صيدليات بالبدايل والصلاحية" },
    intro: { en: "Pharmacy software for Egypt: search by name, ingredient or barcode and sell by strip or box; alternatives with the same ingredient; the earliest expiry goes out first and an expired batch can’t be sold; insurance and contract companies with the patient’s co-pay; a controlled-drugs register; home-delivery orders. Ready to connect to the e-receipt system.", ar: "برنامج صيدليات في مصر: دوّر بالاسم أو المادة الفعالة أو الباركود وبيع بالشريط أو العلبة؛ وبدايل بنفس المادة؛ والأقرب انتهاءً يخرج الأول والتشغيلة المنتهية مستحيل تتباع؛ وشركات التأمين والتعاقدات بنسبة تحمّل المريض؛ وسجل للأدوية المخدرة؛ وطلبات التوصيل. وجاهز للربط بمنظومة الإيصال الإلكتروني." },
  },
  "system:gym-management": {
    title: { en: "Gym Management Software in Egypt", ar: "برنامج جيم لإدارة الاشتراكات والحضور" },
    description: { en: "Gym management software in Egypt: memberships, freezes, QR or fingerprint check-in, classes, renewals and a member app. Book a free demo for your gym.", ar: "برنامج جيم في مصر: برنامج إدارة صالات رياضية للاشتراكات والتجميد، والحضور بالـ QR أو البصمة، وتذكير التجديد وتطبيق للأعضاء. احجز عرض تجريبي مجاني." },
    h1: { en: "Gym management software in Egypt", ar: "برنامج جيم لإدارة الاشتراكات" },
    intro: { en: "Gym management software for gyms, studios and sports academies in Egypt: plans and freezes, check-in by QR, fingerprint or card, personal-training sessions, classes, renewals and payments — plus an app for your members.", ar: "برنامج جيم للجيمات والاستوديوهات والأكاديميات الرياضية: الباقات والتجميد، والدخول بالـ QR أو البصمة أو الكارت، وحصص البرايفت، والكلاسات، والتجديد والتحصيل — ومعاه تطبيق لأعضائك." },
  },
  "system:restaurant-system": {
    title: { en: "Restaurant & Café POS Software in Egypt", ar: "برنامج مطاعم وكافيهات مع شاشة مطبخ" },
    description: { en: "Restaurant and café POS software in Egypt: tables, takeaway, delivery, a kitchen screen and recipe costing in one system that works offline. Free demo.", ar: "برنامج مطاعم في مصر: سيستم كاشير مطعم وبرنامج كافيه للصالة والتيك أواي والتوصيل، مع شاشة مطبخ وتكلفة كل طبق، وبيشتغل من غير نت. احجز عرض تجريبي مجاني." },
    h1: { en: "Restaurant & café POS software in Egypt", ar: "برنامج مطاعم وكافيهات" },
    intro: { en: "Restaurant and café POS software for Egypt: tables, takeaway and delivery, a kitchen screen, recipes that take ingredients out of stock with every sale, delivery areas and riders — and app orders on the same screen.", ar: "برنامج مطاعم وكافيهات فيه كل حاجة: الصالة والترابيزات، والتيك أواي والتوصيل، وشاشة المطبخ، ووصفات بتخصم الخامات مع كل بيعة، ومناطق التوصيل والطيارين — وطلبات التطبيقات على نفس الشاشة." },
  },
  "system:school-management": {
    title: { en: "Tutoring Center Management Software in Egypt", ar: "برنامج سنتر دروس خصوصية وحضور بالكارت" },
    description: { en: "Tutoring center software in Egypt: groups and timetables, QR card attendance, fees and reminders, exams, teacher shares and a parents’ app. Book a free demo.", ar: "برنامج إدارة سنتر دروس خصوصية في مصر: مجموعات ومواعيد، وحضور بكارت QR، ومصاريف وتذكير، وامتحانات، ونصيب المدرس، وتطبيق لولي الأمر. احجز عرض مجاني." },
    h1: { en: "Tutoring center management software", ar: "برنامج سنتر دروس خصوصية" },
    intro: { en: "Management software for private-lesson centres in Egypt: students with their guardian’s number, groups by subject, grade, teacher and room, QR card attendance that flags unpaid students, absence messages, fees, exams and the teacher’s share — plus an app for students and parents.", ar: "برنامج إدارة سناتر الدروس الخصوصية في مصر: الطلاب برقم ولي الأمر، والمجموعات بالمادة والصف والمدرس والقاعة، والحضور بكارت QR وتنبيه اللي مدفعش، ورسائل الغياب، والمصاريف والامتحانات ونصيب المدرس — وتطبيق للطالب وولي الأمر." },
  },
  "system:salon-barber": {
    title: { en: "Salon & Barbershop Software in Egypt", ar: "برنامج صالون وحلاق بالحجز والدور والعمولات" },
    description: { en: "Salon and barbershop software in Egypt: booking calendar per barber, walk-in queue, online booking on WhatsApp, cashier and barber commissions. Free demo.", ar: "برنامج صالون وحلاق في مصر: حجوزات لكل حلاق، ودور انتظار بشاشة، وحجز أونلاين بتأكيد واتساب، وكاشير، وعمولة الحلاقين. احجز عرض تجريبي مجاني." },
    h1: { en: "Salon & barbershop software in Egypt", ar: "برنامج صالون وحلاق" },
    intro: { en: "Software for barbershops and salons in Egypt: a booking calendar with a column per barber that never double-books, a numbered walk-in queue with a TV screen, online booking confirmed by WhatsApp, a cashier with tips, barber commissions, deposits, session packs and gift cards.", ar: "برنامج لمحلات الحلاقة والصالونات في مصر: كالندر حجوزات بعمود لكل حلاق ومستحيل يحجز اتنين في نفس الوقت، ودور بأرقام وشاشة تلفزيون، وحجز أونلاين بتأكيد واتساب، وكاشير بالبقشيش، وعمولة الحلاقين، والعربون وباقات الجلسات وكروت الهدية." },
  },
  "system:medical-lab": {
    title: { en: "Medical Lab Software in Egypt — Results & Reports", ar: "برنامج معمل تحاليل بالنتايج والتقارير" },
    description: { en: "Medical laboratory software in Egypt: reception and barcode labels, results with flags, lab-doctor approval, Arabic/English reports, WhatsApp links and quality control.", ar: "برنامج معمل تحاليل في مصر: استقبال وليبل باركود، ونتايج بعلامات، واعتماد طبيب المعمل، وتقارير عربي/إنجليزي، وروابط واتساب، ومراقبة جودة. احجز عرض مجاني." },
    h1: { en: "Medical lab software in Egypt", ar: "برنامج معمل تحاليل" },
    intro: { en: "Medical laboratory software for Egypt: reception with tests, packages and contract companies; a barcode label per tube; samples received or rejected; results with high/low/critical flags; approval by the lab doctor only; an Arabic/English report or a WhatsApp link for the patient; quality control, reagent stock, urgent orders and home visits.", ar: "برنامج معامل تحاليل في مصر: استقبال بالتحاليل والباقات وشركات التعاقد؛ وليبل باركود لكل أنبوبة؛ واستلام العينة أو رفضها؛ ونتايج بعلامة عالي/واطي/حرج؛ والاعتماد لطبيب المعمل بس؛ وتقرير عربي/إنجليزي أو رابط واتساب للمريض؛ ومراقبة جودة ومخزون كواشف وتحاليل مستعجلة وزيارات منزلية." },
  },
  "system:accounting-hr": {
    title: { en: "Accounting & Payroll Software in Egypt", ar: "برنامج حسابات ورواتب بالفاتورة الإلكترونية" },
    description: { en: "Accounting and payroll software in Egypt: invoices, banks, cheques, the Tax Authority e-invoice, attendance, salaries and insurance. Book a free demo.", ar: "برنامج حسابات في مصر متوافق مع الفاتورة الإلكترونية: فواتير وبنوك وشيكات، وبرنامج رواتب وشؤون عاملين بالحضور والتأمينات. احجز عرض تجريبي مجاني دلوقتي." },
    h1: { en: "Accounting & payroll software in Egypt", ar: "برنامج حسابات ورواتب" },
    intro: { en: "Accounting and payroll software for Egyptian companies: invoices, who owes you and whom you owe, banks and cheques, the Tax Authority e-invoice — plus your staff: files, attendance, leave, salaries and insurance.", ar: "برنامج حسابات ورواتب للشركات: الفواتير، واللي ليك واللي عليك، والبنوك والشيكات، والفاتورة الإلكترونية — ومعاها الموظفين: الملفات، والحضور، والإجازات، والمرتبات، والتأمينات." },
  },
};

/** SEO copy for a page key ("home", "services", "service:<slug>", "system:<slug>", …). */
export function seoFor(key: string): PageSeo {
  const s = pageSeo[key];
  if (!s) throw new Error(`Missing SEO copy for "${key}"`);
  return s;
}
