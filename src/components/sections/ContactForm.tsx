"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactSchema, contactServices, type ContactFormData } from "@/lib/validators";
import { cn } from "@/lib/utils";

const field =
  "w-full border-0 border-b border-[var(--border-hover)] bg-transparent px-0 py-3 text-lg text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-0";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({
  serviceLabels,
  initialService,
}: {
  serviceLabels: Record<(typeof contactServices)[number], string>;
  initialService?: string;
}) {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const preset = contactServices.includes(initialService as (typeof contactServices)[number])
    ? (initialService as (typeof contactServices)[number])
    : "other";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: preset },
  });
  const selected = watch("service");

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 429) return setSubmitError(t("error_rate"));
      if (!res.ok) return setSubmitError(t("error_generic"));
      setSubmitted(true);
      reset({ service: preset });
    } catch {
      setSubmitError(t("error_network"));
    }
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[28rem] flex-col items-start justify-center"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--highlight)] text-[#121110]">
            <Check className="h-7 w-7" />
          </span>
          <h2 className="mt-6 font-display text-3xl font-semibold">{t("success_title")}</h2>
          <p className="mt-2 text-lg text-[var(--text-muted)]">{t("success")}</p>
          <button type="button" onClick={() => setSubmitted(false)} className="link-draw mt-8 cursor-pointer text-[var(--accent)]">
            {t("again")}
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-9" exit={{ opacity: 0 }}>
          <fieldset>
            <legend className="eyebrow">{t("service")}</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {contactServices.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected === value}
                  onClick={() => setValue("service", value, { shouldValidate: true })}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors",
                    selected === value
                      ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]"
                      : "border-[var(--border-hover)] text-[var(--text-muted)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {serviceLabels[value]}
                </button>
              ))}
            </div>
            <input type="hidden" {...register("service")} />
          </fieldset>

          <div className="grid gap-9 sm:grid-cols-2">
            <Field id="name" label={t("name")} error={errors.name?.message}>
              <input id="name" autoComplete="name" className={field} aria-invalid={!!errors.name} {...register("name")} />
            </Field>
            <Field id="email" label={t("email")} error={errors.email?.message}>
              <input id="email" type="email" autoComplete="email" dir="ltr" className={cn(field, "text-start")} aria-invalid={!!errors.email} {...register("email")} />
            </Field>
            <Field id="phone" label={t("phone")} error={errors.phone?.message}>
              <input id="phone" type="tel" autoComplete="tel" dir="ltr" placeholder="+20 1XX XXX XXXX" className={cn(field, "text-start")} aria-invalid={!!errors.phone} {...register("phone")} />
            </Field>
            <Field id="company" label={t("company")} error={errors.company?.message}>
              <input id="company" autoComplete="organization" className={field} {...register("company")} />
            </Field>
          </div>

          <Field id="message" label={t("message")} error={errors.message?.message}>
            <textarea
              id="message"
              rows={4}
              placeholder={t("message_hint")}
              className={cn(field, "resize-none")}
              aria-invalid={!!errors.message}
              {...register("message")}
            />
          </Field>

          {submitError && (
            <p role="alert" className="rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 p-4 text-sm text-[var(--danger)]">
              {submitError}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            loading={isSubmitting}
            rightIcon={<ArrowUpRight className="h-5 w-5 rtl-flip" />}
          >
            {t("submit")}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
