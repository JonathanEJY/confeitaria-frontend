// # useMutation para editar
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import type { Product } from "@/types/product";

async function updateProduct() {
  const { data } = await api.patch("/users/product");
  return data;
}
