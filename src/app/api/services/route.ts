import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAdmin, setCacheHeaders } from "@/lib/api";
import { serviceSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const where = featured === "true" ? { featured: true } : {};
    const services = await prisma.service.findMany({
      where,
      orderBy: { order: "asc" },
    });

    const response = successResponse(services);
    return setCacheHeaders(response, 3600);
  } catch (error) {
    console.error("GET /api/services error:", error);
    return errorResponse("Failed to fetch services", 500);
  }
}

export async function POST(request: Request) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const body = await request.json();
    const parsed = serviceSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message, 400);
    }

    const service = await prisma.service.create({ data: parsed.data });
    revalidatePath("/", "layout");
    return successResponse(service, 201);
  } catch (error) {
    console.error("POST /api/services error:", error);
    return errorResponse("Failed to create service", 500);
  }
}
