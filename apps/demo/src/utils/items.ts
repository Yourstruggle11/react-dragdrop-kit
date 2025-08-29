import type { Item } from "../types/item";

export const makeItems = (): Item[] => [
	{ id: '1', position: 0, name: 'Alpha', color: '#3b82f6', description: 'First item', priority: 'high' },
	{ id: '2', position: 1, name: 'Bravo', color: '#10b981', description: 'Second item', priority: 'medium' },
	{ id: '3', position: 2, name: 'Charlie', color: '#f59e0b', description: 'Third item', priority: 'low' },
	{ id: '4', position: 3, name: 'Delta', color: '#ef4444', description: 'Fourth item', priority: 'high' }
];

export function shuffleArr<T>(arr: T[]): T[] {
	const a = arr.slice();
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
