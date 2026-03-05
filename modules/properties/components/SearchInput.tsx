import { useEffect } from "react";
import { Input } from "@/shared/components/ui/input";
import { useForm } from "react-hook-form";
import { useProperties } from "../hooks/useProperties";
import { Button } from "@/shared/components/ui/button";
import { useSearchParams } from "next/navigation";

type SearchFormValues = {
  query: string;
};

function SearchInput() {
  const { handleSearchByTitle } = useProperties();
  const searchParams = useSearchParams();
  const { register, handleSubmit, setValue } = useForm<SearchFormValues>({
    defaultValues: { query: "" },
  });
  const queryFromUrl = searchParams.get("query") ?? "";

  useEffect(() => {
    setValue("query", queryFromUrl, { shouldDirty: false, shouldTouch: false });
  }, [queryFromUrl, setValue]);

  const onSubmit = (data: SearchFormValues) => {
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