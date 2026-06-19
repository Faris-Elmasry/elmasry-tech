import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAdmin, setCacheHeaders } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findMany();
    const data: Record<string, string> = {};
    for (const s of settings) {
      data[s.key] = s.value;
    }

    const response = successResponse(data);
    return setCacheHeaders(response, 86400);
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return errorResponse("Failed to fetch settings", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const body = await request.json();
    const { updates } = body as { updates: { key: string; value: string }[] };

    if (!updates || !Array.isArray(updates)) {
      return errorResponse("Invalid updates format", 400);
    }

    await prisma.$transaction(
      updates.map((u) =>
        prisma.siteSettings.upsert({
          where: { key: u.key },
          update: { value: u.value },
          create: { key: u.key, value: u.value },
        })
      )
    );

    revalidatePath("/", "layout");
    return successResponse({ updated: true });
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return errorResponse("Failed to update settings", 500);
  }
}
