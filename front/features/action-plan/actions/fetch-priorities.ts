export type Priority = {
  index: number;
  label: string;
};

// TODO: Replace with apiFetch<Priority[]>("/action-plan/priorities")
export async function fetchPriorities(): Promise<Priority[]> {
  return [
    { index: 1, label: "Former les managers" },
    { index: 2, label: "Structurer le rôle des référents santé" },
    {
      index: 3,
      label: "Briser le tabou et instaurer une culture de la parole",
    },
  ];
}
