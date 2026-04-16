"use client";

import { Bell, Search, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";

const navItem = tv({
	base: "flex flex-row items-center gap-3 px-3 py-3.5 rounded-xl text-base font-bold transition-colors",
	variants: {
		active: {
			true: "bg-primary-50 text-primary-500",
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
	{ label: "Profil", href: "/settings/profil", icon: User },
	{ label: "Gestion des rôles", href: "/settings/roles", icon: ShieldCheck },
	{
		label: "Notifications",
		href: "/settings/notifications",
		icon: Bell,
	},
];

export default function SettingsSidebar() {
	const pathname = usePathname();

	return (
		<aside className="flex flex-col h-full w-56 shrink-0 bg-gray-40 px-3 py-6 gap-3">
			{/* Search */}
			<div className="flex items-center bg-gray-40 border border-gray-100 rounded-lg px-3.5 py-2">
				<span className="flex-1 text-xs text-gray-300">Search</span>
				<Search size={24} className="text-gray-500 shrink-0" />
			</div>

			{/* Nav */}
			<nav className="flex flex-col gap-3 grow">
				{NAV_LINKS.map(({ label, href, icon: Icon }) => (
					<Link
						key={href}
						href={href}
						className={navItem({ active: pathname.startsWith(href) })}
					>
						<Icon size={24} />
						<span>{label}</span>
					</Link>
				))}
			</nav>
		</aside>
	);
}
