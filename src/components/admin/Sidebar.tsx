"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { FolderKanban, Inbox, KeyRound, LogOut, ExternalLink } from "lucide-react";

/**
 * Only the admin screens that change something real. Hero, Services, Testimonials
 * and the site-settings fields no longer drive the public site (its copy lives in
 * code — docs/10 #13 #32), so they were taken out of the menu: editing them did
 * nothing, which only confused. The routes still exist.
 */
const navItems = [
  { href: "/messages", icon: Inbox, label: { ar: "الطلبات", en: "Requests" } },
  { href: "/portfolio", icon: FolderKanban, label: { ar: "أعمالنا", en: "Our work" } },
  { href: "/settings", icon: KeyRound, label: { ar: "الباسورد", en: "Password" } },
];

interface AdminSidebarProps {
  locale: string;
  userName: string;
  userEmail: string;
}

export function AdminSidebar({ locale, userName, userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const ar = locale === "ar";
  const basePath = `/${locale}/admin`;
  const t = (l: { ar: string; en: string }) => (ar ? l.ar : l.en);
  const logout = () => signOut({ callbackUrl: `${basePath}/login` });

  const links = navItems.map((item) => {
    const active = pathname.includes(`/admin${item.href}`);
    return { ...item, href: `${basePath}${item.href}`, active };
  });

  return (
    <>
      {/* desktop: a fixed column on the start side */}
      <aside className="fixed inset-y-0 start-0 z-30 flex w-64 flex-col border-e border-[var(--border)] bg-[var(--bg-primary)] max-lg:hidden">
        <div className="flex h-16 items-center px-5 border-b border-[var(--border)]">
          <span className="font-bold text-[var(--text-primary)]" dir="ltr">
            elmasry<span className="text-[var(--accent)]">/</span>tech
          </span>
          <span className="ms-2 text-xs text-[var(--text-muted)]">{ar ? "الإدارة" : "Admin"}</span>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                l.active ? "bg-[var(--accent)]/10 text-[var(--accent)] font-semibold" : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-primary)]"
              )}
            >
              <l.icon className="h-4 w-4 shrink-0" />
              {t(l.label)}
            </Link>
          ))}
          <a href={`/${locale}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-primary)]">
            <ExternalLink className="h-4 w-4 shrink-0" />
            {ar ? "افتح الموقع" : "Open the site"}
          </a>
        </nav>
        <div className="border-t border-[var(--border)] p-3">
          <div className="mb-2 px-2">
            <p className="truncate text-sm font-medium text-[var(--text-primary)]">{userName}</p>
            <p className="truncate text-xs text-[var(--text-muted)]" dir="ltr">{userEmail}</p>
          </div>
          <button onClick={logout} className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10">
            <LogOut className="h-4 w-4 shrink-0" />
            {ar ? "خروج" : "Sign out"}
          </button>
        </div>
      </aside>

      {/* phone/tablet: there was no menu at all under 1024px */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg-primary)]/95 backdrop-blur lg:hidden">
        <nav className="flex items-center gap-1 overflow-x-auto px-3 py-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-sm",
                l.active ? "bg-[var(--accent)]/10 text-[var(--accent)] font-semibold" : "text-[var(--text-muted)]"
              )}
            >
              <l.icon className="h-4 w-4" />
              {t(l.label)}
            </Link>
          ))}
          <button onClick={logout} className="ms-auto flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm text-red-400" aria-label={ar ? "خروج" : "Sign out"}>
            <LogOut className="h-4 w-4" />
          </button>
        </nav>
      </header>
    </>
  );
}
