export const ROUTES = {
    HOME: '/',
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
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