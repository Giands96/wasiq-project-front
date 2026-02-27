import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginFormValues } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";
import { ROUTES } from "@/shared/constants/routes";
import { AxiosError } from "axios";

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const loginToStore = useAuthStore((state) => state.setAuth);

    const login = async (data: LoginFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.login(data);

            loginToStore(response.user, response.token);

            router.push(ROUTES.HOME);
        } catch (error) {
            const axiosError = error as AxiosError;

            if(axiosError.response?.status === 403) {
                setError('Invalid credentials');
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