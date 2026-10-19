"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const ar = locale === "ar";
  // back to the admin page that sent you here — only an admin path of this site, never an outside URL
  const from = useSearchParams().get("callbackUrl") ?? "";
  const next = /^\/(ar|en)\/admin(\/[\w-]+)*$/.test(from) && !from.includes("/login") ? from : `/${locale}/admin/messages`;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          result.error === "TooManyAttempts"
            ? ar ? "محاولات كتير غلط. استنى ربع ساعة وجرّب تاني." : "Too many attempts. Wait 15 minutes and try again."
            : ar ? "الإيميل أو الباسورد غلط" : "Invalid email or password"
        );
        setLoading(false);
        return;
      }

      router.push(next);
      router.refresh();
    } catch {
      setError(ar ? "حصلت مشكلة. جرّب تاني." : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-primary)]">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]" dir="ltr">
            elmasry<span className="text-[var(--accent)]">/</span>tech
          </h1>
          <p className="text-[var(--text-muted)] mt-2">{ar ? "لوحة الإدارة" : "Admin"}</p>
        </div>

        {/* Login Card */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
            {ar ? "تسجيل الدخول" : "Sign in"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={ar ? "الإيميل" : "Email"}
              type="email"
              dir="ltr"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
              required
            />

            <Input
              label={ar ? "الباسورد" : "Password"}
              type={showPassword ? "text" : "password"}
              dir="ltr"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                  aria-label={showPassword ? (ar ? "اخفي الباسورد" : "Hide password") : (ar ? "اظهر الباسورد" : "Show password")}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
              required
            />

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              {ar ? "ادخل" : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
