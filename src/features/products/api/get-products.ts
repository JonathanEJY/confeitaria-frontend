import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Product } from "@/types/product";

async function fetchProducts(): Promise<Product[]> {
  const { data } = await api.get("/products");
  return data;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
