// Company-level content shared by the about, services, portfolio and contact
// pages: who we work with, the promises we keep, how a project team is formed,
// and what happens after someone gets in touch. Plain language throughout.

import type { Locale } from "@/lib/site";
import { readySystems } from "@/lib/systems";

type T = Record<Locale, string>;

/** Kinds of businesses we build for. `photo` (optional) is used by hover reveals. */
export const industries: { icon: string; name: T; text: T; photo?: string }[] = [
  { icon: "Store", name: { en: "Shops & wholesale", ar: "المحلات والجملة" }, text: { en: "Cashier, stock, branches and online selling.", ar: "الكاشير والمخزن والفروع والبيع أونلاين." }, photo: "/images/site/grocery.webp" },
  { icon: "HeartPulse", name: { en: "Clinics & pharmacies", ar: "العيادات والصيدليات" }, text: { en: "Bookings, patient files, medicines and reminders.", ar: "الحجوزات وملفات المرضى والأدوية والتذكير." }, photo: "/images/site/clinic-v2.webp" },
  { icon: "UtensilsCrossed", name: { en: "Restaurants & cafés", ar: "المطاعم والكافيهات" }, text: { en: "Orders, kitchen, delivery and the real cost of each dish.", ar: "الطلبات والمطبخ والتوصيل وتكلفة كل طبق." }, photo: "/images/site/restaurant.webp" },
  { icon: "GraduationCap", name: { en: "Schools & centres", ar: "المدارس والسناتر" }, text: { en: "Students, fees, timetables and parents.", ar: "الطلاب والمصاريف والجداول وأولياء الأمور." }, photo: "/images/site/classroom-v2.webp" },
  { icon: "Truck", name: { en: "Distribution & warehouses", ar: "التوزيع والمخازن" }, text: { en: "Reps, routes, warehouses and collections.", ar: "المندوبين وخطوط السير والمخازن والتحصيل." }, photo: "/images/site/warehouse.webp" },
  { icon: "Dumbbell", name: { en: "Gyms & studios", ar: "الجيمات والاستوديوهات" }, text: { en: "Memberships, check-in, classes and renewals.", ar: "الاشتراكات والدخول والكلاسات والتجديد." }, photo: "/images/site/gym-v2.webp" },
  { icon: "Building2", name: { en: "Real estate & contracting", ar: "العقارات والمقاولات" }, text: { en: "Units, instalments, projects and sites.", ar: "الوحدات والأقساط والمشاريع والمواقع." } },
  { icon: "Briefcase", name: { en: "Offices & services", ar: "المكاتب والخدمات" }, text: { en: "Law firms, agencies and consultancies.", ar: "مكاتب المحاماة والوكالات والاستشارات." } },
];

/** Promises we make on every project. */
export const commitments: { title: T; text: T }[] = [
  { title: { en: "A clear price in 48 hours", ar: "سعر واضح خلال 48 ساعة" }, text: { en: "What we’ll do, how long and how much — in writing, after a free chat.", ar: "هنعمل إيه، وفي قد إيه، وبكام — مكتوب، بعد مكالمة مجانية." } },
  { title: { en: "Something to try every week", ar: "حاجة تجرّبها كل أسبوع" }, text: { en: "You see real, working screens — not status reports.", ar: "بتشوف شاشات حقيقية شغالة — مش تقارير وكلام." } },
  { title: { en: "It’s yours", ar: "ملكك أنت" }, text: { en: "Anything built for you comes with the full source and every account in your name.", ar: "أي حاجة معمولة مخصوص ليك بتتسلّم بالكود كامل وكل الحسابات باسمك." } },
  { title: { en: "We stay after launch", ar: "مش بنختفي بعد التسليم" }, text: { en: "A support period is included, then optional monthly care.", ar: "فترة دعم مشمولة، وبعدها صيانة شهرية لو حبيت." } },
  { title: { en: "Your secrets stay secret", ar: "أسرارك في أمان" }, text: { en: "We sign a confidentiality agreement on request and never show your work without permission.", ar: "بنمضي اتفاقية سرية لو طلبت، وعمرنا ما بنعرض شغلك من غير إذنك." } },
  { title: { en: "Arabic done right", ar: "عربي مظبوط" }, text: { en: "Screens built right-to-left from day one, with proper Arabic words.", ar: "شاشات معمولة من اليمين للشمال من أول يوم، بكلام عربي سليم." } },
];

/** The steps every project goes through (not a claim about headcount). */
export const teamRoles: { role: T; text: T }[] = [
  { role: { en: "Listen", ar: "نسمع" }, text: { en: "Learn how your business runs, write the plan and keep it on track.", ar: "نفهم شغلك ماشي إزاي، ونكتب الخطة، ونتابعها." } },
  { role: { en: "Design", ar: "نصمّم" }, text: { en: "Turn your steps into screens people understand on day one.", ar: "نحوّل خطواتك لشاشات الناس تفهمها من أول يوم." } },
  { role: { en: "Build", ar: "نبني" }, text: { en: "Build the website, app or system — carefully and checked twice.", ar: "نبني الموقع أو التطبيق أو النظام — بعناية ومراجعة مرتين." } },
  { role: { en: "Test", ar: "نجرّب" }, text: { en: "Try every update on real phones and real scenarios before you do.", ar: "نجرّب كل تحديث على موبايلات وسيناريوهات حقيقية قبلك." } },
  { role: { en: "Support", ar: "ندعم" }, text: { en: "Keep it running, backed up, and answer you when you need help.", ar: "نخلّيه شغال ومتأمّن، ونرد عليك لما تحتاج مساعدة." } },
];

/** Honest facts (no inflated project counts). */
export const companyFacts: { value: string | T; label: T }[] = [
  { value: "2023", label: { en: "Founded in Cairo", ar: "سنة التأسيس في القاهرة" } },
  { value: "6", label: { en: "Kinds of service", ar: "أنواع خدمات" } },
  { value: String(readySystems.length), label: { en: "Ready-made systems", ar: "أنظمة جاهزة" } },
  { value: { en: "AR · EN", ar: "عربي · إنجليزي" }, label: { en: "Everything in both languages", ar: "كل حاجة باللغتين" } },
];

export const contactSteps: { title: T; text: T }[] = [
  { title: { en: "We reply within one working day", ar: "بنرد خلال يوم عمل" }, text: { en: "A real person reads your message and replies with a question or a time to talk.", ar: "شخص حقيقي بيقرا رسالتك ويرد بسؤال أو بميعاد نتكلم فيه." } },
  { title: { en: "A free 30-minute call", ar: "مكالمة مجانية 30 دقيقة" }, text: { en: "We understand your business and your goal — no sales pressure.", ar: "نفهم شغلك وهدفك — من غير ضغط ولا بيع." } },
  { title: { en: "A written offer in 48 hours", ar: "عرض مكتوب خلال 48 ساعة" }, text: { en: "What, when and how much — clear enough to compare and decide.", ar: "إيه، وإمتى، وبكام — واضح كفاية إنك تقارن وتقرر." } },
];

export const workingHours: T = {
  en: "Sunday – Thursday, 10:00 – 18:00 (Cairo time). We answer WhatsApp at weekends too.",
  ar: "من الأحد للخميس، من 10 الصبح لـ 6 المسا (بتوقيت القاهرة). وبنرد على الواتساب في الويك إند كمان.",
};
