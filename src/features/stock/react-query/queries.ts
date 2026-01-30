import { useQuery } from "@tanstack/react-query";
import { getStockApi } from "../api/stock.api";

export function useGetStock() {
  return useQuery({
    queryKey: ["stocks"],
    queryFn: getStockApi,
  });
}
