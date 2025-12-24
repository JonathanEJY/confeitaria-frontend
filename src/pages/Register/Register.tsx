import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const passwordHash = formData.get("passwordHash");
    const username = formData.get("username");

    const response = await axios.post("http://localhost:3000/users", {
      email,
      passwordHash,
      username,
    });
    console.log(response);
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
