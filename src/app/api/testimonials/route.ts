import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAdmin, setCacheHeaders } from "@/lib/api";
import { testimonialSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const where = featured === "true" ? { featured: true } : {};
    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const response = successResponse(testimonials);
    return setCacheHeaders(response, 3600);
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return errorResponse("Failed to fetch testimonials", 500);
  }
}

export async function POST(request: Request) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const body = await request.json();
    const parsed = testimonialSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message, 400);
    }

    const testimonial = await prisma.testimonial.create({ data: parsed.data });
    revalidatePath("/", "layout");
    return successResponse(testimonial, 201);
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return errorResponse("Failed to create testimonial", 500);
  }
}
