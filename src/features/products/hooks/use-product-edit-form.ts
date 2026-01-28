import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductSchema } from "../schemas/product.schema";

export function useProductEditForm(product: ProductSchema) {
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      unit: product.unit ?? "un",
      uuid: product.uuid,
    },
  });

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    control: form.control,
  };
}
