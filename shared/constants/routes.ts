export const ROUTES = {
    HOME: '/',
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
    },
    PROPERTIES: {
        LIST: '/properties',
        DETAIL: (id:string) => `/properties/${id}`,
    },
    CONTACT: {
        US: '/contact',
    },
    ABOUT_US: '/about-us',
}

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',    
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
    },
    PROPERTIES: {
        BASE: '/properties',
    }
};