import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/shared/constants/routes";
import {
  CreatePropertyRequest,
  PaginatedResponse,
  Property,
  UpdatePropertyRequest,
} from "../types/property.types";

export const PropertyService = {
  getPropertiesList: async (): Promise<PaginatedResponse<Property>> => {
    const { data } = await api.get<PaginatedResponse<Property>>(
      API_ENDPOINTS.PROPERTIES.LIST,
    );
    return data;
  },
  createProperty: async (propertyData: CreatePropertyRequest): Promise<Property> => {
    if (propertyData.images.length > 4) {
      throw new Error("Máximo 4 imágenes permitidas");
    }
    
    const formData = new FormData();
    const { images, ...rest } = propertyData;
    // JSON Blob
    const data = new Blob([JSON.stringify(rest)], {
      type: "application/json",
    });
    formData.append("property", data);
    images.forEach((image) => {
      formData.append("files", image);
    });

    const { data: createdProperty } = await api.post<Property>(
      API_ENDPOINTS.PROPERTIES.CREATE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return createdProperty;
  },
  updateProperty: async (id: number,propertyData: UpdatePropertyRequest): Promise<Property> => {
    if (propertyData.images && propertyData.images.length > 4) {
      throw new Error("Máximo 4 imágenes permitidas");
    }

    const formData = new FormData();
    const { images, keptImageIds, ...rest } = propertyData;

    // Enviar JSON como Blob 
    // Blob es Binary Large Object, se utiliza para enviar datos binarios o grandes como archivos.
    //  En este caso, se convierte el objeto JSON a un Blob para enviarlo 
    // como parte de un formulario multipart/form-data.
    const data = new Blob([JSON.stringify({ ...rest})], {
      type: "application/json",
    });
    formData.append("property", data);

    images?.forEach((image) => {
      formData.append("files", image);
    });

    if(keptImageIds && keptImageIds.length > 0) {
      formData.append("keptImageIds", JSON.stringify(keptImageIds));
    } else {
      formData.append("keptImageIds", "");
    }

    const { data: updatedProperty } = await api.put<Property>(
      API_ENDPOINTS.PROPERTIES.UPDATE(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return updatedProperty;
  },
  deleteProperty: async (id: number): Promise<void> => {
    await api.delete(API_ENDPOINTS.PROPERTIES.DELETE(id));
    },
};
