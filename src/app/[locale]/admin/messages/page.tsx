"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { CalendarClock, Download, Inbox, Phone, Search, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { readySystems } from "@/lib/systems";
import { cn } from "@/lib/utils";

/**
 * Requests: everything people send from the website (contact form, "request
 * this system"), worked through as a small pipeline — new → contacted →
 * negotiating → won / lost — with one-tap WhatsApp/call, notes and a
 * follow-up date.
 */

interface Request {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  service: string;
  message: string;
  kind: string;
  system: string | null;
  plan: string | null;
  page: string | null;
  status: string;
  notes: string;
  followUpAt: string | null;
  createdAt: string;
}

const STATUSES = ["new", "contacted", "negotiating", "won", "lost"] as const;

const T = {
  ar: {
    title: "الطلبات",
    sub: (n: number) => `${n} طلب`,
    all: "الكل",
    due: "متابعات مستحقة",
    status: { new: "جديد", contacted: "اتكلمنا", negotiating: "بنتفاوض", won: "اتقفل ✓", lost: "مش مهتم" } as Record<string, string>,
    kind: { contact: "رسالة تواصل", quote: "طلب نظام", demo: "ديمو" } as Record<string, string>,
    plan: { cloud: "اشتراك أونلاين", local: "تثبيت عنده", source: "شراء الكود" } as Record<string, string>,
    anyKind: "كل الأنواع",
    anySystem: "كل الأنظمة",
    search: "دوّر بالاسم أو الرقم…",
    empty: "مفيش طلبات هنا.",
    whatsapp: "واتساب",
    call: "اتصال",
    notes: "ملاحظات",
    notesHint: "اتكلمنا إمتى، قال إيه، السعر اللي اتعرض…",
    save: "احفظ",
    saved: "اتحفظ",
    followUp: "تابع معاه يوم",
    clear: "شيل",
    plusDays: (d: number) => (d === 1 ? "بكره" : d === 7 ? "بعد أسبوع" : `بعد ${d} أيام`),
    del: "امسح",
    confirmDel: "تمسح الطلب ده نهائيًا؟",
    from: "من صفحة",
    email: "الإيميل",
    company: "النشاط",
    date: "التاريخ",
    exportCsv: "تصدير Excel",
    prev: "السابق",
    next: "التالي",
    hello: (name: string, what: string) => `أهلًا ${name}، معاك فارس من Elmasry Tech بخصوص طلبك${what ? ` عن ${what}` : ""}. إمتى يناسبك نتكلم؟`,
    overdue: "متأخرة",
  },
  en: {
    title: "Requests",
    sub: (n: number) => `${n} requests`,
    all: "All",
    due: "Follow-ups due",
    status: { new: "New", contacted: "Contacted", negotiating: "Negotiating", won: "Won ✓", lost: "Not interested" } as Record<string, string>,
    kind: { contact: "Contact", quote: "System request", demo: "Demo" } as Record<string, string>,
    plan: { cloud: "Online subscription", local: "Install on-site", source: "Buy the source" } as Record<string, string>,
    anyKind: "All types",
    anySystem: "All systems",
    search: "Search name or phone…",
    empty: "No requests here.",
    whatsapp: "WhatsApp",
    call: "Call",
    notes: "Notes",
    notesHint: "When you talked, what they said, the price offered…",
    save: "Save",
    saved: "Saved",
    followUp: "Follow up on",
    clear: "Clear",
    plusDays: (d: number) => (d === 1 ? "Tomorrow" : d === 7 ? "In a week" : `In ${d} days`),
    del: "Delete",
    confirmDel: "Delete this request for good?",
    from: "From page",
    email: "Email",
    company: "Business",
    date: "Date",
    exportCsv: "Export CSV",
    prev: "Previous",
    next: "Next",
    hello: (name: string, what: string) => `Hi ${name}, this is Faris from Elmasry Tech about your request${what ? ` for ${what}` : ""}. When is a good time to talk?`,
    overdue: "overdue",
  },
};

const statusTone: Record<string, string> = {
  new: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  contacted: "border-sky-400/40 bg-sky-400/10 text-sky-300",
  negotiating: "border-violet-400/40 bg-violet-400/10 text-violet-300",
  won: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  lost: "border-white/15 bg-white/5 text-[var(--text-muted)]",
};

const digits = (p: string) => p.replace(/\D/g, "");
const LIMIT = 30;

export default function RequestsPage() {
  const { locale } = useParams<{ locale: string }>();
  const isAr = locale === "ar";
  const t = isAr ? T.ar : T.en;
  const systemName = useCallback((slug: string | null) => (slug ? (readySystems.find((s) => s.slug === slug)?.name[isAr ? "ar" : "en"] ?? slug) : ""), [isAr]);

  const [items, setItems] = useState<Request[]>([]);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [dueCount, setDueCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [due, setDue] = useState(false);
  const [kind, setKind] = useState("");
  const [system, setSystem] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<Request | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) });
    if (status) params.set("status", status);
    if (due) params.set("due", "1");
    if (kind) params.set("kind", kind);
    if (system) params.set("system", system);
    if (q.trim()) params.set("q", q.trim());
    fetch(`/api/contact?${params}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setItems(d.data?.messages ?? []);
        setTotal(d.data?.total ?? 0);
        setCounts(d.data?.counts ?? {});
        setDueCount(d.data?.due ?? 0);
      })
      .finally(() => setLoading(false));
  }, [page, status, due, kind, system, q]);

  useEffect(() => {
    const id = setTimeout(load, q ? 300 : 0);
    return () => clearTimeout(id);
  }, [load, q]);

  const patch = async (id: number, data: Partial<Pick<Request, "status" | "notes" | "followUpAt">>) => {
    const res = await fetch(`/api/contact/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const d = await res.json();
    if (d.data) {
      setItems((list) => list.map((m) => (m.id === id ? d.data : m)));
      setOpen((o) => (o?.id === id ? d.data : o));
    }
    load();
  };

  const remove = async (id: number) => {
    if (!confirm(t.confirmDel)) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    setOpen(null);
    load();
  };

  const describe = (m: Request) => [t.kind[m.kind] ?? m.kind, systemName(m.system), m.plan ? t.plan[m.plan] : ""].filter(Boolean);
  const waHref = (m: Request) => `https://wa.me/${digits(m.phone ?? "")}?text=${encodeURIComponent(t.hello(m.name.split(" ")[0], systemName(m.system)))}`;
  const fmt = useMemo(() => new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-GB", { dateStyle: "medium", timeStyle: "short" }), [isAr]);
  const fmtDay = useMemo(() => new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-GB", { weekday: "short", day: "numeric", month: "short" }), [isAr]);

  const exportCsv = () => {
    const head = ["date", "name", "phone", "email", "company", "type", "system", "plan", "status", "follow_up", "message", "notes"];
    const rows = items.map((m) => [m.createdAt, m.name, m.phone, m.email, m.company, m.kind, m.system, m.plan, m.status, m.followUpAt, m.message, m.notes]);
    const csv = [head, ...rows].map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    a.download = `requests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const allCount = Object.values(counts).reduce((a, b) => a + b, 0);
  const chip = (on: boolean) =>
    cn("cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors", on ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]" : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]");
  const select = "h-10 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-3 text-sm text-[var(--text-primary)]";

  return (
    <div className="space-y-6" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t.title}</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">{t.sub(allCount)}</p>
        </div>
        <Button variant="outline" size="sm" onClick={exportCsv} leftIcon={<Download className="h-4 w-4" />} disabled={!items.length}>
          {t.exportCsv}
        </Button>
      </div>

      {/* Pipeline */}
      <div className="flex flex-wrap gap-2">
        <button className={chip(!status && !due)} onClick={() => { setStatus(""); setDue(false); setPage(1); }}>
          {t.all} ({allCount})
        </button>
        {STATUSES.map((s) => (
          <button key={s} className={chip(status === s && !due)} onClick={() => { setStatus(s); setDue(false); setPage(1); }}>
            {t.status[s]} ({counts[s] ?? 0})
          </button>
        ))}
        <button className={cn(chip(due), !due && dueCount > 0 && "border-red-400/50 text-red-300")} onClick={() => { setDue(true); setStatus(""); setPage(1); }}>
          <CalendarClock className="me-1.5 inline h-4 w-4 align-[-3px]" />
          {t.due} ({dueCount})
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <label className="relative min-w-[14rem] flex-1">
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder={t.search} aria-label={t.search} className={cn(select, "w-full ps-9")} />
        </label>
        <select value={kind} onChange={(e) => { setKind(e.target.value); setPage(1); }} className={select} aria-label={t.anyKind}>
          <option value="">{t.anyKind}</option>
          {Object.entries(t.kind).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <select value={system} onChange={(e) => { setSystem(e.target.value); setPage(1); }} className={select} aria-label={t.anySystem}>
          <option value="">{t.anySystem}</option>
          {readySystems.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name[isAr ? "ar" : "en"]}</option>
          ))}
        </select>
      </div>

      {/* List */}
      {loading && !items.length ? (
        <div className="space-y-2">{[1, 2, 3, 4].map((i) => <div key={i} className="h-24 animate-pulse rounded-xl bg-[var(--bg-card)]" />)}</div>
      ) : items.length === 0 ? (
        <Card className="py-16 text-center">
          <Inbox className="mx-auto mb-3 h-10 w-10 text-[var(--text-subtle)]" />
          <p className="text-[var(--text-muted)]">{t.empty}</p>
        </Card>
      ) : (
        <ul className="space-y-2">
          {items.map((m) => {
            const overdue = m.followUpAt && new Date(m.followUpAt) <= new Date() && !["won", "lost"].includes(m.status);
            return (
              <li key={m.id} className={cn("rounded-xl border bg-[var(--bg-card)] p-4 transition-colors", m.status === "new" ? "border-amber-400/40" : "border-[var(--border)]")}>
                <div className="flex flex-wrap items-start gap-4">
                  <button onClick={() => setOpen(m)} className="min-w-0 flex-1 cursor-pointer text-start">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-[var(--text-primary)]">{m.name}</span>
                      {m.company && <span className="text-sm text-[var(--text-muted)]">· {m.company}</span>}
                    </span>
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      {describe(m).map((d) => (
                        <span key={d} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-[var(--text-muted)]">{d}</span>
                      ))}
                    </span>
                    {m.message && <span className="mt-2 block truncate text-sm text-[var(--text-muted)]">{m.message}</span>}
                    <span className="mt-2 block text-xs text-[var(--text-subtle)]">
                      {fmt.format(new Date(m.createdAt))}
                      {m.followUpAt && (
                        <span className={cn("ms-3", overdue ? "text-red-300" : "text-[var(--text-muted)]")}>
                          <CalendarClock className="me-1 inline h-3.5 w-3.5 align-[-2px]" />
                          {fmtDay.format(new Date(m.followUpAt))}
                          {overdue ? ` · ${t.overdue}` : ""}
                        </span>
                      )}
                    </span>
                  </button>
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {m.phone && (
                      <>
                        <a href={waHref(m)} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#25D366] px-3 text-sm font-semibold text-[#06210f]">
                          <WhatsAppIcon className="h-4 w-4" />
                          {t.whatsapp}
                        </a>
                        <a href={`tel:${m.phone}`} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 text-sm" title={m.phone}>
                          <Phone className="h-4 w-4" />
                          <span dir="ltr">{m.phone}</span>
                        </a>
                      </>
                    )}
                    <select value={m.status} onChange={(e) => patch(m.id, { status: e.target.value })} aria-label={t.title} className={cn("h-9 rounded-lg border px-2 text-sm", statusTone[m.status] ?? statusTone.lost)}>
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-[var(--bg-primary)] text-[var(--text-primary)]">{t.status[s]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {total > LIMIT && (
        <div className="flex justify-center gap-2">
          <Button variant="ghost" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>{t.prev}</Button>
          <span className="py-2 text-sm text-[var(--text-muted)]">{page} / {Math.ceil(total / LIMIT)}</span>
          <Button variant="ghost" size="sm" disabled={page * LIMIT >= total} onClick={() => setPage(page + 1)}>{t.next}</Button>
        </div>
      )}

      <Modal open={!!open} onOpenChange={() => setOpen(null)} title={open?.name ?? ""} maxWidth="max-w-xl">
        {open && <Detail key={open.id} m={open} t={t} isAr={isAr} describe={describe(open)} waHref={waHref(open)} fmt={fmt} onPatch={(d) => patch(open.id, d)} onDelete={() => remove(open.id)} />}
      </Modal>
    </div>
  );
}

function Detail({
  m,
  t,
  isAr,
  describe,
  waHref,
  fmt,
  onPatch,
  onDelete,
}: {
  m: Request;
  t: typeof T.ar;
  isAr: boolean;
  describe: string[];
  waHref: string;
  fmt: Intl.DateTimeFormat;
  onPatch: (d: Partial<Pick<Request, "status" | "notes" | "followUpAt">>) => Promise<void>;
  onDelete: () => void;
}) {
  const [notes, setNotes] = useState(m.notes);
  const [saved, setSaved] = useState(false);
  const day = m.followUpAt ? m.followUpAt.slice(0, 10) : "";
  const setFollowUp = (date: string | null) => onPatch({ followUpAt: date ? new Date(`${date}T09:00:00`).toISOString() : null });
  const inDays = (n: number) => {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  };

  return (
    <div className="mt-4 space-y-5" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex flex-wrap gap-1.5">
        {describe.map((d) => (
          <span key={d} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-[var(--text-muted)]">{d}</span>
        ))}
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        {m.phone && (
          <div>
            <dt className="text-[var(--text-subtle)]">{t.call}</dt>
            <dd dir="ltr" className="text-start rtl:text-end">{m.phone}</dd>
          </div>
        )}
        {m.email && (
          <div>
            <dt className="text-[var(--text-subtle)]">{t.email}</dt>
            <dd><a href={`mailto:${m.email}`} className="text-[var(--accent)]">{m.email}</a></dd>
          </div>
        )}
        {m.company && (
          <div>
            <dt className="text-[var(--text-subtle)]">{t.company}</dt>
            <dd>{m.company}</dd>
          </div>
        )}
        <div>
          <dt className="text-[var(--text-subtle)]">{t.date}</dt>
          <dd>{fmt.format(new Date(m.createdAt))}</dd>
        </div>
        {m.page && (
          <div className="col-span-2">
            <dt className="text-[var(--text-subtle)]">{t.from}</dt>
            <dd dir="ltr" className="text-start rtl:text-end">{m.page}</dd>
          </div>
        )}
      </dl>

      {m.message && <p className="whitespace-pre-wrap rounded-lg bg-[var(--bg-secondary)] p-3 text-sm leading-relaxed">{m.message}</p>}

      {m.phone && (
        <div className="flex flex-wrap gap-2">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#25D366] px-4 font-semibold text-[#06210f]">
            <WhatsAppIcon className="h-4 w-4" />
            {t.whatsapp}
          </a>
          <a href={`tel:${m.phone}`} className="inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--border)] px-4">
            <Phone className="h-4 w-4" />
            {t.call}
          </a>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => onPatch({ status: s })} className={cn("cursor-pointer rounded-full border px-3 py-1 text-sm", m.status === s ? statusTone[s] : "border-[var(--border)] text-[var(--text-muted)]")}>
            {t.status[s]}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="rq-notes" className="text-sm text-[var(--text-subtle)]">{t.notes}</label>
        <textarea
          id="rq-notes"
          value={notes}
          onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
          rows={4}
          placeholder={t.notesHint}
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-3 text-sm"
        />
        <Button size="sm" variant="outline" className="mt-2" disabled={notes === m.notes && !saved} onClick={async () => { await onPatch({ notes }); setSaved(true); }}>
          {saved ? t.saved : t.save}
        </Button>
      </div>

      <div>
        <p className="text-sm text-[var(--text-subtle)]">{t.followUp}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <input type="date" value={day} onChange={(e) => setFollowUp(e.target.value || null)} aria-label={t.followUp} className="h-9 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-2 text-sm" />
          {[1, 3, 7].map((n) => (
            <button key={n} onClick={() => setFollowUp(inDays(n))} className="h-9 cursor-pointer rounded-lg border border-[var(--border)] px-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              {t.plusDays(n)}
            </button>
          ))}
          {day && (
            <button onClick={() => setFollowUp(null)} className="h-9 cursor-pointer px-2 text-sm text-[var(--text-subtle)]">{t.clear}</button>
          )}
        </div>
      </div>

      <div className="border-t border-[var(--border)] pt-4">
        <Button variant="ghost" size="sm" onClick={onDelete} leftIcon={<Trash2 className="h-3.5 w-3.5" />} className="text-red-400 hover:text-red-300">
          {t.del}
        </Button>
      </div>
    </div>
  );
}
