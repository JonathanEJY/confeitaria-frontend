import { useGetLabor } from "@/features/labor/react-query/queries";
import { CreateLabor } from "./CreateLabor";
import { ManageLabor } from "./ManageLabor";

export function Labor() {
  const { data: labor, isLoading } = useGetLabor();

  if (isLoading) return <p>Carregando...</p>;

  if (!labor) {
    return <CreateLabor />;
  }

  return <ManageLabor />;
}
