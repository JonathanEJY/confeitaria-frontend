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

function Dashboard() {
  const { user, logout } = useAuth();
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

          <Button variant="destructive" className="w-full" onClick={logout}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
