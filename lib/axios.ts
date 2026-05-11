import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { ROUTES } from '@/shared/constants/routes';

// Función para extraer el path de una URL, manejando casos con o sin base URL
const getRequestPath = (url?: string): string => {
  if (!url) return '';
  try {
    return new URL(url, 'http://localhost').pathname;
  } catch {
    return url.split('?')[0] ?? '';
  }
};

// Función para determinar si una solicitud es una lectura pública de propiedades
const isPublicPropertiesReadRequest = (url?: string, method?: string): boolean => {
  if ((method ?? 'get').toLowerCase() !== 'get') return false;
  const path = getRequestPath(url);

  return (
    path === '/properties' ||
    path === '/properties/' ||
    path.startsWith('/properties/slug/')
  );
};


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type' : 'application/json'
    },
    // Permite que el navegador envíe la cookie httpOnly "auth-token" automáticamente
    withCredentials: true,
})
api.interceptors.response.use(
  (response) => { return response; },
  (error) => {
    const status = error.response?.status;
    const isAuthError = status === 401 || status === 403;
    const isPublicRead = isPublicPropertiesReadRequest(error.config?.url, error.config?.method);
    const isAuthRoute = error.config?.url?.includes('/auth/');


    if (isAuthError && !isPublicRead && !isAuthRoute) {
    useAuthStore.getState().logout();
    if(typeof window !== 'undefined') {
        window.location.href = `${ROUTES.HOME}?expired=true`;
    }
}

    return Promise.reject(error);
  }
)


export default api;
