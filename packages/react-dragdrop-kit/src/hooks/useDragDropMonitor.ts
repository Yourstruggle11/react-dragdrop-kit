import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import type { DraggableItem, OrderUpdate } from "../types";
import { reorder, calculateOrderUpdates } from "../utils/order";

export function useDragDropMonitor<T extends DraggableItem>({
  items,
  onReorder,
  disabled = false,
}: {
  items: T[];
  onReorder: (newItems: T[], orderUpdates: OrderUpdate[]) => void;
  disabled?: boolean;
}) {
  if (disabled) {
    return () => {};
  }


  const handleDrop = ({ location, source }: any) => {
    const sourceIndex = source.data?.index as number;
    if (sourceIndex === undefined) return;

    const { dropTargets } = location.current;
    const destinationTarget = dropTargets.find(
      (target: any) =>
        target.data?.type === "draggable-item" &&
        target.data?.id !== source.data?.id
    );

    if (!destinationTarget) return;

    const edge = extractClosestEdge(destinationTarget);
    const targetIndex = Number(
      destinationTarget.element.getAttribute("data-index")
    );
    const destinationIndex = edge === "bottom" ? targetIndex + 1 : targetIndex;

    if (sourceIndex !== destinationIndex) {
      const oldItems = [...items];
      const newItems = reorder(items, sourceIndex, destinationIndex);
      const orderUpdates = calculateOrderUpdates(oldItems, newItems);
      onReorder(newItems, orderUpdates);
    }
  };

  return monitorForElements({
    onDrop: handleDrop,
  });
}
