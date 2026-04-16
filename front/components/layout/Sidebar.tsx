"use client";

import {
	Home,
	ListFilter,
	Search,
	Timer,
	TrendingUp,
	Workflow,
} from "lucide-react";
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
	{ label: "Accueil", href: "/home", icon: Home },
	{ label: "Questionnaires", href: "/questionnaire", icon: ListFilter },
	{ label: "Analyse", href: "/analysis", icon: Timer },
	{ label: "Plan d'action", href: "/action-plan", icon: Workflow },
	{ label: "Librairie d'action", href: "/library", icon: Search },
	{ label: "Impact", href: "/impact", icon: TrendingUp },
];

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="flex flex-col h-full w-56 shrink-0 bg-gray-40 px-3 py-6">
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
