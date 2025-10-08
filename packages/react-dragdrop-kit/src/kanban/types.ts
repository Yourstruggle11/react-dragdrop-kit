/**
 * Kanban Board Types
 *
 * Type definitions for the Kanban board feature.
 * Follows a normalized state pattern for efficient cross-column operations.
 */

import type React from 'react';

export type Id = string;

/**
 * Represents a single card in the Kanban board
 */
export interface KanbanCard {
  /** Unique identifier for the card */
  id: Id;
  /** Card title */
  title: string;
  /** Additional custom fields */
  [key: string]: any;
}

/**
 * Represents a column in the Kanban board
 */
export interface KanbanColumn {
  /** Unique identifier for the column */
  id: Id;
  /** Column title */
  title: string;
  /** Ordered list of card IDs in this column */
  cardIds: Id[];
  /** Additional custom fields */
  [key: string]: any;
}

/**
 * Normalized state structure for the Kanban board
 * Separates column ordering from card data for efficient updates
 */
export interface KanbanBoardState {
  /** Ordered list of columns */
  columns: KanbanColumn[];
  /** Flat lookup object for all cards (by ID) */
  cards: Record<Id, KanbanCard>;
}

/**
 * Location within the Kanban board
 */
export interface DragLocation {
  /** Column ID (undefined for column reorder operations) */
  columnId?: Id;
  /** Index within the column or board */
  index: number;
}

/**
 * Result of a drag-and-drop operation
 * Similar to react-beautiful-dnd's DropResult for migration compatibility
 */
export interface DropResult {
  /** Type of draggable that was moved */
  type: 'CARD' | 'COLUMN';
  /** Source location before drag */
  source: DragLocation;
  /** Destination location after drop (undefined if canceled) */
  destination?: DragLocation;
  /** ID of the dragged item */
  draggableId: Id;
}

/**
 * Props provided to render functions with drag-and-drop state and handlers
 */
export interface DragProvided {
  /** Props to spread on the draggable element */
  draggableProps: React.HTMLAttributes<HTMLElement> & {
    'data-draggable-id': Id;
    'data-draggable-type': 'CARD' | 'COLUMN';
  };
  /** Props to spread on the drag handle element (can be same as draggable) */
  dragHandleProps: React.HTMLAttributes<HTMLElement> & {
    tabIndex: number;
    role: string;
    'aria-roledescription': string;
  };
  /** Ref to attach to the draggable element */
  innerRef: React.RefObject<HTMLElement>;
}

/**
 * Snapshot of current drag state
 */
export interface DragSnapshot {
  /** Whether this element is currently being dragged */
  isDragging: boolean;
  /** Whether a drag is happening over this drop zone */
  isDraggingOver?: boolean;
  /** ID of the item being dragged (if any) */
  draggingId?: Id;
}

/**
 * Props for KanbanBoard component
 */
export interface KanbanBoardProps {
  /** Current board state (controlled) */
  state: KanbanBoardState;
  /** Callback fired when drag ends */
  onDragEnd: (result: DropResult, stateBefore: KanbanBoardState) => void;
  /** Callback fired when drag starts (optional) */
  onDragStart?: (draggable: { id: Id; type: 'CARD' | 'COLUMN' }) => void;
  /** Render function for a column */
  renderColumn: (
    column: KanbanColumn,
    provided: DragProvided,
    snapshot: DragSnapshot
  ) => React.ReactNode;
  /** Render function for a card */
  renderCard: (
    card: KanbanCard,
    provided: DragProvided,
    snapshot: DragSnapshot
  ) => React.ReactNode;
  /** Custom key extractor for cards (default: card.id) */
  getCardKey?: (card: KanbanCard) => string;
  /** Custom key extractor for columns (default: column.id) */
  getColumnKey?: (column: KanbanColumn) => string;
  /** Callback to determine if a drag should be disabled */
  isDragDisabled?: (id: Id, type: 'CARD' | 'COLUMN') => boolean;
  /** Class name for the board container */
  className?: string;
  /** Inline styles for the board container */
  style?: React.CSSProperties;
}

/**
 * Props for KanbanColumnView (headless)
 */
export interface KanbanColumnViewProps {
  /** Column data */
  column: KanbanColumn;
  /** Card IDs in this column */
  cardIds: Id[];
  /** Render prop with provided props and snapshot */
  children: (provided: DragProvided, snapshot: DragSnapshot) => React.ReactNode;
  /** Whether column dragging is disabled */
  isDragDisabled?: boolean;
  /** Column index in the board */
  index: number;
}

/**
 * Props for KanbanCardView (headless)
 */
export interface KanbanCardViewProps {
  /** Card data */
  card: KanbanCard;
  /** Render prop with provided props and snapshot */
  children: (provided: DragProvided, snapshot: DragSnapshot) => React.ReactNode;
  /** Whether card dragging is disabled */
  isDragDisabled?: boolean;
  /** Card index within its column */
  index: number;
  /** Parent column ID */
  columnId: Id;
}

/**
 * Internal drag state managed by useKanbanDnd
 */
export interface KanbanDragState {
  /** Currently dragging item ID */
  draggingId: Id | null;
  /** Type of item being dragged */
  draggingType: 'CARD' | 'COLUMN' | null;
  /** Source location */
  source: DragLocation | null;
  /** Current destination (updates during drag) */
  destination: DragLocation | null;
}

/**
 * Autoscroll configuration
 */
export interface AutoscrollConfig {
  /** Distance from edge to trigger autoscroll (px) */
  threshold: number;
  /** Maximum scroll speed (px per frame) */
  maxSpeed: number;
  /** Whether autoscroll is enabled */
  enabled: boolean;
}

/**
 * Live region announcement
 */
export interface LiveAnnouncement {
  /** Message to announce */
  message: string;
  /** Politeness level */
  politeness: 'polite' | 'assertive';
}
