import { Download, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { fetchRoles } from "@/features/roles/actions/fetch-roles";
import ActivityHistory from "./__components__/ActivityHistory";
import RoleCard from "./__components__/RoleCard";

const ROLE_COLORS: Record<number, string> = {
  2: "bg-rose-400",
  3: "bg-amber-400",
  4: "bg-violet-400",
  5: "bg-blue-400",
  6: "bg-emerald-400",
};

const DEFAULT_COLOR = "bg-primary-400";

export default async function RolesPage() {
  const roles = await fetchRoles();

  return (
    <div className="flex flex-col gap-6">
      {/* Titre + actions */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des rôles
          </h1>
          <p className="text-sm text-gray-500">
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
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            name={role.name}
            color={ROLE_COLORS[role.id] ?? DEFAULT_COLOR}
            userCount={role.userCount}
          />
        ))}
      </div>

      {/* Voir tous les utilisateurs */}
      <div className="flex justify-end">
        <Button color="White" className="border-gray-900">
          Voir tous les utilisateurs
        </Button>
      </div>
      <ActivityHistory />
    </div>
  );
}
