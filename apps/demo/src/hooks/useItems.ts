import { useMemo, useState } from 'react';
import type { OrderUpdate } from '@your-org/drag-drop-list';
import { makeItems, shuffleArr } from '../utils/items';
import type { Item } from '../types/item';
import type { ThemeKey } from '../constants/themes';

export function useItems(themeKey: ThemeKey, palette: string[]) {
	const [items, setItems] = useState<Item[]>(makeItems());
	const [lastUpdates, setLastUpdates] = useState<OrderUpdate[]>([]);

	const handleReorder = (next: Item[], updates: OrderUpdate[]) => {
		console.log('====================================');
		console.log(next, updates);
		console.log('====================================');

		const enriched = updates.map(u => {
			const prev = items.find(it => it.id === u.id);
			return { ...u, moved: prev?.position !== u.newPosition };
		});
		setLastUpdates(enriched);
		setItems(next.map((it, idx) => ({ ...it, position: idx })));
	};

	const addItem = () => {
		const id = (items.length + 1).toString();
		const color = palette[items.length % palette.length];
		const priorities: Item['priority'][] = ['low', 'medium', 'high'];
		const priority = priorities[Math.floor(Math.random() * priorities.length)];
		setItems(prev => [
			...prev,
			{
				id,
				position: prev.length,
				name: `Item ${id}`,
				color,
				description: `Description for item ${id}`,
				priority
			}
		]);
	};

	const duplicateItem = (item: Item) => {
		const newId = Math.max(...items.map(i => parseInt(i.id))) + 1;
		setItems([...items, { ...item, id: String(newId), position: items.length, name: `${item.name} (copy)` }]);
	};

	const resetItems = () => setItems(makeItems());
	const shuffleItems = () => setItems(shuffleArr(items).map((it, i) => ({ ...it, position: i })));
	const removeLast = () => setItems(prev => prev.slice(0, -1).map((it, i) => ({ ...it, position: i })));

	const exportData = () => {
		const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'dragdrop-items.json';
		a.click();
		URL.revokeObjectURL(url);
	};

	const importData = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'application/json';
		input.onchange = e => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onload = ev => {
				try {
					const data = JSON.parse(ev.target?.result as string);
					setItems(Array.isArray(data) ? data.map((d: Item, i: number) => ({ ...d, position: i })) : makeItems());
				} catch {
					alert('Invalid JSON file');
				}
			};
			reader.readAsText(file);
		};
		input.click();
	};

	const dragPreviewStyle = useMemo<React.CSSProperties>(
		() => ({
			background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
			border: '2px solid rgba(255,255,255,0.3)',
			borderRadius: 12,
			padding: 16,
			boxShadow: '0 20px 40px rgba(102,126,234,0.4)',
			transform: 'rotate(2deg) scale(1.05)',
			color: 'white'
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[themeKey]
	);

	return {
		items,
		setItems,
		lastUpdates,
		setLastUpdates,
		handleReorder,
		addItem,
		duplicateItem,
		resetItems,
		shuffleItems,
		removeLast,
		exportData,
		importData,
		dragPreviewStyle
	};
}
