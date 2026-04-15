import { NextRequest, NextResponse } from "next/server";
import { authClient } from "./lib/auth-api";

const PUBLIC_PATHS = ["/auth/login", "/auth/callback"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { data: session } = await authClient.getSession();
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  if (!isPublic) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isPublic || pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};
