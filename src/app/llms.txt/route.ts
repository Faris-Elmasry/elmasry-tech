import { services } from "@/lib/content";
import { readySystems } from "@/lib/systems";
import { localeUrl, site, siteUrl } from "@/lib/site";

// /llms.txt — a plain-text map of the site for AI assistants and answer
// engines (ChatGPT, Gemini, Perplexity…), following the llms.txt convention.
export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name} is a software company in Cairo, Egypt (شركة برمجة في مصر). We build websites, mobile apps (iOS & Android), custom business systems (ERP, POS/cashier, inventory, accounting), WhatsApp chatbots and AI assistants, and business automation for clients in Egypt and abroad (including the Netherlands). We also offer ready-made systems that can be rented monthly or bought once, with a free live demo. Languages: Arabic and English.`,
    "",
    "## Main pages",
    `- [Home (Arabic)](${localeUrl("ar")}): overview of what we build`,
    `- [Home (English)](${localeUrl("en")})`,
    `- [Services](${localeUrl("ar", "/services")}): all services`,
    `- [Ready-made systems](${localeUrl("ar", "/systems")}): systems to rent or buy, with a free demo`,
    `- [Work](${localeUrl("ar", "/portfolio")}): our work`,
    `- [About](${localeUrl("ar", "/about")})`,
    `- [Contact](${localeUrl("ar", "/contact")}): free consultation${site.email ? `; email ${site.email}` : ""}; WhatsApp ${site.whatsapp}`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.label.en} — ${s.label.ar}](${localeUrl("ar", `/services/${s.slug}`)})`),
    "",
    "## Ready-made systems",
    ...readySystems.map((s) => `- [${s.name.en} — ${s.name.ar}](${localeUrl("ar", `/systems/${s.slug}`)})`),
    "",
    "## Optional",
    `- [Sitemap](${siteUrl}/sitemap.xml)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" },
  });
}
