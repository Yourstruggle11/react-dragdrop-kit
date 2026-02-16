import type { DraggableItem, OrderUpdate } from '../types';

export function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function normalizeDestinationIndex(params: {
  itemCount: number;
  sourceIndex: number;
  rawDestinationIndex: number;
  isSameList: boolean;
}): number {
  const { itemCount, sourceIndex, rawDestinationIndex, isSameList } = params;

  if (itemCount <= 0) return 0;

  const maxRaw = itemCount;
  const clampedRaw = Math.max(0, Math.min(rawDestinationIndex, maxRaw));
  const adjusted = isSameList && sourceIndex < clampedRaw ? clampedRaw - 1 : clampedRaw;
  const maxFinal = isSameList ? itemCount - 1 : itemCount;

  return Math.max(0, Math.min(adjusted, maxFinal));
}

export function reorderMany<T>(list: T[], selectedIndexes: number[], rawDestinationIndex: number): T[] {
  const uniqueIndexes = Array.from(
    new Set(selectedIndexes.filter((index) => index >= 0 && index < list.length))
  ).sort((a, b) => a - b);

  if (uniqueIndexes.length === 0) return list;

  const selectedSet = new Set(uniqueIndexes);
  const moving = uniqueIndexes.map((index) => list[index]);
  const remaining = list.filter((_, index) => !selectedSet.has(index));

  const clampedRaw = Math.max(0, Math.min(rawDestinationIndex, list.length));
  const removedBeforeDestination = uniqueIndexes.filter((index) => index < clampedRaw).length;
  const insertionIndex = Math.max(
    0,
    Math.min(clampedRaw - removedBeforeDestination, remaining.length)
  );

  const result = [...remaining];
  result.splice(insertionIndex, 0, ...moving);
  return result;
}

export function calculateOrderUpdates<T extends DraggableItem>(oldItems: T[], newItems: T[]): OrderUpdate[] {
  const oldIndexById = new Map(oldItems.map((item, index) => [item.id, index]));

  return newItems.flatMap((item, index) => {
    const oldIndex = oldIndexById.get(item.id);
    if (oldIndex === undefined || oldIndex === index) return [];
    return [{ id: item.id, newPosition: index, moved: true }];
  });
}
