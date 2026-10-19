// Live work shown on the homepage ("see it live / try it yourself").
// Only REAL projects go here: client work the client allowed us to show, and
// demos of our own products. The homepage section does not render at all while
// this list is empty — no placeholders, no invented projects.
//
// Previews: run `node scripts/capture-previews.mjs` to record a short scrolling
// video + poster for every entry with a `url`/`demoUrl`; files land in
// public/images/work/<slug>.webm and public/images/work/<slug>-poster.webp.

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
    /** webm/mp4 under /public/images/work (muted, looping). */
    video?: string;
    /** WebP poster (always required when `preview` is set). */
    poster: string;
  };
  tags?: Record<Locale, string[]>;
};

export const work: WorkItem[] = [];
