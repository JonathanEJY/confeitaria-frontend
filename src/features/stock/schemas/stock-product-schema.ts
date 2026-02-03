import { z } from "zod";

// const stockSchema = z.object({});

// export type StockSchema = z.infer<typeof stockSchema>;

export const createStockSchema = z.object({
  name: z.string(),
});
export type CreateStockSchema = z.infer<typeof createStockSchema>;
