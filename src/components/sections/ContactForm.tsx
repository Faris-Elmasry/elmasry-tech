"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactSchema, contactServices, type ContactFormData } from "@/lib/validators";
import { cn } from "@/lib/utils";

const field =
  "w-full border-0 border-b border-[var(--border-hover)] bg-transparent px-0 py-3 text-lg text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] transition-colors duration-500 focus:border-[var(--accent)] focus:outline-none focus:ring-0 aria-[invalid=true]:border-[var(--danger)]";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[var(--text-muted)]">
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

function Group({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  // A floated legend behaves like a normal box (no border notch), which lets it
  // sit in the margin column next to its fields.
  return (
    <fieldset className="border-t border-[var(--border)] pt-7">
      <legend className="float-start mb-6 flex w-full items-baseline gap-3 sm:mb-0 sm:block sm:w-[9rem]">
        <span className="font-mono text-sm text-[var(--accent)]">
          {n}
        </span>
        <span className="title-sm text-lg font-bold sm:mt-2 sm:block">{title}</span>
      </legend>
      <div className="clear-both min-w-0 space-y-7 sm:clear-none sm:ms-[11rem]">{children}</div>
    </fieldset>
  );
}

/**
 * Contact form with a live preview: as the visitor types, a phone beside the
 * form composes the exact message we will receive — so they see it's simple,
 * human and going to a real inbox. Posts to /api/contact (unchanged schema).
 */
export function ContactForm({
  serviceLabels,
  initialService,
}: {
  serviceLabels: Record<(typeof contactServices)[number], string>;
  initialService?: string;
}) {
  const t = useTranslations("contact");
  const [sent, setSent] = useState<ContactFormData | null>(null);
  const [submitError, setSubmitError] = useState("");

  const preset = contactServices.includes(initialService as (typeof contactServices)[number])
    ? (initialService as (typeof contactServices)[number])
    : "other";

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service: preset, name: "", email: "", phone: "", company: "", message: "", website: "" },
  });
  const live = useWatch({ control });
  const shown = sent ?? live;

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kind: "contact", page: window.location.pathname }),
      });
      if (res.status === 429) return setSubmitError(t("error_rate"));
      if (!res.ok) return setSubmitError(t("error_generic"));
      setSent(data);
      reset({ service: preset, name: "", email: "", phone: "", company: "", message: "", website: "" });
    } catch {
      setSubmitError(t("error_network"));
    }
  };

  const describe = (id: keyof ContactFormData) => (errors[id] ? `${id}-error` : undefined);

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        {sent ? (
          <div className="swap-in flex min-h-[26rem] flex-col items-start justify-center" role="status">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]">
              <Check className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 className="mt-6 title-sm text-3xl font-bold">{t("success_title")}</h2>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-[var(--text-muted)]">{t("success")}</p>
            <button type="button" onClick={() => setSent(null)} className="link-draw mt-8 cursor-pointer text-[var(--accent)]">
              {t("again")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
            <Group n="01" title={t("step_1")}>
              <div className="grid gap-7 sm:grid-cols-2">
                <Field id="name" label={t("name")} error={errors.name && t("error_name")}>
                  <input id="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={describe("name")} {...register("name")} />
                </Field>
                <Field id="company" label={t("company")} error={errors.company && t("error_long")}>
                  <input id="company" autoComplete="organization" className={field} {...register("company")} />
                </Field>
                <Field id="phone" label={t("phone")} error={errors.phone && t("error_phone")}>
                  <input id="phone" type="tel" autoComplete="tel" dir="ltr" placeholder="01X XXXX XXXX" className={cn(field, "text-start rtl:text-end")} aria-invalid={!!errors.phone} aria-describedby={describe("phone")} {...register("phone")} />
                </Field>
                <Field id="email" label={t("email")} error={errors.email && t("error_email")}>
                  <input id="email" type="email" autoComplete="email" dir="ltr" className={cn(field, "text-start rtl:text-end")} aria-invalid={!!errors.email} aria-describedby={describe("email")} {...register("email")} />
                </Field>
              </div>
            </Group>

            <Group n="02" title={t("step_2")}>
              <div role="radiogroup" aria-label={t("service")} className="flex flex-wrap gap-2">
                {contactServices.map((value) => {
                  const on = live.service === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setValue("service", value, { shouldValidate: true })}
                      className={cn(
                        "cursor-pointer rounded-full border px-4 py-2.5 text-[0.95rem] transition-[background-color,border-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        on
                          ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]"
                          : "border-[var(--border-hover)] text-[var(--text-muted)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      {serviceLabels[value]}
                    </button>
                  );
                })}
              </div>
              <input type="hidden" {...register("service")} />
            </Group>

            <Group n="03" title={t("step_3")}>
              <Field id="message" label={t("message")} error={errors.message && t("error_long")}>
                <textarea
                  id="message"
                  rows={4}
                  placeholder={t("message_hint")}
                  className={cn(field, "resize-none")}
                  aria-invalid={!!errors.message}
                  aria-describedby={describe("message")}
                  {...register("message")}
                />
              </Field>
            </Group>

            {/* Honeypot: a zero-size box (no overflow, so RTL pages don't grow sideways); bots fill it, people never see it. */}
            <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
              <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            {submitError && (
              <p role="alert" className="rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 p-4 text-[var(--danger)]">
                {submitError}
              </p>
            )}

            <div className="sm:ps-[11rem]">
              <Button type="submit" size="lg" loading={isSubmitting} rightIcon={<ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" />}>
                {t("submit")}
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Live preview of the message we will receive */}
      <aside className="lg:col-span-5" aria-label={t("preview_label")}>
        <div className="lg:sticky lg:top-24">
          <p className="label mb-4">{t("preview_label")}</p>
          <div className="mx-auto w-full max-w-[22rem] rounded-[2.6rem] border border-[var(--border-hover)] bg-[#0c0c0d] p-2.5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
            <div className="overflow-hidden rounded-[2.1rem] bg-[#0d1110]">
              <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[#17191a] px-4 pb-3 pt-9">
                <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] font-mono text-sm font-bold text-[var(--accent-ink)]">
                  e/
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{t("preview_to")}</p>
                  <p className="text-xs text-[var(--text-muted)]">{t("preview_status")}</p>
                </div>
              </div>
              <div className="flex min-h-[22rem] flex-col justify-end gap-2.5 px-3 py-4">
                <Bubble
                  shown={shown}
                  serviceLabels={serviceLabels}
                  delivered={!!sent}
                  copy={{ empty: t("preview_empty"), hello: t("preview_hello"), from: t("preview_from"), need: t("preview_need"), sent: t("preview_sent") }}
                />
                {sent && (
                  <p className="swap-in max-w-[85%] self-start rounded-2xl rounded-es-sm bg-[#202224] px-3 py-2 text-[0.95rem] leading-snug">
                    {t("success")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Bubble({
  shown,
  serviceLabels,
  delivered,
  copy,
}: {
  shown: Partial<ContactFormData>;
  serviceLabels: Record<(typeof contactServices)[number], string>;
  delivered: boolean;
  copy: { empty: string; hello: string; from: string; need: string; sent: string };
}) {
  const name = shown.name?.trim();
  const company = shown.company?.trim();
  const message = shown.message?.trim();
  const empty = !name && !message;
  return (
    <div className="self-end max-w-[88%] rounded-2xl rounded-ee-sm bg-[#1d3b2c] px-3.5 py-2.5 text-[0.95rem] leading-relaxed">
      {empty ? (
        <p className="text-[#c4bfb5]">{copy.empty}</p>
      ) : (
        <>
          {name && (
            <p>
              {copy.hello} <span className="font-semibold">{name}</span>
              {company ? ` ${copy.from} ${company}` : ""}.
            </p>
          )}
          {shown.service && (
            <p className="mt-1">
              {copy.need} <span className="font-semibold">{serviceLabels[shown.service]}</span>
            </p>
          )}
          {message && <p className="mt-1 whitespace-pre-line break-words">{message}</p>}
        </>
      )}
      <p className="mt-1 flex items-center justify-end gap-1 text-[0.7rem] text-[#c4bfb5]">
        {delivered && <span>{copy.sent}</span>}
        <CheckCheck aria-hidden="true" className={cn("h-3.5 w-3.5", delivered ? "text-[#53bdeb]" : "text-[var(--text-subtle)]")} />
      </p>
    </div>
  );
}
