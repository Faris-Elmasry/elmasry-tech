import "server-only";
import prisma from "@/lib/prisma";

// Server-side data access for public pages. Pages query Prisma directly
// (instead of fetching their own /api over HTTP) and degrade to empty
// results when the database is unavailable, so the marketing site still
// renders during builds or DB outages.

const warned = new Set<string>();
const firstLine = (e: unknown) =>
  String((e as Error)?.message ?? e)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .pop();

async function safe<R>(label: string, fn: () => Promise<R>, fallback: R): Promise<R> {
  try {
    return await fn();
  } catch (error) {
    // Warn once per label: an unreachable DB is an ops problem, not a page error,
    // and the page renders its empty state instead.
    if (!warned.has(label)) {
      warned.add(label);
      console.warn(`[data] ${label}: database unavailable — rendering without it. (${firstLine(error)})`);
    }
    return fallback;
  }
}

export function getProjects(opts: { featured?: boolean; limit?: number } = {}) {
  return safe(
    "getProjects",
    () =>
      prisma.project.findMany({
        where: opts.featured ? { featured: true } : undefined,
        orderBy: { order: "asc" },
        take: opts.limit,
      }),
    []
  );
}

export function getProject(slug: string) {
  return safe("getProject", () => prisma.project.findUnique({ where: { slug } }), null);
}

export function getTestimonials() {
  return safe(
    "getTestimonials",
    () => prisma.testimonial.findMany({ where: { featured: true }, orderBy: { createdAt: "desc" } }),
    []
  );
}

export type ProjectRecord = Awaited<ReturnType<typeof getProjects>>[number];
export type TestimonialRecord = Awaited<ReturnType<typeof getTestimonials>>[number];
