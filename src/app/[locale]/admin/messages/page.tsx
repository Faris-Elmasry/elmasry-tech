"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Inbox, Trash2, Eye, CheckCircle, Reply, Archive } from "lucide-react";

interface Message {
  id: number; name: string; email: string; phone?: string | null;
  company?: string | null; service: string; message: string;
  status: string; createdAt: string;
}

const statusColors: Record<string, "amber" | "blue" | "green" | "default"> = {
  new: "amber", replied: "blue", archived: "green",
};

export default function MessagesInboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [total, setTotal] = useState(0);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [viewing, setViewing] = useState<Message | null>(null);
  const [page, setPage] = useState(1);

  const fetchMessages = () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (filter) params.set("status", filter);
    fetch(`/api/contact?${params}`).then((r) => r.json()).then((d) => {
      setMessages(d.data?.messages || []); setTotal(d.data?.total || 0);
      setUnread(d.data?.unread || 0); setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(fetchMessages, [page, filter]);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/contact/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchMessages();
    if (viewing?.id === id) setViewing({ ...viewing, status });
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    if (viewing?.id === id) setViewing(null);
    fetchMessages();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)]">Messages</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">{total} total · {unread} unread</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {["", "new", "replied", "archived"].map((f) => (
          <button
            key={f}
            onClick={() => { setFilter(f); setPage(1); }}
            className={`px-4 py-1.5 text-sm rounded-full transition-all cursor-pointer ${filter === f ? "bg-blue-500 text-white" : "border border-[var(--border)] text-[var(--text-muted)] hover:border-blue-500/50"}`}
          >
            {f || "All"}{f === "new" && unread > 0 ? ` (${unread})` : ""}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">{[1,2,3,4].map(i => <div key={i} className="h-16 bg-[var(--bg-card)] rounded-xl animate-pulse" />)}</div>
      ) : messages.length === 0 ? (
        <Card className="text-center py-16">
          <Inbox className="h-10 w-10 text-[var(--text-subtle)] mx-auto mb-3" />
          <p className="text-[var(--text-muted)]">No messages found</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <Card
              key={msg.id}
              className={`flex items-center gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors ${msg.status === "new" ? "border-l-2 border-l-blue-500" : ""}`}
              padding={false}
            >
              <button onClick={() => setViewing(msg)} className="flex items-center gap-4 flex-1 p-4 text-left cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {msg.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${msg.status === "new" ? "font-semibold text-[var(--text-primary)]" : "text-[var(--text-primary)]"}`}>{msg.name}</span>
                    <Badge variant={statusColors[msg.status] || "default"} size="sm">{msg.status}</Badge>
                    <Badge variant="blue" size="sm">{msg.service}</Badge>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">{msg.message}</p>
                </div>
                <span className="text-xs text-[var(--text-subtle)] shrink-0">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </button>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > 20 && (
        <div className="flex justify-center gap-2">
          <Button variant="ghost" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
          <span className="text-sm text-[var(--text-muted)] py-2">Page {page} of {Math.ceil(total / 20)}</span>
          <Button variant="ghost" size="sm" disabled={page * 20 >= total} onClick={() => setPage(page + 1)}>Next</Button>
        </div>
      )}

      {/* Message Detail Modal */}
      <Modal open={!!viewing} onOpenChange={() => setViewing(null)} title="Message Detail" maxWidth="max-w-xl">
        {viewing && (
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-[var(--text-subtle)]">Name</span><p className="text-[var(--text-primary)] font-medium">{viewing.name}</p></div>
              <div><span className="text-[var(--text-subtle)]">Email</span><p><a href={`mailto:${viewing.email}`} className="text-blue-400 hover:underline">{viewing.email}</a></p></div>
              {viewing.phone && <div><span className="text-[var(--text-subtle)]">Phone</span><p className="text-[var(--text-primary)]">{viewing.phone}</p></div>}
              {viewing.company && <div><span className="text-[var(--text-subtle)]">Company</span><p className="text-[var(--text-primary)]">{viewing.company}</p></div>}
              <div><span className="text-[var(--text-subtle)]">Service</span><p><Badge variant="blue" size="sm">{viewing.service}</Badge></p></div>
              <div><span className="text-[var(--text-subtle)]">Date</span><p className="text-[var(--text-primary)]">{new Date(viewing.createdAt).toLocaleString()}</p></div>
            </div>
            <div className="border-l-3 border-blue-500 pl-4 py-2 bg-[var(--bg-secondary)] rounded-r-lg">
              <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">{viewing.message}</p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="primary" size="sm" onClick={() => updateStatus(viewing.id, "replied")} leftIcon={<Reply className="h-3.5 w-3.5" />} disabled={viewing.status === "replied"}>
                Mark Replied
              </Button>
              <Button variant="ghost" size="sm" onClick={() => updateStatus(viewing.id, "archived")} leftIcon={<Archive className="h-3.5 w-3.5" />}>
                Archive
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteMessage(viewing.id)} leftIcon={<Trash2 className="h-3.5 w-3.5" />} className="text-red-400 hover:text-red-300">
                Delete
              </Button>
              <Button variant="outline" size="sm" href={`mailto:${viewing.email}?subject=Re: ${viewing.service} inquiry`} className="ml-auto">
                Send Email →
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
