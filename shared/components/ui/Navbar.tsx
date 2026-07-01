"use client";

import React from "react";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { User, Menu, LogOut, Home, Settings, MenuIcon, Headset, House, ShieldUser } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

const UserMenu = () => {
  const { user } = useAuthStore();
  const { logout } = useLogout();

  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-xs transition-all flex items-center gap-3 hover:shadow-md outline-none">
            <div className="bg-neutral-100 rounded-full w-8 h-8 flex items-center justify-center text-neutral-600">
              <User size={18} />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {/* Si Zustand aún no hidrata, mostramos "Mi Perfil" de forma segura */}
              {user ? `${user.firstName} ${user.lastName}` : "Mi Perfil"}
            </span>
            <Menu className="w-4 h-4 text-gray-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={ROUTES.AUTH.MY_PROFILE}>
              <User className="mr-2 h-4 w-4" /> Perfil
            </Link>
          </DropdownMenuItem>
          {(user?.role === "ADMIN") && (<DropdownMenuItem asChild className="cursor-pointer">
            <Link href={ROUTES.DASHBOARD.HOME}>
              <ShieldUser className="mr-2 h-4 w-4" /> Dashboard Admin.
            </Link>
          </DropdownMenuItem>)}
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" /> Configuración
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logout}
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link
        href={ROUTES.PROPERTIES.CREATE}
        className="ml-4 px-3 flex items-center justify-center text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all text-md"
      >
        <House className="mr-2 h-4 w-4" /> Publicar Propiedad
      </Link>
    </div>
  );
};

const MobileMenu = () => {
  const { logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer bg-white border border-gray-200 p-3 rounded-full shadow-xs transition-all flex items-center gap-3 hover:shadow-md outline-none">
          <MenuIcon className="w-6 h-6 text-gray-700" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href={ROUTES.HOME} className="cursor-pointer">
            <Home className="mr-2 h-4 w-4" /> Inicio
          </Link>
        </DropdownMenuItem>
        {/* asChild es */ }
        <DropdownMenuItem asChild>
          <Link href={ROUTES.PROPERTIES.LIST} className="cursor-pointer">
            <House className="mr-2 h-4 w-4" /> Propiedades
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={ROUTES.CONTACT.US} className="cursor-pointer">
            <Headset className="mr-2 h-4 w-4" /> Contacto
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white cursor-pointer transition-colors focus:bg-red-700 focus:text-white"
        >
          <LogOut className="mr-2 h-4 w-4 text-white" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface NavbarProps {
  serverIsAuthenticated: boolean;
}

export const Navbar = ({ serverIsAuthenticated }: NavbarProps) => {
  const { user, isAuthenticated, _hasHydrated } = useAuthStore();
  const clientIsAuthenticated = _hasHydrated && isAuthenticated;
  const showAuthenticatedState = serverIsAuthenticated || clientIsAuthenticated;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="container mx-auto h-20 flex items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800 tracking-tight">
          Wasiq<span className="text-orange-600">.</span>
        </Link>

        {/* Links de Navegación — Desktop */}
        <ul className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
          <li>
            <Link href="/" className="hover:text-black transition-colors">
              Inicio
            </Link>
          </li>
          <li>
            <Link href={ROUTES.PROPERTIES.LIST} className="hover:text-black transition-colors">
              Propiedades
            </Link>
          </li>
          <li>
            <Link href={ROUTES.CONTACT.US} className="hover:text-black transition-colors">
              Contacto
            </Link>
          </li>

          {/* Área de Usuario — Desktop */}
          <li className="ml-4 pl-4 border-l border-gray-200">
            {showAuthenticatedState ? (
              <UserMenu />
            ) : (
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all text-xs font-semibold"
              >
                Iniciar Sesión
              </Link>
            )}
          </li>
        </ul>

        {/* Menú — Mobile */}
        <div className="lg:hidden ">
          {showAuthenticatedState ? (
            <MobileMenu />
          ) : (
            <Link
              href={ROUTES.AUTH.LOGIN}
              className="px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all text-xs font-semibold"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};