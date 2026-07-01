import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "@/shared/constants/routes";

const AUTH_TOKEN = "auth-token";
const REFRESH_TOKEN = "refresh-token";

function isJwtExpired(token: string): boolean {
    try {
        const payload = JSON.parse(
            atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
        );

        if (!payload.exp) return true;

        const expiresAt = payload.exp * 1000;
        const now = Date.now();

        return expiresAt <= now;
    } catch {
        return true;
    }
}

function redirectToLogin(request: NextRequest) {
    const loginUrl = new URL(ROUTES.AUTH.LOGIN, request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    const response = NextResponse.redirect(loginUrl);

    response.cookies.delete(AUTH_TOKEN);
    response.cookies.delete(REFRESH_TOKEN);
    response.cookies.delete("role");

    return response;
}

async function refreshAuth(request: NextRequest) {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!backendUrl) return null;

    const refreshResponse = await fetch(ROUTES.AUTH.REFRESH, {
        method: "POST",
        headers: {
            cookie: request.headers.get("cookie") ?? "",
        },
        credentials: "include",
    });

    if (!refreshResponse.ok) return null;

    return refreshResponse;
}

function copySetCookie(from: Response, to: NextResponse) {
    const setCookie = from.headers.get("set-cookie");

    if (setCookie) {
        to.headers.set("set-cookie", setCookie);
    }
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get(AUTH_TOKEN)?.value;
    const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
    const user = { role: request.cookies.get("role")?.value };
    const { pathname } = request.nextUrl;

    const isProtectedRoute =
        pathname.startsWith("/my-profile") ||
        pathname.startsWith("/properties/create") ||
        pathname.startsWith("/properties/update") ||
        pathname.startsWith("/properties/delete") ||
        pathname.startsWith("/dashboard");

    const isAuthRoute =
        pathname.startsWith("/login") ||
        pathname.startsWith("/register");

    if (isProtectedRoute) {
        if (token && !isJwtExpired(token)) {
            if (pathname.startsWith("/dashboard") && user.role !== "ADMIN") {
                return new NextResponse("Not Found", { status: 404 });
            }

            return NextResponse.next();
        }

        if (refreshToken) {
            const refreshResponse = await refreshAuth(request);

            if (refreshResponse) {
                const response = NextResponse.next();
                copySetCookie(refreshResponse, response);
                return response;
            }
        }

        return redirectToLogin(request);
    }

    if (isAuthRoute && token && !isJwtExpired(token)) {
        return NextResponse.redirect(new URL(ROUTES.AUTH.MY_PROFILE, request.url));
    }

    if (isAuthRoute && refreshToken) {
        const refreshResponse = await refreshAuth(request);

        if (refreshResponse) {
            const response = NextResponse.redirect(
                new URL(ROUTES.AUTH.MY_PROFILE, request.url)
            );

            copySetCookie(refreshResponse, response);
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/my-profile/:path*",
        "/properties/create/:path*",
        "/properties/update/:path*",
        "/properties/delete/:path*",
        "/login",
        "/register",
        "/dashboard/:path*",
    ],
};