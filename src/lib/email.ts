import nodemailer from "nodemailer";
import type { ContactRequest } from "@/lib/validators";
import { getSystem } from "@/lib/systems";

/*
 * New-request notifications: an email (when EMAIL_* is set) and a Telegram
 * message (when TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID are set). Both are
 * optional and never block saving the request.
 */

const transporter =
  process.env.EMAIL_HOST && process.env.EMAIL_USER
    ? nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        secure: false,
      })
    : null;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const KIND_AR: Record<string, string> = { contact: "رسالة تواصل", quote: "طلب عرض سعر", demo: "طلب ديمو" };
const PLAN_AR: Record<string, string> = { cloud: "اشتراك أونلاين", local: "تثبيت على أجهزته", source: "شراء المشروع بالكود" };

/** One-line Arabic summary of what the person asked for. */
export function describeRequest(r: Pick<ContactRequest, "kind" | "system" | "plan" | "service">): string {
  const system = r.system ? getSystem(r.system)?.name.ar ?? r.system : null;
  return [KIND_AR[r.kind] ?? r.kind, system, r.plan ? PLAN_AR[r.plan] : null, !system ? r.service : null].filter(Boolean).join(" · ");
}

export const waLink = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;

async function sendTelegram(r: ContactRequest): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  const text = [
    `طلب جديد: ${describeRequest(r)}`,
    `${r.name}${r.company ? ` (${r.company})` : ""}`,
    r.phone,
    r.message ? `«${r.message.slice(0, 300)}»` : null,
    `واتساب: ${waLink(r.phone)}`,
  ]
    .filter(Boolean)
    .join("\n");
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }),
  });
  if (!res.ok) throw new Error(`telegram ${res.status}`);
}

async function sendEmail(raw: ContactRequest): Promise<void> {
  if (!transporter) return;
  // All user input is escaped before being placed in the HTML email.
  const e = (v?: string | null) => (v ? escapeHtml(v) : "");
  const row = (label: string, value: string) =>
    value ? `<tr><td style="padding:8px 0;color:#64748b;font-size:14px;width:110px">${label}</td><td style="padding:8px 0;color:#0A1628;font-size:14px">${value}</td></tr>` : "";
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
    replyTo: raw.email || undefined,
    subject: `طلب جديد: ${describeRequest(raw)} — ${raw.name}`,
    html: `<div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#0A1628">${e(describeRequest(raw))}</h2>
      <table style="width:100%;border-collapse:collapse">
        ${row("الاسم", e(raw.name))}
        ${row("الشركة", e(raw.company))}
        ${row("الموبايل", `<a href="${waLink(raw.phone)}">${e(raw.phone)}</a>`)}
        ${row("الإيميل", raw.email ? `<a href="mailto:${e(raw.email)}">${e(raw.email)}</a>` : "")}
        ${row("من صفحة", e(raw.page))}
      </table>
      ${raw.message ? `<p style="white-space:pre-wrap;background:#f1f5f9;padding:12px;border-radius:8px">${e(raw.message)}</p>` : ""}
    </div>`,
  });
}

export async function sendContactNotification(r: ContactRequest): Promise<void> {
  const results = await Promise.allSettled([sendTelegram(r), sendEmail(r)]);
  for (const x of results) if (x.status === "rejected") console.error("Notification failed:", x.reason);
}
