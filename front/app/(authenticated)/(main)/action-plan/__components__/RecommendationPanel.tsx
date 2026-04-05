import { Eye, Plus, Presentation } from "lucide-react";

const RECOMMENDATIONS = [
	"Formations des managers aux pratique de la reconnaissance",
	"Formations des managers aux pratique de la reconnaissance",
	"Formations des managers aux pratique de la reconnaissance",
];

function RecommendationCard({ text }: { text: string }) {
	return (
		<div className="flex flex-1 flex-col gap-2 bg-primary-500 border border-primary-600 rounded-xl p-3 min-h-0">
			<div className="flex flex-col gap-2">
				<Presentation size={20} className="text-primary-40 shrink-0" />
				<p className="text-xs font-bold text-primary-40 leading-normal">
					{text}
				</p>
			</div>
			<div className="flex items-center gap-2">
				<button
					type="button"
					className="flex items-center justify-center size-11 border border-gray-40 rounded-full shrink-0 cursor-pointer hover:bg-primary-600 transition-colors"
				>
					<Eye size={20} className="text-gray-40" />
				</button>
				<button
					type="button"
					className="flex items-center justify-center size-11 border border-gray-40 rounded-full shrink-0 cursor-pointer hover:bg-primary-600 transition-colors"
				>
					<Plus size={20} className="text-gray-40" />
				</button>
			</div>
		</div>
	);
}

export default function RecommendationPanel() {
	return (
		<div className="relative flex flex-col bg-gray-40 rounded-xl p-5 shadow-card-light shrink-0 w-80 h-full">
			<div className="relative flex flex-1 flex-col gap-2 bg-primary-40 border border-primary-200 rounded-xl p-3.5 shadow-orange-glow overflow-hidden min-h-0">
				<div className="flex flex-col gap-2 py-2 z-10 h-full">
					<div className="flex flex-col gap-2">
						<h3 className="text-base font-bold text-gray-900">
							Recommandation
						</h3>
						<p className="text-xs text-gray-900">Priorisation des tâches</p>
					</div>

					<div className="flex flex-1 flex-col gap-2 min-h-0">
						{RECOMMENDATIONS.map((text) => (
							<RecommendationCard key={text} text={text} />
						))}
					</div>
				</div>

				{/* Decorative halo */}
				<div className="absolute top-0 right-0 w-88 h-88 rounded-full bg-gradient-radial from-primary-300/40 to-transparent pointer-events-none" />
			</div>
		</div>
	);
}
