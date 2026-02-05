import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  productCreateSchema,
  type ProductCreateSchema,
} from "../schemas/product.schema";

export function useProductCreateForm() {
  const form = useForm<ProductCreateSchema>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
      name: "",
      unit: undefined,
    },
  });

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    control: form.control,
    setError: form.setError,
    reset: form.reset,
  };
}
