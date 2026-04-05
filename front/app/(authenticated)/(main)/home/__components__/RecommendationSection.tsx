import { Eye, Presentation } from "lucide-react";

const RECOMMENDATIONS = [
	"Formations des managers aux pratique de la reconnaissance",
	"Formations des managers aux pratique de la reconnaissance",
	"Formations des managers aux pratique de la reconnaissance",
];

function RecommendationCard({ text }: { text: string }) {
	return (
		<div className="flex items-center gap-2 bg-primary-500 border border-primary-600 rounded-xl p-3">
			<div className="flex flex-1 flex-col gap-2 min-w-0">
				<Presentation size={20} className="text-primary-40 shrink-0" />
				<p className="text-xs font-bold text-primary-40 leading-normal">
					{text}
				</p>
			</div>
			<button
				type="button"
				className="flex items-center justify-center size-11 border border-gray-40 rounded-full shrink-0 cursor-pointer hover:bg-primary-600 transition-colors"
			>
				<Eye size={20} className="text-gray-40" />
			</button>
		</div>
	);
}

export default function RecommendationSection() {
	return (
		<div className="relative flex flex-col gap-2 w-[470px] shrink-0 bg-primary-40 border border-primary-200 rounded-xl p-3.5 shadow-orange-glow overflow-hidden">
			<div className="flex flex-col gap-2 py-2 z-10">
				<div className="flex flex-col gap-2">
					<h2 className="text-base font-bold text-gray-900">Recommandation</h2>
					<p className="text-xs text-gray-900">Priorisation des taches</p>
				</div>

				<div className="flex flex-col gap-2">
					{RECOMMENDATIONS.map((text) => (
						<RecommendationCard key={text} text={text} />
					))}
				</div>
			</div>

			{/* Decorative halo */}
			<div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-gradient-radial from-primary-300/40 to-transparent pointer-events-none" />
		</div>
	);
}
