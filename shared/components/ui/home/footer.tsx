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
    <footer className="bg-neutral-100 border-t border-gray-200">
      <div className="mx-auto container px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          <div className="lg:w-1/3">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-800 tracking-tight"
            >
              Wasiq<span className="text-orange-600">.</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 max-w-xs">
              Tu mejor aliado inmobiliario
            </p>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                Navegación
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={ROUTES.HOME}
                    className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <span className="text-sm font-medium text-gray-700">
                    Propiedades
                  </span>
                </li>
                <li>
                  <Link
                    href={ROUTES.CONTACT.US}
                    className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                Por operación
              </h3>
              <ul className="space-y-3">
                {filterLinks.slice(0, 2).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                Por tipo
              </h3>
              <ul className="space-y-3">
                {filterLinks.slice(2).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Wasiq. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
