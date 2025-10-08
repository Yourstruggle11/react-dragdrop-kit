/**
 * Kanban Card View (Headless)
 *
 * Headless component for rendering draggable cards.
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import type { KanbanCardViewProps, DragProvided, DragSnapshot } from '../types';

const KANBAN_CARD = 'kanban-card';

export function KanbanCardView({
  card,
  children,
  isDragDisabled = false,
  index,
  columnId,
}: KanbanCardViewProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const createDraggable = useCallback(
    (element: HTMLElement) => {
      if (isDragDisabled) return () => {};

      return draggable({
        element,
        getInitialData: () => ({
          type: KANBAN_CARD,
          id: card.id,
          index,
          columnId,
        }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      });
    },
    [card.id, index, columnId, isDragDisabled]
  );

  const createDropTarget = useCallback(
    (element: HTMLElement) => {
      if (isDragDisabled) return () => {};

      return dropTargetForElements({
        element,
        getData: ({ input, element }) => {
          const data = { type: KANBAN_CARD, id: card.id, index, columnId };
          return attachClosestEdge(data, { input, element, allowedEdges: ['top', 'bottom'] });
        },
        canDrop: ({ source }) => source.data.type === KANBAN_CARD && source.data.id !== card.id,
        onDragEnter: () => setIsDraggingOver(true),
        onDragLeave: () => setIsDraggingOver(false),
        onDrop: () => setIsDraggingOver(false),
      });
    },
    [card.id, index, columnId, isDragDisabled]
  );

  useEffect(() => {
    const element = cardRef.current;
    if (!element || isDragDisabled) return;

    return combine(createDraggable(element), createDropTarget(element));
  }, [createDraggable, createDropTarget, isDragDisabled]);

  const provided: DragProvided = {
    draggableProps: {
      'data-draggable-id': card.id,
      'data-draggable-type': 'CARD',
      style: isDragging ? { opacity: 0.5 } : undefined,
    },
    dragHandleProps: {
      tabIndex: 0,
      role: 'button',
      'aria-roledescription': 'draggable card',
      'aria-label': `${card.title}, press space to pick up`,
    },
    innerRef: cardRef as React.RefObject<HTMLElement>,
  };

  const snapshot: DragSnapshot = {
    isDragging,
    isDraggingOver,
  };

  return <>{children(provided, snapshot)}</>;
}
