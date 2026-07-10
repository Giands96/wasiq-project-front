"use client";

import React, { useState } from "react";
import { Property } from "@/modules/properties/types/property.types";
import { useDashboardStore } from "@/store/useDashboardStore";
import Link from "next/link";
import { Building2, MapPin, Bed, Bath, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface PropertyTableProps {
    properties: Property[];
    isLoading: boolean;
}

const typeLabels: Record<string, string> = {
    HOUSE: "Casa",
    APARTMENT: "Depto.",
    LAND: "Terreno",
};

const opLabels: Record<string, string> = {
    SALE: "Venta",
    RENT: "Alquiler",
};

export default function PropertyTable({ properties, isLoading }: PropertyTableProps) {
    const { deleteProperty } = useDashboardStore();
    const [confirmDeleteSlug, setConfirmDeleteSlug] = useState<string | null>(null);

    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (properties.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <Building2 size={40} strokeWidth={1.5} />
                <p className="mt-3 text-sm font-medium">No se encontraron propiedades</p>
            </div>
        );
    }

    const handleDelete = async (slug: string) => {
        setConfirmDeleteSlug(null);
        const ok = await deleteProperty(slug);
        if (ok) toast.success("Propiedad eliminada");
        else toast.error("Error al eliminar la propiedad");
    };

    return (
        <>
            {/* ── Desktop: Table ── */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                Propiedad
                            </th>
                            <th className="text-left py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                Tipo
                            </th>
                            <th className="text-left py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                Operación
                            </th>
                            <th className="text-right py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                Precio
                            </th>
                            <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                Hab.
                            </th>
                            <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                Baños
                            </th>
                            <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                Activo
                            </th>
                            <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                Publicado
                            </th>
                            <th className="text-center py-3 px-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => (
                            <tr
                                key={property.id}
                                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                            >
                                <td className="py-3.5 px-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800 truncate max-w-[220px]">
                                            {property.title}
                                        </p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                            <MapPin size={11} />
                                            {property.address}
                                        </p>
                                    </div>
                                </td>
                                <td className="py-3.5 px-4">
                                    <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-lg bg-secondary-base text-secondary-text">
                                        {typeLabels[property.propertyType] || property.propertyType}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4">
                                    <span
                                        className={`inline-block px-2.5 py-1 text-xs font-medium rounded-lg ${
                                            property.operationType === "SALE"
                                                ? "bg-green-50 text-green-700"
                                                : "bg-blue-50 text-blue-700"
                                        }`}
                                    >
                                        {opLabels[property.operationType] || property.operationType}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4 text-right">
                                    <span className="text-sm font-bold text-gray-800">
                                        ${property.price.toLocaleString("es-ES")}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4 text-center">
                                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                                        <Bed size={13} />
                                        {property.bedrooms}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4 text-center">
                                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                                        <Bath size={13} />
                                        {property.bathrooms}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4 text-center">
                                    <span
                                        className={`inline-block w-2 h-2 rounded-full ${
                                            property.active ? "bg-status-success" : "bg-gray-300"
                                        }`}
                                        title={property.active ? "Activa" : "Eliminada"}
                                    />
                                </td>
                                <td className="py-3.5 px-4">
                                    <span
                                        className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                                            property.available
                                                ? "bg-green-50 text-green-700 border border-green-200"
                                                : "bg-gray-50 text-gray-500 border border-gray-200"
                                        }`}
                                    >
                                        {property.available ? "Publicado" : "No publicado"}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <Link
                                            href={`/properties/${property.slug}`}
                                            className="p-2 rounded-lg text-gray-400 hover:text-primary-button hover:bg-primary-button/5 transition-colors cursor-pointer"
                                            title="Ir a la propiedad"
                                        >
                                            <ExternalLink size={16} />
                                        </Link>
                                        <button
                                            onClick={() => setConfirmDeleteSlug(property.slug)}
                                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Mobile: Cards ── */}
            <div className="md:hidden space-y-3">
                {properties.map((property) => (
                    <div
                        key={property.id}
                        className="bg-gray-50/70 rounded-xl p-4 border border-gray-100"
                    >
                        {/* Title + address + delete */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-gray-800 truncate">
                                    {property.title}
                                </p>
                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                    <MapPin size={11} />
                                    {property.address}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <Link
                                    href={`/properties/${property.slug}`}
                                    className="p-2 rounded-lg text-gray-400 hover:text-primary-button hover:bg-primary-button/5 transition-colors cursor-pointer"
                                    title="Ir a la propiedad"
                                >
                                    <ExternalLink size={16} />
                                </Link>
                                {property.active && (
                                    <button
                                        onClick={() => setConfirmDeleteSlug(property.slug)}
                                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                        title="Eliminar"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-lg bg-secondary-base text-secondary-text">
                                {typeLabels[property.propertyType] || property.propertyType}
                            </span>
                            <span
                                className={`inline-block px-2.5 py-1 text-xs font-medium rounded-lg ${
                                    property.operationType === "SALE"
                                        ? "bg-green-50 text-green-700"
                                        : "bg-blue-50 text-blue-700"
                                }`}
                            >
                                {opLabels[property.operationType] || property.operationType}
                            </span>
                        </div>

                        {/* Price */}
                        <p className="text-base font-bold text-gray-900 mb-3">
                            ${property.price.toLocaleString("es-ES")}
                        </p>

                        {/* Details row */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                            <span className="inline-flex items-center gap-1">
                                <Bed size={13} />
                                {property.bedrooms} hab.
                            </span>
                            <span className="inline-flex items-center gap-1">
                                <Bath size={13} />
                                {property.bathrooms} baños
                            </span>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-3 text-xs">
                            <span className="inline-flex items-center gap-1.5">
                                <span
                                    className={`inline-block w-2 h-2 rounded-full ${
                                        property.active ? "bg-status-success" : "bg-gray-300"
                                    }`}
                                />
                                {property.active ? "Activa" : "Eliminada"}
                            </span>
                            <span
                                className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                                    property.available
                                        ? "bg-green-50 text-green-700 border border-green-200"
                                        : "bg-gray-50 text-gray-500 border border-gray-200"
                                }`}
                            >
                                {property.available ? "Publicado" : "No publicado"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Confirm delete modal ── */}
            {confirmDeleteSlug !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    onClick={() => setConfirmDeleteSlug(null)}
                >
                    <div
                        className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                <Trash2 size={20} className="text-red-500" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900">Eliminar propiedad</h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            Esta acción desactivará la propiedad. No se puede deshacer.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmDeleteSlug(null)}
                                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleDelete(confirmDeleteSlug)}
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