import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge (dedup).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Slugify a string for URLs.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

/**
 * Format a date for display.
 */
export function formatDate(date: Date | string, locale: string = "en"): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

/**
 * Truncate text to a max length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Get localized field value from a record with _en/_ar suffixes.
 */
export function localize<T extends Record<string, unknown>>(
  record: T,
  field: string,
  locale: string
): string {
  const key = `${field}_${locale}` as keyof T;
  const fallback = `${field}_en` as keyof T;
  return (record[key] as string) || (record[fallback] as string) || "";
}
