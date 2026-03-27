import { apiFetch } from "@/lib/api";

export type ActivityLog = {
  id: string;
  action: string;
  status: number;
  details: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: {
      id: number;
      name: string;
    } | null;
  } | null;
};

export async function fetchActivityLogs(): Promise<ActivityLog[]> {
  return apiFetch<ActivityLog[]>("/activity-log");
}
