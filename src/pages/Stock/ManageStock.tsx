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
  id?: number;
  name: string;
};

type StockProduct = {
  uuid: string;
  quantity: number;
  lot: string;
  expiresAt: Date;
  costPrice: number;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  stockId: string;
  product: {
    id: number;
    name: string;
  };
};

type Stock = {
  uuid: string;
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  stock: Stock;
  products: Product[];
};

export function ManageStock({ stock, products }: Props) {
  const [stockProducts, setStockProducts] = useState<StockProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [costPrice, setCostPrice] = useState<string>("");
  const [lot, setLot] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string>("");

  async function loadProducts() {
    try {
      const response = await api.get("/stock/products", {
        params: { stockId: stock.uuid },
      });
      setStockProducts(response.data);
    } catch (error) {
      alert("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }

  async function insertStockProduct(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedProductId || !quantity || !costPrice) {
      alert(
        "Preencha os campos obrigatórios: Produto, Quantidade e Valor pago"
      );
      return;
    }

    try {
      setLoading(true);

      const data: any = {
        productId: selectedProductId,
        stockId: stock.uuid,
        quantity: parseInt(quantity),
        costPrice: Math.round(parseFloat(costPrice) * 100), // Converte para centavos
      };

      if (lot.trim()) {
        data.lot = lot.trim();
      }

      if (expiresAt) {
        data.expiresAt = new Date(expiresAt).toISOString();
      }

      await api.post("/stock/products", data);

      setSelectedProductId("");
      setQuantity("");
      setCostPrice("");
      setLot("");
      setExpiresAt("");

      await loadProducts();

      alert("Produto adicionado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar produto");
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
          <p className="text-muted-foreground">{stock.name}</p>
        </div>

        <form
          onSubmit={insertStockProduct}
          className="flex flex-wrap gap-3 items-end"
        >
          <div>
            <label className="text-sm font-medium mb-1 block">
              Produto <span className="text-red-500">*</span>
            </label>
            <Select
              value={selectedProductId}
              onValueChange={setSelectedProductId}
            >
              <SelectTrigger className="w-55">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.uuid} value={product.uuid}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Quantidade <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              placeholder="0"
              className="w-35"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Valor pago (R$) <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              placeholder="0.00"
              className="w-40"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Lote</label>
            <Input
              type="text"
              placeholder="Opcional"
              className="w-35"
              value={lot}
              onChange={(e) => setLot(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Validade</label>
            <Input
              type="date"
              className="w-40"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Adicionando..." : "Adicionar"}
          </Button>
        </form>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Produto</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Valor pago</TableHead>
              <TableHead>Lote</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow className="border-b">
                <TableCell colSpan={6} className="text-center py-6">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : stockProducts.length === 0 ? (
              <TableRow className="border-b">
                <TableCell colSpan={6} className="text-center py-6">
                  Nenhum produto cadastrado
                </TableCell>
              </TableRow>
            ) : (
              stockProducts.map((stockProduct) => (
                <TableRow className="border-b" key={stockProduct.uuid}>
                  <TableCell>{stockProduct.product.name}</TableCell>
                  <TableCell>{stockProduct.quantity}</TableCell>
                  <TableCell>
                    R$ {(stockProduct.costPrice / 100).toFixed(2)}
                  </TableCell>
                  <TableCell>{stockProduct.lot || "-"}</TableCell>
                  <TableCell>
                    {stockProduct.expiresAt
                      ? new Date(stockProduct.expiresAt).toLocaleDateString(
                          "pt-BR"
                        )
                      : "-"}
                  </TableCell>
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
