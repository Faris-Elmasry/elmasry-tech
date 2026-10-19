# 05 — API Reference

Envelope: success → `{ "success": true, "data": … }`; error → `{ "success": false, "error": "msg" }` (status 4xx/5xx).
"Admin" = requires NextAuth session via `requireAdmin()` (401 `Unauthorized` otherwise). Middleware **excludes `/api`**, so auth is enforced only inside handlers.
Cache = `Cache-Control: s-maxage=N, stale-while-revalidate=86400` on the response. "Reval" = `revalidatePath("/", "layout")` after write.

| Method & path | Auth | Body / query | Cache | Reval | Notes |
|---|---|---|---|---|---|
| `GET/POST /api/auth/[...nextauth]` | — | NextAuth | — | — | Credentials login |
| `POST /api/contact` | Public | `contactSchema` | — | — | Rate-limited 5/h per visitor (Upstash if set, otherwise in memory; visitor = X-Real-IP or the last X-Forwarded-For entry); saves `ContactMessage`; emails admin (non-blocking, failure logged) → `201 {sent,id}` |
| `GET /api/contact` | Admin | `page`, `limit`, `status` | 0 | — | `{messages,total,unread,page,limit}` (`total` respects filter; `unread` always global) |
| `PATCH /api/contact/[id]` | Admin | `{status}` | — | — | No validation of status value |
| `DELETE /api/contact/[id]` | Admin | — | — | — | |
| `GET /api/hero` | Public | — | 3600 | — | Auto-creates default hero row if missing (write on GET) |
| `PUT /api/hero` | Admin | `heroSchema` | — | ✓ | Upsert id=1 |
| `GET /api/projects` | Public | `featured=true`, `category`, `limit` | 3600 | — | Ordered by `order` asc |
| `POST /api/projects` | Admin | `projectSchema` (slug auto from `title_en`) | — | ✓ | Ensures unique slug by suffixing `-2`, `-3`… |
| `GET /api/projects/[slug]` | Public | — | 3600 | — | 404 if missing |
| `PUT /api/projects/[slug]` | Admin | raw body → `prisma.update` | — | ✓ (+`/en/portfolio/slug`) | **No Zod validation** (mass-assignment of any column); only revalidates the EN path |
| `DELETE /api/projects/[slug]` | Admin | — | — | ✓ | |
| `GET /api/services` | Public | `featured=true` | 3600 | — | Ordered by `order` |
| `POST /api/services` | Admin | `serviceSchema` | — | ✓ | |
| `PUT/DELETE /api/services/[id]` | Admin | `serviceSchema` / — | — | ✓ | |
| `PATCH /api/services/reorder` | Admin | `{items:[{id,order}]}` | — | ✗ | Transactional; no UI uses it |
| `GET /api/testimonials` | Public | `featured=true` | 3600 | — | Newest first |
| `POST /api/testimonials` | Admin | `testimonialSchema` | — | ✓ | |
| `PUT/DELETE /api/testimonials/[id]` | Admin | `testimonialSchema` / — | — | ✓ | |
| `GET /api/settings` | Public | — | 86400 | — | Flat `{key:value}` map (all keys public) |
| `PUT /api/settings` | Admin | `{updates:[{key,value}]}` | — | ✓ | Arbitrary keys, no validation; transactional upserts |
| `GET /api/admin/stats` | Admin | — | — | — | Counts + unread messages |
| `POST /api/admin/change-password` | Admin | `changePasswordSchema` | — | — | Verifies current password; bcrypt cost 12 |

## Consumers
- Home page (server): `/api/hero`, `/api/services`, `/api/projects?featured=true&limit=3`, `/api/testimonials?featured=true` (hero & services results currently discarded).
- Project detail (server): `/api/projects/[slug]`. Portfolio list (client): `/api/projects`. Sitemap: `/api/projects`.
- Contact page: `POST /api/contact`. Admin pages: everything else.
- `GET /api/settings` has **no consumer on the public site**.
