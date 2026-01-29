import { api } from "@/lib/api";
import type { Stock } from "@/types/stock";

export async function getProductsApi() {
  const { data } = await api.get("/stock/products");
  return data;
}

export async function createProductApi(newStock: Stock) {
  const { data } = await api.post("/stock/products", newStock);
  return data;
}

export async function updateProductApi(stock: Stock) {
  const { data } = await api.patch("/stock/products", stock);
  return data;
}

export async function deleteProductApi(uuid: string) {
  const { data } = await api.delete("/stock/products", {
    data: { stockProductId: uuid },
  });
  return data;
}
