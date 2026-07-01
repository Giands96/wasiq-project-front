import Link from "next/link";
import React from "react";
import { ROUTES } from "@/shared/constants/routes";

const filterLinks = [
  {
    label: "Venta",
    href: `${ROUTES.PROPERTIES.LIST}?operationType=SALE&page=0&size=12`,
  },
  {
    label: "Alquiler",
    href: `${ROUTES.PROPERTIES.LIST}?operationType=RENT&page=0&size=12`,
  },
  {
    label: "Departamento",
    href: `${ROUTES.PROPERTIES.LIST}?propertyType=APARTMENT&page=0&size=12`,
  },
  {
    label: "Terreno",
    href: `${ROUTES.PROPERTIES.LIST}?propertyType=LAND&page=0&size=12`,
  },
  {
    label: "Casa",
    href: `${ROUTES.PROPERTIES.LIST}?propertyType=HOUSE&page=0&size=12`,
  },
];

export const FooterComponent = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="mx-auto container px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-12">

          {/* Branding */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-baseline text-2xl md:text-3xl font-bold text-white tracking-tight group"
            >
              Wasiq
              <span className="text-orange-500 group-hover:scale-125 transition-transform duration-300">.</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
              Tu mejor aliado inmobiliario. Conectamos personas con propiedades de valor real.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-orange-500 rounded-full" />
              Navegación
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={ROUTES.HOME}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.PROPERTIES.LIST}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Propiedades
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.CONTACT.US}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Por Operación */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-orange-500 rounded-full" />
              Por Operación
            </h3>
            <ul className="space-y-3">
              {filterLinks.slice(0, 2).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Por Tipo */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-orange-500 rounded-full" />
              Por Tipo
            </h3>
            <ul className="space-y-3">
              {filterLinks.slice(2).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Wasiq. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors duration-200">
              Privacidad
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors duration-200">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
