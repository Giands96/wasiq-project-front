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
        className="min-h-[60vh]  py-12 sm:py-16 md:py-20 lg:py-24 bg-beige"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 my-16">
          {/* Título de la sección al estilo del diseño original */}
          <div className="flex justify-between items-center mb-10">
            <span className="text-sm font-medium text-normal-link uppercase tracking-wider mb-2">
              Nuestros servicios
            </span>
          </div>

          {/* Grid de tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center border border-gray-50"
              >
                {/* Icono más grande y con estilo visual */}
                <div className="mb-6">
                  <service.icon className="w-12 h-12 text-[#a67c52]" />
                </div>

                {/* Título con más peso visual */}
                <h3 className="text-lg font-bold text-[#4a3f35] mb-3 leading-tight">
                  {service.title}
                </h3>

                {/* Descripción con color suavizado */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );

}

export default Services;