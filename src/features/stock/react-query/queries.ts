import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStockApi, createStockApi } from "../api/stock.api";
import { toast } from "react-toastify";

export function useGetStock() {
  return useQuery({
    queryKey: ["stocks"],
    queryFn: getStockApi,
    retry: false,
  });
}

export function useCreateStock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStockApi,
    onSuccess: () => {
      toast.success("Estoque criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
    },
  });
}
