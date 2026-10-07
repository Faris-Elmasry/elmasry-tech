import { z } from "zod";

// ─── Contact Form Schema ───
export const contactServices = [
  "website-development",
  "mobile-app-development",
  "custom-software",
  "ai-chatbots",
  "business-automation",
  "ecommerce-development",
  "ready-made-system",
  "other",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name too short").max(100),
  email: z.string().trim().email("Invalid email"),
  // Accept Egyptian and international numbers (digits, spaces, dashes, leading +).
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9\s-]{6,19}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  company: z.string().trim().max(100).optional(),
  service: z.enum(contactServices),
  message: z.string().trim().min(10, "Message too short").max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ─── Project Schema ───
export const projectSchema = z.object({
  title_en: z.string().min(2).max(200),
  title_ar: z.string().min(2).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be URL-friendly"),
  category: z.enum(["system", "web", "mobile", "saas", "other"]),
  description_en: z.string().min(10).max(500),
  description_ar: z.string().min(10).max(500),
  long_desc_en: z.string().optional().default(""),
  long_desc_ar: z.string().optional().default(""),
  tech_stack: z.array(z.string()).min(1).max(20),
  featured: z.boolean().default(false),
  live_url: z.string().url().optional().or(z.literal("")),
  github_url: z.string().url().optional().or(z.literal("")),
  roi_metric: z.string().max(100).optional(),
  client_name: z.string().max(100).optional(),
  results_en: z.string().optional(),
  results_ar: z.string().optional(),
  order: z.number().int().min(0).optional().default(0),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// ─── Service Schema ───
export const serviceSchema = z.object({
  title_en: z.string().min(2).max(100),
  title_ar: z.string().min(2).max(100),
  description_en: z.string().min(10).max(500),
  description_ar: z.string().min(10).max(500),
  icon: z.string(),
  order: z.number().int().min(0),
  featured: z.boolean().default(false),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

// ─── Testimonial Schema ───
export const testimonialSchema = z.object({
  client_name: z.string().min(2).max(100),
  client_title_en: z.string().min(2).max(100),
  client_title_ar: z.string().min(2).max(100),
  client_company: z.string().max(100),
  text_en: z.string().min(20).max(1000),
  text_ar: z.string().min(20).max(1000),
  rating: z.number().int().min(1).max(5),
  featured: z.boolean().default(false),
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;

// ─── Hero Schema ───
export const heroSchema = z.object({
  title_en: z.string().min(2).max(300),
  title_ar: z.string().min(2).max(300),
  subtitle_en: z.string().min(10).max(500),
  subtitle_ar: z.string().min(10).max(500),
  badge_en: z.string().max(100).optional(),
  badge_ar: z.string().max(100).optional(),
  cta_primary_en: z.string().max(50).optional(),
  cta_primary_ar: z.string().max(50).optional(),
  cta_secondary_en: z.string().max(50).optional(),
  cta_secondary_ar: z.string().max(50).optional(),
  image_url: z.string().url().optional().or(z.literal("")).or(z.literal(null)),
});

export type HeroFormData = z.infer<typeof heroSchema>;

// ─── Change Password Schema ───
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
