import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from "@/modules/auth/types/auth.types";

// Definimos una interfaz para el estado de autenticación
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User) => void;
  clearAuth: () => void;
  logout: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Estado Inicial
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      // Ya no almacenamos el token — el backend lo maneja via httpOnly cookie
      setAuth: (user) => set({ user, isAuthenticated: true }),

      clearAuth: () => {
        set({ user: null, isAuthenticated: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'wasiq-auth-storage',
      // partialize: solo guardamos datos del usuario, ya no el token ni expiration
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);