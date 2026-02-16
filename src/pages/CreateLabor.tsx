import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import type { CreateLaborDTO } from "@/features/labor/dto/labor.dto";
import useLaborCreateForm from "@/features/labor/hooks/use-labor-create-form";
import { useCreateLabor } from "@/features/labor/react-query/queries";
import { toast } from "react-toastify";

export function CreateLabor() {
  const { register, handleSubmit, errors } = useLaborCreateForm();
  const { mutate, isPending } = useCreateLabor();

  async function onSubmit(data: CreateLaborDTO) {
    try {
      mutate(data);
    } catch (error) {
      toast.error(`Erro ao criar labor: ${errors} e ${error}`);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Criar labor</CardTitle>
          <CardDescription>
            Informe os custos e dados de trabalho
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="number"
              placeholder="Salário desejado"
              {...register("desiredSalary", { valueAsNumber: true })}
            />

            <Input
              type="number"
              placeholder="Dias de trabalho por mês"
              {...register("workDaysPerMonth", { valueAsNumber: true })}
            />

            <Input
              type="number"
              placeholder="Horas de trabalho por dia"
              {...register("workHoursPerDay", { valueAsNumber: true })}
            />

            <Input
              type="number"
              placeholder="Custo de eletricidade"
              {...register("electricity", { valueAsNumber: true })}
            />

            <Input
              type="number"
              placeholder="Custo de água"
              {...register("water", { valueAsNumber: true })}
            />

            <Input
              type="number"
              placeholder="Aluguel"
              {...register("rent", { valueAsNumber: true })}
            />

            <Input
              type="number"
              placeholder="Salários"
              {...register("wage", { valueAsNumber: true })}
            />

            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Carregando..." : "Criar labor"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
