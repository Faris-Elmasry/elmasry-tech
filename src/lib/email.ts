import nodemailer from "nodemailer";
import type { ContactFormData } from "@/lib/validators";

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

export async function sendContactNotification(
  data: ContactFormData
): Promise<void> {
  if (!transporter) {
    console.log("Email not configured — skipping notification");
    return;
  }

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0A1628; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">
          <span style="color: #1E6FFF;">ELMASRY</span>.TECH — New Inquiry
        </h1>
      </div>
      <div style="background: #ffffff; padding: 32px; border: 1px solid #e2e8f0; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 120px;">Name</td>
            <td style="padding: 8px 0; color: #0A1628; font-size: 14px; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td>
            <td style="padding: 8px 0; color: #0A1628; font-size: 14px;">
              <a href="mailto:${data.email}" style="color: #1E6FFF;">${data.email}</a>
            </td>
          </tr>
          ${data.phone ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone</td><td style="padding: 8px 0; color: #0A1628; font-size: 14px;">${data.phone}</td></tr>` : ""}
          ${data.company ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Company</td><td style="padding: 8px 0; color: #0A1628; font-size: 14px;">${data.company}</td></tr>` : ""}
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Service</td>
            <td style="padding: 8px 0;">
              <span style="background: #EFF6FF; color: #1E6FFF; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">${data.service}</span>
            </td>
          </tr>
        </table>
        <div style="border-left: 3px solid #1E6FFF; padding-left: 16px; margin: 20px 0;">
          <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0;">${data.message}</p>
        </div>
      </div>
      <div style="background: #f8fafc; padding: 16px 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          Reply directly to: <a href="mailto:${data.email}" style="color: #1E6FFF;">${data.email}</a><br>
          ${new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" })} — Cairo, Egypt
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Elmasry Tech" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New inquiry: ${data.service} — ${data.name}`,
    html,
    replyTo: data.email,
  });
}
