import { api } from "@/lib/api";
import type { Product } from "@/types/product";
import type { CreateProductDTO } from "../dto/product.dto";

export async function getProductsApi() {
  const { data } = await api.get("/users/products");
  return data;
}

export async function createProductApi(newProduct: CreateProductDTO) {
  const { data } = await api.post("/users/product", newProduct);
  return data;
}

export async function updateProductApi(product: Product) {
  const { data } = await api.patch("/users/product", product);
  return data;
}

export async function deleteProductApi(uuid: string) {
  console.log(uuid);
  const { data } = await api.delete("/users/product", {
    data: { productId: uuid },
  });
  return data;
}
