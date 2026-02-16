/**
 * Core Kanban DnD Hook
 *
 * Main hook that manages drag-and-drop state for the Kanban board.
 */

import { useState, useEffect } from 'react';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import type { KanbanDragState, DropResult, DragLocation, KanbanBoardState } from '../types';
import { normalizeReorderDestinationIndex } from '../utils/reorder';

const KANBAN_CARD = 'kanban-card';
const KANBAN_COLUMN = 'kanban-column';

export interface UseKanbanDndOptions {
  onDragStart?: (draggable: { id: string; type: 'CARD' | 'COLUMN' }) => void;
  onDragEnd: (result: DropResult, stateBefore: KanbanBoardState) => void;
  state: KanbanBoardState;
  disabled?: boolean;
}

export function useKanbanDnd({ onDragStart, onDragEnd, state, disabled }: UseKanbanDndOptions) {
  const [dragState, setDragState] = useState<KanbanDragState>({
    draggingId: null,
    draggingType: null,
    source: null,
    destination: null,
  });

  useEffect(() => {
    if (disabled) return;

    const cleanup = monitorForElements({
      onDragStart({ source }) {
        const typeRaw = source.data.type as string;
        const id = source.data.id as string;
        const columnId = source.data.columnId as string | undefined;
        const index = source.data.index as number;

        const type: 'CARD' | 'COLUMN' = typeRaw === KANBAN_CARD ? 'CARD' : 'COLUMN';

        const sourceLocation: DragLocation = {
          columnId: type === 'CARD' ? columnId : undefined,
          index,
        };

        setDragState({
          draggingId: id,
          draggingType: type,
          source: sourceLocation,
          destination: sourceLocation,
        });

        onDragStart?.({ id, type });
      },

      onDrop({ source, location }) {
        const sourceType = source.data.type as string;
        const sourceId = source.data.id as string;
        const sourceIndex = source.data.index as number;
        const sourceColumnId = source.data.columnId as string | undefined;

        // Find the drop target
        const dropTargets = location.current.dropTargets;

        let destination: DragLocation | undefined;

        if (sourceType === KANBAN_CARD) {
          // Card drop - find column drop target
          const columnTarget = dropTargets.find((target) =>
            target.data.type === 'kanban-column-drop-zone'
          );

          if (columnTarget) {
            const destColumnId = columnTarget.data.columnId as string;
            const sourceColumn = state.columns.find((column) => column.id === sourceColumnId);
            const destColumn = state.columns.find((column) => column.id === destColumnId);
            if (sourceColumn && destColumn) {
              const cardTarget = dropTargets.find((target) =>
                target.data.type === KANBAN_CARD && target.data.id !== sourceId
              );

              let rawDestinationIndex = destColumn.cardIds.length;
              if (cardTarget) {
                // Dropping on another card
                const destIndex = cardTarget.data.index as number;
                const edge = extractClosestEdge(cardTarget.data);
                rawDestinationIndex = edge === 'bottom' ? destIndex + 1 : destIndex;
              }

              const isSameColumn = sourceColumnId === destColumnId;
              const normalizedIndex = normalizeReorderDestinationIndex({
                itemCount: isSameColumn ? sourceColumn.cardIds.length : destColumn.cardIds.length,
                sourceIndex,
                rawDestinationIndex,
                isSameList: isSameColumn,
              });

              destination = {
                columnId: destColumnId,
                index: normalizedIndex,
              };
            }
          }
        } else if (sourceType === KANBAN_COLUMN) {
          // Column drop
          const columnTarget = dropTargets.find((target) =>
            target.data.type === KANBAN_COLUMN && target.data.id !== sourceId
          );

          if (columnTarget) {
            const destIndex = columnTarget.data.index as number;
            const edge = extractClosestEdge(columnTarget.data);
            const rawDestinationIndex =
              edge === 'bottom' || edge === 'right' ? destIndex + 1 : destIndex;

            destination = {
              index: normalizeReorderDestinationIndex({
                itemCount: state.columns.length,
                sourceIndex,
                rawDestinationIndex,
                isSameList: true,
              }),
            };
          }
        }

        const result: DropResult = {
          type: sourceType === KANBAN_CARD ? 'CARD' : 'COLUMN',
          source: {
            columnId: sourceColumnId,
            index: sourceIndex,
          },
          destination,
          draggableId: sourceId,
        };

        setDragState({
          draggingId: null,
          draggingType: null,
          source: null,
          destination: null,
        });

        onDragEnd(result, state);
      },
    });

    return cleanup;
  }, [disabled, onDragStart, onDragEnd, state]);

  return dragState;
}
