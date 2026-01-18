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

type ProductEditDialogProps = {
  isOpen: boolean;
};

function ProductEditDialog({ isOpen }: ProductEditDialogProps) {
  const [openEditDialog, setOpenEditDialog] = useState(isOpen);

  // const [selectedProductId, setSelectedProductId] = useState<string | null>(
  //   null,
  // );
  // const [productInfo, setProduct] = useState<Product | null>(null);
  // const [editName, setEditName] = useState("");
  // const [editUnit, setEditUnit] = useState("");

  return (
    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar produto</DialogTitle>
          <DialogDescription>
            Aqui você poderá editar as informações do produto.
          </DialogDescription>
        </DialogHeader>

        <p>Carregando...</p>
      </DialogContent>
    </Dialog>
  );
}

export default ProductEditDialog;
