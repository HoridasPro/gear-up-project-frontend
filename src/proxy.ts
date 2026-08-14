import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "./lib/jwt";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/gears", "/contact", "/about"];
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;
  const decodedToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;
  let userRole = null;

  if (decodedToken?.success && decodedToken.data) {
    userRole = decodedToken.data.role;
  }
  // rolebase access
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "PROVIDER") {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  // authentication
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // authorazation
  if (pathname.startsWith("/dashboard") && userRole !== "CUSTOMER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/provider-dashboard") &&
    userRole !== "PROVIDER"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
