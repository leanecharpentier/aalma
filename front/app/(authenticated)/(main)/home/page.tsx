import BlogSection from "./__components__/BlogSection";
import ImprovementSection from "./__components__/ImprovementSection";
import RecommendationSection from "./__components__/RecommendationSection";
import ScoreSection from "./__components__/ScoreSection";

export default function Home() {
	return (
		<main className="flex flex-col gap-5 h-full min-h-[700px]">
			{/* Top row: Score + Improvement */}
			<div className="flex gap-5 flex-1 min-h-0">
				<ScoreSection />
				<ImprovementSection />
			</div>

			{/* Bottom row: Recommendations + Blog */}
			<div className="flex gap-5 flex-1 min-h-0">
				<RecommendationSection />
				<BlogSection />
			</div>
		</main>
	);
}
