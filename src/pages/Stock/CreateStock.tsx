import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type Props = {
  onCreate: (name: string) => void;
};

export function CreateStock({ onCreate }: Props) {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name);
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Escolha o nome do estoque"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Button className="w-full" type="submit">
              Criar estoque
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
