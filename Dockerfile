# Elmasry Tech website — Next.js + Prisma (Postgres).
# Runtime env: DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, ADMIN_EMAIL, ADMIN_PASSWORD,
#              optional TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID, EMAIL_*.
# Build args:  NEXT_PUBLIC_SITE_URL (public URL, used in canonical/OG/sitemap), NEXT_PUBLIC_WHATSAPP,
#               NEXT_PUBLIC_CONTACT_EMAIL (shown only when set — once the domain has a mailbox).
FROM node:22-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
# postinstall runs `prisma generate`, which only needs a syntactically valid URL
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build" npm ci

FROM deps AS build
COPY . .
ARG NEXT_PUBLIC_SITE_URL=https://elmasry.tech
ARG NEXT_PUBLIC_WHATSAPP=+201090036987
ARG NEXT_PUBLIC_CONTACT_EMAIL=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_WHATSAPP=$NEXT_PUBLIC_WHATSAPP NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build" npx next build

FROM base AS run
ENV NODE_ENV=production PORT=3000
COPY --from=build /app /app
EXPOSE 3000
# migrations → admin login → server
CMD ["sh", "-c", "npx prisma migrate deploy && node scripts/ensure-admin.mjs && npx next start -p ${PORT}"]
