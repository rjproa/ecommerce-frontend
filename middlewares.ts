import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userData = request.cookies.get("userData");

  if (!userData) {
    return NextResponse.redirect(new URL("/perfil", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ruleta/:path*"],
};