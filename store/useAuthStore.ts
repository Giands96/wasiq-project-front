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
  setAuth: (user: User, token: string) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  expiration: number;
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
      expiration: 0,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      //* login recoge user y token, y setea el estado correspondiente
      setAuth: (user, token) => set({ user, token, isAuthenticated: true, expiration: Date.now() + 24 * 60 * 60 * 1000 }),
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('wasiq-auth-storage');
      },
    }),
    {
      name: 'wasiq-auth-storage',
      // partialize es un middleware que permite guardar solo lo que queremos en el localStorage
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        expiration: state.expiration,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        const now = Date.now();
        if (state?.expiration && now > state.expiration) {
          state.logout();
        }
      }
    }
  )
);