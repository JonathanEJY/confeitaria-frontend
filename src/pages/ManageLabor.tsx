import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetLabor } from "@/features/labor/react-query/queries";
import { formatCurrency } from "@/helper/FormatCurrency/formatCurrency";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LaborFormData = {
  desiredSalary: number;
  workDaysPerMonth: number;
  workHoursPerDay: number;
  electricity: number;
  water: number;
  rent: number;
};

export const ManageLabor = () => {
  const { data: labor, isLoading } = useGetLabor();

  const { register, handleSubmit, reset, watch } = useForm<LaborFormData>();

  useEffect(() => {
    if (labor) reset(labor);
  }, [labor, reset]);

  const onSubmit = (data: LaborFormData) => {
    console.log("Salvar:", data);
  };

  if (isLoading)
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Carregando...</p>
      </div>
    );

  if (!labor)
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Erro ao carregar labor</p>
      </div>
    );

  const values = watch();

  return (
    <div className="flex flex-1 justify-center px-6 py-10">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Configuração de Custos</CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Salário */}
              <div className="space-y-2">
                <Label>Salário desejado</Label>
                <Input
                  type="number"
                  {...register("desiredSalary", {
                    valueAsNumber: true,
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Atual: {formatCurrency(values?.desiredSalary || 0)}
                </p>
              </div>

              {/* Dias */}
              <div className="space-y-2">
                <Label>Dias trabalhados</Label>
                <Input
                  type="number"
                  {...register("workDaysPerMonth", {
                    valueAsNumber: true,
                  })}
                />
              </div>

              {/* Horas */}
              <div className="space-y-2">
                <Label>Horas por dia</Label>
                <Input
                  type="number"
                  {...register("workHoursPerDay", {
                    valueAsNumber: true,
                  })}
                />
              </div>

              {/* Eletricidade */}
              <div className="space-y-2">
                <Label>Eletricidade</Label>
                <Input
                  type="number"
                  {...register("electricity", {
                    valueAsNumber: true,
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Atual: {formatCurrency(values?.electricity || 0)}
                </p>
              </div>

              {/* Água */}
              <div className="space-y-2">
                <Label>Água</Label>
                <Input
                  type="number"
                  {...register("water", {
                    valueAsNumber: true,
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Atual: {formatCurrency(values?.water || 0)}
                </p>
              </div>

              {/* Aluguel */}
              <div className="space-y-2">
                <Label>Aluguel</Label>
                <Input
                  type="number"
                  {...register("rent", {
                    valueAsNumber: true,
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Atual: {formatCurrency(values?.rent || 0)}
                </p>
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-end pt-4">
                <Button type="submit">Salvar alterações</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
