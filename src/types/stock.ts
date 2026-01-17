import type { Product } from "@/types/product";

export type StockProduct = {
  uuid: string;
  quantity: number;
  lot: string;
  expiresAt: Date;
  costPrice: number;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  stockId: string;
  product: Product;
};

export type Stock = {
  uuid: string;
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
};
