export type RoadmapAction = {
  id: string;
  title: string;
  date: string;
  time: string;
  priorityIndex: number;
  monthIndex: number;
};

// TODO: Replace with apiFetch<RoadmapAction[]>("/action-plan/actions")
export async function fetchRoadmapActions(): Promise<RoadmapAction[]> {
  return [
    {
      id: "ra-1",
      title: "Gérer la charge et prévenir l'épuisement",
      date: "2 janvier",
      time: "15h30",
      priorityIndex: 0,
      monthIndex: 0,
    },
    {
      id: "ra-2",
      title: "Mener un entretien de soutien",
      date: "15 mars",
      time: "14h",
      priorityIndex: 0,
      monthIndex: 2,
    },
    {
      id: "ra-3",
      title: "Formation PSSM",
      date: "15 avril",
      time: "11h45",
      priorityIndex: 1,
      monthIndex: 3,
    },
    {
      id: "ra-4",
      title: "Café bien-être mensuel",
      date: "5 avril",
      time: "10h20",
      priorityIndex: 2,
      monthIndex: 3,
    },
    {
      id: "ra-5",
      title: "Campagne de sensibilisation interne",
      date: "12 mai",
      time: "9h",
      priorityIndex: 2,
      monthIndex: 4,
    },
  ];
}
