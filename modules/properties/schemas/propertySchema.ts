import {z} from 'zod';
import {OPERATION_TYPES, PROPERTY_TYPES} from '../types/property.types';

export type OperationType = typeof OPERATION_TYPES[number];
export type PropertyType = typeof PROPERTY_TYPES[number];

export const propertySchema = z.object({
    title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres").max(1000, "La descripción no puede exceder los 1000 caracteres"),
    price: z.number().positive("El precio debe ser mayor a 0"),
    address: z.string().min(15, "La dirección debe tener al menos 15 caracteres").max(200, "La dirección no puede exceder los 200 caracteres"),
    bedrooms: z.number().int().positive("El número de habitaciones debe ser un entero positivo"),
    images: z.array(z.instanceof(File).refine(file => file.size <= 4 * 1024 * 1024, "Cada imagen debe ser menor a 4MB")).max(4, "No puedes subir más de 4 imágenes"),
    bathrooms: z.number().int().positive("El número de baños debe ser un entero positivo"),
    area: z.number().positive("El área debe ser un número positivo"),
    propertyType: z.enum(PROPERTY_TYPES, {error: "Tipo de propiedad no válido"}),
    operationType: z.enum(OPERATION_TYPES, {error:"Tipo de operación no válido"}),
    available: z.boolean()
})


export type PropertyFormValues = z.infer<typeof propertySchema>;