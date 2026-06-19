"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const t = useTranslations("sections");
  const params = useParams();
  const locale = (params.locale as string) || "en";

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-900" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-blue-500/8 rounded-full blur-[80px] animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <h2 className="font-[family-name:var(--font-poppins)] text-3xl md:text-5xl font-bold text-white mb-4">
          {t("cta_title")}
        </h2>
        <p className="text-lg text-slate-400 mb-8">
          {t("cta_sub")}
        </p>

        {/* Service types */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(locale === "ar"
            ? ["مواقع", "تطبيقات موبايل", "أنظمة إدارة", "أتمتة"]
            : ["Websites", "Mobile Apps", "Management Systems", "Automation"]
          ).map((item) => (
            <span
              key={item}
              className="px-4 py-1.5 text-sm rounded-full border border-blue-500/30 text-blue-300 bg-blue-500/5"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Button
            variant="primary"
            size="lg"
            href={`/${locale}/contact`}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            {locale === "ar" ? "ابدأ مشروعك" : "Start a Project"}
          </Button>
          <Button variant="outline" size="lg" href={`/${locale}/portfolio`}>
            {locale === "ar" ? "شوف الأعمال" : "View Portfolio"}
          </Button>
        </div>
        <p className="text-sm text-slate-500 italic">
          {locale === "ar"
            ? "كول استكشافي مجاني. من غير التزام."
            : "Free discovery call. No commitment."}
        </p>
      </div>
    </section>
  );
}
