# react-dragdrop-kit

A flexible and lightweight **drag-and-drop toolkit for React**. Build **sortable lists, grids, and Kanban boards** with a simple, fully-controlled API and customizable previews. Powered by Atlassian's pragmatic drag-and-drop under the hood.

<p>
  <a href="https://www.npmjs.com/package/react-dragdrop-kit"><img alt="npm" src="https://img.shields.io/npm/v/react-dragdrop-kit.svg?label=react-dragdrop-kit"></a>
  <a href="https://www.npmjs.com/package/react-dragdrop-kit"><img alt="downloads" src="https://img.shields.io/npm/dm/react-dragdrop-kit.svg"></a>
  <a href="https://github.com/Yourstruggle11/react-dragdrop-kit"><img alt="license" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
</p>

---

## ✨ Features

### Drag & Drop Lists
- 🔁 **Sortable** lists (vertical / horizontal)
- 🎯 **Controlled**: you own the array, update on `onReorder`
- 🧩 **Custom render** per item (cards, compact, detailed… anything)
- 🧲 **Drop indicator** + optional **custom drag preview**

### 🆕 Kanban Boards (v1.2.0+)
- 📋 **Full-featured Kanban board** with column and card management
- 🔄 **Cross-column dragging** - Move cards between columns seamlessly
- 🎨 **Headless architecture** - Complete styling control
- ♿ **Accessible** - Screen reader announcements and keyboard support
- 📱 **Touch-friendly** - Works on mobile devices
- 🎯 **TypeScript-first** - Full type safety

### General
- 🧪 **TypeScript** types included
- ⚡ **Tiny bundles** (~5KB main, ~9KB Kanban)
- 🎨 **Framework agnostic styling** - Works with Tailwind, MUI, Chakra, etc.
- 📚 **Comprehensive documentation**

---

## 📦 Install

```bash
npm i react-dragdrop-kit
# or
yarn add react-dragdrop-kit
# or
pnpm add react-dragdrop-kit
```

---

## 🚀 Quick Start

### Sortable List

```tsx
import { useState } from "react";
import { DragDropList } from "react-dragdrop-kit";

function App() {
  const [items, setItems] = useState([
    { id: "1", position: 0, title: "Learn React" },
    { id: "2", position: 1, title: "Build awesome app" },
    { id: "3", position: 2, title: "Deploy to production" },
  ]);

  return (
    <DragDropList
      items={items}
      onReorder={(next) => setItems(next.map((it, i) => ({ ...it, position: i })))}
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

### Kanban Board

```tsx
import { useState } from 'react';
import {
  KanbanBoard,
  applyDragResult,
  AnnouncerProvider,
} from 'react-dragdrop-kit/kanban';

function App() {
  const [state, setState] = useState({
    columns: [
      { id: 'todo', title: 'To Do', cardIds: ['task-1', 'task-2'] },
      { id: 'done', title: 'Done', cardIds: [] },
    ],
    cards: {
      'task-1': { id: 'task-1', title: 'Design landing page' },
      'task-2': { id: 'task-2', title: 'Implement auth' },
    },
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    setState(applyDragResult(state, result));
  };

  return (
    <AnnouncerProvider>
      <KanbanBoard
        state={state}
        onDragEnd={handleDragEnd}
        renderColumn={(col) => <div style={{ padding: 16 }}>{col.title}</div>}
        renderCard={(card) => (
          <div style={{ padding: 12, background: '#fff', borderRadius: 8 }}>
            {card.title}
          </div>
        )}
      />
    </AnnouncerProvider>
  );
}
```

---

## 🎨 Styled Examples

### With Tailwind CSS

```tsx
import { DragDropList } from "react-dragdrop-kit";

export default function TailwindExample() {
  const [items, setItems] = useState([
    { id: "1", position: 0, name: "Dashboard", icon: "📊" },
    { id: "2", position: 1, name: "Projects",  icon: "📁" },
    { id: "3", position: 2, name: "Team",      icon: "👥" },
  ]);

  return (
    <DragDropList
      items={items}
      onReorder={(next) => setItems(next.map((it, i) => ({ ...it, position: i })))}
      containerClassName="bg-gray-50 rounded-xl p-6 space-y-2"
      itemClassName="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 cursor-move"
      showDropIndicator
      dropIndicatorClassName="bg-blue-500"
      renderItem={(item) => (
        <div className="flex items-center p-4 space-x-3">
          <span className="text-2xl">{item.icon}</span>
          <span className="font-medium text-gray-700">{item.name}</span>
        </div>
      )}
    />
  );
}
```

---

## 📚 API Reference

### DragDropList Component

| Prop                     | Type                                          | Default      | Description                                                                                            |
| ------------------------ | --------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------ |
| `items`                  | `Array<DraggableItem & T>`                    | —            | Items to render. Must include `{ id: string; position: number }`.                                      |
| `onReorder`              | `(next: T[], updates: OrderUpdate[]) => void` | —            | Called after drop. `next` is the new array; `updates` has id + newPosition.                            |
| `renderItem`             | `(item: T) => React.ReactNode`                | —            | Custom renderer for each item.                                                                         |
| `direction`              | `"vertical" \| "horizontal"`                  | `"vertical"` | Drag axis + layout.                                                                                    |
| `gap`                    | `number`                                      | `0`          | Gap (px) between items.                                                                                |
| `disabled`               | `boolean`                                     | `false`      | Disable dragging.                                                                                      |
| `showDropIndicator`      | `boolean`                                     | `false`      | Show a drop indicator while dragging.                                                                  |
| `dropIndicatorPosition`  | `"top" \| "bottom"`                           | `"bottom"`   | Position of drop indicator relative to target item.                                                    |
| `dropIndicatorClassName` | `string`                                      | —            | CSS class applied to the drop indicator element.                                                       |
| `dragPreviewStyle`       | `React.CSSProperties`                         | —            | Inline styles for custom drag preview.                                                                 |
| `containerClassName`     | `string`                                      | —            | Class applied to the container.                                                                        |
| `itemClassName`          | `string`                                      | —            | Class applied to each item wrapper.                                                                    |

### Kanban Components

See the [Kanban Documentation](./docs/kanban.md) for complete API reference, including:
- `KanbanBoard` - High-level component
- `KanbanColumnView` - Headless column component
- `KanbanCardView` - Headless card component
- `AnnouncerProvider` - Accessibility provider
- Helper utilities and types

---

## 🗂️ Kanban Board Features

### Core Functionality
- ✅ **Drag cards** within and between columns
- ✅ **Reorder columns** by dragging headers
- ✅ **Empty column support** - Drop into columns with no cards
- ✅ **Cancel drag** - Drop outside board to cancel
- ✅ **Normalized state** - Efficient data structure

### Accessibility (a11y)
- ♿ **Screen reader support** with live announcements
- 🎹 **Keyboard navigation** (infrastructure ready)
- 🏷️ **Proper ARIA attributes**
- 📢 **Context-aware messages**

### Developer Experience
- 📘 **Full TypeScript support**
- 🎨 **Headless architecture** - Style with any framework
- 🔧 **Helper utilities** - `applyDragResult`, reorder functions
- 📖 **Migration guide** from react-beautiful-dnd

### Customization
The Kanban board is completely headless, giving you full control:
- Custom card designs
- Custom column headers
- Theme support
- Animation styles
- Responsive layouts

---

## 📂 Examples

This repo includes comprehensive examples:

### Drag & Drop Lists
* [Basic Example](./examples/basic-example.tsx)
* [Tailwind Example](./examples/tailwind-example.tsx)
* [Material UI Example](./examples/material-ui-example.tsx)
* [Advanced Features](./examples/advanced-features.tsx)
* [Styled Components](./examples/styled-components-example.tsx)

### Kanban Boards
* [Basic Kanban](./examples/kanban/basic-kanban.tsx)
* [Rich Cards with Tags & Avatars](./examples/kanban/rich-cards-kanban.tsx)
* [Multi-theme Kanban](./examples/kanban/themed-kanban.tsx)
* [Kanban with Accessibility](./examples/kanban/accessible-kanban.tsx)

👉 Explore the [`examples/`](./examples) folder for the complete code.

🎮 **Live Demo**: Check out our [interactive demo app](https://react-dragdrop-kit.netlify.app/) with full Kanban showcase!

---

## 🧠 Advanced Usage

### TypeScript

```tsx
import type { DraggableItem, OrderUpdate, KanbanBoardState, DropResult } from 'react-dragdrop-kit';
import type { KanbanCard, KanbanColumn } from 'react-dragdrop-kit/kanban';

// Extend with custom fields
interface TodoItem extends DraggableItem {
  title: string;
  completed: boolean;
}

interface ProjectCard extends KanbanCard {
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  tags: string[];
}
```

### React Strict Mode (React 19)

In dev, React Strict Mode **double-mounts** to surface side effects. If you see duplicate `onReorder` calls in development, ensure your event listeners clean up correctly and keep callback identities stable with `useCallback`. Production builds call once.

---

## 📊 Bundle Size

| Module | Size (Minified) |
|--------|-----------------|
| `react-dragdrop-kit` (Main) | ~5KB |
| `react-dragdrop-kit/kanban` | ~9KB |

Tree-shakeable exports mean you only pay for what you use!

---

## 🔄 Migration Guides

### From react-beautiful-dnd

See our comprehensive [Kanban migration guide](./docs/kanban.md#migration-from-react-beautiful-dnd) for step-by-step instructions on migrating from `react-beautiful-dnd`.

Key differences:
- Normalized state structure
- No auto-generated IDs
- Render props instead of children
- Better TypeScript support

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

MIT © [Yourstruggle11](https://github.com/Yourstruggle11)

---

## 🙏 Credits

Built with:
- [`@atlaskit/pragmatic-drag-and-drop`](https://atlassian.design/components/pragmatic-drag-and-drop) - Performance-focused drag and drop
- Inspired by `react-beautiful-dnd` API design
- Community feedback and contributions

---

## 📖 Documentation

- [Kanban Board Guide](./docs/kanban.md)
- [CHANGELOG](./CHANGELOG.md)
- [Examples](./examples/)
- [Demo Application](https://react-dragdrop-kit.netlify.app/)

---

## 💬 Support

- 🐛 [Report Issues](https://github.com/Yourstruggle11/react-dragdrop-kit/issues)
- 💡 [Request Features](https://github.com/Yourstruggle11/react-dragdrop-kit/issues/new)
- ⭐ [Star on GitHub](https://github.com/Yourstruggle11/react-dragdrop-kit)

---

<div align="center">
  <strong>Made with ❤️ by <a href="https://github.com/Yourstruggle11" target="_blank" rel="noopener noreferrer">Yourstruggle11</a> for the React community</strong>
</div>
