import type { Product } from "@/types/product";

export type StockProduct = {
  uuid: string;
  quantity: number;
  stockId: string;
  costPrice: number;
  lot?: string | undefined;
  expiresAt?: string;
  createdAt?: Date;
  updatedAt?: Date;
  product: Product;
};

export type Stock = {
  uuid: string;
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
};
