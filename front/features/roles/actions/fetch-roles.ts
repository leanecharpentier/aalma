import { apiFetch } from "@/lib/api";

export type Role = {
  id: number;
  name: string;
  userCount: number;
  createdAt: string;
  updatedAt: string;
};

export async function fetchRoles(): Promise<Role[]> {
  return apiFetch<Role[]>("/role");
}
