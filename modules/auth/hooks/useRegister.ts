import { useState } from "react";
import { authService } from "../services/auth.service";
import { ROUTES } from "@/shared/constants/routes";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { RegisterFormValues } from "../schemas/auth.schema";
import { toast } from "sonner";

export const useRegister = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const registerToStore = useAuthStore((state) => state.setAuth);

    const register = async (data: RegisterFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.register(data);
            registerToStore(response.user);
            
            // Establecer cookies manualmente para que el middleware de Next.js pueda leerlas
            document.cookie = `auth-token=${response.token}; path=/; max-age=86400; SameSite=Lax`;
            if (response.user.role) {
                document.cookie = `role=${response.user.role}; path=/; max-age=86400; SameSite=Lax`;
            }

            router.push(ROUTES.HOME);
            router.refresh();
        } catch (err) {
            const axiosError = err as AxiosError;
            const message =
                axiosError.response?.status === 400
                    ? "Registro fallido. Por favor, verifica tus datos e intenta nuevamente."
                    : "Ha ocurrido un error al intentar registrarse. Por favor, intenta nuevamente más tarde.";

            setError(message);
            toast.error(message);

            console.log("❌ Status:", axiosError.response?.status);
            console.log("❌ Data:", axiosError.response?.data);
            console.log("❌ Headers:", axiosError.response?.headers);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        register,
        isLoading,
        error,
    };
};
