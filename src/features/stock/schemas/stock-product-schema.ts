import { z } from "zod";

const stockProductSchema = z.object({
  selectedProductId: z.uuid(),
  quantity: z.number().min(0.01, "Quantidade deve ser maior que 0"),
  costPrice: z.number().min(0.01, "Valor deve ser maior que 0"),
  lot: z.string().optional().or(z.literal("")),
  expiresAt: z.date().optional(),
});

export type ProductInsertSchema = z.infer<typeof stockProductSchema>;
