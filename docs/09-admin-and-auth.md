# 09 — Admin Panel & Authentication

## Auth flow
1. `/{locale}/admin/login` → `signIn("credentials", {redirect:false})` (NextAuth v4).
2. `authorize()` (`lib/auth.ts`): find `AdminUser` by email → `bcrypt.compare` → returns `{id,email,name,role}`.
3. JWT session, 24 h; `jwt`/`session` callbacks copy `id` and `role` onto the session.
4. Login success → `router.push("/en/admin")` (always EN).
5. `middleware.ts`: for `^/(en|ar)/admin(?!/login)` requires a valid JWT (`getToken`), else redirect to `/en/admin/login?callbackUrl=…`.
6. `admin/layout.tsx` (server): no session → renders bare children (so login works); with session → sidebar + content.
7. API mutations → `requireAdmin()`.

Roles: a `role` column exists (`admin`) but nothing checks it. Single admin, no registration, no password reset.

## Admin pages (`src/app/[locale]/admin/`)
| Page | Function |
|---|---|
| Dashboard (`/admin`) | Stat cards (projects, services, unread messages, testimonials) with count-up, "Add Project" button, last 5 messages table. Links hard-coded to `/en/admin/...` |
| Hero Editor (`/hero`) | react-hook-form for EN/AR badge, title, subtitle, CTAs, image URL; live preview with EN/AR toggle; Save/Discard. ⚠ Public home currently doesn't use these values (see known issues) |
| Services (`/services`) | List + create/edit modal (EN/AR title/desc, icon name text, order, featured) + delete with `confirm()`. GripVertical icon shown but no drag-reorder |
| Portfolio (`/portfolio`) | List + big modal: titles, slug, category select (system/web/mobile/saas/other), short/long desc EN/AR, tech stack (comma list), results EN/AR, client, ROI metric, order, live/GitHub URLs, featured. No image upload (thumbnail/images not editable) |
| Testimonials (`/testimonials`) | CRUD modal |
| Messages (`/messages`) | Inbox with status filter (new/replied/archived), pagination (20), view modal, status change, delete |
| Settings (`/settings`) | Site info (names, taglines, location EN/AR), contact & social, CV URL, brand color, availability toggle → `PUT /api/settings`; Change-password form (Zod) → `/api/admin/change-password`. ⚠ Saved settings are not read by the public site |

Sidebar: collapsible (persisted), nav to the 7 pages, user name/email, Sign out. **Hidden below `lg` (`max-lg:hidden`) with no mobile nav replacement** → admin pages have no navigation on tablets/phones.

## Security posture (summary — details in known issues)
Good: bcrypt (cost 12), Zod on most writes, JWT secret from env, `.env*` ignored, admin routes excluded from robots, auth enforced inside API handlers.
Fixed 2026-10-20: admin login and contact form are rate-limited (in memory without Upstash), email HTML is escaped, no credentials in the code (but the old password is still in git history — change it). Needs work: project PUT unvalidated; settings API lets admin write arbitrary keys (low risk); public `GET /api/hero` writes to DB when empty.
