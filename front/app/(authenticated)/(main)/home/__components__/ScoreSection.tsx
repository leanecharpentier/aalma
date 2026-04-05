import RadarChart from "./RadarChart";

const LEGEND_LEFT = [
  { label: "Stresse", color: "bg-green-600" },
  { label: "Reconnaissance", color: "bg-green-600" },
  { label: "Engagement", color: "bg-red-600" },
];

const LEGEND_RIGHT = [
  { label: "Relation d'equipe", color: "bg-green-600" },
  { label: "Charge de travail", color: "bg-yellow-500" },
  { label: "Vie perso/pro", color: "bg-green-600" },
];

function LegendItem({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className={`size-2 rounded-full ${color}`} />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

export default function ScoreSection() {
  return (
    <div className="flex flex-1 gap-3 bg-gray-40 rounded-xl p-5 overflow-hidden min-w-0">
      {/* Radar chart side */}
      <div className="flex w-1/2 flex-col justify-between items-center">
        <h2 className="text-base mr-auto font-bold text-gray-900">
          Score global aalma
        </h2>

        <RadarChart />

        {/* Legend */}
        <div className="flex justify-evenly w-full">
          <div className="flex flex-col gap-0.5">
            {LEGEND_LEFT.map((item) => (
              <LegendItem key={item.label} {...item} />
            ))}
          </div>
          <div className="flex flex-col gap-0.5">
            {LEGEND_RIGHT.map((item) => (
              <LegendItem key={item.label} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Score display */}
      <div className="flex w-1/2 flex-col items-center justify-center gap-3 border border-gray-100 rounded-xl p-2.5 min-w-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
        <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-full">
          Stable
        </span>

        <div className="flex flex-col items-center gap-2">
          <span className="text-7xl font-bold text-primary-500">72</span>
          <span className="text-sm text-gray-500">sur 100</span>
        </div>

        <span className="bg-gray-50 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">
          +3 points ce trimestre
        </span>
      </div>
    </div>
  );
}
