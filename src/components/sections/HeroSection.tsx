"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, MessageCircle } from "lucide-react";

interface HeroData {
  title_en: string;
  title_ar: string;
  subtitle_en: string;
  subtitle_ar: string;
  badge_en: string;
  badge_ar: string;
  cta_primary_en: string;
  cta_primary_ar: string;
  cta_secondary_en: string;
  cta_secondary_ar: string;
  image_url?: string | null;
}

interface HeroSectionProps {
  hero: HeroData;
}

const stagger = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  },
};

export function HeroSection({ hero }: HeroSectionProps) {
  const t = useTranslations("hero");
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const title1 = t("title1");
  const title2 = t("title2");

  // Split title2 for gradient effect — first part gets gradient
  const words2 = title2.split(" ");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg-primary)]">
      {/* Decorative bg */}
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            variants={stagger.container}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div variants={stagger.item}>
              <Badge variant="green" size="md">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                {t("badge")}
              </Badge>
            </motion.div>

            {/* Headline — Authority Variant */}
            <motion.h1
              variants={stagger.item}
              className="font-[family-name:var(--font-poppins)] font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight"
            >
              <span className="text-[var(--text-primary)]">{title1}</span>
              <br />
              <span className="text-gradient">{words2.slice(0, 3).join(" ")}</span>
              {words2.length > 3 && (
                <span className="text-[var(--text-primary)]"> {words2.slice(3).join(" ")}</span>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={stagger.item}
              className="text-lg text-[var(--text-muted)] max-w-xl leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={stagger.item} className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href={`/${locale}/portfolio`}>
                {t("cta_primary")}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href={`/${locale}/contact`}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                {t("cta_secondary")}
              </Button>
            </motion.div>

            {/* Trust text */}
            <motion.p
              variants={stagger.item}
              className="text-sm text-[var(--text-subtle)] italic"
            >
              {t("trust")}
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={stagger.item}
              className="flex items-center gap-8 pt-4"
            >
              {[
                { end: 50, suffix: "+", label: t("stat1_label") },
                { end: 5, suffix: "+", label: t("stat2_label") },
                { end: 100, suffix: "%", label: t("stat3_label") },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <AnimatedCounter
                    end={stat.end}
                    suffix={stat.suffix}
                    className="text-2xl text-[var(--text-primary)]"
                  />
                  <span className="text-xs text-[var(--text-muted)] mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-4 glow-blue animate-float">
              {/* Profile placeholder */}
              <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-navy-700 to-navy-600 flex items-center justify-center overflow-hidden">
                {hero.image_url ? (
                  <img
                    src={hero.image_url}
                    alt="Faris Elmasry"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl font-bold text-blue-500/30 font-[family-name:var(--font-poppins)]">
                    FE
                  </span>
                )}
              </div>

              {/* Floating tags */}
              <div className="absolute -top-3 -right-3 animate-float" style={{ animationDelay: "1s" }}>
                <Badge variant="red" size="md" mono>Laravel</Badge>
              </div>
              <div className="absolute -bottom-3 -left-3 animate-float" style={{ animationDelay: "2s" }}>
                <Badge variant="blue" size="md" mono>React</Badge>
              </div>
              <div className="absolute top-6 -left-4 animate-float" style={{ animationDelay: "0.5s" }}>
                <Badge variant="green" size="sm">✓ Available</Badge>
              </div>

              {/* Services metric card */}
              <div className="absolute -bottom-6 -right-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-3 shadow-xl">
                <div className="text-sm font-medium text-blue-400 font-[family-name:var(--font-poppins)]">
                  Web · Mobile · Systems
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  Full-stack solutions
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
