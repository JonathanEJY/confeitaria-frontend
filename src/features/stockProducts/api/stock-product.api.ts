import { api } from "@/lib/api";
import type { CreateStockProductDTO } from "../dto/stock-products.dto";

export async function getStockProductsApi(stockId: string) {
  const { data } = await api.get("/stock/products", {
    params: { stockId },
  });
  return data;
}

export async function createStockProductsApi(
  newProduct: CreateStockProductDTO,
) {
  const { data } = await api.post("/stock/products", newProduct);
  return data;
}

export async function updateStockProductsApi(
  updateProduct: CreateStockProductDTO,
) {
  const { data } = await api.patch("/stock/products", updateProduct);
  return data;
}

export async function deleteStockProductApi(stockProductId: string) {
  const { data } = await api.delete("/stock/products", {
    data: { stockProductId },
  });
  return data;
}
