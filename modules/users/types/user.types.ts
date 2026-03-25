import { Role } from '@/modules/auth/types/auth.types';

// Reutilizamos PaginatedResponse del módulo de propiedades
// ya que el backend devuelve el mismo formato Page<T> de Spring Boot
export type { PaginatedResponse } from '@/modules/properties/types/property.types';

export interface UserPaginationParams {
    page?: number;
    size?: number;
    role?: Role;
}
