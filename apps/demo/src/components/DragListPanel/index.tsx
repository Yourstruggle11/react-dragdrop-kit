import React from 'react';
import { DragDropList, type OrderUpdate } from '@your-org/drag-drop-list';
import { Grid, List } from 'lucide-react';
import type { Item } from '../../types/item';

type Props = {
	items: Item[];
	onReorder(next: Item[], updates: OrderUpdate[]): void;
	direction: 'vertical' | 'horizontal';
	gap: number;
	disabled: boolean;
	showDropIndicator: boolean;
	dragPreviewStyle?: React.CSSProperties;
	renderItem: (item: Item ) => React.ReactNode;
};

export default function DragListPanel({
	items,
	onReorder,
	direction,
	gap,
	disabled,
	showDropIndicator,
	dragPreviewStyle,
	renderItem
}: Props) {
	return (
		<div className="panel" style={{ overflowX: 'auto', minHeight: 120, width: '100%' }}>
			<h3 style={{ marginTop: 0, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
				{direction === 'vertical' ? <List size={20} /> : <Grid size={20} />} Draggable Items ({items.length})
			</h3>

			<div style={{ whiteSpace: direction === 'horizontal' ? 'nowrap' : 'normal' }}>
				<DragDropList
					items={items}
					onReorder={onReorder}
					direction={direction}
					gap={gap}
					disabled={disabled}
					showDropIndicator={showDropIndicator}
					dropIndicatorClassName="demo-drop-indicator"
					dragPreviewStyle={dragPreviewStyle}
					renderItem={renderItem}
				/>
			</div>
		</div>
	);
}
