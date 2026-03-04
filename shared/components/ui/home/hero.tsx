import React from 'react';
import  HeroImage from "@/public/herobg.webp";
import Link from 'next/link';

function Hero() {
  return (
    <section className="w-full px-6 py-6">
      <div className="relative w-full h-[70vh] lg:h-[85vh] rounded-4xl overflow-hidden">
        
        {/* Imagen */}
        <img
            src={HeroImage.src}
          alt="Interior moderno"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Texto */}
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            Tu proxima propiedad está <br /> aquí
          </h1>
        </div>
        <Link
          href="/properties"
          className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 bg-beige text-black px-6 py-3 rounded-full  transition-all duration-300 hover:bg-beige-dark hover:scale-105"
        >
          Ver propiedades
        </Link>
      </div>
      
    </section>
  );
}

export default Hero;