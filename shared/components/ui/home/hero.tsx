import React from "react";
import HeroImage from "@/public/herobg.webp";
import Link from "next/link";
import Image from "next/image";

function Hero() {
  return (
    <section className="w-full h-dvh px-6 py-6">
      <div className="relative w-full h-[85dvh] md:h-[85dvh] sm:h-[50dvh]  rounded-4xl overflow-hidden animate-fade-in-up animate-duration-1000">
        
        {/* Imagen con Next.js Image + fill */}
        <Image
          src={HeroImage}
          alt="Interior moderno"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Texto */}
        <div className="relative z-20 flex items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            Tu proxima propiedad está <br className="hidden sm:block" /> aquí
          </h1>
        </div>

        <Link
          href="/properties"
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 bg-beige text-black px-6 py-3 rounded-full transition-all duration-300 hover:bg-beige-dark hover:scale-105 whitespace-nowrap"
        >
          Ver propiedades
        </Link>
      </div>
    </section>
  );
}

export default Hero;