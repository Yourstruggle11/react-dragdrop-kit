# react-dragdrop-kit

A flexible and lightweight **drag-and-drop toolkit for React**. Build **sortable lists, grids, and boards** with a simple, fully-controlled API and customizable previews. Powered by Atlassian’s pragmatic drag-and-drop under the hood.

<p>
  <a href="https://www.npmjs.com/package/react-dragdrop-kit"><img alt="npm" src="https://img.shields.io/npm/v/react-dragdrop-kit.svg?label=react-dragdrop-kit"></a>
  <a href="https://www.npmjs.com/package/react-dragdrop-kit"><img alt="downloads" src="https://img.shields.io/npm/dm/react-dragdrop-kit.svg"></a>
  <a href="https://github.com/Yourstruggle11/react-dragdrop-kit"><img alt="license" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
</p>

---

## ✨ Features

- 🔁 **Sortable** (vertical / horizontal)
- 🎯 **Controlled**: you own the array, update on `onReorder`
- 🧩 **Custom render** per item (cards, compact, detailed… anything)
- 🧲 **Drop indicator** + optional **custom drag preview**
- 🧪 **TypeScript** types included
- ⚡ Ships tiny bundles (only `dist/` published)

---

## 📦 Install

```bash
npm i react-dragdrop-kit
# or
yarn add react-dragdrop-kit
# or
pnpm add react-dragdrop-kit
````


## 🚀 Quick Start (Basic Example)

```tsx
// examples/basic-example.tsx

import * as React from "react";
import { DragDropList, type DraggableItem, type OrderUpdate } from "react-dragdrop-kit";

interface TodoItem extends DraggableItem {
  title: string;
  completed: boolean;
}

const initial: TodoItem[] = [
  { id: "1", position: 0, title: "Learn React", completed: false },
  { id: "2", position: 1, title: "Build awesome app", completed: false },
  { id: "3", position: 2, title: "Deploy to production", completed: false },
];

export default function BasicExample() {
  const [todos, setTodos] = React.useState(initial);

  const handleReorder = (next: TodoItem[], updates: OrderUpdate[]) => {
    // keep positions normalized
    setTodos(next.map((it, i) => ({ ...it, position: i })));
    // optionally send `updates` to your API
    // console.log("order updates", updates);
  };

  return (
    <DragDropList
      items={todos}
      onReorder={handleReorder}
      renderItem={(item) => (
        <div style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 8 }}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() =>
              setTodos((prev) =>
                prev.map((t) => (t.id === item.id ? { ...t, completed: !t.completed } : t))
              )
            }
          />
          <span style={{ marginLeft: 8 }}>{item.title}</span>
        </div>
      )}
      showDropIndicator
      gap={8}
    />
  );
}
```

---

## 🎨 Styled Example (Tailwind)

```tsx
// examples/tailwind-example.tsx

import * as React from "react";
import { DragDropList } from "react-dragdrop-kit";

export default function TailwindExample() {
  const [items, setItems] = React.useState([
    { id: "1", position: 0, name: "Dashboard", icon: "📊" },
    { id: "2", position: 1, name: "Projects",  icon: "📁" },
    { id: "3", position: 2, name: "Team",      icon: "👥" },
    { id: "4", position: 3, name: "Calendar",  icon: "📅" },
  ]);

  return (
    <DragDropList
      items={items}
      onReorder={(next) => setItems(next.map((it, i) => ({ ...it, position: i })))}
      containerClassName="bg-gray-50 rounded-xl p-6 space-y-2"
      itemClassName="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 cursor-move"
      dragPreviewClassName="bg-blue-100 rounded-lg shadow-2xl"
      showDropIndicator
      dropIndicatorClassName="bg-blue-500"
      renderItem={(item) => (
        <div className="flex items-center p-4 space-x-3">
          <span className="text-2xl">{item.icon}</span>
          <span className="font-medium text-gray-700">{item.name}</span>
          <div className="ml-auto">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </div>
        </div>
      )}
    />
  );
}
```

---

## 🧩 API

### `<DragDropList />`

| Prop                     | Type                                          | Default      | Description                                                                                            |
| ------------------------ | --------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------ |
| `items`                  | `Array<DraggableItem & T>`                    | —            | Items to render. Must include `{ id: string; position: number }`. You can extend with your own fields. |
| `onReorder`              | `(next: T[], updates: OrderUpdate[]) => void` | —            | Called after drop. `next` is the new array; `updates` has id + newPosition.                            |
| `renderItem`             | `(item: T) => React.ReactNode`                | —            | Custom renderer for each item.                                                                         |
| `direction`              | `"vertical" \| "horizontal"`                  | `"vertical"` | Drag axis + layout.                                                                                    |
| `gap`                    | `number`                                      | `0`          | Gap (px) between items.                                                                                |
| `disabled`               | `boolean`                                     | `false`      | Disable dragging.                                                                                      |
| `showDropIndicator`      | `boolean`                                     | `false`      | Show a drop indicator while dragging.                                                                  |
| `dropIndicatorClassName` | `string`                                      | —            | CSS class applied to the drop indicator element.                                                       |
| `dragPreviewStyle`       | `React.CSSProperties`                         | —            | Inline styles for custom drag preview.                                                                 |
| `containerClassName`     | `string`                                      | —            | Class applied to the container.                                                                        |
| `itemClassName`          | `string`                                      | —            | Class applied to each item wrapper.                                                                    |
| `containerStyle`         | `React.CSSProperties`                         | —            | Inline styles for the container.                                                                       |
| `itemStyle`              | `React.CSSProperties`                         | —            | Inline styles for each item wrapper.                                                                   |
| `onDragStart`            | `(item: T, index: number) => void`            | —            | Optional callback when drag starts.                                                                    |
| `onDragEnd`              | `(item: T, index: number) => void`            | —            | Optional callback when drag ends.                                                                      |

#### Types

```ts
export type DraggableItem = {
  id: string;
  position: number; // 0-based
};

export type OrderUpdate = {
  id: string;
  newPosition: number;
  // Extend in your app if you need: { oldPosition, moved }
};
```

---

## 🧠 Strict Mode (React 19)

In dev, React Strict Mode **double-mounts** to surface side effects. If you see duplicate `onReorder` calls in development, ensure your event listeners clean up correctly and keep callback identities stable with `useCallback`. Production builds call once.

---

## 📚 More Examples

This repo includes full examples:

* [Basic Example](./examples/basic-example.tsx)
* [Tailwind Example](./examples/tailwind-example.tsx)
* [Material UI Example](./examples/material-ui-example.tsx)
* [Horizontal Kanban](./examples/horizontal-kanban.tsx)
* [Advanced Features](./examples/advanced-features.tsx)
* [Styled Components Example](./examples/styled-components-example.tsx)

👉 Explore the [`examples/`](./examples) folder for the complete code.

---

## 📝 License

MIT © [Yourstruggle11](https://github.com/Yourstruggle11)
