import { useCallback, useEffect, useRef } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { ElementEventPayloadMap } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { DraggableItem, OrderUpdate } from "../types";
import { calculateOrderUpdates } from "../utils/order";
import {
  DEFAULT_DIRECTION,
  getMovingIds,
  hasOrderChanged,
  reorderFromDragState,
  resolveDestination,
  type ListDirection,
  type MonitorOptions,
} from "./useDragDropMonitor.logic";

export function useDragDropMonitor<T extends DraggableItem>({
  items,
  onReorder,
  disabled = false,
  direction = DEFAULT_DIRECTION,
  selectedIds = [],
  multiDragEnabled = false,
  liveReorder = false,
}: {
  items: T[];
  onReorder: (newItems: T[], orderUpdates: OrderUpdate[]) => void;
  disabled?: boolean;
  direction?: ListDirection;
  selectedIds?: string[];
  multiDragEnabled?: boolean;
  liveReorder?: boolean;
}) {
  const itemsRef = useRef<T[]>(items);
  const onReorderRef = useRef(onReorder);
  const optionsRef = useRef<MonitorOptions>({
    direction,
    selectedIds,
    multiDragEnabled,
    liveReorder,
  });

  const dragSessionRef = useRef<{
    sourceId: string | null;
    movingIds: Set<string> | null;
    originalItems: T[] | null;
    didLiveReorder: boolean;
    lastPreviewKey: string | null;
  }>({
    sourceId: null,
    movingIds: null,
    originalItems: null,
    didLiveReorder: false,
    lastPreviewKey: null,
  });

  useEffect(() => {
    itemsRef.current = items;
    onReorderRef.current = onReorder;
    optionsRef.current = {
      direction,
      selectedIds,
      multiDragEnabled,
      liveReorder,
    };
  }, [items, onReorder, direction, selectedIds, multiDragEnabled, liveReorder]);

  const resetDragSession = useCallback(() => {
    dragSessionRef.current = {
      sourceId: null,
      movingIds: null,
      originalItems: null,
      didLiveReorder: false,
      lastPreviewKey: null,
    };
  }, []);

  const getSourceIndex = useCallback((sourceId: string, sourceDataIndex: unknown): number => {
    const currentItems = itemsRef.current;
    const currentIndex = currentItems.findIndex((item) => item.id === sourceId);
    if (currentIndex !== -1) return currentIndex;

    const parsedIndex = Number(sourceDataIndex);
    return Number.isFinite(parsedIndex) ? parsedIndex : -1;
  }, []);

  const getMovingIdsForSource = useCallback((sourceId: string): Set<string> => {
    const currentItems = itemsRef.current;
    const { selectedIds: currentSelectedIds, multiDragEnabled: currentMultiDragEnabled } =
      optionsRef.current;

    return getMovingIds({
      items: currentItems,
      sourceId,
      selectedIds: currentSelectedIds,
      multiDragEnabled: currentMultiDragEnabled,
    });
  }, []);

  const getSessionMovingIds = useCallback(
    (sourceId: string): Set<string> => {
      const sessionMovingIds = dragSessionRef.current.movingIds;
      if (sessionMovingIds) {
        return new Set(sessionMovingIds);
      }
      return getMovingIdsForSource(sourceId);
    },
    [getMovingIdsForSource]
  );

  const commitReorder = useCallback(
    ({
      sourceId,
      sourceIndex,
      rawDestinationIndex,
    }: {
      sourceId: string;
      sourceIndex: number;
      rawDestinationIndex: number;
    }): boolean => {
      const oldItems = [...itemsRef.current];
      const {
        selectedIds: currentSelectedIds,
        multiDragEnabled: currentMultiDragEnabled,
      } = optionsRef.current;

      const newItems = reorderFromDragState({
        items: oldItems,
        sourceId,
        sourceIndex,
        rawDestinationIndex,
        selectedIds: currentSelectedIds,
        multiDragEnabled: currentMultiDragEnabled,
      });

      if (!hasOrderChanged(oldItems, newItems)) return false;

      const orderUpdates = calculateOrderUpdates(oldItems, newItems);
      itemsRef.current = newItems;
      onReorderRef.current(newItems, orderUpdates);
      return true;
    },
    []
  );

  const handleDragStart = useCallback(
    ({ source }: ElementEventPayloadMap["onDragStart"]) => {
      if (source.data?.type !== "draggable-item") return;

      const sourceId = source.data?.id as string | undefined;
      if (!sourceId) return;

      const currentItems = itemsRef.current;
      const { selectedIds: currentSelectedIds, multiDragEnabled: currentMultiDragEnabled } =
        optionsRef.current;
      const movingIds = getMovingIds({
        items: currentItems,
        sourceId,
        selectedIds: currentSelectedIds,
        multiDragEnabled: currentMultiDragEnabled,
      });

      dragSessionRef.current = {
        sourceId,
        movingIds,
        originalItems: optionsRef.current.liveReorder ? [...currentItems] : null,
        didLiveReorder: false,
        lastPreviewKey: null,
      };
    },
    []
  );

  const handleDropTargetChange = useCallback(
    ({ location, source }: ElementEventPayloadMap["onDropTargetChange"]) => {
      if (source.data?.type !== "draggable-item") return;

      const { direction: currentDirection, liveReorder: currentLiveReorder } =
        optionsRef.current;
      if (!currentLiveReorder) return;

      const sourceId = source.data?.id as string | undefined;
      if (!sourceId) return;

      const sourceIndex = getSourceIndex(sourceId, source.data?.index);
      if (sourceIndex < 0) return;

      const currentItems = itemsRef.current;
      const movingIds = getSessionMovingIds(sourceId);
      const destination = resolveDestination({
        location: location.current,
        sourceId,
        sourceIndex,
        direction: currentDirection,
        items: currentItems,
        excludedIds: movingIds,
      });

      if (!destination) return;
      if (dragSessionRef.current.lastPreviewKey === destination.previewKey) return;

      const didReorder = commitReorder({
        sourceId,
        sourceIndex,
        rawDestinationIndex: destination.rawDestinationIndex,
      });

      dragSessionRef.current.lastPreviewKey = destination.previewKey;
      if (didReorder) {
        dragSessionRef.current.didLiveReorder = true;
      }
    },
    [getSourceIndex, getSessionMovingIds, commitReorder]
  );

  const handleDrop = useCallback(
    ({ location, source }: ElementEventPayloadMap["onDrop"]) => {
      if (source.data?.type !== "draggable-item") {
        resetDragSession();
        return;
      }

      const sourceId = source.data?.id as string | undefined;
      if (!sourceId) {
        resetDragSession();
        return;
      }

      const { direction: currentDirection, liveReorder: currentLiveReorder } =
        optionsRef.current;
      const currentItems = itemsRef.current;
      const movingIds = getSessionMovingIds(sourceId);

      const sourceIndex = getSourceIndex(sourceId, source.data?.index);
      if (sourceIndex < 0) {
        resetDragSession();
        return;
      }

      const destination = resolveDestination({
        location: location.current,
        sourceId,
        sourceIndex,
        direction: currentDirection,
        items: currentItems,
        excludedIds: movingIds,
      });

      if (!destination) {
        const { originalItems, didLiveReorder } = dragSessionRef.current;
        if (currentLiveReorder && didLiveReorder && originalItems) {
          const oldItems = [...itemsRef.current];
          if (hasOrderChanged(oldItems, originalItems)) {
            const orderUpdates = calculateOrderUpdates(oldItems, originalItems);
            itemsRef.current = originalItems;
            onReorderRef.current(originalItems, orderUpdates);
          }
        }
        resetDragSession();
        return;
      }

      const { didLiveReorder, lastPreviewKey } = dragSessionRef.current;
      if (currentLiveReorder && didLiveReorder && lastPreviewKey === destination.previewKey) {
        resetDragSession();
        return;
      }

      commitReorder({
        sourceId,
        sourceIndex,
        rawDestinationIndex: destination.rawDestinationIndex,
      });
      resetDragSession();
    },
    [getSessionMovingIds, getSourceIndex, commitReorder, resetDragSession]
  );

  useEffect(() => {
    if (disabled) return;

    return monitorForElements({
      onDragStart: handleDragStart,
      onDropTargetChange: handleDropTargetChange,
      onDrop: handleDrop,
    });
  }, [disabled, handleDragStart, handleDropTargetChange, handleDrop]);

  // Kept for backward compatibility with existing tests/internals.
  return useCallback(() => {}, []);
}
