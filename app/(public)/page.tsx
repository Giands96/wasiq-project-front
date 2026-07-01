"use client";

import { useEffect, useState, Suspense } from "react";

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
import { FooterComponent } from "@/shared/components/ui/home/footer";

function HomeContent() {
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

  // Scroll reveal observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="w-full bg-white text-[#111827]">
      
      {/* ===== HERO SECTION ===== */}
      {/* Mobile: h-[60vh] | Tablet: h-[75vh] | Desktop: h-screen */}
        
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


      {/* ===== ABOUT US SECTION ===== */}
      <About />

      <section
          id="properties"
          className="min-h-[64vh] bg-gradient-to-b from-gray-50 via-gray-50 to-white py-12 sm:py-16 md:py-20 lg:py-24"
        >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 scroll-reveal">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                Explora nuevas propiedades
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Descubre las mejores opciones disponibles para tu próximo hogar
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
      <Services />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
      <HomeContent />
    </Suspense>
  );
}