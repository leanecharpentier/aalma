export type LegendItem = {
  label: string;
  color: string;
};

export type RadarDimension = {
  label: string;
  value: number;
};

export type ScoreData = {
  score: number;
  max: number;
  status: string;
  trend: string;
  legendLeft: LegendItem[];
  legendRight: LegendItem[];
  dimensions: RadarDimension[];
};

// TODO: Replace with apiFetch<ScoreData>("/dashboard/score")
export async function fetchScore(): Promise<ScoreData> {
  return {
    score: 72,
    max: 100,
    status: "Stable",
    trend: "+3 points ce trimestre",
    legendLeft: [
      { label: "Stresse", color: "bg-green-600" },
      { label: "Reconnaissance", color: "bg-green-600" },
      { label: "Engagement", color: "bg-red-600" },
    ],
    legendRight: [
      { label: "Relation d'equipe", color: "bg-green-600" },
      { label: "Charge de travail", color: "bg-yellow-500" },
      { label: "Vie perso/pro", color: "bg-green-600" },
    ],
    dimensions: [
      { label: "Stresse", value: 90 },
      { label: "Reconnaissance", value: 84 },
      { label: "Vie perso/pro", value: 92 },
      { label: "Relation d'equipe", value: 72 },
      { label: "Charge de travail", value: 65 },
      { label: "Engagement", value: 76 },
    ],
  };
}
