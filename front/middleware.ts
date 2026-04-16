import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/auth/login", "/auth/callback"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  let session = null;
  if (sessionToken) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
        {
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        },
      );
      if (res.ok) {
        const text = await res.text();
        session = text ? JSON.parse(text) : null;
      }
    } catch {
      session = null;
    }
  }

  if (!session && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (session && (isPublic || pathname === "/")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api/backend|.*\\..*).*)",
  ],
};
