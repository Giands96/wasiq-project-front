import z from "zod";

export const myProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  phone: z
    .string({ error: "El numero es requerido" })
    .min(7, "El numero debe tener al menos 7 digitos"),
  password: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.length >= 6,
      "La contrasena debe tener al menos 6 caracteres"
    ),
});

export const updateProfileSchema = z.object({
  phone: z.string().optional().refine(
    (value) => !value || value.length >= 7,
    "El numero debe tener al menos 7 digitos"
  ),
  password: z.string().optional().refine(
    (value) => !value || value.length >= 6,
    "La contrasena debe tener al menos 6 caracteres"
  ),
});

export type MyProfileFormValues = z.infer<typeof myProfileSchema>;
export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;