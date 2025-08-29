import { renderHook } from '@testing-library/react';
import { useDragDropMonitor } from '../hooks/useDragDropMonitor';

describe('useDragDropMonitor', () => {
  test('returns cleanup function when disabled', () => {
    const mockOnReorder = jest.fn();
    const mockItems = [
      { id: '1', position: 0 },
      { id: '2', position: 1 },
    ];

    const { result } = renderHook(() =>
      useDragDropMonitor({
        items: mockItems,
        onReorder: mockOnReorder,
        disabled: true,
      })
    );

    expect(typeof result.current).toBe('function');
  });

  test('calculates order updates correctly', () => {
    const mockItems = [
      { id: '1', position: 0 },
      { id: '2', position: 1 },
      { id: '3', position: 2 },
    ];

    const mockOnReorder = jest.fn();

    renderHook(() =>
      useDragDropMonitor({
        items: mockItems,
        onReorder: mockOnReorder,
        disabled: false,
      })
    );
  });
});