import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Admin route protection ───
  // Match paths like /en/admin/*, /ar/admin/* BUT NOT /*/admin/login
  const adminPattern = /^\/(en|ar)\/admin(?!\/login)(\/.*)?$/;
  if (adminPattern.test(pathname)) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL("/en/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ─── i18n routing ───
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except static files and ALL API routes
    "/((?!_next|api|images|favicon.ico|.*\\..*).*)",
  ],
};
