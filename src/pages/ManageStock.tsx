import Header from "@/components/layout/Header";
import CreateStockProductForm from "@/features/stockProducts/components/CreateStockProductForm";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import StockProductTable from "@/features/stockProducts/components/StockProductTable";
import { useGetStock } from "@/features/stock/react-query/queries";

export function ManageStock() {
  useDocumentTitle("Estoque - StockStock");
  const { data: stock } = useGetStock();

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
