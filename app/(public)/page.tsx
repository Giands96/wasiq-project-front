"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import bgHome from "@/public/bg-home.png";
import loginBg from "@/public/login-bg.webp";
import { ROUTES } from "@/shared/constants/routes";
import Link from "next/link";
import { Property } from "@/modules/properties/types/property.types";
import { PropertyService } from "@/modules/properties/services/property.service";
import { PropertyCard } from "@/modules/properties/components/PropertyCard";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Hero from "@/shared/components/ui/home/hero";
import About from "@/shared/components/ui/home/about";
import Services from "@/shared/components/ui/home/services";

export default function Home() {

  // Estado para controlar la razón activa en la sección "Wasiq es..."
  const [activeReason, setActiveReason] = useState<number | null>(null);
  const [previewProperties, setPreviewProperties] = useState<Property[]>([]);
  const [isLoadingPreview, setIsLoadingPreview] = useState(true);
  const searchParams = useSearchParams();
  const isExpired = searchParams.get("expired") === "true";
  const router = useRouter();


  useEffect(() => {
    if(isExpired) {
      toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente para continuar.");
      router.replace(ROUTES.HOME);
      return;
    }
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
  }, [isExpired, router]);

  return (
    <main className="w-full">
      
      {/* ===== HERO SECTION ===== */}
      {/* Mobile: h-[60vh] | Tablet: h-[75vh] | Desktop: h-screen */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen w-full overflow-hidden">
        
        <Hero/>

        {/* SCROLL INDICATOR - Solo visible en mobile */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden">
          <div className="animate-bounce">
            <svg 
              className="w-6 h-6 text-white/80" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* ===== ABOUT US SECTION ===== */}
      <About />

      <section id="properties" className="min-h-[64vh] py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
              Explora nuevas propiedades
            </h2>
            <Link
              href={ROUTES.PROPERTIES.LIST}
              className="inline-flex items-center justify-center rounded-full border border-bg-normal-link  bg-transparent px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-white duration-300 hover:bg-hover-link"
            >
              Ver más
            </Link>
          </div>

          {isLoadingPreview ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-96 animate-pulse rounded-2xl border border-border-light bg-beige"
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
            <div className="rounded-2xl border border-border-light bg-bg-card p-6 text-center text-text-secondary">
              Aún no hay propiedades disponibles para mostrar.
            </div>
          )}
        </div>
      </section>
      <section>
        <Services />
      </section>

    </main>
  );
}