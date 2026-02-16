import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import type { StockProduct } from "@/types/stock";
import { useGetStock } from "@/features/stock/react-query/queries";
import { useState } from "react";
import {
  useDeleteStockProduct,
  useGetStockProducts,
} from "@/features/stockProducts/react-query/queries";
import { toast } from "react-toastify";
import EditStockProductDialog from "./EditStockProductDialog";
import { formatDateBR } from "@/helper/formatDateBR";

function StockProductTable() {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<StockProduct | null>(
    null,
  );
  const { data: stock } = useGetStock();
  const {
    data: stockProducts,
    isPending,
    isError,
  } = useGetStockProducts(stock.uuid);

  const { mutate } = useDeleteStockProduct();

  function handleEditDialogOpenChange(isOpen: boolean) {
    setOpenEditDialog(isOpen);
  }

  function handleDelete(stockProductId: string) {
    if (!window.confirm("Deseja realmente deletar este produto?")) return;
    try {
      mutate(stockProductId);
      toast.success("Produto deletado com sucesso");
    } catch (e) {
      toast.error("erro: " + e);
    }
  }

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>erro</span>;
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="text-center">Produto</TableHead>
            <TableHead className="text-center">Quantidade</TableHead>
            <TableHead className="text-center">Unidade</TableHead>
            <TableHead className="text-center">Valor pago</TableHead>
            <TableHead className="text-center">Lote</TableHead>
            <TableHead className="text-center">Validade</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {stockProducts.length === 0 ? (
            <TableRow className="border-b">
              <TableCell colSpan={7} className="text-center py-6">
                Nenhum produto cadastrado
              </TableCell>
            </TableRow>
          ) : (
            stockProducts.map((stockProduct: StockProduct) => (
              <TableRow className="border-b" key={stockProduct.uuid}>
                <TableCell className="text-center">
                  {stockProduct.product.name}
                </TableCell>
                <TableCell className="text-center">
                  {stockProduct.quantity}
                </TableCell>
                <TableCell className="text-center">
                  {stockProduct.product.unit}
                </TableCell>
                <TableCell className="text-center">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(stockProduct.costPrice))}
                </TableCell>
                <TableCell className="text-center">
                  {stockProduct.lot || "-"}
                </TableCell>

                <TableCell className="text-center">
                  {formatDateBR(stockProduct.expiresAt)}
                </TableCell>
                <TableCell className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    className="bg-amber-300 text-gray-800 hover:bg-amber-200"
                    onClick={() => {
                      setOpenEditDialog(true);
                      setSelectedProduct(stockProduct);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(stockProduct.uuid)}
                  >
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <EditStockProductDialog
        handleIsOpen={handleEditDialogOpenChange}
        isOpen={openEditDialog}
        stockProduct={selectedProduct}
      />
    </>
  );
}

export default StockProductTable;
