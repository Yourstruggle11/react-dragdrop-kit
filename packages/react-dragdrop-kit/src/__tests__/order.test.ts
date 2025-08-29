import { reorder, calculateOrderUpdates } from '../utils/order';
import type { DraggableItem } from '../types';

type Item = DraggableItem & { name: string };

test('reorder moves item correctly', () => {
  const list: Item[] = [
    { id: '1', position: 0, name: 'A' },
    { id: '2', position: 1, name: 'B' },
    { id: '3', position: 2, name: 'C' }
  ];
  const result = reorder(list, 0, 2);
  expect(result.map(i => i.id)).toEqual(['2', '3', '1']);
});

test('calculateOrderUpdates returns correct new positions after reorder', () => {
  const oldItems: Item[] = [
    { id: '1', position: 0, name: 'A' },
    { id: '2', position: 1, name: 'B' },
    { id: '3', position: 2, name: 'C' }
  ];
  const newItems: Item[] = [
    { id: '2', position: 1, name: 'B' },
    { id: '3', position: 2, name: 'C' },
    { id: '1', position: 0, name: 'A' }
  ];
  const updates = calculateOrderUpdates(oldItems, newItems);
  expect(updates).toEqual([
    { id: '2', newPosition: 0 }, // B moved from index 1 to index 0
    { id: '3', newPosition: 1 }, // C moved from index 2 to index 1
    { id: '1', newPosition: 2 }  // A moved from index 0 to index 2
  ]);
});
