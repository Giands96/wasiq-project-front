"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "./SearchInput";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/constants/routes";

type FiltersFormValues = {
  propertyType: string;
  operationType: string;
  minPrice: string;
  maxPrice: string;
  rooms: string;
  bathrooms: string;
};

const FILTER_KEYS: Array<keyof FiltersFormValues> = [
  "propertyType",
  "operationType",
  "minPrice",
  "maxPrice",
  "rooms",
  "bathrooms",
];

function FiltersControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit, setValue, reset } = useForm<FiltersFormValues>({
    defaultValues: {
      propertyType: "",
      operationType: "",
      minPrice: "",
      maxPrice: "",
      rooms: "",
      bathrooms: "",
    },
  });

  useEffect(() => {
    setValue("propertyType", searchParams.get("propertyType") ?? "");
    setValue("operationType", searchParams.get("operationType") ?? "");
    setValue("minPrice", searchParams.get("minPrice") ?? "");
    setValue("maxPrice", searchParams.get("maxPrice") ?? "");
    setValue("rooms", searchParams.get("rooms") ?? "");
    setValue("bathrooms", searchParams.get("bathrooms") ?? "");
  }, [searchParams, setValue]);

  const onSubmit = (data: FiltersFormValues) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    FILTER_KEYS.forEach((key) => {
      const value = data[key].trim();
      if (value) {
        nextParams.set(key, value);
      } else {
        nextParams.delete(key);
      }
    });

    nextParams.delete("page");

    const queryString = nextParams.toString();
    router.push(queryString ? `${ROUTES.PROPERTIES.LIST}?${queryString}` : ROUTES.PROPERTIES.LIST);
  };

  const handleClearFilters = () => {
    const nextParams = new URLSearchParams(searchParams.toString());
    FILTER_KEYS.forEach((key) => nextParams.delete(key));
    nextParams.delete("page");

    reset({
      propertyType: "",
      operationType: "",
      minPrice: "",
      maxPrice: "",
      rooms: "",
      bathrooms: "",
    });

    const queryString = nextParams.toString();
    router.push(queryString ? `${ROUTES.PROPERTIES.LIST}?${queryString}` : ROUTES.PROPERTIES.LIST);
  };

  return (
    <aside className="rounded-2xl border border-border-light bg-white p-5 lg:col-span-3 lg:h-fit">
      <h2 className="mb-4 text-lg font-semibold text-text-primary">Filtros</h2>

      <div className="my-3">
        <SearchInput />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="propertyType">Tipo de propiedad</Label>
          <select
            id="propertyType"
            className="border-input bg-transparent h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            {...register("propertyType")}
          >
            <option value="">Todos</option>
            <option value="HOUSE">Casa</option>
            <option value="APARTMENT">Departamento</option>
            <option value="LAND">Terreno</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="operationType">Tipo de operación</Label>
          <select
            id="operationType"
            className="border-input bg-transparent h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            {...register("operationType")}
          >
            <option value="">Todos</option>
            <option value="SALE">Venta</option>
            <option value="RENT">Alquiler</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="minPrice">Precio mín.</Label>
            <Input id="minPrice" type="number" min={0} placeholder="0" {...register("minPrice")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxPrice">Precio máx.</Label>
            <Input id="maxPrice" type="number" min={0} placeholder="0" {...register("maxPrice")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="rooms">Cuartos</Label>
            <Input id="rooms" type="number" min={0} placeholder="0" {...register("rooms")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Baños</Label>
            <Input id="bathrooms" type="number" min={0} placeholder="0" {...register("bathrooms")} />
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="flex-1 bg-primary-button">Aplicar</Button>
          <Button type="button" variant="outline" className="flex-1" onClick={handleClearFilters}>
            Limpiar
          </Button>
        </div>
      </form>
    </aside>
  );
}

export default FiltersControls;