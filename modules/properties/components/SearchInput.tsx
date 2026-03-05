import React from "react";
import { Input } from "@/shared/components/ui/input";
import { useForm } from "react-hook-form";
import { useProperties } from "../hooks/useProperties";
import { Button } from "@/shared/components/ui/button";

function SearchInput() {
  const { handleSearchByTitle } = useProperties();
  const { register, handleSubmit } = useForm({
    defaultValues: { query: "" },
  });

  const onSubmit = (data: { query: string }) => {
    handleSearchByTitle(data.query);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-2">
      <Input placeholder="Buscar propiedades..." {...register("query")} />
      <Button type="submit" className="bg-primary-button">Buscar</Button>
    </form>
  );
}

export default SearchInput;