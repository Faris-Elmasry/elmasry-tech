// Company-level content shared by the about, services, portfolio and contact
// pages: industries, commitments, how a project team is formed, and what
// happens after someone gets in touch.

import type { Locale } from "@/lib/site";

type T = Record<Locale, string>;

export const industries: { icon: string; name: T; text: T }[] = [
  { icon: "Store", name: { en: "Retail & wholesale", ar: "التجزئة والجملة" }, text: { en: "POS, stock, branches and online stores.", ar: "نقاط البيع والمخزون والفروع والمتاجر الإلكترونية." } },
  { icon: "HeartPulse", name: { en: "Healthcare", ar: "الرعاية الصحية" }, text: { en: "Clinics, pharmacies, labs and medical centres.", ar: "العيادات والصيدليات والمعامل والمراكز الطبية." } },
  { icon: "UtensilsCrossed", name: { en: "Food & beverage", ar: "المطاعم والمقاهي" }, text: { en: "Ordering, kitchens, delivery and cost control.", ar: "الطلبات والمطابخ والتوصيل وضبط التكاليف." } },
  { icon: "GraduationCap", name: { en: "Education", ar: "التعليم" }, text: { en: "Schools, academies and training centres.", ar: "المدارس والأكاديميات ومراكز التدريب." } },
  { icon: "Building2", name: { en: "Real estate & contracting", ar: "العقارات والمقاولات" }, text: { en: "Units, instalments, projects and sites.", ar: "الوحدات والأقساط والمشروعات والمواقع." } },
  { icon: "Truck", name: { en: "Logistics & distribution", ar: "التوزيع والخدمات اللوجستية" }, text: { en: "Routes, reps, warehouses and collections.", ar: "خطوط السير والمندوبون والمستودعات والتحصيل." } },
  { icon: "Dumbbell", name: { en: "Fitness & wellness", ar: "اللياقة والعناية" }, text: { en: "Gyms, studios, spas and salons.", ar: "الصالات والاستوديوهات والسبا والصالونات." } },
  { icon: "Briefcase", name: { en: "Professional services", ar: "الخدمات المهنية" }, text: { en: "Law firms, agencies and consultancies.", ar: "مكاتب المحاماة والوكالات وشركات الاستشارات." } },
];

/** Promises we make on every project. */
export const commitments: { title: T; text: T }[] = [
  { title: { en: "Fixed proposal in 48 hours", ar: "عرض محدد خلال 48 ساعة" }, text: { en: "Scope, timeline and price in writing after a free discovery session.", ar: "نطاق العمل والمدة والتكلفة مكتوبة بعد جلسة استكشاف مجانية." } },
  { title: { en: "A demo every week", ar: "عرض أسبوعي لما تم إنجازه" }, text: { en: "You see working software, not status reports.", ar: "ترى برنامجًا يعمل فعليًا، لا مجرد تقارير." } },
  { title: { en: "You own the code", ar: "الكود ملكك" }, text: { en: "Custom work ships with source code, documentation and all accounts in your name.", ar: "المشاريع المخصصة تُسلَّم بالكود المصدري والتوثيق وكل الحسابات باسمك." } },
  { title: { en: "Support after launch", ar: "دعم بعد الإطلاق" }, text: { en: "A dedicated support period is included, then optional monthly maintenance.", ar: "فترة دعم مخصصة مشمولة، ثم صيانة شهرية اختيارية." } },
  { title: { en: "Confidentiality", ar: "السرية" }, text: { en: "We sign an NDA on request and never publish client work without permission.", ar: "نوقّع اتفاقية عدم إفصاح عند الطلب، ولا ننشر أي عمل دون إذن العميل." } },
  { title: { en: "Arabic done properly", ar: "عربية احترافية" }, text: { en: "Real RTL layouts, native Arabic copy and local integrations — not an afterthought.", ar: "واجهات RTL حقيقية، ومحتوى عربي سليم، وتكاملات محلية — منذ البداية لا كإضافة لاحقة." } },
];

/** How a project team is formed (roles, not headcount). */
export const teamRoles: { role: T; text: T }[] = [
  { role: { en: "Product & discovery", ar: "تحليل المنتج والمتطلبات" }, text: { en: "Understands your operation, writes the scope and owns the plan.", ar: "يفهم طبيعة عملك، ويكتب نطاق العمل، ويتابع الخطة." } },
  { role: { en: "UX / UI design", ar: "تصميم تجربة وواجهات المستخدم" }, text: { en: "Turns workflows into screens people understand on the first day.", ar: "يحوّل الإجراءات إلى شاشات يفهمها المستخدم من اليوم الأول." } },
  { role: { en: "Software engineering", ar: "هندسة البرمجيات" }, text: { en: "Builds the web, mobile and backend — typed, tested and reviewed.", ar: "يطوّر الويب والجوال والخوادم — بكود منظم ومُختبر ومُراجع." } },
  { role: { en: "Quality assurance", ar: "ضمان الجودة" }, text: { en: "Tests every release on real devices and real scenarios before you do.", ar: "يختبر كل إصدار على أجهزة وسيناريوهات حقيقية قبل أن يصلك." } },
  { role: { en: "DevOps & support", ar: "التشغيل والدعم الفني" }, text: { en: "Hosting, backups, monitoring and a fast answer when you need help.", ar: "الاستضافة والنسخ الاحتياطي والمراقبة، ورد سريع عندما تحتاج المساعدة." } },
];

/** Honest facts (no inflated project counts). */
export const companyFacts: { value: string; label: T }[] = [
  { value: "2023", label: { en: "Founded in Cairo", ar: "سنة التأسيس في القاهرة" } },
  { value: "6", label: { en: "Service lines", ar: "مجالات خدمة" } },
  { value: "8", label: { en: "Ready-made systems", ar: "أنظمة جاهزة" } },
  { value: "AR · EN", label: { en: "Every product, both languages", ar: "كل منتج باللغتين" } },
];

export const contactSteps: { title: T; text: T }[] = [
  { title: { en: "We reply within one working day", ar: "نرد خلال يوم عمل واحد" }, text: { en: "An engineer reads your message and replies with questions or a time for a call.", ar: "يقرأ أحد مهندسينا رسالتك ويرد بالأسئلة اللازمة أو بموعد للمكالمة." } },
  { title: { en: "Free 30-minute discovery call", ar: "مكالمة استكشاف مجانية 30 دقيقة" }, text: { en: "We understand your goals, users and constraints — no sales pitch.", ar: "نفهم أهدافك ومستخدميك ومتطلباتك — دون عروض بيع." } },
  { title: { en: "Proposal within 48 hours", ar: "عرض خلال 48 ساعة" }, text: { en: "A clear scope, timeline and fixed price you can compare and decide on.", ar: "نطاق عمل ومدة وتكلفة ثابتة واضحة تقارن بها وتقرر." } },
];

export const workingHours: T = {
  en: "Sunday – Thursday, 10:00 – 18:00 (Cairo time). WhatsApp messages are answered on weekends too.",
  ar: "من الأحد إلى الخميس، من 10 صباحًا حتى 6 مساءً (بتوقيت القاهرة). ونرد على رسائل واتساب في عطلة نهاية الأسبوع أيضًا.",
};
