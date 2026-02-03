import Header from "@/components/layout/Header";
import CreateStockProductForm from "@/features/stockProducts/components/CreateStockProductForm";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import StockProductTable from "@/features/stockProducts/components/StockProductTable";
import { useGetStock } from "@/features/stock/react-query/queries";

export function ManageStock() {
  useDocumentTitle("Estoque - StockStock");
  const { data: stock } = useGetStock();

  // async function getProducts(): Promise<StockProduct[]> {
  //   const { data } = await api.get("/stock/products", {
  //     params: { stockId: stock.uuid },
  //   });
  //   return data;
  // }

  // const { data, isPending, isError, error } = useQuery({
  //   queryKey: ["stock-products", stock.uuid],
  //   queryFn: getProducts,
  // });

  // async function insertStockProduct(formData: ProductInsertSchema) {
  //   try {
  //     await api.post("/stock/products", {
  //       ...formData,
  //       stockId: stock.uuid,
  //       costPrice: Math.round(formData.costPrice * 100),
  //     });

  //     toast.success("Produto adicionado com sucesso");
  //     reset();

  //     const updated = await getProducts();
  //     setStockProducts(updated);
  //   } catch {
  //     toast.error("Erro ao adicionar produto");
  //   }
  // }

  // function handleUpdateStockProduct(stockProductId: string) {
  //   const stockProduct = stockProducts.find((sp) => sp.uuid === stockProductId);

  //   if (!stockProduct) {
  //     toast.error("Produto não encontrado");
  //     return;
  //   }

  //   setSelectedStockProductId(stockProductId);
  //   setEditQuantity(stockProduct.quantity.toString());
  //   setEditCostPrice((stockProduct.costPrice / 100).toFixed(2));
  //   setEditLot(stockProduct.lot || "");
  //   setEditExpiresAt(
  //     stockProduct.expiresAt
  //       ? new Date(stockProduct.expiresAt).toISOString().split("T")[0]
  //       : "",
  //   );

  //   setOpenEditDialog(true);
  // }

  // async function handleSaveEdit(e: React.FormEvent) {
  //   e.preventDefault();

  //   try {
  //     await api.patch("/stock/products", {
  //       stockProductId: selectedStockProductId,
  //       quantity: Number(editQuantity),
  //       costPrice: Math.round(Number(editCostPrice) * 100),
  //       lot: editLot || undefined,
  //       expiresAt: editExpiresAt
  //         ? new Date(editExpiresAt).toISOString()
  //         : undefined,
  //     });

  //     setStockProducts((prev) =>
  //       prev.map((sp) =>
  //         sp.uuid === selectedStockProductId
  //           ? {
  //               ...sp,
  //               quantity: Number(editQuantity),
  //               costPrice: Math.round(Number(editCostPrice) * 100),
  //               lot: editLot,
  //               expiresAt: editExpiresAt ? new Date(editExpiresAt) : null,
  //               updatedAt: new Date(),
  //             }
  //           : sp,
  //       ),
  //     );

  //     setOpenEditDialog(false);
  //     toast.success("Produto atualizado com sucesso");
  //   } catch {
  //     toast.error("Erro ao atualizar produto");
  //   }
  // }

  // async function deleteStockProduct(stockProductId: string) {
  //   if (!window.confirm("Deseja realmente deletar este produto?")) return;

  //   try {
  //     setStockProducts((prev) =>
  //       prev.filter((sp) => sp.uuid !== stockProductId),
  //     );

  //     await api.delete("/stock/products", {
  //       data: { stockProductId },
  //     });

  //     toast.success("Produto deletado com sucesso");
  //   } catch {
  //     toast.error("Erro ao deletar produto");
  //   }
  // }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <Header title="Estoque" subtitle={stock.name} />

        <CreateStockProductForm />

        <StockProductTable />
      </div>
    </div>
  );
}
