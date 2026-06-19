"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { localize } from "@/lib/utils";
import { CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import * as LucideIcons from "lucide-react";

// Use the global services instead of the specific pharmacy/gym ones
const services = [
  {
    id: 1,
    icon: "Globe",
    title_en: "Web Development",
    title_ar: "تطوير الويب",
    description_en: "Professional, scalable web applications and platforms built with modern technologies.",
    description_ar: "تطبيقات ومنصات ويب احترافية وقابلة للتوسع مبنية بأحدث التقنيات.",
  },
  {
    id: 2,
    icon: "Smartphone",
    title_en: "Mobile Applications",
    title_ar: "تطبيقات الجوال",
    description_en: "High-performance iOS and Android apps delivering seamless user experiences.",
    description_ar: "تطبيقات عالية الأداء لأنظمة iOS و Android تقدم تجربة مستخدم سلسة.",
  },
  {
    id: 3,
    icon: "LayoutDashboard",
    title_en: "Custom Management Systems",
    title_ar: "أنظمة الإدارة المخصصة",
    description_en: "Tailored ERP, CRM, and management solutions designed for your specific business workflow.",
    description_ar: "حلول تخطيط موارد المؤسسات وإدارة علاقات العملاء مصممة خصيصًا لسير عملك.",
  },
  {
    id: 4,
    icon: "BrainCircuit",
    title_en: "AI Solutions",
    title_ar: "حلول الذكاء الاصطناعي",
    description_en: "Integrating smart AI capabilities to enhance data analysis, predictions, and automated tasks.",
    description_ar: "دمج قدرات الذكاء الاصطناعي لتحسين تحليل البيانات والتوقعات والمهام المؤتمتة.",
  },
  {
    id: 5,
    icon: "Settings",
    title_en: "Process Automation",
    title_ar: "أتمتة العمليات",
    description_en: "Streamline operations by automating repetitive tasks, reducing errors and saving time.",
    description_ar: "تبسيط العمليات من خلال أتمتة المهام المتكررة، وتقليل الأخطاء وتوفير الوقت.",
  },
  {
    id: 6,
    icon: "ShoppingCart",
    title_en: "E-Commerce & POS",
    title_ar: "التجارة الإلكترونية ونقاط البيع",
    description_en: "Complete sales solutions for online and physical retail with real-time inventory management.",
    description_ar: "حلول مبيعات متكاملة للتجزئة الإلكترونية والفعلية مع إدارة فورية للمخزون.",
  },
];

const features: Record<string, { en: string[]; ar: string[] }> = {
  Globe: {
    en: ["Responsive design", "Custom web apps", "SEO optimized", "High performance", "Secure architecture"],
    ar: ["تصميم متجاوب", "تطبيقات ويب مخصصة", "محسّن للسيو", "أداء عالي", "بنية آمنة"],
  },
  Smartphone: {
    en: ["iOS & Android support", "Native-like performance", "Push notifications", "App Store deployment", "Offline capabilities"],
    ar: ["دعم iOS و Android", "أداء كالتطبيقات الأصلية", "إشعارات فورية", "نشر على المتاجر", "دعم العمل بدون إنترنت"],
  },
  LayoutDashboard: {
    en: ["Custom CRM/ERP", "Real-time analytics", "Role-based access", "Third-party integrations", "Scalable database"],
    ar: ["أنظمة ERP/CRM مخصصة", "تحليلات فورية", "صلاحيات متعددة", "ربط مع خدمات خارجية", "قواعد بيانات قابلة للتوسع"],
  },
  BrainCircuit: {
    en: ["Predictive analytics", "Chatbots & NLP", "Data insights", "Workflow optimization", "Custom AI models"],
    ar: ["تحليلات توقعية", "روبوتات دردشة الذكاء الاصطناعي", "استخراج البيانات", "تحسين سير العمل", "نماذج ذكاء اصطناعي مخصصة"],
  },
  Settings: {
    en: ["Task automation", "API connections", "Error reduction", "Time-saving workflows", "Business intelligence"],
    ar: ["أتمتة المهام", "ربط الواجهات البرمجية", "تقليل الأخطاء", "سير عمل يوفر الوقت", "ذكاء الأعمال"],
  },
  ShoppingCart: {
    en: ["Online stores", "POS integration", "Inventory tracking", "Payment gateways", "Sales reports"],
    ar: ["متاجر إلكترونية", "ربط نقاط البيع", "تتبع المخزون", "بوابات الدفع", "تقارير المبيعات"],
  },
};

const pricingTiers = [
  {
    name_en: "Starter", name_ar: "مبدئي", type_en: "Websites", type_ar: "مواقع",
    price: "5,000", delivery_en: "2–3 weeks", delivery_ar: "2–3 أسابيع",
    support_en: "3 months support", support_ar: "3 شهور دعم",
    features_en: ["Responsive website", "Contact form", "SEO basics", "Hosting setup", "3 revisions"],
    features_ar: ["موقع متجاوب", "نموذج تواصل", "أساسيات السيو", "إعداد الاستضافة", "3 تعديلات"],
  },
  {
    name_en: "Business", name_ar: "أعمال", type_en: "Management Systems", type_ar: "أنظمة إدارة",
    price: "15,000", delivery_en: "4–8 weeks", delivery_ar: "4–8 أسابيع",
    support_en: "6 months support", support_ar: "6 شهور دعم", popular: true,
    features_en: ["Full management system", "Admin dashboard", "Reports & analytics", "Mobile responsive", "Training session"],
    features_ar: ["نظام إدارة كامل", "لوحة تحكم", "تقارير وتحليلات", "متجاوب للموبايل", "جلسة تدريب"],
  },
  {
    name_en: "Enterprise", name_ar: "مؤسسي", type_en: "Custom ERP/SaaS", type_ar: "ERP/SaaS مخصص",
    price: "40,000", delivery_en: "8–16 weeks", delivery_ar: "8–16 أسبوع",
    support_en: "12 months support", support_ar: "12 شهر دعم",
    features_en: ["Multi-tenant SaaS", "AI integrations", "Custom workflows", "Priority support", "Full documentation"],
    features_ar: ["SaaS متعدد المستأجرين", "دمج الذكاء الاصطناعي", "سير عمل مخصص", "دعم أولوية", "توثيق كامل"],
  },
];

const faqData = [
  {
    q_en: "How long does a custom project take?",
    q_ar: "كم يستغرق المشروع المخصص؟",
    a_en: "A standard web or mobile app takes 4–6 weeks. Complex enterprise systems may take 8–10 weeks.",
    a_ar: "تطبيقات الويب أو الجوال القياسية تستغرق 4-6 أسابيع. قد تستغرق أنظمة المؤسسات المعقدة 8-10 أسابيع.",
  },
  {
    q_en: "Can I pay in installments?",
    q_ar: "هل يمكنني الدفع بالتقسيط؟",
    a_en: "Yes! I offer flexible payment plans. Typically 40% upfront, 30% at midpoint, and 30% on delivery.",
    a_ar: "نعم! أقدم خطط سداد مرنة. عادة 40٪ مقدماً، 30٪ في المنتصف، و 30٪ عند التسليم.",
  },
  {
    q_en: "Do you provide training after delivery?",
    q_ar: "هل توفر التدريب بعد التسليم؟",
    a_en: "Absolutely. Every project includes a training session for your team, plus documentation and video tutorials.",
    a_ar: "بالتأكيد. يتضمن كل مشروع جلسة تدريب لفريقك، بالإضافة إلى التوثيق ومقاطع فيديو تعليمية.",
  },
  {
    q_en: "Can the system work on mobile?",
    q_ar: "هل يمكن للنظام العمل على الهواتف المحمولة؟",
    a_en: "All my systems are mobile-responsive by default. If you need a dedicated mobile app, we can discuss that as an add-on.",
    a_ar: "جميع أنظمتي متجاوبة مع الهواتف المحمولة بشكل افتراضي. إذا كنت بحاجة إلى تطبيق هاتف مخصص، فيمكننا مناقشة ذلك كإضافة.",
  },
  {
    q_en: "What happens if something breaks after launch?",
    q_ar: "ماذا يحدث إذا تعطل شيء ما بعد الإطلاق؟",
    a_en: "All projects come with free support (3–12 months depending on tier). After that, I offer affordable maintenance plans.",
    a_ar: "تأتي جميع المشاريع مع دعم مجاني (3-12 شهراً حسب الباقة). بعد ذلك، أقدم خطط صيانة بأسعار معقولة.",
  },
  {
    q_en: "Do you work with businesses outside Egypt?",
    q_ar: "هل تعمل مع شركات خارج مصر؟",
    a_en: "Yes! I work remotely with clients worldwide. All communication happens via WhatsApp, Zoom, and email.",
    a_ar: "نعم! أعمل عن بعد مع عملاء في جميع أنحاء العالم. يتم التواصل عبر WhatsApp و Zoom والبريد الإلكتروني.",
  },
];

const processSteps = [
  { num: "01", title_en: "Discovery", title_ar: "الاستكشاف", desc_en: "We talk about your business and what you need (30 min free call)", desc_ar: "نتحدث عن عملك وما تحتاجه (مكالمة مجانية لمدة 30 دقيقة)" },
  { num: "02", title_en: "Proposal", title_ar: "العرض", desc_en: "I send a detailed scope, timeline, and price within 48 hours", desc_ar: "أرسل نطاقًا تفصيليًا وجدولًا زمنيًا وسعرًا خلال 48 ساعة" },
  { num: "03", title_en: "Development", title_ar: "التطوير", desc_en: "I build in sprints with weekly updates and demos", desc_ar: "أقوم بالبناء على مراحل مع تحديثات أسبوعية وعروض" },
  { num: "04", title_en: "Delivery", title_ar: "التسليم", desc_en: "Full handover, training, and free support period", desc_ar: "تسليم كامل، تدريب، وفترة دعم مجانية" },
];

export default function ServicesPage() {
  const t = useTranslations("services_page");
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isAr = locale === "ar";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-navy-900 to-[var(--bg-primary)] pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-3">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* Services Sections */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-24">
        {services.map((service, index) => {
          const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[service.icon] || LucideIcons.Code;
          const featureList = features[service.icon];
          const isEven = index % 2 === 0;

          return (
            <ServiceBlock
              key={service.id}
              service={service}
              locale={locale}
              Icon={IconComponent}
              features={featureList ? (isAr ? featureList.ar : featureList.en) : []}
              reverse={!isEven}
              index={index}
              requestLabel={t("request_service")}
            />
          );
        })}
      </div>

      {/* Process */}
      <SectionWrapper className="bg-[var(--bg-secondary)]/50">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[var(--text-primary)]">
            {t("process_title")}
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <Card key={i} variant="default" className="text-center relative">
              <div className="text-4xl font-bold text-blue-500/20 font-[family-name:var(--font-poppins)] mb-2">{step.num}</div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{isAr ? step.title_ar : step.title_en}</h3>
              <p className="text-sm text-[var(--text-muted)]">{isAr ? step.desc_ar : step.desc_en}</p>
              {i < 3 && <div className="hidden md:block absolute top-1/2 -right-3 text-blue-500/30">→</div>}
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Pricing */}
      <SectionWrapper>
        <div className="text-center mb-4">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[var(--text-primary)]">{t("pricing_title")}</h2>
          <p className="text-sm text-[var(--text-muted)] mt-2">{t("pricing_note")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {pricingTiers.map((tier, i) => (
            <Card key={i} variant={tier.popular ? "elevated" : "default"} className={`relative ${tier.popular ? "border-blue-500/50 ring-1 ring-blue-500/20" : ""}`}>
              {tier.popular && (
                <Badge variant="blue" size="sm" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  {isAr ? "الأكثر طلباً" : "Most Popular"}
                </Badge>
              )}
              <div className="text-center mb-6 pt-2">
                <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[var(--text-primary)]">{isAr ? tier.name_ar : tier.name_en}</h3>
                <p className="text-sm text-[var(--text-muted)]">{isAr ? tier.type_ar : tier.type_en}</p>
                <div className="mt-3">
                  <span className="text-sm text-[var(--text-muted)]">{isAr ? "من" : "From"} </span>
                  <span className="text-3xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)]">{tier.price}</span>
                  <span className="text-sm text-[var(--text-muted)]"> EGP</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {(isAr ? tier.features_ar : tier.features_en).map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="text-xs text-[var(--text-subtle)] text-center mb-4">
                {isAr ? tier.delivery_ar : tier.delivery_en} · {isAr ? tier.support_ar : tier.support_en}
              </div>
              <Button variant={tier.popular ? "primary" : "outline"} fullWidth href={`/${locale}/contact`}>
                {isAr ? "اطلب عرض سعر" : "Get a Quote"}
              </Button>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper className="bg-[var(--bg-secondary)]/50">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[var(--text-primary)]">{t("faq_title")}</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((faq, i) => (
            <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className="font-medium text-[var(--text-primary)] text-sm">{isAr ? faq.q_ar : faq.q_en}</span>
                <ChevronDown className={`h-4 w-4 text-[var(--text-muted)] shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-5 pb-5"
                >
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{isAr ? faq.a_ar : faq.a_en}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>

      <CTASection />
      <Footer />
    </main>
  );
}

// ─── Service Block Component ───
function ServiceBlock({
  service, locale, Icon, features: feats, reverse, index, requestLabel,
}: {
  service: any; locale: string; Icon: React.ComponentType<{ className?: string }>;
  features: string[]; reverse: boolean; index: number; requestLabel: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? "lg:direction-rtl" : ""}`}
      id={service.icon.toLowerCase()}
    >
      <div className={reverse ? "lg:order-2" : ""}>
        <div className="bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-8 flex items-center justify-center aspect-[4/3]">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Icon className="h-10 w-10 text-blue-500" />
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {feats.slice(0, 3).map((f, i) => (
                <Badge key={i} variant="outline" size="sm" mono>{f}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-blue-500" />
          </div>
          <Badge variant="blue" size="sm">{service.icon}</Badge>
        </div>
        <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[var(--text-primary)] mb-3">
          {localize(service, "title", locale)}
        </h2>
        <p className="text-[var(--text-muted)] leading-relaxed mb-5">
          {localize(service, "description", locale)}
        </p>
        <ul className="space-y-2.5 mb-6">
          {feats.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Button variant="outline" href={`/${locale}/contact?service=${service.icon.toLowerCase()}`} rightIcon={<ArrowRight className="h-4 w-4" />}>
          {requestLabel}
        </Button>
      </div>
    </motion.div>
  );
}
