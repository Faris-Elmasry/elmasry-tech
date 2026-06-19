"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { MapPin, ArrowRight } from "lucide-react";

const skills = [
  ["Laravel", "Node.js", "MySQL", "PostgreSQL"],
  ["React", "Vue.js", "Next.js", "Tailwind"],
  ["Flutter", "React Native", "iOS", "Android"],
];

export function AboutTeaser() {
  const t = useTranslations("about");
  const ts = useTranslations("sections");
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="about">
      <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left — Image Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-md mx-auto lg:mx-0"
        >
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden aspect-[4/5]">
            <div className="w-full h-full bg-gradient-to-br from-navy-700 to-navy-600 flex items-center justify-center">
              <span className="text-7xl font-bold text-blue-500/20 font-[family-name:var(--font-poppins)]">
                FE
              </span>
            </div>
          </div>
          {/* Floating badges */}
          <div className="absolute bottom-4 left-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-3 py-2">
            <span className="text-xl font-bold text-blue-400 font-[family-name:var(--font-poppins)]">5+</span>
            <span className="text-xs text-[var(--text-muted)] ml-1">
              {locale === "ar" ? "سنوات" : "Years"}
            </span>
          </div>
          <div className="absolute top-4 right-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-3 py-2 flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-blue-400" />
            <span className="text-xs text-[var(--text-muted)]">
              {locale === "ar" ? "القاهرة" : "Cairo"}
            </span>
          </div>
          {/* Services breadth badge */}
          <div className="absolute -bottom-3 -right-3 bg-[var(--bg-secondary)] border border-blue-500/30 rounded-lg px-3 py-2 shadow-lg">
            <span className="text-xs text-blue-400 font-medium">
              {locale === "ar" ? "ويب · موبايل · أنظمة" : "Web · Mobile · Systems"}
            </span>
          </div>
        </motion.div>

        {/* Right — Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5"
        >
          <Badge variant="blue" size="md">{ts("about_title")}</Badge>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
            {t("subtitle")}
          </h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            {t("description")}
          </p>

          {/* Skills */}
          <div className="space-y-2 pt-2">
            {skills.map((row, i) => (
              <div key={i} className="flex flex-wrap gap-2">
                {row.map((skill) => (
                  <Badge key={skill} variant="outline" size="md" mono>
                    {skill}
                  </Badge>
                ))}
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            href={`/${locale}/about`}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            {locale === "ar" ? "اقرأ قصتي الكاملة" : "Read My Full Story"}
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
