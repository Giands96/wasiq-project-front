"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/modules/properties/components/PropertyCard";
import FiltersControls from "@/modules/properties/components/FiltersControls";
import { usePropertyStore } from "@/store/usePropertyStore"; 
import { PropertyPaginationParams } from "@/modules/properties/types/property.types";

const parseNumber = (value: string | null): number | undefined => {
  if (value === null || value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export default function PropertiesPage() {
  //URL
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  // Extraer todo directamente de Zustand
  const { 
    properties, 
    isLoading, 
    currentPage, 
    totalPages, 
    fetchProperties
  } = usePropertyStore();

  // El componente reacciona a la URL y le avisa a Zustand qué buscar
  useEffect(() => {
    const params: PropertyPaginationParams = {
      query: searchParams.get("query") || undefined,
      propertyType: searchParams.get("propertyType") || undefined,
      operationType: searchParams.get("operationType") || undefined,
      minPrice: parseNumber(searchParams.get("minPrice")),
      maxPrice: parseNumber(searchParams.get("maxPrice")),
      rooms: parseNumber(searchParams.get("rooms")),
      bathrooms: parseNumber(searchParams.get("bathrooms")),
      page: parseNumber(searchParams.get("page")),
      size: parseNumber(searchParams.get("size")),
    };

    fetchProperties(params);
  }, [searchParams, fetchProperties]); 

  return (
    <main className="min-h-screen bg-bg-main py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">Propiedades</h1>
          <p className="mt-2 text-text-secondary">Encuentra la propiedad ideal para tu siguiente etapa.</p>
        </header>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <FiltersControls/>

          <div className="lg:col-span-9">
            {/* Usamos el isLoading de Zustand directamente */}
            {isLoading ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-96 animate-pulse rounded-2xl border border-border-light bg-beige"
                  />
                ))}
              </div>
            ) : properties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Controles de Paginación */}
                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    // onClick={goToPreviousPage} <-- Temporalmente desactivado
                    disabled={currentPage === 0}
                    className="rounded-md border border-border-light bg-beige px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-beige-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Anterior
                  </button>

                  <span className="text-sm font-medium text-text-secondary">
                    Página {currentPage + 1} de {Math.max(totalPages, 1)}
                  </span>

                  <button
                    // onClick={goToNextPage} <-- Temporalmente desactivado
                    disabled={currentPage + 1 >= totalPages}
                    className="rounded-md border border-border-light bg-beige px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-beige-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Siguiente
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-border-light bg-bg-card p-8 text-center text-text-secondary">
                No se encontraron propiedades con la búsqueda &quot;{query}&quot;.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}