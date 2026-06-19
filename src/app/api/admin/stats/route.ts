import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAdmin } from "@/lib/api";

export async function GET() {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const [projects, services, testimonials, messagesTotal, messagesUnread] =
      await Promise.all([
        prisma.project.count(),
        prisma.service.count(),
        prisma.testimonial.count(),
        prisma.contactMessage.count(),
        prisma.contactMessage.count({ where: { status: "new" } }),
      ]);

    return successResponse({
      projects,
      services,
      testimonials,
      messages: { total: messagesTotal, unread: messagesUnread },
    });
  } catch (error) {
    console.error("GET /api/admin/stats error:", error);
    return errorResponse("Failed to fetch stats", 500);
  }
}
