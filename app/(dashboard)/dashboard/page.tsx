"use client";

import React, { useEffect } from "react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useAuthStore } from "@/store/useAuthStore";
import MetricCard from "@/modules/dashboard/components/MetricCard";
import DashboardPieChart from "@/modules/dashboard/components/DashboardPieChart";
import PropertyTable from "@/modules/dashboard/components/PropertyTable";
import { Users, Building2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import { ArrowRight } from "lucide-react";

export default function DashboardHomePage() {
    const { user } = useAuthStore();
    const {
        totalUsers,
        totalProperties,
        activeProperties,
        propertiesByType,
        propertiesByOperation,
        metricsLoading,
        fetchDashboardMetrics,
        properties,
        propertiesLoading,
        fetchProperties,
    } = useDashboardStore();

    useEffect(() => {
        fetchDashboardMetrics();
        fetchProperties(0, 4); // Últimas 4 propiedades para la vista previa
    }, [fetchDashboardMetrics, fetchProperties]);

    return (
        <div className="space-y-8">
            {/* ── Header ── */}
            <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary-button mb-1">
                    Panel de administración
                </p>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Bienvenido, {user?.firstName || "Admin"}
                </h1>
            </div>

            {/* ── Metric Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <MetricCard
                    title="Total Usuarios"
                    value={metricsLoading ? "…" : totalUsers}
                    subtitle="Usuarios registrados"
                    icon={<Users size={20} />}
                />
                <MetricCard
                    title="Propiedades Activas"
                    value={metricsLoading ? "…" : activeProperties}
                    subtitle="Listados activos"
                    icon={<CheckCircle size={20} />}
                />
                <MetricCard
                    title="Total Propiedades"
                    value={metricsLoading ? "…" : totalProperties}
                    subtitle="En la plataforma"
                    icon={<Building2 size={20} />}
                    variant="highlighted"
                />
            </div>

            {/* ── Charts ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <DashboardPieChart
                    data={propertiesByType}
                    title="Distribución por Tipo"
                    variant="type"
                />
                <DashboardPieChart
                    data={propertiesByOperation}
                    title="Distribución por Operación"
                    variant="operation"
                />
            </div>

            {/* ── Recent Properties ── */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                            Actividad reciente
                        </p>
                        <h2 className="text-lg font-bold text-gray-900">
                            Últimas Propiedades
                        </h2>
                    </div>
                    <Link
                        href={ROUTES.DASHBOARD.PROPERTIES}
                        className="flex items-center gap-1 text-sm font-medium text-primary-button hover:text-primary-hover transition-colors"
                    >
                        Ver todas
                        <ArrowRight size={14} />
                    </Link>
                </div>
                <PropertyTable properties={properties.slice(0, 4)} isLoading={propertiesLoading} />
            </div>
        </div>
    );
}
