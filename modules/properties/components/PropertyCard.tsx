import Image from "next/image";
import Link from "next/link";
import bgHome from "@/public/bg-home.png";
import { ROUTES } from "@/shared/constants/routes";
import { Property } from "../types/property.types";

interface PropertyCardProps {
  property: Property;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(price);
};

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const imageSrc = property.images?.[0] || bgHome;

  return (
    <article className="group relative h-[400px] w-full overflow-hidden rounded-2xl shadow-sm transition-all duration-500 hover:shadow-xl cursor-pointer">
      <Image
        src={imageSrc}
        alt={property.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col p-6">
        
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="line-clamp-2 text-xl font-bold text-white leading-tight">
            {property.title}
          </h3>

          <span className="shrink-0 rounded-lg bg-white/20 backdrop-blur-md px-3 py-1 text-sm font-bold text-white border border-white/20">
            {formatPrice(property.price)}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-gray-200 mb-5">
          {property.description}
        </p>


        <Link
          href={ROUTES.PROPERTIES.DETAIL(property.slug)}
          className="flex w-full items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black"
        >
          Ver propiedad
        </Link>
      </div>

    </article>
  );
};