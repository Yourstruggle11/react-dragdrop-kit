# Kanban Board Guide

`react-dragdrop-kit/kanban` provides a headless, controlled Kanban implementation for React.
It is designed for flexibility in styling while keeping drag/drop state predictable.

## What you get

- Card movement within columns
- Card movement across columns
- Column reordering
- Controlled state model
- Headless rendering with render functions
- Accessibility announcement helpers
- Keyboard drag-reorder planned (not fully shipped yet)
- Kanban live-reorder preview is not shipped yet (reorder commits on drop)

## Installation

```bash
npm install react-dragdrop-kit
```

## Imports

```tsx
import {
  KanbanBoard,
  KanbanColumnView,
  KanbanCardView,
  applyDragResult,
  reorderArray,
  AnnouncerProvider,
  useAnnouncer,
  announcements,
  type KanbanBoardState,
  type KanbanColumn,
  type KanbanCard,
  type DropResult,
} from "react-dragdrop-kit/kanban";
```

## State model

```ts
type KanbanBoardState = {
  columns: KanbanColumn[];
  cards: Record<string, KanbanCard>;
};

type KanbanColumn = {
  id: string;
  title: string;
  cardIds: string[];
  [key: string]: any;
};

type KanbanCard = {
  id: string;
  title: string;
  [key: string]: any;
};
```

### Why normalized state

- Cross-column moves only update `cardIds` arrays.
- Card lookup stays O(1) by ID.
- State updates remain straightforward and testable.

## Quick start

```tsx
import { useCallback, useState } from "react";
import {
  KanbanBoard,
  applyDragResult,
  type KanbanBoardState,
  type DropResult,
} from "react-dragdrop-kit/kanban";

export default function Board() {
  const [state, setState] = useState<KanbanBoardState>({
    columns: [
      { id: "todo", title: "To Do", cardIds: ["task-1", "task-2"] },
      { id: "in-progress", title: "In Progress", cardIds: ["task-3"] },
      { id: "done", title: "Done", cardIds: [] },
    ],
    cards: {
      "task-1": { id: "task-1", title: "Design landing page" },
      "task-2": { id: "task-2", title: "Implement auth" },
      "task-3": { id: "task-3", title: "Fix checkout bug" },
    },
  });

  const handleDragEnd = useCallback(
    (result: DropResult, stateBefore: KanbanBoardState) => {
      if (!result.destination) return;
      setState(applyDragResult(stateBefore, result));
    },
    []
  );

  return (
    <KanbanBoard
      state={state}
      onDragEnd={handleDragEnd}
      renderColumn={(column) => <div>{column.title}</div>}
      renderCard={(card) => <div>{card.title}</div>}
    />
  );
}
```

## KanbanBoard API

```tsx
<KanbanBoard
  state={state}
  onDragEnd={handleDragEnd}
  onDragStart={handleDragStart}
  renderColumn={renderColumn}
  renderCard={renderCard}
  getCardKey={(card) => card.id}
  getColumnKey={(column) => column.id}
  isDragDisabled={(id, type) => false}
  className="board"
  style={{ gap: "16px" }}
/>
```

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | `KanbanBoardState` | Yes | Controlled board state. |
| `onDragEnd` | `(result: DropResult, stateBefore: KanbanBoardState) => void` | Yes | Called when drag ends. |
| `onDragStart` | `(draggable: { id: Id; type: "CARD" \| "COLUMN" }) => void` | No | Called when drag starts. |
| `renderColumn` | `(column, provided, snapshot) => ReactNode` | Yes | Render function for each column container/header. |
| `renderCard` | `(card, provided, snapshot) => ReactNode` | Yes | Render function for each card. |
| `getCardKey` | `(card) => string` | No | Custom card key extractor. Defaults to `card.id`. |
| `getColumnKey` | `(column) => string` | No | Custom column key extractor. Defaults to `column.id`. |
| `isDragDisabled` | `(id, type) => boolean` | No | Disable drag for specific cards/columns. |
| `className` | `string` | No | Class for board root. |
| `style` | `React.CSSProperties` | No | Inline style for board root. |

Note:
- `KanbanBoard` currently does not expose a `liveReorder` prop.
- Reordering is committed on drop through `onDragEnd`.

## DropResult structure

```ts
type DropResult = {
  type: "CARD" | "COLUMN";
  draggableId: string;
  source: {
    columnId?: string;
    index: number;
  };
  destination?: {
    columnId?: string;
    index: number;
  };
};
```

## State helper utilities

### applyDragResult

```tsx
const nextState = applyDragResult(stateBefore, result);
setState(nextState);
```

Handles:

- Card reorder within same column
- Card move to different column
- Column reorder

### reorderArray

Utility for generic array reordering.

```ts
const reordered = reorderArray(items, startIndex, endIndex);
```

## Headless primitives

Use these when you need fine-grained structure or integration.

### KanbanColumnView

```tsx
<KanbanColumnView
  column={column}
  cardIds={column.cardIds}
  index={columnIndex}
  isDragDisabled={false}
>
  {(provided, snapshot) => (
    <div ref={provided.innerRef} {...provided.draggableProps}>
      <div {...provided.dragHandleProps}>{column.title}</div>
      <div ref={provided.dropZoneRef}>{/* cards here */}</div>
    </div>
  )}
</KanbanColumnView>
```

### KanbanCardView

```tsx
<KanbanCardView
  card={card}
  index={cardIndex}
  columnId={column.id}
  isDragDisabled={false}
>
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {card.title}
    </div>
  )}
</KanbanCardView>
```

## Accessibility

### Announcements

Wrap your board with `AnnouncerProvider` to enable live region announcements:

```tsx
import { AnnouncerProvider } from "react-dragdrop-kit/kanban";

<AnnouncerProvider>
  <KanbanBoard {...props} />
</AnnouncerProvider>;
```

You can also use:

- `useAnnouncer()` for custom announcement triggers
- `announcements` helper messages for common drag states

### Keyboard status

Keyboard drag-reorder is not fully shipped yet.
Use pointer/touch interactions in production for now.

### Live reorder status

Kanban currently uses drop-commit semantics.
Live preview reordering during drag-over is tracked as a known limitation.

## Styling patterns

Because the API is headless, style with any system:

- CSS modules
- Tailwind
- Styled Components
- MUI/Chakra wrappers

Useful pattern:

```tsx
const renderCard = (card, provided, snapshot) => (
  <div
    style={{
      opacity: snapshot.isDragging ? 0.65 : 1,
      boxShadow: snapshot.isDragging
        ? "0 8px 24px rgba(0,0,0,0.15)"
        : "0 1px 3px rgba(0,0,0,0.08)",
    }}
  >
    {card.title}
  </div>
);
```

## Advanced usage

### Custom card/column fields

You can include additional fields directly in `cards` and `columns` entries.

```ts
const state: KanbanBoardState = {
  columns: [
    {
      id: "todo",
      title: "To Do",
      cardIds: ["task-1"],
      wipLimit: 3,
    },
  ],
  cards: {
    "task-1": {
      id: "task-1",
      title: "Implement auth",
      assignee: "Alice",
      priority: "high",
    },
  },
};
```

### Conditional drag disable

```tsx
<KanbanBoard
  isDragDisabled={(id, type) => {
    if (type === "CARD") {
      const card = state.cards[id] as { locked?: boolean } | undefined;
      return card?.locked === true;
    }
    if (type === "COLUMN") {
      return id === "done";
    }
    return false;
  }}
  {...props}
/>
```

### Large boards

For large card lists:

1. Memoize `renderColumn` and `renderCard` with `useCallback`.
2. Keep keys stable.
3. Use virtualization for card-heavy columns.

## Migration from react-beautiful-dnd

| react-beautiful-dnd | react-dragdrop-kit/kanban |
| --- | --- |
| `DragDropContext` | `KanbanBoard` |
| `Droppable` | `KanbanColumnView` |
| `Draggable` | `KanbanCardView` |
| `onDragEnd(result)` | `onDragEnd(result, stateBefore)` |

Key differences:

1. Normalized state (`columns` + `cards`) instead of nested arrays.
2. IDs are owned by your app.
3. Rendering uses explicit render functions.

## Example references

Repository examples:

- `../examples/kanban/basic-kanban.tsx`
- `../examples/kanban/rich-cards-kanban.tsx`
- `../examples/kanban/themed-kanban.tsx`
- `../examples/kanban/accessible-kanban.tsx`

Demo examples:

- `../apps/demo/src/examples/BasicKanban/index.tsx`
- `../apps/demo/src/examples/RichKanban/index.tsx`
- `../apps/demo/src/examples/SwimlanesKanban/index.tsx`
- `../apps/demo/src/examples/WipLimitsKanban/index.tsx`

## License

MIT
