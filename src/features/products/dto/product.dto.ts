import type { Unit } from "@/types/product";

export type UpdateProductDTO = {
  uuid: string;
  name: string;
  unit: Unit;
};

export type CreateProductDTO = {
  name: string;
  unit: Unit;
};

export type DeleteProductDTO = {
  uuid: string;
};
