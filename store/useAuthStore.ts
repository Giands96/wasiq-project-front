import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from "@/modules/auth/types/auth.types";

// Definimos una interfaz para el estado de autenticación
interface AuthState {
    // El usuario autenticado o null si no hay ninguno
    user: User | null;
    // El token de autenticación o null si no hay ninguno
    token: string | null;
    // Indica si el usuario está autenticado
    isAuthenticated: boolean;
    // Acción para iniciar sesión
    login: (user:User, token:string) => void;
    // Acción para cerrar sesión
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
    (set) => ({
      // Estado Inicial
      user: null,
      token: null,
      isAuthenticated: false,
      //* login recoge user y token, y setea el estado correspondiente
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'wasiq-auth-storage',
    }
  )
);