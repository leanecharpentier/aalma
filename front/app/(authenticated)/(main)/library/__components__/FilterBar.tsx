"use client";

import Select from "@/components/ui/Select";

const THEMATIQUE_OPTIONS = [
	{ id: "all", label: "Toutes" },
	{ id: "performance", label: "Performance & feedback" },
	{ id: "stress", label: "Gestion du stress" },
	{ id: "communication", label: "Communication" },
	{ id: "leadership", label: "Leadership" },
];

const FORMAT_OPTIONS = [
	{ id: "all", label: "Tous" },
	{ id: "presentiel", label: "Présentiel" },
	{ id: "distanciel", label: "Distanciel" },
	{ id: "hybride", label: "Hybride" },
];

const DUREE_OPTIONS = [
	{ id: "all", label: "Toutes" },
	{ id: "30min", label: "30 min" },
	{ id: "1h", label: "1 heure" },
	{ id: "2h", label: "2 heures" },
	{ id: "halfday", label: "Demi-journée" },
];

const PARTICIPANTS_OPTIONS = [
	{ id: "all", label: "Tous" },
	{ id: "2-10", label: "2-10 pers." },
	{ id: "10-20", label: "10-20 pers." },
	{ id: "20+", label: "20+ pers." },
];

interface FilterBarProps {
	count: number;
}

export default function FilterBar({ count }: FilterBarProps) {
	return (
		<div className="flex items-center gap-2.5">
			<Select
				label="Thématique"
				placeholder="Thématique"
				options={THEMATIQUE_OPTIONS}
				variant="filter"
			/>
			<Select
				label="Format"
				placeholder="Format"
				options={FORMAT_OPTIONS}
				variant="filter"
			/>
			<Select
				label="Durée"
				placeholder="Durée"
				options={DUREE_OPTIONS}
				variant="filter"
			/>
			<Select
				label="Nombre de participants"
				placeholder="Nombre de participants"
				options={PARTICIPANTS_OPTIONS}
				variant="filter"
			/>
			<div className="flex flex-1 items-center justify-end">
				<span className="text-lg text-gray-500">{count} actions</span>
			</div>
		</div>
	);
}
