"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { Plus, Pencil, Trash2, Star } from "lucide-react";

interface Testimonial {
  id: number; client_name: string; client_title_en: string; client_title_ar: string;
  client_company: string; text_en: string; text_ar: string; rating: number; featured: boolean;
}

const emptyTestimonial = {
  client_name: "", client_title_en: "", client_title_ar: "", client_company: "",
  text_en: "", text_ar: "", rating: 5, featured: false,
};

export default function TestimonialsManagerPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch("/api/testimonials").then((r) => r.json()).then((d) => { setTestimonials(d.data || []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(fetchData, []);

  const openNew = () => { setEditing({ ...emptyTestimonial }); setEditModal(true); };
  const openEdit = (t: Testimonial) => { setEditing({ ...t }); setEditModal(true); };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing.id;
    const url = isNew ? "/api/testimonials" : `/api/testimonials/${editing.id}`;
    const method = isNew ? "POST" : "PUT";
    try {
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      setEditModal(false); fetchData();
    } catch {}
    setSaving(false);
  };

  const deleteItem = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)]">Testimonials</h1>
        <Button variant="primary" size="sm" onClick={openNew} leftIcon={<Plus className="h-4 w-4" />}>Add</Button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-24 bg-[var(--bg-card)] rounded-xl animate-pulse" />)}</div>
      ) : testimonials.length === 0 ? (
        <Card className="text-center py-12"><p className="text-[var(--text-muted)]">No testimonials yet</p></Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <Card key={t.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    {t.client_name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)] text-sm">{t.client_name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t.client_title_en} — {t.client_company}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-blue-400 transition-colors cursor-pointer"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => deleteItem(t.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">{Array.from({length: 5}).map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`} />)}</div>
              <p className="text-sm text-[var(--text-muted)] line-clamp-3 italic">&ldquo;{t.text_en}&rdquo;</p>
              {t.featured && <Badge variant="green" size="sm" className="mt-2">Featured</Badge>}
            </Card>
          ))}
        </div>
      )}

      <Modal open={editModal} onOpenChange={setEditModal} title={editing?.id ? "Edit Testimonial" : "New Testimonial"} maxWidth="max-w-2xl">
        {editing && (
          <div className="space-y-4 mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Client Name" value={editing.client_name || ""} onChange={(e) => setEditing({ ...editing, client_name: e.target.value })} />
              <Input label="Company" value={editing.client_company || ""} onChange={(e) => setEditing({ ...editing, client_company: e.target.value })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Title (EN)" value={editing.client_title_en || ""} onChange={(e) => setEditing({ ...editing, client_title_en: e.target.value })} />
              <Input label="Title (AR)" value={editing.client_title_ar || ""} onChange={(e) => setEditing({ ...editing, client_title_ar: e.target.value })} dir="rtl" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Textarea label="Testimonial (EN)" value={editing.text_en || ""} onChange={(e) => setEditing({ ...editing, text_en: e.target.value })} />
              <Textarea label="Testimonial (AR)" value={editing.text_ar || ""} onChange={(e) => setEditing({ ...editing, text_ar: e.target.value })} dir="rtl" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Rating</label>
                <div className="flex gap-1">{Array.from({length: 5}).map((_, i) => (
                  <button key={i} onClick={() => setEditing({ ...editing, rating: i + 1 })} className="cursor-pointer">
                    <Star className={`h-6 w-6 transition-colors ${i < (editing.rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-gray-600 hover:text-yellow-300"}`} />
                  </button>
                ))}</div>
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.featured || false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="rounded" />
                  <span className="text-sm text-[var(--text-primary)]">Featured</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setEditModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={save} loading={saving}>Save</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
