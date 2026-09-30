import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GOODBYE_PATH } from "@/app/auth";
import { apiClient } from "@/core/api/client";
import { signOutLocal } from "@/core/auth";

const AUTH_ME_QUERY_KEY = ["auth", "me"] as const;

/** @deprecated Login custom non più usata nel flusso OAuth; mantenuto per `LoginPage.tsx`. */
export type SignInRequest = {
  username: string;
  password: string;
};

/** @deprecated Login custom non più usata nel flusso OAuth; mantenuto per `LoginPage.tsx`. */
export type SignInResponse = {
  userId: string;
  userIdNumber: number;
  username: string;
  displayName: string;
};

export type AuthUser = {
  displayName: string;
  userId: string;
  userIdNumber: number;
  username: string;
  keycloakId: string;
  email: string;
  role: number;
};

/** @deprecated Login custom non più usata nel flusso OAuth; mantenuto per `LoginPage.tsx`. */
export async function signIn(credentials: SignInRequest) {
  const { data } = await apiClient.post<SignInResponse>(
    "/api/auth/signin",
    credentials,
  );
  return data;
}

export async function getMe(): Promise<AuthUser | null> {
  try {
    const { data } = await apiClient.get<AuthUser>("/api/auth/me");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    throw error;
  }
}

export function useAuthMe() {
  return useQuery({
    queryKey: AUTH_ME_QUERY_KEY,
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

/** @deprecated Login custom non più usata nel flusso OAuth; mantenuto per `LoginPage.tsx`. */
export function useSignIn() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      client.removeQueries({ queryKey: AUTH_ME_QUERY_KEY });

      const user = await client.fetchQuery({
        queryKey: AUTH_ME_QUERY_KEY,
        queryFn: getMe,
      });

      if (!user) {
        throw new Error("Sessione non avviata.");
      }
    },
  });
}

export function useSignOut() {
  const client = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signOutLocal,
    onSuccess: () => {
      client.removeQueries({ queryKey: AUTH_ME_QUERY_KEY });
      navigate(GOODBYE_PATH, { replace: true });
    },
  });
}

export { AUTH_ME_QUERY_KEY };
