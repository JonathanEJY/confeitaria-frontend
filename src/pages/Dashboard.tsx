import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useGetProducts } from "@/features/products/react-query/queries";
import { Package, Boxes } from "lucide-react";
import { useGetStockProducts } from "@/features/stockProducts/react-query/queries";
import { useGetStock } from "@/features/stock/react-query/queries";
import { Skeleton } from "@/components/ui/skeleton";

function Dashboard() {
  const { user } = useAuth();
  const { data: products = [] } = useGetProducts();
  const { data: stock = "" } = useGetStock();
  const { data: stockProducts = [], isLoading } = useGetStockProducts(
    stock.uuid,
  );

  useDocumentTitle("Dashboard - StockStock");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          Olá{user?.username ? `, ${user.username}` : ""} 👋
        </h2>
        <p className="text-muted-foreground mt-2">
          Aqui está o resumo do seu estoque
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-20 mb-4" />
                <Skeleton className="h-4 w-20" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{products.length}</div>
                <p className="text-xs text-muted-foreground">
                  itens em estoque
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Estoque</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-20 mb-4" />
                <Skeleton className="h-4 w-20" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{stockProducts.length}</div>
                <p className="text-xs text-muted-foreground">
                  itens em estoque
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
