import { Link } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";

function Home() {
  useDocumentTitle("Home - StockStock");
  return (
    <div className="home-container">
      <h1>Bem-vindo 👋</h1>
      <p>Escolha uma opção para continuar</p>

      <div className="home-actions">
        <Link to="/login">Login</Link>
        <Link to="/register">Cadastrar</Link>
      </div>
    </div>
  );
}

export default Home;
