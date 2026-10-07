import type { MetadataRoute } from "next";
import { defaultLocale, site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.name,
    description: "Software development company in Egypt — websites, mobile apps, custom systems, AI and automation.",
    start_url: `/${defaultLocale}`,
    display: "standalone",
    background_color: "#f5f2ec",
    theme_color: "#121110",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
