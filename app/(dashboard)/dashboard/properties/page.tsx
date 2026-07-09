"use client";

import React, { useEffect } from "react";
import { useDashboardStore } from "@/store/useDashboardStore";
import PropertyTable from "@/modules/dashboard/components/PropertyTable";
import PaginationControls from "@/modules/dashboard/components/PaginationControls";
import FilterDropdown from "@/modules/dashboard/components/FilterDropdown";
import { Building2 } from "lucide-react";

const propertyTypeOptions = [
    { value: "HOUSE", label: "Casas" },
    { value: "APARTMENT", label: "Departamentos" },
    { value: "LAND", label: "Terrenos" },
];

const operationTypeOptions = [
    { value: "SALE", label: "Venta" },
    { value: "RENT", label: "Alquiler" },
];

const availableOptions = [
    { value: "true", label: "Publicado" },
    { value: "false", label: "No publicado" },
];

export default function DashboardPropertiesPage() {
    const {
        properties,
        propertiesPage,
        propertiesTotalPages,
        propertiesTotalElements,
        propertiesLoading,
        propertyTypeFilter,
        operationTypeFilter,
        availableFilter,
        fetchProperties,
        setPropertyTypeFilter,
        setOperationTypeFilter,
        setAvailableFilter,
    } = useDashboardStore();

    useEffect(() => {
        fetchProperties(0, 8);
    }, [fetchProperties]);

    return (
        <div className="space-y-6">
            {/* ── Header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-primary-button mb-1">
                        Gestión
                    </p>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                        <Building2 size={24} className="text-primary-button" />
                        Propiedades
                    </h1>
                </div>
                <p className="text-sm text-gray-400">
                    {propertiesTotalElements} propiedades en total
                </p>
            </div>

            {/* ── Filtros ── */}
            <div className="flex items-center gap-3 flex-wrap">
                <FilterDropdown
                    label="Tipo"
                    options={propertyTypeOptions}
                    value={propertyTypeFilter}
                    onChange={setPropertyTypeFilter}
                    allLabel="Todos los tipos"
                />
                <FilterDropdown
                    label="Operación"
                    options={operationTypeOptions}
                    value={operationTypeFilter}
                    onChange={setOperationTypeFilter}
                    allLabel="Todas las operaciones"
                />
                <FilterDropdown
                    label="Publicado"
                    options={availableOptions}
                    value={availableFilter === null ? null : String(availableFilter)}
                    onChange={(val) => setAvailableFilter(val === null ? null : val === "true")}
                    allLabel="Todos los estados"
                />
            </div>

            {/* ── Tabla ── */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <PropertyTable properties={properties} isLoading={propertiesLoading} />
                <PaginationControls
                    currentPage={propertiesPage}
                    totalPages={propertiesTotalPages}
                    onPageChange={(page) => fetchProperties(page, 8)}
                    isLoading={propertiesLoading}
                />
            </div>
        </div>
    );
}
