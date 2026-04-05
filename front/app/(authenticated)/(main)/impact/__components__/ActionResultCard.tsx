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
		<div className="flex flex-1 flex-col bg-gray-40 rounded-xl p-3 shadow-card-light min-w-0 overflow-hidden">
		<div className="flex flex-col gap-3.5 bg-gray-40 border border-gray-50 rounded-xl p-3.5 w-full">
			{/* Header */}
			<div className="flex items-start justify-between gap-2">
				<div className="flex items-start gap-2">
					<Presentation size={24} className="text-gray-900 shrink-0" />
					<h3 className="text-base font-bold text-gray-900">{title}</h3>
				</div>
				<span className="flex items-center gap-1 bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-3xl shrink-0">
					<CheckCircle size={18} />
					{status}
				</span>
			</div>

			{/* Tags */}
			<div className="flex items-center gap-1">
				<span className="border border-gray-100 rounded-full px-3 py-1 text-xs font-bold text-gray-500">
					{date}
				</span>
				<span className="border border-gray-100 rounded-full px-3 py-1 text-xs font-bold text-gray-500">
					{team}
				</span>
				<span className="flex items-center gap-1 border border-gray-100 rounded-full px-3 py-1 text-xs font-bold text-gray-500">
					<Users size={18} />
					{participants} participants
				</span>
			</div>

			{/* Key indicators */}
			<div className="flex flex-col gap-1">
				<h4 className="text-sm font-bold text-gray-500">Indicateurs clés</h4>
				<div className="flex items-stretch gap-3">
					<div className="flex flex-col justify-between bg-gray-50 border border-gray-100 rounded-xl p-3 overflow-hidden">
						<span className="text-xs font-bold text-gray-900">
							Note de l&apos;atelier
						</span>
						<span className="text-4xl font-bold text-gray-500">{rating}</span>
					</div>
					<div className="flex flex-col justify-between bg-gray-50 border border-gray-100 rounded-xl p-3 flex-1 min-w-0 overflow-hidden">
						<span className="text-xs font-bold text-gray-900">
							Commentaires
						</span>
						<div className="flex items-end justify-between">
							<span className="text-4xl font-bold text-gray-500">
								{comments}
							</span>
							<button
								type="button"
								className="flex items-center justify-center size-11 border border-gray-900 rounded-full shrink-0 cursor-pointer hover:bg-gray-100 transition-colors"
							>
								<Eye size={24} className="text-gray-900" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	);
}
