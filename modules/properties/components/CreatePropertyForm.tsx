"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { propertySchema, PropertyFormValues } from '../schemas/propertySchema'
import { useProperties } from '../hooks/useProperties';

// ShadCN UI
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/ui/form";
import {Input} from "@/shared/components/ui/input";
import {Button} from "@/shared/components/ui/button";
import { toast } from "sonner";
import { X } from 'lucide-react'


export const CreatePropertyForm = () => {

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
      propertyType: 'HOUSE',
      operationType: 'SALE',
      available: true
    }
  });

  const onSubmit = (data: PropertyFormValues) => {
    handleCreate(data);
  }

    return(
    <div className="container mx-auto flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className=''>
          <CardTitle>Crear Propiedad</CardTitle>
          <CardDescription>Completa el formulario para agregar una nueva propiedad</CardDescription>
        </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Campo Titulo*/}
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
                { /* Campo Descripción */ }
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
                  {/* Campo Precio */ }
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
                              if (!isNaN(value)) {
                                field.onChange(value);
                              } else {
                                field.onChange(0); 
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Campo Dirección */ }
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
                  {/* Campos Agrupados */ }
                  <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Habitaciones */}
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
                                  if (!isNaN(value)) {
                                    field.onChange(value);
                                  } else {
                                    field.onChange(0);
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Baños */}
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
                                  if (!isNaN(value)) {
                                    field.onChange(value);
                                  } else {
                                    field.onChange(0);
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Metraje area */}
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
                                  if (!isNaN(value)) {
                                    field.onChange(value);
                                  } else {
                                    field.onChange(0);
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />   
                  </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Propiedad</FormLabel>  
                        <FormControl>
                          <select
                            className="w-full border border-gray-300 rounded-md p-2"
                            {...field}
                          >
                            <option value="HOUSE">Casa</option>
                            <option value="APARTMENT">Departamento</option>
                            <option value="LAND">Terreno</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                      
                  />
                  <FormField
                    control={form.control}
                    name="operationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venta o Alquiler</FormLabel>  
                        <FormControl>
                          <select
                            className="w-full border border-gray-300 rounded-md p-2"
                            {...field}
                          >
                            <option value="SALE">Venta</option>
                            <option value="RENT">Alquiler</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                      
                  />
                  { /* Campo Imagenes */ }
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imágenes</FormLabel>
                      <FormControl>
                        <Input
                          type='file'
                          multiple
                          accept="image/*"
                          onChange={
                            (e) => {
                              const selectedFiles = e.target.files;
                              if(selectedFiles) {
                                const newFilesArray = Array.from(selectedFiles)
                                const currentImages = field.value || [];
                                const combinedFIles = [...currentImages, ...newFilesArray]
                                if(combinedFIles.length > 4) {
                                  toast.warning("No puedes subir más de 4 imágenes");
                                  return;
                                }
                                field.onChange(combinedFIles);
                              }
                            }
                          }
                        />
                      </FormControl>

                      <div className="flex gap-4 mt-4">
                          {field.value?.map((img, index) => (
                            <div key={index} className="relative w-24 h-24">
                              <button
                                type="button"
                                className=" cursor-pointer absolute -top-2 -right-2 bg-white text-gray-500 hover:text-red-500 border border-gray-200 rounded-full w-6 h-6 flex items-center justify-center shadow-sm transition-colors z-10"
                                onClick={() => {
                                  const updatedImages = field.value?.filter((_, i) => i !== index) || [];
                                  field.onChange(updatedImages);
                                }}
                              >
                                <X size={14} />
                              </button>
                              <img 
                                src={URL.createObjectURL(img)} 
                                alt={`Preview ${index}`} 
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                          ))}
                        </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
      
                <Button type="submit" className='w-full bg-primary-base hover:bg-primary-hover text-white font-medium py-2 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer'>Crear Propiedad</Button>


              </form>
            </Form>
          </CardContent>
        
      </Card>
    </div>
  )
}

