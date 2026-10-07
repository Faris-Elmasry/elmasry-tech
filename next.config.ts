import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Long-lived caching for files that rarely change but aren't content-hashed.
// (Hashed /_next/static assets already get `immutable` from Next.js.)
const DAY = 60 * 60 * 24;
const cacheFor = (seconds: number, swr = seconds * 7) => [
  { key: "Cache-Control", value: `public, max-age=${seconds}, stale-while-revalidate=${swr}` },
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "utfs.io" }],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 30 * DAY,
  },
  experimental: {
    // Locale-level root layout → app/global-not-found.tsx handles unmatched URLs.
    globalNotFound: true,
    // Only bundle the icons actually used.
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/icon.svg", headers: cacheFor(30 * DAY) },
      { source: "/manifest.webmanifest", headers: cacheFor(DAY) },
      { source: "/robots.txt", headers: cacheFor(DAY) },
      { source: "/sitemap.xml", headers: cacheFor(60 * 60, DAY) },
      { source: "/:locale(en|ar)/:image(opengraph-image.*)", headers: cacheFor(7 * DAY) },
    ];
  },
};

export default withNextIntl(nextConfig);
