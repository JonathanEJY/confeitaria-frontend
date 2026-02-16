import { api } from "@/lib/api";
import type { CreateLaborDTO } from "../dto/labor.dto";
import type { Labor } from "@/types/labor";

export async function getLaborApi() {
  const { data } = await api.get<Labor>("/users/labor");
  return data;
}

export async function createLaborApi(newLabor: CreateLaborDTO) {
  const data = await api.post("/users/labor", newLabor);
  return data;
}
