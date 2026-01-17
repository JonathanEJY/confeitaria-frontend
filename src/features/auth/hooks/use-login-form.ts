import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormData } from "../schemas/login-schema";
import { useLogin } from "../api/login";
import { useAuth } from "@/hooks/useAuth";

export function useLoginForm() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const loginMutation = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await loginMutation.mutateAsync(data);
      await refreshUser();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  });

  return {
    register: form.register,
    handleSubmit: onSubmit,
    errors: form.formState.errors,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
}
