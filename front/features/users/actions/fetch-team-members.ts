import { apiFetch } from "@/lib/api";
import type { User } from "./fetch-users";

export type TeamWithMembers = {
  id: string;
  name: string;
  company_id: string;
  users: User[];
};

export async function fetchTeamMembers(
  teamId: string,
): Promise<TeamWithMembers> {
  return apiFetch<TeamWithMembers>(`/team/${teamId}/employees`);
}
