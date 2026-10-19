import type { Locale } from "@/lib/site";

/*
 * All visitor-facing words for the 3D tour. Written for shop, clinic and
 * restaurant owners: plain promises, no technical terms.
 */

export interface StationCopy {
  /** Name used in the step bar and the step label. */
  name: string;
  /** The big promise (heading). */
  promise: string;
  /** "What it means for you". */
  means: string;
  tags: string[];
}

export interface WorldCopy {
  hero: {
    eyebrow: string;
    title: [string, string, string];
    sub: string;
    cta: string;
    hint: string;
  };
  stations: StationCopy[];
  /** Step bar names: Idea + the 4 stations. */
  steps: string[];
  stepLabel: (n: number, total: number) => string;
  meansLabel: string;
  end: {
    eyebrow: string;
    title: string;
    sub: string;
    cta: string;
    again: string;
    promises: string[];
  };
  stepsNav: string;
}

export const COPY: Record<Locale, WorldCopy> = {
  en: {
    hero: {
      eyebrow: "Elmasry Tech · a one-minute tour",
      title: ["Tell us your ", "idea", "."],
      sub: "We turn it into something that works for you: a website, an app, one screen for your whole business, or an assistant that replies to your customers.",
      cta: "Free consultation",
      hint: "Scroll to start the tour",
    },
    stations: [
      {
        name: "Website",
        promise: "People find your business on Google and order directly.",
        means: "More customers, and no commission to anyone.",
        tags: ["Shows up on Google", "Arabic & English", "Works on any phone"],
      },
      {
        name: "App",
        promise: "Your customers order and book from their phone.",
        means: "They come back again and again, one tap away.",
        tags: ["Orders & bookings", "Instant notifications", "iPhone & Android"],
      },
      {
        name: "One screen",
        promise: "See your sales, stock and money in one place, from anywhere.",
        means: "No more notebooks and guessing. You know exactly where you stand.",
        tags: ["Sales", "Stock", "Money in & out"],
      },
      {
        name: "Assistant",
        promise: "An assistant that answers your customers day and night.",
        means: "No customer lost because nobody replied.",
        tags: ["Replies in seconds", "Day & night", "Arabic & English"],
      },
    ],
    steps: ["Idea", "Website", "App", "One screen", "Assistant"],
    stepLabel: (n, total) => `Step ${n} of ${total}`,
    meansLabel: "What it means for you:",
    end: {
      eyebrow: "That was the tour",
      title: "Ready? Let’s build yours.",
      sub: "Tell us about your business and we’ll suggest the simplest solution that fits your budget.",
      cta: "Get a free consultation",
      again: "Watch again",
      promises: ["Free consultation", "No commitment", "We speak your language"],
    },
    stepsNav: "Tour steps",
  },
  ar: {
    hero: {
      eyebrow: "Elmasry Tech · جولة في دقيقة",
      title: ["احكيلنا ", "فكرتك", "."],
      sub: "وإحنا نحوّلها لحاجة شغّالة بجد: موقع، أو تطبيق، أو شاشة واحدة لشغلك كله، أو مساعد بيرد على عملاءك.",
      cta: "استشارة مجانية",
      hint: "انزل عشان تبدأ الجولة",
    },
    stations: [
      {
        name: "الموقع",
        promise: "الناس تلاقيك على جوجل وتطلب منك على طول.",
        means: "زباين أكتر، ومن غير عمولة لحد.",
        tags: ["يظهر على جوجل", "عربي وإنجليزي", "يشتغل على أي موبايل"],
      },
      {
        name: "التطبيق",
        promise: "عملاءك يطلبوا ويحجزوا من موبايلهم.",
        means: "العميل يرجعلك تاني وتالت، بضغطة واحدة.",
        tags: ["طلبات وحجوزات", "إشعارات فورية", "آيفون وأندرويد"],
      },
      {
        name: "شاشة واحدة",
        promise: "تشوف مبيعاتك ومخزنك وفلوسك في مكان واحد، من أي مكان.",
        means: "خلاص مفيش كشاكيل ولا تخمين. تعرف وضعك بالظبط.",
        tags: ["المبيعات", "المخزن", "الفلوس الداخلة والخارجة"],
      },
      {
        name: "المساعد",
        promise: "مساعد بيرد على عملاءك ليل ونهار.",
        means: "مفيش عميل يضيع عشان محدش رد عليه.",
        tags: ["يرد في ثواني", "ليل ونهار", "عربي وإنجليزي"],
      },
    ],
    steps: ["الفكرة", "الموقع", "التطبيق", "شاشة واحدة", "المساعد"],
    stepLabel: (n, total) => `الخطوة ${n} من ${total}`,
    meansLabel: "يعني إيه ده ليك؟",
    end: {
      eyebrow: "دي كانت الجولة",
      title: "جاهز؟ يلا نبني بتاعك.",
      sub: "احكيلنا عن شغلك، وإحنا نقترح عليك أبسط حل يناسب ميزانيتك.",
      cta: "احجز استشارة مجانية",
      again: "اتفرج تاني",
      promises: ["استشارة مجانية", "من غير أي التزام", "بنتكلم بلغتك"],
    },
    stepsNav: "خطوات الجولة",
  },
};

/** The big 3D words floating above each station (index 0 = the idea). */
export const WORDS: Record<Locale, string[]> = {
  en: ["YOUR IDEA", "YOUR WEBSITE", "YOUR APP", "ONE SCREEN", "A SMART ASSISTANT"],
  ar: ["فكرتك", "موقعك", "تطبيقك", "شغلك على شاشة واحدة", "مساعد ذكي"],
};
