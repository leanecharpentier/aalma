import PriorityPill from "./__components__/PriorityPill";
import RecommendationPanel from "./__components__/RecommendationPanel";
import RoadmapTimeline from "./__components__/RoadmapTimeline";
import SegmentedControl from "./__components__/SegmentedControl";

const PRIORITIES = [
	{ index: 1, label: "Former les managers" },
	{ index: 2, label: "Structurer le rôle des référents santé" },
	{
		index: 3,
		label: "Briser le tabou et instaurer une culture de la parole",
	},
];

export default function ActionPlan() {
	return (
		<main className="flex flex-col gap-5 h-full">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-bold text-gray-900">
						Plan d&apos;action
					</h1>
					<p className="text-lg text-gray-900">
						Créer ton plan d&apos;action sur 12 mois
					</p>
				</div>
				<SegmentedControl
					options={["Globale", "Manager"]}
					defaultValue="Globale"
					variant="dark"
				/>
			</div>

			{/* Priorities */}
			<div className="flex flex-col gap-3 py-2">
				<h2 className="text-xl font-bold text-gray-900">Priorités</h2>
				<div className="flex gap-5 flex-wrap">
					{PRIORITIES.map((priority) => (
						<PriorityPill key={priority.index} {...priority} />
					))}
				</div>
			</div>

			{/* Main content: Roadmap + Recommendations */}
			<div className="flex flex-1 gap-5 min-h-0">
				<RoadmapTimeline />
				<RecommendationPanel />
			</div>
		</main>
	);
}
