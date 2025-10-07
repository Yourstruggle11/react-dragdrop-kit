import React from 'react';
import { DragDropList, type OrderUpdate } from 'react-dragdrop-kit';
import { Grid, List } from 'lucide-react';
import type { Item } from '../../types/item';

type Props = {
	items: Item[];
	onReorder(next: Item[], updates: OrderUpdate[]): void;
	direction: 'vertical' | 'horizontal';
	gap: number;
	disabled: boolean;
	showDropIndicator: boolean;
	dropIndicatorPosition: 'top' | 'bottom';
	dragPreviewStyle?: React.CSSProperties;
	renderItem: (item: Item) => React.ReactNode;
};

export default function DragListPanel({
	items,
	onReorder,
	direction,
	gap,
	disabled,
	showDropIndicator,
	dropIndicatorPosition,
	dragPreviewStyle,
	renderItem
}: Props) {
	return (
		<div
			className="panel"
			style={{
				overflowX: 'auto',
				minHeight: 120,
				width: '100%',
				boxShadow: '0 8px 32px rgba(102,126,234,0.10), 0 2px 8px rgba(0,0,0,0.08)',
				paddingTop: 28,
				paddingBottom: 32,
				position: 'relative',
			}}
			aria-label="Draggable Items List"
			role="region"
			tabIndex={0}
		>
			<h3
				style={{
					marginTop: 0,
					marginBottom: 18,
					display: 'flex',
					alignItems: 'center',
					gap: 10,
					fontWeight: 800,
					fontSize: 22,
					color: '#667eea',
					letterSpacing: 0.2,
				}}
			>
				{direction === 'vertical' ? <List size={22} /> : <Grid size={22} />}
				Draggable Items <span style={{ color: '#22223b', fontWeight: 600 }}>({items.length})</span>
			</h3>
			<div style={{ whiteSpace: direction === 'horizontal' ? 'nowrap' : 'normal' }}>
				<DragDropList
					items={items}
					onReorder={onReorder}
					direction={direction}
					gap={gap}
					disabled={disabled}
					showDropIndicator={showDropIndicator}
					dropIndicatorPosition={dropIndicatorPosition}
					dropIndicatorClassName="demo-drop-indicator"
					dragPreviewStyle={dragPreviewStyle}
					renderItem={renderItem}
				/>
			</div>
		</div>
	);
}
