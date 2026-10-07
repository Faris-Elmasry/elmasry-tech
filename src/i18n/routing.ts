import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/lib/site";

export const routing = defineRouting({
  locales,
  // Arabic-first: the primary market is Egypt. Browsers that prefer English
  // are still sent to /en by locale detection.
  defaultLocale,
  localeDetection: true,
});
