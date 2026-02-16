export interface WithId {
  id: string;
}

/**
 * Replaces only the visible slots in a full list with a reordered visible subset.
 * Hidden items keep their relative positions.
 */
export function mergeReorderedSubset<T extends WithId>(
  fullItems: T[],
  visibleBeforeReorder: T[],
  visibleAfterReorder: T[]
): T[] {
  if (visibleBeforeReorder.length === 0) return fullItems;

  const beforeIds = visibleBeforeReorder.map((item) => item.id);
  const beforeSet = new Set(beforeIds);
  const afterFiltered = visibleAfterReorder.filter((item) => beforeSet.has(item.id));

  if (afterFiltered.length !== beforeIds.length) {
    return fullItems;
  }

  const visibleSlots: number[] = [];
  fullItems.forEach((item, index) => {
    if (beforeSet.has(item.id)) {
      visibleSlots.push(index);
    }
  });

  if (visibleSlots.length !== beforeIds.length) {
    return fullItems;
  }

  const merged = [...fullItems];
  visibleSlots.forEach((slot, index) => {
    merged[slot] = afterFiltered[index];
  });

  return merged;
}

