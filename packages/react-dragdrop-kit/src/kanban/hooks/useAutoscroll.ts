/**
 * Autoscroll Hook
 *
 * Automatically scrolls containers when dragging near edges.
 */

import { useEffect, useRef, useCallback } from 'react';
import type { AutoscrollConfig } from '../types';
import { isNearEdge, calculateScrollSpeed } from '../utils/dndMath';
import { getScrollParent, scrollBy, isScrollable } from '../utils/dom';

const DEFAULT_CONFIG: AutoscrollConfig = {
  threshold: 50, // px from edge
  maxSpeed: 20, // px per frame
  enabled: true,
};

/**
 * Hook for autoscrolling containers during drag
 */
export function useAutoscroll(
  containerRef: React.RefObject<HTMLElement>,
  isDragging: boolean,
  config: Partial<AutoscrollConfig> = {}
) {
  const { threshold, maxSpeed, enabled } = { ...DEFAULT_CONFIG, ...config };
  const rafRef = useRef<number>();
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      lastMousePosRef.current = { x: event.clientX, y: event.clientY };
    },
    []
  );

  const performScroll = useCallback(() => {
    if (!enabled || !isDragging || !containerRef.current || !lastMousePosRef.current) {
      return;
    }

    const container = containerRef.current;
    const scrollParent = getScrollParent(container);
    if (!scrollParent) return;

    const rect = scrollParent.getBoundingClientRect();
    const mousePos = lastMousePosRef.current;
    const scrollability = isScrollable(scrollParent);

    const nearEdge = isNearEdge(mousePos, rect, threshold);

    if (nearEdge.edge) {
      const speed = calculateScrollSpeed(nearEdge.distance, threshold, maxSpeed);

      const delta = { x: 0, y: 0 };

      if (scrollability.vertical) {
        if (nearEdge.edge === 'top') {
          delta.y = -speed;
        } else if (nearEdge.edge === 'bottom') {
          delta.y = speed;
        }
      }

      if (scrollability.horizontal) {
        if (nearEdge.edge === 'left') {
          delta.x = -speed;
        } else if (nearEdge.edge === 'right') {
          delta.x = speed;
        }
      }

      if (delta.x !== 0 || delta.y !== 0) {
        scrollBy(scrollParent, delta);
      }
    }

    rafRef.current = requestAnimationFrame(performScroll);
  }, [enabled, isDragging, containerRef, threshold, maxSpeed]);

  useEffect(() => {
    if (!enabled || !isDragging) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
      lastMousePosRef.current = null;
      return;
    }

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(performScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled, isDragging, handleMouseMove, performScroll]);
}
