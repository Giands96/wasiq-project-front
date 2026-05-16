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
            loginToStore(response.user);
            
            // Establecer cookies manualmente para que el middleware de Next.js pueda leerlas
            document.cookie = `auth-token=${response.token}; path=/; max-age=86400; SameSite=Lax`;
            if (response.user.role) {
                document.cookie = `role=${response.user.role}; path=/; max-age=86400; SameSite=Lax`;
            }

            router.push(ROUTES.HOME);
            router.refresh();
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log("❌ Status:", axiosError.response?.status);
            console.log("❌ Data:", axiosError.response?.data);
            console.log("❌ Headers:", axiosError.response?.headers);
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