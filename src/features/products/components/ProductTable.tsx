import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import ProductEditDialog from "./ProductEditDialog";
import { useState } from "react";

type ProductTableProps = {
  products: Product[];
};

function ProductTable({ products }: ProductTableProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  return (
    <>
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
                      onClick={() => setOpenEditDialog(true)}
                    >
                      Editar
                    </Button>

                    <Button size="sm" variant={"destructive"}>
                      Deletar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <ProductEditDialog isOpen={openEditDialog} />
    </>
  );
}

export default ProductTable;
