import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/Sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  // If not authenticated, check if we should redirect or just render children (login page)
  // The login page is a child of this layout, so we need to allow it through
  if (!session) {
    // Return children without sidebar — this allows the login page to render
    // The middleware already handles redirecting non-login admin pages to login
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)]">
      <AdminSidebar locale={locale} userName={session.user.name} userEmail={session.user.email} />
      <div className="flex-1 ml-64 max-lg:ml-0">
        <div className="p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
