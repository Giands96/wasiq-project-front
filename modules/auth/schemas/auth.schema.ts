import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email({error: (issue) => issue.input === undefined? 'El email es requerido' : 'Invalid email address' }),
    password: z.string(
        {error: (issue) => issue.input === undefined? 'Password is required' : 'Invalid password' })
        .min(6, { message: 'Password must be at least 6 characters long' })
})

export const registerSchema = z.object({
    firstName: z.string({error: (issue) => issue.input === undefined? 'Nombre requerido' : 'Nombre inválido' }),
    lastName: z.string({error: (issue) => issue.input === undefined? 'Apellido requerido' : 'Apellido inválido' }),
    email: z.email({error: (issue) => issue.input === undefined? 'El email es requerido' : 'Email inválido' }),
    password: z.string(
        {error: (issue) => issue.input === undefined? 'Es necesario una contraseña' : 'Contraseña inválida' })
        .min(6, { message: 'La contraseña debe de tener al menos 6 caracteres' }),
    phoneNumber: z.string({error: (issue) => issue.input === undefined? 'Número telefónico es requerido' : 'Número telefónico inválido' })
    
})

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;