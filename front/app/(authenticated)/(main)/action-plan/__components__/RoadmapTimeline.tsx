"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import AddActionWizard from "./AddActionWizard";
import SegmentedControl from "./SegmentedControl";

const MONTHS = [
	"Janvier 2026",
	"Février",
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Août",
	"Septembre",
	"Octobre",
	"Novembre",
	"Décembre",
];

const QUARTERS = [
	{ label: "T1  2026", range: "Jan–Mars" },
	{ label: "T2  2026", range: "Mai–Juin" },
	{ label: "T3  2026", range: "Juil–Sep" },
	{ label: "T4  2026", range: "Oct–Déc" },
];

const PRIORITIES = [
	{ label: "Former les managers", color: "bg-primary-500" },
	{
		label: "Structurer le rôle des référents santé",
		color: "bg-primary-400",
	},
	{
		label: "Briser le tabou et instaurer une culture de la parole",
		color: "bg-primary-500",
	},
];

interface RoadmapAction {
	title: string;
	date: string;
	time: string;
	priorityIndex: number;
	monthIndex: number;
}

const ACTIONS: RoadmapAction[] = [
	{
		title: "Gérer la charge et prévenir l'épuisement",
		date: "2 janvier",
		time: "15h30",
		priorityIndex: 0,
		monthIndex: 0,
	},
	{
		title: "Mener un entretien de soutien",
		date: "15 mars",
		time: "14h",
		priorityIndex: 0,
		monthIndex: 2,
	},
	{
		title: "Formation PSSM",
		date: "15 avril",
		time: "11h45",
		priorityIndex: 1,
		monthIndex: 3,
	},
	{
		title: "Café bien-être mensuel",
		date: "5 avril",
		time: "10h20",
		priorityIndex: 2,
		monthIndex: 3,
	},
	{
		title: "Campagne de sensibilisation interne",
		date: "12 mai",
		time: "9h",
		priorityIndex: 2,
		monthIndex: 4,
	},
];

function ActionCard({
	title,
	date,
	time,
}: {
	title: string;
	date: string;
	time: string;
}) {
	return (
		<div className="bg-gray-40 border border-gray-200 rounded-xl p-3 w-[122px]">
			<div className="flex flex-col gap-0.5 text-xs">
				<p className="font-bold text-gray-900 leading-normal">{title}</p>
				<div className="flex items-center gap-1 text-gray-500">
					<span className="font-bold">{date}</span>
					<span>{time}</span>
				</div>
			</div>
		</div>
	);
}

function PrioritySidebar() {
	return (
		<div className="flex flex-col w-[109px] shrink-0 rounded-lg overflow-hidden">
			{PRIORITIES.map((priority) => (
				<div
					key={priority.label}
					className={`flex items-center h-[124px] px-2 py-8 ${priority.color}`}
				>
					<p className="text-xs font-bold text-gray-40 leading-normal">
						{priority.label}
					</p>
				</div>
			))}
			<div className="flex flex-1 items-center justify-center bg-gray-100 px-2 py-6">
				<span className="text-lg font-bold text-gray-500">+</span>
			</div>
		</div>
	);
}

function MonthView() {
	return (
		<div className="flex flex-1 flex-col overflow-x-auto min-w-0">
			{/* Month headers */}
			<div className="flex gap-1 min-w-max">
				{MONTHS.map((month) => (
					<div
						key={month}
						className="flex items-center justify-center bg-gray-50 rounded-lg py-1 w-[131px] shrink-0"
					>
						<span className="text-xs font-bold text-gray-600 whitespace-nowrap">
							{month}
						</span>
					</div>
				))}
			</div>

			{/* Grid body */}
			<div className="relative flex-1 min-w-max">
				<div className="absolute inset-0 flex gap-1">
					{MONTHS.map((month) => (
						<div
							key={month}
							className="bg-gray-50 rounded-lg w-[131px] shrink-0 opacity-50"
						/>
					))}
				</div>

				{ACTIONS.map((action) => (
					<div
						key={`${action.title}-${action.date}`}
						className="absolute"
						style={{
							left: `${action.monthIndex * 135 + 4}px`,
							top: `${action.priorityIndex * 133 + 10}px`,
						}}
					>
						<ActionCard
							title={action.title}
							date={action.date}
							time={action.time}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

function QuarterView() {
	return (
		<div className="flex flex-1 flex-col min-w-0 pr-1">
			{/* Quarter headers */}
			<div className="grid grid-cols-4 gap-2.5">
				{QUARTERS.map((quarter) => (
					<div
						key={quarter.label}
						className="flex items-center justify-center bg-gray-50 rounded-lg py-1"
					>
						<span className="text-xs text-gray-600 whitespace-nowrap">
							<span className="font-bold">{quarter.label} </span>
							<span>{quarter.range}</span>
						</span>
					</div>
				))}
			</div>

			{/* Grid body */}
			<div className="relative flex-1">
				<div className="absolute inset-0 grid grid-cols-4 gap-2.5">
					{QUARTERS.map((quarter) => (
						<div
							key={quarter.label}
							className="bg-gray-50 rounded-lg opacity-50"
						/>
					))}
				</div>

				{ACTIONS.map((action) => {
					const quarterIndex = Math.floor(action.monthIndex / 3);
					return (
						<div
							key={`${action.title}-${action.date}`}
							className="absolute"
							style={{
								left: `calc(${quarterIndex} * 25% + 8px)`,
								top: `${action.priorityIndex * 133 + 10}px`,
							}}
						>
							<ActionCard
								title={action.title}
								date={action.date}
								time={action.time}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default function RoadmapTimeline() {
	const [view, setView] = useState("Mois");
	const [isAdding, setIsAdding] = useState(false);

	if (isAdding) {
		return <AddActionWizard onClose={() => setIsAdding(false)} />;
	}

	return (
		<div className="flex flex-1 flex-col bg-gray-40 rounded-xl shadow-card-light pl-5 py-5 min-w-0 min-h-0 h-[674px]">
			{/* Top bar: View toggle + Add button */}
			<div className="flex items-center gap-2.5 pb-5 pr-5 pt-2">
				<SegmentedControl
					options={["Mois", "Trimestre", "Listes"]}
					value={view}
					onChange={setView}
				/>
				<div className="flex flex-1 justify-end">
					<button
						type="button"
						className="flex items-center gap-2 border border-gray-900 rounded-lg px-3.5 py-2 text-sm font-bold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors"
						onClick={() => setIsAdding(true)}
					>
						<Plus size={20} />
						Ajouter
					</button>
				</div>
			</div>

			{/* Roadmap grid area */}
			<div className="flex flex-1 gap-1 min-h-0">
				<PrioritySidebar />
				{view === "Mois" && <MonthView />}
				{view === "Trimestre" && <QuarterView />}
				{view === "Listes" && (
					<div className="flex flex-1 items-center justify-center text-gray-500 text-sm">
						Vue liste à venir
					</div>
				)}
			</div>
		</div>
	);
}
