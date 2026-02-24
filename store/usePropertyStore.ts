import { create } from "zustand";
import { Property, CreatePropertyRequest, UpdatePropertyRequest } from "@/modules/properties/types/property.types";
import { PropertyService } from "@/modules/properties/services/property.service"; // 👈 Importa tu servicio

interface PropertyState {
  properties: Property[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  fetchProperties: () => Promise<void>;
  currentProperty: Property | null;
  addProperty: (data: CreatePropertyRequest) => Promise<Property>;
  updateProperty: (slug: string, data: UpdatePropertyRequest) => Promise<void>;
  removeProperty: (slug: string) => Promise<void>;
  fetchPropertySlug: (slug: string) => Promise<Property | null>;
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  isLoading: false,
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  currentProperty: null,

  // 1. OBTENER (FETCH)
  fetchProperties: async () => {
    set({ isLoading: true });
    try {
      const response = await PropertyService.getPropertiesList();
      set({ 
        properties: response.content,
        currentPage: response.number || 0,
        totalPages: response.totalPages,
        totalElements: response.totalElements
      });
    } catch (error) {
      console.error("Error fetching properties", error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  fetchPropertySlug: async (slug) => {
    try {
      const property = await PropertyService.getPropertyBySlug(slug);
      set({ currentProperty: property });
      return property;
    } catch (error) {
      console.error("Error fetching property by slug", error);
      return null;
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
  updateProperty: async (slug, updatedData) => {
    set({ isLoading: true });
    try {
      const updated = await PropertyService.updateProperty(slug, updatedData);
      // Mapeamos el array: si el slug coincide, reemplazamos con lo que devolvió el servidor
      set((state) => ({
        properties: state.properties.map((p) => (p.slug === slug ? updated : p)),
      }));
    } finally {
      set({ isLoading: false });
    }
  },

  // 4. ELIMINAR (REMOVE)
  removeProperty: async (slug) => {
    set({ isLoading: true });
    try {
      await PropertyService.deleteProperty(slug);
      // Filtramos para quitarla del estado local
      set((state) => ({
        properties: state.properties.filter((p) => p.slug !== slug),
      }));
    } finally {
      set({ isLoading: false });
    }
  },
}));