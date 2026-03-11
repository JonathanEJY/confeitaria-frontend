import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";

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
    <div className="h-screen bg-slate-50 flex justify-center items-center">
      <Link
        to="/"
        className="absolute top-6 left-6 no-underline text-slate-900 text-[0.95rem] font-medium opacity-70 hover:opacity-100 transition-opacity duration-200"
      >
        <Button>← Voltar</Button>
      </Link>

      <form
        className="bg-white rounded-2xl p-10 w-full max-w-95 flex flex-col gap-5 border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-[1.8rem] font-semibold text-slate-900 mb-2">
          Cadastro
        </h1>

        <div className="flex flex-col gap-1">
          <input
            className="px-3.5 py-3 rounded-[10px] border border-gray-200 text-[0.95rem] outline-none focus:border-slate-400 transition-colors"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <input
            className="px-3.5 py-3 rounded-[10px] border border-gray-200 text-[0.95rem] outline-none focus:border-slate-400 transition-colors"
            name="passwordHash"
            type="password"
            placeholder="Senha"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <input
            className="px-3.5 py-3 rounded-[10px] border border-gray-200 text-[0.95rem] outline-none focus:border-slate-400 transition-colors"
            name="username"
            type="text"
            placeholder="Usuário"
            required
          />
        </div>
        <button
          className="mt-2 py-3 rounded-[10px] bg-slate-900 text-white font-medium hover:bg-gray-800 transition-colors duration-200"
          type="submit"
        >
          Cadastrar
        </button>

        <p className="text-center">
          Já tem conta?{" "}
          <Link to="/login" className="text-blue-500">
            Faça login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
