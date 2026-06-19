import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAdmin, setCacheHeaders } from "@/lib/api";
import { revalidatePath } from "next/cache";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const project = await prisma.project.findUnique({ where: { slug } });

    if (!project) {
      return errorResponse("Project not found", 404);
    }

    const response = successResponse(project);
    return setCacheHeaders(response, 3600);
  } catch (error) {
    console.error("GET /api/projects/[slug] error:", error);
    return errorResponse("Failed to fetch project", 500);
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const { slug } = await params;
    const body = await request.json();

    const project = await prisma.project.update({
      where: { slug },
      data: body,
    });

    revalidatePath("/", "layout");
    revalidatePath(`/en/portfolio/${slug}`);
    return successResponse(project);
  } catch (error) {
    console.error("PUT /api/projects/[slug] error:", error);
    return errorResponse("Failed to update project", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const { slug } = await params;
    await prisma.project.delete({ where: { slug } });

    revalidatePath("/", "layout");
    return successResponse({ deleted: true });
  } catch (error) {
    console.error("DELETE /api/projects/[slug] error:", error);
    return errorResponse("Failed to delete project", 500);
  }
}
