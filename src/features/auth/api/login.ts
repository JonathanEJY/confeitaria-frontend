import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { LoginCredentials, AuthResponse } from "@/types/auth";

async function loginRequest(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const { data } = await api.post("/login", credentials);
  return data;
}

export function useLogin() {
  return useMutation({
    mutationFn: loginRequest,
  });
}
