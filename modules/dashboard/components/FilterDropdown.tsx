"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface FilterOption {
    value: string;
    label: string;
}

interface FilterDropdownProps {
    label: string;
    options: FilterOption[];
    value: string | null;
    onChange: (value: string | null) => void;
    allLabel?: string;
}

export default function FilterDropdown({
    label,
    options,
    value,
    onChange,
    allLabel = "Todos",
}: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cerrar al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel =
        value === null
            ? allLabel
            : options.find((o) => o.value === value)?.label || value;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium
                    transition-all duration-200 cursor-pointer
                    ${
                        value !== null
                            ? "border-primary-button bg-primary-button/5 text-primary-button"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }
                `}
            >
                <span className="text-xs text-gray-400 mr-1">{label}:</span>
                <span>{selectedLabel}</span>
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-200/50 z-50 py-1 animate-fade-in">
                    {/* Opción "Todos" */}
                    <button
                        onClick={() => {
                            onChange(null);
                            setIsOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <span
                            className={
                                value === null
                                    ? "font-medium text-gray-900"
                                    : "text-gray-600"
                            }
                        >
                            {allLabel}
                        </span>
                        {value === null && (
                            <Check size={14} className="text-primary-button" />
                        )}
                    </button>

                    <div className="h-px bg-gray-100 mx-3" />

                    {/* Opciones */}
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <span
                                className={
                                    value === option.value
                                        ? "font-medium text-gray-900"
                                        : "text-gray-600"
                                }
                            >
                                {option.label}
                            </span>
                            {value === option.value && (
                                <Check size={14} className="text-primary-button" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
