import { redirect } from "next/navigation";

/**
 * The admin opens on the requests. The old dashboard counted content that no longer
 * drives the site and showed «Unread messages: 0» next to 45 new requests (it read
 * the old status names); the requests page has the real counts and filters.
 */
export default async function AdminHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/admin/messages`);
}
