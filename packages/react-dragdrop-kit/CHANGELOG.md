# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 09-10-2025

### Added - Kanban Board Feature

#### Core Components
- **`KanbanBoard`** - High-level component for complete Kanban board implementation
- **`KanbanColumnView`** - Headless column component with drag-and-drop support
- **`KanbanCardView`** - Headless card component for individual tasks
- **Normalized state architecture** - Efficient data structure with columns and flat card lookup

#### Functionality
- ✅ **Card dragging** - Move cards within and between columns
- ✅ **Column reordering** - Drag column headers to reorganize board
- ✅ **Cross-column movement** - Seamless card transfers between columns
- ✅ **Empty column support** - Drop cards into columns with no items
- ✅ **Cancel drag** - Drop outside board to cancel operation
- ✅ **Drag state tracking** - Real-time feedback during drag operations

#### Utilities & Helpers
- **`applyDragResult`** - Helper function to apply drag operations to state
- **`reorderArray`** - Utility for array reordering operations
- **DnD math utilities** - Collision detection, scroll speed calculation, edge detection
- **DOM helpers** - Bounding rect calculations, scroll utilities

#### Accessibility
- **`AnnouncerProvider`** - Screen reader announcements for drag operations
- **`useLiveRegion`** - Hook for polite ARIA live region announcements
- **Keyboard support ready** - Infrastructure for future keyboard navigation

#### Hooks
- **`useKanbanDnd`** - Core drag-and-drop logic and state management
- **`useAutoscroll`** - Automatic scrolling near container edges

#### TypeScript Support
- Full type definitions for all components and utilities
- Generic card and column types for extensibility
- Comprehensive `DropResult` interface
- `DragProvided` and `DragSnapshot` for render props

#### Documentation
- Comprehensive Kanban documentation in `/docs/kanban.md`
- Quick start guide
- Complete API reference
- Migration guide from `react-beautiful-dnd`
- Advanced usage examples
- Performance tips

#### Testing
- **29 unit tests** covering:
  - Card reordering within columns
  - Cross-column card movement
  - Column reordering
  - DnD math utilities
  - Edge cases and error handling

#### Demo Application
- Interactive Kanban example in demo app
- **4 visual themes**: Modern, Minimal, Colorful, Dark
- **3 drag animations**: Rotate, Scale, Lift
- **Comprehensive settings panel** with:
  - Theme switcher
  - Animation style selector
  - Adjustable column and card spacing
  - Toggle for emojis, avatars, tags, priority, due dates
  - Compact mode
- **Toolbar actions**: Reset, Shuffle, Toggle Settings
- **Rich card features**:
  - Priority badges (high/medium/low)
  - Assignee avatars
  - Tags with theme-aware styling
  - Due dates with overdue warnings
- **Professional UI** with glassmorphism and smooth animations

### Package Updates
- Added `/kanban` export path for modular imports
- Updated Rollup config for separate Kanban bundle
- Updated package description to mention Kanban boards
- Added Kanban-related keywords

### Build & Development
- Separate build outputs for main and Kanban modules
- Tree-shakeable exports
- TypeScript compilation checks passing
- All tests passing (38 total)

### Breaking Changes
- None - Fully backward compatible with v1.1.0

---

## [1.1.0] - 08-10-2025

### Added
- **`dropIndicatorPosition` prop** - New optional prop for `DragDropList` component to control drop indicator placement
  - Accepts `"top"` or `"bottom"` (default: `"bottom"`)
  - Allows users to customize where the drop indicator appears when dragging items
  - Available on both `DragDropList` and `DraggableItemWrapper` components

### Fixed
- **TypeScript declaration generation** - Fixed Rollup configuration to properly generate `.d.ts` type definition files
  - Added `declaration: true` to TypeScript plugin in rollup config
  - Updated `package.json` types path to point to correct location (`dist/src/index.d.ts`)
  - Ensures TypeScript consumers get proper type checking and IntelliSense support

### Changed
- Updated Rollup configuration to include TypeScript declaration output
- Updated package.json to correctly reference generated type definitions

---

## [1.0.0] - 30-08-2025

### Added
- Initial release of `react-dragdrop-kit`
- **`DragDropList`** component for sortable lists with vertical/horizontal support
- **`DraggableItemWrapper`** component for custom drag-and-drop implementations
- **`useDragDropMonitor`** hook for drag-and-drop state monitoring
- Built on top of `@atlaskit/pragmatic-drag-and-drop` for performance and reliability
- Full TypeScript support with comprehensive type definitions
- Customizable styling and drag previews
- Drop indicator support for visual feedback
- Comprehensive test suite with Jest and React Testing Library
- Complete documentation and examples
- Demo application with interactive examples

### Package Features
- Tree-shakeable ES modules
- CommonJS support
- Full TypeScript declarations
- MIT licensed

---

## Migration Guide

### From 1.1.0 to 1.2.0

No breaking changes! Simply install the new version:

```bash
npm install react-dragdrop-kit@1.2.0
```

To use the new Kanban feature:

```tsx
import {
  KanbanBoard,
  type KanbanBoardState,
  type DropResult,
  applyDragResult,
} from 'react-dragdrop-kit/kanban';
```

### From 1.0.0 to 1.1.0

No breaking changes! Update your package and optionally use the new `dropIndicatorPosition` prop:

```tsx
<DragDropList
  items={items}
  onReorder={handleReorder}
  dropIndicatorPosition="top" // New optional prop
/>
```

### From react-beautiful-dnd

The Kanban API is designed for easy migration from `react-beautiful-dnd`:

```tsx
// react-beautiful-dnd
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// react-dragdrop-kit
import { KanbanBoard, KanbanColumnView, KanbanCardView } from 'react-dragdrop-kit/kanban';
```

**Key differences:**
- State is normalized (columns array + cards object)
- No auto-generated IDs (you provide all IDs)
- Render props pattern instead of component children
- No `onBeforeCapture`, `onBeforeDragStart` events (use `onDragStart` only)

See [/docs/kanban.md](../../docs/kanban.md) for detailed migration guide.

---

## Links

- [GitHub Repository](https://github.com/Yourstruggle11/react-dragdrop-kit)
- [NPM Package](https://www.npmjs.com/package/react-dragdrop-kit)
- [Documentation](https://github.com/Yourstruggle11/react-dragdrop-kit#readme)
- [Demo Application](https://react-dragdrop-kit.netlify.app/)
- [Report Issues](https://github.com/Yourstruggle11/react-dragdrop-kit/issues)
