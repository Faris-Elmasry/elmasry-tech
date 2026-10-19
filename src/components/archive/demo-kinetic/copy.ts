export type DemoLocale = "en" | "ar";

export const asLocale = (l: string): DemoLocale => (l === "ar" ? "ar" : "en");

type Scene = { word: string; image: string; caption: string; tone: string; focus: [number, number] };

type Copy = {
  hero: {
    eyebrow: string;
    aside: string;
    /** Desktop / tablet line breaks. Even lines sit at the start edge, odd at the end. */
    lines: string[];
    /** Phone line breaks (bigger type, more lines). */
    linesMobile: string[];
    sub: string;
    cta: string;
    scroll: string;
    revealLabel: string;
    reveal: string;
  };
  theatre: { label: string; scenes: Scene[] };
  band: { label: string; aside: string; rowA: string[]; rowB: string[] };
  manifesto: { label: string; aside: string; text: string; signature: string };
  closing: { label: string; aside: string; lead: string; word: string; cta: string; email: string; whatsapp: string; base: string };
};

const img = (name: string) => `/images/services/${name}.jpg`;

export const copy: Record<DemoLocale, Copy> = {
  en: {
    hero: {
      eyebrow: "Elmasry Tech — Software house, Cairo",
      aside: "Websites · Apps · Systems · AI",
      lines: ["We build", "what’s next."],
      linesMobile: ["We", "build", "what’s", "next."],
      sub: "A two-engineer studio building websites, apps and business systems for companies in Egypt and the Gulf — one clear scope, weekly progress.",
      cta: "Start a project",
      scroll: "Scroll",
      revealLabel: "(02) — What we build",
      reveal: "Four things. Built properly.",
    },
    theatre: {
      label: "(02) — What we build",
      scenes: [
        { word: "Websites", image: img("website-development"), caption: "Fast, bilingual websites built to turn visits into leads.", tone: "brightness(1.9) contrast(1.05) saturate(1.2)", focus: [0.55, 0.15] },
        { word: "Apps", image: img("mobile-app-development"), caption: "Mobile apps your customers actually keep on their phone.", tone: "brightness(1.15) saturate(1.15)", focus: [0.5, 0.5] },
        { word: "Systems", image: img("custom-software"), caption: "Dashboards, ERP and CRM shaped around how you already work.", tone: "brightness(1.05) contrast(1.05)", focus: [0.35, 0.3] },
        { word: "AI", image: img("ai-chatbots"), caption: "Assistants that answer, book and follow up — around the clock.", tone: "brightness(1.6) contrast(1.1) saturate(1.2)", focus: [0.5, 0.45] },
      ],
    },
    band: {
      label: "(03) — Everything we ship",
      aside: "Speed follows your scroll",
      rowA: ["Websites", "Mobile apps", "Custom systems", "AI agents", "E-commerce"],
      rowB: ["Automation", "Dashboards", "Integrations", "UI / UX", "Support"],
    },
    manifesto: {
      label: "(04) — How we think",
      aside: "Read slowly",
      text: "We don’t sell templates. We build *software* *that* *works* — sites that sell, apps people keep, systems that save hours, AI that answers. Clear scope. Weekly progress. One team from the first call to *launch* and beyond.",
      signature: "— Elmasry Tech",
    },
    closing: {
      label: "(05) — Next step",
      aside: "Hover the word",
      lead: "Got something in mind? Tell us about it.",
      word: "Let’s talk",
      cta: "Start a project",
      email: "Email",
      whatsapp: "WhatsApp",
      base: "Cairo, Egypt — clients across Egypt & the Gulf",
    },
  },
  ar: {
    hero: {
      eyebrow: "Elmasry Tech — شركة برمجيات، القاهرة",
      aside: "مواقع · تطبيقات · أنظمة · ذكاء اصطناعي",
      lines: ["نبني", "المستقبل."],
      linesMobile: ["نبني", "المستقبل."],
      sub: "فريق من مهندسَين نبني المواقع والتطبيقات وأنظمة الإدارة للشركات في مصر والخليج — نطاق عمل واضح وتقدّم ملموس كل أسبوع.",
      cta: "ابدأ مشروعك",
      scroll: "مرّر للأسفل",
      revealLabel: "(02) — ماذا نبني",
      reveal: "أربعة أشياء. نتقنها.",
    },
    theatre: {
      label: "(02) — ماذا نبني",
      scenes: [
        { word: "مواقع", image: img("website-development"), caption: "مواقع سريعة بالعربية والإنجليزية تحوّل الزيارات إلى عملاء.", tone: "brightness(1.9) contrast(1.05) saturate(1.2)", focus: [0.55, 0.15] },
        { word: "تطبيقات", image: img("mobile-app-development"), caption: "تطبيقات موبايل يحتفظ بها عملاؤك على هواتفهم فعلًا.", tone: "brightness(1.15) saturate(1.15)", focus: [0.5, 0.5] },
        { word: "أنظمة", image: img("custom-software"), caption: "لوحات تحكم وأنظمة ERP وCRM مصمّمة حول طريقة عملك.", tone: "brightness(1.05) contrast(1.05)", focus: [0.35, 0.3] },
        { word: "ذكاء اصطناعي", image: img("ai-chatbots"), caption: "مساعدات ذكية تردّ وتحجز وتتابع مع عملائك على مدار الساعة.", tone: "brightness(1.6) contrast(1.1) saturate(1.2)", focus: [0.5, 0.45] },
      ],
    },
    band: {
      label: "(03) — كل ما نسلّمه",
      aside: "السرعة تتبع حركتك",
      rowA: ["مواقع إلكترونية", "تطبيقات موبايل", "أنظمة مخصّصة", "وكلاء ذكاء اصطناعي", "متاجر إلكترونية"],
      rowB: ["أتمتة", "لوحات تحكم", "تكاملات", "تجربة المستخدم", "دعم مستمر"],
    },
    manifesto: {
      label: "(04) — طريقتنا",
      aside: "اقرأ على مهل",
      text: "لا نبيع قوالب جاهزة. نبني *برمجيات* *تعمل* *فعلًا* — مواقع تبيع، وتطبيقات يحتفظ بها الناس، وأنظمة توفّر الساعات، وذكاء اصطناعي يجيب بدقة. نطاق واضح. تقدّم كل أسبوع. فريق واحد من أول مكالمة حتى *الإطلاق* وما بعده.",
      signature: "— Elmasry Tech",
    },
    closing: {
      label: "(05) — الخطوة التالية",
      aside: "مرّر المؤشر على الكلمة",
      lead: "عندك فكرة؟ احكِ لنا عنها.",
      word: "لنتحدّث",
      cta: "ابدأ مشروعك",
      email: "البريد",
      whatsapp: "واتساب",
      base: "القاهرة، مصر — عملاء في مصر والخليج",
    },
  },
};
