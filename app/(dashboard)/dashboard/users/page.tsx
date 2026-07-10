"use client";

import React, { useEffect } from "react";
import { useDashboardStore } from "@/store/useDashboardStore";
import UserTable from "@/modules/dashboard/components/UserTable";
import PaginationControls from "@/modules/dashboard/components/PaginationControls";
import FilterDropdown from "@/modules/dashboard/components/FilterDropdown";
import { Users } from "lucide-react";

const roleOptions = [
    { value: "ADMIN", label: "Administradores" },
    { value: "MOD", label: "Moderadores" },
    { value: "USER", label: "Usuarios" },
];

export default function DashboardUsersPage() {
    const {
        users,
        usersPage,
        usersTotalPages,
        usersTotalElements,
        usersLoading,
        userRoleFilter,
        fetchUsers,
        setUserRoleFilter,
    } = useDashboardStore();

    useEffect(() => {
        fetchUsers(0, 8);
    }, [fetchUsers]);

    return (
        <div className="space-y-6">
            {/* ── Header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-primary-button mb-1">
                        Gestión
                    </p>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                        <Users size={24} className="text-primary-button" />
                        Usuarios
                    </h1>
                </div>
                <p className="text-sm text-gray-400">
                    {usersTotalElements} usuarios en total
                </p>
            </div>

            {/* ── Filtros ── */}
            <div className="flex items-center gap-3 flex-wrap">
                <FilterDropdown
                    label="Rol"
                    options={roleOptions}
                    value={userRoleFilter}
                    onChange={(val) => setUserRoleFilter(val as "ADMIN" | "USER" | null)}
                    allLabel="Todos los roles"
                />
            </div>

            {/* ── Tabla ── */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6">
                <UserTable users={users} isLoading={usersLoading} />
                <PaginationControls
                    currentPage={usersPage}
                    totalPages={usersTotalPages}
                    onPageChange={(page) => fetchUsers(page, 8)}
                    isLoading={usersLoading}
                />
            </div>
        </div>
    );
}
