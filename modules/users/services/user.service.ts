import { UpdateProfileFormValues, updateProfileSchema } from '@/modules/users/schemas/userSchemas';
import api from '@/lib/axios';
import { AuthResponse } from '@/modules/auth/types/auth.types';
import { API_ENDPOINTS } from '@/shared/constants/routes';


export const userService = {

    updateProfile: async (userId: number, data: UpdateProfileFormValues): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.UPDATE_PROFILE(userId), data);
        return response.data;
    }
}; 