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
import {
  useDeleteStockProduct,
  useGetStockProducts,
} from "@/features/stockProducts/react-query/queries";
import { toast } from "react-toastify";

function StockProductTable() {
  const { data: stock } = useGetStock();
  const {
    data: stockProducts,
    isPending,
    isError,
  } = useGetStockProducts(stock.uuid);

  const { mutate } = useDeleteStockProduct();

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
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead>Produto</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Unidade</TableHead>
          <TableHead>Valor pago</TableHead>
          <TableHead>Lote</TableHead>
          <TableHead>Validade</TableHead>
          <TableHead className="text-right">Ações</TableHead>
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
              <TableCell>{stockProduct.product.name}</TableCell>
              <TableCell>{stockProduct.quantity}</TableCell>
              <TableCell>{stockProduct.product.unit}</TableCell>
              <TableCell>
                R$ {(stockProduct.costPrice / 100).toFixed(2)}
              </TableCell>
              <TableCell>{stockProduct.lot || "-"}</TableCell>
              <TableCell>
                {stockProduct.expiresAt
                  ? new Date(stockProduct.expiresAt).toLocaleDateString("pt-BR")
                  : "-"}
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button
                  size="sm"
                  className="bg-amber-300 text-gray-800 hover:bg-amber-200"
                  // onClick={() =>
                  //   handleUpdateStockProduct(stockProduct.uuid)
                  // }
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
  );
}

export default StockProductTable;
