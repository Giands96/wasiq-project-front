"use client";

import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { ChartDataItem } from "../types/dashboard.types";

const COLORS_TYPE = ["#C2A878", "#8F7A54", "#E8E2D6"];
const COLORS_OPERATION = ["#7A8B6B", "#B06A62"];

interface DashboardPieChartProps {
    data: ChartDataItem[];
    title: string;
    variant?: "type" | "operation";
}

export default function DashboardPieChart({
    data,
    title,
    variant = "type",
}: DashboardPieChartProps) {
    const colors = variant === "type" ? COLORS_TYPE : COLORS_OPERATION;
    const total = data.reduce((acc, item) => acc + item.value, 0);

    if (data.length === 0) {
        return (
            <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                    {title}
                </h3>
                <div className="flex items-center justify-center h-[220px] text-gray-300 text-sm">
                    Sin datos disponibles
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                {title}
            </h3>
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                                className="transition-opacity duration-200 hover:opacity-80"
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid #E8E2D6",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            fontSize: "13px",
                        }}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        formatter={(value: any) => [
                            `${value} (${((Number(value) / total) * 100).toFixed(1)}%)`,
                            "",
                        ]}
                    />
                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        iconSize={8}
                        formatter={(val) => (
                            <span className="text-xs text-gray-600 ml-1">{val}</span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
