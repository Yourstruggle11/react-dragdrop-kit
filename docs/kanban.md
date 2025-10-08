# Kanban Board

A headless, accessible Kanban board implementation for React, powered by `@atlaskit/pragmatic-drag-and-drop`.

## Features

- 🎯 **Headless Architecture**: Full control over styling and presentation
- ♿ **Accessible**: Built-in screen reader announcements and keyboard navigation
- 🎨 **Flexible**: Works with any UI framework (Tailwind, MUI, Chakra, etc.)
- 📦 **Lightweight**: ~10-13 KB minified + gzipped
- 🔄 **Cross-Column Dragging**: Easily move cards between columns
- 🔀 **Column Reordering**: Drag columns to reorganize your board
- ⌨️ **Keyboard Support**: Full keyboard navigation (coming soon)
- 📱 **Touch Friendly**: Works seamlessly on mobile devices

## Installation

```bash
npm install react-dragdrop-kit
```

## Quick Start

```tsx
import { useState, useCallback } from 'react';
import {
  KanbanBoard,
  type KanbanBoardState,
  type DropResult,
  applyDragResult,
} from 'react-dragdrop-kit/kanban';

function App() {
  const [state, setState] = useState<KanbanBoardState>({
    columns: [
      {
        id: 'todo',
        title: 'To Do',
        cardIds: ['task-1', 'task-2'],
      },
      {
        id: 'in-progress',
        title: 'In Progress',
        cardIds: ['task-3'],
      },
      {
        id: 'done',
        title: 'Done',
        cardIds: [],
      },
    ],
    cards: {
      'task-1': { id: 'task-1', content: 'Design landing page' },
      'task-2': { id: 'task-2', content: 'Implement auth' },
      'task-3': { id: 'task-3', content: 'Fix bug in checkout' },
    },
  });

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    const newState = applyDragResult(state, result);
    setState(newState);
  }, [state]);

  const renderColumn = useCallback((column, provided, snapshot) => (
    <div style={{ padding: '12px', background: '#f3f4f6' }}>
      {column.title}
    </div>
  ), []);

  const renderCard = useCallback((card, provided, snapshot) => (
    <div style={{ padding: '12px', background: '#fff', border: '1px solid #e5e7eb' }}>
      {card.content}
    </div>
  ), []);

  return (
    <KanbanBoard
      state={state}
      onDragEnd={handleDragEnd}
      renderColumn={renderColumn}
      renderCard={renderCard}
    />
  );
}
```

## Data Model

The Kanban board uses a **normalized state structure** for optimal performance:

```typescript
type KanbanBoardState = {
  columns: KanbanColumn[];      // Ordered list of columns
  cards: Record<Id, Card>;      // Flat lookup for all cards
}

type KanbanColumn = {
  id: string;
  title: string;
  cardIds: string[];           // References to cards in this column
}

type KanbanCard = {
  id: string;
  content: string;
  // ... any other custom fields
}
```

**Why normalized state?**
- Prevents deep nesting (`columns[i].cards[j]`)
- Easy to move cards: just update `cardIds` array
- Single source of truth for card data
- Better performance with large datasets

## API Reference

### `KanbanBoard`

The high-level component that renders a complete Kanban board.

```tsx
<KanbanBoard
  state={state}
  onDragEnd={handleDragEnd}
  renderColumn={renderColumn}
  renderCard={renderCard}
  onDragStart={handleDragStart}
  getCardKey={(card) => card.id}
  getColumnKey={(column) => column.id}
  isDragDisabled={(id, type) => false}
  className="my-kanban"
  style={{ gap: '16px' }}
/>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `state` | `KanbanBoardState` | ✅ | The current board state |
| `onDragEnd` | `(result: DropResult) => void` | ✅ | Callback fired when drag ends |
| `renderColumn` | `(column, provided, snapshot) => ReactNode` | ✅ | Render function for column header |
| `renderCard` | `(card, provided, snapshot) => ReactNode` | ✅ | Render function for cards |
| `onDragStart` | `(draggable: { id, type }) => void` | ❌ | Callback fired when drag starts |
| `getCardKey` | `(card) => string` | ❌ | Custom key extractor for cards (default: `card.id`) |
| `getColumnKey` | `(column) => string` | ❌ | Custom key extractor for columns (default: `column.id`) |
| `isDragDisabled` | `(id, type) => boolean` | ❌ | Disable dragging for specific items |
| `className` | `string` | ❌ | CSS class for the board container |
| `style` | `CSSProperties` | ❌ | Inline styles for the board container |

### `DropResult`

The result object passed to `onDragEnd`:

```typescript
type DropResult = {
  type: 'CARD' | 'COLUMN';
  draggableId: string;
  source: {
    columnId?: string;  // undefined for column drags
    index: number;
  };
  destination?: {
    columnId?: string;  // undefined for column drags
    index: number;
  };
}
```

### `applyDragResult(state, result)`

A helper function that applies a drop result to your state:

```tsx
const newState = applyDragResult(currentState, result);
setState(newState);
```

This handles:
- Moving cards within the same column
- Moving cards between columns
- Reordering columns

### Headless Components

For more control, use the low-level headless components:

#### `KanbanColumnView`

```tsx
<KanbanColumnView
  column={column}
  cardIds={column.cardIds}
  index={columnIndex}
  isDragDisabled={false}
>
  {(provided, snapshot) => (
    <div ref={provided.innerRef} {...provided.draggableProps}>
      <div {...provided.dragHandleProps}>
        {/* Column header */}
      </div>
      <div ref={provided.dropZoneRef}>
        {/* Card list */}
      </div>
    </div>
  )}
</KanbanColumnView>
```

#### `KanbanCardView`

```tsx
<KanbanCardView
  card={card}
  index={cardIndex}
  columnId={columnId}
  isDragDisabled={false}
>
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {/* Card content */}
    </div>
  )}
</KanbanCardView>
```

## Styling

The Kanban board is completely **headless** - you have full control over styling.

### Example with Tailwind CSS

```tsx
const renderColumn = (column, provided, snapshot) => (
  <div className={cn(
    "px-4 py-3 bg-gray-100 rounded-t-lg font-semibold",
    snapshot.isDragging && "opacity-50"
  )}>
    {column.title}
  </div>
);

const renderCard = (card, provided, snapshot) => (
  <div className={cn(
    "p-3 bg-white rounded-md border border-gray-200",
    snapshot.isDragging && "shadow-xl ring-2 ring-blue-500"
  )}>
    {card.content}
  </div>
);
```

### Drag States

Both `renderColumn` and `renderCard` receive a `snapshot` object:

```typescript
type DragSnapshot = {
  isDragging: boolean;
}
```

Use this to style items during drag:

```tsx
const renderCard = (card, provided, snapshot) => (
  <div style={{
    opacity: snapshot.isDragging ? 0.5 : 1,
    transform: snapshot.isDragging ? 'rotate(5deg)' : 'none',
  }}>
    {card.content}
  </div>
);
```

## Accessibility

The Kanban board includes built-in accessibility features:

### Screen Reader Announcements

Use the `AnnouncerProvider` to enable live region announcements:

```tsx
import { AnnouncerProvider } from 'react-dragdrop-kit/kanban';

function App() {
  return (
    <AnnouncerProvider>
      <KanbanBoard {...props} />
    </AnnouncerProvider>
  );
}
```

Announcements:
- "Picked up Card X from Column Y"
- "Moved Card X to Column Z at position N"
- "Dropped Card X. No changes made." (on cancel)

### Keyboard Navigation

*(Coming soon in next release)*

- `Space/Enter`: Pick up focused card
- `Arrow Keys`: Navigate between cards/columns
- `Escape`: Cancel drag

## Advanced Usage

### Custom Card Data

Add any fields to your cards:

```typescript
type CustomCard = {
  id: string;
  content: string;
  assignee?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

const state: KanbanBoardState<CustomCard> = {
  columns: [...],
  cards: {
    'task-1': {
      id: 'task-1',
      content: 'Design landing page',
      assignee: 'Alice',
      priority: 'high',
      dueDate: new Date('2025-10-15'),
    },
  },
};
```

### Disable Dragging

Conditionally disable dragging for specific items:

```tsx
<KanbanBoard
  isDragDisabled={(id, type) => {
    if (type === 'CARD') {
      const card = state.cards[id];
      return card.locked === true;
    }
    if (type === 'COLUMN') {
      return id === 'done'; // Don't allow dragging "Done" column
    }
    return false;
  }}
  {...props}
/>
```

### Virtual Scrolling

For large boards, use with `react-window` or `react-virtual`:

```tsx
import { FixedSizeList } from 'react-window';

const renderColumn = (column, provided, snapshot) => (
  <div>
    <div {...provided.dragHandleProps}>{column.title}</div>
    <FixedSizeList
      height={600}
      itemCount={column.cardIds.length}
      itemSize={80}
    >
      {({ index, style }) => (
        <div style={style}>
          <KanbanCardView
            card={state.cards[column.cardIds[index]]}
            index={index}
            columnId={column.id}
          >
            {renderCard}
          </KanbanCardView>
        </div>
      )}
    </FixedSizeList>
  </div>
);
```

## Migration from react-beautiful-dnd

If you're coming from `react-beautiful-dnd`, here's how the APIs map:

| react-beautiful-dnd | react-dragdrop-kit/kanban |
|---------------------|---------------------------|
| `DragDropContext` | `KanbanBoard` |
| `Droppable` | `KanbanColumnView` |
| `Draggable` | `KanbanCardView` |
| `onDragEnd` | `onDragEnd` (similar signature) |

**Key Differences:**

1. **State Structure**: Use normalized state (columns + cards object) instead of nested data
2. **No Auto IDs**: You provide all IDs (no `draggableId`/`droppableId` auto-generation)
3. **Render Props**: Use `renderColumn` and `renderCard` functions

## Examples

See the [demo app](../apps/demo/src/components/KanbanExample.tsx) for a complete working example.

## Performance Tips

1. **Memoize render functions**:
   ```tsx
   const renderCard = useCallback((card, provided, snapshot) => (
     // ...
   ), []);
   ```

2. **Use stable keys**:
   ```tsx
   getCardKey={(card) => card.id}
   getColumnKey={(column) => column.id}
   ```

3. **Optimize large lists**:
   - Consider virtual scrolling for 100+ cards
   - Use `React.memo()` for card components
   - Debounce expensive operations in `onDragEnd`

## Bundle Size

- **Core**: ~10-13 KB (minified + gzipped)
- **No new dependencies**: Uses existing `@atlaskit/pragmatic-drag-and-drop`
- **Tree-shakeable**: Import only what you need

## License

MIT

## Credits

Built with [`@atlaskit/pragmatic-drag-and-drop`](https://atlassian.design/components/pragmatic-drag-and-drop/about) - a performant, accessible drag-and-drop library by Atlassian.
