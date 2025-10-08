/**
 * Kanban Reorder Utilities
 *
 * Functions for reordering cards and columns in a Kanban board.
 */

import type { KanbanBoardState, KanbanColumn, DragLocation } from '../types';

/**
 * Reorder an array by moving an item from one index to another
 */
export function reorderArray<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

/**
 * Move a card within the same column
 */
export function reorderCardInColumn(
  state: KanbanBoardState,
  columnId: string,
  startIndex: number,
  endIndex: number
): KanbanBoardState {
  const column = state.columns.find((col) => col.id === columnId);
  if (!column) return state;

  const newCardIds = reorderArray(column.cardIds, startIndex, endIndex);

  return {
    ...state,
    columns: state.columns.map((col) =>
      col.id === columnId ? { ...col, cardIds: newCardIds } : col
    ),
  };
}

/**
 * Move a card from one column to another
 */
export function moveCardBetweenColumns(
  state: KanbanBoardState,
  source: DragLocation,
  destination: DragLocation,
  cardId: string
): KanbanBoardState {
  const sourceColumn = state.columns.find((col) => col.id === source.columnId);
  const destColumn = state.columns.find((col) => col.id === destination.columnId);

  if (!sourceColumn || !destColumn) return state;

  // Remove from source
  const newSourceCardIds = [...sourceColumn.cardIds];
  newSourceCardIds.splice(source.index, 1);

  // Add to destination
  const newDestCardIds = [...destColumn.cardIds];
  newDestCardIds.splice(destination.index, 0, cardId);

  return {
    ...state,
    columns: state.columns.map((col) => {
      if (col.id === source.columnId) {
        return { ...col, cardIds: newSourceCardIds };
      }
      if (col.id === destination.columnId) {
        return { ...col, cardIds: newDestCardIds };
      }
      return col;
    }),
  };
}

/**
 * Reorder columns
 */
export function reorderColumns(
  state: KanbanBoardState,
  startIndex: number,
  endIndex: number
): KanbanBoardState {
  return {
    ...state,
    columns: reorderArray(state.columns, startIndex, endIndex),
  };
}

/**
 * Apply a drag result to the board state
 * This is a convenience function that handles all reorder cases
 */
export function applyDragResult(
  state: KanbanBoardState,
  result: {
    type: 'CARD' | 'COLUMN';
    source: DragLocation;
    destination?: DragLocation;
    draggableId: string;
  }
): KanbanBoardState {
  // No destination = drag canceled
  if (!result.destination) {
    return state;
  }

  const { source, destination, type } = result;

  // Column reorder
  if (type === 'COLUMN') {
    if (source.index === destination.index) {
      return state; // No change
    }
    return reorderColumns(state, source.index, destination.index);
  }

  // Card reorder
  if (type === 'CARD') {
    // Same column
    if (source.columnId === destination.columnId) {
      if (source.index === destination.index) {
        return state; // No change
      }
      return reorderCardInColumn(
        state,
        source.columnId!,
        source.index,
        destination.index
      );
    }

    // Different columns
    return moveCardBetweenColumns(state, source, destination, result.draggableId);
  }

  return state;
}
