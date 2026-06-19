"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";

interface Project {
  id: number; title_en: string; title_ar: string; slug: string;
  description_en: string; description_ar: string; long_desc_en: string; long_desc_ar: string;
  category: string; tech_stack: string[]; roi_metric?: string | null;
  live_url?: string | null; github_url?: string | null; client_name?: string | null;
  results_en?: string | null; results_ar?: string | null;
  featured: boolean; order: number;
}

const categoryOptions = [
  { value: "system", label: "System" }, { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" }, { value: "saas", label: "SaaS" }, { value: "other", label: "Other" },
];

const emptyProject: Omit<Project, "id"> = {
  title_en: "", title_ar: "", slug: "", description_en: "", description_ar: "",
  long_desc_en: "", long_desc_ar: "", category: "system", tech_stack: [],
  roi_metric: "", live_url: "", github_url: "", client_name: "",
  results_en: "", results_ar: "", featured: false, order: 0,
};

export default function PortfolioManagerPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchProjects = () => {
    setLoading(true);
    fetch("/api/projects").then((r) => r.json()).then((d) => { setProjects(d.data || []); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(fetchProjects, []);

  const openNew = () => { setEditing({ ...emptyProject, order: projects.length }); setTechInput(""); setEditModal(true); };
  const openEdit = (p: Project) => { setEditing({ ...p }); setTechInput(p.tech_stack.join(", ")); setEditModal(true); };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const data = { ...editing, tech_stack: techInput.split(",").map((s) => s.trim()).filter(Boolean) };
    const isNew = !editing.id;
    const url = isNew ? "/api/projects" : `/api/projects/${editing.slug}`;
    const method = isNew ? "POST" : "PUT";
    try {
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setEditModal(false);
      fetchProjects();
    } catch {}
    setSaving(false);
  };

  const deleteProject = async (slug: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${slug}`, { method: "DELETE" });
    fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)]">Portfolio Manager</h1>
        <Button variant="primary" size="sm" onClick={openNew} leftIcon={<Plus className="h-4 w-4" />}>Add Project</Button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-24 bg-[var(--bg-card)] rounded-xl animate-pulse" />)}</div>
      ) : projects.length === 0 ? (
        <Card className="text-center py-12"><p className="text-[var(--text-muted)]">No projects yet</p></Card>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <Card key={project.id} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-navy-700 to-blue-900/50 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-blue-500/30">{project.slug.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-[var(--text-primary)] text-sm">{project.title_en}</span>
                  <Badge variant="blue" size="sm">{project.category}</Badge>
                  {project.featured && <Badge variant="green" size="sm">Featured</Badge>}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.tech_stack.slice(0, 4).map((t) => <Badge key={t} variant="outline" size="sm" mono>{t}</Badge>)}
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-white/5 text-[var(--text-muted)] transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <button onClick={() => openEdit(project)} className="p-2 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-blue-400 transition-colors cursor-pointer"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => deleteProject(project.slug)} className="p-2 rounded-lg hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="h-4 w-4" /></button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit/Create Modal */}
      <Modal open={editModal} onOpenChange={setEditModal} title={editing?.id ? "Edit Project" : "New Project"} maxWidth="max-w-3xl">
        {editing && (
          <div className="space-y-4 mt-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Title (EN)" value={editing.title_en || ""} onChange={(e) => setEditing({ ...editing, title_en: e.target.value })} />
              <Input label="Title (AR)" value={editing.title_ar || ""} onChange={(e) => setEditing({ ...editing, title_ar: e.target.value })} dir="rtl" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Slug" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto-generated if empty" />
              <Select label="Category" options={categoryOptions} value={editing.category || "system"} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Textarea label="Short Desc (EN)" value={editing.description_en || ""} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} />
              <Textarea label="Short Desc (AR)" value={editing.description_ar || ""} onChange={(e) => setEditing({ ...editing, description_ar: e.target.value })} dir="rtl" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Textarea label="Full Desc (EN)" value={editing.long_desc_en || ""} onChange={(e) => setEditing({ ...editing, long_desc_en: e.target.value })} />
              <Textarea label="Full Desc (AR)" value={editing.long_desc_ar || ""} onChange={(e) => setEditing({ ...editing, long_desc_ar: e.target.value })} dir="rtl" />
            </div>
            <Input label="Tech Stack (comma separated)" value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Laravel, React, MySQL" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Results (EN)" value={editing.results_en || ""} onChange={(e) => setEditing({ ...editing, results_en: e.target.value })} />
              <Input label="Results (AR)" value={editing.results_ar || ""} onChange={(e) => setEditing({ ...editing, results_ar: e.target.value })} dir="rtl" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <Input label="Client Name" value={editing.client_name || ""} onChange={(e) => setEditing({ ...editing, client_name: e.target.value })} />
              <Input label="ROI Metric" value={editing.roi_metric || ""} onChange={(e) => setEditing({ ...editing, roi_metric: e.target.value })} placeholder="40% less waste" />
              <Input label="Order" type="number" value={editing.order ?? 0} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Live URL" value={editing.live_url || ""} onChange={(e) => setEditing({ ...editing, live_url: e.target.value })} />
              <Input label="GitHub URL" value={editing.github_url || ""} onChange={(e) => setEditing({ ...editing, github_url: e.target.value })} />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editing.featured || false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="rounded" />
              <span className="text-sm text-[var(--text-primary)]">Featured on homepage</span>
            </label>
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
