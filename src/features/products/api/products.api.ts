import { api } from "@/lib/api";
import type { Product } from "@/types/product";

export async function getProductsApi(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/users/products");
  return data;
}

export async function createProductApi(newProduct: Product): Promise<Product> {
  const { data } = await api.post<Product>("/users/products", newProduct);
  return data;
}

export async function updateProductApi(product: Product): Promise<Product>{
  const {data} = await api.patch<Product>("/users/products", product)
  return data
}

export async function deleteProductApi(product: Product) {
  const {data} = await api.delete<Product>("/users/products", {data:product})
  return data
}
