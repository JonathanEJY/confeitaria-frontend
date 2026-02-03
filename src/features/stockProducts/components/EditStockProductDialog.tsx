import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { StockProduct } from "@/types/stock";

type StockProductEditDialogProps = {
  isOpen: boolean;
  handleIsOpen: (isOpen: boolean) => void;
  stockProduct: StockProduct | null;
};

function EditStockProductDialog({
  isOpen,
  handleIsOpen,
  stockProduct,
}: StockProductEditDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={handleIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar produto do estoque</DialogTitle>
          <DialogDescription>
            Aqui você poderá editar as informações do produto no estoque.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4">
          <div>
            <Label htmlFor="editQuantity">
              Quantidade <span className="text-red-500">*</span>
            </Label>
            <Input
              id="editQuantity"
              type="number"
              placeholder="Quantidade"
              step="0.01"
              required
            />
          </div>

          <div>
            <Label htmlFor="editCostPrice">
              Valor pago (R$) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="editCostPrice"
              type="number"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div>
            <Label htmlFor="editLot">Lote</Label>
            <Input id="editLot" type="text" placeholder="Opcional" />
          </div>

          <div>
            <Label htmlFor="editExpiresAt">Validade</Label>
            <Input id="editExpiresAt" type="date" />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Salvar alterações
            </Button>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditStockProductDialog;
