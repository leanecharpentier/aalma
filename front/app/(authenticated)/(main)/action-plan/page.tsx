import { fetchCatalogActions } from "@/features/action-plan/actions/fetch-catalog-actions";
import { fetchPriorities } from "@/features/action-plan/actions/fetch-priorities";
import { fetchRoadmapActions } from "@/features/action-plan/actions/fetch-roadmap-actions";
import { fetchRecommendations } from "@/features/dashboard/actions/fetch-recommendations";
import { fetchUsers } from "@/features/users/actions/fetch-users";
import PriorityPill from "./__components__/PriorityPill";
import RecommendationPanel from "./__components__/RecommendationPanel";
import RoadmapTimeline from "./__components__/RoadmapTimeline";
import SegmentedControl from "./__components__/SegmentedControl";

export default async function ActionPlan() {
  const [priorities, roadmapActions, catalogActions, recommendations, users] =
    await Promise.all([
      fetchPriorities(),
      fetchRoadmapActions(),
      fetchCatalogActions(),
      fetchRecommendations(),
      fetchUsers(),
    ]);

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
          {priorities.map((priority) => (
            <PriorityPill key={priority.index} {...priority} />
          ))}
        </div>
      </div>

      {/* Main content: Roadmap + Recommendations */}
      <div className="flex flex-1 gap-5 min-h-0">
        <RoadmapTimeline
          priorities={priorities}
          actions={roadmapActions}
          catalogActions={catalogActions}
          participants={users}
          recommendations={recommendations}
        />
        <RecommendationPanel recommendations={recommendations} />
      </div>
    </main>
  );
}
