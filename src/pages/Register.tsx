import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const passwordHash = formData.get("passwordHash");
    const username = formData.get("username");

    try {
      const response = await api.post("/users", {
        email,
        passwordHash,
        username,
      });
      if (response.status === 201) {
        alert("Usuário criado com sucesso!");
        await refreshUser();
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="auth-container">
      <Link to="/" className="back-link">
        ← Voltar
      </Link>

      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Cadastro</h1>

        <input name="email" type="email" placeholder="Email" required />
        <input
          name="passwordHash"
          type="password"
          placeholder="Senha"
          required
        />
        <input name="username" type="text" placeholder="Usuário" required />

        <button type="submit">Cadastrar</button>

        <p className="auth-footer">
          Já tem conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
