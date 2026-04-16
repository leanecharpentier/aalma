import { Users } from "lucide-react";
import { tv } from "tailwind-variants";
import Button from "@/components/ui/Button";

interface RoleCardProps {
  name: string;
  color: string; // classe tailwind bg-* pour le carré coloré
  userCount: number;
  teamCount?: number; // optionnel, uniquement pour Manager
  onEdit?: () => void;
}

const badge = tv({
  base: "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100",
});

export default function RoleCard({
  name,
  color,
  userCount,
  teamCount,
  onEdit,
}: RoleCardProps) {
  return (
    <div className="flex flex-col justify-between gap-4 bg-white rounded-2xl p-5 shadow-card">
      {/* Header de la card */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2.5">
          <span className={`h-6 w-6 rounded shrink-0 ${color}`} />
          <span className="text-sm font-semibold text-gray-900">{name}</span>
        </div>
        <Button
          color="White"
          size="md"
          className="!px-0 !py-0 !border-0 !bg-transparent text-primary-500 hover:text-primary-600 text-sm font-medium"
          onClick={onEdit}
        >
          Modifier
        </Button>
      </div>

      {/* Footer de la card */}
      <div className="flex flex-col gap-2">
        {teamCount !== undefined && (
          <span className={badge()}>
            {teamCount} équipe{teamCount > 1 ? "s" : ""}
          </span>
        )}
        <div className="flex flex-row items-center gap-2.5">
          <Users size={16} className="text-gray-400 shrink-0" />
          <span className="w-px h-4 bg-gray-200 shrink-0" />
          <span className="text-sm text-gray-500">
            {userCount} utilisateur{userCount > 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
