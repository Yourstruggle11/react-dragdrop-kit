# Known Issues & Limitations

This document tracks known issues and limitations in the react-dragdrop-kit library and the demo. Use IDs to reference items in commits and PRs.

## Recent Updates

- 2025-10-13: [DEMO-004] Toast spam fixed with global debounced manager; applied across examples.
- 2025-10-13: Document moved to repo root and standardized with IDs, scope, owner, and acceptance criteria.
- 2025-10-13: Added in-app “Known Issues” page in demo sidebar that renders this document.

## Library Limitations

### [LIM-001] Drag Handles Not Supported
**Scope:** Library  
**Owner:** Library Core  
**Status:** Planned  
**Impact:** Medium  
**Priority:** P2  
**Affected Examples:** Drag Handles (demo)  
**Location:** Library: `packages/react-dragdrop-kit/` • Demo: `apps/demo/src/examples/DragHandle/`

**Description:**
The library doesn't support drag handles (restricting drag start to a specific sub-element). Currently, the entire item is draggable.

**Workaround:**
The demo shows that interactive buttons inside a draggable item still work (clicks do not start drag).

**How to Test:**
1. Open the Drag Handles demo example.  
2. Try to drag using only the “handle” icon areas.  
3. Observe that drag can be initiated from any part of the item.

**Proposed Fix (Acceptance Criteria):**
- `DragDropList` accepts a `dragHandle` CSS selector.  
- Drag only starts when the initial mousedown/touchstart is within the handle.  
- Buttons/inputs outside the handle remain fully interactive.  
- Keyboard drag remains unaffected.

**Refs:** –

---

### [LIM-002] Multi-Item Drag Not Supported
**Scope:** Library  
**Owner:** Library Core  
**Status:** Planned  
**Impact:** Medium  
**Priority:** P2  
**Affected Examples:** Multi-Selection Drag (demo)  
**Location:** Library: `packages/react-dragdrop-kit/` • Demo: `apps/demo/src/examples/MultiSelect/`

**Description:**
Only one item can be dragged at a time. The demo supports visual multi-select and bulk actions, but not dragging multiple items together.

**Workaround:**
Use bulk actions (Move to Top, Delete, Duplicate) on selected items.

**How to Test:**
1. Select multiple items via checkboxes.  
2. Attempt to drag them together.  
3. Observe that only a single item can move via drag.

**Proposed Fix (Acceptance Criteria):**
- Drag state tracks multiple selected items.  
- Drop target logic accepts multi-item payloads.  
- Position updates apply consistently to all dragged items.  
- Works for vertical/horizontal lists and grids.

**Refs:** –

---

## Known Bugs

### [BUG-003] Last Item Reordering Issue
**Scope:** Library  
**Owner:** Library Core  
**Status:** Unfixed  
**Impact:** Medium  
**Priority:** P2  
**Affected:** All list/grid examples  
**Location:** `packages/react-dragdrop-kit/src/`

**Description:**
The last item sometimes fails to reorder or snaps back. Likely a boundary drop-zone calculation issue.

**How to Reproduce:**
1. Create a list with 5+ items.  
2. Drag the last item to a new position.  
3. Intermittently observe failure to drop in the intended position.

**Potential Root Causes:**
- Drop zone calculation for the last item.  
- Boundary detection at the end of the list.  
- Position update logic in `useDragDropMonitor`.

**Files to Investigate:**
- `packages/react-dragdrop-kit/src/hooks/useDragDropMonitor.ts`  
- `packages/react-dragdrop-kit/src/components/DraggableItemWrapper.tsx`  
- `packages/react-dragdrop-kit/src/components/DragDropList.tsx`

**Proposed Fix (Acceptance Criteria):**
- Last item’s drop zone extends to container boundary.  
- Calculations do not assume a trailing item exists.  
- Verified with 1, 2, 3, 5, 10, 100 items; vertical/horizontal; grid layouts.

**Refs:** –

---

## Demo Issues (Fixed)

### [DEMO-004] Toast Notifications Spam — FIXED
**Scope:** Demo  
**Owner:** Demo Maintainers  
**Status:** Fixed (Oct 2025)  
**Impact:** Medium  
**Priority:** P2  
**Location:** `apps/demo/src/`

**Description:**
Multiple toast notifications fired per drag and toasts could appear after navigation.

**Fix:**
- Global debounced toast manager (`useDebouncedToast`) with timeout/id coordination.  
- Dismiss/clear pending toasts across views; stable toast id to replace instead of stack.

**How to Test:**
1. Reorder in Dashboard Widgets; navigate to Image Gallery; reorder.  
2. Only one toast appears in the active view; no delayed toasts from the previous view.  
3. Rapid reorders produce a single consolidated toast.

**Refs:** –

---

## Feature Requests

1. Drag Handle Support (LIM-001) — selector-based handles.  
2. Multi-Item Drag (LIM-002) — drag groups of selected items.  
3. Nested Lists — hierarchical drag between nested containers.  
4. Drag Constraints — axis locking and boundaries.  
5. Custom Drop Indicators — position and style control.  
6. Drag Preview Customization — improved API for custom previews.  
7. Keyboard Shortcuts — full keyboard reordering (a11y).

---

## Testing Checklist

When fixing bugs or adding features, test these scenarios:

**Basic Functionality**  
- [ ] Drag first item to last position  
- [ ] Drag last item to first position  
- [ ] Drag middle item up and down  
- [ ] Lists with 1, 2, 3, 5, 10, 100 items  
- [ ] Rapid consecutive drags  
- [ ] Cancel drag (ESC/outside)

**Edge Cases**  
- [ ] Empty list  
- [ ] Single item list  
- [ ] Filtered lists  
- [ ] Grid layouts  
- [ ] Horizontal layouts  
- [ ] Nested scroll containers

**Browser Compatibility**  
- [ ] Chrome/Edge  
- [ ] Firefox  
- [ ] Safari  
- [ ] Mobile browsers

**Accessibility**  
- [ ] Keyboard navigation  
- [ ] Screen reader announcements  
- [ ] Focus management  
- [ ] High contrast mode

---

## Contributing

If you encounter a new issue or want to contribute a fix:  
1. Determine whether the issue is in the demo or library.  
2. Add a new item with an ID, scope, owner, and clear reproduction steps.  
3. Add or update a test if possible.  
4. Submit a PR with the fix and reference the ID.

For library fixes, modify code in `packages/react-dragdrop-kit/src/`  
For demo fixes, modify code in `apps/demo/src/`

---

Last Updated: October 2025  
Demo Version: 1.0.0  
Library Version: 1.2.0
