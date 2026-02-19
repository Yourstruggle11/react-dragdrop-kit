# react-dragdrop-kit

A flexible, lightweight drag-and-drop toolkit for React.
Build sortable lists, grids, and Kanban boards with a controlled API and minimal overhead.

[![npm version](https://img.shields.io/npm/v/react-dragdrop-kit.svg)](https://www.npmjs.com/package/react-dragdrop-kit)
[![npm downloads](https://img.shields.io/npm/dm/react-dragdrop-kit.svg)](https://www.npmjs.com/package/react-dragdrop-kit)
[![npm unpacked size](https://img.shields.io/npm/unpacked-size/react-dragdrop-kit)](https://www.npmjs.com/package/react-dragdrop-kit)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Yourstruggle11/react-dragdrop-kit)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Yourstruggle11/react-dragdrop-kit)

## Why this library

`react-dragdrop-kit` is designed around a controlled data model:

- You own state.
- The library reports drag intent and reorder results.
- You decide what to persist and render.

This keeps behavior predictable and easy to integrate with app-specific rules.

## Feature overview

### List and grid drag-and-drop

- Vertical and horizontal list support
- Controlled reorder callback: `onReorder(newItems, orderUpdates)`
- Optional visual drop indicator
- Optional custom drag preview style/class
- Optional handle-only dragging via `dragHandle`
- Optional multi-item drag with `selectedIds` + `multiDragEnabled`
- Optional live list reordering during drag-over via `liveReorder`

### Kanban module

- Card reorder within columns
- Card movement across columns
- Column reordering
- Headless rendering (`renderColumn`, `renderCard`)
- Accessibility helpers (`AnnouncerProvider`, `useAnnouncer`, `announcements`)
- Keyboard drag-reorder is planned, not fully shipped yet
- Live-reorder preview for Kanban is not shipped yet (drop-commit only)

### General

- TypeScript-first API
- Lightweight runtime and tree-shakeable exports
- Built on `@atlaskit/pragmatic-drag-and-drop`

## Installation

```bash
npm install react-dragdrop-kit
# or
pnpm add react-dragdrop-kit
# or
yarn add react-dragdrop-kit
```

## Package entry points

```ts
import { DragDropList } from "react-dragdrop-kit";
```

```ts
import { KanbanBoard, applyDragResult } from "react-dragdrop-kit/kanban";
```

## Quick start: sortable list

```tsx
import { useState } from "react";
import { DragDropList } from "react-dragdrop-kit";

interface Todo {
  id: string;
  position: number;
  title: string;
}

export default function TodoList() {
  const [items, setItems] = useState<Todo[]>([
    { id: "1", position: 0, title: "Design" },
    { id: "2", position: 1, title: "Build" },
    { id: "3", position: 2, title: "Ship" },
  ]);

  return (
    <DragDropList
      items={items}
      onReorder={(next) =>
        setItems(next.map((item, index) => ({ ...item, position: index })))
      }
      renderItem={(item) => (
        <div style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 8 }}>
          {item.title}
        </div>
      )}
      showDropIndicator
      gap={8}
    />
  );
}
```

## Quick start: drag handle and multi-drag

```tsx
<DragDropList
  items={items}
  onReorder={handleReorder}
  renderItem={renderItem}
  dragHandle="[data-drag-handle]"
  selectedIds={selectedIds}
  multiDragEnabled
  liveReorder
/>
```

Behavior notes:

- `dragHandle` is optional. If provided, drag starts only from matching descendants.
- `multiDragEnabled` is opt-in. Without it, behavior remains single-item drag.
- `selectedIds` is consumed only when multi-drag is enabled.
- `liveReorder` is opt-in. Without it, reorder commits on drop (existing behavior).

## Quick start: Kanban board

```tsx
import { useCallback, useState } from "react";
import {
  KanbanBoard,
  applyDragResult,
  type DropResult,
  type KanbanBoardState,
} from "react-dragdrop-kit/kanban";

export default function Board() {
  const [state, setState] = useState<KanbanBoardState>({
    columns: [
      { id: "todo", title: "To Do", cardIds: ["task-1", "task-2"] },
      { id: "done", title: "Done", cardIds: [] },
    ],
    cards: {
      "task-1": { id: "task-1", title: "Design landing page" },
      "task-2": { id: "task-2", title: "Implement auth" },
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
      renderColumn={(column) => <div style={{ padding: 12 }}>{column.title}</div>}
      renderCard={(card) => <div style={{ padding: 12 }}>{card.title}</div>}
    />
  );
}
```

## API reference: list module

### Core types

```ts
type DraggableItem = {
  id: string;
  position: number;
  [key: string]: any;
};

type OrderUpdate = {
  id: string;
  newPosition: number;
  moved?: boolean;
};
```

### DragDropList props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `T[]` | Required | Controlled items. Each item must include `id` and `position`. |
| `onReorder` | `(newItems: T[], orderUpdates: OrderUpdate[]) => void` | Required | Fired after successful drop/reorder. |
| `renderItem` | `(item: T, index: number) => ReactNode` | Required | Item renderer. |
| `containerClassName` | `string` | `""` | Class name for container. |
| `containerStyle` | `React.CSSProperties` | `{}` | Inline style for container. |
| `itemClassName` | `string` | `""` | Class for each draggable wrapper. |
| `itemStyle` | `React.CSSProperties` | `{}` | Style for each draggable wrapper. |
| `dragPreviewClassName` | `string` | `""` | Class for generated drag preview. |
| `dragPreviewStyle` | `React.CSSProperties` | `{}` | Style for generated drag preview. |
| `onDragStart` | `(item: T, index: number) => void` | `undefined` | Callback on item drag start. |
| `onDragEnd` | `(item: T, index: number) => void` | `undefined` | Callback on item drag end. |
| `disabled` | `boolean` | `false` | Disables list drag/drop. |
| `gap` | `number \| string` | `undefined` | Gap applied to container. |
| `direction` | `"vertical" \| "horizontal"` | `"vertical"` | Layout and closest-edge interpretation. |
| `showDropIndicator` | `boolean` | `false` | Enables drop indicator line. |
| `dropIndicatorClassName` | `string` | `""` | Class for drop indicator. |
| `dropIndicatorStyle` | `React.CSSProperties` | `{}` | Style for drop indicator. |
| `dropIndicatorPosition` | `"top" \| "bottom"` | `"bottom"` | Indicator position for hovered target item. |
| `dragHandle` | `string` | `undefined` | CSS selector for handle-only dragging. |
| `selectedIds` | `string[]` | `[]` | Selected IDs used by multi-drag. |
| `multiDragEnabled` | `boolean` | `false` | Enables grouped drag behavior. |
| `liveReorder` | `boolean` | `false` | Reorders list in real time during drag-over. |

## API reference: Kanban module

The full Kanban API is documented in [docs/kanban.md](./docs/kanban.md).

Exports:

- Components: `KanbanBoard`, `KanbanColumnView`, `KanbanCardView`
- Hooks: `useKanbanDnd`, `useAutoscroll`
- A11y: `AnnouncerProvider`, `useAnnouncer`, `announcements`
- Utils: `applyDragResult`, `reorderArray`
- Types: `KanbanBoardState`, `DropResult`, `KanbanCard`, `KanbanColumn`, and more

## Examples

### Repository examples

- `examples/basic-example.tsx`
- `examples/advanced-features.tsx`
- `examples/material-ui-example.tsx`
- `examples/tailwind-example.tsx`
- `examples/kanban/basic-kanban.tsx`
- `examples/kanban/rich-cards-kanban.tsx`
- `examples/kanban/themed-kanban.tsx`
- `examples/kanban/accessible-kanban.tsx`

### Demo examples

- List/grid examples under `apps/demo/src/examples/*`
- Kanban demos:
  - `apps/demo/src/examples/BasicKanban/index.tsx`
  - `apps/demo/src/examples/RichKanban/index.tsx`
  - `apps/demo/src/examples/SwimlanesKanban/index.tsx`
  - `apps/demo/src/examples/WipLimitsKanban/index.tsx`

## Migration notes

### From react-beautiful-dnd

High-level mapping for Kanban use cases:

- `DragDropContext` -> `KanbanBoard`
- `Droppable` -> `KanbanColumnView`
- `Draggable` -> `KanbanCardView`

Important differences:

1. State is normalized (`columns` + `cards`) instead of nested.
2. IDs are explicit and owned by your app.
3. Rendering is done via render functions (`renderColumn`, `renderCard`).

## Development notes

### React Strict Mode

In development, React Strict Mode can mount effects twice.
Ensure listener setup and cleanup are idempotent when integrating custom logic.

## Bundle size

Approximate minified sizes:

- `react-dragdrop-kit`: about 5KB
- `react-dragdrop-kit/kanban`: about 9KB

## Documentation and links

- [Kanban guide](./docs/kanban.md)
- [Known issues](./KNOWN_ISSUES.md)
- [Changelog](./packages/react-dragdrop-kit/CHANGELOG.md)
- [Examples folder](./examples)
- [Demo app](https://react-dragdrop-kit.netlify.app/)

## Support

- [Report issues](https://github.com/Yourstruggle11/react-dragdrop-kit/issues)
- [Request features](https://github.com/Yourstruggle11/react-dragdrop-kit/issues/new)

## License

MIT
