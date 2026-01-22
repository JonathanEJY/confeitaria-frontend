import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

type ProductEditFormProps = {
  product: Product;
};

function ProductEditForm({ product }: ProductEditFormProps) {
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="editName">{product.name}</Label>
        <Input id="editName" placeholder="Nome do produto" />
      </div>

      <div>
        <Label htmlFor="editUnit">Unidade</Label>
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="un">Unidade</SelectItem>
            <SelectItem value="g">Gramas</SelectItem>
            <SelectItem value="kg">KG</SelectItem>
            <SelectItem value="ml">ml</SelectItem>
            <SelectItem value="L">Litros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          Salvar alterações
        </Button>
        <Button type="button" variant="outline">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
export default ProductEditForm;
