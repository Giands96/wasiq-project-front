import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "@/shared/constants/routes";
import next from "next";

export function middleware(request: NextRequest) {
    // Obtener el token de la cookie httpOnly "auth-token" (establecida por el backend)
    const token = request.cookies.get("auth-token")?.value;
    const user = { role: "USER" }
    // pathname es la ruta actual
    const { pathname } = request.nextUrl;

    // Rutas protegidas
    const isProtectedRoute =
        pathname.startsWith('/my-profile') ||
        pathname.startsWith('/properties/create') ||
        pathname.startsWith('/properties/update') ||
        pathname.startsWith('/properties/delete') ||
        pathname.startsWith('/dashboard')

    // Rutas que un usuario ya logueado no debería ver
    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register")

    // Si es una ruta protegida y el usuario que la visita no posee un token se redirige
    if (isProtectedRoute && !token) {
        const loginUrl = new URL(ROUTES.AUTH.LOGIN, request.url)
        //Se añade un parámetro de búsqueda a la URL de login para que el usuario sea redirigido a la ruta actual después de iniciar sesión
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