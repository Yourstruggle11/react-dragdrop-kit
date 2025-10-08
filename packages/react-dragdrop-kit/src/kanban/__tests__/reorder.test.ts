/**
 * Tests for Kanban reorder utilities
 */

import { applyDragResult, reorderArray } from '../utils/reorder';
import type { KanbanBoardState, DropResult } from '../types';

describe('reorderArray', () => {
  it('should reorder items within the same array', () => {
    const items = ['a', 'b', 'c', 'd'];
    const result = reorderArray(items, 1, 3);
    expect(result).toEqual(['a', 'c', 'd', 'b']);
  });

  it('should handle moving to the beginning', () => {
    const items = ['a', 'b', 'c'];
    const result = reorderArray(items, 2, 0);
    expect(result).toEqual(['c', 'a', 'b']);
  });

  it('should handle moving to the end', () => {
    const items = ['a', 'b', 'c'];
    const result = reorderArray(items, 0, 2);
    expect(result).toEqual(['b', 'c', 'a']);
  });

  it('should return same array if source and destination are equal', () => {
    const items = ['a', 'b', 'c'];
    const result = reorderArray(items, 1, 1);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should handle single item array', () => {
    const items = ['a'];
    const result = reorderArray(items, 0, 0);
    expect(result).toEqual(['a']);
  });
});

describe('applyDragResult - Card movement', () => {
  const initialState: KanbanBoardState = {
    columns: [
      { id: 'col1', title: 'Todo', cardIds: ['card1', 'card2', 'card3'] },
      { id: 'col2', title: 'Done', cardIds: ['card4'] },
    ],
    cards: {
      card1: { id: 'card1', title: 'Task 1' },
      card2: { id: 'card2', title: 'Task 2' },
      card3: { id: 'card3', title: 'Task 3' },
      card4: { id: 'card4', title: 'Task 4' },
    },
  };

  it('should move card within same column', () => {
    const result: DropResult = {
      type: 'CARD',
      draggableId: 'card1',
      source: { columnId: 'col1', index: 0 },
      destination: { columnId: 'col1', index: 2 },
    };

    const newState = applyDragResult(initialState, result);

    expect(newState.columns[0].cardIds).toEqual(['card2', 'card3', 'card1']);
    expect(newState.columns[1].cardIds).toEqual(['card4']);
  });

  it('should move card to different column', () => {
    const result: DropResult = {
      type: 'CARD',
      draggableId: 'card1',
      source: { columnId: 'col1', index: 0 },
      destination: { columnId: 'col2', index: 0 },
    };

    const newState = applyDragResult(initialState, result);

    expect(newState.columns[0].cardIds).toEqual(['card2', 'card3']);
    expect(newState.columns[1].cardIds).toEqual(['card1', 'card4']);
  });

  it('should move card to end of different column', () => {
    const result: DropResult = {
      type: 'CARD',
      draggableId: 'card2',
      source: { columnId: 'col1', index: 1 },
      destination: { columnId: 'col2', index: 1 },
    };

    const newState = applyDragResult(initialState, result);

    expect(newState.columns[0].cardIds).toEqual(['card1', 'card3']);
    expect(newState.columns[1].cardIds).toEqual(['card4', 'card2']);
  });

  it('should move card to empty column', () => {
    const stateWithEmptyColumn: KanbanBoardState = {
      columns: [
        { id: 'col1', title: 'Todo', cardIds: ['card1'] },
        { id: 'col2', title: 'Empty', cardIds: [] },
      ],
      cards: {
        card1: { id: 'card1', title: 'Task 1' },
      },
    };

    const result: DropResult = {
      type: 'CARD',
      draggableId: 'card1',
      source: { columnId: 'col1', index: 0 },
      destination: { columnId: 'col2', index: 0 },
    };

    const newState = applyDragResult(stateWithEmptyColumn, result);

    expect(newState.columns[0].cardIds).toEqual([]);
    expect(newState.columns[1].cardIds).toEqual(['card1']);
  });

  it('should not modify state when destination is undefined', () => {
    const result: DropResult = {
      type: 'CARD',
      draggableId: 'card1',
      source: { columnId: 'col1', index: 0 },
      destination: undefined,
    };

    const newState = applyDragResult(initialState, result);

    expect(newState).toEqual(initialState);
  });
});

describe('applyDragResult - Column reordering', () => {
  const initialState: KanbanBoardState = {
    columns: [
      { id: 'col1', title: 'Todo', cardIds: ['card1'] },
      { id: 'col2', title: 'Progress', cardIds: ['card2'] },
      { id: 'col3', title: 'Done', cardIds: ['card3'] },
    ],
    cards: {
      card1: { id: 'card1', title: 'Task 1' },
      card2: { id: 'card2', title: 'Task 2' },
      card3: { id: 'card3', title: 'Task 3' },
    },
  };

  it('should reorder columns', () => {
    const result: DropResult = {
      type: 'COLUMN',
      draggableId: 'col1',
      source: { index: 0 },
      destination: { index: 2 },
    };

    const newState = applyDragResult(initialState, result);

    expect(newState.columns.map((c) => c.id)).toEqual(['col2', 'col3', 'col1']);
  });

  it('should move column to beginning', () => {
    const result: DropResult = {
      type: 'COLUMN',
      draggableId: 'col3',
      source: { index: 2 },
      destination: { index: 0 },
    };

    const newState = applyDragResult(initialState, result);

    expect(newState.columns.map((c) => c.id)).toEqual(['col3', 'col1', 'col2']);
  });

  it('should not modify when column dropped in same position', () => {
    const result: DropResult = {
      type: 'COLUMN',
      draggableId: 'col2',
      source: { index: 1 },
      destination: { index: 1 },
    };

    const newState = applyDragResult(initialState, result);

    expect(newState.columns).toEqual(initialState.columns);
  });
});
