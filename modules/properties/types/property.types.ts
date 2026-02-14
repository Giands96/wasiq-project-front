export type OperationType = 'SALE' | 'RENT';
export type PropertyType = 'HOUSE' | 'APARTMENT' | 'LAND';

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

export interface CreatePropertyDto {
    title: string;
    description: string;
    price: number;
    address: string;
    bedrooms: number;
    bathrooms: number;
    area:number;
    operationType: OperationType;
    propertyType: PropertyType;
    
}