import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProduct } from "../api/update-product";
import { productSchema, type ProductSchema } from "../schemas/product.schema";

export function useProductEditForm(product: ProductSchema) {
  const productEditMutation = useUpdateProduct();

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      unit: product.unit
    }
  });
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await productEditMutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  });
  return {
    register: form.register,
    handleSubmit: onSubmit,
    errors: form.formState.errors,
    isLoading: productEditMutation.isPending,
    error: productEditMutation.error,
    control: form.control
  };
}
