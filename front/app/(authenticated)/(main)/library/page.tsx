import { fetchActionDetail } from "@/features/library/actions/fetch-action-detail";
import { fetchLibraryActions } from "@/features/library/actions/fetch-library-actions";
import LibraryClient from "./__components__/LibraryClient";

export default async function Library() {
  const [actions, detail] = await Promise.all([
    fetchLibraryActions(),
    fetchActionDetail("1"),
  ]);

  return <LibraryClient actions={actions} defaultDetail={detail} />;
}
