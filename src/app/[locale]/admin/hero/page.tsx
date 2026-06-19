"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { Save, RotateCcw } from "lucide-react";

interface HeroData {
  title_en: string; title_ar: string;
  subtitle_en: string; subtitle_ar: string;
  badge_en: string; badge_ar: string;
  cta_primary_en: string; cta_primary_ar: string;
  cta_secondary_en: string; cta_secondary_ar: string;
  image_url?: string | null;
}

export default function HeroEditorPage() {
  const [original, setOriginal] = useState<HeroData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [previewLang, setPreviewLang] = useState<"en" | "ar">("en");

  const { register, handleSubmit, reset, watch } = useForm<HeroData>();
  const watched = watch();

  useEffect(() => {
    fetch("/api/hero").then((r) => r.json()).then((d) => {
      const data = d.data;
      setOriginal(data);
      reset(data);
    }).catch(() => {});
  }, [reset]);

  const onSubmit = async (data: HeroData) => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage("✓ Saved successfully");
        setOriginal(data);
      } else {
        setMessage("✗ Failed to save");
      }
    } catch { setMessage("✗ Error saving"); }
    setSaving(false);
  };

  if (!original) return <div className="animate-pulse h-96 bg-[var(--bg-card)] rounded-xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)]">Hero Editor</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => reset(original)} leftIcon={<RotateCcw className="h-4 w-4" />}>
            Discard
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit(onSubmit)} loading={saving} leftIcon={<Save className="h-4 w-4" />}>
            Save Changes
          </Button>
        </div>
      </div>

      {message && (
        <div className={`p-3 rounded-lg text-sm ${message.includes("✓") ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
          {message}
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        {/* Form */}
        <Card>
          <form className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Badge (EN)" {...register("badge_en")} />
              <Input label="Badge (AR)" {...register("badge_ar")} dir="rtl" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Textarea label="Title (EN)" {...register("title_en")} />
              <Textarea label="Title (AR)" {...register("title_ar")} dir="rtl" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Textarea label="Subtitle (EN)" {...register("subtitle_en")} />
              <Textarea label="Subtitle (AR)" {...register("subtitle_ar")} dir="rtl" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="CTA Primary (EN)" {...register("cta_primary_en")} />
              <Input label="CTA Primary (AR)" {...register("cta_primary_ar")} dir="rtl" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="CTA Secondary (EN)" {...register("cta_secondary_en")} />
              <Input label="CTA Secondary (AR)" {...register("cta_secondary_ar")} dir="rtl" />
            </div>
            <Input label="Profile Image URL" {...register("image_url")} placeholder="https://..." />
          </form>
        </Card>

        {/* Preview */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <button onClick={() => setPreviewLang("en")} className={`px-3 py-1 text-xs rounded-full cursor-pointer ${previewLang === "en" ? "bg-blue-500 text-white" : "border border-[var(--border)] text-[var(--text-muted)]"}`}>EN</button>
            <button onClick={() => setPreviewLang("ar")} className={`px-3 py-1 text-xs rounded-full cursor-pointer ${previewLang === "ar" ? "bg-blue-500 text-white" : "border border-[var(--border)] text-[var(--text-muted)]"}`}>AR</button>
          </div>
          <Card className="bg-navy-900 border-navy-700 overflow-hidden">
            <div className={`p-4 space-y-3 ${previewLang === "ar" ? "text-right" : ""}`} dir={previewLang === "ar" ? "rtl" : "ltr"}>
              <Badge variant="green" size="sm">{previewLang === "ar" ? watched.badge_ar : watched.badge_en}</Badge>
              <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white leading-tight">
                {previewLang === "ar" ? watched.title_ar : watched.title_en}
              </h3>
              <p className="text-xs text-slate-400">{previewLang === "ar" ? watched.subtitle_ar : watched.subtitle_en}</p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="blue" size="sm">{previewLang === "ar" ? watched.cta_primary_ar : watched.cta_primary_en}</Badge>
                <Badge variant="outline" size="sm">{previewLang === "ar" ? watched.cta_secondary_ar : watched.cta_secondary_en}</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
