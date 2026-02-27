export const ROUTES = {
    HOME: '/',
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
    },
    PROPERTIES: {
        LIST: '/properties',
        DETAIL: (slug:string) => `/properties/${slug}`,
        CREATE: '/properties/create',
        UPDATE: (slug:string) => `/properties/update/${slug}`,
        DELETE: (slug:string) => `/properties/delete/${slug}`,
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
        CREATE: '/properties/create',
        UPDATE: (slug: string) => `/properties/update/${slug}`,
        DELETE: (slug: string) => `/properties/delete/${slug}`,
        BY_SLUG: (slug: string) => `/properties/slug/${slug}`,
        GET_ALL: '/properties/',
        
    }
};