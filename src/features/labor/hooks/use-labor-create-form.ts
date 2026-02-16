import { useForm } from "react-hook-form";
import {
  createLaborSchema,
  type CreateLaborSchema,
} from "../schemas/labor.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useLaborCreateForm() {
  const form = useForm<CreateLaborSchema>({
    resolver: zodResolver(createLaborSchema),
  });

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
  };
}
