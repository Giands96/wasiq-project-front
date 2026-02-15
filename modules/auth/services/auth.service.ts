import api from '@/lib/axios';
import {API_ENDPOINTS} from '@/shared/constants/routes';
import { AuthResponse, LoginRequest } from '../types/auth.types';

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const {data} = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
        return data;
    },
    register: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const {data} = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, credentials);
        return data;
    }
}