import { Link } from "react-router-dom";

function Home() {
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
