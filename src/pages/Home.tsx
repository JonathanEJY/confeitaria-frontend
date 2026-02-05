import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import useDocumentTitle from "@/hooks/useDocumentTitle";

function Home() {
  useDocumentTitle("Home - StockStock");

  return (
    <div className="h-screen bg-slate-50 flex justify-center items-center">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-sm p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Bem-vindo 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Escolha uma opção para continuar
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/login">
            <Button className="w-full" variant={"default"}>
              Entrar
            </Button>
          </Link>

          <Link to="/register">
            <Button variant="secondary" className="w-full">
              Criar conta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
