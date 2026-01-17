import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  unit: z.string(),
  uuid: z.string(),
  id: z.string().optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;
