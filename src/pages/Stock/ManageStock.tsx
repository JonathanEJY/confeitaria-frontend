import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Product = {
  uuid: string;
  name: string;
};

type Props = {
  stockName: string;
  products: Product[];
};

export function ManageStock({ stockName, products }: Props) {
  const [stockProducts, setStockProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      const response = await api.get("/stock/products");
      setStockProducts(response.data);
    } catch (error) {
      alert("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Estoque</h1>
          <p className="text-muted-foreground">{stockName}</p>
        </div>

        <form className="flex flex-wrap gap-3 items-end">
          <Select>
            <SelectTrigger className="w-55">
              <SelectValue placeholder="Produto" />
            </SelectTrigger>
            <SelectContent>
              {products.map((p) => (
                <SelectItem key={p.uuid} value={p.uuid}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input type="number" placeholder="Quantidade" className="w-35" />

          <Input type="number" placeholder="Valor pago" className="w-40" />

          <Button>Adicionar</Button>
        </form>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Produto</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Valor pago</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.length === 0 ? (
              <TableRow className="border-b">
                <TableCell colSpan={3} className="text-center py-6">
                  Nenhum produto cadastrado
                </TableCell>
              </TableRow>
            ) : (
              stockProducts.map((product) => (
                <TableRow className="border-b" key={product.uuid}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{1}</TableCell>
                  <TableCell>{2}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="destructive">
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
