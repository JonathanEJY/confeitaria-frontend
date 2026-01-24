import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  unit: z.enum(["un", "g", "kg", "ml", "L"]),
  uuid: z.string(),
  id: z.number().optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;
