import { useForm } from "react-hook-form";
import {
  createStockSchema,
  type CreateStockSchema,
} from "../schemas/stock-product-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useStockCreateForm() {
  const form = useForm<CreateStockSchema>({
    resolver: zodResolver(createStockSchema),
  });

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
  };
}
