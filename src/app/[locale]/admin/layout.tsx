import { getServerSession } from "next-auth";
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
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <AdminSidebar locale={locale} userName={session.user.name} userEmail={session.user.email} />
      <div className="lg:ms-64">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
