"use client"

import React, { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { propertySchema, PropertyFormValues } from '../schemas/propertySchema'
import { useProperties } from '../hooks/useProperties';
import { useParams } from 'next/navigation'
import Image from 'next/image'

// ShadCN UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import { X } from 'lucide-react'


export const UpdatePropertyForm = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { fetchPropertyBySlug, handleUpdate, currentProperty } = useProperties();

  const urlToFile = async (url: string, index: number): Promise<File> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`No se pudo descargar la imagen ${index + 1}`);
    }

    const blob = await response.blob();
    const contentType = blob.type || "image/jpeg";
    const extension = contentType.split("/")[1] || "jpg";
    return new File([blob], `existing-image-${index + 1}.${extension}`, { type: contentType });
  };

  // 1. Form declarado ANTES de los useEffect
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      address: '',
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      propertyType: 'HOUSE',
      operationType: 'SALE',
      images: [],
      available: true
    }
  });

  // 2. Fetch por slug al montar
  useEffect(() => {
    if (slug) {
      fetchPropertyBySlug(slug);
    }
  }, [slug, fetchPropertyBySlug]);

  // 3. Rellenar form cuando llegan los datos
  useEffect(() => {
    if (!currentProperty) return;

    const keptImageIds = currentProperty.images
      .map((img) => (typeof img === "string" ? undefined : img?.id))
      .filter((id): id is number => typeof id === "number");

    form.reset({
      title: currentProperty.title,
      description: currentProperty.description,
      price: currentProperty.price,
      address: currentProperty.address,
      bedrooms: currentProperty.bedrooms,
      bathrooms: currentProperty.bathrooms,
      area: currentProperty.area,
      propertyType: currentProperty.propertyType,
      operationType: currentProperty.operationType,
      images: [],
      keptImageIds,
      legacyImageKeys: [],
      available: currentProperty.available ?? true
    });
  }, [currentProperty, form]);

  const onSubmit = async (data: PropertyFormValues) => {
    if (!currentProperty) {
      toast.error("No se pudo cargar la propiedad. Por favor, intenta nuevamente.");
      return;
    }

    const safeKeptImageIds = (data.keptImageIds ?? []).filter((id): id is number => typeof id === "number");
    const removedLegacyKeys = new Set(data.legacyImageKeys ?? []);

    const legacyUrlsToKeep = normalizedExistingImages
      .filter((image) => image.id === undefined && !removedLegacyKeys.has(image.key))
      .map((image) => image.url);

    let legacyFiles: File[] = [];
    if (legacyUrlsToKeep.length > 0) {
      try {
        legacyFiles = await Promise.all(
          legacyUrlsToKeep.map((url, index) => urlToFile(url, index))
        );
      } catch {
        toast.error("No se pudieron conservar algunas imágenes existentes.");
        return;
      }
    }

    const newFiles = data.images ?? [];
    const filesToSend = [...legacyFiles, ...newFiles];

    const totalImages = safeKeptImageIds.length + filesToSend.length;
    if (totalImages > 4) {
      toast.warning("No puedes tener más de 4 imágenes en total");
      return;
    }

    const payload = {
      title: data.title,
      description: data.description,
      price: data.price,
      address: data.address,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      area: data.area,
      propertyType: data.propertyType,
      operationType: data.operationType,
      available: data.available,
    };

    await handleUpdate(currentProperty.slug, {
      ...payload,
      keptImageIds: safeKeptImageIds,
      images: filesToSend,
    });
  }

  const keptImageIds = useWatch({ control: form.control, name: "keptImageIds" }) ?? [];
  const removedLegacyKeys = useWatch({ control: form.control, name: "legacyImageKeys" }) ?? [];
  const normalizedExistingImages = (currentProperty?.images ?? [])
    .map((img, index) => {
      const imageId = typeof img === "string" ? undefined : img?.id;
      const imageUrl = typeof img === "string" ? img : img?.url;
      return {
        id: imageId,
        url: imageUrl,
        key: imageId ? `id-${imageId}` : `legacy-${index}-${imageUrl ?? ""}`,
      };
    })
    .filter((image) => Boolean(image.url && image.url.trim().length > 0));

  const visibleExistingImages = normalizedExistingImages.filter(
    (img) => {
      if (img.id !== undefined) {
        return keptImageIds.includes(img.id);
      }
      return !removedLegacyKeys.includes(img.key);
    }
  );

  return (
    <div className="container mx-auto flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Actualizar Propiedad</CardTitle>
          <CardDescription>Completa el formulario para actualizar la propiedad</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (errors) =>
                console.error("Errores de validación:", errors)
              )}
              className="space-y-4"
            >
              {/* Título */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título de la propiedad" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Descripción */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input placeholder="Descripción de la propiedad" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Precio */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Precio de la propiedad"
                        {...field}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          field.onChange(isNaN(value) ? 0 : value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dirección */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="Dirección de la propiedad" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Habitaciones, Baños y Área */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Habitaciones</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Número de habitaciones"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(isNaN(value) ? 0 : value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Baños</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Número de baños"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(isNaN(value) ? 0 : value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Área (m²)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Área en metros cuadrados"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(isNaN(value) ? 0 : value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tipo de Propiedad */}
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Propiedad</FormLabel>
                    <FormControl>
                      <select className="w-full border border-gray-300 rounded-md p-2" {...field}>
                        <option value="HOUSE">Casa</option>
                        <option value="APARTMENT">Departamento</option>
                        <option value="LAND">Terreno</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tipo de Operación */}
              <FormField
                control={form.control}
                name="operationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venta o Alquiler</FormLabel>
                    <FormControl>
                      <select className="w-full border border-gray-300 rounded-md p-2" {...field}>
                        <option value="SALE">Venta</option>
                        <option value="RENT">Alquiler</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Disponible */}
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem className="flex-col items-center gap-3">
                    <FormLabel className="mt-2">Disponible</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full border border-gray-300 rounded-md p-2" 
                        value={field.value ? "true" : "false"}
                        onChange={(e) => field.onChange(e.target.value === "true")}
                        onBlur={field.onBlur}
                        name={field.name}
                      >
                        <option value="true">Si</option>
                        <option value="false">No</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Imágenes */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imágenes</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const selectedFiles = e.target.files;
                          if (selectedFiles) {
                            const newFilesArray = Array.from(selectedFiles);
                            const currentImages = field.value || [];
                            const combined = [...currentImages, ...newFilesArray];
                            // Tomar en cuenta también las imágenes existentes en el límite
                            const totalImages = combined.length + visibleExistingImages.length;
                            if (totalImages > 4) {
                              toast.warning("No puedes tener más de 4 imágenes en total");
                              return;
                            }
                            field.onChange(combined);
                          }
                        }}
                      />
                    </FormControl>

                    <div className="flex gap-4 mt-4 flex-wrap">
                      {/* Imágenes existentes del backend */}
                      {visibleExistingImages.map((image, index) => (
                        <div key={`old-${image.key}`} className="relative w-24 h-24">
                          <button
                            type="button"
                            className="cursor-pointer absolute -top-2 -right-2 bg-white text-gray-500 hover:text-red-500 border border-gray-200 rounded-full w-6 h-6 flex items-center justify-center shadow-sm z-10"
                            onClick={() => {
                              if (image.id === undefined) {
                                form.setValue(
                                  "legacyImageKeys",
                                  [...removedLegacyKeys, image.key],
                                  { shouldDirty: true }
                                );
                                return;
                              }

                              form.setValue(
                                "keptImageIds",
                                keptImageIds.filter((id) => id !== image.id),
                                { shouldDirty: true }
                              );
                            }}
                          >
                            <X size={14} />
                          </button>
                          <Image
                            src={image.url}
                            alt={`Imagen existente ${index + 1}`}
                            fill
                            className="w-full h-full object-cover rounded-md opacity-80"
                            sizes="96px"
                          />
                        </div>
                      ))}

                      {/* Imágenes nuevas */}
                      {field.value?.map((img, index) => (
                        <div key={`new-${index}`} className="relative w-24 h-24">
                          <button
                            type="button"
                            className="cursor-pointer absolute -top-2 -right-2 bg-white text-gray-500 hover:text-red-500 border border-gray-200 rounded-full w-6 h-6 flex items-center justify-center shadow-sm z-10"
                            onClick={() => {
                              const updated = field.value?.filter((_, i) => i !== index) || [];
                              field.onChange(updated);
                            }}
                          >
                            <X size={14} />
                          </button>
                          <Image
                            src={URL.createObjectURL(img)}
                            alt={`Nueva imagen ${index + 1}`}
                            fill
                            className="w-full h-full object-cover rounded-md"
                            sizes="96px"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-primary-base hover:bg-primary-hover text-white font-medium py-2 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                Actualizar Propiedad
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdatePropertyForm;