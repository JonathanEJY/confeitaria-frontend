import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type StockProductCreateSchema,
  stockProductCreateSchema,
} from "../schemas/stock-product.schema";
import { useGetStock } from "@/features/stock/react-query/queries";

export default function useStockProductCreateForm() {
  const { data: stock } = useGetStock();

  const form = useForm<StockProductCreateSchema>({
    resolver: zodResolver(stockProductCreateSchema),
    defaultValues: {
      productId: undefined,
      quantity: undefined,
      costPrice: undefined,
      lot: "",
      expiresAt: undefined,
      stockId: stock?.uuid ?? "",
    },
  });
  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    reset: form.reset,
    control: form.control,
  };
}
