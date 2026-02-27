export type Role = 'USER' | 'ADMIN';

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: Role;
    active: boolean;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface LoginRequest {
    email: string;
    password?: string;
}

export interface RegisterRequest extends LoginRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    

}