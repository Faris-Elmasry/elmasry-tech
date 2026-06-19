"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { contactSchema, type ContactFormData } from "@/lib/validators";
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle, CheckCircle } from "lucide-react";

const serviceOptions = [
  { value: "pharmacy", label: "Pharmacy System" },
  { value: "gym", label: "Gym System" },
  { value: "clinic", label: "Clinic System" },
  { value: "pos", label: "POS & Inventory" },
  { value: "web", label: "Website" },
  { value: "mobile", label: "Mobile App" },
  { value: "other", label: "Other" },
];

const serviceOptionsAr = [
  { value: "pharmacy", label: "نظام صيدلية" },
  { value: "gym", label: "نظام جيم" },
  { value: "clinic", label: "نظام عيادة" },
  { value: "pos", label: "نقاط بيع ومخازن" },
  { value: "web", label: "موقع إلكتروني" },
  { value: "mobile", label: "تطبيق موبايل" },
  { value: "other", label: "أخرى" },
];

export default function ContactPage() {
  const t = useTranslations("contact");
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const isAr = locale === "ar";
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: "other" },
  });

  const messageValue = watch("message", "");

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 429) {
        setSubmitError(isAr ? "رسائل كتير. حاول تاني بعد ساعة." : "Too many messages. Please try again in an hour.");
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        setSubmitError(err.error || (isAr ? "حصل خطأ" : "Something went wrong"));
        return;
      }

      setSubmitted(true);
      reset();
    } catch {
      setSubmitError(isAr ? "خطأ في الاتصال. حاول تاني." : "Connection error. Please try again.");
    }
  };

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

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10">
          {/* Left — Contact Info */}
          <div className="space-y-6">
            <Card>
              <h2 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-[var(--text-primary)] mb-2">
                {isAr ? "ابدأ مشروعك" : "Let's Start a Project"}
              </h2>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                {isAr ? "املا الفورم أو تواصل مباشرة." : "Fill in the form or reach out directly."}
              </p>

              <div className="space-y-4">
                <a href="mailto:faris@elmasry.tech" className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-blue-400 transition-colors">
                  <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                  faris@elmasry.tech
                </a>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "+201000000000"}`} className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-blue-400 transition-colors">
                  <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                  WhatsApp
                </a>
                <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                  {isAr ? "القاهرة، مصر" : "Cairo, Egypt"}
                </div>
              </div>

              <div className="flex gap-2 mt-6 pt-4 border-t border-[var(--border)]">
                <a href="https://github.com/fariselmasry" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[var(--text-muted)] hover:text-blue-400 hover:bg-white/5 transition-colors" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com/in/fariselmasry" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[var(--text-muted)] hover:text-blue-400 hover:bg-white/5 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </Card>

            <Button
              variant="primary"
              fullWidth
              size="lg"
              leftIcon={<MessageCircle className="h-4 w-4" />}
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "+201000000000"}?text=${encodeURIComponent("مرحبا فارس، أنا مهتم بخدماتك")}`}
            >
              {t("whatsapp")}
            </Button>
          </div>

          {/* Right — Form */}
          <Card>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{t("success")}</h3>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-blue-400 hover:underline mt-4 cursor-pointer"
                >
                  {isAr ? "ابعت رسالة تانية" : "Send another message"}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label={t("name")}
                    {...register("name")}
                    error={errors.name?.message}
                    required
                  />
                  <Input
                    label={t("email")}
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label={t("phone")}
                    placeholder="+20 1XX XXX XXXX"
                    {...register("phone")}
                    error={errors.phone?.message}
                  />
                  <Input
                    label={t("company")}
                    {...register("company")}
                    error={errors.company?.message}
                  />
                </div>
                <Select
                  label={t("service")}
                  options={isAr ? serviceOptionsAr : serviceOptions}
                  {...register("service")}
                  error={errors.service?.message}
                  required
                />
                <Textarea
                  label={t("message")}
                  {...register("message")}
                  error={errors.message?.message}
                  required
                  showCharCount
                  maxLength={2000}
                  value={messageValue}
                />

                {submitError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {submitError}
                  </div>
                )}

                <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
                  {t("submit")}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}
