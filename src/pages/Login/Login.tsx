import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../lib/api";

function Login() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      if (response.status === 200) {
        await refreshUser();
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Error");
    }
  }

  return (
    <div className="auth-container">
      <Link to="/" className="back-link">
        ← Voltar
      </Link>
      <form onSubmit={handleSubmit} className="auth-form">
        <h1>Login</h1>

        <input type="email" placeholder="Email" name="email" required />
        <input
          type="password"
          placeholder="Senha"
          name="password"
          autoComplete="on"
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
