import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

type Product = {
  uuid: string;
  name: string;
};

type Props = {
  stockName: string;
  products: Product[];
};

export function ManageStock({ stockName, products }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Estoque</h1>
          <p className="text-muted-foreground">{stockName}</p>
        </div>

        {/* Formulário */}
        <form className="flex flex-wrap gap-3 items-end">
          <Select>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Produto" />
            </SelectTrigger>
            <SelectContent>
              {products.map((p) => (
                <SelectItem key={p.uuid} value={p.uuid}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input type="number" placeholder="Quantidade" className="w-[140px]" />

          <Input type="number" placeholder="Valor pago" className="w-[160px]" />

          <Button>Adicionar</Button>
        </form>

        {/* Tabela */}
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Produto</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Valor pago</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Farinha</TableCell>
              <TableCell>5 kg</TableCell>
              <TableCell>R$ 18,90</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="destructive">
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
