"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading: boolean;
}

export default function PaginationControls({
    currentPage,
    totalPages,
    onPageChange,
    isLoading,
}: PaginationControlsProps) {
    const safeTotalPages = Number(totalPages) || 0;
    const safeCurrentPage = Number(currentPage) || 0;

    if (safeTotalPages <= 1) return null;

    // Generar páginas visibles con ventana deslizante
    const getVisiblePages = (): (number | "ellipsis")[] => {
        const pages: (number | "ellipsis")[] = [];
        const maxVisible = 5;

        if (safeTotalPages <= maxVisible + 2) {
            // Mostrar todas las páginas si son pocas
            for (let i = 0; i < safeTotalPages; i++) pages.push(i);
        } else {
            // Siempre mostrar primera página
            pages.push(0);

            const start = Math.max(1, safeCurrentPage - 1);
            const end = Math.min(safeTotalPages - 2, safeCurrentPage + 1);

            if (start > 1) pages.push("ellipsis");

            for (let i = start; i <= end; i++) pages.push(i);

            if (end < safeTotalPages - 2) pages.push("ellipsis");

            // Siempre mostrar última página
            pages.push(safeTotalPages - 1);
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-center gap-1.5 mt-6">
            {/* Botón anterior */}
            <button
                onClick={() => onPageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 0 || isLoading}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
                <ChevronLeft size={18} />
            </button>

            {/* Páginas */}
            {visiblePages.map((page, idx) => {
                if (page === "ellipsis") {
                    return (
                        <span
                            key={`ellipsis-${idx}`}
                            className="px-2 py-1 text-gray-400 text-sm"
                        >
                            …
                        </span>
                    );
                }

                const isActive = page === safeCurrentPage;
                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        disabled={isLoading}
                        className={`
                            min-w-[36px] h-[36px] rounded-xl text-sm font-medium
                            transition-all duration-200 cursor-pointer
                            ${isActive
                                ? "bg-primary-button text-white shadow-sm shadow-primary-button/30"
                                : "text-gray-600 hover:bg-gray-100"
                            }
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                    >
                        {page + 1}
                    </button>
                );
            })}

            {/* Botón siguiente */}
            <button
                onClick={() => onPageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage >= safeTotalPages - 1 || isLoading}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}

