import { api } from "@/lib/api";
import type { Stock } from "@/types/stock";
import type { CreateStockDTO } from "../dto/stock.dto";

export async function getStockApi() {
  const { data } = await api.get("/users/stock");
  return data;
}

export async function createStockApi(newStock: CreateStockDTO) {
  const { data } = await api.post("/users/stock", newStock);
  return data;
}

export async function updateStockpi(stock: Stock) {
  const { data } = await api.patch("/users/stock", stock);
  return data;
}

export async function deleteStockApi(uuid: string) {
  const { data } = await api.delete("/users/stock", {
    data: { stockProductId: uuid },
  });
  return data;
}
