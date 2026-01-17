import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import LoginForm from "@/features/auth/components/LoginForm";

function Login() {
  return (
    <div className="h-screen bg-slate-50 flex justify-center items-center">
      <Link
        to="/"
        className="absolute top-6 left-6 no-underline text-slate-900 text-[0.95rem] font-medium opacity-70 hover:opacity-100 transition-opacity duration-200"
      >
        <Button>← Voltar</Button>
      </Link>
      <LoginForm />
    </div>
  );
}

export default Login;
