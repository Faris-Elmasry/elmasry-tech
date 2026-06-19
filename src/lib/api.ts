import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Standard success response.
 */
export function successResponse(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

/**
 * Standard error response.
 */
export function errorResponse(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}

/**
 * Verify admin session. Returns session or error response.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: errorResponse("Unauthorized", 401) };
  }

  return { session };
}

/**
 * Add cache headers to a response.
 */
export function setCacheHeaders(response: NextResponse, seconds: number) {
  response.headers.set(
    "Cache-Control",
    `s-maxage=${seconds}, stale-while-revalidate=86400`
  );
  return response;
}
