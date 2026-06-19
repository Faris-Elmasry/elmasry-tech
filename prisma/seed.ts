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
  const hashedPassword = await hash("Admin@123", 12);
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@elmasry.tech" },
    update: {},
    create: {
      email: "admin@elmasry.tech",
      password: hashedPassword,
      name: "Faris Elmasry",
      role: "admin",
    },
  });
  console.log("✓ Admin user created:", admin.email);

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

  // ─── Projects (3) ───
  const projectsData = [
    {
      slug: "al-shifa-pharmacy",
      category: "system",
      featured: true,
      order: 0,
      title_en: "Al-Shifa Pharmacy Management System",
      title_ar: "نظام إدارة صيدليات الشفاء",
      description_en:
        "Complete inventory, sales, and expiry management for a multi-branch Cairo pharmacy.",
      description_ar:
        "إدارة متكاملة للمخزون والمبيعات وانتهاء الصلاحية لصيدلية متعددة الفروع في القاهرة.",
      long_desc_en:
        "A comprehensive pharmacy management system built for Al-Shifa, a multi-branch pharmacy chain in Cairo. The system handles real-time inventory tracking across all branches, automated expiry date alerts, detailed sales analytics, and supplier relationship management. Built with Laravel and MySQL for reliability and performance.",
      long_desc_ar:
        "نظام إدارة صيدليات شامل مبني لصيدلية الشفاء، سلسلة صيدليات متعددة الفروع في القاهرة. النظام بيدير تتبع المخزون بشكل فوري في كل الفروع، تنبيهات أوتوماتيكية لتواريخ الانتهاء، تحليلات مبيعات تفصيلية، وإدارة علاقات الموردين.",
      tech_stack: ["Laravel", "MySQL", "Bootstrap", "jQuery"],
      roi_metric: "40% less medicine wastage",
      client_name: "Al-Shifa Pharmacy, Cairo",
      results_en:
        "Reduced expired medicine waste by 40% in month one. Daily reconciliation cut from 2 hours to 15 minutes. Zero stock-outs in 6 months.",
      results_ar:
        "قلّل هدر الأدوية المنتهية 40% في أول شهر. تسوية يومية انخفضت من ساعتين لـ 15 دقيقة. صفر نفاد مخزون في 6 شهور.",
    },
    {
      slug: "powerfit-gym",
      category: "system",
      featured: true,
      order: 1,
      title_en: "PowerFit Gym Management Platform",
      title_ar: "منصة إدارة جيم باورفيت",
      description_en:
        "Full member lifecycle — subscriptions, attendance, trainer scheduling, automated renewals.",
      description_ar:
        "دورة حياة عضو كاملة — اشتراكات، حضور، جدولة مدربين، تجديدات أوتوماتيكية.",
      long_desc_en:
        "A complete gym management platform for PowerFit in Giza. Manages the full member lifecycle from registration to renewal, including subscription management, QR-based attendance tracking, trainer schedule management, and automated payment reminders. Features a dashboard with real-time analytics.",
      long_desc_ar:
        "منصة إدارة جيم كاملة لباورفيت في الجيزة. بتدير دورة حياة العضو كاملة من التسجيل للتجديد، بما فيها إدارة الاشتراكات، تتبع الحضور بـ QR، إدارة جداول المدربين، وتذكيرات المدفوعات الأوتوماتيكية.",
      tech_stack: ["Laravel", "Vue.js", "MySQL", "Tailwind CSS"],
      roi_metric: "200+ members managed automatically",
      client_name: "PowerFit Gym, Giza",
      results_en:
        "Automated subscriptions for 200+ members. Saved 3 hours/day of admin work. Reduced missed payments to zero.",
      results_ar:
        "أوتمت اشتراكات 200+ عضو. وفّر 3 ساعات يومياً من العمل الإداري. قلّل المدفوعات الفايتة لصفر.",
    },
    {
      slug: "dr-mostafa-clinic",
      category: "system",
      featured: true,
      order: 2,
      title_en: "Dr. Mostafa Clinic Booking System",
      title_ar: "نظام حجز عيادة د. مصطفى",
      description_en:
        "Online appointment booking, patient records, prescription management for a specialist clinic.",
      description_ar:
        "حجز مواعيد أونلاين، سجلات مرضى، إدارة روشتات لعيادة متخصصة.",
      long_desc_en:
        "An online booking and patient management system for Dr. Mostafa's specialist clinic in Cairo. Patients can book appointments 24/7, and the system manages patient records, prescription history, billing, and doctor availability. Eliminated double-bookings entirely and reduced reception calls by 60%.",
      long_desc_ar:
        "نظام حجز أونلاين وإدارة مرضى لعيادة د. مصطفى المتخصصة في القاهرة. المرضى يقدروا يحجزوا مواعيد 24/7، والنظام بيدير سجلات المرضى، تاريخ الروشتات، الفواتير، ومواعيد الدكتور.",
      tech_stack: ["Laravel", "React", "MySQL", "Tailwind CSS"],
      roi_metric: "Zero double-bookings since launch",
      client_name: "Dr. Mostafa Clinic, Cairo",
      results_en:
        "Eliminated double-bookings. 24/7 online booking. Reception calls reduced by 60%. Patients arrive with full history pre-loaded.",
      results_ar:
        "أنهى الحجز المزدوج تماماً. حجز أونلاين 24/7. مكالمات استقبال انخفضت 60%. المرضى يصلوا وتاريخهم الطبي محمّل.",
    },
  ];

  for (const project of projectsData) {
    await prisma.project.create({ data: project });
  }
  console.log("✓ 3 projects created");

  // ─── Testimonials (2) ───
  const testimonialsData = [
    {
      client_name: "Ahmed Mostafa",
      client_title_en: "Pharmacy Owner",
      client_title_ar: "صاحب صيدلية",
      client_company: "Al-Shifa Pharmacy",
      text_en:
        "The system completely changed how we manage inventory. We stopped losing money on expired medicines — and now I check everything from my phone.",
      text_ar:
        "النظام غيّر طريقة إدارة المخزون عندنا بالكامل. وقفنا نخسر في الأدوية المنتهية — ودلوقتي بتابع كل حاجة من موبايلي.",
      rating: 5,
      featured: true,
    },
    {
      client_name: "Mohamed Saber",
      client_title_en: "Gym Owner",
      client_title_ar: "صاحب جيم",
      client_company: "PowerFit Gym",
      text_en:
        "Managing 200+ members manually was exhausting. Now everything is automatic — renewals, attendance, payments. I wish I had this 3 years ago.",
      text_ar:
        "إدارة 200 عضو يدوياً كانت مرهقة. دلوقتي كل حاجة أوتوماتيك — تجديدات، حضور، مدفوعات. يا ريت كان عندي ده من 3 سنين.",
      rating: 5,
      featured: true,
    },
  ];

  for (const testimonial of testimonialsData) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log("✓ 2 testimonials created");

  // ─── Site Settings ───
  const settingsData: Record<string, string> = {
    site_name_en: "Elmasry Tech Solutions",
    site_name_ar: "إلماسري تك",
    tagline_en: "Web · Mobile · Systems · SaaS",
    tagline_ar: "ويب · موبايل · أنظمة · SaaS",
    whatsapp: "+201000000000",
    email: "faris@elmasry.tech",
    location_en: "Cairo, Egypt",
    location_ar: "القاهرة، مصر",
    linkedin: "https://linkedin.com/in/fariselmasry",
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
