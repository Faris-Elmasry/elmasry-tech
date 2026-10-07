import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Elmasry Tech",
  robots: { index: false },
};

// Used for URLs that match no route at all (outside /en and /ar).
export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={fontVariables} data-theme="dark">
      <body className="flex min-h-screen items-center justify-center px-5 text-center">
        <div>
          <p className="font-display text-8xl font-semibold tracking-tight">404</p>
          <p className="mt-4 text-[var(--text-muted)]">الصفحة دي مش موجودة · Page not found</p>
          <div className="mt-6 flex justify-center gap-4 text-sm underline underline-offset-4">
            <Link href="/ar">الرئيسية</Link>
            <Link href="/en">Home</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
