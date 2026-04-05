"use client";

import {
	Calendar,
	ChevronLeft,
	Clock,
	Heart,
	Plus,
	Search,
} from "lucide-react";
import { useState } from "react";
import { tv } from "tailwind-variants";

const STEPS = [
	{ number: 1, label: "Choisir une action" },
	{ number: 2, label: "Planifier" },
	{ number: 3, label: "Participants" },
];

const FAVORITE_ACTIONS = [
	{
		id: "fav-1",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
		isFavorite: true,
	},
	{
		id: "fav-2",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
		isFavorite: true,
	},
	{
		id: "fav-3",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
		isFavorite: true,
	},
];

const DISCOVER_ACTIONS = [
	{
		id: "disc-1",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
	},
	{
		id: "disc-2",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
	},
	{
		id: "disc-3",
		category: "Performance & feedback",
		title: "Donner et recevoir du feedback efficacement",
		participants: "2-10 pers.",
		format: "Présentiel",
		duration: "30 min",
	},
];

const PARTICIPANTS = [
	{ id: "p-1", name: "Roger Durand", role: "Admin" },
	{ id: "p-2", name: "Roger Durand", role: "Admin" },
	{ id: "p-3", name: "Roger Durand", role: "Admin" },
	{ id: "p-4", name: "Roger Durand", role: "Admin" },
];

const stepIndicator = tv({
	base: "flex items-center justify-center px-2.5 py-2 rounded-full text-lg font-bold shrink-0",
	variants: {
		active: {
			true: "bg-gray-900 text-gray-40",
			false: "bg-gray-40 text-gray-500",
		},
	},
});

const stepLabel = tv({
	base: "text-sm font-bold border-b-2",
	variants: {
		active: {
			true: "text-gray-900 border-gray-900",
			false: "text-gray-500 border-transparent",
		},
	},
});

interface AddActionWizardProps {
	onClose: () => void;
}

export default function AddActionWizard({ onClose }: AddActionWizardProps) {
	const [currentStep, setCurrentStep] = useState(1);
	const [selectedAction, setSelectedAction] = useState<string | null>(null);

	return (
		<div className="flex flex-1 flex-col bg-gray-40 rounded-xl shadow-card-light p-5 overflow-y-auto min-w-0 min-h-0 h-[674px]">
			{/* Back button */}
			<button
				type="button"
				className="flex items-center gap-1 mb-5 cursor-pointer text-sm text-gray-900 hover:text-gray-700 transition-colors"
				onClick={onClose}
			>
				<ChevronLeft size={20} />
				Roadmap
			</button>

			{/* Title */}
			<div className="flex flex-col gap-2 mb-5">
				<h2 className="text-lg font-bold text-gray-900">Ajouter une action</h2>
				<p className="text-sm text-gray-900">
					Choisissez dans la bibliothèque ou créez une action personnalisée
				</p>
			</div>

			{/* Step indicators */}
			<div className="flex items-center gap-5 mb-5">
				{STEPS.map((step) => (
					<button
						key={step.number}
						type="button"
						className="flex items-center gap-2 cursor-pointer"
						onClick={() => {
							if (step.number < currentStep) setCurrentStep(step.number);
						}}
					>
						<span
							className={stepIndicator({
								active: currentStep === step.number,
							})}
						>
							{step.number}
						</span>
						<span
							className={stepLabel({
								active: currentStep === step.number,
							})}
						>
							{step.label}
						</span>
					</button>
				))}
			</div>

			{/* Step content */}
			{currentStep === 1 && (
				<StepChooseAction
					selectedAction={selectedAction}
					onSelect={setSelectedAction}
					onNext={() => setCurrentStep(2)}
				/>
			)}
			{currentStep === 2 && <StepPlanify onNext={() => setCurrentStep(3)} />}
			{currentStep === 3 && <StepParticipants onSave={onClose} />}
		</div>
	);
}

function Tag({ label }: { label: string }) {
	return (
		<span className="bg-gray-50 rounded-full px-3 py-1 text-xs font-bold text-gray-500">
			{label}
		</span>
	);
}

interface ActionPickCardProps {
	id: string;
	category: string;
	title: string;
	participants: string;
	format: string;
	duration: string;
	isFavorite?: boolean;
	selected: boolean;
	onSelect: (id: string) => void;
}

function ActionPickCard({
	id,
	category,
	title,
	participants,
	format,
	duration,
	isFavorite,
	selected,
	onSelect,
}: ActionPickCardProps) {
	return (
		<button
			type="button"
			className={`flex flex-1 flex-col gap-2 p-3.5 rounded-xl shadow-card-light cursor-pointer transition-colors min-w-0 ${
				selected
					? "bg-primary-40 border border-primary-200"
					: "bg-gray-40 border border-transparent hover:bg-gray-50"
			}`}
			onClick={() => onSelect(id)}
		>
			{/* Top: radio + favorite */}
			<div className="flex items-center justify-between w-full">
				<div
					className={`size-[19px] rounded-full border-2 ${
						selected ? "border-primary-500 bg-primary-500" : "border-gray-500"
					}`}
				/>
				{isFavorite && (
					<Heart size={20} className="text-gray-900 fill-gray-900" />
				)}
			</div>

			{/* Category badge */}
			<span className="inline-flex items-center border border-gray-500 rounded-full px-2 py-1 text-xs font-bold text-gray-500">
				{category}
			</span>

			{/* Title */}
			<p className="text-xs font-bold text-gray-900 text-left leading-normal">
				{title}
			</p>

			{/* Tags */}
			<div className="flex gap-1">
				<Tag label={participants} />
				<Tag label={format} />
				<Tag label={duration} />
			</div>
		</button>
	);
}

function StepChooseAction({
	selectedAction,
	onSelect,
	onNext,
}: {
	selectedAction: string | null;
	onSelect: (id: string) => void;
	onNext: () => void;
}) {
	return (
		<div className="flex flex-col gap-5 flex-1 min-h-0">
			{/* Search + custom action */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1.5 bg-gray-40 border border-gray-100 rounded-lg p-3.5 w-[300px]">
					<span className="text-sm text-gray-300 flex-1">Search</span>
					<Search size={20} className="text-gray-500" />
				</div>
				<button
					type="button"
					className="flex items-center gap-2 border border-gray-900 rounded-lg px-3.5 py-2 h-10 text-sm font-bold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors"
				>
					<Plus size={20} />
					Action personnalisée
				</button>
			</div>

			{/* Scrollable content */}
			<div className="flex flex-col gap-8 flex-1 overflow-y-auto min-h-0">
				{/* Favorites */}
				<div className="flex flex-col gap-3">
					<h3 className="text-sm font-bold text-gray-900">Vos favoris</h3>
					<div className="flex gap-2">
						{FAVORITE_ACTIONS.map((action) => (
							<ActionPickCard
								key={action.id}
								{...action}
								selected={selectedAction === action.id}
								onSelect={onSelect}
							/>
						))}
					</div>
				</div>

				{/* Discover */}
				<div className="flex flex-col gap-3">
					<h3 className="text-sm font-bold text-gray-900">
						Découvrez aussi ...
					</h3>
					<div className="flex gap-2">
						{DISCOVER_ACTIONS.map((action) => (
							<ActionPickCard
								key={action.id}
								{...action}
								selected={selectedAction === action.id}
								onSelect={onSelect}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Next button */}
			<div className="flex justify-end pt-2">
				<button
					type="button"
					className="bg-gray-900 text-gray-40 text-sm font-bold px-3.5 py-2 h-10 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
					onClick={onNext}
				>
					Suivant
				</button>
			</div>
		</div>
	);
}

function StepPlanify({ onNext }: { onNext: () => void }) {
	return (
		<div className="flex flex-col gap-5 flex-1 min-h-0">
			<div className="flex flex-col gap-5">
				{/* Date */}
				<div className="flex flex-col gap-2">
					<span className="text-sm font-bold text-gray-900">
						Date de l&apos;atelier
					</span>
					<div className="flex items-center gap-2 border border-gray-100 rounded-lg p-3.5 w-[300px]">
						<input
							type="text"
							placeholder="04/07/2025"
							className="text-sm text-gray-300 flex-1 bg-transparent outline-none"
						/>
						<Calendar size={20} className="text-gray-300" />
					</div>
				</div>

				{/* Time range */}
				<div className="flex gap-5">
					<div className="flex flex-col gap-2 flex-1">
						<span className="text-sm font-bold text-gray-900">Début</span>
						<div className="flex items-center gap-2 border border-gray-100 rounded-lg p-3.5">
							<input
								type="text"
								placeholder="9:30"
								className="text-sm text-gray-300 flex-1 bg-transparent outline-none"
							/>
							<Clock size={20} className="text-gray-300" />
						</div>
					</div>
					<div className="flex flex-col gap-2 flex-1">
						<span className="text-sm font-bold text-gray-900">Fin</span>
						<div className="flex items-center gap-2 border border-gray-100 rounded-lg p-3.5">
							<input
								type="text"
								placeholder="12:30"
								className="text-sm text-gray-300 flex-1 bg-transparent outline-none"
							/>
							<Clock size={20} className="text-gray-300" />
						</div>
					</div>
				</div>
			</div>

			{/* Next button */}
			<div className="flex justify-end mt-auto pt-2">
				<button
					type="button"
					className="bg-gray-900 text-gray-40 text-sm font-bold px-3.5 py-2 h-10 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
					onClick={onNext}
				>
					Suivant
				</button>
			</div>
		</div>
	);
}

function StepParticipants({ onSave }: { onSave: () => void }) {
	return (
		<div className="flex flex-col gap-5 flex-1 min-h-0">
			{/* Search */}
			<div className="flex items-center gap-1.5 bg-gray-40 border border-gray-100 rounded-lg p-3.5 w-[300px]">
				<span className="text-sm text-gray-300 flex-1">Search</span>
				<Search size={20} className="text-gray-500" />
			</div>

			{/* Participant list */}
			<div className="flex flex-col gap-2 flex-1 overflow-y-auto min-h-0">
				{PARTICIPANTS.map((participant) => (
					<div
						key={participant.id}
						className="flex items-center justify-between py-2"
					>
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center size-12 bg-gray-500 rounded-full text-gray-40 text-lg font-bold">
								{participant.name.charAt(0)}
							</div>
							<div className="flex flex-col">
								<span className="text-sm font-bold text-gray-900">
									{participant.name}
								</span>
								<span className="text-xs font-bold text-gray-500">
									{participant.role}
								</span>
							</div>
						</div>
						<button
							type="button"
							className="flex items-center gap-2 border border-gray-900 rounded-lg px-3.5 py-2 text-sm font-bold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors"
						>
							<Plus size={16} />
							Ajouter
						</button>
					</div>
				))}
			</div>

			{/* Save button */}
			<div className="flex justify-end pt-2">
				<button
					type="button"
					className="bg-primary-500 text-white text-sm font-bold px-3.5 py-2 h-10 rounded-lg cursor-pointer hover:bg-primary-600 transition-colors"
					onClick={onSave}
				>
					Enregistrer
				</button>
			</div>
		</div>
	);
}
