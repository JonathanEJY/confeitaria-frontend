import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { Product } from "@/types/product";
import { useProductEditForm } from "../hooks/use-product-edit-form";
import { Controller } from "react-hook-form";
import { useUpdateProduct } from "../react-query/queries";
import { toast } from "react-toastify";

type ProductEditFormProps = {
  product: Product;
  onSuccess: () => void;
  onCancel: () => void;
};

function ProductEditForm({
  product,
  onSuccess,
  onCancel,
}: ProductEditFormProps) {
  const { register, handleSubmit, control, errors } =
    useProductEditForm(product);

  const { mutate, isPending } = useUpdateProduct();

  async function onSubmit(data: Product) {
    mutate(data, {
      onSuccess: () => {
        onSuccess();
        toast.success("Produto editado com sucesso!");
      },
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <Label htmlFor="editName">Nome</Label>
        <Input placeholder="Nome do produto" {...register("name")} />
      </div>

      <div className="space-y-1">
        <Label>Unidade</Label>

        <Controller
          control={control}
          name="unit"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a unidade" />
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
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1" disabled={isPending}>
          {isPending ? "Salvando..." : "Salvar alterações"}
        </Button>

        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
      {errors.root && (
        <span className="text-sm text-red-500">{errors.root.message}</span>
      )}
    </form>
  );
}

export default ProductEditForm;
