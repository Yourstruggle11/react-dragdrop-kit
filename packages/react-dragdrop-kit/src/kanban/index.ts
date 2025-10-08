/**
 * Kanban Board Module
 *
 * A headless, accessible Kanban board implementation for React.
 *
 * @packageDocumentation
 */

// Types
export type {
  Id,
  KanbanCard,
  KanbanColumn,
  KanbanBoardState,
  DragLocation,
  DropResult,
  DragProvided,
  DragSnapshot,
  KanbanBoardProps,
  KanbanColumnViewProps,
  KanbanCardViewProps,
  AutoscrollConfig,
  LiveAnnouncement,
} from './types';

// Components
export { KanbanBoard } from './components/KanbanBoard';
export { KanbanColumnView } from './components/KanbanColumnView';
export { KanbanCardView } from './components/KanbanCardView';

// Hooks
export { useKanbanDnd } from './hooks/useKanbanDnd';
export { useAutoscroll } from './hooks/useAutoscroll';

// A11y
export { AnnouncerProvider, useAnnouncer, announcements } from './a11y/Announcer';

// Utils
export { applyDragResult, reorderArray } from './utils/reorder';
