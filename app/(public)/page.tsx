"use client";

import { useEffect, Suspense } from "react";

import { ROUTES } from "@/shared/constants/routes";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Hero from "@/shared/components/ui/home/hero";
import About from "@/shared/components/ui/home/about";
import Services from "@/shared/components/ui/home/services";
import { PreviewProperties } from "@/modules/properties/components/PreviewProperties";

function HomeContent() {
  const searchParams = useSearchParams();
  const isExpired = searchParams.get("expired") === "true";
  const router = useRouter();

  useEffect(() => {
    if(isExpired) {
      toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente para continuar.");
      router.replace(ROUTES.HOME);
      return;
    }
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

      <PreviewProperties title="Propiedades Destacadas" description="Descubre las mejores opciones disponibles para tu próximo hogar" />
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