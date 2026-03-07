# Solucion de errores de busqueda y filtros

Fecha: 2026-03-05

## Objetivo general
Corregir el flujo de busqueda de propiedades para evitar redirecciones incorrectas, alinear el contrato Frontend-Backend y habilitar filtros por URL (query, tipo, operacion, precio, cuartos y banos).

## Archivos modificados
- `lib/axios.ts`
- `modules/properties/services/property.service.ts`
- `modules/properties/hooks/useProperties.ts`
- `modules/properties/components/SearchInput.tsx`
- `shared/constants/routes.ts`
- `app/(public)/properties/page.tsx`
- `store/usePropertyStore.ts`
- `modules/properties/components/FiltersControls.tsx`

## Detalle de cambios por archivo

### `lib/axios.ts`
- Se agrego una funcion para identificar requests publicas de lectura de propiedades (`GET /properties`, `GET /properties/`, `GET /properties/slug/:slug`).
- Se evito adjuntar `Authorization` en requests publicas de lectura para no provocar rechazos por token expirado en endpoints que deben ser publicos.
- Se reforzo la validacion de errores de autenticacion usando `status = error.response?.status`.
- Se bloqueo la redireccion a `/?expired=true` cuando el error ocurre en lecturas publicas de propiedades.

Impacto:
- El buscador y el listado publico ya no expulsan al usuario al inicio por manejo global de `401/403` en endpoints publicos.

### `modules/properties/services/property.service.ts`
- Se estandarizo el consumo del endpoint de listado/filtrado en `GET /properties/` pasando filtros por `params`.
- `getPropertyByTitle` quedo usando el endpoint unificado con `query` y demas parametros.
- Se mantuvo fallback seguro devolviendo pagina vacia cuando la consulta falla.

Impacto:
- El frontend envia los filtros con el contrato correcto del backend.

### `modules/properties/hooks/useProperties.ts`
- `handleSearchByTitle` se ajusto para navegar por URL (`/properties?query=...`) y no duplicar llamadas de busqueda.
- Si el texto esta vacio, se elimina `query` de la URL y se conserva el resto de filtros.
- Al buscar, se preservan filtros existentes en la URL (`propertyType`, `operationType`, `minPrice`, etc.).
- `handleFetch` se amplio para recibir parametros de paginacion/filtros.

Impacto:
- El submit del buscador actualiza URL como fuente unica de verdad y evita doble request.

### `modules/properties/components/SearchInput.tsx`
- Se sincronizo el valor del input con `query` de la URL usando `useSearchParams` + `setValue`.
- El campo conserva el texto buscado tras recarga, navegacion atras/adelante y links compartidos.

Impacto:
- Mejor UX: el usuario ve siempre el termino activo de busqueda.

### `shared/constants/routes.ts`
- Se restauro `ROUTES.PROPERTIES.SEARCH(query)` para construir `/properties?query=...`.

Impacto:
- Se elimino inconsistencia entre hook y constantes de rutas.

### `app/(public)/properties/page.tsx`
- Se cambio la carga de datos para leer todos los filtros desde `searchParams`.
- Se agrego parseo seguro de numeros (`minPrice`, `maxPrice`, `rooms`, `bathrooms`, `page`, `size`).
- Se centralizo la consulta en `fetchProperties(params)` con objeto de filtros completo.

Impacto:
- La vista responde a cualquier combinacion de filtros en URL.

### `store/usePropertyStore.ts`
- `fetchProperties` paso de no recibir argumentos a aceptar `PropertyPaginationParams`.
- El store ahora envia esos parametros al servicio para listado filtrado/paginado.

Impacto:
- Estado global alineado con filtros dinamicos del endpoint.

### `modules/properties/components/FiltersControls.tsx`
- Se implementaron controles reales de filtros con estilo visual compatible con componentes shadcn usados en el proyecto:
- `Label`, `Input`, `Button` y selects para:
- `propertyType`
- `operationType`
- `minPrice`
- `maxPrice`
- `rooms`
- `bathrooms`
- Se agregaron acciones `Aplicar` y `Limpiar`.
- Al aplicar/limpiar, se sincroniza URL y se reinicia `page` para evitar paginaciones invalidas.

Impacto:
- Filtros funcionales sin escribir URL manualmente y con comportamiento consistente.

## Flujo final esperado
1. Usuario escribe en buscador o aplica filtros en panel.
2. Se actualiza la URL con query params.
3. La pagina lee URL y construye objeto de filtros.
4. El store llama al servicio con esos filtros.
5. El backend retorna propiedades filtradas/paginadas.
6. El frontend renderiza resultados sin redirecciones inesperadas.

## Verificacion ejecutada
- Se ejecuto `npm run lint` en varias iteraciones.
- Resultado: sin errores de compilacion/lint nuevos por estos cambios.
- Permanecen warnings preexistentes del proyecto (no bloqueantes para este alcance).
