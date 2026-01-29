import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useGetProducts } from "@/features/products/react-query/queries";

function Dashboard() {
  const { user, logout } = useAuth();
  const { data: products = [] } = useGetProducts();
  useDocumentTitle("Dashboard - Confeitaria");
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            Olá{user?.username ? `, ${user.username}` : ""} 👋
          </CardTitle>
          <CardDescription>Bem-vindo ao seu painel de controle</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Link to="/products">
            <Button className="w-full">Gerenciar produtos</Button>
          </Link>

          <Link to="/stock">
            <Button variant={"outline"} className="w-full">
              Gerenciar estoque
            </Button>
          </Link>

          <Link to="/stock">
            <Button variant={"outline"} className="w-full">
              Gerenciar mão de obra
            </Button>
          </Link>

          <Link to="/stock">
            <Button variant={"outline"} className="w-full">
              Gerenciar receitas
            </Button>
          </Link>

          <Button variant="destructive" className="w-full" onClick={logout}>
            Logout
          </Button>
        </CardContent>
      </Card>
      <Card>
        {products ? (
          <p>{products.length} produtos cadastrados</p>
        ) : (
          <p>Nenhum produto cadastrado</p>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
