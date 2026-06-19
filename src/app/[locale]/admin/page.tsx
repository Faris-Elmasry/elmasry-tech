"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FolderKanban, Layers, Inbox, Star, Plus } from "lucide-react";

interface Stats {
  projects: number;
  services: number;
  testimonials: number;
  messages: { total: number; unread: number };
}

interface Message {
  id: number;
  name: string;
  service: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then((d) => setStats(d.data)).catch(() => {});
    fetch("/api/contact?limit=5").then((r) => r.json()).then((d) => setMessages(d.data?.messages || [])).catch(() => {});
  }, []);

  const statCards = [
    { label: "Projects", value: stats?.projects || 0, icon: FolderKanban, color: "text-blue-400", href: "/en/admin/portfolio" },
    { label: "Services", value: stats?.services || 0, icon: Layers, color: "text-green-400", href: "/en/admin/services" },
    { label: "Unread Messages", value: stats?.messages.unread || 0, icon: Inbox, color: (stats?.messages.unread || 0) > 0 ? "text-red-400" : "text-gray-400", href: "/en/admin/messages" },
    { label: "Testimonials", value: stats?.testimonials || 0, icon: Star, color: "text-amber-400", href: "/en/admin/testimonials" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-poppins)]">Dashboard</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Welcome back, Faris</p>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" size="sm" href="/en/admin/portfolio" leftIcon={<Plus className="h-4 w-4" />}>
            Add Project
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} variant="elevated" className="cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--text-muted)] mb-1">{stat.label}</p>
                <AnimatedCounter end={stat.value} className={`text-3xl ${stat.color}`} />
              </div>
              <div className={`p-2 rounded-lg bg-[var(--bg-secondary)] ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Messages */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[var(--text-primary)]">Recent Messages</h2>
          <Button variant="ghost" size="sm" href="/en/admin/messages">View all →</Button>
        </div>
        {messages.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)] py-4 text-center">No messages yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-2 text-[var(--text-muted)] font-medium">Name</th>
                  <th className="text-left py-2 text-[var(--text-muted)] font-medium">Service</th>
                  <th className="text-left py-2 text-[var(--text-muted)] font-medium">Date</th>
                  <th className="text-left py-2 text-[var(--text-muted)] font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id} className="border-b border-[var(--border)] last:border-0 hover:bg-white/[0.02]">
                    <td className="py-3 text-[var(--text-primary)]">{msg.name}</td>
                    <td className="py-3"><Badge variant="blue" size="sm">{msg.service}</Badge></td>
                    <td className="py-3 text-[var(--text-muted)]">{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td className="py-3">
                      <Badge variant={msg.status === "new" ? "amber" : msg.status === "replied" ? "blue" : "green"} size="sm">
                        {msg.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
