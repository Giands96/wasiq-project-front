import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { ROUTES } from '@/shared/constants/routes';


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type' : 'application/json'
    }
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
       config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => { return response; },
  (error) => {
    if (error.response && error.response.status === 401 || error.response.status === 403) {
      useAuthStore.getState().logout();

      if(typeof window !== 'undefined') {
        window.location.href = `${ROUTES.HOME}?expired=true`; // Redirige a la página de inicio de sesión con un mensaje de sesión expirada
        
      }

    }
    return Promise.reject(error);
  }
)


export default api;
