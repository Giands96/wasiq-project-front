import { usePropertyStore } from "@/store/usePropertyStore";
import { CreatePropertyRequest, PropertyPaginationParams, UpdatePropertyRequest } from "@/modules/properties/types/property.types";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";


export const useProperties = () => {

    // FUNCIONES DE PROPERTYSTORE
    const addPropertyStore = usePropertyStore((state) => state.addProperty);
    const updatePropertyStore = usePropertyStore((state) => state.updateProperty);
    const removePropertyStore = usePropertyStore((state) => state.removeProperty);
    const fetchPropertiesStore = usePropertyStore((state) => state.fetchProperties);
    const fetchPropertyBySlugStore = usePropertyStore((state) => state.fetchPropertySlug);
    const currentProperty = usePropertyStore((state) => state.currentProperty);
    // INSTANCIAR EL ROUTER
    const router = useRouter();
    const searchParams = useSearchParams();
    const isLoading = usePropertyStore((state) => state.isLoading);

    // HANDLER ACTUALIZAR PROPIEDAD
    const handleUpdate = async (slug: string, data: UpdatePropertyRequest) => {
        try {
            await updatePropertyStore(slug, data);
            toast.success("Propiedad actualizada exitosamente");
            router.push(ROUTES.PROPERTIES.DETAIL(slug)); 
            // TODO: Crear una ruta de detalle para mostrar la propiedad actualizada
        } catch (err) {
            toast.error(`Error actualizando la propiedad: ${err}`);
        } 
    }

    // HANDLER ELIMINAR PROPIEDAD
    const handleDelete = async (slug: string) => {
        try {
            await removePropertyStore(slug);
            toast.success("Propiedad eliminada exitosamente");
        } catch (err) {
            toast.error(`Error eliminando la propiedad: ${err}`);
        }
    }

    // HANDLER CREAR PROPIEDAD
    const handleCreate = async (data: CreatePropertyRequest) => {
        try {
            const response = await addPropertyStore(data);
            const slug = response.slug; // Obtener el slug de la propiedad creada
            toast.success("Propiedad creada exitosamente");
            router.push(`${ROUTES.PROPERTIES.DETAIL(slug)}`);
        } catch (err) {
            toast.error(`Error creando la propiedad: ${err}`);
        }
    }

    // HANDLER OBTENER PROPIEDADES
    const handleFetch = async (params?: PropertyPaginationParams) => {
        try {
            await fetchPropertiesStore(params);
        } catch (err) {
            toast.error(`Error obteniendo las propiedades: ${err}`);
        }
    }

    const handleSearchByTitle = async (query: string) => {
        try {
            const normalizedQuery = query.trim();
            if (!normalizedQuery) {
                const nextParams = new URLSearchParams(searchParams.toString());
                nextParams.delete("query");
                const queryString = nextParams.toString();
                router.push(queryString ? `${ROUTES.PROPERTIES.LIST}?${queryString}` : ROUTES.PROPERTIES.LIST);
                return;
            }

            const nextParams = new URLSearchParams(searchParams.toString());
            nextParams.set("query", normalizedQuery);
            router.push(`${ROUTES.PROPERTIES.LIST}?${nextParams.toString()}`);
        } catch {
            toast.error(`No se encontraron propiedades con el nombre "${query}"`);
        }
    }

  

    return { handleCreate, isLoading, handleUpdate, handleDelete, handleFetch, handleSearchByTitle, fetchPropertyBySlug: fetchPropertyBySlugStore, currentProperty };

    

}