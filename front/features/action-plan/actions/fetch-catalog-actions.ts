export type CatalogAction = {
  id: string;
  category: string;
  title: string;
  participants: string;
  format: string;
  duration: string;
  isFavorite?: boolean;
};

// TODO: Replace with apiFetch<...>("/action-plan/catalog")
export async function fetchCatalogActions(): Promise<{
  favorites: CatalogAction[];
  discover: CatalogAction[];
}> {
  const base: Omit<CatalogAction, "id" | "isFavorite"> = {
    category: "Performance & feedback",
    title: "Donner et recevoir du feedback efficacement",
    participants: "2-10 pers.",
    format: "Présentiel",
    duration: "30 min",
  };

  return {
    favorites: [
      { ...base, id: "fav-1", isFavorite: true },
      { ...base, id: "fav-2", isFavorite: true },
      { ...base, id: "fav-3", isFavorite: true },
    ],
    discover: [
      { ...base, id: "disc-1" },
      { ...base, id: "disc-2" },
      { ...base, id: "disc-3" },
    ],
  };
}
