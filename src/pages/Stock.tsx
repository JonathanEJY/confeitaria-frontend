import { CreateStock } from "./CreateStock";
import { ManageStock } from "./ManageStock";
import { useGetStock } from "@/features/stock/react-query/queries";

function Stock() {
  const { data: stock, isLoading } = useGetStock();

  if (isLoading) return <p>Carregando...</p>;

  if (!stock) {
    return <CreateStock />;
  }

  return <ManageStock stock={stock} />;
}

export default Stock;
