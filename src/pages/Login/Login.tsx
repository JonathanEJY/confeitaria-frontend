import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../lib/api";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

function Login() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const { register, handleSubmit } = useForm({});
  const userLoginSchema = z.object({
    email: z.email("Email é obrigatório"),
    password: z.
  })

  async function handleLogin() {
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
        <Button>← Voltar</Button>
      </Link>
      <form onSubmit={handleSubmit(handleLogin)} className="auth-form">
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          autoComplete="on"
          {...register("password")}
          required
        />

        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}

export default Login;
