import { Download, Plus } from "lucide-react";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import ActivityHistory from "./__components__/ActivityHistory";
import RoleCard from "./__components__/RoleCard";

const ROLES = [
  {
    id: "rh",
    name: "Ressources Humaines",
    color: "bg-violet-400",
    userCount: 3,
  },
  {
    id: "manager",
    name: "Manager",
    color: "bg-blue-400",
    userCount: 12,
    teamCount: 4,
  },
  {
    id: "referent",
    name: "Référent Santé",
    color: "bg-emerald-400",
    userCount: 2,
  },
  {
    id: "collaborateur",
    name: "Collaborateur",
    color: "bg-primary-400",
    userCount: 87,
  },
];

export default function RolesPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header />

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
        {ROLES.map((role) => (
          <RoleCard
            key={role.id}
            name={role.name}
            color={role.color}
            userCount={role.userCount}
            teamCount={role.teamCount}
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
