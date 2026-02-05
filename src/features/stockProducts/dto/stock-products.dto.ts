export type CreateStockProductDTO = {
  productId: string;
  quantity: number;
  stockId: string;
  costPrice: number;
  lot?: string;
  expiresAt?: string;
};

export type UpdateStockProductDTO = {
  stockProductId: string;
  productId: string;
  quantity: number;
  stockId: string;
  costPrice: number;
  lot?: string;
  expiresAt?: string;
};
