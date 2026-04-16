import { fetchBlogArticles } from "@/features/dashboard/actions/fetch-blog-articles";
import { fetchImprovements } from "@/features/dashboard/actions/fetch-improvements";
import { fetchRecommendations } from "@/features/dashboard/actions/fetch-recommendations";
import { fetchScore } from "@/features/dashboard/actions/fetch-score";
import { fetchTeams } from "@/features/teams/actions/fetch-teams";
import BlogSection from "./__components__/BlogSection";
import ImprovementSection from "./__components__/ImprovementSection";
import RecommendationSection from "./__components__/RecommendationSection";
import ScoreSection from "./__components__/ScoreSection";

export default async function Home() {
  const [score, improvements, recommendations, articles, teams] =
    await Promise.all([
      fetchScore(),
      fetchImprovements(),
      fetchRecommendations(),
      fetchBlogArticles(),
      fetchTeams(),
    ]);

  const teamsWithScores = teams.slice(0, 3).map((team) => ({
    name: team.name,
    score: 34, // TODO: Replace with real score from GET /team/top
  }));

  return (
    <main className="flex flex-col gap-5 h-full min-h-175">
      <div className="flex gap-5 flex-1 min-h-0">
        <ScoreSection data={score} />
        <ImprovementSection
          improvements={improvements}
          teams={teamsWithScores}
        />
      </div>
      <div className="flex gap-5 flex-1 min-h-0">
        <RecommendationSection recommendations={recommendations} />
        <BlogSection articles={articles} />
      </div>
    </main>
  );
}
