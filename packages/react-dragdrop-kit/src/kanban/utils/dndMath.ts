/**
 * DnD Math Utilities
 *
 * Helper functions for collision detection and positioning calculations.
 */

/**
 * Calculate the distance from a point to a rectangle's edges
 */
export function distanceToEdge(
  point: { x: number; y: number },
  rect: DOMRect
): {
  top: number;
  right: number;
  bottom: number;
  left: number;
} {
  return {
    top: point.y - rect.top,
    right: rect.right - point.x,
    bottom: rect.bottom - point.y,
    left: point.x - rect.left,
  };
}

/**
 * Get the closest edge of a rectangle to a point
 */
export function getClosestEdge(
  point: { x: number; y: number },
  rect: DOMRect
): 'top' | 'right' | 'bottom' | 'left' {
  const distances = distanceToEdge(point, rect);
  const entries = Object.entries(distances) as Array<[keyof typeof distances, number]>;
  const sorted = entries.sort((a, b) => a[1] - b[1]);
  return sorted[0][0];
}

/**
 * Check if a point is within a threshold distance from an edge
 */
export function isNearEdge(
  point: { x: number; y: number },
  rect: DOMRect,
  threshold: number
): { edge: 'top' | 'right' | 'bottom' | 'left' | null; distance: number } {
  const distances = distanceToEdge(point, rect);

  for (const [edge, distance] of Object.entries(distances)) {
    if (distance < threshold) {
      return {
        edge: edge as 'top' | 'right' | 'bottom' | 'left',
        distance,
      };
    }
  }

  return { edge: null, distance: Infinity };
}

/**
 * Calculate scroll speed based on distance from edge
 * Closer to edge = faster scroll
 */
export function calculateScrollSpeed(
  distance: number,
  threshold: number,
  maxSpeed: number
): number {
  if (distance >= threshold) return 0;
  const ratio = (threshold - distance) / threshold;
  return ratio * maxSpeed;
}

/**
 * Check if a point is inside a rectangle
 */
export function isPointInRect(point: { x: number; y: number }, rect: DOMRect): boolean {
  return (
    point.x >= rect.left &&
    point.x <= rect.right &&
    point.y >= rect.top &&
    point.y <= rect.bottom
  );
}

/**
 * Calculate the center point of a rectangle
 */
export function getRectCenter(rect: DOMRect): { x: number; y: number } {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

/**
 * Calculate vertical drop position based on mouse Y relative to element center
 */
export function getVerticalDropPosition(
  mouseY: number,
  elementRect: DOMRect
): 'top' | 'bottom' {
  const center = getRectCenter(elementRect);
  return mouseY < center.y ? 'top' : 'bottom';
}

/**
 * Calculate horizontal drop position based on mouse X relative to element center
 */
export function getHorizontalDropPosition(
  mouseX: number,
  elementRect: DOMRect
): 'left' | 'right' {
  const center = getRectCenter(elementRect);
  return mouseX < center.x ? 'left' : 'right';
}
