import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const allCookies = request.cookies.getAll();
  const cookieHeader = request.headers.get("cookie");

  // Appel direct à better-auth
  let session = null;
  let sessionError = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
      {
        headers: {
          cookie: cookieHeader || "",
        },
      },
    );
    const text = await res.text();
    session = { status: res.status, body: text };
  } catch (e: any) {
    sessionError = e.message;
  }

  return NextResponse.json({
    cookies: allCookies,
    cookieHeader,
    session,
    sessionError,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  });
}
