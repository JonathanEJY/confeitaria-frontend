import { z } from "zod";

export const stockProductCreateSchema = z.object({
  productId: z.uuid(),
  quantity: z.number(),
  stockId: z.string(),
  costPrice: z.number(),
  expiresAt: z.string().optional(),
  lot: z.string().optional(),
});
export type StockProductCreateSchema = z.infer<typeof stockProductCreateSchema>;

export const stockProductEditSchema = z.object({
  productId: z.uuid(),
  quantity: z.number(),
  stockId: z.string(),
  costPrice: z.number(),
  expiresAt: z.string().optional(),
  lot: z.string().optional(),
  stockProductId: z.uuid(),
});
export type StockProductEditSchema = z.infer<typeof stockProductEditSchema>;
