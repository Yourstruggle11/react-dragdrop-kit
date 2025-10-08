/**
 * Announcer Component
 *
 * Provides screen reader announcements for drag-and-drop operations.
 */

import React, { createContext, useContext, useEffect, useRef } from 'react';

interface AnnouncerContextValue {
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
}

const AnnouncerContext = createContext<AnnouncerContextValue | null>(null);

/**
 * Hook to access the announcer context
 */
export function useAnnouncer(): AnnouncerContextValue {
  const context = useContext(AnnouncerContext);
  if (!context) {
    throw new Error('useAnnouncer must be used within AnnouncerProvider');
  }
  return context;
}

/**
 * Props for AnnouncerProvider
 */
export interface AnnouncerProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Default politeness level */
  politeness?: 'polite' | 'assertive';
}

/**
 * Provider component that creates a live region for screen reader announcements
 */
export function AnnouncerProvider({
  children,
  politeness = 'polite',
}: AnnouncerProviderProps) {
  const politeRef = useRef<HTMLDivElement>(null);
  const assertiveRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const announce = (message: string, announcePoliteness: 'polite' | 'assertive' = politeness) => {
    const regionRef = announcePoliteness === 'assertive' ? assertiveRef : politeRef;

    if (!regionRef.current) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Clear the region first
    regionRef.current.textContent = '';

    // Set the new message after a brief delay to ensure screen readers pick it up
    timeoutRef.current = setTimeout(() => {
      if (regionRef.current) {
        regionRef.current.textContent = message;
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const value: AnnouncerContextValue = {
    announce,
  };

  return (
    <AnnouncerContext.Provider value={value}>
      {children}
      {/* Polite live region */}
      <div
        ref={politeRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
        }}
      />
      {/* Assertive live region */}
      <div
        ref={assertiveRef}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
        }}
      />
    </AnnouncerContext.Provider>
  );
}

/**
 * Generate announcement messages for different drag events
 */
export const announcements = {
  onDragStart: (itemName: string, position: number, totalItems: number): string =>
    `Picked up ${itemName}. Position ${position + 1} of ${totalItems}.`,

  onDragMove: (itemName: string, newPosition: number, totalItems: number): string =>
    `${itemName} moved to position ${newPosition + 1} of ${totalItems}.`,

  onDragEnd: (itemName: string, from: string, to: string, position: number): string =>
    from === to
      ? `${itemName} dropped. Position ${position + 1} in ${to}.`
      : `${itemName} moved from ${from} to ${to}. Position ${position + 1}.`,

  onDragCancel: (itemName: string, column: string): string =>
    `Drag cancelled. ${itemName} returned to ${column}.`,

  onColumnMove: (columnName: string, position: number, totalColumns: number): string =>
    `${columnName} moved to position ${position + 1} of ${totalColumns}.`,
};
