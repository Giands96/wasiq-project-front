"use client";

import { useEffect, useState } from "react";

import { ROUTES } from "@/shared/constants/routes";
import Link from "next/link";
import { Property } from "@/modules/properties/types/property.types";
import { PropertyService } from "@/modules/properties/services/property.service";
import { PropertyCard } from "@/modules/properties/components/PropertyCard";

export const PreviewProperties = (text:{ title: string; description: string }) => {
  const [previewProperties, setPreviewProperties] = useState<Property[]>([]);
  const [isLoadingPreview, setIsLoadingPreview] = useState(true);

  const title = text.title;
  const description = text.description;

  useEffect(() => {
    const loadPreviewProperties = async () => {
      try {
        const data = await PropertyService.getHomePreviewProperties();
        setPreviewProperties(data);
      } catch {
        setPreviewProperties([]);
      } finally {
        setIsLoadingPreview(false);
      }
    };

    loadPreviewProperties();
  }, []);

  return (
    <section
      id="properties"
      className="min-h-[64vh] bg-gradient-to-b from-gray-50 via-gray-50 to-white py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 scroll-reveal">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              {title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              {description}
            </p>
          </div>
          <Link
            href={ROUTES.PROPERTIES.LIST}
            className="inline-flex items-center justify-center rounded-full border border-orange-500 bg-transparent px-6 py-2.5 text-sm font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white whitespace-nowrap"
          >
            Ver todas
          </Link>
        </div>

        {isLoadingPreview ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-2xl border border-gray-200 bg-gray-100"
              />
            ))}
          </div>
        ) : previewProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {previewProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base">
              Aún no hay propiedades disponibles para mostrar.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
