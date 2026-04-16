import { fetchActionResults } from "@/features/impact/actions/fetch-action-results";
import { fetchImpactIndicators } from "@/features/impact/actions/fetch-impact-indicators";
import { fetchRadarComparison } from "@/features/impact/actions/fetch-radar-comparison";
import { fetchRoi } from "@/features/impact/actions/fetch-roi";
import ActionResultCard from "./__components__/ActionResultCard";
import ImpactSummaryCard from "./__components__/ImpactSummaryCard";
import RadarComparisonCard from "./__components__/RadarComparisonCard";
import RoiCard from "./__components__/RoiCard";

export default async function Impact() {
  const [indicators, radarComparison, roi, actionResults] = await Promise.all([
    fetchImpactIndicators(),
    fetchRadarComparison(),
    fetchRoi(),
    fetchActionResults(),
  ]);

  return (
    <main className="flex flex-col gap-5 h-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Impact des actions</h1>
        <p className="text-lg text-gray-900">Résultats des actions menées</p>
      </div>

      {/* Top row: Summary + Radar + ROI */}
      <div className="flex gap-5 min-h-0">
        {/* Left card: Summary + Radar side by side */}
        <div className="flex flex-1 gap-5 bg-gray-40 rounded-xl p-5 shadow-card-light min-w-0">
          <ImpactSummaryCard data={indicators} />
          <RadarComparisonCard dimensions={radarComparison} />
        </div>
        <RoiCard data={roi} />
      </div>

      {/* Bottom: Individual action results */}
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-gray-900">
          Résultats des actions individuelles
        </h2>
        <div className="flex gap-5">
          {actionResults.map((result) => (
            <ActionResultCard key={result.id} {...result} />
          ))}
        </div>
      </div>
    </main>
  );
}
