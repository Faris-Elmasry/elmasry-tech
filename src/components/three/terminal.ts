// A tiny bilingual shell rendered onto the 3D computer's screen (CanvasTexture).
// Pure logic + 2D canvas drawing — no three.js here.

import { services, stack, tr } from "@/lib/content";
import { site, type Locale } from "@/lib/site";

export interface TerminalLine {
  text: string;
  tone?: "prompt" | "accent" | "muted";
}

export interface CommandResult {
  lines: TerminalLine[];
  clear?: boolean;
  navigate?: string;
}

const PROMPT = "guest@elmasry:~$ ";

export function welcome(locale: Locale): TerminalLine[] {
  return locale === "ar"
    ? [
        { text: "Elmasry Tech OS v3.0 — القاهرة", tone: "accent" },
        { text: "مرحبًا بك. هذا الجهاز حقيقي — اكتب عليه.", tone: "muted" },
        { text: "اكتب help لعرض الأوامر المتاحة.", tone: "muted" },
        { text: "" },
      ]
    : [
        { text: "Elmasry Tech OS v3.0 — Cairo", tone: "accent" },
        { text: "Welcome. This machine is real — go ahead and type.", tone: "muted" },
        { text: "Type `help` to see what it can do.", tone: "muted" },
        { text: "" },
      ];
}

export function run(raw: string, locale: Locale): CommandResult {
  const cmd = raw.trim().toLowerCase();
  const ar = locale === "ar";
  const echo: TerminalLine = { text: PROMPT + raw, tone: "prompt" };
  const out = (lines: TerminalLine[], extra: Partial<CommandResult> = {}): CommandResult => ({ lines: [echo, ...lines, { text: "" }], ...extra });

  switch (cmd) {
    case "":
      return { lines: [echo] };
    case "help":
      return out([
        { text: ar ? "الأوامر المتاحة:" : "Available commands:", tone: "accent" },
        { text: ar ? "  about     من نحن" : "  about     who we are" },
        { text: ar ? "  services  ماذا نبني" : "  services  what we build" },
        { text: ar ? "  stack     التقنيات" : "  stack     our tech stack" },
        { text: ar ? "  contact   طرق التواصل" : "  contact   how to reach us" },
        { text: ar ? "  hire      ابدأ مشروعك" : "  hire      start a project" },
        { text: ar ? "  clear     مسح الشاشة" : "  clear     clear the screen" },
      ]);
    case "about":
    case "whoami":
      return out(
        ar
          ? [
              { text: "Elmasry Tech — شركة برمجيات في القاهرة.", tone: "accent" },
              { text: "أسسها مهندسان؛ نبني المواقع والتطبيقات" },
              { text: "وأنظمة الإدارة وحلول الذكاء الاصطناعي." },
            ]
          : [
              { text: "Elmasry Tech — a software studio in Cairo.", tone: "accent" },
              { text: "Founded by two engineers. We build websites," },
              { text: "mobile apps, business systems and AI." },
            ]
      );
    case "services":
    case "ls":
      return out(services.map((s, i) => ({ text: `  0${i + 1}  ${tr(s.label, locale)}` })));
    case "stack":
      return out([{ text: stack.slice(0, 7).join(" · ") }, { text: stack.slice(7).join(" · ") }]);
    case "contact":
      return out([
        { text: `email     ${site.email}` },
        { text: `whatsapp  ${site.whatsapp}` },
        { text: ar ? `الموقع    ${site.city.ar}، ${site.country.ar}` : `location  ${site.city.en}, ${site.country.en}` },
      ]);
    case "hire":
    case "start":
      return out([{ text: ar ? "جارٍ فتح صفحة التواصل…" : "Opening the contact page…", tone: "accent" }], { navigate: `/${locale}/contact` });
    case "clear":
    case "cls":
      return { lines: [], clear: true };
    case "sudo":
    case "sudo su":
      return out([{ text: ar ? "محاولة جيدة — لكن الصلاحيات عندنا." : "Nice try — root stays with us.", tone: "muted" }]);
    case "date":
      return out([{ text: new Date().toLocaleString(ar ? "ar-EG" : "en-GB", { timeZone: "Africa/Cairo" }) }]);
    default:
      return out([{ text: ar ? `الأمر غير معروف: ${raw} — اكتب help` : `command not found: ${raw} — try \`help\``, tone: "muted" }]);
  }
}

/** Draws the terminal into a 2D canvas used as the screen texture. */
export function drawScreen(
  ctx: CanvasRenderingContext2D,
  lines: TerminalLine[],
  input: string,
  caretOn: boolean,
  fonts: string,
  rtl: boolean
) {
  const { width: W, height: H } = ctx.canvas;
  // Background with a faint vignette
  const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, W * 0.75);
  g.addColorStop(0, "#14110f");
  g.addColorStop(1, "#060505");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  const size = 36;
  const lh = size * 1.45;
  const pad = 48;
  ctx.font = `500 ${size}px ${fonts}`;
  ctx.textBaseline = "top";
  ctx.direction = rtl ? "rtl" : "ltr";
  ctx.textAlign = rtl ? "right" : "left";
  const x = rtl ? W - pad : pad;

  const visible = Math.floor((H - pad * 2) / lh) - 1;
  const all = [...lines, { text: PROMPT + input + (caretOn ? "▌" : " "), tone: "prompt" as const }];
  const shown = all.slice(-visible - 1);

  shown.forEach((l, i) => {
    ctx.fillStyle = l.tone === "accent" ? "#ff7a45" : l.tone === "muted" ? "#8b867d" : l.tone === "prompt" ? "#f2efe8" : "#d8d3c9";
    // Prompt/command lines are code → always LTR
    const isCode = l.tone === "prompt";
    if (isCode && rtl) {
      ctx.direction = "ltr";
      ctx.textAlign = "left";
      ctx.fillText(l.text, pad, pad + i * lh, W - pad * 2);
      ctx.direction = "rtl";
      ctx.textAlign = "right";
    } else {
      ctx.fillText(l.text, x, pad + i * lh, W - pad * 2);
    }
  });

  // Scanlines for a subtle CRT feel
  ctx.fillStyle = "rgba(255,255,255,0.025)";
  for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 1);
}
