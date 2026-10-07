import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Admin route protection ───
  // Match /en/admin/*, /ar/admin/* but not /*/admin/login
  const adminMatch = pathname.match(/^\/(en|ar)\/admin(?!\/login)(\/.*)?$/);
  if (adminMatch) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL(`/${adminMatch[1]}/admin/login`, request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ─── i18n routing ───
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // All pathnames except Next internals, API routes and files with an extension
    "/((?!_next|api|images|favicon.ico|.*\\..*).*)",
  ],
};
