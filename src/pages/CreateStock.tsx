import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import type { CreateStockDTO } from "@/features/stock/dto/stock.dto";
import useStockCreateForm from "@/features/stock/hooks/use-stock-create-form";
import { useCreateStock } from "@/features/stock/react-query/queries";
import { toast } from "react-toastify";

export function CreateStock() {
  const { register, handleSubmit, errors } = useStockCreateForm();
  const { mutate, isPending } = useCreateStock();

  async function onSubmit(data: CreateStockDTO) {
    try {
      mutate(data);
    } catch (error) {
      toast.error(`Erro ao criar estoque: ${errors} e ${error}`);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Criar estoque</CardTitle>
          <CardDescription>
            Você ainda não possui um estoque ativo
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="Escolha o nome do estoque"
              {...register("name")}
            />

            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Carregando..." : "Criar estoque"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
