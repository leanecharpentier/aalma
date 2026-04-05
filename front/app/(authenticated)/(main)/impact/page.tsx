import ActionResultCard from "./__components__/ActionResultCard";
import ImpactSummaryCard from "./__components__/ImpactSummaryCard";
import RadarComparisonCard from "./__components__/RadarComparisonCard";
import RoiCard from "./__components__/RoiCard";

const ACTION_RESULTS = [
	{
		title: "Programme pilote de pleine conscience",
		status: "Positif",
		date: "15.01.2026",
		team: "Marketing",
		participants: 18,
		rating: "4,3/5",
		comments: 8,
	},
	{
		title: "Programme pilote de pleine conscience",
		status: "Positif",
		date: "15.01.2026",
		team: "Marketing",
		participants: 18,
		rating: "4,3/5",
		comments: 8,
	},
	{
		title: "Programme pilote de pleine conscience",
		status: "Positif",
		date: "15.01.2026",
		team: "Marketing",
		participants: 18,
		rating: "4,3/5",
		comments: 8,
	},
];

export default function Impact() {
	return (
		<main className="flex flex-col gap-5 h-full">
			{/* Header */}
			<div className="flex flex-col gap-2">
				<h1 className="text-[28px] font-bold text-gray-900">
					Impact des actions
				</h1>
				<p className="text-lg text-gray-900">Résultats des actions menées</p>
			</div>

			{/* Top row: Summary + Radar + ROI */}
			<div className="flex gap-5 min-h-0">
				<ImpactSummaryCard />
				<RadarComparisonCard />
				<RoiCard />
			</div>

			{/* Bottom: Individual action results */}
			<div className="flex flex-col gap-3">
				<h2 className="text-base font-bold text-gray-900">
					Résultats des actions individuelles
				</h2>
				<div className="flex gap-5">
					{ACTION_RESULTS.map((result) => (
						<ActionResultCard key={result.title} {...result} />
					))}
				</div>
			</div>
		</main>
	);
}
