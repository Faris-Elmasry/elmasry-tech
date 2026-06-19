import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Only initialize if Upstash env vars are available
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

/**
 * Rate limiter for the public contact form.
 * 5 submissions per hour per IP.
 */
export const contactRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "rl:contact",
      analytics: true,
    })
  : null;

/**
 * Rate limiter for admin login attempts.
 * 10 attempts per 15 minutes per IP.
 */
export const adminLoginRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "15 m"),
      prefix: "rl:admin-login",
    })
  : null;

/**
 * Extract a rate-limit identifier from the request.
 * Prefers X-Forwarded-For (behind proxy/CDN), falls back to 'anonymous'.
 */
export function getRateLimitIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "anonymous";
}
