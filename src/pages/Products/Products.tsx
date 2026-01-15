import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../hooks/useAuth";
import "./Product.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Product = {
  uuid: string;
  name: string;
  unit: string;
};

function Products() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [productInfo, setProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState("");
  const [editUnit, setEditUnit] = useState("");

  async function loadProducts() {
    try {
      const response = await api.get("/users/products");
      setProducts(response.data);
    } catch (error) {
      alert("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();

    if (!name) {
      alert("Nome é obrigatório");
      return;
    }

    try {
      await api.post("/users/product", {
        name,
        unit,
        user,
      });

      toast.success("Produto adicionado com sucesso!", {
        autoClose: 1500,
      });
      setName("");
      setUnit("un");
      toast.update;
      await loadProducts();
    } catch (error) {
      alert("Erro ao criar produto");
    }
  }

  async function handleDeleteProduct(productId: string) {
    const confirm = window.confirm("Deseja realmente deletar este produto?");

    if (!confirm) return;

    try {
      await api.delete(`/users/product`, {
        data: {
          productId,
        },
      });
      toast.success("Produto deletado com sucesso!", {
        autoClose: 1500,
      });
      await loadProducts();
    } catch (error) {
      toast.error("Erro ao deletar o produto", {
        isLoading: false,
        autoClose: 1500,
      });
    }
  }

  async function handleUpdateProduct(productId: string) {
    try {
      const getProductInfo = await api.get("/users/product", {
        params: {
          productId: productId,
        },
      });
      const product = getProductInfo.data[0];
      setProduct(product);

      setEditName(product.name);
      setEditUnit(product.unit);
    } catch (error) {
      toast.error("Erro ao buscar informações do produto");
      return;
    }
    setSelectedProductId(productId);
    setOpenEditDialog(true);
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();

    if (!editName) {
      toast.error("Nome é obrigatório");
      return;
    }

    try {
      await api.patch("/users/product", {
        uuid: selectedProductId,
        name: editName,
        unit: editUnit,
      });

      toast.success("Produto atualizado com sucesso!", {
        autoClose: 1500,
      });

      setOpenEditDialog(false);
      await loadProducts();
    } catch (error) {
      toast.error("Erro ao atualizar produto");
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Meus Produtos</h1>

        <p className="text-muted-foreground">
          Cadastre seus produtos nessa página!
        </p>

        <Link to={"/dashboard"}>
          <Button className="mb-4">Página inicial</Button>
        </Link>

        <form
          className="flex flex-wrap gap-3 items-center"
          onSubmit={handleCreateProduct}
        >
          <div className="flex w-full gap-5">
            <Input
              className=""
              type="text"
              placeholder="Nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="un">Unidade</SelectItem>
                <SelectItem value="g">Gramas</SelectItem>
                <SelectItem value="kg">KG</SelectItem>
                <SelectItem value="ml">ml</SelectItem>
                <SelectItem value="L">Litros</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit">Adicionar</Button>
          </div>
        </form>

        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-[40%]">Nome</TableHead>
              <TableHead className="w-[40%]">Unidade</TableHead>
              <TableHead className="w-[20%] text-right">Opções</TableHead>
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
              products.map((product) => (
                <TableRow
                  key={product.uuid}
                  className="border-b hover:bg-muted/50 transition"
                >
                  <TableCell className="text-lg">{product.name}</TableCell>
                  <TableCell className="text-lg">{product.unit}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="bg-amber-300 text-gray-800 hover:bg-amber-200"
                        onClick={() => handleUpdateProduct(product.uuid)}
                      >
                        Editar
                      </Button>

                      <Button
                        size="sm"
                        variant={"destructive"}
                        onClick={() => handleDeleteProduct(product.uuid)}
                      >
                        Deletar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar produto</DialogTitle>
              <DialogDescription>
                Aqui você poderá editar as informações do produto.
              </DialogDescription>
            </DialogHeader>

            {productInfo ? (
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <Label htmlFor="editName">Nome do produto</Label>
                  <Input
                    id="editName"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Nome do produto"
                  />
                </div>

                <div>
                  <Label htmlFor="editUnit">Unidade</Label>
                  <Select value={editUnit} onValueChange={setEditUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="un">Unidade</SelectItem>
                      <SelectItem value="g">Gramas</SelectItem>
                      <SelectItem value="kg">KG</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="L">Litros</SelectItem>
                    </SelectContent>
                  </Select>
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
            ) : (
              <p>Carregando...</p>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Products;
