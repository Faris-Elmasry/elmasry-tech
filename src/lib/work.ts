// Live work shown on the homepage ("see it live / try it yourself").
// Only REAL projects go here: client work the client allowed us to show, and
// demos of our own products. The homepage section does not render at all while
// this list is empty — no placeholders, no invented projects.
//
// Previews: run `node scripts/capture-previews.mjs` to record a slow, sharp
// scrolling video + poster for every entry with a `url`/`demoUrl`; files land in
// public/images/work/<slug>.mp4, <slug>.webm and <slug>-poster.webp.

import type { Locale } from "@/lib/site";

type T = Record<Locale, string>;

export type WorkItem = {
  /** URL-safe id; also the preview file name in /public/images/work. */
  slug: string;
  name: T;
  /** "client" = built for a client (shown with permission); "demo" = our own product demo. */
  kind: "client" | "demo";
  /** Decides the device frame: browser (website), phone (app), laptop browser (system). */
  type: "website" | "app" | "system";
  /** One plain line: what it is / what it does for its owner. */
  summary: T;
  /** Live website. */
  url?: string;
  appStore?: string;
  playStore?: string;
  /** Where to try a demo (systems, apps with a web version). */
  demoUrl?: string;
  /** e.g. the demo login: { en: "Login: demo / demo123", ar: "الدخول: demo / demo123" } */
  demoNote?: T;
  preview?: {
    /** H.264 video under /public/images/work (muted) — plays everywhere. */
    mp4: string;
    /** VP9 version of the same video — smaller; browsers that can play it use it first. */
    webm?: string;
    /** WebP poster: the video's first frame. */
    poster: string;
  };
  tags?: Record<Locale, string[]>;
};

export const work: WorkItem[] = [
  {
    slug: "itafa2na",
    name: { ar: "اتفقنا", en: "Itafa2na" },
    kind: "client",
    type: "app",
    summary: {
      ar: "سوق التشطيب في مصر — موقع وتطبيق موبايل: العميل يكتب شغلته مرة واحدة وتوصله عروض من صنايعية وتجار خامات قريبين منه.",
      en: "Egypt's home-finishing marketplace — website and mobile app: post a job once and get quotes from nearby craftsmen and material suppliers.",
    },
    url: "https://itafa2na.tech/",
    preview: { mp4: "/images/work/itafa2na.mp4", webm: "/images/work/itafa2na.webm", poster: "/images/work/itafa2na-poster.webp" },
    tags: { ar: ["تطبيق موبايل", "سوق إلكتروني", "مصر"], en: ["Mobile app", "Marketplace", "Egypt"] },
  },
  {
    slug: "online-ms",
    name: { ar: "Online MS", en: "Online MS" },
    kind: "client",
    type: "system",
    summary: {
      ar: "سيستم جودة وسلامة (ISO و VCA) بتطبيق موبايل: المستندات والتسجيلات والشهادات وحالة المطابقة لكل بند في مكان واحد.",
      en: "QHSE compliance software with a mobile app: ISO and VCA documents, records, certificates and live status per requirement in one place.",
    },
    url: "https://online-ms.io/",
    preview: { mp4: "/images/work/online-ms.mp4", webm: "/images/work/online-ms.webm", poster: "/images/work/online-ms-poster.webp" },
    tags: { ar: ["نظام SaaS", "تطبيق موبايل", "هولندا"], en: ["SaaS", "Mobile app", "Netherlands"] },
  },
  {
    slug: "we-management",
    name: { ar: "WE Management", en: "WE Management" },
    kind: "client",
    type: "website",
    summary: {
      ar: "موقع شركة استشارات شهادات ISO و VCA في هولندا، مربوط بالسيستم الأونلاين بتاعهم.",
      en: "Website for an ISO and VCA certification consultancy in the Netherlands, tied to their online management system.",
    },
    url: "https://we-management.nl/",
    preview: { mp4: "/images/work/we-management.mp4", webm: "/images/work/we-management.webm", poster: "/images/work/we-management-poster.webp" },
    tags: { ar: ["موقع شركة", "هولندا"], en: ["Company website", "Netherlands"] },
  },
  {
    slug: "smoothware",
    name: { ar: "Smoothware", en: "Smoothware" },
    kind: "client",
    type: "website",
    summary: {
      ar: "موقع شركة برمجيات هولندية: مواقع وسيستمات حسب الطلب وأتمتة بالذكاء الاصطناعي للشركات الصغيرة والمتوسطة.",
      en: "Website for a Dutch software house: websites, custom software and AI automation for small businesses.",
    },
    url: "https://smoothware.nl/",
    preview: { mp4: "/images/work/smoothware.mp4", webm: "/images/work/smoothware.webm", poster: "/images/work/smoothware-poster.webp" },
    tags: { ar: ["موقع شركة", "هولندا"], en: ["Company website", "Netherlands"] },
  },
];
