import React from "react";
import HeroImage from "@/public/herobg.webp";
import Link from "next/link";
import Image from "next/image";

function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image con overlay gradiente */}
      <div className="absolute inset-0">
        <Image
          src={HeroImage}
          alt="Interior moderno"
          fill
          preload
          className="object-cover object-center"
          quality={75}
        />
        {/* Gradient overlay mejorado */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center justify-center mb-6 animate-fade-in">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-orange-300 opacity-90">
            Desde Wasiq
          </p>
        </div>

        {/* Título principal */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 animate-fade-in"
          
        >
          Tu próxima propiedad está <br className="hidden sm:block" /> aquí
        </h1>

        {/* Descripción */}
        <p 
          className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fade-in"
          
        >
          Conectamos personas con propiedades de valor real. Explora, compara y decide con la información que necesitas.
        </p>

        {/* Botones */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          
        >
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            Ver propiedades
          </Link>
          <Link
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition-all duration-300 whitespace-nowrap"
          >
            Conocer más
          </Link>
        </div>
      </div>

      
    </section>
  );
}

export default Hero;