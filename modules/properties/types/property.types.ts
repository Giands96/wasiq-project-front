export type OperationType = 'SALE' | 'RENT';
export type PropertyType = 'HOUSE' | 'APARTMENT' | 'LAND';
export type PaginatedResponse<T> = {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}


export interface PropertyImage {
    id: number;
    url: string;
}

export interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    address: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    operationType: OperationType;
    propertyType: PropertyType;
    active: boolean;
    available: boolean;
    images: string[];
    owner?: {
        email: string;
        firstName: string;
        lastName: string;
    }
}

export interface CreatePropertyRequest {
    title: string;
    description: string;
    price: number;
    address: string;
    bedrooms: number;
    bathrooms: number;
    area:number;
    operationType: OperationType;
    propertyType: PropertyType;
    images: File[];
}

export interface UpdatePropertyRequest {
    title?: string;
    description?: string;
    price?: number;
    address?: string;
    bedrooms?: number;
    bathrooms?: number;
    area?:number;
    operationType?: OperationType;
    propertyType?: PropertyType;
    images?: string[];
}