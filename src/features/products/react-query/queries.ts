import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "../api/products.api";
import { toast } from "react-toastify";

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto deletado com sucesso!");
    },
  });
}
