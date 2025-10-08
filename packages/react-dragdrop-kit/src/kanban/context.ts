/**
 * Kanban Board Context
 *
 * Internal context for sharing board state between components.
 */

import { createContext, useContext } from 'react';
import type { KanbanBoardState, KanbanDragState } from './types';

export interface KanbanContextValue {
  state: KanbanBoardState;
  dragState: KanbanDragState;
  isDragDisabled?: (id: string, type: 'CARD' | 'COLUMN') => boolean;
}

export const KanbanContext = createContext<KanbanContextValue | null>(null);

export function useKanbanContext(): KanbanContextValue {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('Kanban components must be used within KanbanBoard');
  }
  return context;
}
