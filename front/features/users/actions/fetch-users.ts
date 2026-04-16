import { apiFetch } from "@/lib/api";

export type User = {
  id: string;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  role_id: string | null;
  team_id: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function fetchUsers(): Promise<User[]> {
  return apiFetch<User[]>("/user");
}
