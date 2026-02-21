import { create } from "zustand";
import { Property, CreatePropertyRequest, UpdatePropertyRequest } from "@/modules/properties/types/property.types";
import { PropertyService } from "@/modules/properties/services/property.service"; // 👈 Importa tu servicio

interface PropertyState {
  properties: Property[];
  isLoading: boolean;
  // Cambiamos string por number para coincidir con el Long de Java
  fetchProperties: () => Promise<void>;
  addProperty: (data: CreatePropertyRequest) => Promise<Property>; // Devuelve el ID de la propiedad creada
  updateProperty: (id: number, data: UpdatePropertyRequest) => Promise<void>;
  removeProperty: (id: number) => Promise<void>;
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  isLoading: false,

  // 1. OBTENER (FETCH)
  fetchProperties: async () => {
    set({ isLoading: true });
    try {
      const response = await PropertyService.getPropertiesList();
      // La API devuelve una respuesta paginada, accedemos a .content
      // se usa set({objeto}) para actualizar el estado
      // y usamos set((state)) => para acceder al estado actual si necesitamos modificarlo
      set({ properties: response.content });
    } catch (error) {
      console.error("Error fetching properties", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // 2. CREAR (ADD)
  addProperty: async (newPropertyData) => {
    set({ isLoading: true });
    try {
      const created = await PropertyService.createProperty(newPropertyData);
      // "Empujamos" la nueva propiedad al array existente
      set((state) => ({ properties: [...state.properties, created] }));
      return created; // Devolvemos el ID de la propiedad creada para que el componente pueda usarla
    } finally {
      set({ isLoading: false });
    }
  },

  // 3. ACTUALIZAR (UPDATE)
  updateProperty: async (id, updatedData) => {
    set({ isLoading: true });
    try {
      const updated = await PropertyService.updateProperty(id, updatedData);
      // Mapeamos el array: si el ID coincide, reemplazamos con lo que devolvió el servidor
      set((state) => ({
        properties: state.properties.map((p) => (p.id === id ? updated : p)),
      }));
    } finally {
      set({ isLoading: false });
    }
  },

  // 4. ELIMINAR (REMOVE)
  removeProperty: async (id) => {
    set({ isLoading: true });
    try {
      await PropertyService.deleteProperty(id);
      // Filtramos para quitarla del estado local
      set((state) => ({
        properties: state.properties.filter((p) => p.id !== id),
      }));
    } finally {
      set({ isLoading: false });
    }
  },
}));