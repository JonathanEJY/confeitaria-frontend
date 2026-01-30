import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function CreateStock() {
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
          <form className="space-y-4">
            <Input placeholder="Escolha o nome do estoque" />

            <Button className="w-full" type="submit">
              Criar estoque
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
