import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Product } from "@/types/product";
import ProductEditForm from "./ProductEditForm";

type ProductEditDialogProps = {
  isOpen: boolean;
  handleIsOpen: (isOpen: boolean) => void;
  product: Product | null;
};

// async function handleUpdateProduct(productId: string) {
//   try {
//     const getProductInfo = await api.get("/users/product", {
//       params: {
//         productId: productId,
//       },
//     });
//     const product = getProductInfo.data[0];
//     setProduct(product);

//     setEditName(product.name);
//     setEditUnit(product.unit);
//   } catch (error) {
//     toast.error("Erro ao buscar informações do produto");
//     return;
//   }
//   setSelectedProductId(productId);
//   setOpenEditDialog(true);
// }

// async function handleSaveEdit(e: React.FormEvent) {
//   e.preventDefault();

//   if (!editName) {
//     toast.error("Nome é obrigatório");
//     return;
//   }

//   try {
//     await api.patch("/users/product", {
//       uuid: selectedProductId,
//       name: editName,
//       unit: editUnit,
//     });

//     toast.success("Produto atualizado com sucesso!", {
//       autoClose: 1500,
//     });

//     setOpenEditDialog(false);
//     await loadProducts();
//   } catch (error) {
//     toast.error("Erro ao atualizar produto");
//   }
// }

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
        {product ? (
          <ProductEditForm product={product} />
        ) : (
          <p>Nada para ser exibido aqui</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ProductEditDialog;
