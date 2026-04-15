import { apiFetch } from "@/lib/api";

export type Team = {
  id: number;
  name: string;
  company_id: number;
  createdAt: string;
  updatedAt: string;
};

export async function fetchTeams(companyId?: number): Promise<Team[]> {
  const params = companyId ? `?companyId=${companyId}` : "";
  return apiFetch<Team[]>(`/api/team${params}`);
}
