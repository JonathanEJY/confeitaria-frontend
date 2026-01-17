export type Product = {
  uuid: string;
  name: string;
  unit: Unit;
  id?: number;
};

export type Unit = "kg" | "g" | "L" | "ml" | "un";
