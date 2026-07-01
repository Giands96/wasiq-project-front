"use client";

import { useState } from "react";
import Image from "next/image";
import Seguridad from "@/public/1-bg.webp";
import Confianza from "@/public/2-bg.webp";
import Tranquilidad from "@/public/3-bg.webp";
import Transparencia from "@/public/4-bg.webp";


const reasons = [
  {
    number: "01",
    title: "Seguridad",
    description: "Validamos cada propiedad con criterios claros para proteger tu inversión.",
    image: Seguridad,
  },
  {
    number: "02",
    title: "Confianza",
    description: "Acompañamiento experto y comunicación constante en cada etapa.",
    image: Confianza,
  },
  {
    number: "03",
    title: "Tranquilidad",
    description: "Procesos ordenados y asesoría precisa para que decidas con calma.",
    image: Tranquilidad,
  },
  {
    number: "04",
    title: "Transparencia",
    description: "Información real, condiciones visibles y soporte sin letra pequeña.",
    image: Transparencia,
  },
];

export default function About() {
  const [activeReason, setActiveReason] = useState<number | null>(null);

  return (
    <section 
      id="about" 
      className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
          
          {/* COLUMNA IZQUIERDA - TEXTO */}
          <div className="order-1 lg:order-1 flex flex-col justify-center">
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-4 inline-block">
              Sobre Wasiq
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Wasiq es <span className="text-orange-500">tu aliado</span> inmobiliario
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
              Somos un portal web inmobiliario que conecta a personas con propiedades 
              de valor real. Explora, compara y decide con toda la información que necesitas, respaldada 
              por un equipo comprometido con tu tranquilidad.
            </p>
            
            {/* Tres pilares de valor */}
            <div className="space-y-4">
              {[
                { title: "Propiedades Verificadas", desc: "Cada listado ha pasado nuestra validación rigurosa" },
                { title: "Atención Personalizada", desc: "Te guiamos en cada paso del proceso" },
                { title: "Información Completa", desc: "Todos los detalles que necesitas para decidir" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA - GRID DE IMÁGENES */}
          <div className="order-2 lg:order-2" onMouseLeave={() => setActiveReason(null)}>
            <div className="grid grid-cols-2 gap-4">
              {/* Columna izquierda */}
              <div className="space-y-4">
                {/* Imagen 01 - Seguridad (aspect-[4/5]) */}
                <div
                  className="relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer transition-opacity duration-300"
                  onMouseEnter={() => setActiveReason(0)}
                >
                  <Image
                    src={reasons[0].image}
                    alt={reasons[0].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 text-xl sm:text-2xl md:text-3xl font-bold text-white/90">
                    {reasons[0].number}
                  </span>
                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-3 sm:p-4 transition-opacity duration-300 ${
                      activeReason === 0 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-tight">
                      {reasons[0].title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-white/90 leading-relaxed line-clamp-3">
                      {reasons[0].description}
                    </p>
                  </div>
                </div>

                {/* Imagen 03 - Tranquilidad (aspect-square) */}
                <div
                  className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer transition-opacity duration-300"
                  onMouseEnter={() => setActiveReason(2)}
                >
                  <Image
                    src={reasons[2].image}
                    alt={reasons[2].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 text-xl sm:text-2xl md:text-3xl font-bold text-white/90">
                    {reasons[2].number}
                  </span>
                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-3 sm:p-4 transition-opacity duration-300 ${
                      activeReason === 2 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-tight">
                      {reasons[2].title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-white/90 leading-relaxed line-clamp-3">
                      {reasons[2].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Columna derecha (con offset pt-8) */}
              <div className="space-y-4 pt-8">
                {/* Imagen 02 - Confianza (aspect-square) */}
                <div
                  className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer transition-opacity duration-300"
                  onMouseEnter={() => setActiveReason(1)}
                >
                  <Image
                    src={reasons[1].image}
                    alt={reasons[1].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 text-xl sm:text-2xl md:text-3xl font-bold text-white/90">
                    {reasons[1].number}
                  </span>
                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-3 sm:p-4 transition-opacity duration-300 ${
                      activeReason === 1 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-tight">
                      {reasons[1].title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-white/90 leading-relaxed line-clamp-3">
                      {reasons[1].description}
                    </p>
                  </div>
                </div>

                {/* Imagen 04 - Transparencia (aspect-[4/5]) */}
                <div
                  className="relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer transition-opacity duration-300"
                  onMouseEnter={() => setActiveReason(3)}
                >
                  <Image
                    src={reasons[3].image}
                    alt={reasons[3].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 text-xl sm:text-2xl md:text-3xl font-bold text-white/90">
                    {reasons[3].number}
                  </span>
                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-3 sm:p-4 transition-opacity duration-300 ${
                      activeReason === 3 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-tight">
                      {reasons[3].title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-white/90 leading-relaxed line-clamp-3">
                      {reasons[3].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}