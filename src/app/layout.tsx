import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins-var",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-var",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono-var",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Elmasry Tech Solutions",
    template: "%s | Elmasry Tech Solutions",
  },
  description:
    "Custom software systems for Cairo businesses — pharmacies, gyms, clinics, and more.",
  keywords: [
    "pharmacy management system Cairo",
    "gym management system Egypt",
    "clinic software Cairo",
    "custom software Egypt",
    "Laravel developer Cairo",
    "نظام إدارة صيدليات",
    "نظام إدارة جيم",
  ],
  authors: [{ name: "Faris Elmasry", url: "https://elmasry.tech" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_EG",
    siteName: "Elmasry Tech Solutions",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@fariselmasry",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${poppins.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-[family-name:var(--font-inter)] antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
