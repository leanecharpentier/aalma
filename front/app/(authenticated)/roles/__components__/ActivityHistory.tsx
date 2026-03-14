"use client";

import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { tv } from "tailwind-variants";
import DateRangePicker from "@/components/ui/DateRangePicker";
import Select from "@/components/ui/Select";

// --- Variants ---

const roleBadge = tv({
  base: "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
  variants: {
    role: {
      Admin: "bg-orange-100 text-orange-600",
      Manager: "bg-purple-100 text-purple-600",
      "Référent santé": "bg-green-100 text-green-600",
      Collaborateur: "bg-blue-100 text-blue-600",
    },
  },
});

const statusBadge = tv({
  base: "inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold",
  variants: {
    status: {
      "En cours": "bg-gray-100 text-gray-600",
      Succès: "bg-green-500 text-white",
      Échec: "bg-red-500 text-white",
    },
  },
});

// --- Types ---

type Role = "Admin" | "Manager" | "Référent santé" | "Collaborateur";
type Status = "En cours" | "Succès" | "Échec";

interface ActivityEntry {
  id: string;
  date: string;
  time: string;
  userName: string;
  userEmail: string;
  role: Role;
  action: string;
  target: string;
  status: Status;
}

// --- Mock data ---

const ACTIVITIES: ActivityEntry[] = [
  {
    id: "1",
    date: "08.03.2026",
    time: "9:34",
    userName: "Robert Bois",
    userEmail: "Robertmoulin@gmail.com",
    role: "Admin",
    action: "A importé",
    target: "24 utilisateurs",
    status: "En cours",
  },
  {
    id: "2",
    date: "24.03.2026",
    time: "15:08",
    userName: "Julien Leroy",
    userEmail: "juju34@gmail.com",
    role: "Manager",
    action: "à supprimé Marlène",
    target: "Collaborateur → Manager",
    status: "Succès",
  },
  {
    id: "3",
    date: "02.01.2026",
    time: "10:45",
    userName: "Claire Dubois",
    userEmail: "claire.d@gmail.com",
    role: "Admin",
    action: "A supprimé",
    target: "Thomas Petit",
    status: "Échec",
  },
  {
    id: "4",
    date: "12.01.2026",
    time: "11:52",
    userName: "Sophie Martin",
    userEmail: "sophie.Martin@gmail.com",
    role: "Référent santé",
    action: "à modifié un rôle",
    target: "Collaborateur → Manager",
    status: "Succès",
  },
];

const ROLE_OPTIONS = [
  { id: "all", label: "Tous les rôles" },
  { id: "admin", label: "Admin" },
  { id: "manager", label: "Manager" },
  { id: "referent", label: "Référent santé" },
  { id: "collaborateur", label: "Collaborateur" },
];

const ACTION_OPTIONS = [
  { id: "all", label: "Toutes les actions" },
  { id: "import", label: "Import" },
  { id: "suppression", label: "Suppression" },
  { id: "modification", label: "Modification" },
];

// --- Component ---

export default function ActivityHistory() {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedAction, setSelectedAction] = useState("all");

  const filtered = ACTIVITIES.filter((a) => {
    const matchSearch =
      a.userName.toLowerCase().includes(search.toLowerCase()) ||
      a.target.toLowerCase().includes(search.toLowerCase());
    const matchRole =
      selectedRole === "all" ||
      a.role.toLowerCase() === selectedRole.toLowerCase();
    const matchAction =
      selectedAction === "all" ||
      a.action.toLowerCase().includes(selectedAction.toLowerCase());
    return matchSearch && matchRole && matchAction;
  });

  return (
    <div className="flex flex-col gap-5 bg-white border border-gray-100 rounded-2xl p-6">
      {/* Titre */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-gray-900">
          Historique des activités
        </h2>
        <p className="text-sm text-gray-500">
          Suivi de toutes les modifications de rôles et permissions
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-row items-center gap-3">
        {/* Search */}
        <div className="flex flex-row items-center gap-2 px-3 py-2 rounded-xl border border-gray-100 bg-white">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm text-gray-700 placeholder:text-gray-300 outline-none bg-transparent w-40"
          />
          <Search size={14} className="text-gray-400 shrink-0" />
        </div>

        <Select
          label="Rôle"
          placeholder="Rôle"
          options={ROLE_OPTIONS}
          selectedKey={selectedRole}
          onSelectionChange={setSelectedRole}
          icon={<Filter size={14} className="text-gray-400 shrink-0" />}
        />

        <DateRangePicker label="Date" />

        <Select
          label="Type d'action"
          placeholder="Type d'action"
          options={ACTION_OPTIONS}
          selectedKey={selectedAction}
          onSelectionChange={setSelectedAction}
          icon={<Filter size={14} className="text-gray-400 shrink-0" />}
        />
      </div>

      {/* Tableau */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {[
              "Date & heure",
              "Utilisateur",
              "Rôle",
              "Action",
              "Cible/Objet",
              "Statut",
            ].map((col) => (
              <th
                key={col}
                className="pb-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((entry) => (
            <tr
              key={entry.id}
              className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
            >
              <td className="py-4">
                <span className="block text-sm font-medium text-gray-800">
                  {entry.date}
                </span>
                <span className="block text-xs text-gray-400">
                  {entry.time}
                </span>
              </td>
              <td className="py-4">
                <span className="block text-sm font-medium text-gray-800">
                  {entry.userName}
                </span>
                <span className="block text-xs text-gray-400">
                  {entry.userEmail}
                </span>
              </td>
              <td className="py-4">
                <span className={roleBadge({ role: entry.role })}>
                  {entry.role}
                </span>
              </td>
              <td className="py-4 text-sm text-gray-600">{entry.action}</td>
              <td className="py-4 text-sm text-gray-600">{entry.target}</td>
              <td className="py-4">
                <span className={statusBadge({ status: entry.status })}>
                  {entry.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
