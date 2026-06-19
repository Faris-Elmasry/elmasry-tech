import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAdmin } from "@/lib/api";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const { id } = await params;
    const body = await request.json();

    const message = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { status: body.status },
    });

    return successResponse(message);
  } catch (error) {
    console.error("PATCH /api/contact/[id] error:", error);
    return errorResponse("Failed to update message", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const { id } = await params;
    await prisma.contactMessage.delete({ where: { id: parseInt(id) } });

    return successResponse({ deleted: true });
  } catch (error) {
    console.error("DELETE /api/contact/[id] error:", error);
    return errorResponse("Failed to delete message", 500);
  }
}
