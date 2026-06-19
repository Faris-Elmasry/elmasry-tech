"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Image, Layers, FolderKanban, Star,
  Inbox, Settings, LogOut, ChevronLeft,
} from "lucide-react";
import { useAdminStore } from "@/store/admin";

const navItems = [
  { key: "dashboard", icon: LayoutDashboard, href: "" },
  { key: "hero", icon: Image, href: "/hero" },
  { key: "services", icon: Layers, href: "/services" },
  { key: "portfolio", icon: FolderKanban, href: "/portfolio" },
  { key: "testimonials", icon: Star, href: "/testimonials" },
  { key: "messages", icon: Inbox, href: "/messages" },
  { key: "settings", icon: Settings, href: "/settings" },
];

const labels: Record<string, string> = {
  dashboard: "Dashboard",
  hero: "Hero Editor",
  services: "Services",
  portfolio: "Portfolio",
  testimonials: "Testimonials",
  messages: "Messages",
  settings: "Settings",
};

interface AdminSidebarProps {
  locale: string;
  userName: string;
  userEmail: string;
}

export function AdminSidebar({ locale, userName, userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAdminStore();
  const basePath = `/${locale}/admin`;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen bg-navy-900 border-r border-[var(--border)] z-30 transition-all duration-300 flex flex-col",
        "max-lg:hidden",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)]">
        {!sidebarCollapsed && (
          <div>
            <span className="font-[family-name:var(--font-poppins)] font-bold text-white">ELMASRY</span>
            <span className="text-blue-500 font-bold">.TECH</span>
            <span className="text-xs text-[var(--text-subtle)] ml-2">Admin</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", sidebarCollapsed && "rotate-180")} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const href = item.href ? `${basePath}${item.href}` : basePath;
          const isActive = item.href
            ? pathname.includes(`/admin${item.href}`)
            : pathname.endsWith("/admin") || pathname.endsWith("/admin/");

          return (
            <Link
              key={item.key}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                isActive
                  ? "bg-blue-500/10 border-l-2 border-blue-500 text-blue-400"
                  : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-primary)] border-l-2 border-transparent"
              )}
              title={sidebarCollapsed ? labels[item.key] : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && <span>{labels[item.key]}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-3 border-t border-[var(--border)]">
        {!sidebarCollapsed && (
          <div className="px-2 mb-2">
            <p className="text-sm text-[var(--text-primary)] font-medium truncate">{userName}</p>
            <p className="text-xs text-[var(--text-subtle)] truncate">{userEmail}</p>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: `/${locale}/admin/login` })}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          title="Sign Out"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!sidebarCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
