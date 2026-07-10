"use client";

import React, { useState } from "react";
import { User, Role } from "@/modules/auth/types/auth.types";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Users, Mail, Phone, Trash2, ShieldCheck, ShieldX, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface UserTableProps {
    users: User[];
    isLoading: boolean;
}

const roleOptions: { value: Role; label: string; badgeClass: string }[] = [
    { value: "ADMIN", label: "Admin", badgeClass: "bg-amber-50 text-amber-700" },
    { value: "MOD", label: "Moderador", badgeClass: "bg-violet-50 text-violet-700" },
    { value: "USER", label: "Usuario", badgeClass: "bg-gray-100 text-gray-600" },
];

function getRoleBadgeClass(role: string): string {
    return roleOptions.find((r) => r.value === role)?.badgeClass ?? "bg-gray-100 text-gray-600";
}

export default function UserTable({ users, isLoading }: UserTableProps) {
    const { updateUserRole, updateUserStatus, deleteUser } = useDashboardStore();
    const { user: currentUser } = useAuthStore();
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const [roleOpenId, setRoleOpenId] = useState<number | null>(null);

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

    const handleRoleChange = async (userId: number, role: Role) => {
        setRoleOpenId(null);
        const ok = await updateUserRole(userId, role);
        if (ok) toast.success("Rol actualizado correctamente");
        else toast.error("Error al actualizar el rol");
    };

    const handleStatusToggle = async (userId: number, currentActive: boolean) => {
        const ok = await updateUserStatus(userId, !currentActive);
        if (ok) toast.success(!currentActive ? "Usuario activado" : "Usuario desactivado");
        else toast.error("Error al cambiar el estado");
    };

    const handleDelete = async (userId: number) => {
        setConfirmDeleteId(null);
        const ok = await deleteUser(userId);
        if (ok) toast.success("Usuario eliminado");
        else toast.error("Error al eliminar el usuario");
    };

    function renderRoles(user: User) {
        return (
            <div className="relative">
                <button
                    onClick={() => setRoleOpenId(roleOpenId === user.id ? null : user.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${getRoleBadgeClass(user.role)}`}
                >
                    {user.role}
                    <ChevronDown size={12} />
                </button>
                {roleOpenId === user.id && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setRoleOpenId(null)}
                        />
                        <div className="absolute right-0 top-full mt-1 z-50 w-36 bg-white rounded-xl border border-gray-100 shadow-lg py-1">
                            {roleOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleRoleChange(user.id, opt.value)}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${opt.value === user.role ? "font-medium text-gray-900" : "text-gray-600"}`}
                                >
                                    {opt.label}
                                    {opt.value === user.role && <ShieldCheck size={14} className="text-primary-button" />}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }

    function renderActions(user: User) {
        const isSelf = currentUser?.id === user.id;
        if (isSelf) {
            return <span className="text-xs text-gray-300 italic">Tu cuenta</span>;
        }
        return (
            <div className="flex items-center justify-center gap-2">
                <button
                    onClick={() => handleStatusToggle(user.id, user.active)}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${user.active ? "text-green-600 hover:bg-green-50" : "text-red-500 hover:bg-red-50"}`}
                    title={user.active ? "Desactivar" : "Activar"}
                >
                    {user.active ? <ShieldCheck size={16} /> : <ShieldX size={16} />}
                </button>
                <button
                    onClick={() => setConfirmDeleteId(user.id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Eliminar"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        );
    }

    return (
        <>
            {/* ── Desktop: Table ── */}
            <div className="hidden md:block overflow-x-auto">
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
                            <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                            >
                                {/* Usuario */}
                                <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-3">
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
                                    {renderRoles(user)}
                                </td>

                                {/* Estado */}
                                <td className="py-3.5 px-4 text-center">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg ${user.active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-500"}`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${user.active ? "bg-green-500" : "bg-red-400"}`} />
                                        {user.active ? "Activo" : "Inactivo"}
                                    </span>
                                </td>

                                {/* Acciones */}
                                <td className="py-3.5 px-4">
                                    {renderActions(user)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Mobile: Cards ── */}
            <div className="md:hidden space-y-3">
                {users.map((user) => (
                    <div key={user.id} className="bg-gray-50/70 rounded-xl p-4 border border-gray-100">
                        {/* Header: avatar + name + actions */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
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
                            {renderActions(user)}
                        </div>

                        {/* Email + phone */}
                        <div className="space-y-1 mb-3">
                            <p className="text-xs text-gray-600 flex items-center gap-1.5">
                                <Mail size={12} className="text-gray-300" />
                                {user.email}
                            </p>
                            {user.phone && (
                                <p className="text-xs text-gray-600 flex items-center gap-1.5">
                                    <Phone size={12} className="text-gray-300" />
                                    {user.phone}
                                </p>
                            )}
                        </div>

                        {/* Role + status */}
                        <div className="flex items-center justify-between">
                            {renderRoles(user)}
                            <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg ${user.active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-500"}`}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${user.active ? "bg-green-500" : "bg-red-400"}`} />
                                {user.active ? "Activo" : "Inactivo"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Confirm delete modal ── */}
            {confirmDeleteId !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    onClick={() => setConfirmDeleteId(null)}
                >
                    <div
                        className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                <Trash2 size={20} className="text-red-500" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900">Eliminar usuario</h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            Esta acción desactivará al usuario. No se puede deshacer.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleDelete(confirmDeleteId)}
                                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}