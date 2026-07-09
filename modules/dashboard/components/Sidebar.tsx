"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { ROUTES } from "@/shared/constants/routes";
import {
    LayoutDashboard,
    Building2,
    Users,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
} from "lucide-react";

const navItems = [
    { href: ROUTES.DASHBOARD.HOME, icon: LayoutDashboard, label: "Dashboard" },
    { href: ROUTES.DASHBOARD.PROPERTIES, icon: Building2, label: "Propiedades" },
    { href: ROUTES.DASHBOARD.USERS, icon: Users, label: "Usuarios" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuthStore();
    const { logout } = useLogout();
    const [collapsed, setCollapsed] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const isActive = (href: string) =>
        pathname === href ||
        (href !== ROUTES.DASHBOARD.HOME && pathname.startsWith(href));

    return (
        <>
            {/* ── Mobile top bar ── */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-800 tracking-tight">
                        Wasiq<span className="text-orange-600">.</span>
                    </span>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest hidden sm:inline">
                        Panel Admin
                    </span>
                </div>
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                    aria-label="Abrir menú"
                >
                    <Menu size={22} />
                </button>
            </div>

            {/* ── Mobile backdrop ── */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ── Sidebar ── */}
            <aside
                className={`
                    z-50 bg-white border-r border-gray-200 flex flex-col
                    transition-all duration-300 ease-in-out

                    fixed inset-y-0 left-0
                    ${mobileOpen ? "translate-x-0 w-[260px]" : "-translate-x-full w-[260px] md:translate-x-0"}

                    md:sticky md:top-0 md:h-screen md:transition-all
                    ${collapsed ? "md:w-[72px]" : "md:w-[260px]"}
                `}
            >
                {/* ── Header ── */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
                    {!collapsed && (
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-gray-800 tracking-tight">
                                Wasiq<span className="text-orange-600">.</span>
                            </span>
                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                                Panel Admin
                            </span>
                        </div>
                    )}
                    <button
                        onClick={() => {
                            if (window.innerWidth >= 768) {
                                setCollapsed(!collapsed);
                            } else {
                                setMobileOpen(false);
                            }
                        }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        aria-label={mobileOpen ? "Cerrar menú" : undefined}
                    >
                        {mobileOpen ? (
                            <X size={18} className="md:hidden" />
                        ) : collapsed ? (
                            <ChevronRight size={18} className="hidden md:block" />
                        ) : (
                            <ChevronLeft size={18} className="hidden md:block" />
                        )}
                    </button>
                </div>

                {/* ── Navigation ── */}
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-xl
                                text-sm font-medium transition-all duration-200
                                ${
                                    isActive(item.href)
                                        ? "bg-primary-button text-white shadow-sm shadow-primary-button/30"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }
                                ${collapsed ? "md:justify-center" : ""}
                            `}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon size={20} className="flex-shrink-0" />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                {/* ── Footer / User ── */}
                <div className="border-t border-gray-100 p-3 space-y-2">
                    {!collapsed && user && (
                        <div className="px-3 py-2">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                    )}

                    <button
                        onClick={logout}
                        className={`
                            flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
                            text-sm font-medium text-red-500 hover:bg-red-50
                            transition-colors cursor-pointer
                            ${collapsed ? "md:justify-center" : ""}
                        `}
                        title={collapsed ? "Cerrar Sesión" : undefined}
                    >
                        <LogOut size={20} className="flex-shrink-0" />
                        {!collapsed && <span>Cerrar Sesión</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}