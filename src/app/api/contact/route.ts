import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAdmin, setCacheHeaders } from "@/lib/api";
import { contactSchema } from "@/lib/validators";
import { contactRateLimit, getRateLimitIdentifier } from "@/lib/rateLimit";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    if (contactRateLimit) {
      const identifier = getRateLimitIdentifier(request);
      const { success } = await contactRateLimit.limit(identifier);
      if (!success) {
        return errorResponse("Too many messages. Please try again in an hour.", 429);
      }
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message, 400);
    }

    const message = await prisma.contactMessage.create({ data: parsed.data });

    // Email notification — non-blocking (don't fail if email fails)
    try {
      const { sendContactNotification } = await import("@/lib/email");
      await sendContactNotification(parsed.data);
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    return successResponse({ sent: true, id: message.id }, 201);
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return errorResponse("Failed to send message", 500);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");

    const where = status ? { status } : {};
    const skip = (page - 1) * limit;

    const [messages, total, unread] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactMessage.count({ where }),
      prisma.contactMessage.count({ where: { status: "new" } }),
    ]);

    const response = successResponse({ messages, total, unread, page, limit });
    return setCacheHeaders(response, 0);
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return errorResponse("Failed to fetch messages", 500);
  }
}
