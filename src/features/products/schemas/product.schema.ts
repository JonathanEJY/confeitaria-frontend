import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  unit: z.enum(["un", "g", "kg", "ml", "L"]),
  uuid: z.string(),
});
export type ProductSchema = z.infer<typeof productSchema>;

export const productCreateSchema = z.object({
  name: z.string(),
  unit: z.enum(["un", "g", "kg", "ml", "L"]),
});
export type ProductCreateSchema = z.infer<typeof productCreateSchema>;

export const productDeleteSchema = z.object({
  uuid: z.string(),
});
export type ProductDeleteSchema = z.infer<typeof productDeleteSchema>;
