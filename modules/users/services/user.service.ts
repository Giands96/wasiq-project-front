import api from '@/lib/axios';
import { API_ENDPOINTS } from '@/shared/constants/routes';
import { User, Role } from '@/modules/auth/types/auth.types';
import { PaginatedResponse } from '@/modules/properties/types/property.types';
import { UpdateProfileFormValues } from '@/modules/users/schemas/userSchemas';
import { AuthResponse } from '@/modules/auth/types/auth.types';
import { UserPaginationParams } from '../types/user.types';


export const userService = {

    updateProfile: async (userId: number, data: UpdateProfileFormValues): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.UPDATE_PROFILE(userId), data);
        return response.data;
    },

    // Obtener todos los usuarios paginados (orden descendente)
    getUsersDesc: async (params?: UserPaginationParams): Promise<PaginatedResponse<User>> => {
        const { data } = await api.get<PaginatedResponse<User>>(
            API_ENDPOINTS.USERS.GET_ALL,
            { params }
        );
        return data;
    },

    // Filtrar usuarios por rol
    getUsersByRole: async (role: Role, params?: UserPaginationParams): Promise<PaginatedResponse<User>> => {
        const { data } = await api.get<PaginatedResponse<User>>(
            API_ENDPOINTS.USERS.GET_BY_ROLE(role),
            { params }
        );
        return data;
    },

    // Cambiar el rol de un usuario
    updateUserRole: async (id: number, role: Role): Promise<User> => {
        const { data } = await api.put<User>(
            API_ENDPOINTS.USERS.UPDATE_ROLE(id),
            { role }
        );
        return data;
    },

    // Activar o desactivar un usuario
    updateUserStatus: async (id: number, active: boolean): Promise<User> => {
        const { data } = await api.put<User>(
            API_ENDPOINTS.USERS.UPDATE_STATUS(id),
            { active }
        );
        return data;
    },

    // Eliminar un usuario (soft delete)
    deleteUser: async (id: number): Promise<void> => {
        await api.delete(API_ENDPOINTS.USERS.DELETE(id));
    },
};