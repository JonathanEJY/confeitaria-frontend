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
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

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
    unit: string;
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

const productInsertSchema = z.object({
  selectedProductId: z.uuid(),
  quantity: z.number().min(0.01, "Quantidade deve ser maior que 0"),
  costPrice: z.number().min(0.01, "Valor deve ser maior que 0"),
  lot: z.string().optional().or(z.literal("")),
  expiresAt: z.date().optional(),
});

type ProductInsertSchema = z.infer<typeof productInsertSchema>;

export function ManageStock({ stock, products }: Props) {
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [selectedStockProductId, setSelectedStockProductId] =
    useState<string>("");
  const [editQuantity, setEditQuantity] = useState<string>("");
  const [editCostPrice, setEditCostPrice] = useState<string>("");
  const [editLot, setEditLot] = useState<string>("");
  const [editExpiresAt, setEditExpiresAt] = useState<string>("");

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  async function getProducts() {
    try {
      const { data } = await api.get("/stock/products", {
        params: { stockId: stock.uuid },
      });
      return data;
    } catch (error) {
      console.log("erro");
    }
  }

  const { reset, handleSubmit, control } = useForm<ProductInsertSchema>({
    defaultValues: {
      selectedProductId: "",
      quantity: undefined,
      costPrice: undefined,
      lot: "",
      expiresAt: undefined,
    },
    resolver: zodResolver(productInsertSchema),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  async function insertStockProduct(data: any) {
    console.log(data);
    reset();
  }

  async function handleUpdateStockProduct(stockProductId: string) {
    try {
      const stockProduct = stockProducts.find(
        (sp) => sp.uuid === stockProductId
      );

      if (!stockProduct) {
        toast.error("Produto não encontrado");
        return;
      }

      setSelectedStockProductId(stockProductId);
      setEditQuantity(stockProduct.quantity.toString());
      setEditCostPrice((stockProduct.costPrice / 100).toFixed(2));
      setEditLot(stockProduct.lot || "");
      setEditExpiresAt(
        stockProduct.expiresAt
          ? new Date(stockProduct.expiresAt).toISOString().split("T")[0]
          : ""
      );

      setOpenEditDialog(true);
    } catch (error) {
      toast.error("Erro ao buscar informações do produto");
    }
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();

    if (!editQuantity || !editCostPrice) {
      toast.error("Quantidade e Valor pago são obrigatórios");
      return;
    }

    try {
      const data: any = {
        stockProductId: selectedStockProductId,
        quantity: parseFloat(editQuantity),
        costPrice: Math.round(parseFloat(editCostPrice) * 100),
      };

      if (editLot.trim()) {
        data.lot = editLot.trim();
      }

      if (editExpiresAt) {
        data.expiresAt = new Date(editExpiresAt).toISOString();
      }

      setStockProducts((prev) =>
        prev.map((sp) =>
          sp.uuid === selectedStockProductId
            ? {
                ...sp,
                quantity: parseFloat(editQuantity),
                costPrice: Math.round(parseFloat(editCostPrice) * 100),
                lot: editLot.trim() || sp.lot,
                expiresAt: editExpiresAt
                  ? new Date(editExpiresAt)
                  : sp.expiresAt,
                updatedAt: new Date(),
              }
            : sp
        )
      );

      setOpenEditDialog(false);

      await api.patch("/stock/products", data);

      toast.success("Produto atualizado com sucesso!", {
        autoClose: 1500,
      });
    } catch (error) {
      toast.error("Erro ao atualizar produto");
    }
  }

  async function deleteStockProduct(stockProductId: string) {
    const confirm = window.confirm("Deseja realmente deletar este produto?");

    if (!confirm) return;

    try {
      // Atualização otimista: remove do estado local primeiro
      setStockProducts((prev) =>
        prev.filter((sp) => sp.uuid !== stockProductId)
      );

      // Faz a requisição ao backend
      await api.delete("/stock/products", {
        data: {
          stockProductId,
        },
      });

      toast.success("Produto deletado com sucesso");
    } catch (error) {
      toast.error("Erro ao deletar o produto");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Estoque</h1>
          <p className="text-muted-foreground">{stock.name}</p>
        </div>
        <Link to={"/dashboard"}>
          <Button className="mb-4">Página inicial</Button>
        </Link>

        <form
          onSubmit={handleSubmit(insertStockProduct)}
          className="flex flex-wrap gap-3 items-end"
        >
          <div>
            <Label className="text-sm font-medium mb-1 block">
              Produto <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="selectedProductId"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
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
              )}
            />
          </div>
          <div>
            <Label className="text-sm font-medium mb-1 block">
              Quantidade <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="0"
                  className="w-35"
                  step="0.01"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const val = e.target.valueAsNumber;
                    field.onChange(isNaN(val) ? undefined : val);
                  }}
                />
              )}
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">
              Valor pago (R$) <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="costPrice"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="0.00"
                  className="w-40"
                  step="0.01"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const val = e.target.valueAsNumber;
                    field.onChange(isNaN(val) ? undefined : val);
                  }}
                />
              )}
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">Lote</Label>
            <Controller
              name="lot"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Opcional"
                  className="w-35"
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">Validade</Label>
            <Controller
              name="expiresAt"
              control={control}
              render={({ field }) => (
                <Input
                  type="date"
                  className="w-40"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              )}
            />
          </div>
          <Button type="submit">Adicionar</Button>
        </form>

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
            {data.length === 0 ? (
              <TableRow className="border-b">
                <TableCell colSpan={7} className="text-center py-6">
                  Nenhum produto cadastrado
                </TableCell>
              </TableRow>
            ) : (
              data.map((stockProduct: StockProduct) => (
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
                      ? new Date(stockProduct.expiresAt).toLocaleDateString(
                          "pt-BR"
                        )
                      : "-"}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      className="bg-amber-300 text-gray-800 hover:bg-amber-200"
                      onClick={() =>
                        handleUpdateStockProduct(stockProduct.uuid)
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteStockProduct(stockProduct.uuid)}
                    >
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar produto do estoque</DialogTitle>
              <DialogDescription>
                Aqui você poderá editar as informações do produto no estoque.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <Label htmlFor="editQuantity">
                  Quantidade <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="editQuantity"
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(e.target.value)}
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
                  value={editCostPrice}
                  onChange={(e) => setEditCostPrice(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <Label htmlFor="editLot">Lote</Label>
                <Input
                  id="editLot"
                  type="text"
                  value={editLot}
                  onChange={(e) => setEditLot(e.target.value)}
                  placeholder="Opcional"
                />
              </div>

              <div>
                <Label htmlFor="editExpiresAt">Validade</Label>
                <Input
                  id="editExpiresAt"
                  type="date"
                  value={editExpiresAt}
                  onChange={(e) => setEditExpiresAt(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Salvar alterações
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenEditDialog(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
