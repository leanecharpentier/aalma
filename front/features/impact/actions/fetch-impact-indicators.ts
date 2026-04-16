export type Indicator = {
  label: string;
  value: number;
  unit: string;
  change: string;
  trend: "up" | "down";
};

export type EvolutionPoint = {
  x: number;
  y: number;
  label: string;
};

export type ImpactIndicatorsData = {
  indicators: Indicator[];
  evolution: EvolutionPoint[];
};

// TODO: Replace with apiFetch<ImpactIndicatorsData>("/impact/indicators")
export async function fetchImpactIndicators(): Promise<ImpactIndicatorsData> {
  return {
    indicators: [
      {
        label: "Score\naalma",
        value: 75,
        unit: "sur 100",
        change: "+5.6%",
        trend: "up",
      },
      {
        label: "Niveau\nde stress",
        value: 85,
        unit: "sur 100",
        change: "2.3%",
        trend: "down",
      },
      {
        label: "Charge\nde travail",
        value: 92,
        unit: "sur 100",
        change: "+4.1%",
        trend: "up",
      },
    ],
    evolution: [
      { x: 40, y: 100, label: "2025" },
      { x: 140, y: 90, label: "2025" },
      { x: 240, y: 88, label: "" },
      { x: 340, y: 70, label: "2026" },
    ],
  };
}
