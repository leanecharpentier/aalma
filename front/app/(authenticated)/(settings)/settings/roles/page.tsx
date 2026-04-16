import { Download, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  type ActivityLog,
  fetchActivityLogs,
} from "@/features/activity-log/actions/fetch-activity-logs";
import { fetchRoles } from "@/features/roles/actions/fetch-roles";
import type { ActivityEntry } from "./__components__/ActivityHistory";
import ActivityHistory from "./__components__/ActivityHistory";
import RoleCard from "./__components__/RoleCard";

const DEFAULT_COLOR = "bg-primary-400";

const STATUS_MAP: Record<number, ActivityEntry["status"]> = {
  1: "Succès",
  2: "Échec",
  3: "En cours",
};

function toActivityEntry(log: ActivityLog): ActivityEntry {
  const date = new Date(log.createdAt);
  return {
    id: log.id,
    date: date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    userName: log.user?.name ?? "Utilisateur supprimé",
    userEmail: log.user?.email ?? "",
    role: (log.user?.role?.name as ActivityEntry["role"]) ?? "Collaborateur",
    action: log.action,
    target: log.details ?? "",
    status: STATUS_MAP[log.status] ?? "En cours",
  };
}

export default async function RolesPage() {
  const [roles, activityLogs] = await Promise.all([
    fetchRoles(),
    fetchActivityLogs(),
  ]);

  const activityEntries = activityLogs.map(toActivityEntry);

  return (
    <div className="flex flex-col gap-6">
      {/* Titre + actions */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-5xl font-bold text-gray-900">
            Gestion des rôles
          </h1>
          <p className="text-lg text-gray-900">
            Définissez les permissions et les niveaux d'accès pour votre
            organisation
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <Button color="Primary" left={<Download size={16} />}>
            Import
          </Button>
          <Button color="White" left={<Plus size={16} />}>
            Ajouter
          </Button>
        </div>
      </div>

      {/* Cards des rôles */}
      <div className="grid grid-cols-4 gap-4">
        {roles.map(
          (role) =>
            role.userCount > 1 && (
              <RoleCard
                key={role.id}
                name={role.name}
                color={DEFAULT_COLOR}
                userCount={role.userCount}
              />
            ),
        )}
      </div>

      {/* Voir tous les utilisateurs */}
      <div className="flex justify-end">
        <Button color="White" className="border-gray-900">
          Voir tous les utilisateurs
        </Button>
      </div>
      <ActivityHistory entries={activityEntries} />
    </div>
  );
}
