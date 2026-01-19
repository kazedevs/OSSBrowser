import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //protect admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const isAuthenticated = await isAdminAuthenticated(request.cookies);

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  //redirect logged-in users away from login page
  if (pathname === "/admin/login") {
    const isAuthenticated = await isAdminAuthenticated(request.cookies);

    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
