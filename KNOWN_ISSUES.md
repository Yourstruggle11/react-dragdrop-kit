# Known Issues and Limitations

This document tracks active issues and known limitations in `react-dragdrop-kit` and the demo.

## Recent Updates

- 2026-02-19: Added optional `liveReorder` support for list/grid flows via `DragDropList`.
- 2026-02-19: Stabilized list target-slot drop behavior for vertical/horizontal flows.
- 2026-02-19: Added monitor regression coverage for live reorder and target resolution.
- 2026-02-15: [LIM-001] selector-based drag handles shipped via `dragHandle` on `DragDropList`.
- 2026-02-15: [LIM-002] opt-in multi-item drag shipped via `selectedIds` + `multiDragEnabled`.
- 2026-02-15: [BUG-003] boundary reorder stability fixed (closest-edge data + normalized destination index math).
- 2026-02-15: Demo filtered-list reorder data-loss fixed in Todo, Image Gallery, Multi Select, and Grid examples.
- 2025-10-13: [DEMO-004] toast spam fixed with global debounced manager.

## Library Limitations

### [LIM-003] Full Keyboard Reorder for Lists
**Scope:** Library
**Owner:** Library Core
**Status:** Planned
**Impact:** Medium
**Priority:** P2
**Location:** `packages/react-dragdrop-kit/src/`

**Description:**
Pointer and screen reader flows are supported, but full keyboard-driven list reordering is still pending.

**Acceptance Criteria:**
- Keyboard pickup, move, and drop flow for list items.
- Maintains current controlled API behavior.
- Verified across vertical, horizontal, and grid-like lists.

---

### [LIM-004] Kanban Live Reorder Preview
**Scope:** Library (Kanban)
**Owner:** Library Core
**Status:** Planned
**Impact:** Medium
**Priority:** P2
**Location:** `packages/react-dragdrop-kit/src/kanban/`

**Description:**
Kanban reordering currently commits on drop through `onDragEnd`. A live preview reorder mode (drag-over state mutation with final commit/revert semantics) is not shipped yet.

**Acceptance Criteria:**
- Optional, non-breaking `liveReorder` capability for Kanban flows.
- Stable behavior for same-column, cross-column, empty-column, and column reorder interactions.
- Regression coverage for drag-over and drop-finalization behavior.

---

## Fixed Items

### [LIM-001] Drag Handles Not Supported - FIXED
**Scope:** Library
**Owner:** Library Core
**Status:** Fixed (2026-02-15)
**Location:** `packages/react-dragdrop-kit/src/components/DragDropList.tsx`, `packages/react-dragdrop-kit/src/components/DraggableItemWrapper.tsx`

**Fix Summary:**
- Added optional `dragHandle?: string` prop.
- Drag now starts only from matching handle descendants.
- Non-handle interactive controls remain clickable.

---

### [LIM-002] Multi-Item Drag Not Supported - FIXED
**Scope:** Library
**Owner:** Library Core
**Status:** Fixed (2026-02-15)
**Location:** `packages/react-dragdrop-kit/src/hooks/useDragDropMonitor.ts`, `packages/react-dragdrop-kit/src/utils/order.ts`

**Fix Summary:**
- Added optional `selectedIds?: string[]` and `multiDragEnabled?: boolean`.
- Added `reorderMany` block move utility.
- Preserved single-item drag behavior by default.

---

### [BUG-003] Last Item Reordering Instability - FIXED
**Scope:** Library
**Owner:** Library Core
**Status:** Fixed (2026-02-15)
**Location:** `packages/react-dragdrop-kit/src/components/DraggableItemWrapper.tsx`, `packages/react-dragdrop-kit/src/hooks/useDragDropMonitor.ts`

**Fix Summary:**
- Attached closest-edge metadata to list item drop targets.
- Added destination normalization helpers to handle boundary and same-list offset math.
- Added regression tests for boundary and normalized index behavior.

---

### [DEMO-005] Filtered Reorder Could Drop Hidden Items - FIXED
**Scope:** Demo
**Owner:** Demo Maintainers
**Status:** Fixed (2026-02-15)
**Location:** `apps/demo/src/utils/mergeReorderedSubset.ts` and filtered examples

**Fix Summary:**
- Added `mergeReorderedSubset` utility.
- Reorder now updates visible subset while preserving hidden item slots.

---

## Feature Requests

1. Nested Lists and Tree Drag.
2. Axis/bounds drag constraints.
3. Extended drag preview API.
4. Keyboard shortcuts for full reordering flows.

---

Last Updated: 2026-02-19
Demo Version: workspace (`apps/demo@0.0.0`)
Library Version: 1.4.0
