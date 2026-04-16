export type ProgressBarData = {
  label: string;
  value: number;
};

export type UpcomingAction = {
  title: string;
  date: string;
  time: string;
  participants: number;
};

export type ImprovementsData = {
  bars: ProgressBarData[];
  upcomingActions: UpcomingAction[];
};

// TODO: Replace with apiFetch<ImprovementsData>("/dashboard/improvements")
export async function fetchImprovements(): Promise<ImprovementsData> {
  return {
    bars: [
      { label: "Stress", value: 50 },
      { label: "Engagement", value: 40 },
      { label: "Charge de travail", value: 50 },
    ],
    upcomingActions: [
      {
        title: "Formation PSSM",
        date: "15 avril",
        time: "14h",
        participants: 13,
      },
      {
        title: "Formation PSSM",
        date: "15 avril",
        time: "14h",
        participants: 13,
      },
    ],
  };
}
