import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import type { Product } from "@/types/product";

async function updateProduct(product: Product): Promise<Product> {
  const { data } = await api.patch("/users/product", product);
  return data;
}

export function useUpdateProduct() {
  return useMutation({
    mutationFn: updateProduct,
  });
}
