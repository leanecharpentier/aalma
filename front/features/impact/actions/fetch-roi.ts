export type RoiEvolutionPoint = {
  label: string;
  x: number;
  y: number;
};

export type RoiData = {
  roi: string;
  comparison: string;
  actionCost: string;
  estimatedGains: string;
  evolution: RoiEvolutionPoint[];
};

// TODO: Replace with apiFetch<RoiData>("/impact/roi")
export async function fetchRoi(): Promise<RoiData> {
  return {
    roi: "3.2x",
    comparison: "+0,4× vs 2025",
    actionCost: "18 400€",
    estimatedGains: "58 900€",
    evolution: [
      { label: "Jan 2025", x: 80, y: 55 },
      { label: "Juil 2025", x: 155, y: 45 },
      { label: "Janv 2026", x: 230, y: 28 },
    ],
  };
}
