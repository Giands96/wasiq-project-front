"use client";

import React from "react";

interface MetricCardProps {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: React.ReactNode;
    variant?: "default" | "highlighted";
}

export default function MetricCard({
    title,
    value,
    subtitle,
    icon,
    variant = "default",
}: MetricCardProps) {
    const isHighlighted = variant === "highlighted";

    return (
        <div
            className={`
                relative rounded-2xl p-6 transition-all duration-300
                ${
                    isHighlighted
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg shadow-gray-900/20"
                        : "bg-white border border-gray-100 hover:shadow-md hover:shadow-gray-100/50"
                }
            `}
        >
            {/* Icon */}
            <div
                className={`
                    w-10 h-10 rounded-xl flex items-center justify-center mb-4
                    ${isHighlighted ? "bg-white/10" : "bg-primary-button/10"}
                `}
            >
                <span className={isHighlighted ? "text-white" : "text-primary-button"}>
                    {icon}
                </span>
            </div>

            {/* Label */}
            <p
                className={`text-[11px] font-bold uppercase tracking-widest mb-1 ${
                    isHighlighted ? "text-gray-300" : "text-gray-400"
                }`}
            >
                {title}
            </p>

            {/* Value */}
            <p
                className={`text-3xl font-extrabold tracking-tight ${
                    isHighlighted ? "text-white" : "text-gray-900"
                }`}
            >
                {typeof value === "number" ? value.toLocaleString("es-ES") : value}
            </p>

            {/* Subtitle */}
            {subtitle && (
                <p
                    className={`text-xs mt-2 font-medium ${
                        isHighlighted ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
