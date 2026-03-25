export const ROUTES = {
    HOME: '/',
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        LOGOUT: '/logout',
        MY_PROFILE: '/my-profile',
    },
    PROPERTIES: {
        LIST: '/properties',
        DETAIL: (slug: string) => `/properties/${slug}`,
        CREATE: '/properties/create',
        UPDATE: (slug: string) => `/properties/update/${slug}`,
        DELETE: (slug: string) => `/properties/delete/${slug}`,
        SEARCH: (query: string) => `/properties?query=${encodeURIComponent(query)}`,
    },
    DASHBOARD: {
        HOME: '/dashboard',
        PROPERTIES: '/dashboard/properties',
        USERS: '/dashboard/users',
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
        PROFILE: '/auth/profile',
        UPDATE_PROFILE: (id: number) => `/auth/profile/update/${id}`,
    },
    PROPERTIES: {
        CREATE: '/properties/create',
        UPDATE: (slug: string) => `/properties/update/${slug}`,
        DELETE: (slug: string) => `/properties/delete/${slug}`,
        BY_SLUG: (slug: string) => `/properties/slug/${slug}`,
        GET_ALL: '/properties/',
    },
    USERS: {
        GET_ALL: '/users/all',
        GET_BY_ROLE: (role: string) => `/users/by-role/${role}`,
    },
};