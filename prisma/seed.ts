import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // ─── Admin User ───
  // From the environment only: the email and password used to be written here (and in
  // help.text), and the repo is public. Same variables as scripts/ensure-admin.mjs.
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword && adminPassword.length >= 10) {
    const admin = await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        password: await hash(adminPassword, 12),
        name: process.env.ADMIN_NAME || "Faris Elmasry",
        role: "admin",
      },
    });
    console.log("✓ Admin user ready:", admin.email);
  } else {
    console.log("• Admin user skipped: set ADMIN_EMAIL and ADMIN_PASSWORD (10+ characters)");
  }

  // ─── Hero Section ───
  const hero = await prisma.heroSection.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title_en:
        "I Build the Systems Running Cairo's Pharmacies, Gyms & Clinics.",
      title_ar:
        "أنا اللي بيبني الأنظمة اللي بتشغّل صيدليات وعيادات وجيمات القاهرة.",
      subtitle_en:
        "Custom software that cuts costs, stops waste, and runs itself — so you can focus on your business.",
      subtitle_ar:
        "برامج مخصوصة بتقلل التكاليف، بتوقف الهدر، وبتشتغل لوحدها — عشان تركّز على شغلتك.",
    },
  });
  console.log("✓ Hero section created");

  // ─── Services (6) ───
  const servicesData = [
    {
      icon: "Pill",
      title_en: "Pharmacy Management System",
      title_ar: "نظام إدارة الصيدليات",
      description_en:
        "Complete pharmacy solution — inventory, expiry alerts, sales reports, supplier management.",
      description_ar:
        "حل متكامل للصيدليات — مخزون وتنبيهات انتهاء الصلاحية وتقارير المبيعات.",
      order: 0,
      featured: true,
    },
    {
      icon: "Dumbbell",
      title_en: "Gym & Fitness Management",
      title_ar: "نظام إدارة الجيم",
      description_en:
        "Member subscriptions, attendance tracking, trainer management, payment automation.",
      description_ar:
        "اشتراكات الأعضاء، تتبع الحضور، إدارة المدربين، أتمتة المدفوعات.",
      order: 1,
      featured: true,
    },
    {
      icon: "Stethoscope",
      title_en: "Clinic Management System",
      title_ar: "نظام إدارة العيادات",
      description_en:
        "Patient records, appointment scheduling, doctor management, billing system.",
      description_ar:
        "سجلات المرضى، جدولة المواعيد، إدارة الأطباء، نظام الفواتير.",
      order: 2,
      featured: true,
    },
    {
      icon: "ShoppingCart",
      title_en: "POS & Inventory Systems",
      title_ar: "أنظمة نقاط البيع والمخازن",
      description_en:
        "Point of sale for retail, restaurants, and cafes with real-time inventory.",
      description_ar:
        "نقاط بيع للتجزئة والمطاعم والمقاهي مع إدارة مخزون فوري.",
      order: 3,
      featured: true,
    },
    {
      icon: "Globe",
      title_en: "Web Development",
      title_ar: "تطوير المواقع",
      description_en:
        "Professional websites, landing pages, web apps built with modern technologies.",
      description_ar:
        "مواقع احترافية، صفحات هبوط، تطبيقات ويب بأحدث التقنيات.",
      order: 4,
      featured: true,
    },
    {
      icon: "Smartphone",
      title_en: "Mobile Applications",
      title_ar: "تطبيقات الجوال",
      description_en:
        "iOS and Android apps with seamless UX — React Native or Flutter.",
      description_ar:
        "تطبيقات iOS وAndroid بتجربة مستخدم سلسة — React Native أو Flutter.",
      order: 5,
      featured: true,
    },
  ];

  for (const service of servicesData) {
    await prisma.service.create({ data: service });
  }
  console.log("✓ 6 services created");

  // Projects and testimonials are NOT seeded: the seed used to invent three client projects
  // («Al-Shifa Pharmacy: 40% less medicine wastage»…) and two testimonials, and they went live
  // on /portfolio. Add real ones from the admin (Our work) only.

  // ─── Site Settings ───
  const settingsData: Record<string, string> = {
    site_name_en: "Elmasry Tech",
    site_name_ar: "المصري تك",
    tagline_en: "Web · Mobile · Systems · SaaS",
    tagline_ar: "ويب · موبايل · أنظمة · SaaS",
    whatsapp: "+201000000000",
    email: "faris@elmasry.tech",
    location_en: "Cairo, Egypt",
    location_ar: "القاهرة، مصر",
    linkedin: "",
    github: "https://github.com/fariselmasry",
    available: "true",
    cv_url: "",
    primary_color: "#1E6FFF",
  };

  for (const [key, value] of Object.entries(settingsData)) {
    await prisma.siteSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  console.log("✓ Site settings seeded");

  console.log("\n✅ Database seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
