import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { successResponse, errorResponse, requireAdmin } from "@/lib/api";
import { contactSchema, requestStatuses } from "@/lib/validators";
import { contactRateLimit, getRateLimitIdentifier } from "@/lib/rateLimit";
import { type NextRequest } from "next/server";

/** A request from the website: contact form, or "request a quote" on a ready-made system. */
export async function POST(request: NextRequest) {
  try {
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
    const { website, ...data } = parsed.data;
    // Honeypot filled → a bot. Answer like a success so it doesn't retry.
    if (website) return successResponse({ sent: true }, 201);

    const message = await prisma.contactMessage.create({
      data: { ...data, email: data.email || null, company: data.company || null },
    });

    // Notifications never fail the request.
    try {
      const { sendContactNotification } = await import("@/lib/email");
      await sendContactNotification(data);
    } catch (notifyError) {
      console.error("Notification failed:", notifyError);
    }

    return successResponse({ sent: true, id: message.id }, 201);
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return errorResponse("Failed to send message", 500);
  }
}

/** Admin: the requests list, with filters and per-status counts. */
export async function GET(request: NextRequest) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "30")));
    const status = searchParams.get("status");
    const kind = searchParams.get("kind");
    const system = searchParams.get("system");
    const q = searchParams.get("q")?.trim();
    const due = searchParams.get("due") === "1";

    const where: Prisma.ContactMessageWhereInput = {
      ...(status ? { status } : {}),
      ...(kind ? { kind } : {}),
      ...(system ? { system } : {}),
      ...(due ? { followUpAt: { lte: new Date() }, status: { notIn: ["won", "lost"] } } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { company: { contains: q, mode: "insensitive" } },
              { phone: { contains: q.replace(/[^\d+]/g, "") || q } },
              { email: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [messages, total, byStatus, dueCount] = await Promise.all([
      prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit }),
      prisma.contactMessage.count({ where }),
      prisma.contactMessage.groupBy({ by: ["status"], _count: { _all: true } }),
      prisma.contactMessage.count({ where: { followUpAt: { lte: new Date() }, status: { notIn: ["won", "lost"] } } }),
    ]);
    const counts = Object.fromEntries(requestStatuses.map((s) => [s, byStatus.find((b) => b.status === s)?._count._all ?? 0]));

    const response = successResponse({ messages, total, counts, due: dueCount, unread: counts.new, page, limit });
    // Private, always-fresh admin data: never let a browser or CDN reuse it.
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return errorResponse("Failed to fetch messages", 500);
  }
}
