import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StockProduct } from "@/types/stock";
import { useUpdateStockProduct } from "../react-query/queries";
import useStockProductEditForm from "../hooks/use-stock-product-edit-form";
import type { UpdateStockProductDTO } from "../dto/stock-products.dto";
import { toast } from "react-toastify";

type EditStockProductFormProps = {
  stockProduct: StockProduct;
  onSuccess: () => void;
  onCancel: () => void;
};

function EditStockProductForm({
  stockProduct,
  onSuccess,
  onCancel,
}: EditStockProductFormProps) {
  const { register, handleSubmit, errors } =
    useStockProductEditForm(stockProduct);
  const { mutate, isPending } = useUpdateStockProduct();

  function onSubmit(stockProduct: UpdateStockProductDTO) {
    mutate(stockProduct, {
      onSuccess: () => {
        (onSuccess(), toast.success("Produto editado com sucesso!"));
      },
    });
  }
  console.log(errors);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="editQuantity">
          Quantidade <span className="text-red-500">*</span>
        </Label>
        <Input
          type="number"
          placeholder="Quantidade"
          step="0.01"
          {...register("quantity", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="editCostPrice">
          Valor pago (R$) <span className="text-red-500">*</span>
        </Label>
        <Input
          type="number"
          placeholder="0.00"
          step="0.01"
          required
          {...register("costPrice", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Label htmlFor="editLot">Lote</Label>
        <Input type="text" placeholder="Opcional" {...register("lot")} />
      </div>

      <div>
        <Label htmlFor="editExpiresAt">Validade</Label>
        <Input {...register("expiresAt")} type="date" />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1" disabled={isPending}>
          {isPending ? "Enviando..." : "Salvar alterações"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

export default EditStockProductForm;
