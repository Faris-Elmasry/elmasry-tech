// In-depth, bilingual content for each /services/[slug] page, written for
// business owners: what changes for you, what you receive, what we need from
// you, how the weeks go, and straight answers. Keyed by the slugs in
// lib/content.ts `services`.

import type { Locale } from "@/lib/site";

type T = Record<Locale, string>;

export interface ServiceDetail {
  /** Big plain-language promise (the page H1). */
  headline: T;
  /** Who this is usually for (chips). */
  forWho: Record<Locale, string[]>;
  /** Everyday problem → what changes. */
  challenges: { problem: T; solution: T }[];
  /** What you receive at the end. */
  deliverables: Record<Locale, string[]>;
  /** What we need from you — the honest "effort" part. */
  yourPart: Record<Locale, string[]>;
  /** How the weeks usually go. */
  weeks: { when: T; title: T; text: T }[];
  /** Typical overall duration. */
  timeline: T;
  useCases: { title: T; text: T }[];
  /** Photo under /public/images/site. */
  photo: string;
  photoAlt: T;
  faqs: { q: T; a: T }[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "website-development": {
    headline: { en: "A website that brings you customers — not just compliments.", ar: "موقع يجيب لك عملاء — مش بس كلمتين حلوين." },
    forWho: {
      en: ["Companies & factories", "Clinics & centres", "Shops & brands", "Anyone running ads"],
      ar: ["الشركات والمصانع", "العيادات والمراكز", "المحلات والبراندات", "أي حد بيعمل إعلانات"],
    },
    challenges: [
      {
        problem: { en: "Your website looks old and nobody contacts you from it.", ar: "موقعك شكله قديم ومحدش بيكلّمك منه." },
        solution: { en: "A clear, modern site where every page leads to one thing: a call or a WhatsApp message.", ar: "موقع واضح وحديث، كل صفحة فيه بتودّي لحاجة واحدة: مكالمة أو رسالة واتساب." },
      },
      {
        problem: { en: "People search for what you sell and find your competitors.", ar: "الناس بتدوّر على اللي بتبيعه وبتلاقي منافسينك." },
        solution: { en: "A fast site built so Google understands it, in Arabic and English, with the words people really type.", ar: "موقع سريع ومتظبط عشان جوجل يفهمه، بالعربي والإنجليزي، وبالكلمات اللي الناس بتكتبها فعلًا." },
      },
      {
        problem: { en: "Every small change means waiting for a developer.", ar: "أي تعديل صغير لازم تستنى مبرمج." },
        solution: { en: "A simple dashboard: change prices, photos and text yourself in minutes.", ar: "لوحة تحكم بسيطة: تغيّر الأسعار والصور والكلام بنفسك في دقايق." },
      },
    ],
    deliverables: {
      en: ["The design of every page, approved by you", "A site that works on every phone", "Arabic and English versions", "A dashboard to edit it yourself", "Set up on Google, with visitor numbers", "Domain, hosting and company email — in your name"],
      ar: ["تصميم كل الصفحات وأنت موافق عليه", "موقع شغال على أي موبايل", "نسخة عربي ونسخة إنجليزي", "لوحة تحكم تعدّل منها بنفسك", "متسجّل على جوجل ومعاه أرقام الزوار", "الدومين والاستضافة وإيميل الشركة — باسمك"],
    },
    yourPart: {
      en: ["A 30-minute call about your business", "Your logo and any photos you have (we can help if not)", "About 20 minutes a week to review and approve"],
      ar: ["مكالمة 30 دقيقة عن شغلك", "اللوجو وأي صور عندك (ولو مفيش نساعدك)", "حوالي 20 دقيقة كل أسبوع تراجع وتوافق"],
    },
    weeks: [
      { when: { en: "Week 1", ar: "الأسبوع 1" }, title: { en: "We listen and plan", ar: "نسمع ونخطط" }, text: { en: "We agree on the pages, the words and the one action each page should drive.", ar: "نتفق على الصفحات والكلام، والخطوة اللي كل صفحة المفروض توصّل لها الزائر." } },
      { when: { en: "Week 2", ar: "الأسبوع 2" }, title: { en: "You see the design", ar: "تشوف التصميم" }, text: { en: "Real pages with your content. You comment, we adjust until you’re happy.", ar: "صفحات حقيقية بمحتواك. تعلّق، ونعدّل لحد ما تبقى مبسوط." } },
      { when: { en: "Week 3", ar: "الأسبوع 3" }, title: { en: "We build it", ar: "نبنيه" }, text: { en: "The site comes alive on a private link you can open from your phone.", ar: "الموقع بيشتغل على لينك خاص تفتحه من موبايلك." } },
      { when: { en: "Week 4", ar: "الأسبوع 4" }, title: { en: "Launch day", ar: "يوم الإطلاق" }, text: { en: "It goes live, Google is told, and we show you how to edit it.", ar: "ينزل أونلاين، نبلّغ جوجل، ونوريك إزاي تعدّل عليه." } },
    ],
    timeline: { en: "2–4 weeks for a company website", ar: "من أسبوعين لـ 4 أسابيع لموقع الشركة" },
    useCases: [
      { title: { en: "Company website", ar: "موقع شركة" }, text: { en: "Services, projects and contact for a company or factory.", ar: "الخدمات والمشاريع والتواصل لشركة أو مصنع." } },
      { title: { en: "Offer page for ads", ar: "صفحة عرض للإعلانات" }, text: { en: "One page, one offer, built to turn ad clicks into messages.", ar: "صفحة واحدة لعرض واحد، معمولة تحوّل ضغطات الإعلان لرسائل." } },
      { title: { en: "Customer area", ar: "منطقة للعملاء" }, text: { en: "Your clients log in to see their orders, invoices and requests.", ar: "عملاؤك يدخلوا يشوفوا طلباتهم وفواتيرهم." } },
      { title: { en: "Booking website", ar: "موقع حجوزات" }, text: { en: "Visitors pick a time and book — you get it on WhatsApp.", ar: "الزائر يختار ميعاد ويحجز — وأنت يوصلك على واتساب." } },
    ],
    photo: "/images/site/boutique-v2.webp",
    photoAlt: { en: "A menswear shop owner serving a customer trying on a suit", ar: "صاحب محل هدوم رجالي مع زبون بيقيس بدلة" },
    faqs: [
      {
        q: { en: "Will my website show up on Google?", ar: "موقعي هيظهر على جوجل؟" },
        a: { en: "Yes — we build it fast and readable for Google, and register it with Google ourselves. Reaching the top for very competitive words also needs regular content over time; we can advise you or handle it.", ar: "أيوه — بنبنيه سريع ومفهوم لجوجل، ونسجّله بنفسنا. أما إنك تطلع الأول في كلمات عليها منافسة كبيرة فده محتاج محتوى مستمر مع الوقت، ونقدر ننصحك أو نتولاه." },
      },
      {
        q: { en: "Can I change things myself?", ar: "أقدر أعدّل بنفسي؟" },
        a: { en: "Yes. You get a simple dashboard for pages, photos and products, and a short training session.", ar: "أيوه. بتاخد لوحة تحكم بسيطة للصفحات والصور والمنتجات، ومعاها تدريب قصير." },
      },
      {
        q: { en: "Whose name is the domain in?", ar: "الدومين هيبقى باسم مين؟" },
        a: { en: "Yours. Domain, hosting and every password are registered or transferred to your name.", ar: "باسمك أنت. الدومين والاستضافة وكل الباسوردات بتتسجل أو تتنقل باسمك." },
      },
    ],
  },
  "mobile-app-development": {
    headline: { en: "Your business in your customers’ pockets.", ar: "شغلك في جيب عملائك." },
    forWho: {
      en: ["Restaurants & delivery", "Clinics & salons", "Gyms & clubs", "Teams in the field"],
      ar: ["المطاعم والتوصيل", "العيادات والصالونات", "الجيمات والنوادي", "الفرق اللي شغالة برّه"],
    },
    challenges: [
      {
        problem: { en: "Orders come by phone and WhatsApp, and some get lost.", ar: "الطلبات بتيجي بالتليفون والواتساب، وفيه طلبات بتضيع." },
        solution: { en: "Customers order and pay in your app, and every order lands on one screen for your team.", ar: "العميل يطلب ويدفع من التطبيق، وكل طلب يوصل على شاشة واحدة لفريقك." },
      },
      {
        problem: { en: "Two separate apps for iPhone and Android sounds expensive.", ar: "تطبيقين منفصلين للآيفون والأندرويد شكلهم مكلّفين." },
        solution: { en: "We build it once and it runs smoothly on both.", ar: "بنبنيه مرة واحدة ويشتغل بسلاسة على الاتنين." },
      },
      {
        problem: { en: "Your people outside the office still use paper.", ar: "الناس اللي شغالين برّه المكتب لسه بيكتبوا على ورق." },
        solution: { en: "A staff app for visits, orders and photos that goes straight into your system.", ar: "تطبيق للموظفين يسجلوا فيه الزيارات والطلبات والصور، ويدخل على نظامك على طول." },
      },
    ],
    deliverables: {
      en: ["A clickable preview before we build", "The app on iPhone and Android", "A dashboard for you and your team", "Payments, maps and notifications", "Crash alerts so we fix problems first", "Published on both stores in your name"],
      ar: ["نسخة تجريبية تدوس عليها قبل ما نبني", "التطبيق على الآيفون والأندرويد", "لوحة تحكم ليك ولفريقك", "دفع وخرايط وإشعارات", "تنبيهات أعطال عشان نصلّح قبل ما تحس", "منشور على المتجرين باسمك"],
    },
    yourPart: {
      en: ["Tell us how a customer orders or books today", "Try the preview on your phone and comment", "Create your store accounts (we guide you step by step)"],
      ar: ["تحكي لنا العميل بيطلب أو يحجز إزاي النهارده", "تجرّب النسخة التجريبية على موبايلك وتعلّق", "تعمل حسابات المتاجر (وإحنا معاك خطوة بخطوة)"],
    },
    weeks: [
      { when: { en: "Weeks 1–2", ar: "أسبوع 1–2" }, title: { en: "A preview you can tap", ar: "نسخة تقدر تدوس عليها" }, text: { en: "Every screen designed and linked, so you can try the app before a line of it is built.", ar: "كل الشاشات متصممة ومتوصلة ببعض، فتجرّب التطبيق قبل ما نبدأ نبنيه." } },
      { when: { en: "Weeks 3–6", ar: "أسبوع 3–6" }, title: { en: "We build it", ar: "نبنيه" }, text: { en: "A new test version on your phone every week.", ar: "نسخة تجربة جديدة على موبايلك كل أسبوع." } },
      { when: { en: "Weeks 7–8", ar: "أسبوع 7–8" }, title: { en: "Real-life testing", ar: "تجربة في الواقع" }, text: { en: "We test on many phones and with your team before customers see it.", ar: "بنجرّب على موبايلات كتير ومع فريقك قبل ما العملاء يشوفوه." } },
      { when: { en: "Launch", ar: "الإطلاق" }, title: { en: "In the stores", ar: "على المتاجر" }, text: { en: "Published on the App Store and Google Play — then monthly improvements.", ar: "ينزل على App Store و Google Play — وبعدها تحسينات كل شهر." } },
    ],
    timeline: { en: "6–12 weeks for the first version", ar: "من 6 لـ 12 أسبوع لأول نسخة" },
    useCases: [
      { title: { en: "Ordering & delivery", ar: "طلب وتوصيل" }, text: { en: "Restaurants, groceries and pharmacies, with live rider tracking.", ar: "للمطاعم والسوبر ماركت والصيدليات، مع تتبع الطيار." } },
      { title: { en: "Booking", ar: "حجوزات" }, text: { en: "Clinics, salons and courts, with automatic reminders.", ar: "للعيادات والصالونات والملاعب، مع تذكير تلقائي." } },
      { title: { en: "Staff on the move", ar: "موظفين في الشارع" }, text: { en: "Sales reps, technicians and inspectors.", ar: "للمندوبين والفنيين والمفتشين." } },
      { title: { en: "Members & points", ar: "أعضاء ونقاط" }, text: { en: "Membership cards, points and offers on the phone.", ar: "كارت العضوية والنقاط والعروض على الموبايل." } },
    ],
    photo: "/images/site/delivery.webp",
    photoAlt: { en: "A delivery rider on a scooter with an orange delivery box", ar: "طيار توصيل على موتوسيكل وعليه صندوق توصيل برتقالي" },
    faqs: [
      {
        q: { en: "Do you publish the app on the stores?", ar: "إنتم اللي بتنزّلوا التطبيق على المتاجر؟" },
        a: { en: "Yes. We prepare the store page, screenshots and privacy details, and publish under your own accounts.", ar: "أيوه. بنجهّز صفحة المتجر والصور وبيانات الخصوصية، وننشره من حساباتك أنت." },
      },
      {
        q: { en: "Can the app work with the program I already use?", ar: "التطبيق ينفع يتربط بالبرنامج اللي عندي؟" },
        a: { en: "Usually yes — we connect them so orders, customers and stock stay the same in both.", ar: "غالبًا أيوه — بنربطهم ببعض عشان الطلبات والعملاء والمخزون يفضلوا واحد في الاتنين." },
      },
      {
        q: { en: "What happens after launch?", ar: "بعد الإطلاق إيه اللي بيحصل؟" },
        a: { en: "We watch for problems, update it when new phone systems come out, and keep improving it on a monthly plan.", ar: "بنراقب أي مشكلة، ونحدّثه لما تنزل أنظمة موبايل جديدة، ونفضل نطوّره بخطة شهرية." },
      },
    ],
  },
  "custom-software": {
    headline: { en: "One system for your whole business — shaped like your business.", ar: "نظام واحد لشغلك كله — متفصّل على مقاس شغلك." },
    forWho: {
      en: ["Distributors & wholesalers", "Factories & workshops", "Companies with branches", "Real estate & contracting"],
      ar: ["الموزعين وتجار الجملة", "المصانع والورش", "الشركات اللي ليها فروع", "العقارات والمقاولات"],
    },
    challenges: [
      {
        problem: { en: "The business runs on scattered Excel sheets and notebooks.", ar: "الشغل ماشي على ملفات إكسل متفرقة وكشاكيل." },
        solution: { en: "One system, one version of the truth, and a record of who changed what.", ar: "نظام واحد، ونسخة واحدة من الحقيقة، وسجل بمين عدّل إيه." },
      },
      {
        problem: { en: "Ready-made programs force you to change how you work.", ar: "البرامج الجاهزة بتجبرك تغيّر طريقة شغلك." },
        solution: { en: "Screens built around your real steps — your approvals, your prices, your reports.", ar: "شاشات معمولة على خطواتك الحقيقية — موافقاتك، وأسعارك، وتقاريرك." },
      },
      {
        problem: { en: "You only know how a branch is doing when you go there.", ar: "مش بتعرف الفرع ماشي إزاي غير لما تروح بنفسك." },
        solution: { en: "Live sales, stock and cash for every branch, on your phone.", ar: "المبيعات والمخزون والفلوس لكل فرع لحظة بلحظة، على موبايلك." },
      },
    ],
    deliverables: {
      en: ["A written plan of how your work flows", "Screens for every role in your team", "Your old data moved in from Excel", "Reports and numbers you can export", "Training for each employee", "The full source and documents — yours"],
      ar: ["خطة مكتوبة لطريقة سير شغلك", "شاشات لكل دور في فريقك", "بياناتك القديمة متنقلة من الإكسل", "تقارير وأرقام تقدر تطلّعها", "تدريب لكل موظف", "الكود والتوثيق كاملين — ملكك"],
    },
    yourPart: {
      en: ["Two or three sessions to walk us through your day", "Your Excel files or old program’s data", "One person on your side to answer quick questions"],
      ar: ["جلستين أو تلاتة تحكي لنا يومك ماشي إزاي", "ملفات الإكسل أو بيانات البرنامج القديم", "شخص واحد من عندك يرد على الأسئلة السريعة"],
    },
    weeks: [
      { when: { en: "Weeks 1–2", ar: "أسبوع 1–2" }, title: { en: "We learn your routine", ar: "نفهم يومك" }, text: { en: "We map how an order, a payment and a report move today — and where time is lost.", ar: "نرسم الطلب والدفع والتقرير بيمشوا إزاي النهارده — والوقت بيضيع فين." } },
      { when: { en: "Weeks 3–8", ar: "أسبوع 3–8" }, title: { en: "Built in parts", ar: "نبني على أجزاء" }, text: { en: "Every week you try a working part. The most painful part comes first.", ar: "كل أسبوع تجرّب جزء شغال. والجزء اللي تاعبك أكتر بييجي الأول." } },
      { when: { en: "Weeks 9–10", ar: "أسبوع 9–10" }, title: { en: "Your data moves in", ar: "بياناتك تتنقل" }, text: { en: "We move your items, customers and balances, and check them with you.", ar: "بننقل الأصناف والعملاء والأرصدة، ونراجعها معاك." } },
      { when: { en: "Go-live", ar: "التشغيل" }, title: { en: "Your team switches over", ar: "فريقك ينقل عليه" }, text: { en: "Training for each role, and we stay close for the first weeks.", ar: "تدريب لكل دور، ونفضل جنبك أول كام أسبوع." } },
    ],
    timeline: { en: "8–16 weeks for the first phase, delivered in parts", ar: "من 8 لـ 16 أسبوع للمرحلة الأولى، والتسليم على أجزاء" },
    useCases: [
      { title: { en: "Distribution", ar: "التوزيع" }, text: { en: "Sales reps, routes, collections and warehouses.", ar: "المندوبين وخطوط السير والتحصيل والمخازن." } },
      { title: { en: "Factories", ar: "المصانع" }, text: { en: "Raw materials, production orders and the real cost of each product.", ar: "الخامات وأوامر الإنتاج والتكلفة الحقيقية لكل منتج." } },
      { title: { en: "Sales follow-up", ar: "متابعة المبيعات" }, text: { en: "Leads, follow-up calls, quotations and contracts.", ar: "العملاء المحتملين والمتابعة وعروض الأسعار والعقود." } },
      { title: { en: "Real estate", ar: "العقارات" }, text: { en: "Units, instalments, projects and contractors.", ar: "الوحدات والأقساط والمشاريع والمقاولين." } },
    ],
    photo: "/images/site/warehouse.webp",
    photoAlt: { en: "A warehouse worker checking stock on a tablet", ar: "موظف مخزن بيراجع المخزون على تابلت" },
    faqs: [
      {
        q: { en: "Can it run on our own computer instead of the internet?", ar: "ينفع يشتغل على جهازنا بدل النت؟" },
        a: { en: "Yes — online, on your own server, or both, so branches keep working even if the internet drops.", ar: "أيوه — أونلاين، أو على السيرفر بتاعك، أو الاتنين، عشان الفروع تكمّل شغل حتى لو النت فصل." },
      },
      {
        q: { en: "What if we change our minds halfway?", ar: "لو غيّرنا رأينا في النص؟" },
        a: { en: "That’s normal. You see working parts every week, so changes are caught early. Bigger changes get a clear price before we start them.", ar: "ده طبيعي. أنت بتشوف أجزاء شغالة كل أسبوع، فالتعديلات بتبان بدري. والتعديلات الكبيرة بنقول سعرها بوضوح قبل ما نبدأ." },
      },
      {
        q: { en: "Is our data safe?", ar: "بياناتنا في أمان؟" },
        a: { en: "Yes. Every employee only sees what they need, every change is recorded, and backups happen automatically every day.", ar: "أيوه. كل موظف بيشوف اللي يخصه بس، وكل تعديل بيتسجل، والنسخة الاحتياطية بتتعمل لوحدها كل يوم." },
      },
    ],
  },
  "ai-chatbots": {
    headline: { en: "Someone who answers your customers at 3 a.m. — politely, in Egyptian.", ar: "حد بيرد على عملائك الساعة 3 الفجر — بأدب، وبالمصري." },
    forWho: {
      en: ["Shops getting many messages", "Clinics & salons", "Real estate offices", "Online stores"],
      ar: ["المحلات اللي بيجيلها رسائل كتير", "العيادات والصالونات", "مكاتب العقارات", "المتاجر الأونلاين"],
    },
    challenges: [
      {
        problem: { en: "Your team answers the same WhatsApp questions all day.", ar: "فريقك بيرد على نفس أسئلة الواتساب طول اليوم." },
        solution: { en: "The assistant answers prices, hours and availability instantly — your team handles only what matters.", ar: "المساعد بيرد على الأسعار والمواعيد والمتاح فورًا — وفريقك يمسك اللي يستاهل بس." },
      },
      {
        problem: { en: "Messages at night wait until morning, and customers go elsewhere.", ar: "رسائل الليل بتستنى للصبح، والعميل بيروح لغيرك." },
        solution: { en: "Every message gets a reply in seconds, any time, and bookings are taken on the spot.", ar: "كل رسالة بيتردّ عليها في ثواني، في أي وقت، والحجز بيتاخد على طول." },
      },
      {
        problem: { en: "Staff spend hours typing data from invoices and IDs.", ar: "الموظفين بيقضوا ساعات يكتبوا بيانات من الفواتير والبطايق." },
        solution: { en: "Send a photo — the details go into your system, and a person just checks them.", ar: "ابعت صورة — البيانات تدخل على نظامك، وحد بس يراجعها." },
      },
    ],
    deliverables: {
      en: ["An assistant on WhatsApp and your website", "Answers based only on what you approve", "Hand-over to a real person when needed", "Bookings and orders straight into your system", "One inbox for every conversation", "A monthly spending cap — no surprise bills"],
      ar: ["مساعد على واتساب وعلى موقعك", "ردود من المعلومات اللي أنت موافق عليها بس", "تحويل لشخص حقيقي وقت اللزوم", "الحجوزات والطلبات تدخل على نظامك على طول", "صندوق واحد لكل المحادثات", "حد أقصى للصرف كل شهر — من غير فواتير مفاجئة"],
    },
    yourPart: {
      en: ["Your price list and the questions people ask most", "A quick review of sample replies before launch", "Decide who on your team takes over chats"],
      ar: ["قايمة أسعارك والأسئلة اللي الناس بتسألها كتير", "مراجعة سريعة لردود تجريبية قبل التشغيل", "تحدد مين في فريقك يستلم المحادثات"],
    },
    weeks: [
      { when: { en: "Week 1", ar: "الأسبوع 1" }, title: { en: "We read your chats", ar: "نقرأ محادثاتك" }, text: { en: "We collect the questions people really ask and the answers you’re happy with.", ar: "نجمع الأسئلة اللي الناس بتسألها فعلًا، والإجابات اللي أنت راضي عنها." } },
      { when: { en: "Week 2", ar: "الأسبوع 2" }, title: { en: "You test it", ar: "تجرّبه بنفسك" }, text: { en: "You chat with it like a customer and tell us what to fix.", ar: "تكلّمه كأنك عميل، وتقول لنا نصلّح إيه." } },
      { when: { en: "Week 3", ar: "الأسبوع 3" }, title: { en: "Connected", ar: "يتربط" }, text: { en: "Linked to your WhatsApp number, your bookings and your team.", ar: "يتربط برقم الواتساب بتاعك، وبالحجوزات، وبفريقك." } },
      { when: { en: "Live", ar: "التشغيل" }, title: { en: "Answering customers", ar: "يرد على العملاء" }, text: { en: "We watch the first weeks closely and keep improving the answers.", ar: "بنتابع أول أسابيع عن قرب، ونفضل نحسّن الردود." } },
    ],
    timeline: { en: "2–6 weeks, depending on what it connects to", ar: "من أسبوعين لـ 6 أسابيع، حسب هيتربط بإيه" },
    useCases: [
      { title: { en: "Customer service", ar: "خدمة العملاء" }, text: { en: "Prices, order status and complaints.", ar: "الأسعار وحالة الطلب والشكاوى." } },
      { title: { en: "Bookings", ar: "الحجوزات" }, text: { en: "Books, moves and reminds — on WhatsApp.", ar: "يحجز ويغيّر الميعاد ويفكّر — على واتساب." } },
      { title: { en: "Paperwork", ar: "الورق" }, text: { en: "Invoices, receipts and IDs turned into data.", ar: "الفواتير والإيصالات والبطايق تتحول لبيانات." } },
      { title: { en: "Team questions", ar: "أسئلة الفريق" }, text: { en: "Answers staff questions from your own manuals.", ar: "يجاوب أسئلة الموظفين من ملفات الشركة." } },
    ],
    photo: "/images/site/shop-phone-v2.webp",
    photoAlt: { en: "A shop owner checking orders on his phone", ar: "صاحب محل بيتابع الطلبات من موبايله" },
    faqs: [
      {
        q: { en: "Does it understand Egyptian Arabic?", ar: "بيفهم المصري؟" },
        a: { en: "Yes. Egyptian, Gulf, formal Arabic and English — and it replies in the customer’s own style.", ar: "أيوه. المصري والخليجي والفصحى والإنجليزي — وبيرد بنفس أسلوب العميل." },
      },
      {
        q: { en: "What if it doesn’t know the answer?", ar: "لو مش عارف الإجابة؟" },
        a: { en: "It never guesses. It only uses information you approved, and passes the chat to your team when unsure.", ar: "عمره ما بيخمّن. بيستخدم المعلومات اللي أنت موافق عليها بس، ولو مش متأكد بيحوّل المحادثة لفريقك." },
      },
      {
        q: { en: "How much does it cost to run?", ar: "تشغيله بيكلّف كام؟" },
        a: { en: "It depends on how many messages you get. We estimate it upfront and set a monthly cap, so you always know the maximum.", ar: "على حسب عدد الرسائل. بنقدّرها من الأول ونحط حد أقصى شهري، فتبقى عارف أقصى رقم." },
      },
    ],
  },
  "business-automation": {
    headline: { en: "The boring, repeated work — done by itself.", ar: "الشغل الممل المتكرر — يخلص لوحده." },
    forWho: {
      en: ["Shops with many orders", "Offices drowning in Excel", "Companies with couriers", "Anyone writing daily reports"],
      ar: ["المحلات اللي عندها طلبات كتير", "المكاتب الغرقانة في الإكسل", "الشركات اللي بتشحن", "أي حد بيكتب تقارير كل يوم"],
    },
    challenges: [
      {
        problem: { en: "Every order is copied by hand from WhatsApp to Excel to the accounts.", ar: "كل طلب بيتنقل بالإيد من الواتساب للإكسل للحسابات." },
        solution: { en: "The order moves by itself: into stock, onto an invoice, and out for delivery.", ar: "الطلب بيمشي لوحده: يتخصم من المخزن، تطلع فاتورته، ويخرج للتوصيل." },
      },
      {
        problem: { en: "Someone loses a day every week preparing reports.", ar: "حد بيضيّع يوم كل أسبوع يجهّز تقارير." },
        solution: { en: "A ready summary on your WhatsApp or email every morning.", ar: "ملخص جاهز على واتساب أو الإيميل كل صباح." },
      },
      {
        problem: { en: "Customers keep calling to ask where their order is.", ar: "العملاء فضلوا يتصلوا يسألوا الطلب فين." },
        solution: { en: "They get a WhatsApp update at every step, automatically.", ar: "بيوصلهم تحديث على واتساب في كل خطوة، لوحده." },
      },
    ],
    deliverables: {
      en: ["A map of your routine work and what to automate first", "Your programs connected to each other", "Automatic WhatsApp and email messages", "Reports delivered on schedule", "Alerts if something stops", "Simple notes on how it all works"],
      ar: ["خريطة لشغلك المتكرر وإيه اللي يتعمل أوتوماتيك الأول", "برامجك متوصلة ببعض", "رسائل واتساب وإيميل تلقائية", "تقارير توصل في ميعادها", "تنبيه لو حاجة وقفت", "شرح بسيط لطريقة شغل كل حاجة"],
    },
    yourPart: {
      en: ["Show us one order, start to finish", "Access to the programs you already use", "Tell us which report you’d love every morning"],
      ar: ["توريّنا طلب واحد من أوله لآخره", "صلاحية دخول على البرامج اللي بتستخدمها", "تقول لنا نفسك في أنهي تقرير كل صباح"],
    },
    weeks: [
      { when: { en: "Days 1–3", ar: "يوم 1–3" }, title: { en: "We follow an order", ar: "نمشي ورا طلب" }, text: { en: "We follow real orders and count the minutes lost at each step.", ar: "نمشي ورا طلبات حقيقية ونعدّ الدقايق اللي بتضيع في كل خطوة." } },
      { when: { en: "Week 1", ar: "الأسبوع 1" }, title: { en: "The quickest win first", ar: "المكسب الأسرع الأول" }, text: { en: "We automate the step that saves the most time for the least cost.", ar: "نبدأ بالخطوة اللي توفّر أكتر وقت بأقل تكلفة." } },
      { when: { en: "Weeks 2–3", ar: "أسبوع 2–3" }, title: { en: "Connected end to end", ar: "متوصل من أوله لآخره" }, text: { en: "Order, invoice, stock, delivery and customer updates — linked.", ar: "الطلب والفاتورة والمخزن والتوصيل وتحديث العميل — متوصلين." } },
      { when: { en: "After", ar: "بعد كده" }, title: { en: "It runs, we watch", ar: "يشتغل، وإحنا نراقب" }, text: { en: "If anything stops, you and we get an alert straight away.", ar: "لو أي حاجة وقفت، بيجيلك ويجيلنا تنبيه على طول." } },
    ],
    timeline: { en: "1–4 weeks for each flow", ar: "من أسبوع لـ 4 أسابيع لكل مسار" },
    useCases: [
      { title: { en: "Order to cash", ar: "من الطلب للتحصيل" }, text: { en: "Order → invoice → payment → delivery, by itself.", ar: "طلب ← فاتورة ← دفع ← توصيل، لوحده." } },
      { title: { en: "New enquiries", ar: "الاستفسارات الجديدة" }, text: { en: "Messages from ads go to the right salesperson, with reminders.", ar: "رسائل الإعلانات توصل للبياع الصح، مع تذكير." } },
      { title: { en: "E-invoices", ar: "الفاتورة الإلكترونية" }, text: { en: "Sent to the Tax Authority without typing them twice.", ar: "تتبعت لمصلحة الضرائب من غير ما تتكتب مرتين." } },
      { title: { en: "Morning report", ar: "تقرير الصبح" }, text: { en: "Sales, cash and stock summed up before you arrive.", ar: "المبيعات والفلوس والمخزون متلخصين قبل ما توصل." } },
    ],
    photo: "/images/site/receipts-v2.webp",
    photoAlt: { en: "An accountant going over invoices and cash with a phone calculator", ar: "محاسب بيراجع فواتير وفلوس بالآلة الحاسبة على الموبايل" },
    faqs: [
      {
        q: { en: "Do I have to replace my current programs?", ar: "لازم أغيّر البرامج اللي عندي؟" },
        a: { en: "No. We connect what you already use, and only suggest a change if something truly blocks the work.", ar: "لا. بنوصّل اللي أنت بتستخدمه، ومش بنقترح تغيير غير لو حاجة فعلًا معطّلة الشغل." },
      },
      {
        q: { en: "What if something breaks?", ar: "لو حاجة باظت؟" },
        a: { en: "Each flow retries by itself and sends an alert if it can’t continue, so nothing is lost silently.", ar: "كل مسار بيحاول تاني لوحده، ولو مقدرش بيبعت تنبيه، فمفيش حاجة بتضيع من غير ما تعرف." },
      },
      {
        q: { en: "How do I know it’s worth it?", ar: "أعرف منين إنها تستاهل؟" },
        a: { en: "Before building, we estimate the hours each flow saves per month, and start with the one that pays back fastest.", ar: "قبل ما نبني، بنحسب كل مسار هيوفّر كام ساعة في الشهر، ونبدأ باللي بيرجّع تمنه أسرع." },
      },
    ],
  },
  "ecommerce-development": {
    headline: { en: "Sell online and in your shop — from the same shelf.", ar: "بيع أونلاين وفي المحل — من نفس الرف." },
    forWho: {
      en: ["Clothing & shoe shops", "Mobile & electronics", "Groceries & pharmacies", "Wholesale traders"],
      ar: ["محلات الهدوم والجزم", "الموبايلات والإلكترونيات", "السوبر ماركت والصيدليات", "تجار الجملة"],
    },
    challenges: [
      {
        problem: { en: "The website says “in stock” but the shop sold the last one.", ar: "الموقع بيقول «متاح» والمحل باع آخر قطعة." },
        solution: { en: "One stock for the website, the cashier and every branch — updated with every sale.", ar: "مخزون واحد للموقع والكاشير وكل الفروع — بيتحدث مع كل بيعة." },
      },
      {
        problem: { en: "People fill their cart and leave before paying.", ar: "الناس بتملا السلة وتمشي قبل ما تدفع." },
        solution: { en: "A short checkout with the ways Egyptians actually pay, including cash on delivery.", ar: "دفع قصير بالطرق اللي المصريين بيدفعوا بيها فعلًا، ومنها الكاش عند الاستلام." },
      },
      {
        problem: { en: "Shipping is arranged with phone calls and paper.", ar: "الشحن ماشي بالمكالمات والورق." },
        solution: { en: "Shipping is booked, tracked and settled automatically with the courier.", ar: "الشحن بيتحجز ويتتبع ويتحاسب لوحده مع شركة الشحن." },
      },
    ],
    deliverables: {
      en: ["Your store design and product pages", "Card, wallets, instalments and cash on delivery", "Courier booking and tracking", "A shop cashier that works offline", "One screen for orders, stock and customers", "Discount codes and ad tracking"],
      ar: ["تصميم المتجر وصفحات المنتجات", "فيزا ومحافظ وتقسيط وكاش عند الاستلام", "حجز الشحن وتتبعه", "كاشير للمحل يشتغل من غير نت", "شاشة واحدة للطلبات والمخزون والعملاء", "أكواد خصم وتتبع الإعلانات"],
    },
    yourPart: {
      en: ["Your product list (Excel is fine)", "Photos — or we arrange a simple photo session", "Your payment and courier accounts (we help you open them)"],
      ar: ["قايمة منتجاتك (إكسل كفاية)", "الصور — أو نرتّب لك جلسة تصوير بسيطة", "حسابات الدفع والشحن (ونساعدك تفتحها)"],
    },
    weeks: [
      { when: { en: "Week 1", ar: "الأسبوع 1" }, title: { en: "Products & look", ar: "المنتجات والشكل" }, text: { en: "We set up your products and agree on how the store should feel.", ar: "نرتّب منتجاتك ونتفق المتجر يبان إزاي." } },
      { when: { en: "Weeks 2–3", ar: "أسبوع 2–3" }, title: { en: "Store & payments", ar: "المتجر والدفع" }, text: { en: "The store, the checkout and the payment methods, ready to test.", ar: "المتجر والدفع ووسائل الدفع، جاهزين للتجربة." } },
      { when: { en: "Weeks 4–5", ar: "أسبوع 4–5" }, title: { en: "Shop & shipping", ar: "المحل والشحن" }, text: { en: "The shop cashier and the courier connected to the same stock.", ar: "كاشير المحل وشركة الشحن متوصلين بنفس المخزون." } },
      { when: { en: "Opening", ar: "الافتتاح" }, title: { en: "First orders", ar: "أول الطلبات" }, text: { en: "We launch together and watch the first orders with you.", ar: "نفتتح سوا ونتابع أول الطلبات معاك." } },
    ],
    timeline: { en: "4–8 weeks for the store and the shop cashier", ar: "من 4 لـ 8 أسابيع للمتجر وكاشير المحل" },
    useCases: [
      { title: { en: "Fashion", ar: "الأزياء" }, text: { en: "Sizes, colours and stock per branch.", ar: "المقاسات والألوان ومخزون كل فرع." } },
      { title: { en: "Electronics", ar: "الإلكترونيات" }, text: { en: "Serial numbers, warranty and instalments.", ar: "السيريال والضمان والتقسيط." } },
      { title: { en: "Groceries", ar: "البقالة" }, text: { en: "Quick re-ordering and scheduled delivery.", ar: "إعادة طلب سريعة وتوصيل في ميعاد." } },
      { title: { en: "Wholesale", ar: "الجملة" }, text: { en: "A price list and credit limit for each customer.", ar: "قايمة أسعار وحد آجل لكل عميل." } },
    ],
    photo: "/images/site/cafe-cashier-v2.webp",
    photoAlt: { en: "A shop owner behind the counter next to the till", ar: "صاحب محل واقف ورا الكاونتر جنب الكاشير" },
    faqs: [
      {
        q: { en: "Which payment methods can I offer?", ar: "أقدر أوفّر طرق دفع إيه؟" },
        a: { en: "Cards, mobile wallets, instalment companies, Fawry and cash on delivery.", ar: "الفيزا، والمحافظ، وشركات التقسيط، وفوري، والكاش عند الاستلام." },
      },
      {
        q: { en: "A custom store or Shopify?", ar: "متجر مخصوص ولا Shopify؟" },
        a: { en: "Shopify is quicker for a simple catalogue. A custom store is better when you need your shop cashier, wholesale prices or special rules. We’ll tell you honestly which fits.", ar: "Shopify أسرع لو المنتجات بسيطة. المتجر المخصوص أحسن لو محتاج كاشير المحل أو أسعار جملة أو قواعد خاصة. وهنقولك بصراحة الأنسب إيه." },
      },
      {
        q: { en: "Does the shop cashier work without internet?", ar: "كاشير المحل بيشتغل من غير نت؟" },
        a: { en: "Yes. It keeps selling, and everything syncs once the connection is back.", ar: "أيوه. بيكمّل بيع، وكل حاجة بتتزامن أول ما النت يرجع." },
      },
    ],
  },
};
