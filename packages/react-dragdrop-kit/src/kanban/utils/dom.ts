/**
 * DOM Utilities
 *
 * Helper functions for DOM measurements and manipulation.
 */

/**
 * Safely get bounding client rect for an element
 */
export function getBoundingRect(element: HTMLElement | null): DOMRect | null {
  if (!element) return null;
  return element.getBoundingClientRect();
}

/**
 * Get scrollable parent of an element
 */
export function getScrollParent(element: HTMLElement | null): HTMLElement | null {
  if (!element) return null;

  let parent = element.parentElement;

  while (parent) {
    const { overflow, overflowY } = window.getComputedStyle(parent);
    if (/(auto|scroll)/.test(overflow + overflowY)) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return document.documentElement as HTMLElement;
}

/**
 * Scroll an element by a delta
 */
export function scrollBy(
  element: HTMLElement,
  delta: { x?: number; y?: number }
): void {
  if (delta.x) {
    element.scrollLeft += delta.x;
  }
  if (delta.y) {
    element.scrollTop += delta.y;
  }
}

/**
 * Check if an element is scrollable
 */
export function isScrollable(element: HTMLElement): {
  vertical: boolean;
  horizontal: boolean;
} {
  const { overflow, overflowY, overflowX } = window.getComputedStyle(element);

  const hasVerticalScroll = /(auto|scroll)/.test(overflow + overflowY);
  const hasHorizontalScroll = /(auto|scroll)/.test(overflow + overflowX);

  return {
    vertical: hasVerticalScroll && element.scrollHeight > element.clientHeight,
    horizontal: hasHorizontalScroll && element.scrollWidth > element.clientWidth,
  };
}

/**
 * Get element's scroll position
 */
export function getScrollPosition(element: HTMLElement): { x: number; y: number } {
  if (element === document.documentElement) {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop,
    };
  }

  return {
    x: element.scrollLeft,
    y: element.scrollTop,
  };
}

/**
 * Get maximum scroll for an element
 */
export function getMaxScroll(element: HTMLElement): { x: number; y: number } {
  return {
    x: element.scrollWidth - element.clientWidth,
    y: element.scrollHeight - element.clientHeight,
  };
}

/**
 * Clamp scroll position to valid range
 */
export function clampScroll(
  scroll: { x: number; y: number },
  maxScroll: { x: number; y: number }
): { x: number; y: number } {
  return {
    x: Math.max(0, Math.min(scroll.x, maxScroll.x)),
    y: Math.max(0, Math.min(scroll.y, maxScroll.y)),
  };
}

/**
 * Get all data attributes from an element as an object
 */
export function getDataAttributes(element: HTMLElement): Record<string, string> {
  const data: Record<string, string> = {};
  for (const key in element.dataset) {
    data[key] = element.dataset[key] || '';
  }
  return data;
}

/**
 * Find closest ancestor with a data attribute
 */
export function findClosestWithData(
  element: HTMLElement | null,
  dataKey: string
): HTMLElement | null {
  let current = element;
  while (current) {
    if (current.dataset[dataKey]) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}
