// Hero copy used by the archived lion hero (src/components/archive/lion).
// The live homepage hero lives in src/components/demos/devices.

import type { Locale } from "@/lib/site";

type T = Record<Locale, string>;

/** Hero copy for the archived lion hero. */
export const heroCopy = {
  steps: { en: ["Ideas", "Digital products", "Real impact"], ar: ["فكرة", "منتج رقمي", "أثر حقيقي"] } as Record<Locale, string[]>,
  // Two lines on desktop: "Powerful Software" / "for a Bigger Tomorrow" (orange part = titleB).
  titleA: { en: "Powerful Software", ar: "برمجيات قوية" } as T,
  titleLead: { en: "for a", ar: "" } as T,
  titleB: { en: "Bigger Tomorrow", ar: "لغدٍ أكبر" } as T,
  sub: {
    en: "We build custom websites, mobile apps and AI solutions that help your business grow, automate, and stay ahead.",
    ar: "نطوّر مواقع وتطبيقات موبايل وحلول ذكاء اصطناعي مخصصة، تساعد شركتك تكبر، وتوفّر وقتها، وتفضل دايمًا متقدمة على منافسيها.",
  } as T,
  cta: { en: "Start Your Project", ar: "ابدأ مشروعك" } as T,
  secondary: { en: "Explore our work", ar: "شوف شغلنا" } as T,
  features: {
    en: ["Custom Development", "Web & Mobile Apps", "AI & Automation Solutions", "Scalable & Secure"],
    ar: ["برمجة حسب الطلب", "مواقع وتطبيقات موبايل", "ذكاء اصطناعي وأتمتة", "آمن وقابل للتوسع"],
  } as Record<Locale, string[]>,
  hint: { en: "Move over the lion", ar: "حرّك الماوس على الأسد" } as T,
  hint3d: { en: "Hover a card", ar: "مرّر على أي بطاقة" } as T,
  visual: {
    en: "3D Elmasry Tech logo: chrome brackets around a glowing core, with cards for websites, mobile apps, AI and business systems orbiting it",
    ar: "شعار Elmasry Tech ثلاثي الأبعاد: أقواس معدنية حول نواة متوهجة، تدور حولها بطاقات المواقع وتطبيقات الموبايل والذكاء الاصطناعي وأنظمة الأعمال",
  } as T,
};
