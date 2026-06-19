"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { localize } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

interface Service {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  icon: string;
  order: number;
  featured: boolean;
}

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const t = useTranslations("sections");
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="services">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="blue" size="md" className="mb-4">
          {t("services_title")}
        </Badge>
        <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
          {t("services_title")}
        </h2>
        <p className="text-[var(--text-muted)] max-w-xl mx-auto">
          {t("services_sub")}
        </p>
      </div>

      {/* Grid */}
      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[service.icon] || LucideIcons.Code;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card variant="elevated" className="h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                  <IconComponent className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {localize(service, "title", locale)}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  {localize(service, "description", locale)}
                </p>
                <span className="text-sm text-blue-400 font-medium">
                  {locale === "ar" ? "اعرف أكتر →" : "Learn More →"}
                </span>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
