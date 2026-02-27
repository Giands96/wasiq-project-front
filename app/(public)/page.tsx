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

export default function Home() {
  const [activeReason, setActiveReason] = useState<number | null>(null);
  const [previewProperties, setPreviewProperties] = useState<Property[]>([]);
  const [isLoadingPreview, setIsLoadingPreview] = useState(true);

  const reasons = [
    {
      number: "01",
      title: "Seguridad",
      description: "Validamos cada propiedad con criterios claros para proteger tu inversión.",
      image: bgHome,
    },
    {
      number: "02",
      title: "Confianza",
      description: "Acompañamiento experto y comunicación constante en cada etapa.",
      image: loginBg,
    },
    {
      number: "03",
      title: "Tranquilidad",
      description: "Procesos ordenados y asesoría precisa para que decidas con calma.",
      image: bgHome,
    },
    {
      number: "04",
      title: "Transparencia",
      description: "Información real, condiciones visibles y soporte sin letra pequeña.",
      image: loginBg,
    },
  ];

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
    <main className="w-full">
      
      {/* ===== HERO SECTION ===== */}
      {/* Mobile: h-[60vh] | Tablet: h-[75vh] | Desktop: h-screen */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen w-full overflow-hidden">
        
        {/* BACKGROUND IMAGE */}
        <Image
          src={bgHome}
          alt="Modern house living room"
          fill
          priority
          className="object-cover object-center"
          placeholder="blur"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/35" />

        {/* HERO CONTENT */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
            
            <div className="max-w-3xl text-white flex flex-col gap-3 sm:gap-5 md:gap-6 lg:gap-8">
              
              {/* TÍTULO */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-lg">
                Encuentra tu hogar ideal con{" "}
                <span className="text-beige-dark block sm:inline mt-1 sm:mt-0">
                  Wasiq
                </span>
              </h1>

              {/* DESCRIPCIÓN */}
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-100 md:text-gray-200 font-light max-w-xl leading-relaxed">
                Descubre propiedades seleccionadas y comienza una nueva etapa
                en el lugar perfecto para ti.
              </p>

              {/* BOTÓN */}
              <div className="pt-1 sm:pt-2 md:pt-4">
                <Link 
                  href={ROUTES.PROPERTIES.LIST} 
                  className="inline-block w-full sm:w-auto transition-all duration-300 text-white font-semibold py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-full text-center text-sm sm:text-base md:text-lg shadow-lg bg-normal-link hover:bg-hover-link hover:shadow-xl"
                >
                  Ver propiedades
                </Link>
              </div>

            </div>
          </div>
        </div>

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

      {/* ===== WHY WASIQ SECTION ===== */}
      <section id="why-wasiq" className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          
          {/* HEADER */}
          <header className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-text-primary leading-tight">
              Wasiq es...
            </h2>
          </header>
          
          {/* REASONS */}
          <div
            className="flex justify-center items-center px-2 py-2 sm:px-3 sm:py-3"
            onMouseLeave={() => setActiveReason(null)}
          >
            <ul className="flex w-full max-w-6xl items-stretch gap-3 sm:gap-4 overflow-visible">
              {reasons.map((reason, index) => {
                const isActive = activeReason === index;
                const isAnotherActive = activeReason !== null && !isActive;

                return (
                  <li
                    key={reason.number}
                    className={[
                      "relative min-w-0 h-107.5 overflow-hidden rounded-2xl transform-gpu will-change-transform transition-all duration-350 ease-out",
                      isActive
                        ? "flex-[1.35_1_0%] scale-[1.04] shadow-xl"
                        : isAnotherActive
                        ? "flex-[0.88_1_0%] scale-[0.96] opacity-[0.85]"
                        : "flex-[1_1_0%] scale-100",
                    ].join(" ")}
                    onMouseEnter={() => setActiveReason(index)}
                  >
                    <div
                      className={[
                        "absolute inset-0 transform-gpu transition-[filter] duration-350 ease-out",
                        isActive ? "grayscale-0" : "grayscale",
                      ].join(" ")}
                    >
                      <Image
                        src={reason.image}
                        alt={reason.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 20vw"
                      />
                    </div>

                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />

                    <div
                      className={[
                        "absolute left-4 right-4 bottom-14 text-white transform-gpu transition-all duration-350 ease-out",
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                      ].join(" ")}
                    >
                      <h3 className="text-xl md:text-2xl font-semibold leading-tight">{reason.title}</h3>
                      <p className="mt-2 text-sm md:text-base text-white/90 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>

                    <span className="absolute bottom-4 right-4 text-2xl md:text-3xl font-semibold text-white/90">
                      {reason.number}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section id="properties" className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
              Explora nuevas propiedades
            </h2>
            <Link
              href={ROUTES.PROPERTIES.LIST}
              className="inline-flex items-center justify-center rounded-md bg-normal-link px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-hover-link"
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
    </main>
  );
}