# Release Notes - v1.4.0

Release date: 2026-02-19

## Summary

This release improves list drag/drop accuracy, introduces optional live list reordering, and hardens demo behavior for responsive Kanban and swimlane isolation.

## Highlights

### List drag/drop accuracy and live behavior

- Added optional `liveReorder?: boolean` on `DragDropList` for real-time reorder while dragging.
- Stabilized drop target resolution for both vertical and horizontal lists.
- Improved placement logic so dropping on a target item consistently lands in the expected slot.
- Added nearest-target resolution when multiple draggable targets are present.
- Added container-gap insertion handling backed by item DOM metadata (`data-rdk-item-id`).

### Core maintainability

- Refactored monitor math into `useDragDropMonitor.logic.ts` while keeping API behavior unchanged.
- Expanded monitor test coverage for edge and regression scenarios.

### Demo fixes and polish

- `ImageGallery`: disabled native image drag so dragging works from image surfaces.
- `DashboardWidgets` and `ImageGallery`: enabled `liveReorder` for smoother interaction.
- `RichKanban`: fixed column layout responsiveness on desktop/mobile widths.
- `SwimlanesKanban`: fixed cross-lane data contamination with unique lane-scoped column IDs and drag guards.
- `ExampleWrapper`: improved responsive header layout handling.

### Dependency update

- Updated `@atlaskit/pragmatic-drag-and-drop` to `^1.7.7`.

## Breaking changes

- None.

## Migration notes

No migration is required.

To enable live list reordering:

```tsx
<DragDropList
  items={items}
  onReorder={handleReorder}
  liveReorder
/>
```

## Validation checklist

- Library lint, tests, typecheck, and build: pass.
- Demo lint, typecheck, and build: pass.

## Links

- Changelog: `packages/react-dragdrop-kit/CHANGELOG.md`
- Known Issues: `KNOWN_ISSUES.md`
