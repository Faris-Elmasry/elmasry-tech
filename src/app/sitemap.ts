import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elmasry.tech";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["en", "ar"];

  // Static pages
  const staticPages = ["", "/about", "/services", "/portfolio", "/contact"];
  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  // Dynamic project pages
  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${SITE_URL}/api/projects`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const { data } = await res.json();
      projectEntries = locales.flatMap((locale) =>
        (data || []).map((project: { slug: string; updatedAt: string }) => ({
          url: `${SITE_URL}/${locale}/portfolio/${project.slug}`,
          lastModified: new Date(project.updatedAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }))
      );
    }
  } catch {}

  return [...staticEntries, ...projectEntries];
}
