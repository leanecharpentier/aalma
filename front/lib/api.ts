import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

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

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...options?.headers,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      redirect("/auth/login");
    }
    if (response.status === 403) {
      redirect("/forbidden");
    }

    const errorBody = (await response
      .json()
      .catch(() => null)) as ApiErrorBody | null;

    throw new ApiError(
      errorBody?.message ?? errorBody?.error ?? "Une erreur est survenue",
      response.status,
    );
  }

  return response.json();
}
