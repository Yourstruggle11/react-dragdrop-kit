/**
 * Kanban Column View (Headless)
 *
 * Headless component for rendering draggable columns with drop zones.
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import type { KanbanColumnViewProps, DragProvided, DragSnapshot } from '../types';

const KANBAN_COLUMN = 'kanban-column';
const KANBAN_COLUMN_DROP_ZONE = 'kanban-column-drop-zone';

export function KanbanColumnView({
  column,
  cardIds,
  children,
  isDragDisabled = false,
  index,
}: KanbanColumnViewProps) {
  const columnRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Make column header draggable
  const createDraggableColumn = useCallback(
    (element: HTMLElement) => {
      if (isDragDisabled) return () => {};

      return draggable({
        element,
        getInitialData: () => ({
          type: KANBAN_COLUMN,
          id: column.id,
          index,
        }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      });
    },
    [column.id, index, isDragDisabled]
  );

  // Make column header a drop target for column reordering
  const createColumnDropTarget = useCallback(
    (element: HTMLElement) => {
      if (isDragDisabled) return () => {};

      return dropTargetForElements({
        element,
        getData: ({ input, element }) => {
          const data = { type: KANBAN_COLUMN, id: column.id, index };
          return attachClosestEdge(data, { input, element, allowedEdges: ['left', 'right'] });
        },
        canDrop: ({ source }) => source.data.type === KANBAN_COLUMN && source.data.id !== column.id,
      });
    },
    [column.id, index, isDragDisabled]
  );

  // Make card list area a drop zone for cards
  const createCardDropZone = useCallback(
    (element: HTMLElement) => {
      return dropTargetForElements({
        element,
        getData: () => ({
          type: KANBAN_COLUMN_DROP_ZONE,
          columnId: column.id,
        }),
        canDrop: ({ source }) => source.data.type === 'kanban-card',
        onDragEnter: () => setIsDraggingOver(true),
        onDragLeave: () => setIsDraggingOver(false),
        onDrop: () => setIsDraggingOver(false),
      });
    },
    [column.id]
  );

  useEffect(() => {
    const columnElement = columnRef.current;
    const dropZoneElement = dropZoneRef.current;
    if (!columnElement || !dropZoneElement) return;

    const cleanups = [
      createDraggableColumn(columnElement),
      createColumnDropTarget(columnElement),
      createCardDropZone(dropZoneElement),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [createDraggableColumn, createColumnDropTarget, createCardDropZone]);

  const provided: DragProvided = {
    draggableProps: {
      'data-draggable-id': column.id,
      'data-draggable-type': 'COLUMN',
      style: isDragging ? { opacity: 0.5 } : undefined,
    },
    dragHandleProps: {
      tabIndex: 0,
      role: 'button',
      'aria-roledescription': 'draggable column',
      'aria-label': `${column.title}, press space to pick up`,
    },
    innerRef: columnRef as React.RefObject<HTMLElement>,
  };

  const snapshot: DragSnapshot = {
    isDragging,
    isDraggingOver,
  };

  // Pass both refs through provided
  const providedWithDropZone = {
    ...provided,
    dropZoneRef,
  };

  return <>{children(providedWithDropZone as any, snapshot)}</>;
}
