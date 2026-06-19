"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { localize } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface Project {
  id: number;
  title_en: string;
  title_ar: string;
  slug: string;
  description_en: string;
  description_ar: string;
  category: string;
  tech_stack: string[];
  roi_metric?: string | null;
  thumbnail?: string | null;
  featured: boolean;
}

interface PortfolioPreviewProps {
  projects: Project[];
}

const categories = ["all", "system", "web", "mobile", "automation"];

export function PortfolioPreview({ projects }: PortfolioPreviewProps) {
  const t = useTranslations("sections");
  const tc = useTranslations("common");
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const [activeFilter, setActiveFilter] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const categoryLabels: Record<string, string> = {
    all: tc("all"),
    system: tc("systems"),
    web: tc("web"),
    mobile: tc("mobile"),
    automation: tc("automation"),
  };

  return (
    <SectionWrapper id="portfolio">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge variant="blue" size="md" className="mb-4">
          {t("portfolio_title")}
        </Badge>
        <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
          {t("portfolio_title")}
        </h2>
        <p className="text-[var(--text-muted)]">{t("portfolio_sub")}</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2 text-sm rounded-full transition-all cursor-pointer ${
              activeFilter === cat
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                : "border border-[var(--border)] text-[var(--text-muted)] hover:border-blue-500/50"
            }`}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <Card variant="elevated" padding={false} className="group overflow-hidden h-full">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-navy-700 to-blue-900/50 overflow-hidden">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={localize(project, "title", locale)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl font-bold text-blue-500/20 font-[family-name:var(--font-poppins)]">
                        {project.slug.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-navy-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="primary"
                      size="sm"
                      href={`/${locale}/portfolio/${project.slug}`}
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      {tc("view_work")}
                    </Button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="blue" size="sm">{project.category}</Badge>
                    {project.roi_metric && (
                      <Badge variant="green" size="sm">{project.roi_metric}</Badge>
                    )}
                  </div>
                  <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-[var(--text-primary)] mb-1">
                    {localize(project, "title", locale)}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-3">
                    {localize(project, "description", locale)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech_stack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" size="sm" mono>
                        {tech}
                      </Badge>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <Badge variant="outline" size="sm">
                        +{project.tech_stack.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* View All */}
      <div className="text-center mt-10">
        <Button
          variant="outline"
          href={`/${locale}/portfolio`}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          {locale === "ar" ? "شوف كل الأعمال" : "View All Projects"}
        </Button>
      </div>
    </SectionWrapper>
  );
}
