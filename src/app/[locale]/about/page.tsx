"use client";

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
import { MapPin, Download, Briefcase, GraduationCap, Heart, MessageSquare, Target } from "lucide-react";

const skills = [
  { name: "Laravel", pct: 90 },
  { name: "React / Next.js", pct: 85 },
  { name: "Vue.js", pct: 80 },
  { name: "MySQL / PostgreSQL", pct: 88 },
  { name: "Flutter", pct: 75 },
  { name: "Node.js", pct: 78 },
  { name: "Docker", pct: 65 },
  { name: "AWS / Vercel", pct: 70 },
];

const timeline = [
  {
    icon: Briefcase, current: true,
    title_en: "Faris Elmasry Solutions — Full-Stack Developer & Founder",
    title_ar: "حلول فارس الماصري — مطور Full-Stack ومؤسس",
    period: "2023 – Present",
  },
  {
    icon: Briefcase, current: false,
    title_en: "Software Developer — Freelance Projects",
    title_ar: "مطور برمجيات — مشاريع حرة",
    period: "2021 – 2023",
  },
  {
    icon: GraduationCap, current: false,
    title_en: "B.Sc. Computer Science",
    title_ar: "بكالوريوس علوم حاسب",
    period: "2017 – 2021",
  },
];

const values = [
  { icon: Target, key: "values_quality" },
  { icon: MessageSquare, key: "values_communication" },
  { icon: Heart, key: "values_results" },
];

function SkillBar({ name, pct }: { name: string; pct: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-[var(--text-primary)] font-medium">{name}</span>
        <span className="text-[var(--text-muted)]">{pct}%</span>
      </div>
      <div className="h-2 bg-[var(--bg-card)] rounded-full overflow-hidden border border-[var(--border)]">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export default function AboutPage() {
  const t = useTranslations("about");
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isAr = locale === "ar";

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-navy-900 to-[var(--bg-primary)] pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-navy-700 to-navy-600 flex items-center justify-center border-4 border-blue-500/30 shrink-0">
            <span className="text-4xl font-bold text-blue-500/40 font-[family-name:var(--font-poppins)]">FE</span>
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-poppins)] text-4xl font-bold text-[var(--text-primary)] mb-2">
              Faris Elmasry
            </h1>
            <p className="text-lg text-[var(--text-muted)] mb-2">{t("subtitle")}</p>
            <div className="flex items-center gap-2 text-sm text-[var(--text-subtle)]">
              <MapPin className="h-4 w-4 text-blue-400" />
              {isAr ? "القاهرة، مصر" : "Cairo, Egypt"}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[var(--text-primary)] mb-4">{t("title")}</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">{t("story_p1")}</p>
          <p className="text-[var(--text-muted)] leading-relaxed">{t("story_p2")}</p>
        </div>
      </SectionWrapper>

      {/* Skills */}
      <SectionWrapper className="bg-[var(--bg-secondary)]/50">
        <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">{t("skills_title")}</h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-5 max-w-3xl mx-auto">
          {skills.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} pct={skill.pct} />
          ))}
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper>
        <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">
          {isAr ? "الخبرة" : "Experience"}
        </h2>
        <div className="max-w-2xl mx-auto space-y-0">
          {timeline.map((item, i) => (
            <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
              {/* Line */}
              {i < timeline.length - 1 && (
                <div className="absolute top-10 left-5 w-px h-[calc(100%-2.5rem)] bg-[var(--border)]" />
              )}
              {/* Dot */}
              <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center border-2 ${item.current ? "bg-blue-500/10 border-blue-500" : "bg-[var(--bg-card)] border-[var(--border)]"}`}>
                <item.icon className={`h-4 w-4 ${item.current ? "text-blue-500" : "text-[var(--text-muted)]"}`} />
              </div>
              {/* Content */}
              <div className="pt-1.5">
                <h3 className="font-medium text-[var(--text-primary)] text-sm">{isAr ? item.title_ar : item.title_en}</h3>
                <p className="text-xs text-[var(--text-subtle)] mt-0.5">{item.period}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper className="bg-[var(--bg-secondary)]/50">
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((val, i) => (
            <Card key={i} variant="elevated" className="text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <val.icon className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-sm text-[var(--text-muted)] italic leading-relaxed">
                &ldquo;{t(val.key)}&rdquo;
              </p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Download CV */}
      <SectionWrapper>
        <div className="text-center">
          <Button variant="primary" size="lg" leftIcon={<Download className="h-4 w-4" />} disabled>
            {t("download_cv")}
          </Button>
          <p className="text-xs text-[var(--text-subtle)] mt-2">
            {isAr ? "سيتم إضافته قريباً" : "Coming soon"}
          </p>
        </div>
      </SectionWrapper>

      <CTASection />
      <Footer />
    </main>
  );
}
