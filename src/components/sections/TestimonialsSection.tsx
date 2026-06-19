"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { localize } from "@/lib/utils";

interface Testimonial {
  id: number;
  client_name: string;
  client_title_en: string;
  client_title_ar: string;
  client_company: string;
  client_avatar?: string | null;
  text_en: string;
  text_ar: string;
  rating: number;
  featured: boolean;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const t = useTranslations("sections");
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [paused, next, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <SectionWrapper id="testimonials" className="bg-[var(--bg-secondary)]/50">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="blue" size="md" className="mb-4">
          {t("testimonials_title")}
        </Badge>
        <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
          {t("testimonials_title")}
        </h2>
      </div>

      {/* Carousel */}
      <div
        className="max-w-2xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-8 text-center">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonials[current].rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg leading-relaxed text-[var(--text-primary)] mb-6 italic">
                &ldquo;{localize(testimonials[current], "text", locale)}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {testimonials[current].client_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="text-left">
                  <div className="font-medium text-[var(--text-primary)]">
                    {testimonials[current].client_name}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">
                    {localize(testimonials[current], "client_title", locale)} — {testimonials[current].client_company}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all cursor-pointer ${
                  i === current
                    ? "w-6 h-2 bg-blue-500"
                    : "w-2 h-2 bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
