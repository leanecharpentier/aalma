"use client";

import { Building2, LayoutDashboard, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";

const navItem = tv({
  base: "flex flex-row items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
  variants: {
    active: {
      true: "bg-primary-40 text-primary-500",
      false: "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
    },
  },
  defaultVariants: {
    active: false,
  },
});

interface NavLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

const NAV_LINKS: NavLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Gestion des rôles", href: "/roles", icon: Users },
  { label: "Entreprises", href: "/companies", icon: Building2 },
  { label: "Paramètres", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-screen w-60 shrink-0 bg-white border-r border-gray-100 px-4 py-6">
      {/* Logo */}
      <div className="px-4 mb-8">
        <img src="/aalma.svg" alt="Aalma Logo" />
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 grow">
        {NAV_LINKS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={navItem({ active: pathname.startsWith(href) })}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="flex flex-row items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-200 bg-primary-500">
          <span className="text-xs text-primary-50 font-medium">A</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">Admin</span>
          <span className="text-xs text-gray-400">RH</span>
        </div>
      </div>
    </aside>
  );
}
