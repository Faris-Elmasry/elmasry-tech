import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { services } from "@/lib/content";
import { locales, localeUrl, defaultLocale } from "@/lib/site";

export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

/** One URL per locale, each listing every language version (hreflang). */
function localized(path: string, priority: number, changeFrequency: Entry["changeFrequency"], lastModified = new Date()): Entry[] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l === "ar" ? "ar-EG" : "en"] = localeUrl(l, path);
  languages["x-default"] = localeUrl(defaultLocale, path);
  return locales.map((locale) => ({
    url: localeUrl(locale, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    ...localized("", 1, "weekly"),
    ...localized("/services", 0.9, "monthly"),
    ...services.flatMap((s) => localized(`/services/${s.slug}`, 0.9, "monthly")),
    ...localized("/portfolio", 0.7, "weekly"),
    ...localized("/about", 0.6, "monthly"),
    ...localized("/contact", 0.7, "yearly"),
  ];

  try {
    const projects = await prisma.project.findMany({ select: { slug: true, updatedAt: true } });
    for (const p of projects) entries.push(...localized(`/portfolio/${p.slug}`, 0.6, "monthly", p.updatedAt));
  } catch (error) {
    console.warn("[sitemap] projects unavailable:", String((error as Error).message).split("\n").pop());
  }

  return entries;
}
