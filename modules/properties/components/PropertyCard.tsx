import Image from "next/image";
import Link from "next/link";
import bgHome from "@/public/bg-home.png";
import { ROUTES } from "@/shared/constants/routes";
import { Property } from "../types/property.types";

interface PropertyCardProps {
  property: Property;
}

const getDescriptionPreview = (description: string) => {
  const words = description.trim().split(/\s+/);
  if (words.length <= 6) {
    return description;
  }
  return `${words.slice(0, 6).join(" ")}...`;
};

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
    <article className="overflow-hidden rounded-2xl border border-border-light bg-bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-lg font-semibold text-text-primary">
            {property.title}
          </h3>
          <p className="text-base font-semibold text-normal-link">
            {formatPrice(property.price)}
          </p>
        </div>

        <div className="relative min-h-11">
          <p className="text-sm leading-relaxed text-text-secondary">
            {getDescriptionPreview(property.description)}
          </p>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-linear-to-t from-bg-card to-transparent" />
        </div>

        <Link
          href={ROUTES.PROPERTIES.DETAIL(property.slug)}
          className="inline-flex w-full items-center justify-center rounded-md bg-normal-link px-4 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-hover-link"
        >
          Ver propiedad
        </Link>
      </div>
    </article>
  );
};
