import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limits for the public form and the admin login.
 *
 * With Upstash configured (UPSTASH_REDIS_REST_URL / _TOKEN) the windows are shared
 * across instances. Without it they used to be switched OFF entirely — the live
 * server has no Upstash, so the contact form took unlimited submissions (each one a
 * Telegram alert) and the admin password could be guessed without limit. Now a
 * single-instance in-memory window takes over, which is what one container needs.
 */

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

type Limiter = { limit(id: string): Promise<{ success: boolean }> };

/** Sliding window in this process's memory. */
function memoryLimiter(max: number, windowMs: number): Limiter {
  const hits = new Map<string, number[]>();
  return {
    async limit(id: string) {
      const now = Date.now();
      const recent = (hits.get(id) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= max) {
        hits.set(id, recent);
        return { success: false };
      }
      recent.push(now);
      hits.set(id, recent);
      // keep the map small: drop idle keys now and then
      if (hits.size > 5_000) {
        for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
      }
      return { success: true };
    },
  };
}

function limiter(max: number, minutes: number, prefix: string): Limiter {
  return redis
    ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(max, `${minutes} m`), prefix })
    : memoryLimiter(max, minutes * 60_000);
}

/** The public contact form: 5 per hour per visitor. */
export const contactRateLimit = limiter(5, 60, "rl:contact");

/** Admin login: 10 tries per 15 minutes per visitor… */
export const adminLoginRateLimit = limiter(10, 15, "rl:admin-login");

/** …and 8 per 15 minutes per account, whoever tries (a spread-out guess on one account). */
export const adminAccountRateLimit = limiter(8, 15, "rl:admin-account");

/**
 * The visitor's address. The proxy in front of the app (Traefik) appends the
 * address it saw to X-Forwarded-For, so the LAST entry is the one a visitor can't
 * forge; the first one is whatever the visitor sent (the old code trusted it, so
 * a fresh fake header each time skipped the limit).
 */
export function getRateLimitIdentifier(request: Request | { headers: Headers | Record<string, string | string[] | undefined> }): string {
  const get = (name: string): string | null => {
    const h = request.headers as Headers | Record<string, string | string[] | undefined>;
    if (typeof (h as Headers).get === "function") return (h as Headers).get(name);
    const v = (h as Record<string, string | string[] | undefined>)[name];
    return Array.isArray(v) ? v.join(",") : (v ?? null);
  };
  const real = get("x-real-ip");
  if (real) return real.trim();
  const forwarded = get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1]!;
  }
  return "anonymous";
}
