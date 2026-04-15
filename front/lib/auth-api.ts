import { createAuthClient } from "better-auth/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type SignInPayload = {
  email: string;
  password: string;
};

type ApiErrorBody = {
  message?: string;
  error?: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const authClient = createAuthClient({
  baseURL: process.env.API_BASE_URL,
  fetchOptions: {
    credentials: "include",
  },
});

export async function signIn(payload: SignInPayload) {
  const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as
      | ApiErrorBody
      | null;

    throw new ApiError(
      errorBody?.message ?? errorBody?.error ?? "Echec de la connexion",
      response.status,
    );
  }

  return response.json().catch(() => null);
}
