// # Form de produto
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ProductForm() {
  return (
    <form className="flex flex-wrap gap-3 items-center">
      <div className="flex w-full gap-5">
        <Input className="" type="text" placeholder="Nome do produto" />

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma unidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="un">Unidade</SelectItem>
            <SelectItem value="g">Gramas</SelectItem>
            <SelectItem value="kg">KG</SelectItem>
            <SelectItem value="ml">ml</SelectItem>
            <SelectItem value="L">Litros</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit">Adicionar</Button>
      </div>
    </form>
  );
}

export default ProductForm;
