"use client";

import { MoreVertical, Users } from "lucide-react";
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const statusBadge = tv({
  base: "inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border",
  variants: {
    status: {
      Actif: "bg-green-500 text-white border-green-500",
      Inactif: "bg-white text-orange-500 border-orange-400",
    },
  },
});

const menuItem = tv({
  base: "px-3 py-2 text-sm text-gray-700 rounded-lg cursor-pointer outline-none hover:bg-gray-50",
});

type Status = "Actif" | "Inactif";

interface CompanyCardProps {
  logo: string;
  name: string;
  adminName: string;
  userCount: number;
  status: Status;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function CompanyCard({
  logo,
  name,
  adminName,
  userCount,
  status,
  onEdit,
  onDelete,
}: CompanyCardProps) {
  return (
    <div className="flex flex-col gap-4 bg-white border border-gray-100 rounded-2xl p-5">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <img
            src={logo}
            alt={`${name} logo`}
            className="h-8 w-auto object-contain"
          />
          <span className="text-sm font-bold text-gray-900">{name}</span>
        </div>

        <MenuTrigger>
          <Button className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-gray-50 outline-none cursor-pointer transition-colors">
            <MoreVertical size={16} className="text-gray-400" />
          </Button>
          <Popover className="w-40 bg-white border border-gray-100 rounded-xl shadow-lg p-1 z-50">
            <Menu className="outline-none">
              <MenuItem id="edit" className={menuItem()} onAction={onEdit}>
                Modifier
              </MenuItem>
              <MenuItem
                id="delete"
                className={`${menuItem()} text-red-500 hover:bg-red-50`}
                onAction={onDelete}
              >
                Supprimer
              </MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-800">Admin :</span>{" "}
          {adminName}
        </p>
        <div className="flex flex-row items-center gap-2.5">
          <Users size={16} className="text-gray-400 shrink-0" />
          <span className="w-px h-4 bg-gray-200 shrink-0" />
          <span className="text-sm text-gray-500">
            {userCount.toLocaleString("fr-FR")} utilisateurs
          </span>
        </div>
      </div>

      {/* Footer */}
      <span className={statusBadge({ status })}>{status}</span>
    </div>
  );
}
