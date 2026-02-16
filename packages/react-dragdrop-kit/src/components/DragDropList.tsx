import React, { useEffect, useRef, useState, useCallback } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { DraggableItemWrapper } from "./DraggableItemWrapper";
import type { DragDropListProps, DraggableItem } from "../types";
import { useDragDropMonitor } from "../hooks/useDragDropMonitor";
import { defaultStyles } from "../styles/defaultStyles";

export function DragDropList<T extends DraggableItem>({
  items,
  onReorder,
  renderItem,
  containerClassName = "",
  containerStyle = {},
  itemClassName = "",
  itemStyle = {},
  dragPreviewClassName = "",
  dragPreviewStyle = {},
  onDragStart,
  onDragEnd,
  disabled = false,
  gap,
  direction = "vertical",
  showDropIndicator = false,
  dropIndicatorClassName = "",
  dropIndicatorStyle = {},
  dropIndicatorPosition = "bottom",
  dragHandle,
  selectedIds = [],
  multiDragEnabled = false,
}: DragDropListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  useDragDropMonitor({
    items,
    onReorder,
    disabled,
    direction,
    selectedIds,
    multiDragEnabled,
  });
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const getContainerStyles = (): React.CSSProperties => {
    const baseStyle = { ...defaultStyles.container.default };

    if (direction === "horizontal") {
      Object.assign(baseStyle, defaultStyles.container.horizontal);
    }

    if (isDraggingOver) {
      Object.assign(baseStyle, defaultStyles.container.dragging);
    }

    if (gap !== undefined) {
      baseStyle.gap = typeof gap === "number" ? `${gap}px` : gap;
    }

    return { ...baseStyle, ...containerStyle };
  };

  const createDropTarget = useCallback(
    (element: HTMLElement) => {
      if (disabled) return () => {};

      return dropTargetForElements({
        element,
        getData: () => ({ type: "container" }),
        onDragEnter: () => setIsDraggingOver(true),
        onDragLeave: () => setIsDraggingOver(false),
        onDrop: () => setIsDraggingOver(false),
      });
    },
    [disabled]
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element || disabled) return;

    return createDropTarget(element);
  }, [createDropTarget, disabled]);

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      style={getContainerStyles()}
    >
      {items.map((item, index) => (
        <DraggableItemWrapper
          key={item.id}
          item={item}
          index={index}
          className={itemClassName}
          style={itemStyle}
          dragPreviewClassName={dragPreviewClassName}
          dragPreviewStyle={dragPreviewStyle}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          disabled={disabled}
          showDropIndicator={showDropIndicator}
          dropIndicatorClassName={dropIndicatorClassName}
          dropIndicatorStyle={dropIndicatorStyle}
          dropIndicatorPosition={dropIndicatorPosition}
          direction={direction}
          dragHandle={dragHandle}
        >
          {renderItem(item, index)}
        </DraggableItemWrapper>
      ))}
    </div>
  );
}
