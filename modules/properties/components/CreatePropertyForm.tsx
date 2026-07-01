"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema, PropertyFormValues } from "../schemas/propertySchema";
import { useProperties } from "../hooks/useProperties";

// ShadCN UI
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Textarea } from "@/shared/components/ui/textarea";

export const CreatePropertyForm = () => {
  const onSubmit = (data: PropertyFormValues) => {};

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handlePublish = async (data: PropertyFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await handleCreate({
        ...data,
        images: data.images || [],
        
      });
      //verificar si no hay imagenes, si no hay, mostrar un toast de error
      
      toast.success("Propiedad creada exitosamente");
    } catch (error) {
      toast.error("Error al crear la propiedad. Intenta nuevamente.");
      console.error("Error al crear propiedad:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { handleCreate } = useProperties();

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      address: "",
      bedrooms: 0,
      images: [],
      bathrooms: 0,
      area: 0,
      propertyType: "HOUSE",
      operationType: "SALE",
      available: true,
    },
  });

  return (
    <div className="min-h-screen  py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Crear Nueva Propiedad
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Completa el formulario para agregar una nueva propiedad a tu catálogo
          </p>
        </div>

        {/* Form Card */}
        <Card className="w-full border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 pb-6">
            <CardTitle className="text-xl sm:text-2xl text-gray-900">
              Información de la Propiedad
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600 mt-2">
              Proporciona los detalles necesarios de tu propiedad
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 sm:pt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handlePublish)}
                className="space-y-6 sm:space-y-8"
              >
                {/* Sección 1: Título y Descripción */}
                <div className="space-y-5">
                  <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Información Básica
                  </h2>

                  {/* Campo Titulo */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-900">
                          Título de la Propiedad
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: Casa moderna con jardín en San Isidro"
                            className="mt-1.5 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />

                  {/* Campo Descripción */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-900">
                          Descripción
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe los detalles, amenidades y características especiales de la propiedad..."
                            className="mt-1.5 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Sección 2: Ubicación y Precio */}
                <div className="space-y-5 pt-2 border-t border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Ubicación y Precio
                </h2>

                {/* Campo Dirección */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-900">
                        Dirección
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: Avenida Paseo de la República 3000"
                          className="mt-1.5 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />

                {/* Campo Precio */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-900">
                        Precio (S/.)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          className="mt-1.5 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value)) {
                              field.onChange(value);
                            } else {
                              field.onChange(0);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Sección 3: Especificaciones */}
              <div className="space-y-5 pt-2 border-t border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Especificaciones
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Habitaciones */}
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-900">
                          Habitaciones
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="mt-1.5 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value)) {
                                field.onChange(value);
                              } else {
                                field.onChange(0);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />

                  {/* Baños */}
                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-900">
                          Baños
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="mt-1.5 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value)) {
                                field.onChange(value);
                              } else {
                                field.onChange(0);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />

                  {/* Área */}
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-900">
                          Área (m²)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="mt-1.5 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value)) {
                                field.onChange(value);
                              } else {
                                field.onChange(0);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Sección 4: Tipo y Operación */}
              <div className="space-y-5 pt-2 border-t border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Categoría
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Tipo de Propiedad */}
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-900">
                          Tipo de Propiedad
                        </FormLabel>
                        <FormControl>
                          <select
                            className="mt-1.5 w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                            {...field}
                          >
                            <option value="HOUSE">Casa</option>
                            <option value="APARTMENT">Departamento</option>
                            <option value="LAND">Terreno</option>
                          </select>
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />

                  {/* Tipo de Operación */}
                  <FormField
                    control={form.control}
                    name="operationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-900">
                          Tipo de Operación
                        </FormLabel>
                        <FormControl>
                          <select
                            className="mt-1.5 w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                            {...field}
                          >
                            <option value="SALE">Venta</option>
                            <option value="RENT">Alquiler</option>
                          </select>
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Sección 5: Imágenes */}
              <div className="space-y-5 pt-2 border-t border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Imágenes
                </h2>

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-900">
                        Cargar Imágenes (Máximo 4)
                      </FormLabel>
                      <FormControl>
                        <div className="mt-2">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 p-4">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                              <svg
                                className="w-8 h-8 text-gray-400 mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-900">Haz clic para cargar</span>
                                {" "}o arrastra imágenes
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG o GIF (máx. 4 imágenes)
                              </p>
                            </div>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const selectedFiles = e.target.files;
                                if (selectedFiles) {
                                  const newFilesArray = Array.from(selectedFiles);
                                  const currentImages = field.value || [];
                                  const combinedFiles = [
                                    ...currentImages,
                                    ...newFilesArray,
                                  ];
                                  if (combinedFiles.length > 4) {
                                    toast.warning(
                                      "No puedes subir más de 4 imágenes",
                                    );
                                    return;
                                  }
                                  field.onChange(combinedFiles);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </FormControl>

                      {/* Vista previa de imágenes */}
                      {field.value && field.value.length > 0 && (
                        <div className="mt-6">
                          <p className="text-sm font-medium text-gray-900 mb-3">
                            Imágenes cargadas ({field.value.length}/4)
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {field.value.map((img, index) => (
                              <div
                                key={index}
                                className="relative group rounded-lg overflow-hidden border border-gray-200 hover:border-orange-500 transition-all duration-200"
                              >
                                <img
                                  src={URL.createObjectURL(img)}
                                  alt={`Preview ${index}`}
                                  className="w-full aspect-square object-cover group-hover:brightness-75 transition-all duration-200"
                                />
                                <button
                                  type="button"
                                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40"
                                  onClick={() => {
                                    const updatedImages =
                                      field.value?.filter((_, i) => i !== index) ||
                                      [];
                                    field.onChange(updatedImages);
                                  }}
                                >
                                  <X className="w-6 h-6 text-white" />
                                </button>
                                <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                                  {index + 1}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <FormMessage className="text-xs mt-2" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Botón de Envío */}
              <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Publicando...
                    </span>
                  ) : (
                    "Publicar Propiedad"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};
