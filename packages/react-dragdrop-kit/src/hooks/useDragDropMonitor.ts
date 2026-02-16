import { useCallback, useEffect } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import type { ElementEventPayloadMap } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { DraggableItem, OrderUpdate } from "../types";
import {
  reorder,
  reorderMany,
  normalizeDestinationIndex,
  calculateOrderUpdates,
} from "../utils/order";

export function useDragDropMonitor<T extends DraggableItem>({
  items,
  onReorder,
  disabled = false,
  direction = "vertical",
  selectedIds = [],
  multiDragEnabled = false,
}: {
  items: T[];
  onReorder: (newItems: T[], orderUpdates: OrderUpdate[]) => void;
  disabled?: boolean;
  direction?: "vertical" | "horizontal";
  selectedIds?: string[];
  multiDragEnabled?: boolean;
}) {
  const handleDrop = useCallback(
    ({ location, source }: ElementEventPayloadMap["onDrop"]) => {
      const sourceId = source.data?.id as string | undefined;
      const sourceIndex = source.data?.index as number | undefined;
      if (sourceId === undefined || sourceIndex === undefined) return;

      const { dropTargets } = location.current;
      const destinationTarget = dropTargets.find(
        (target) =>
          target.data?.type === "draggable-item" &&
          target.data?.id !== sourceId
      );
      const containerTarget = dropTargets.find(
        (target) => target.data?.type === "container"
      );

      if (!destinationTarget && !containerTarget) return;

      let rawDestinationIndex = items.length;
      if (destinationTarget) {
        const targetIndex = Number(destinationTarget.data?.index);
        if (!Number.isFinite(targetIndex)) return;
        const edge = extractClosestEdge(destinationTarget.data);
        const isAfter =
          edge === "bottom" || (direction === "horizontal" && edge === "right");
        rawDestinationIndex = isAfter ? targetIndex + 1 : targetIndex;
      }

      const oldItems = [...items];
      let newItems: T[] = items;

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
          newItems = reorderMany(items, selectedIndexes, rawDestinationIndex);
        } else {
          const destinationIndex = normalizeDestinationIndex({
            itemCount: items.length,
            sourceIndex,
            rawDestinationIndex,
            isSameList: true,
          });
          newItems = reorder(items, sourceIndex, destinationIndex);
        }
      } else {
        const destinationIndex = normalizeDestinationIndex({
          itemCount: items.length,
          sourceIndex,
          rawDestinationIndex,
          isSameList: true,
        });
        newItems = reorder(items, sourceIndex, destinationIndex);
      }

      const isChanged = newItems.some((item, index) => item.id !== oldItems[index]?.id);
      if (!isChanged) return;

      const orderUpdates = calculateOrderUpdates(oldItems, newItems);
      onReorder(newItems, orderUpdates);
    },
    [items, onReorder, direction, selectedIds, multiDragEnabled]
  );

  useEffect(() => {
    if (disabled) return;
    return monitorForElements({
      onDrop: handleDrop,
    });
  }, [disabled, handleDrop]);

  return useCallback(() => {}, []);
}
