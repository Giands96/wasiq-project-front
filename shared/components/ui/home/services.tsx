import { time } from "console";
import { BadgeCheck, MessageCircleMore, UserSearch  } from "lucide-react";
import React from "react";



function Services() {

    const services = [
        {
            title: "Propiedades verificadas",
            description: "Cada propiedad en nuestro portal ha sido rigurosamente verificada para garantizar su autenticidad, legalidad y valor real.",
            icon: BadgeCheck
        },
        {
            title: "Facilidad de contacto",
            description: "Puedes comunicarte con nosotros de manera rápida y sencilla a través de nuestro formulario de contacto o redes sociales.",
            icon: UserSearch
        },
        {
            title: "Atención al cliente 24/7",
            description: "Nuestro equipo de soporte está disponible en todo momento para resolver tus dudas y brindarte la mejor experiencia.",
            icon: MessageCircleMore
        },
        {
            title: 'Plataforma fácil de usar',
            description: 'Nuestro portal está diseñado para que encuentres lo que buscas de manera rápida y sin complicaciones.',
            icon: UserSearch
        }

    ]

    return (
      <section
        id="services"
        className="min-h-[60vh] py-12 sm:py-16 md:py-20 lg:py-24 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          {/* Encabezado de la sección */}
          <div className="mb-16 text-center scroll-reveal">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nuestros servicios
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos soluciones integrales para encontrar la propiedad perfecta
            </p>
          </div>

          {/* Grid de tarjetas de servicios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 flex flex-col items-center text-center scroll-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icono con fondo y animación */}
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-orange-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <service.icon className="w-12 h-12 text-orange-500 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Título */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                  {service.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .scroll-reveal {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .service-card {
            --delay: 0s;
            animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) var(--delay) forwards;
          }
        `}</style>
      </section>
    );

}

export default Services;