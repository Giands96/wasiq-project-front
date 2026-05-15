import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "@/shared/constants/routes";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("auth-token")?.value;
    const user = { role: request.cookies.get("role")?.value };
    const { pathname } = request.nextUrl;

    const isProtectedRoute =
        pathname.startsWith('/my-profile') ||
        pathname.startsWith('/properties/create') ||
        pathname.startsWith('/properties/update') ||
        pathname.startsWith('/properties/delete') ||
        pathname.startsWith('/dashboard')

    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register")

    if (isProtectedRoute && !token) {
        const loginUrl = new URL(ROUTES.AUTH.LOGIN, request.url)
        loginUrl.searchParams.set("callbackUrl", pathname)
        return NextResponse.redirect(loginUrl)
    }

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL(ROUTES.AUTH.MY_PROFILE, request.url))
    }

    if (pathname.startsWith("/dashboard") && user?.role !== "ADMIN") {
        return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/my-profile',
        '/properties/create',
        '/properties/update',
        '/properties/delete',
        '/login',
        '/register',
        '/dashboard/:path*',
    ]
}
