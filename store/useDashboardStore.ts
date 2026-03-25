import { create } from "zustand";
import { User, Role } from "@/modules/auth/types/auth.types";
import { Property } from "@/modules/properties/types/property.types";
import { PropertyService } from "@/modules/properties/services/property.service";
import { userService } from "@/modules/users/services/user.service";
import { ChartDataItem } from "@/modules/dashboard/types/dashboard.types";

interface DashboardState {
    // ── Usuarios ──
    users: User[];
    usersPage: number;
    usersTotalPages: number;
    usersTotalElements: number;
    usersLoading: boolean;
    userRoleFilter: Role | null;
    userOrderDesc: boolean;

    // ── Propiedades ──
    properties: Property[];
    propertiesPage: number;
    propertiesTotalPages: number;
    propertiesTotalElements: number;
    propertiesLoading: boolean;
    propertyTypeFilter: string | null;
    operationTypeFilter: string | null;

    // ── Métricas (derivadas de los fetches iniciales) ──
    metricsLoading: boolean;
    totalUsers: number;
    totalProperties: number;
    activeProperties: number;
    propertiesByType: ChartDataItem[];
    propertiesByOperation: ChartDataItem[];

    // ── Acciones ──
    fetchUsers: (page?: number, size?: number) => Promise<void>;
    fetchProperties: (page?: number, size?: number) => Promise<void>;
    fetchDashboardMetrics: () => Promise<void>;
    setUserRoleFilter: (role: Role | null) => void;
    setUserOrderDesc: (desc: boolean) => void;
    setPropertyTypeFilter: (type: string | null) => void;
    setOperationTypeFilter: (type: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
    //Estado iniciaL Usuario
    users: [],
    usersPage: 0,
    usersTotalPages: 0,
    usersTotalElements: 0,
    usersLoading: false,
    userRoleFilter: null,
    userOrderDesc: true,

    //Estado iniciaL Propiedad
    properties: [],
    propertiesPage: 0,
    propertiesTotalPages: 0,
    propertiesTotalElements: 0,
    propertiesLoading: false,
    propertyTypeFilter: null,
    operationTypeFilter: null,

    //Estado inicial Métricas
    metricsLoading: false,
    totalUsers: 0,
    totalProperties: 0,
    activeProperties: 0,
    propertiesByType: [],
    propertiesByOperation: [],

    //FETCH USUARIOS
    fetchUsers: async (page = 0, size = 8) => {
        set({ usersLoading: true });
        try {
            const { userRoleFilter } = get();

            let response;
            if (userRoleFilter) {
                response = await userService.getUsersByRole(userRoleFilter, { page, size });
            } else {
                response = await userService.getUsersDesc({ page, size });
            }

            set({
                users: response.content,
                usersPage: response.number,
                usersTotalPages: response.totalPages,
                usersTotalElements: response.totalElements,
            });
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            set({ usersLoading: false });
        }
    },

    // ── FETCH PROPIEDADES ──
    fetchProperties: async (page = 0, size = 8) => {
        set({ propertiesLoading: true });
        try {
            const { propertyTypeFilter, operationTypeFilter } = get();

            const response = await PropertyService.getPropertiesList({
                page,
                size,
                propertyType: propertyTypeFilter || undefined,
                operationType: operationTypeFilter || undefined,
                sort: "id,desc",
            });

            set({
                properties: response.content,
                propertiesPage: response.number,
                propertiesTotalPages: response.totalPages,
                propertiesTotalElements: response.totalElements,
            });
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            set({ propertiesLoading: false });
        }
    },

    // ── FETCH MÉTRICAS (para la página principal del dashboard) ──
    fetchDashboardMetrics: async () => {
        set({ metricsLoading: true });
        try {
            // Obtener todos los datos con un tamaño grande para calcular métricas
            const [usersRes, propertiesRes] = await Promise.all([
                userService.getUsersDesc({ page: 0, size: 1 }),
                PropertyService.getPropertiesList({ page: 0, size: 100, sort: "id,desc" }),
            ]);

            const allProperties = propertiesRes.content;

            // Calcular distribución por tipo de propiedad
            const typeCount: Record<string, number> = {};
            const opCount: Record<string, number> = {};

            allProperties.forEach((p) => {
                typeCount[p.propertyType] = (typeCount[p.propertyType] || 0) + 1;
                opCount[p.operationType] = (opCount[p.operationType] || 0) + 1;
            });

            const typeLabels: Record<string, string> = {
                HOUSE: "Casas",
                APARTMENT: "Departamentos",
                LAND: "Terrenos",
            };

            const opLabels: Record<string, string> = {
                SALE: "Venta",
                RENT: "Alquiler",
            };

            const propertiesByType: ChartDataItem[] = Object.entries(typeCount).map(
                ([key, value]) => ({ name: typeLabels[key] || key, value })
            );

            const propertiesByOperation: ChartDataItem[] = Object.entries(opCount).map(
                ([key, value]) => ({ name: opLabels[key] || key, value })
            );

            const activeProperties = allProperties.filter((p) => p.active).length;

            set({
                totalUsers: usersRes.totalElements,
                totalProperties: propertiesRes.totalElements,
                activeProperties,
                propertiesByType,
                propertiesByOperation,
            });
        } catch (error) {
            console.error("Error fetching dashboard metrics:", error);
        } finally {
            set({ metricsLoading: false });
        }
    },

    // ── SETTERS DE FILTROS ──
    setUserRoleFilter: (role) => {
        set({ userRoleFilter: role, usersPage: 0 });
        get().fetchUsers(0);
    },

    setUserOrderDesc: (desc) => {
        set({ userOrderDesc: desc, usersPage: 0 });
        get().fetchUsers(0);
    },

    setPropertyTypeFilter: (type) => {
        set({ propertyTypeFilter: type, propertiesPage: 0 });
        get().fetchProperties(0);
    },

    setOperationTypeFilter: (type) => {
        set({ operationTypeFilter: type, propertiesPage: 0 });
        get().fetchProperties(0);
    },
}));
