# Release Notes - v1.2.0

## Major Feature: Kanban Board Support

I am thrilled to announce the release of **react-dragdrop-kit v1.2.0**, featuring a complete, production-ready Kanban board implementation!

## What's New

### Kanban Board Module

A fully-featured, headless Kanban board with enterprise-level functionality:

```tsx
import {
  KanbanBoard,
  type KanbanBoardState,
  type DropResult,
  applyDragResult,
} from 'react-dragdrop-kit/kanban';
```

### Key Features

✅ **Drag & Drop**
- Move cards within columns
- Move cards between columns
- Reorder columns by dragging headers
- Cancel by dropping outside board

✅ **Headless Architecture**
- Complete styling control
- Works with any UI framework
- Render props pattern
- Type-safe with full TypeScript support

✅ **Accessibility**
- Screen reader announcements
- Keyboard navigation ready
- ARIA attributes
- Live region updates

✅ **Performance**
- Optimized rendering with memoization
- Lightweight bundle (~9KB minified)
- Tree-shakeable exports
- Virtual scrolling compatible

✅ **Developer Experience**
- Simple, intuitive API
- Comprehensive TypeScript types
- Helper utilities included
- Migration guide from react-beautiful-dnd

### Bundle Size

| Module | Size (Minified) |
|--------|-----------------|
| Main (`react-dragdrop-kit`) | 5.3KB |
| Kanban (`react-dragdrop-kit/kanban`) | 9.4KB |
| **Total (if using both)** | **14.7KB** |

### Demo Application Enhancements

The demo now includes a spectacular Kanban board showcase with:

- 🎨 **4 Themes**: Modern, Minimal, Colorful, Dark
- ✨ **3 Drag Animations**: Rotate, Scale, Lift
- ⚙️ **10+ Customization Options**: Gaps, compact mode, toggles for all features
- 🎯 **Rich Card Features**: Priority badges, avatars, tags, due dates
- 🛠️ **Toolbar Actions**: Reset, shuffle, settings toggle

### Quick Start

```tsx
import { useState } from 'react';
import { KanbanBoard, applyDragResult } from 'react-dragdrop-kit/kanban';

function MyKanban() {
  const [state, setState] = useState({
    columns: [
      { id: 'todo', title: 'To Do', cardIds: ['task-1'] },
      { id: 'done', title: 'Done', cardIds: [] },
    ],
    cards: {
      'task-1': { id: 'task-1', title: 'My first task' },
    },
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    setState(applyDragResult(state, result));
  };

  return (
    <KanbanBoard
      state={state}
      onDragEnd={handleDragEnd}
      renderColumn={(col) => <div>{col.title}</div>}
      renderCard={(card) => <div>{card.title}</div>}
    />
  );
}
```

## 📦 Installation

```bash
npm install react-dragdrop-kit@1.2.0
```

## 🔄 Migration

### From v1.1.0

No breaking changes! Simply upgrade:

```bash
npm install react-dragdrop-kit@latest
```

### From react-beautiful-dnd

See our comprehensive migration guide in `/docs/kanban.md`

## 📚 Documentation

- **Kanban Guide**: [/docs/kanban.md](./docs/kanban.md)
- **API Reference**: Full TypeScript definitions included
- **Examples**: Check the demo app in `/apps/demo`
- **Migration Guide**: From react-beautiful-dnd

## 🧪 Testing

All features thoroughly tested:

- ✅ **38 unit tests** passing
- ✅ **TypeScript** compilation clean
- ✅ **Build** successful
- ✅ **Demo app** running smoothly

## 🎯 Use Cases

Perfect for:

- Project management tools
- Task tracking systems
- Workflow builders
- Agile boards
- Issue trackers
- Content organization
- Any drag-and-drop board interface

## 🙏 Credits

- Built with [`@atlaskit/pragmatic-drag-and-drop`](https://atlassian.design/components/pragmatic-drag-and-drop)
- Inspired by `react-beautiful-dnd` API design
- Community feedback and contributions

## 🐛 Bug Fixes

- Fixed TypeScript type issues in test files
- Updated card property from `content` to `title` for consistency

## 📈 Stats

- **Components**: 6 new (3 public, 3 internal)
- **Hooks**: 2 new
- **Utilities**: 5 new helper functions
- **Types**: 15+ new TypeScript interfaces
- **Tests**: 29 new unit tests
- **Documentation**: 300+ lines

## 🔮 Future Roadmap

- Keyboard navigation (useKeyboardDnd hook)
- Virtual scrolling examples
- E2E tests with Playwright
- Additional themes and presets
- Performance benchmarks

## 🚀 Get Started

Visit the [demo application](https://react-dragdrop-kit.netlify.app/) and click the "🗂️ Kanban Board" tab to see it in action!

---

**Full Changelog**: [CHANGELOG.md](./CHANGELOG.md)

**Questions?** Open an issue on [GitHub](https://github.com/Yourstruggle11/react-dragdrop-kit/issues)

Made with ❤️ by <a href="https://github.com/Yourstruggle11" target="_blank" rel="noopener noreferrer">Yourstruggle11</a>
