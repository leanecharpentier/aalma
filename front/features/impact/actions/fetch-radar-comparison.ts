export type RadarComparisonDimension = {
  label: string;
  valueBefore: number;
  valueAfter: number;
};

// TODO: Replace with apiFetch<RadarComparisonDimension[]>("/impact/radar-comparison")
export async function fetchRadarComparison(): Promise<
  RadarComparisonDimension[]
> {
  return [
    { label: "90", valueBefore: 75, valueAfter: 90 },
    { label: "84", valueBefore: 70, valueAfter: 84 },
    { label: "92", valueBefore: 80, valueAfter: 92 },
    { label: "65", valueBefore: 55, valueAfter: 65 },
    { label: "72", valueBefore: 60, valueAfter: 72 },
    { label: "76", valueBefore: 65, valueAfter: 76 },
  ];
}
