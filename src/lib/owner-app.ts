// The owner app («تطبيق صاحب العمل»): copy and links shared by the home section and /owner-app.
// Only what the app really does today. Pharmacy is marked "coming", never "available".

import type { Locale } from "@/lib/site";

type T = Record<Locale, string>;

export const ownerApp = {
  appUrl: "https://owner.72-61-178-220.sslip.io",
  /** Sample businesses: each page shows a QR code that the app scans to link a demo business. */
  samples: [
    { slug: "cafe", url: "https://owner-mock.72-61-178-220.sslip.io/mock/pair/cafe", label: { en: "Café chain (3 branches)", ar: "كافيه (3 فروع)" } as T },
    { slug: "kiosk", url: "https://owner-mock.72-61-178-220.sslip.io/mock/pair/kiosk", label: { en: "Kiosk (totals only)", ar: "كشك (إجماليات بس)" } as T },
    { slug: "gym", url: "https://owner-mock.72-61-178-220.sslip.io/mock/pair/gym", label: { en: "Gym", ar: "جيم" } as T },
  ],
  /** System slugs (in src/lib/systems.ts) that already feed the app. */
  works: ["cafe-playstation", "gym-management", "clinic-management", "medical-lab", "salon-barber", "school-management", "pos-cashier"],
  /** Announced, not available yet. */
  soon: ["pharmacy-system"],
  features: [
    { icon: "LayoutDashboard", title: { en: "One app, all your businesses", ar: "تطبيق واحد لكل نشاطاتك" }, text: { en: "Switch between your cafés, gym or shops from one list, instead of one app and one login for each.", ar: "بتبدّل بين الكافيه والجيم والمحلات من قايمة واحدة، بدل تطبيق ولوجين لكل نشاط." } },
    { icon: "Zap", title: { en: "Live numbers", ar: "أرقام لحظة بلحظة" }, text: { en: "Net sales with an hour-by-hour chart, cash-drawer difference, discounts, wasted and complimentary items, invoice count and the average invoice.", ar: "صافي المبيعات برسم بالساعة، وفرق الدرج، والخصومات، والأصناف التالفة والضيافة، وعدد الفواتير ومتوسط الفاتورة." } },
    { icon: "SlidersHorizontal", title: { en: "Filters", ar: "فلاتر" }, text: { en: "By period (today, this week, this month, a custom range), branch, employee, payment method and category.", ar: "بالفترة (النهارده، الأسبوع، الشهر، أو فترة تحددها) والفرع والموظف وطريقة الدفع والقسم." } },
    { icon: "Bell", title: { en: "Alerts", ar: "تنبيهات" }, text: { en: "An inbox of what looks wrong, with alert rules you set yourself.", ar: "صندوق بالحاجات اللي شكلها غلط، وقواعد التنبيه بتظبطها انت." } },
    { icon: "KeyRound", title: { en: "Approvals", ar: "موافقات" }, text: { en: "Discount requests and payments that need a second pair of eyes wait for you to approve or reject — from your phone.", ar: "طلبات الخصم والمدفوعات اللي محتاجة موافقتك مستنياك توافق أو ترفض — من موبايلك." } },
    { icon: "Lock", title: { en: "Totals only, if you want", ar: "«إجماليات بس» لو تحب" }, text: { en: "Choose “totals only” for a business and the cloud gets the totals — invoices and names are not sent; details stay on the shop's device.", ar: "اختار «إجماليات بس» لنشاط، وهيوصل للسحابة الإجماليات بس — الفواتير والأسماء مش بتتبعت، والتفاصيل بتفضل على جهاز المحل." } },
  ] as { icon: string; title: T; text: T }[],
  steps: [
    { en: "Open one of the sample businesses on a computer — it shows a QR code.", ar: "افتح واحد من الأنشطة التجريبية على كمبيوتر — هيظهر لك QR." },
    { en: "Open the app on your phone.", ar: "افتح التطبيق على موبايلك." },
    { en: "Scan the QR from the sample business page — its numbers appear in the app.", ar: "امسح الـ QR من صفحة النشاط التجريبي — هتظهر أرقامه في التطبيق." },
  ] as T[],
  faqs: [
    { q: { en: "Does it replace my current system?", ar: "هل بيحل محل نظامي الحالي؟" }, a: { en: "No. The app only shows what our systems already record, and lets you approve what needs your approval. The shop keeps working on its own system.", ar: "لأ. التطبيق بيعرض اللي أنظمتنا مسجّلاه فعلًا، وبيخليك توافق على اللي محتاج موافقتك. المحل بيكمّل شغل على نظامه." } },
    { q: { en: "Do I download it from a store?", ar: "أنزّله من المتجر؟" }, a: { en: "No. It opens in your phone's browser and you can install it on the home screen from there.", ar: "لأ. بيفتح من متصفح الموبايل، وتقدر تثبّته على الشاشة الرئيسية من هناك." } },
    { q: { en: "Is my pharmacy supported?", ar: "والصيدلية؟" }, a: { en: "The pharmacy system is coming to the app. Today it works with the café, gym, clinic, lab, salon, tutoring-centre and cashier systems.", ar: "نظام الصيدلية جاي للتطبيق قريب. النهارده بيشتغل مع أنظمة الكافيه والجيم والعيادة والمعمل والصالون وسنتر الدروس والكاشير." } },
    { q: { en: "Who sees my numbers?", ar: "مين بيشوف أرقامي؟" }, a: { en: "You choose per business how much goes to the cloud: full details, or totals only. Ask us and we'll walk you through the options.", ar: "انت بتختار لكل نشاط قد إيه يروح للسحابة: التفاصيل كاملة أو إجماليات بس. اسألنا ونشرح لك الاختيارات." } },
  ] as { q: T; a: T }[],
  screens: [
    { src: "/images/owner-app/home.webp", alt: { en: "The app's home screen for a café business: net sales, an hourly chart and an approvals banner (sample data)", ar: "الشاشة الرئيسية في التطبيق لنشاط كافيه: صافي المبيعات ورسم بالساعة وتنبيه موافقات (بيانات تجريبية)" } as T },
    { src: "/images/owner-app/approvals.webp", alt: { en: "The approvals screen: two requests with approve and reject buttons (sample data)", ar: "شاشة الموافقات: طلبين وقدامهم زرار موافقة ورفض (بيانات تجريبية)" } as T },
    { src: "/images/owner-app/privacy.webp", alt: { en: "A business set to totals only: the details stay on the shop's device (sample data)", ar: "نشاط مظبوط على «إجماليات بس»: التفاصيل على جهاز المحل (بيانات تجريبية)" } as T },
  ],
};
