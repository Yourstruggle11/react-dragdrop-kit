# Release Notes - v1.3.0

Release date: 2026-02-16

## Summary

This release focuses on core reorder correctness, optional list drag enhancements, Kanban index stability, demo completeness, and quality hardening.

## Highlights

### New list capabilities (non-breaking)

- Added optional `dragHandle?: string` to `DragDropList` for handle-only drag start.
- Added optional `selectedIds?: string[]` and `multiDragEnabled?: boolean` for opt-in multi-item drag.
- Existing `DragDropList` behavior remains unchanged when these props are omitted.

### Reorder correctness improvements

- Fixed boundary and last-item reorder instability in list flows.
- Added closest-edge metadata on list item drop targets.
- Added destination-index normalization utilities to make same-list and boundary drops deterministic.
- Applied equivalent normalization logic in Kanban card/column drop math.

### Demo improvements

- Fixed filtered-list reorder data-loss in:
  - Todo List
  - Image Gallery
  - Multi Select
  - Grid Layout
- Added and routed missing examples:
  - `custom-preview`
  - `drop-indicator`
  - `basic-kanban`
  - `rich-kanban`
  - `swimlanes-kanban`
  - `wip-limits-kanban`

### Tooling and quality

- Added ESLint configuration for the library package.
- Expanded regression coverage:
  - drag monitor reorder behavior
  - multi-drag block reorder behavior
  - drag-handle gating behavior
  - destination-index normalization behavior

## Validation

- Library:
  - lint: pass
  - tests: pass
  - typecheck: pass
  - build: pass
- Demo:
  - lint: pass
  - typecheck: pass
  - build: pass

## Breaking changes

- None.

## Migration notes

No migration required for existing consumers.

To use new optional features:

```tsx
<DragDropList
  items={items}
  onReorder={handleReorder}
  renderItem={renderItem}
  dragHandle="[data-drag-handle]"
  selectedIds={selectedIds}
  multiDragEnabled
/>
```

## 🚀 Get Started

Visit the [demo application](https://react-dragdrop-kit.netlify.app/)

---

**Full Changelog**: [CHANGELOG.md](./CHANGELOG.md)

**Questions?** Open an issue on [GitHub](https://github.com/Yourstruggle11/react-dragdrop-kit/issues)

Made with ❤️ by <a href="https://github.com/Yourstruggle11" target="_blank" rel="noopener noreferrer">Yourstruggle11</a>