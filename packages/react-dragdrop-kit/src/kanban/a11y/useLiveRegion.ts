/**
 * Live Region Hook
 *
 * Hook for announcing messages to screen readers.
 */

import { useCallback, useRef } from 'react';

export interface LiveRegionOptions {
  /** Politeness level for announcements */
  politeness?: 'polite' | 'assertive';
}

/**
 * Hook to announce messages to screen readers via live region
 */
export function useLiveRegion(options: LiveRegionOptions = {}) {
  const { politeness = 'polite' } = options;
  const liveRegionRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  /**
   * Announce a message to screen readers
   * Clears any previous announcement and sets the new one
   */
  const announce = useCallback(
    (message: string, announcePoliteness?: 'polite' | 'assertive') => {
      if (!liveRegionRef.current) {
        // Create live region if it doesn't exist
        const region = document.createElement('div');
        region.setAttribute('role', 'status');
        region.setAttribute('aria-live', announcePoliteness || politeness);
        region.setAttribute('aria-atomic', 'true');
        region.style.position = 'absolute';
        region.style.width = '1px';
        region.style.height = '1px';
        region.style.padding = '0';
        region.style.margin = '-1px';
        region.style.overflow = 'hidden';
        region.style.clip = 'rect(0, 0, 0, 0)';
        region.style.whiteSpace = 'nowrap';
        region.style.border = '0';
        document.body.appendChild(region);
        liveRegionRef.current = region;
      }

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Clear the region first to ensure screen readers pick up the change
      liveRegionRef.current.textContent = '';

      // Set the new message after a brief delay
      timeoutRef.current = setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = message;
        }
      }, 100);
    },
    [politeness]
  );

  /**
   * Clear the live region
   */
  const clear = useCallback(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = '';
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  /**
   * Cleanup function to remove the live region
   */
  const cleanup = useCallback(() => {
    if (liveRegionRef.current) {
      document.body.removeChild(liveRegionRef.current);
      liveRegionRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return {
    announce,
    clear,
    cleanup,
  };
}
