import type { DraggableItem, OrderUpdate } from '../types';

export function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function calculateOrderUpdates<T extends DraggableItem>(oldItems: T[], newItems: T[]): OrderUpdate[] {
  const affected = newItems.filter((item, i) => item.id !== oldItems[i]?.id);
  const orderList = affected.slice().sort((a, b) => a.position - b.position).map(i => i.position);
  return affected.map((item, i) => ({ id: item.id, newPosition: orderList[i] }));
}
