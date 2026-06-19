import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAdmin } from "@/lib/api";
import { serviceSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const { id } = await params;
    const body = await request.json();
    const parsed = serviceSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message, 400);
    }

    const service = await prisma.service.update({
      where: { id: parseInt(id) },
      data: parsed.data,
    });

    revalidatePath("/", "layout");
    return successResponse(service);
  } catch (error) {
    console.error("PUT /api/services/[id] error:", error);
    return errorResponse("Failed to update service", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const { id } = await params;
    await prisma.service.delete({ where: { id: parseInt(id) } });

    revalidatePath("/", "layout");
    return successResponse({ deleted: true });
  } catch (error) {
    console.error("DELETE /api/services/[id] error:", error);
    return errorResponse("Failed to delete service", 500);
  }
}
