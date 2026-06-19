import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAdmin, setCacheHeaders } from "@/lib/api";
import { projectSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");

    const where: Record<string, unknown> = {};
    if (featured === "true") where.featured = true;
    if (category && category !== "all") where.category = category;

    const projects = await prisma.project.findMany({
      where,
      orderBy: { order: "asc" },
      ...(limit ? { take: parseInt(limit) } : {}),
    });

    const response = successResponse(projects);
    return setCacheHeaders(response, 3600);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return errorResponse("Failed to fetch projects", 500);
  }
}

export async function POST(request: Request) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const body = await request.json();
    
    // Auto-generate slug if not provided
    if (!body.slug && body.title_en) {
      body.slug = slugify(body.title_en);
    }

    const parsed = projectSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message, 400);
    }

    // Ensure slug uniqueness
    let slug = parsed.data.slug;
    let counter = 1;
    while (await prisma.project.findUnique({ where: { slug } })) {
      slug = `${parsed.data.slug}-${++counter}`;
    }

    const project = await prisma.project.create({
      data: {
        ...parsed.data,
        slug,
        long_desc_en: parsed.data.long_desc_en || "",
        long_desc_ar: parsed.data.long_desc_ar || "",
      },
    });

    revalidatePath("/", "layout");
    return successResponse(project, 201);
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return errorResponse("Failed to create project", 500);
  }
}
