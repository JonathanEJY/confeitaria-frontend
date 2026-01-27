import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductsApi, createProductApi, updateProductApi, deleteProductApi } from "./api/products.api";


export function useGetProducts(){
    return useQuery({
        queryKey: ["products"],
        queryFn: getProductsApi
    })
}

export function useCreateProduct(){
    return useMutation({
        mutationFn: createProductApi
    })
}

export function useUpdateProduct(){
    return useMutation({
        mutationFn: updateProductApi
    })
}

export function useDeleteProduct(){
    return useMutation({
        mutationFn: deleteProductApi
    })
}