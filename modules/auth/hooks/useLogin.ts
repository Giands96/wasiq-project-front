import { useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginFormValues } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";
import { ROUTES } from "@/shared/constants/routes";
import { AxiosError } from "axios";

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const loginToStore = useAuthStore((state) => state.login);

    const login = async (data: LoginFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.login(data);
            
            const mockUser = {
        id: 0,
        email: data.email,
        firstName: 'Usuario',
        lastName: 'Wasiq',
        role: 'USER' as const, // Forzamos el tipo por ahora
        active: true
      };

            loginToStore(mockUser, response.token);

            router.push(ROUTES.HOME);
        } catch (error) {
            const axiosError = error as AxiosError;

            if(axiosError.response?.status === 403) {
                setError('Invalid email or password');
            } else {
                setError('An error occurred while trying to log in. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        isLoading,
        error
    }
}