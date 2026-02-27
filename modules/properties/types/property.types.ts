export type OperationType = 'SALE' | 'RENT';
export type PropertyType = 'HOUSE' | 'APARTMENT' | 'LAND';

// Union types para validar los tipos de propiedad y operación
export const OPERATION_TYPES = ['SALE', 'RENT'] as const;
export const PROPERTY_TYPES = ['HOUSE', 'APARTMENT', 'LAND'] as const;

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
    slug: string;
    area: number;
    operationType: OperationType;
    propertyType: PropertyType;
    active: boolean;
    available: boolean;
    images: string[];
    ownerId: number;
    ownerEmail: string;
    ownerName: string;
    ownerPhoneNumber: string;
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
    images?: File[];
    keptImageIds?: number[]; // IDs de las imágenes que se desean mantener
}