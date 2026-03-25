"use client";

import React from "react";
import { User } from "@/modules/auth/types/auth.types";
import { Users, Mail, Phone } from "lucide-react";

interface UserTableProps {
    users: User[];
    isLoading: boolean;
}

export default function UserTable({ users, isLoading }: UserTableProps) {
    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (!users || users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <Users size={40} strokeWidth={1.5} />
                <p className="mt-3 text-sm font-medium">No se encontraron usuarios</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                            Usuario
                        </th>
                        <th className="text-left py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                            Email
                        </th>
                        <th className="text-left py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                            Teléfono
                        </th>
                        <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                            Rol
                        </th>
                        <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                            Estado
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                        >
                            {/* Usuario (sin foto) */}
                            <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                    {/* Icono genérico en lugar de foto */}
                                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0">
                                        <span className="text-sm font-bold">
                                            {user.firstName?.charAt(0)?.toUpperCase()}
                                            {user.lastName?.charAt(0)?.toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {user.firstName} {user.lastName}
                                        </p>
                                        <p className="text-xs text-gray-400">ID: {user.id}</p>
                                    </div>
                                </div>
                            </td>

                            {/* Email */}
                            <td className="py-3.5 px-4">
                                <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                                    <Mail size={13} className="text-gray-300" />
                                    {user.email}
                                </span>
                            </td>

                            {/* Teléfono */}
                            <td className="py-3.5 px-4">
                                <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                                    <Phone size={13} className="text-gray-300" />
                                    {user.phone || "—"}
                                </span>
                            </td>

                            {/* Rol */}
                            <td className="py-3.5 px-4 text-center">
                                <span
                                    className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-lg ${user.role === "ADMIN"
                                            ? "bg-amber-50 text-amber-700"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {user.role}
                                </span>
                            </td>

                            {/* Estado */}
                            <td className="py-3.5 px-4 text-center">
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg ${user.active
                                            ? "bg-green-50 text-green-700"
                                            : "bg-red-50 text-red-500"
                                        }`}
                                >
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${user.active ? "bg-green-500" : "bg-red-400"
                                            }`}
                                    />
                                    {user.active ? "Activo" : "Inactivo"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
