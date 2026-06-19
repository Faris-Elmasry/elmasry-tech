"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { changePasswordSchema, type ChangePasswordFormData } from "@/lib/validators";
import { Save, Lock, Globe, Mail, Phone, Palette } from "lucide-react";

interface SettingsData { [key: string]: string }

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  const { register: pwRegister, handleSubmit: pwSubmit, formState: { errors: pwErrors }, reset: pwReset } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((d) => { setSettings(d.data || {}); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const updateField = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    setSaving(true); setMessage("");
    const updates = Object.entries(settings).map(([key, value]) => ({ key, value }));
    try {
      const res = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ updates }) });
      setMessage(res.ok ? "✓ Settings saved" : "✗ Failed to save");
    } catch { setMessage("✗ Error saving"); }
    setSaving(false);
  };

  const changePassword = async (data: ChangePasswordFormData) => {
    setPwSaving(true); setPwMessage("");
    try {
      const res = await fetch("/api/admin/change-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (res.ok) { setPwMessage("✓ Password changed"); pwReset(); }
      else setPwMessage(`✗ ${json.error}`);
    } catch { setPwMessage("✗ Error"); }
    setPwSaving(false);
  };

  if (loading) return <div className="h-96 bg-[var(--bg-card)] rounded-xl animate-pulse" />;

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)]">Settings</h1>

      {message && <div className={`p-3 rounded-lg text-sm ${message.includes("✓") ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>{message}</div>}

      {/* Site Info */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-4 w-4 text-blue-400" />
          <h2 className="font-semibold text-[var(--text-primary)]">Site Information</h2>
        </div>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Site Name (EN)" value={settings.site_name_en || ""} onChange={(e) => updateField("site_name_en", e.target.value)} />
            <Input label="Site Name (AR)" value={settings.site_name_ar || ""} onChange={(e) => updateField("site_name_ar", e.target.value)} dir="rtl" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Tagline (EN)" value={settings.tagline_en || ""} onChange={(e) => updateField("tagline_en", e.target.value)} />
            <Input label="Tagline (AR)" value={settings.tagline_ar || ""} onChange={(e) => updateField("tagline_ar", e.target.value)} dir="rtl" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Location (EN)" value={settings.location_en || ""} onChange={(e) => updateField("location_en", e.target.value)} />
            <Input label="Location (AR)" value={settings.location_ar || ""} onChange={(e) => updateField("location_ar", e.target.value)} dir="rtl" />
          </div>
        </div>
      </Card>

      {/* Contact */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-4 w-4 text-blue-400" />
          <h2 className="font-semibold text-[var(--text-primary)]">Contact & Social</h2>
        </div>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Email" value={settings.email || ""} onChange={(e) => updateField("email", e.target.value)} />
            <Input label="WhatsApp" value={settings.whatsapp || ""} onChange={(e) => updateField("whatsapp", e.target.value)} placeholder="+201XXXXXXXXX" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="LinkedIn URL" value={settings.linkedin || ""} onChange={(e) => updateField("linkedin", e.target.value)} />
            <Input label="GitHub URL" value={settings.github || ""} onChange={(e) => updateField("github", e.target.value)} />
          </div>
          <Input label="CV Download URL" value={settings.cv_url || ""} onChange={(e) => updateField("cv_url", e.target.value)} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Brand Color" type="color" value={settings.primary_color || "#1E6FFF"} onChange={(e) => updateField("primary_color", e.target.value)} className="h-11" />
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={settings.available === "true"} onChange={(e) => updateField("available", e.target.checked ? "true" : "false")} className="rounded" />
                <span className="text-sm text-[var(--text-primary)]">Available for projects</span>
              </label>
            </div>
          </div>
        </div>
      </Card>

      <Button variant="primary" onClick={saveSettings} loading={saving} leftIcon={<Save className="h-4 w-4" />}>Save All Settings</Button>

      {/* Change Password */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-4 w-4 text-blue-400" />
          <h2 className="font-semibold text-[var(--text-primary)]">Change Password</h2>
        </div>
        {pwMessage && <div className={`p-3 rounded-lg text-sm mb-4 ${pwMessage.includes("✓") ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>{pwMessage}</div>}
        <form onSubmit={pwSubmit(changePassword)} className="space-y-4">
          <Input label="Current Password" type="password" {...pwRegister("currentPassword")} error={pwErrors.currentPassword?.message} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="New Password" type="password" {...pwRegister("newPassword")} error={pwErrors.newPassword?.message} />
            <Input label="Confirm Password" type="password" {...pwRegister("confirmPassword")} error={pwErrors.confirmPassword?.message} />
          </div>
          <Button type="submit" variant="outline" loading={pwSaving}>Change Password</Button>
        </form>
      </Card>
    </div>
  );
}
