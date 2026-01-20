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
import type { Product } from "@/types/product";
import ProductEditForm from "./ProductEditForm";

type ProductEditDialogProps = {
  isOpen: boolean;
  handleIsOpen: (isOpen: boolean) => void;
  product: Product | null;
};

function ProductEditDialog({
  isOpen,
  handleIsOpen,
  product,
}: ProductEditDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={handleIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar produto</DialogTitle>
          <DialogDescription>
            Aqui você poderá editar as informações do produto.
          </DialogDescription>
        </DialogHeader>
        {product ? <ProductEditForm /> : <p>Nada para ser exibido aqui</p>}
      </DialogContent>
    </Dialog>
  );
}

export default ProductEditDialog;
