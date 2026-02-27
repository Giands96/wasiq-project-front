import React from 'react'
import { useState } from "react";
import { LoginFormValues } from "../schemas/auth.schema";
import { authService } from "../services/auth.service";
import { ROUTES } from "@/shared/constants/routes";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { RegisterFormValues } from "../schemas/auth.schema";
import { toast, Toaster } from 'sonner';

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
            registerToStore(response.user, response.token);
            router.push(ROUTES.HOME);
        } catch (err) {
            const axiosError = err as AxiosError;
            if(axiosError.response?.status === 400) {
                toast.error('Registro fallido. Por favor, verifica tus datos e intenta nuevamente.');
            } else {
                toast.error('Ha ocurrido un error al intentar registrarse. Por favor, intenta nuevamente más tarde.');
            }
            
        } finally {
            setIsLoading(false);
        }
    }
    return {
        register,
        isLoading,
        error
    }
}
