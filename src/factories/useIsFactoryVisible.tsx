import { useSelector } from "react-redux";
import { RootState } from "../core/store";

export function useIsFactoryVisible(
  factoryId: string,
  isRoot: boolean,
  resource?: string | null | undefined
) {
  const filters = useSelector((state: RootState) => state.factories.filters);
  const factories = useSelector(
    (state: RootState) => state.factories.factories
  );
  const source = factories.find((f) => f.id === factoryId);
  console.log(filters);

  if (
    filters?.name &&
    !source?.name?.toLowerCase().includes(filters.name?.toLowerCase() ?? "")
  ) {
    return false;
  }

  if (filters?.resource && !isRoot && resource !== filters.resource) {
    return false;
  }

  if (
    filters?.resource &&
    isRoot &&
    (source?.outputs ?? []).filter((o) => o.resource === filters.resource)
      .length === 0 &&
    (source?.inputs ?? []).filter((i) => i.resource === filters.resource)
      .length === 0
  ) {
    return false;
  }

  return true;
}