"use client";

import { useState } from "react";
import Image from "next/image";
import bgHome from "@/public/bg-home.png";
import loginBg from "@/public/login-bg.webp";


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

export default function About() {
  const [activeReason, setActiveReason] = useState<number | null>(null);

  return (
    <section 
      id="about" 
      className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-neutral-00/40"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* COLUMNA IZQUIERDA - TEXTO */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <span className="text-sm font-medium text-normal-link uppercase tracking-wider mb-2">
              Sobre nosotros
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight mb-6">
              Wasiq es <span className="text-normal-link">tu aliado</span> inmobiliario
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6">
              Somos un portal web inmobiliario que conecta a personas con propiedades 
              de valor real. No somos una inmobiliaria tradicional: somos tu puerta de 
              acceso a oportunidades verificadas, donde la tecnología y el acompañamiento 
              humano se unen para que encuentres tu próximo espacio con total confianza.
            </p>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Explora, compara y decide con toda la información que necesitas, respaldada 
              por un equipo comprometido con tu tranquilidad.
            </p>
          </div>

          {/* COLUMNA DERECHA - GRID DE IMÁGENES */}
          <div 
            className="order-1 lg:order-2"
            onMouseLeave={() => setActiveReason(null)}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {reasons.map((reason, index) => {
                const isActive = activeReason === index;
                const isAnotherActive = activeReason !== null && !isActive;

                return (
                  <div
                    key={reason.number}
                    className={[
                      "relative aspect-square overflow-hidden rounded-2xl cursor-pointer",
                      "transform-gpu will-change-transform transition-all duration-350 ease-out",
                      isActive 
                        ? "scale-[1.04] shadow-xl z-10" 
                        : isAnotherActive 
                          ? "scale-[0.96] opacity-[0.85]" 
                          : "scale-100",
                    ].join(" ")}
                    onMouseEnter={() => setActiveReason(index)}
                  >
                    {/* Imagen con efecto grayscale */}
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
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>

                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* Número */}
                    <span className="absolute top-3 left-3 text-xl sm:text-2xl md:text-3xl font-bold text-white/90">
                      {reason.number}
                    </span>

                    {/* Contenido que aparece en hover */}
                    <div
                      className={[
                        "absolute inset-0 flex flex-col justify-end p-3 sm:p-4",
                        "transform-gpu transition-all duration-350 ease-out",
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                      ].join(" ")}
                    >
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-tight">
                        {reason.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-white/90 leading-relaxed line-clamp-3">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}