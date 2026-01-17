import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function ProductEditDialog() {
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // const [selectedProductId, setSelectedProductId] = useState<string | null>(
  //   null,
  // );
  // const [productInfo, setProduct] = useState<Product | null>(null);
  // const [editName, setEditName] = useState("");
  // const [editUnit, setEditUnit] = useState("");

  return (
    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
      {/* <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar produto</DialogTitle>
          <DialogDescription>
            Aqui você poderá editar as informações do produto.
          </DialogDescription>
        </DialogHeader>

        {productInfo ? (
          <form className="space-y-4">
            <div>
              <Label htmlFor="editName">Nome do produto</Label>
              <Input id="editName" placeholder="Nome do produto" />
            </div>

            <div>
              <Label htmlFor="editUnit">Unidade</Label>
              <Select>
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
      </DialogContent> */}
    </Dialog>
  );
}

export default ProductEditDialog;
