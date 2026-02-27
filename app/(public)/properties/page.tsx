"use client";

import { useEffect, useState } from "react";
import { PropertyCard } from "@/modules/properties/components/PropertyCard";
import { PropertyService } from "@/modules/properties/services/property.service";
import { Property } from "@/modules/properties/types/property.types";

const PAGE_SIZE = 9;

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      try {
        const response = await PropertyService.getPropertiesList({
          page: currentPage,
          size: PAGE_SIZE,
          sort: "id,desc",
        });
        setProperties(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        setProperties([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, [currentPage]);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev));
  };

  return (
    <main className="min-h-screen bg-bg-main py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">Propiedades</h1>
          <p className="mt-2 text-text-secondary">Encuentra la propiedad ideal para tu siguiente etapa.</p>
        </header>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="rounded-2xl border border-border-light bg-bg-card p-5 lg:col-span-3 lg:h-fit">
            <h2 className="mb-4 text-lg font-semibold text-text-primary">Filtros</h2>
            <div className="space-y-3">
              <button className="w-full rounded-md border border-border-light bg-beige px-4 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-beige-dark">
                Tipo de propiedad
              </button>
              <button className="w-full rounded-md border border-border-light bg-beige px-4 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-beige-dark">
                Tipo de operación
              </button>
              <button className="w-full rounded-md border border-border-light bg-beige px-4 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-beige-dark">
                Rango de precio
              </button>
              <button className="w-full rounded-md border border-border-light bg-beige px-4 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-beige-dark">
                Habitaciones
              </button>
            </div>
          </aside>

          <div className="lg:col-span-9">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: PAGE_SIZE }).map((_, index) => (
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

                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 0}
                    className="rounded-md border border-border-light bg-beige px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-beige-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Anterior
                  </button>

                  <span className="text-sm font-medium text-text-secondary">
                    Página {currentPage + 1} de {Math.max(totalPages, 1)}
                  </span>

                  <button
                    onClick={goToNextPage}
                    disabled={currentPage + 1 >= totalPages}
                    className="rounded-md border border-border-light bg-beige px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-beige-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Siguiente
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-border-light bg-bg-card p-8 text-center text-text-secondary">
                No se encontraron propiedades por ahora.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
