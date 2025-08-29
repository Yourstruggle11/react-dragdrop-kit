import React, { useEffect, useRef, useState, useCallback } from "react";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { DraggableItemWrapperProps, DraggableItem } from "../types";
import { defaultStyles } from "../styles/defaultStyles";

const DRAGGABLE_ITEM = "draggable-item";

export function DraggableItemWrapper<T extends DraggableItem>({
  item,
  index,
  children,
  className = "",
  style = {},
  dragPreviewClassName = "",
  dragPreviewStyle = {},
  onDragStart,
  onDragEnd,
  disabled = false,
  showDropIndicator = false,
  dropIndicatorClassName = "",
  dropIndicatorStyle = {},
}: DraggableItemWrapperProps<T>) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dropPosition, setDropPosition] = useState<"top" | "bottom" | null>(
    null
  );

  const getItemStyles = (): React.CSSProperties => {
    const baseStyle = { ...defaultStyles.item.default };

    if (disabled) {
      Object.assign(baseStyle, defaultStyles.item.disabled);
    } else if (isDragging) {
      Object.assign(baseStyle, defaultStyles.item.dragging);
    } else if (isHovered) {
      Object.assign(baseStyle, defaultStyles.item.hover);
    }

    return { ...baseStyle, ...style };
  };

  const getPreviewStyles = (): React.CSSProperties => {
    return { ...defaultStyles.preview, ...dragPreviewStyle };
  };

  const createDraggable = useCallback(
    (element: HTMLElement) => {
      if (disabled) return () => {};

      return draggable({
        element,
        getInitialData: () => ({
          type: DRAGGABLE_ITEM,
          id: item.id,
          index,
        }),
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          const previewElement = element.cloneNode(true) as HTMLElement;
          const previewStyles = getPreviewStyles();

          // Apply custom preview class if provided
          if (dragPreviewClassName) {
            previewElement.className = dragPreviewClassName;
          }

          Object.assign(previewElement.style, previewStyles, {
            width: `${element?.offsetWidth || 100}px`,
            height: `${element?.offsetHeight || 50}px`,
          });

          document.body.appendChild(previewElement);
          if (nativeSetDragImage) {
            nativeSetDragImage(previewElement, 20, 20);
          }
          requestAnimationFrame(() => previewElement.remove());
        },
        onDragStart: () => {
          setIsDragging(true);
          onDragStart?.(item, index);
        },
        onDrop: () => {
          setIsDragging(false);
          onDragEnd?.(item, index);
        },
      });
    },
    [
      item,
      index,
      dragPreviewClassName,
      dragPreviewStyle,
      onDragStart,
      onDragEnd,
      disabled,
    ]
  );

  const createDropTarget = useCallback(
    (element: HTMLElement) => {
      if (disabled) return () => {};

      return dropTargetForElements({
        element,
        getData: () => ({
          type: DRAGGABLE_ITEM,
          id: item.id,
          index,
        }),
        canDrop: (args: any) => args.source.data?.type === DRAGGABLE_ITEM,
        getIsSticky: () => true,
        onDragEnter: ({ source, self, location }: any) => {
          if (source.data?.id !== self.data?.id) {
            setIsHovered(true);
            if (showDropIndicator) {
              const edge = location.current.dropTargets[0]?.edge;
              setDropPosition(edge === "top" ? "top" : "bottom");
            }
          }
        },
        onDragLeave: () => {
          setIsHovered(false);
          setDropPosition(null);
        },
        onDrop: () => {
          setIsHovered(false);
          setDropPosition(null);
        },
      });
    },
    [item.id, index, disabled, showDropIndicator]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.setAttribute("data-index", index.toString());

    if (disabled) {
      // provide a no-op cleanup to satisfy all code paths
      return () => {};
    }

    // normal draggable + droptarget setup
    return combine(createDraggable(element), createDropTarget(element));
  }, [index, createDraggable, createDropTarget, disabled]);

  return (
    <div ref={elementRef} className={className} style={getItemStyles()}>
      {showDropIndicator && dropPosition === "top" && (
        <div
          className={dropIndicatorClassName}
          style={{
            ...defaultStyles.dropIndicator,
            ...dropIndicatorStyle,
            top: -1,
          }}
        />
      )}
      {children}
      {showDropIndicator && dropPosition === "bottom" && (
        <div
          className={dropIndicatorClassName}
          style={{
            ...defaultStyles.dropIndicator,
            ...dropIndicatorStyle,
            bottom: -1,
          }}
        />
      )}
    </div>
  );
}
