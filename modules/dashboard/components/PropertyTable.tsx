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
        <div className="overflow-x-auto">
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
                            Estado
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr
                            key={property.id}
                            className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                        >
                            {/* Propiedad */}
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

                            {/* Tipo */}
                            <td className="py-3.5 px-4">
                                <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-lg bg-secondary-base text-secondary-text">
                                    {typeLabels[property.propertyType] || property.propertyType}
                                </span>
                            </td>

                            {/* Operación */}
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

                            {/* Precio */}
                            <td className="py-3.5 px-4 text-right">
                                <span className="text-sm font-bold text-gray-800">
                                    ${property.price.toLocaleString("es-ES")}
                                </span>
                            </td>

                            {/* Habitaciones */}
                            <td className="py-3.5 px-4 text-center">
                                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                                    <Bed size={13} />
                                    {property.bedrooms}
                                </span>
                            </td>

                            {/* Baños */}
                            <td className="py-3.5 px-4 text-center">
                                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                                    <Bath size={13} />
                                    {property.bathrooms}
                                </span>
                            </td>

                            {/* Estado */}
                            <td className="py-3.5 px-4 text-center">
                                <span
                                    className={`inline-block w-2 h-2 rounded-full ${
                                        property.active ? "bg-status-success" : "bg-gray-300"
                                    }`}
                                    title={property.active ? "Activa" : "Inactiva"}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
