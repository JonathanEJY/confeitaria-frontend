export type CreateStockProductDTO = {
  productId: string;
  quantity: number;
  stockId: string;
  costPrice: number;
  lot?: string;
  expiresAt?: Date;
};
