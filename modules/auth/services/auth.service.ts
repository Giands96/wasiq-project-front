import api from '@/lib/axios';
import {API_ENDPOINTS} from '@/shared/constants/routes';
import { AxiosError } from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest, UpdateProfileRequest, UpdateProfileResponse, User } from '../types/auth.types';

const extractUserFromProfilePayload = (payload: unknown): User | null => {
    if (!payload || typeof payload !== 'object') return null;

    const maybeResponse = payload as Partial<UpdateProfileResponse>;
    if (maybeResponse.user && typeof maybeResponse.user === 'object') {
        return maybeResponse.user as User;
    }

    const maybeUser = payload as Partial<User>;
    if (typeof maybeUser.id === 'number' && typeof maybeUser.email === 'string') {
        return maybeUser as User;
    }

    return null;
};

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const {data} = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
        return data;
    },
    register: async (credentials: RegisterRequest): Promise<AuthResponse> => {
        const {data} = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, credentials);
        return data;
    },
    updateProfile: async (payload: UpdateProfileRequest): Promise<User> => {
        const endpoints = [
            API_ENDPOINTS.AUTH.PROFILE,
            '/users/profile',
            '/users/me'
        ];

        let lastError: unknown;

        for (const endpoint of endpoints) {
            try {
                const { data } = await api.patch<unknown>(endpoint, payload);
                const parsedUser = extractUserFromProfilePayload(data);

                if (!parsedUser) {
                    throw new Error('La respuesta del servidor no contiene un usuario valido');
                }

                return parsedUser;
            } catch (error) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status !== 404) {
                    throw error;
                }

                lastError = error;
            }
        }

        throw lastError ?? new Error('No se encontro un endpoint valido para actualizar perfil');
    }
}