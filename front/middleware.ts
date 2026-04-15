import { NextRequest, NextResponse } from "next/server";
import { authClient } from "./lib/auth-api";

const PUBLIC_PATHS = ["/auth/login", "/auth/callback"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
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
          credentials: "include",
        },
      );
      if (res.ok) {
        session = await res.json();
      }
    } catch {
      session = null;
    }
  }
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
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

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
// };

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api/debug-session|.*\\..*).*)",
  ],
};
