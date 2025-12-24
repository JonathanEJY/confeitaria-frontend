import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await axios.post(
      "http://localhost:3000/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response);
  }

  return (
    <div className="auth-container">
      <Link to="/" className="back-link">
        ← Voltar
      </Link>
      <form onSubmit={handleSubmit} className="auth-form">
        <h1>Login</h1>

        <input type="email" placeholder="Email" name="email" required />
        <input type="password" placeholder="Senha" name="password" required />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
