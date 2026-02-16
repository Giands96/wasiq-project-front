"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import { User, Menu, LogOut, Home, Settings, MenuIcon, Headset, House } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

const UserMenu = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push(ROUTES.HOME); 
  };

  return (
    <div className="flex">
      <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-xs transition-all flex items-center gap-3 hover:shadow-md outline-none">
          <div className="bg-neutral-100 rounded-full w-8 h-8 flex items-center justify-center text-neutral-600">
            <User size={18} />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user?.firstName + " " + user?.lastName || "Usuario"}
          </span>
          <Menu className="w-4 h-4 text-gray-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Opciones del Menú */}
        <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" /> Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" /> Configuración
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {/* Botón de Salir */}
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
      
      </DropdownMenu>
      <Link href={ROUTES.PROPERTIES.CREATE} className="ml-4 px-3  flex items-center justify-center  text-white bg-normal-link rounded-full hover:bg-hover-link transition-all text-md">
        <House className="mr-2" />Publicar Propiedad
      </Link>
    </div>
    
  );
};

const MobileMenu = () => 
{
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="cursor-pointer bg-white border border-gray-200 p-3 rounded-full shadow-xs transition-all flex items-center gap-3 hover:shadow-md outline-none">
                    <MenuIcon className="w-6 h-6 text-gray-700" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                    <Home className="mr-2 h-4 w-4" /><Link href={ROUTES.HOME}>Inicio</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" /> <Link href={ROUTES.PROPERTIES.LIST}>Propiedades</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Headset className="mr-2 h-4 w-4" /> <Link href={ROUTES.CONTACT.US}>Contacto</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                    <DropdownMenuItem className="bg-red-500 hover:bg-red-700 text-white transition-colors focus:bg-red-900 focus:text-white">
                        <LogOut className="mr-2 h-4 w-4 text-white" /> <Link href={ROUTES.AUTH.LOGOUT}>Cerrar Sesión</Link>
                    </DropdownMenuItem>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const Navbar = () => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="container mx-auto h-20 flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800 tracking-tight">
          Wasiq<span className="text-primary">.</span>
        </Link>

        {/* Links de Navegación */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
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

          {/* Área de Usuario */}
          <li className="ml-4 pl-4 border-l border-gray-200">
            {isAuthenticated ? (
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

        {/* Menú para pantallas pequeñas */}
        <div className="md:hidden">
          {isAuthenticated ? (
            <MobileMenu/>
            ) : (
                <Link
                href={ROUTES.AUTH.LOGIN}
                className="px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all text-xs font-semibold"
              > Iniciar Sesión
              </Link>
            )}
        </div>

      </div>
    </nav>
  );
};