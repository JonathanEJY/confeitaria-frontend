import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getStockProductsApi,
  createStockProductsApi,
  updateStockProductsApi,
  deleteStockProductApi,
} from "../api/stock-product.api";

export function useGetStockProducts(stockUUID: string) {
  return useQuery({
    queryKey: ["stockProducts", stockUUID],
    queryFn: () => getStockProductsApi(stockUUID),
  });
}

export function useCreateStockProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStockProductsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stockProducts"] });
    },
  });
}

export function useUpdateStockProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStockProductsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stockProducts"] });
    },
  });
}

export function useDeleteStockProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStockProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stockProducts"] });
    },
  });
}
