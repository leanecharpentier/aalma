"use client";

import { useState } from "react";
import ActionCard from "./__components__/ActionCard";
import ActionDetail from "./__components__/ActionDetail";
import FilterBar from "./__components__/FilterBar";

const ACTIONS = [
	{
		id: "1",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		description:
			"Apprendre à formuler un feedback constructif, l'intégrer dans sa pratique managériale et créer une culture de la progression continue.",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
	},
	{
		id: "2",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		description:
			"Apprendre à formuler un feedback constructif, l'intégrer dans sa pratique managériale et créer une culture de la progression continue.",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
	},
	{
		id: "3",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		description:
			"Apprendre à formuler un feedback constructif, l'intégrer dans sa pratique managériale et créer une culture de la progression continue.",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
	},
	{
		id: "4",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		description:
			"Apprendre à formuler un feedback constructif, l'intégrer dans sa pratique managériale et créer une culture de la progression continue.",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
	},
	{
		id: "5",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		description:
			"Apprendre à formuler un feedback constructif, l'intégrer dans sa pratique managériale et créer une culture de la progression continue.",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
	},
	{
		id: "6",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		description:
			"Apprendre à formuler un feedback constructif, l'intégrer dans sa pratique managériale et créer une culture de la progression continue.",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
	},
	{
		id: "7",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		description:
			"Apprendre à formuler un feedback constructif, l'intégrer dans sa pratique managériale et créer une culture de la progression continue.",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
	},
	{
		id: "8",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		description:
			"Apprendre à formuler un feedback constructif, l'intégrer dans sa pratique managériale et créer une culture de la progression continue.",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
	},
	{
		id: "9",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		description:
			"Apprendre à formuler un feedback constructif, l'intégrer dans sa pratique managériale et créer une culture de la progression continue.",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
	},
];

export default function Library() {
	const [selectedAction, setSelectedAction] = useState<string | null>(null);

	if (selectedAction) {
		return <ActionDetail onBack={() => setSelectedAction(null)} />;
	}

	return (
		<main className="flex flex-col gap-5 h-full">
			{/* Header */}
			<div className="flex flex-col gap-2">
				<h1 className="text-[28px] font-bold text-gray-900">
					Librairie d&apos;action
				</h1>
				<p className="text-lg text-gray-900">
					Découvrez et ajoutez des actions sur le bien-être à votre plan
					d&apos;action
				</p>
			</div>

			{/* Filters */}
			<FilterBar count={48} />

			{/* Cards grid */}
			<div className="flex-1 overflow-y-auto min-h-0">
				<div className="grid grid-cols-3 gap-5">
					{ACTIONS.map((action) => (
						<ActionCard
							key={action.id}
							{...action}
							onDiscover={() => setSelectedAction(action.id)}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
