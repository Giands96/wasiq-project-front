export interface DashboardMetrics {
    totalUsers: number;
    totalProperties: number;
    activeProperties: number;
    propertiesByType: ChartDataItem[];
    propertiesByOperation: ChartDataItem[];
}

export interface ChartDataItem {
    name: string;
    value: number;
}
