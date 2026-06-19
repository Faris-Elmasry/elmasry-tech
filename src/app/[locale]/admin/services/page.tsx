"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";

interface Service {
  id: number; title_en: string; title_ar: string; description_en: string;
  description_ar: string; icon: string; order: number; featured: boolean;
}

const defaultService = { title_en: "", title_ar: "", description_en: "", description_ar: "", icon: "Code", order: 0, featured: false };

export default function ServicesManagerPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchServices = () => {
    setLoading(true);
    fetch("/api/services").then((r) => r.json()).then((d) => { setServices(d.data || []); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(fetchServices, []);

  const openNew = () => { setEditing({ ...defaultService, order: services.length }); setEditModal(true); };
  const openEdit = (s: Service) => { setEditing({ ...s }); setEditModal(true); };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing.id;
    const url = isNew ? "/api/services" : `/api/services/${editing.id}`;
    const method = isNew ? "POST" : "PUT";
    try {
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      setEditModal(false);
      fetchServices();
    } catch {}
    setSaving(false);
  };

  const deleteService = async (id: number) => {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    fetchServices();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)]">Services Manager</h1>
        <Button variant="primary" size="sm" onClick={openNew} leftIcon={<Plus className="h-4 w-4" />}>Add Service</Button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 bg-[var(--bg-card)] rounded-xl animate-pulse" />)}</div>
      ) : services.length === 0 ? (
        <Card className="text-center py-12"><p className="text-[var(--text-muted)]">No services yet</p></Card>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <Card key={service.id} className="flex items-center gap-4">
              <GripVertical className="h-4 w-4 text-[var(--text-subtle)] shrink-0 cursor-grab" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-[var(--text-primary)] text-sm">{service.title_en}</span>
                  <Badge variant="blue" size="sm">{service.icon}</Badge>
                  {service.featured && <Badge variant="green" size="sm">Featured</Badge>}
                </div>
                <p className="text-xs text-[var(--text-muted)] truncate">{service.description_en}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => openEdit(service)} className="p-2 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-blue-400 transition-colors cursor-pointer" aria-label="Edit">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => deleteService(service.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-400 transition-colors cursor-pointer" aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit/Create Modal */}
      <Modal open={editModal} onOpenChange={setEditModal} title={editing?.id ? "Edit Service" : "New Service"} maxWidth="max-w-2xl">
        {editing && (
          <div className="space-y-4 mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Title (EN)" value={editing.title_en || ""} onChange={(e) => setEditing({ ...editing, title_en: e.target.value })} />
              <Input label="Title (AR)" value={editing.title_ar || ""} onChange={(e) => setEditing({ ...editing, title_ar: e.target.value })} dir="rtl" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Textarea label="Description (EN)" value={editing.description_en || ""} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} />
              <Textarea label="Description (AR)" value={editing.description_ar || ""} onChange={(e) => setEditing({ ...editing, description_ar: e.target.value })} dir="rtl" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <Input label="Icon Name" value={editing.icon || ""} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} placeholder="e.g. Pill, Dumbbell" />
              <Input label="Order" type="number" value={editing.order ?? 0} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) })} />
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.featured || false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="rounded border-[var(--border)]" />
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
