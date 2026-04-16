export type Recommendation = {
  id: string;
  text: string;
};

// TODO: Replace with apiFetch<Recommendation[]>("/dashboard/recommendations")
export async function fetchRecommendations(): Promise<Recommendation[]> {
  return [
    {
      id: "rec-1",
      text: "Formations des managers aux pratique de la reconnaissance",
    },
    {
      id: "rec-2",
      text: "Formations des managers aux pratique de la reconnaissance",
    },
    {
      id: "rec-3",
      text: "Formations des managers aux pratique de la reconnaissance",
    },
  ];
}
