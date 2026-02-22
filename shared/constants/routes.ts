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
        CREATE: '/properties/create',
        UPDATE: (id:string) => `/properties/update/${id}`,
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
        LIST: '/properties',
        CREATE: '/properties/create',
        DETAIL: (id: number) => `/properties/${id}`,
        UPDATE: (id: number) => `/properties/update/${id}`,
        DELETE: (id: number) => `/properties/delete/${id}`,
        GET_ALL: '/properties',
    }
};