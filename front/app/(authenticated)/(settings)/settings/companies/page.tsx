"use client";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import CompanyCard from "./__components__/CompanyCard";

interface Company {
  id: string;
  logo: string;
  name: string;
  adminName: string;
  userCount: number;
  status: "Actif" | "Inactif";
}

const COMPANIES: Company[] = [
  {
    id: "1",
    logo: "/images/companies/synchro.png",
    name: "Synchro Diffusion",
    adminName: "Jean Moulin",
    userCount: 1000,
    status: "Actif",
  },
  {
    id: "2",
    logo: "/images/companies/synchro.png",
    name: "Synchro Diffusion",
    adminName: "Jean Moulin",
    userCount: 800,
    status: "Inactif",
  },
  {
    id: "3",
    logo: "/images/companies/synchro.png",
    name: "Synchro Diffusion",
    adminName: "Jean Moulin",
    userCount: 80,
    status: "Actif",
  },
  {
    id: "4",
    logo: "/images/companies/synchro.png",
    name: "Synchro Diffusion",
    adminName: "Jean Moulin",
    userCount: 500,
    status: "Actif",
  },
  {
    id: "5",
    logo: "/images/companies/synchro.png",
    name: "Synchro Diffusion",
    adminName: "Jean Moulin",
    userCount: 2000,
    status: "Actif",
  },
  {
    id: "6",
    logo: "/images/companies/synchro.png",
    name: "Synchro Diffusion",
    adminName: "Jean Moulin",
    userCount: 1230,
    status: "Actif",
  },
  {
    id: "7",
    logo: "/images/companies/synchro.png",
    name: "Synchro Diffusion",
    adminName: "Jean Moulin",
    userCount: 976,
    status: "Actif",
  },
  {
    id: "8",
    logo: "/images/companies/synchro.png",
    name: "Synchro Diffusion",
    adminName: "Jean Moulin",
    userCount: 1200,
    status: "Actif",
  },
  {
    id: "9",
    logo: "/images/companies/synchro.png",
    name: "Synchro Diffusion",
    adminName: "Jean Moulin",
    userCount: 340,
    status: "Actif",
  },
  {
    id: "10",
    logo: "/images/companies/synchro.png",
    name: "Synchro Diffusion",
    adminName: "Jean Moulin",
    userCount: 650,
    status: "Inactif",
  },
  {
    id: "11",
    logo: "/images/companies/synchro.png",
    name: "Synchro Diffusion",
    adminName: "Jean Moulin",
    userCount: 420,
    status: "Actif",
  },
  {
    id: "12",
    logo: "/images/companies/synchro.png",
    name: "Synchro Diffusion",
    adminName: "Jean Moulin",
    userCount: 890,
    status: "Actif",
  },
  {
    id: "13",
    logo: "/images/companies/synchro.png",
    name: "Synchro Diffusion",
    adminName: "Jean Moulin",
    userCount: 110,
    status: "Actif",
  },
];

const PAGE_SIZE = 8;

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const filtered = COMPANIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.adminName.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(0); // reset page on new search
  };

  return (
    <div className="flex flex-col gap-6">
      <Header />

      {/* Titre + actions */}
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Entreprises</h1>
        <div className="flex flex-row gap-3">
          <Button color="Primary" left={<Download size={16} />}>
            Import
          </Button>
          <Button color="White" left={<Users size={16} />}>
            Utilisateurs
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-row items-center gap-2 px-3 py-2 rounded-xl border border-gray-100 bg-white w-72">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="text-sm text-gray-700 placeholder:text-gray-300 outline-none bg-transparent grow"
        />
        <Search size={14} className="text-gray-400 shrink-0" />
      </div>

      {/* Compteur + pagination */}
      <div className="flex flex-row items-center justify-between">
        <p className="text-sm text-gray-500">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </p>
        <div className="flex flex-row gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-4 gap-4">
        {paginated.map((company) => (
          <CompanyCard
            key={company.id}
            logo={company.logo}
            name={company.name}
            adminName={company.adminName}
            userCount={company.userCount}
            status={company.status}
          />
        ))}
      </div>

      {/* Dots pagination */}
      {totalPages > 1 && (
        <div className="flex flex-row items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === page
                  ? "w-6 bg-gray-500"
                  : "w-3 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
