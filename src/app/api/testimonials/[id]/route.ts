import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAdmin } from "@/lib/api";
import { testimonialSchema } from "@/lib/validators";
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
    const parsed = testimonialSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message, 400);
    }

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: parsed.data,
    });

    revalidatePath("/", "layout");
    return successResponse(testimonial);
  } catch (error) {
    console.error("PUT /api/testimonials/[id] error:", error);
    return errorResponse("Failed to update testimonial", 500);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const { id } = await params;
    await prisma.testimonial.delete({ where: { id: parseInt(id) } });

    revalidatePath("/", "layout");
    return successResponse({ deleted: true });
  } catch (error) {
    console.error("DELETE /api/testimonials/[id] error:", error);
    return errorResponse("Failed to delete testimonial", 500);
  }
}
