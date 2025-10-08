/**
 * Tests for DnD math utilities
 */

import {
  distanceToEdge,
  getClosestEdge,
  isNearEdge,
  calculateScrollSpeed,
  isPointInRect,
  getRectCenter,
  getVerticalDropPosition,
  getHorizontalDropPosition,
} from '../utils/dndMath';

// Helper to create a DOMRect
function createRect(
  left: number,
  top: number,
  width: number,
  height: number
): DOMRect {
  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
    width,
    height,
    x: left,
    y: top,
    toJSON: () => ({}),
  };
}

describe('distanceToEdge', () => {
  it('should calculate distances to all edges', () => {
    const rect = createRect(10, 10, 100, 100);
    const point = { x: 60, y: 60 };
    const distances = distanceToEdge(point, rect);

    expect(distances.top).toBe(50); // 60 - 10
    expect(distances.left).toBe(50); // 60 - 10
    expect(distances.bottom).toBe(50); // 110 - 60
    expect(distances.right).toBe(50); // 110 - 60
  });

  it('should handle point at top-left corner', () => {
    const rect = createRect(0, 0, 100, 100);
    const point = { x: 0, y: 0 };
    const distances = distanceToEdge(point, rect);

    expect(distances.top).toBe(0);
    expect(distances.left).toBe(0);
    expect(distances.bottom).toBe(100);
    expect(distances.right).toBe(100);
  });
});

describe('getClosestEdge', () => {
  it('should return closest edge', () => {
    const rect = createRect(0, 0, 100, 100);

    expect(getClosestEdge({ x: 10, y: 50 }, rect)).toBe('left');
    expect(getClosestEdge({ x: 90, y: 50 }, rect)).toBe('right');
    expect(getClosestEdge({ x: 50, y: 10 }, rect)).toBe('top');
    expect(getClosestEdge({ x: 50, y: 90 }, rect)).toBe('bottom');
  });
});

describe('isNearEdge', () => {
  it('should detect when point is near edge', () => {
    const rect = createRect(0, 0, 100, 100);

    const result = isNearEdge({ x: 5, y: 50 }, rect, 10);
    expect(result.edge).toBe('left');
    expect(result.distance).toBe(5);
  });

  it('should return null when point is not near any edge', () => {
    const rect = createRect(0, 0, 100, 100);

    const result = isNearEdge({ x: 50, y: 50 }, rect, 10);
    expect(result.edge).toBe(null);
    expect(result.distance).toBe(Infinity);
  });
});

describe('calculateScrollSpeed', () => {
  it('should return max speed at edge (distance = 0)', () => {
    expect(calculateScrollSpeed(0, 50, 10)).toBe(10);
  });

  it('should return 0 outside threshold', () => {
    expect(calculateScrollSpeed(50, 50, 10)).toBe(0);
    expect(calculateScrollSpeed(60, 50, 10)).toBe(0);
  });

  it('should scale speed based on distance', () => {
    expect(calculateScrollSpeed(25, 50, 10)).toBe(5); // Half distance = half speed
    expect(calculateScrollSpeed(10, 50, 10)).toBe(8); // 80% within threshold
  });
});

describe('isPointInRect', () => {
  it('should return true when point is inside rect', () => {
    const rect = createRect(0, 0, 100, 100);

    expect(isPointInRect({ x: 50, y: 50 }, rect)).toBe(true);
    expect(isPointInRect({ x: 0, y: 0 }, rect)).toBe(true);
    expect(isPointInRect({ x: 100, y: 100 }, rect)).toBe(true);
  });

  it('should return false when point is outside rect', () => {
    const rect = createRect(0, 0, 100, 100);

    expect(isPointInRect({ x: -1, y: 50 }, rect)).toBe(false);
    expect(isPointInRect({ x: 101, y: 50 }, rect)).toBe(false);
    expect(isPointInRect({ x: 50, y: -1 }, rect)).toBe(false);
    expect(isPointInRect({ x: 50, y: 101 }, rect)).toBe(false);
  });
});

describe('getRectCenter', () => {
  it('should calculate center of rect', () => {
    const rect = createRect(0, 0, 100, 100);
    const center = getRectCenter(rect);

    expect(center).toEqual({ x: 50, y: 50 });
  });

  it('should handle offset rect', () => {
    const rect = createRect(20, 30, 60, 40);
    const center = getRectCenter(rect);

    expect(center).toEqual({ x: 50, y: 50 });
  });
});

describe('getVerticalDropPosition', () => {
  it('should return top when mouse is above center', () => {
    const rect = createRect(0, 0, 100, 100);
    expect(getVerticalDropPosition(25, rect)).toBe('top');
  });

  it('should return bottom when mouse is below center', () => {
    const rect = createRect(0, 0, 100, 100);
    expect(getVerticalDropPosition(75, rect)).toBe('bottom');
  });
});

describe('getHorizontalDropPosition', () => {
  it('should return left when mouse is left of center', () => {
    const rect = createRect(0, 0, 100, 100);
    expect(getHorizontalDropPosition(25, rect)).toBe('left');
  });

  it('should return right when mouse is right of center', () => {
    const rect = createRect(0, 0, 100, 100);
    expect(getHorizontalDropPosition(75, rect)).toBe('right');
  });
});
