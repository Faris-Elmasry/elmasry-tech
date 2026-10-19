// "Guides" content hub: long-form, bilingual articles written for Egyptian
// business owners who are about to buy a website, an app or business
// software. Arabic first, plain words, no invented numbers or prices.
//
// Each guide lives in its own file under src/lib/guide-articles/ (they are
// long); this module holds the types, the ordered registry and helpers.
//
// Inline markup inside paragraphs/list items (rendered by the guide page):
//   [label](/services/website-development)  → internal link, locale is prefixed
//   [label](https://www.eta.gov.eg)          → external link (new tab)
//   **bold**                                 → <strong>

import type { Locale } from "@/lib/site";
import type { T } from "@/lib/content";
import { websiteDesignCost } from "@/lib/guide-articles/website-design-cost-egypt";
import { mobileAppCost } from "@/lib/guide-articles/mobile-app-cost-egypt";
import { choosePos } from "@/lib/guide-articles/choose-pos-system";
import { erpVsAccounting } from "@/lib/guide-articles/erp-vs-accounting-software";
import { whatsappChatbot } from "@/lib/guide-articles/whatsapp-chatbot-for-business";
import { eInvoice } from "@/lib/guide-articles/e-invoice-egypt-integration";
import { chooseSoftwareCompany } from "@/lib/guide-articles/how-to-choose-software-company-egypt";

/** One block of an article body: a paragraph, a bullet/numbered list, or a highlighted note. */
export type GuideBlock = string | { list: string[]; ordered?: boolean } | { note: string };

export interface GuideSection {
  /** Becomes an H2 and a table-of-contents entry. */
  heading: T;
  body: Record<Locale, GuideBlock[]>;
}

export interface Guide {
  /** English, kebab-case — used in the URL under both locales. */
  slug: string;
  /** The H1. Always contains `keyword`. */
  title: T;
  /** Meta description, 140–155 characters per language. */
  description: T;
  /** Main search phrase the guide targets. */
  keyword: T;
  readingMinutes: number;
  /** ISO dates (YYYY-MM-DD). */
  published: string;
  updated: string;
  /** Slugs from src/lib/content.ts `services`. */
  relatedServices: string[];
  /** Slugs from src/lib/systems.ts `readySystems`. */
  relatedSystems: string[];
  /** Lead paragraph under the H1. */
  intro: T;
  sections: GuideSection[];
  faqs: { q: T; a: T }[];
  /** Closing call-to-action line. */
  cta: T;
}

export const guides: Guide[] = [
  websiteDesignCost,
  mobileAppCost,
  choosePos,
  erpVsAccounting,
  whatsappChatbot,
  eInvoice,
  chooseSoftwareCompany,
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

/** Other guides, closest first (shared services/systems), then in list order. */
export function relatedGuides(guide: Guide, count = 3) {
  const score = (g: Guide) =>
    g.relatedServices.filter((s) => guide.relatedServices.includes(s)).length +
    g.relatedSystems.filter((s) => guide.relatedSystems.includes(s)).length;
  return guides
    .filter((g) => g.slug !== guide.slug)
    .map((g, i) => ({ g, i, s: score(g) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, count)
    .map((x) => x.g);
}

/** Plain text of a block or inline string (markup removed) — for JSON-LD and word counts. */
export function plainText(value: string) {
  return value.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}

/** "6 دقايق قراءة" / "6 min read" (Arabic counted noun: plural for 3–10, singular above). */
export function readingTime(minutes: number, locale: Locale) {
  if (locale === "en") return `${minutes} min read`;
  return `${minutes} ${minutes >= 3 && minutes <= 10 ? "دقايق" : "دقيقة"} قراءة`;
}

/** Latest `updated` date across all guides (for the index page / sitemap). */
export const guidesUpdated = guides.reduce((max, g) => (g.updated > max ? g.updated : max), guides[0].published);
