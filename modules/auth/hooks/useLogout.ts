import { useAuthStore } from "@/store/useAuthStore";
import { authService } from "../services/auth.service";
import { ROUTES } from "@/shared/constants/routes";

export const useLogout = () => {
    const clearAuth = useAuthStore((state) => state.logout);

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
        clearAuth();
        window.location.href = ROUTES.HOME;
    };

    return { logout };
};
