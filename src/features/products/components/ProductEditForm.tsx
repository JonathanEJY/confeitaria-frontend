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
import { useProductEditForm } from "../hooks/use-product-edit";
import { Controller } from "react-hook-form";

type ProductEditFormProps = {
  product: Product;
};

function ProductEditForm({ product }: ProductEditFormProps) {
  const {
    register,
    handleSubmit,
    control,
    errors,
    isLoading,
  } = useProductEditForm(product);

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Nome */}
      <div className="space-y-1">
        <Label htmlFor="editName">Nome</Label>
        <Input
          id="editName"
          placeholder="Nome do produto"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-sm text-red-500">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Unidade */}
      <div className="space-y-1">
        <Label>Unidade</Label>

        <Controller
          control={control}
          name="unit"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
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

        {errors.unit && (
          <span className="text-sm text-red-500">
            {errors.unit.message}
          </span>
        )}
      </div>

      {/* Botões */}
      <div className="flex gap-2">
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar alterações"}
        </Button>

        <Button type="button" variant="outline">
          Cancelar
        </Button>
      </div>
    </form>
  );
}

export default ProductEditForm;
