// # Hook do formulário
import { zodResolver } from "@hookform/resolvers/zod";
import { useProducts } from "../api/get-products";
import { useForm } from "react-hook-form";
import { productSchema, type ProductSchema } from "../schemas/product.schema";

export function useProduct() {}
