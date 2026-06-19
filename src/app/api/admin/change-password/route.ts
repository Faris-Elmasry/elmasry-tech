import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAdmin } from "@/lib/api";
import { compare, hash } from "bcryptjs";
import { changePasswordSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const result = await requireAdmin();
    if (result.error) return result.error;

    const body = await request.json();
    const parsed = changePasswordSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message, 400);
    }

    const admin = await prisma.adminUser.findFirst({
      where: { email: result.session.user.email },
    });

    if (!admin) {
      return errorResponse("User not found", 404);
    }

    const isValid = await compare(parsed.data.currentPassword, admin.password);
    if (!isValid) {
      return errorResponse("Current password is incorrect", 400);
    }

    const hashedPassword = await hash(parsed.data.newPassword, 12);
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { password: hashedPassword },
    });

    return successResponse({ updated: true });
  } catch (error) {
    console.error("POST /api/admin/change-password error:", error);
    return errorResponse("Failed to change password", 500);
  }
}
