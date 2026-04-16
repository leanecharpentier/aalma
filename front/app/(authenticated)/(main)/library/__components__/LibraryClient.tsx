"use client";

import { useState } from "react";
import type { ActionDetailData } from "@/features/library/actions/fetch-action-detail";
import type { LibraryAction } from "@/features/library/actions/fetch-library-actions";
import ActionCard from "./ActionCard";
import ActionDetail from "./ActionDetail";
import FilterBar from "./FilterBar";

interface LibraryClientProps {
  actions: LibraryAction[];
  defaultDetail: ActionDetailData;
}

export default function LibraryClient({
  actions,
  defaultDetail,
}: LibraryClientProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  if (selectedAction) {
    return (
      <ActionDetail
        onBack={() => setSelectedAction(null)}
        data={defaultDetail}
      />
    );
  }

  return (
    <main className="flex flex-col gap-5 h-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Librairie d&apos;action
        </h1>
        <p className="text-lg text-gray-900">
          Découvrez et ajoutez des actions sur le bien-être à votre plan
          d&apos;action
        </p>
      </div>
      <FilterBar count={actions.length} />
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid grid-cols-3 gap-5">
          {actions.map((action) => (
            <ActionCard
              key={action.id}
              {...action}
              onDiscover={() => setSelectedAction(action.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
