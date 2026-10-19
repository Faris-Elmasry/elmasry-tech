import type { Locale } from "@/lib/site";

/** "EGP 1,240" / "1,240 ج.م" — Western digits in both languages. */
export const money = (n: number, locale: Locale) => (locale === "ar" ? `${n.toLocaleString("en-US")} ج.م` : `EGP ${n.toLocaleString("en-US")}`);
