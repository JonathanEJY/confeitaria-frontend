import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { StockProduct } from "@/types/stock";
import EditStockProductForm from "./EditStockProductForm";

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
        {stockProduct ? (
          <EditStockProductForm
            stockProduct={stockProduct}
            onSuccess={() => handleIsOpen(false)}
            onCancel={() => handleIsOpen(false)}
          />
        ) : (
          <p>Nada para ser exibido aqui</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditStockProductDialog;
