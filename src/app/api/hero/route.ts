import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse, requireAdmin, setCacheHeaders } from "@/lib/api";
import { heroSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    let hero = await prisma.heroSection.findFirst();

    if (!hero) {
      hero = await prisma.heroSection.upsert({
        where: { id: 1 },
        update: {},
        create: {
          id: 1,
          title_en: "Software That Moves Businesses Forward.",
          title_ar: "برمجيات تدفع الأعمال إلى الأمام.",
          subtitle_en: "From web and mobile apps to AI and automation — I build new systems or upgrade existing ones to help your business scale globally.",
          subtitle_ar: "من تطبيقات الويب والجوال إلى الذكاء الاصطناعي والأتمتة — أقوم ببناء أنظمة جديدة أو ترقية الأنظمة الحالية لمساعدة عملك على التوسع عالمياً.",
          badge_en: "Available for Projects ✦",
          badge_ar: "متاح لمشاريع جديدة ✦",
          cta_primary_en: "View My Work",
          cta_primary_ar: "شاهد أعمالي",
          cta_secondary_en: "Start a Project →",
          cta_secondary_ar: "ابدأ مشروعك ←",
        },
      });
    }

    const response = successResponse(hero);
    return setCacheHeaders(response, 3600);
  } catch (error) {
    console.error("GET /api/hero error:", error);
    return errorResponse("Failed to fetch hero section", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const { error: authError } = await requireAdmin();
    if (authError) return authError;

    const body = await request.json();
    const parsed = heroSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.errors[0].message, 400);
    }

    const updated = await prisma.heroSection.upsert({
      where: { id: 1 },
      update: parsed.data,
      create: { id: 1, ...parsed.data },
    });

    revalidatePath("/", "layout");
    return successResponse(updated);
  } catch (error) {
    console.error("PUT /api/hero error:", error);
    return errorResponse("Failed to update hero section", 500);
  }
}
