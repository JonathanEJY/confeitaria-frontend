import { z } from "zod";

export const stockProductCreateSchema = z.object({
  productId: z.uuid(),
  quantity: z.number(),
  stockId: z.string(),
  costPrice: z.number(),
  expiresAt: z.date().optional(),
  lot: z.string().optional(),
});
export type StockProductCreateSchema = z.infer<typeof stockProductCreateSchema>;
