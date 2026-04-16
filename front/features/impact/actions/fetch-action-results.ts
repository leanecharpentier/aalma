export type ActionResult = {
  id: string;
  title: string;
  status: string;
  date: string;
  team: string;
  participants: number;
  rating: string;
  comments: number;
};

// TODO: Replace with apiFetch<ActionResult[]>("/impact/action-results")
export async function fetchActionResults(): Promise<ActionResult[]> {
  return [
    {
      id: "ar-1",
      title: "Programme pilote de pleine conscience",
      status: "Positif",
      date: "15.01.2026",
      team: "Marketing",
      participants: 18,
      rating: "4,3/5",
      comments: 8,
    },
    {
      id: "ar-2",
      title: "Programme pilote de pleine conscience",
      status: "Positif",
      date: "15.01.2026",
      team: "Marketing",
      participants: 18,
      rating: "4,3/5",
      comments: 8,
    },
    {
      id: "ar-3",
      title: "Programme pilote de pleine conscience",
      status: "Positif",
      date: "15.01.2026",
      team: "Marketing",
      participants: 18,
      rating: "4,3/5",
      comments: 8,
    },
  ];
}
