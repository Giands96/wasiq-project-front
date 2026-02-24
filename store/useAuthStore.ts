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
    // el "_" indica que es una propiedad interna para controlar la hidratación del estado
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;

    
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
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      //* login recoge user y token, y setea el estado correspondiente
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'wasiq-auth-storage',
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);