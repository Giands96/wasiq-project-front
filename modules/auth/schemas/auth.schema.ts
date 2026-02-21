import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email({error: (issue) => issue.input === undefined? 'Email is required' : 'Invalid email address' }),
    password: z.string(
        {error: (issue) => issue.input === undefined? 'Password is required' : 'Invalid password' })
        .min(6, { message: 'Password must be at least 6 characters long' })
})

export type LoginFormValues = z.infer<typeof loginSchema>;