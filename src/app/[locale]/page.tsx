import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function fetchData(path: string) {
  try {
    const res = await fetch(`${SITE_URL}/api${path}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

// ─── Fallback data so homepage always looks complete ───

const fallbackHero = {
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
  image_url: null,
};

const fallbackServices = [
  {
    id: 1,
    icon: "Globe",
    title_en: "Web Development",
    title_ar: "تطوير الويب",
    description_en: "Professional, scalable web applications and platforms built with modern technologies.",
    description_ar: "تطبيقات ومنصات ويب احترافية وقابلة للتوسع مبنية بأحدث التقنيات.",
    order: 1,
    featured: true,
  },
  {
    id: 2,
    icon: "Smartphone",
    title_en: "Mobile Applications",
    title_ar: "تطبيقات الجوال",
    description_en: "High-performance iOS and Android apps delivering seamless user experiences.",
    description_ar: "تطبيقات عالية الأداء لأنظمة iOS و Android تقدم تجربة مستخدم سلسة.",
    order: 2,
    featured: true,
  },
  {
    id: 3,
    icon: "LayoutDashboard",
    title_en: "Custom Management Systems",
    title_ar: "أنظمة الإدارة المخصصة",
    description_en: "Tailored ERP, CRM, and management solutions designed for your specific business workflow.",
    description_ar: "حلول تخطيط موارد المؤسسات وإدارة علاقات العملاء مصممة خصيصًا لسير عملك.",
    order: 3,
    featured: true,
  },
  {
    id: 4,
    icon: "BrainCircuit",
    title_en: "AI Solutions",
    title_ar: "حلول الذكاء الاصطناعي",
    description_en: "Integrating smart AI capabilities to enhance data analysis, predictions, and automated tasks.",
    description_ar: "دمج قدرات الذكاء الاصطناعي لتحسين تحليل البيانات والتوقعات والمهام المؤتمتة.",
    order: 4,
    featured: true,
  },
  {
    id: 5,
    icon: "Settings",
    title_en: "Process Automation",
    title_ar: "أتمتة العمليات",
    description_en: "Streamline operations by automating repetitive tasks, reducing errors and saving time.",
    description_ar: "تبسيط العمليات من خلال أتمتة المهام المتكررة، وتقليل الأخطاء وتوفير الوقت.",
    order: 5,
    featured: true,
  },
  {
    id: 6,
    icon: "ShoppingCart",
    title_en: "E-Commerce & POS",
    title_ar: "التجارة الإلكترونية ونقاط البيع",
    description_en: "Complete sales solutions for online and physical retail with real-time inventory management.",
    description_ar: "حلول مبيعات متكاملة للتجزئة الإلكترونية والفعلية مع إدارة فورية للمخزون.",
    order: 6,
    featured: true,
  },
];

const fallbackProjects = [
  {
    id: 1,
    title_en: "Al-Shifa Pharmacy System",
    title_ar: "نظام صيدلية الشفاء",
    slug: "al-shifa-pharmacy",
    description_en: "Complete pharmacy management system that reduced medicine wastage by 40%.",
    description_ar: "نظام إدارة صيدلية متكامل قلل هدر الأدوية بنسبة 40٪.",
    category: "system",
    tech_stack: ["Laravel", "Vue.js", "MySQL", "Tailwind"],
    roi_metric: "−40% Wastage",
    thumbnail: null,
    featured: true,
  },
  {
    id: 2,
    title_en: "PowerFit Gym Platform",
    title_ar: "منصة باورفيت جيم",
    slug: "powerfit-gym",
    description_en: "Gym management with subscription tracking and automated payment reminders.",
    description_ar: "إدارة جيم باشتراكات وحضور وتذكيرات مدفوعات أوتوماتيك.",
    category: "system",
    tech_stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    roi_metric: "200+ Members",
    thumbnail: null,
    featured: true,
  },
  {
    id: 3,
    title_en: "FoodHub Restaurant App",
    title_ar: "تطبيق فودهب للمطاعم",
    slug: "foodhub-app",
    description_en: "iOS & Android mobile app for online ordering, table reservation, and real-time tracking.",
    description_ar: "تطبيق موبايل iOS وAndroid للطلب أونلاين وحجز الطاولات وتتبع الطلبات.",
    category: "mobile",
    tech_stack: ["Flutter", "Firebase", "Node.js", "Stripe"],
    roi_metric: "3x Orders",
    thumbnail: null,
    featured: true,
  },
];

const fallbackTestimonials = [
  {
    id: 1,
    client_name: "Ahmed Mostafa",
    client_title_en: "Business Owner",
    client_title_ar: "صاحب عمل",
    client_company: "Global Retail",
    client_avatar: null,
    text_en: "The system completely transformed how we manage inventory. We stopped losing money on expired products.",
    text_ar: "النظام غيّر طريقة إدارة المخزون عندنا بالكامل. توقفنا عن خسارة الأموال بسبب المنتجات منتهية الصلاحية.",
    rating: 5,
    featured: true,
  },
  {
    id: 2,
    client_name: "Mohamed Saber",
    client_title_en: "Operations Manager",
    client_title_ar: "مدير عمليات",
    client_company: "Fitness Tech",
    client_avatar: null,
    text_en: "Managing our processes manually was a nightmare. Now everything is automated. Saved us hours every day.",
    text_ar: "إدارة عملياتنا يدوياً كانت كابوساً. الآن كل شيء مؤتمت. وفرنا ساعات كل يوم.",
    rating: 5,
    featured: true,
  },
];

export default async function LocaleHomePage() {
  const [hero, services, projects, testimonials] = await Promise.all([
    fetchData("/hero"),
    fetchData("/services"),
    fetchData("/projects?featured=true&limit=3"),
    fetchData("/testimonials?featured=true"),
  ]);

  // Using fallbackHero directly to ensure new global copy is shown immediately
  const heroData = fallbackHero;
  
  // Using fallbackServices directly to ensure the new global services are shown
  const servicesData = fallbackServices;

  const projectsData = projects && projects.length > 0 ? projects : fallbackProjects;
  const testimonialsData = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <main id="main-content">
      <Navbar />
      <HeroSection hero={heroData} />
      <ServicesSection services={servicesData} />
      <PortfolioPreview projects={projectsData} />
      <AboutTeaser />
      <TestimonialsSection testimonials={testimonialsData} />
      <CTASection />
      <Footer />
    </main>
  );
}
