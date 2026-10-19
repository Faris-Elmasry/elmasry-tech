"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { changePasswordSchema, type ChangePasswordFormData } from "@/lib/validators";
import { Lock } from "lucide-react";

/**
 * The admin password. The site-name, contact and social fields that used to sit
 * here changed nothing: the public site takes them from src/lib/site.ts.
 * A password set here survives restarts and deploys (scripts/ensure-admin.mjs only
 * applies ADMIN_PASSWORD from the server when that value itself changes).
 */
const AR: Record<string, string> = {
  "Current password is required": "اكتب الباسورد الحالي",
  "Password must be at least 8 characters": "الباسورد الجديد 8 حروف على الأقل",
  "Must contain at least one uppercase letter": "لازم يكون فيه حرف إنجليزي كبير واحد على الأقل",
  "Must contain at least one number": "لازم يكون فيه رقم واحد على الأقل",
  "Please confirm your password": "اكتب الباسورد الجديد تاني",
  "Passwords don't match": "الباسوردين مش زي بعض",
  "Current password is incorrect": "الباسورد الحالي غلط",
};

export default function SettingsPage() {
  const { locale } = useParams<{ locale: string }>();
  const ar = locale === "ar";
  const tr = (m?: string) => (m && ar ? (AR[m] ?? m) : m);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const changePassword = async (data: ChangePasswordFormData) => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/change-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setMessage({ ok: true, text: ar ? "الباسورد اتغيّر" : "Password changed" });
        reset();
      } else setMessage({ ok: false, text: tr(json.error) || (ar ? "معرفناش نغيّره" : "Couldn't change it") });
    } catch {
      setMessage({ ok: false, text: ar ? "حصلت مشكلة. جرّب تاني." : "Something went wrong. Please try again." });
    }
    setSaving(false);
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">{ar ? "الباسورد" : "Password"}</h1>
      <Card>
        <div className="mb-4 flex items-center gap-2">
          <Lock className="h-4 w-4 text-[var(--accent)]" />
          <h2 className="font-semibold text-[var(--text-primary)]">{ar ? "غيّر باسورد الدخول" : "Change the sign-in password"}</h2>
        </div>
        {message && (
          <div role="status" className={`mb-4 rounded-lg p-3 text-sm ${message.ok ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit(changePassword)} className="space-y-4">
          <Input label={ar ? "الباسورد الحالي" : "Current password"} type="password" dir="ltr" autoComplete="current-password" {...register("currentPassword")} error={tr(errors.currentPassword?.message)} />
          <Input label={ar ? "الباسورد الجديد" : "New password"} type="password" dir="ltr" autoComplete="new-password" {...register("newPassword")} error={tr(errors.newPassword?.message)} />
          <Input label={ar ? "اكتبه تاني" : "Confirm it"} type="password" dir="ltr" autoComplete="new-password" {...register("confirmPassword")} error={tr(errors.confirmPassword?.message)} />
          <p className="text-sm text-[var(--text-muted)]">
            {ar ? "8 حروف على الأقل، فيها حرف إنجليزي كبير ورقم." : "At least 8 characters, with one capital letter and one number."}
          </p>
          <Button type="submit" variant="primary" loading={saving}>
            {ar ? "غيّر الباسورد" : "Change password"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
