import api from '@/lib/axios';
import {ROUTES} from '@/shared/constants/routes';
import { AuthResponse, LoginRequest } from '../types/auth.types';

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const {data} = await api.post<AuthResponse>(ROUTES.AUTH.LOGIN, credentials);
        return data;
    },
    register: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const {data} = await api.post<AuthResponse>(ROUTES.AUTH.REGISTER, credentials);
        return data;
    }
}