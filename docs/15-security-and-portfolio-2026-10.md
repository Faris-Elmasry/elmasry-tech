# 15 — Security test and "Our work" (2026-10-20)

What was done on 2026-10-20, how it was tested, and what is still open.

## 1. "Our work" on the homepage

`src/lib/work.ts` had an empty list, so the homepage section didn't render. It now has four real client projects:

| Slug | Name | Frame | Link |
|---|---|---|---|
| `itafa2na` | اتفقنا / Itafa2na | phone (it is a mobile app; the preview is its mobile web version) | https://itafa2na.tech/ |
| `online-ms` | Online MS | system (QHSE SaaS, also has a mobile app) | https://online-ms.io/ |
| `we-management` | WE Management | website | https://we-management.nl/ |
| `smoothware` | Smoothware | website | https://smoothware.nl/ |

- **Previews:** `node scripts/capture-previews.mjs` records them into `public/images/work/<slug>.webm` and `<slug>-poster.webp`.
  - The script now closes a cookie banner before recording.
- **Image check:** every video was reviewed frame by frame. There are no photos of women (the owner's rule for the site).
- **Store links:** the Itafa2na App Store / Google Play links are not on its website. Add `appStore` / `playStore` to the entry when they're available.
- **Checked:** Arabic and English at 1440 px and 390 px, with no horizontal scroll.

## 2. Security test of the site

Tested against a local production build (`next build && next start`) with a throwaway Postgres, as an outsider would attack it. The scripts used are not in the repo. Each check below is what they did.

| Check | Result before | Now |
|---|---|---|
| Every admin API (`/api/contact` GET/PATCH/DELETE, `/api/admin/*`, `/api/projects|services|testimonials|hero|settings` writes) without a login | 401 everywhere | unchanged |
| `/ar/admin/messages` without a login | redirect to login | unchanged |
| Forged session cookie | 401 | unchanged |
| 12 contact submissions in a row, half with a forged `X-Forwarded-For` | **all 12 accepted** (each a Telegram alert) | 5 per hour per visitor, then 429 |
| 25 wrong admin passwords | **none blocked** | 10 per 15 min per visitor and 8 per account, then «Too many attempts» |
| `<script>` / `<img onerror>` in a message, opened in the admin | shown as text, nothing runs | unchanged (React escapes; the email is escaped; Telegram is plain text) |
| 200 KB message | refused (schema max 2000) | unchanged |
| Security headers | no HSTS, no CSP | HSTS (1 year) + a CSP limited to `object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'` (it can't break scripts) |
| Every sitemap URL (60) | — | all 200 |

### Why the limits were off

`src/lib/rateLimit.ts` only worked when Upstash (`UPSTASH_REDIS_REST_URL/TOKEN`) was set. The server doesn't have it, so there was no limit at all, and the login limiter was never called.

Now:
- An in-memory sliding window takes over when Upstash isn't set (enough for one container).
- The visitor is identified by `X-Real-IP` or the **last** `X-Forwarded-For` entry, which is the one the proxy (Traefik) appends. The first entry is whatever the visitor sends.
- In `src/lib/auth.ts`, a login for an email that doesn't exist is still checked against a dummy bcrypt hash, so response time doesn't reveal which emails are real.

### ⚠️ The admin password was public

`help.text` (email + password) and `prisma/seed.ts` (the same password) were committed in `e735739`, and the GitHub repo is public.

Fixed in the code:
- `help.text` is untracked and in `.gitignore` (the local file is kept).
- The seed reads `ADMIN_EMAIL` / `ADMIN_PASSWORD` from the environment and skips the admin user without them.

**Still required, by the owner:**
1. **Treat that password as known to everyone.** Don't use it for the site's admin (`ADMIN_PASSWORD` on the server must be different, 10+ characters), and change it anywhere else it was used.
2. **Decide whether to rewrite git history** to remove `help.text` from old commits. It requires a force-push to a public repo, and anyone could already have copied it, so changing the password matters more than rewriting history.

Known and unrelated: running the seed a second time on the same database fails on the projects' unique `slug`. The first run is fine.

## 3. The demo gate and the demos

The public demos sit behind `demo-gate` in the café repo (`apps/demo-gate`, branch `feat/demo-gate-google`). The same test found and fixed:

- **An SSRF:** any signed-in visitor (a free Google trial is enough) could make the gate fetch internal services through `//host/…` in the request line.
- **Trusting a forged `X-Forwarded-For`:** this skipped the panel's wrong-password lock and the sign-ups-per-network limit.
- **Inside the café demo:** one visitor could lock the public demo owner for everyone with five wrong PINs.

Details are in the café repo: `docs/12-qa-fixes-and-security-2026-10.md`.

## 4. Deployment

- `main` was pushed (`44e2cb6` plus this docs commit).
- On 2026-10-20 the server did not answer for the site's sslip.io address, so the site still has to be deployed on Dokploy.
- After it's deployed, re-run the checks in section 2 against the live URL.
