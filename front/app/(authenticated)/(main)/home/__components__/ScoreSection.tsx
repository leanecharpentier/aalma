import type { ScoreData } from "@/features/dashboard/actions/fetch-score";
import RadarChart from "./RadarChart";

function LegendItem({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className={`size-2 rounded-full ${color}`} />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

interface ScoreSectionProps {
  data: ScoreData;
}

export default function ScoreSection({ data }: ScoreSectionProps) {
  return (
    <div className="flex flex-1 gap-3 bg-gray-40 rounded-xl p-5 overflow-hidden min-w-0">
      {/* Radar chart side */}
      <div className="flex w-1/2 flex-col justify-between items-center">
        <h2 className="text-base mr-auto font-bold text-gray-900">
          Score global aalma
        </h2>

        <RadarChart dimensions={data.dimensions} />

        {/* Legend */}
        <div className="flex justify-evenly w-full">
          <div className="flex flex-col gap-0.5">
            {data.legendLeft.map((item) => (
              <LegendItem key={item.label} {...item} />
            ))}
          </div>
          <div className="flex flex-col gap-0.5">
            {data.legendRight.map((item) => (
              <LegendItem key={item.label} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Score display */}
      <div className="flex w-1/2 flex-col items-center justify-center gap-3 border border-gray-100 rounded-xl p-2.5 min-w-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
        <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-full">
          {data.status}
        </span>

        <div className="flex flex-col items-center gap-2">
          <span className="text-7xl font-bold text-primary-500">
            {data.score}
          </span>
          <span className="text-sm text-gray-500">sur {data.max}</span>
        </div>

        <span className="bg-gray-50 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">
          {data.trend}
        </span>
      </div>
    </div>
  );
}
