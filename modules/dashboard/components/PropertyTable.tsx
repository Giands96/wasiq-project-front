"use client";

import React from "react";
import { Property } from "@/modules/properties/types/property.types";
import { Building2, MapPin, Bed, Bath } from "lucide-react";

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
                        {/* Title + address */}
                        <div className="mb-3">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                                {property.title}
                            </p>
                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                <MapPin size={11} />
                                {property.address}
                            </p>
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
        </>
    );
}