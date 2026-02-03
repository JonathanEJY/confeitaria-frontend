import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useStockProductCreateForm from "../hooks/use-stock-product-create-form";
import { useGetProducts } from "@/features/products/react-query/queries";
import type { Product } from "@/types/product";
import { toast } from "react-toastify";
import type { CreateStockProductDTO } from "../dto/stock-products.dto";
import { useCreateStockProduct } from "../react-query/queries";

function CreateStockProductForm() {
  const { control, handleSubmit, register, reset, errors } =
    useStockProductCreateForm();
  const { data: products = [] } = useGetProducts();
  const { mutate } = useCreateStockProduct();

  async function onSubmit(data: CreateStockProductDTO) {
    mutate(data);
    toast.success("Produto adicionado ao estoque com sucesso!");
    reset();
  }
  console.log(errors);

  return (
    <form
      className="flex flex-wrap gap-3 items-end"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label className="text-sm font-medium mb-1 block">
          Produto <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="productId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-55">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product: Product) => (
                  <SelectItem key={product.uuid} value={product.uuid}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <Label className="text-sm font-medium mb-1 block">
          Quantidade <span className="text-red-500">*</span>
        </Label>
        <Input
          type="number"
          step="0.01"
          {...register("quantity", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label className="text-sm font-medium mb-1 block">
          Valor pago (R$) <span className="text-red-500">*</span>
        </Label>

        <Input
          type="number"
          step="0.01"
          {...register("costPrice", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label className="text-sm font-medium mb-1 block">Lote</Label>
        <Input type="text" {...register("lot")} />
      </div>

      <div>
        <Label className="text-sm font-medium mb-1 block">Validade</Label>
        <Input
          type="date"
          {...register("expiresAt", {
            setValueAs: (value) => (value ? new Date(value) : undefined),
          })}
        />
      </div>

      <Button type="submit">Adicionar</Button>
    </form>
  );
}

export default CreateStockProductForm;
