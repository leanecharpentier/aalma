import { CheckCircle, Eye, Presentation, Users } from "lucide-react";

interface ActionResultCardProps {
	title: string;
	status: string;
	date: string;
	team: string;
	participants: number;
	rating: string;
	comments: number;
}

export default function ActionResultCard({
	title,
	status,
	date,
	team,
	participants,
	rating,
	comments,
}: ActionResultCardProps) {
	return (
		<div className="flex flex-1 flex-col gap-3 bg-gray-40 rounded-xl p-5 shadow-card-light min-w-0">
			{/* Header */}
			<div className="flex items-start justify-between gap-2">
				<div className="flex items-center gap-2">
					<Presentation size={20} className="text-gray-500 shrink-0" />
					<h3 className="text-sm font-bold text-gray-900">{title}</h3>
				</div>
				<span className="flex items-center gap-1 bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-full shrink-0">
					<CheckCircle size={12} />
					{status}
				</span>
			</div>

			{/* Tags */}
			<div className="flex items-center gap-1">
				<span className="bg-gray-50 rounded-full px-3 py-1 text-xs font-bold text-gray-500">
					{date}
				</span>
				<span className="bg-gray-50 rounded-full px-3 py-1 text-xs font-bold text-gray-500">
					{team}
				</span>
				<span className="flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1 text-xs font-bold text-gray-500">
					<Users size={12} />
					{participants} participants
				</span>
			</div>

			{/* Key indicators */}
			<div className="flex flex-col gap-2">
				<h4 className="text-xs font-bold text-gray-900">Indicateurs clés</h4>
				<div className="flex items-end gap-2">
					<div className="flex flex-col gap-1 bg-gray-50 border border-gray-100 rounded-xl p-3 flex-1 min-w-0">
						<span className="text-xs text-gray-500">
							Note de l&apos;atelier
						</span>
						<span className="text-3xl font-bold text-gray-900">{rating}</span>
					</div>
					<div className="flex flex-col gap-1 bg-gray-50 border border-gray-100 rounded-xl p-3 flex-1 min-w-0">
						<span className="text-xs text-gray-500">Commentaires</span>
						<span className="text-3xl font-bold text-gray-900">{comments}</span>
					</div>
					<button
						type="button"
						className="flex items-center justify-center size-11 border border-gray-200 rounded-full shrink-0 cursor-pointer hover:bg-gray-50 transition-colors"
					>
						<Eye size={20} className="text-gray-500" />
					</button>
				</div>
			</div>
		</div>
	);
}
