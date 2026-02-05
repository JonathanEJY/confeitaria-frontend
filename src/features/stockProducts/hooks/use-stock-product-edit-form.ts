import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type StockProductEditSchema,
  stockProductEditSchema,
} from "../schemas/stock-product.schema";
import { useGetStock } from "@/features/stock/react-query/queries";
import type { StockProduct } from "@/types/stock";
import toDateInputValue from "@/helper/toDateInputValue";

export default function useStockProductEditForm(stockProduct: StockProduct) {
  const { data: stock } = useGetStock();

  const form = useForm<StockProductEditSchema>({
    resolver: zodResolver(stockProductEditSchema),
    defaultValues: {
      stockId: stock?.uuid ?? "",
      productId: stockProduct.product.uuid,
      quantity: stockProduct.quantity,
      costPrice: stockProduct.costPrice,
      expiresAt: toDateInputValue(stockProduct.expiresAt),
      lot: stockProduct?.lot ?? "",
      stockProductId: stockProduct.uuid, // 👍 correto
    },
  });

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    control: form.control,
  };
}
