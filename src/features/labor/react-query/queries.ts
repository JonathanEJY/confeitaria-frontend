import { useQuery, useMutation } from "@tanstack/react-query";
import { getLaborApi, createLaborApi } from "../api/user-details.api";

export function useGetLabor() {
  return useQuery({
    queryKey: ["labors"],
    queryFn: getLaborApi,
    retry: false,
  });
}

export function useCreateLabor() {
  return useMutation({
    mutationFn: createLaborApi,
  });
}
