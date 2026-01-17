import { Button } from "@/components/ui/button";
import { useLoginForm } from "@/features/auth/hooks/use-login-form";

function LoginForm() {
  const { register, handleSubmit, errors, isLoading } = useLoginForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-10 w-full max-w-95 flex flex-col gap-5 border border-gray-200"
    >
      <h1 className="text-center text-[1.8rem] font-semibold text-slate-900 mb-2">
        Login
      </h1>

      <div className="flex flex-col gap-1">
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="px-3.5 py-3 rounded-[10px] border border-gray-200 text-[0.95rem] outline-none focus:border-slate-400 transition-colors"
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="password"
          placeholder="Senha"
          autoComplete="on"
          {...register("password")}
          className="px-3.5 py-3 rounded-[10px] border border-gray-200 text-[0.95rem] outline-none focus:border-slate-400 transition-colors"
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-2 py-3 rounded-[10px] bg-slate-900 text-white font-medium hover:bg-gray-800 transition-colors duration-200"
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}

export default LoginForm;
