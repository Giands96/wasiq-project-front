import { usePropertyStore } from "@/store/usePropertyStore";
import { CreatePropertyRequest,UpdatePropertyRequest } from "@/modules/properties/types/property.types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";


export const useProperties = () => {

    // FUNCIONES DE PROPERTYSTORE
    const addPropertyStore = usePropertyStore((state) => state.addProperty);
    const updatePropertyStore = usePropertyStore((state) => state.updateProperty);
    const removePropertyStore = usePropertyStore((state) => state.removeProperty);
    const fetchPropertiesStore = usePropertyStore((state) => state.fetchProperties);

    // INSTANCIAR EL ROUTER
    const router = useRouter();
    const isLoading = usePropertyStore((state) => state.isLoading);

    // HANDLER ACTUALIZAR PROPIEDAD
    const handleUpdate = async (slug: string, data: UpdatePropertyRequest) => {
        try {
            await updatePropertyStore(slug, data);
            toast.success("Propiedad actualizada exitosamente");
            router.push(`${ROUTES.PROPERTIES.UPDATE}/${slug}`); 
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
    const handleFetch = async () => {
        try {
            await fetchPropertiesStore();
        } catch (err) {
            toast.error(`Error obteniendo las propiedades: ${err}`);
        }
    }

  

    return { handleCreate, isLoading, handleUpdate, handleDelete, handleFetch };

    

}