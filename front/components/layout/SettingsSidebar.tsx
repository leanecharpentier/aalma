"use client";

import { LayoutDashboard, Users } from "lucide-react";
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
  { label: "Profil", href: "/settings/profil", icon: LayoutDashboard },
  { label: "Gestion des rôles", href: "/settings/roles", icon: Users },
];

export default function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-full w-60 shrink-0 bg-white px-4 py-6">
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
    </aside>
  );
}
