import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import type { ElementEventPayloadMap } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { DraggableItem } from "../types";
import { reorder, reorderMany, normalizeDestinationIndex } from "../utils/order";

export type ListDirection = "vertical" | "horizontal";
export const DEFAULT_DIRECTION: ListDirection = "vertical";

export type MonitorOptions = {
  direction: ListDirection;
  selectedIds: string[];
  multiDragEnabled: boolean;
  liveReorder: boolean;
};

export type DestinationInfo = {
  rawDestinationIndex: number;
  previewKey: string;
} | null;

type LocationCurrent = ElementEventPayloadMap["onDrop"]["location"]["current"];

function getDistanceToTargetCenter(
  target: LocationCurrent["dropTargets"][number],
  input: LocationCurrent["input"]
): number {
  const rect = target.element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return (input.clientX - centerX) ** 2 + (input.clientY - centerY) ** 2;
}

function getClosestDestinationTarget(params: {
  dropTargets: LocationCurrent["dropTargets"];
  input: LocationCurrent["input"];
  sourceId: string;
  excludedIds: Set<string>;
}): LocationCurrent["dropTargets"][number] | null {
  const { dropTargets, input, sourceId, excludedIds } = params;

  const candidates = dropTargets.filter((target) => {
    if (target.data?.type !== "draggable-item") return false;
    const targetId = String(target.data?.id ?? "");
    if (!targetId || targetId === sourceId) return false;
    return !excludedIds.has(targetId);
  });

  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0];

  return candidates.reduce((closest, current) =>
    getDistanceToTargetCenter(current, input) <
    getDistanceToTargetCenter(closest, input)
      ? current
      : closest
  );
}

function getContainerInsertionIndex<T extends DraggableItem>(params: {
  containerElement: Element;
  input: LocationCurrent["input"];
  direction: ListDirection;
  items: T[];
  excludedIds: Set<string>;
}): number | null {
  const { containerElement, input, direction, items, excludedIds } = params;
  const indexById = new Map(items.map((item, index) => [item.id, index]));

  const itemElements = Array.from(
    containerElement.querySelectorAll<HTMLElement>("[data-rdk-item-id]")
  );

  if (itemElements.length === 0) return 0;

  const targetPoint =
    direction === "horizontal" ? input.clientX : input.clientY;

  const points = itemElements
    .map((element) => {
      const itemId = element.getAttribute("data-rdk-item-id");
      if (!itemId || excludedIds.has(itemId)) return null;

      const index = indexById.get(itemId);
      if (index === undefined) return null;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance =
        (input.clientX - centerX) ** 2 + (input.clientY - centerY) ** 2;
      const centerOnAxis = direction === "horizontal" ? centerX : centerY;

      return { index, distance, centerOnAxis };
    })
    .filter(
      (
        point
      ): point is { index: number; distance: number; centerOnAxis: number } =>
        point !== null
    );

  if (points.length === 0) return null;

  const closest = points.reduce((nearest, current) =>
    current.distance < nearest.distance ? current : nearest
  );

  return targetPoint >= closest.centerOnAxis ? closest.index + 1 : closest.index;
}

export function hasOrderChanged<T extends DraggableItem>(oldItems: T[], newItems: T[]): boolean {
  if (oldItems.length !== newItems.length) return true;
  return newItems.some((item, index) => item.id !== oldItems[index]?.id);
}

export function getMovingIds<T extends DraggableItem>(params: {
  items: T[];
  sourceId: string;
  selectedIds: string[];
  multiDragEnabled: boolean;
}): Set<string> {
  const { items, sourceId, selectedIds, multiDragEnabled } = params;

  if (!multiDragEnabled) return new Set([sourceId]);

  const idsInList = new Set(items.map((item) => item.id));
  const selectedSet = new Set(selectedIds.filter((id) => idsInList.has(id)));

  if (!selectedSet.has(sourceId)) {
    return new Set([sourceId]);
  }

  return selectedSet;
}

export function reorderFromDragState<T extends DraggableItem>(params: {
  items: T[];
  sourceId: string;
  sourceIndex: number;
  rawDestinationIndex: number;
  selectedIds: string[];
  multiDragEnabled: boolean;
}): T[] {
  const {
    items,
    sourceId,
    sourceIndex,
    rawDestinationIndex,
    selectedIds,
    multiDragEnabled,
  } = params;

  if (multiDragEnabled) {
    const selectedSet = new Set(selectedIds);
    if (!selectedSet.has(sourceId)) {
      selectedSet.clear();
    }
    selectedSet.add(sourceId);

    const selectedIndexes = items
      .map((item, index) => (selectedSet.has(item.id) ? index : -1))
      .filter((index) => index !== -1);

    if (selectedIndexes.length > 1) {
      return reorderMany(items, selectedIndexes, rawDestinationIndex);
    }
  }

  const destinationIndex = normalizeDestinationIndex({
    itemCount: items.length,
    sourceIndex,
    rawDestinationIndex,
    isSameList: true,
  });

  return reorder(items, sourceIndex, destinationIndex);
}

export function resolveDestination<T extends DraggableItem>(params: {
  location: LocationCurrent;
  sourceId: string;
  sourceIndex: number;
  direction: ListDirection;
  items: T[];
  excludedIds: Set<string>;
}): DestinationInfo {
  const { location, sourceId, sourceIndex, direction, items, excludedIds } = params;
  const { dropTargets, input } = location;

  const destinationTarget = getClosestDestinationTarget({
    dropTargets,
    input,
    sourceId,
    excludedIds,
  });

  const containerTarget = dropTargets.find(
    (target) => target.data?.type === "container"
  );

  if (!destinationTarget && !containerTarget) return null;

  if (!destinationTarget) {
    if (!containerTarget) return null;

    const insertionIndex = getContainerInsertionIndex({
      containerElement: containerTarget.element,
      input,
      direction,
      items,
      excludedIds,
    });

    const rawDestinationIndex = insertionIndex ?? items.length;

    return {
      rawDestinationIndex,
      previewKey: `container:${rawDestinationIndex}`,
    };
  }

  const targetId = String(destinationTarget.data?.id ?? "");
  if (!targetId) return null;

  const targetIndex = items.findIndex((item) => item.id === targetId);
  if (targetIndex === -1) {
    // Fallback to target.data.index is unreliable after live reorders.
    // If the target id is not present in current items, skip this update.
    return null;
  }

  const edge = extractClosestEdge(destinationTarget.data);
  let isAfter: boolean;

  // Slot-based semantics:
  // dropping on an item moves dragged item to that item's slot,
  // which is "after" when moving down and "before" when moving up.
  if (sourceIndex < targetIndex) {
    isAfter = true;
  } else if (sourceIndex > targetIndex) {
    isAfter = false;
  } else if (edge === null) {
    const rect = destinationTarget.element.getBoundingClientRect();
    const axisCenter =
      direction === "horizontal"
        ? rect.left + rect.width / 2
        : rect.top + rect.height / 2;
    const axisPoint = direction === "horizontal" ? input.clientX : input.clientY;
    isAfter = axisPoint >= axisCenter;
  } else {
    isAfter = edge === "bottom" || (direction === "horizontal" && edge === "right");
  }

  const rawDestinationIndex = isAfter ? targetIndex + 1 : targetIndex;

  return {
    rawDestinationIndex,
    previewKey: `item:${targetId}:${isAfter ? "after" : "before"}`,
  };
}
