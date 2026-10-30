# 16 — Launch and changing the domain

The site is ready to launch. What's left is deploying it and pointing a domain at it. This page is the whole procedure.

## 1. Server variables (Dokploy → the app → Environment)

| Variable | Kind | Value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **build arg** | `https://<domain>`, e.g. `https://elmasry.tech`. Drives canonical URLs, Open Graph, hreflang, sitemap, robots and llms.txt. A build with the wrong value points all of them at the wrong host (a local build showed `http://localhost:3000` everywhere). |
| `NEXT_PUBLIC_WHATSAPP` | build arg | `+201090036987` (the default) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | build arg | **Leave empty until the domain has a working mailbox.** Then set it (e.g. `faris@<domain>`) and redeploy; the email appears in the header, footer, contact page, legal pages and structured data. |
| `NEXTAUTH_URL` | runtime | `https://<domain>` |
| `NEXTAUTH_SECRET` | runtime | a long random string (`openssl rand -base64 48`) |
| `DATABASE_URL` | runtime | the app's Postgres |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | runtime | the admin login. The password must be 10+ characters, and **not** the old password that was in the public repo (see [15](15-security-and-portfolio-2026-10.md)). |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | runtime | optional: a Telegram message for every request |
| `UPSTASH_REDIS_REST_URL/TOKEN` | runtime | optional. Without them the rate limits run in memory, which is enough for one container. |

On every start the container runs `prisma migrate deploy`, then `scripts/ensure-admin.mjs`, then the site.

`ensure-admin` creates the admin the first time. After that it changes the password **only when `ADMIN_PASSWORD` itself changes**, so a password changed from the admin (الباسورد) survives restarts and deploys.

## 2. Changing the domain

1. Buy the domain. At its DNS provider, add an `A` record for `@` (and `www` if wanted) pointing to the server's IP.
2. Dokploy → the app → Domains: add the domain, enable HTTPS (Let's Encrypt) and wait for the certificate.
3. Set `NEXT_PUBLIC_SITE_URL` and `NEXTAUTH_URL` to `https://<domain>`, then **redeploy** (a rebuild is needed, because `NEXT_PUBLIC_*` values are baked in at build time).
4. Check, on the live domain:
   - `/sitemap.xml`, `/robots.txt` and `/llms.txt` show the new domain.
   - Page source on `/ar` shows `<link rel="canonical" href="https://<domain>/ar">`.
   - `/ar/admin` redirects to the login page, and logging in opens «الطلبات».
   - Send one test request from `/ar/contact` and see it in the admin (and in Telegram, if set).
5. Google Search Console: add the domain property, verify it with DNS, and submit `https://<domain>/sitemap.xml`.
6. Google Business Profile (Cairo): use the same name, phone and website.

The old sslip.io address can stay. Its pages carry the canonical URL of the new domain, so search engines index the domain.

## 3. Quick checks after any deploy

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://<domain>/ar
curl -s https://<domain>/sitemap.xml | grep -c "<loc>"
curl -s -o /dev/null -w "%{http_code}\n" https://<domain>/api/contact
```

The three commands should give:
- `200`;
- about 60 sitemap URLs;
- `401` (the request list needs the admin login).

The security checks in [15 §2](15-security-and-portfolio-2026-10.md) can be repeated against the live URL.

## 4. Known and accepted

- The 404 page keeps the site's default title: metadata only works in the root `not-found`. Next adds `noindex` to every 404 anyway.
- The 2 remaining `npm audit` items are `nodemailer` 7.x, held by next-auth's peer range. They are fed only our own SMTP settings.
- Three old ESLint errors (`react-hooks/set-state-in-effect`) remain in admin pages that are now hidden from the menu (hero, services, testimonials).

## 5. Deployed

- **URL (temporary):** `https://elmasry-tech.72-61-178-220.sslip.io` (HTTPS via Let's Encrypt). Canonical, Open Graph, sitemap and robots all use this host until the real domain is switched in (section 2).
- **Dokploy:** panel `https://panel.itafa2na.tech`, project `elmasry-tech` (environment `production`) with two services: the app `elmasry-tech-web` (Dockerfile build from GitHub `Faris-Elmasry/elmasry-tech`, branch `main`, port 3000) and the Postgres `elmasry-tech-db` (internal only, no external port).
- **Admin login:** the email and password are in `~/.config/elmasry/website-admin.txt` on Faris's machine (mode 600). They are set as `ADMIN_EMAIL` / `ADMIN_PASSWORD` in the app's Environment. Change the password from the admin once logged in.
- **Switching to the real domain:** follow section 2. Change the domain in Dokploy → Domains, and update `NEXT_PUBLIC_SITE_URL` (build arg) and `NEXTAUTH_URL`, then redeploy.
