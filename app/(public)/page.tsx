import Image from "next/image";
import bgHome from "@/public/bg-home.png";
import { ROUTES } from "@/shared/constants/routes";
import Link from "next/link";

export default function Home() {
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
              ¿Por qué Wasiq?
            </h2>
          </header>
          
          {/* REASONS */}
          <div className="flex justify-center items-center">
            <ul className="flex container mx-auto justify-between items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full max-w-4xl">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="properties" className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
          <div className="container mx-auto">
            <span className="text-neutral-500 text-xl">Explora nuevas propiedades</span>
          </div>
      </section>
    </main>
  );
}