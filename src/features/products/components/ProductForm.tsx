import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductCreateForm } from "../hooks/use-product-create-form";
import { useCreateProduct } from "../react-query/queries";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import type { CreateProductDTO } from "../dto/product.dto";

function ProductForm() {
  const { register, handleSubmit, errors, control, reset } =
    useProductCreateForm();

  const { mutate, isPending } = useCreateProduct();

  async function onSubmit(data: CreateProductDTO) {
    mutate(data);
    toast.success("Produto adicionado com sucesso!");
    reset();
  }

  return (
    <form
      className="flex flex-wrap gap-3 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full gap-5">
        <Input
          type="text"
          placeholder="Nome do produto"
          {...register("name")}
        />
        <Controller
          control={control}
          name="unit"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="un">Unidade</SelectItem>
                <SelectItem value="g">Gramas</SelectItem>
                <SelectItem value="kg">KG</SelectItem>
                <SelectItem value="ml">ml</SelectItem>
                <SelectItem value="L">Litros</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Enviando..." : "Adicionar"}
        </Button>
        {errors.root && (
          <span className="text-sm text-red-500">{errors.root.message}</span>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
