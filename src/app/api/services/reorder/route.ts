import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAdmin } from "@/lib/api";
import { z } from "zod";

const reorderSchema = z.object({
  items: z.array(z.object({ id: z.number(), order: z.number() })),
});

export async function PATCH(request: Request) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const body = await request.json();
    const parsed = reorderSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse("Invalid reorder data", 400);
    }

    await prisma.$transaction(
      parsed.data.items.map((item) =>
        prisma.service.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    return successResponse({ reordered: true });
  } catch (error) {
    console.error("PATCH /api/services/reorder error:", error);
    return errorResponse("Failed to reorder services", 500);
  }
}
