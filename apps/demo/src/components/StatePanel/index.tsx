import type { OrderUpdate } from '@your-org/drag-drop-list';
import type { Item } from '../../types/item';

type Props = {
	show: boolean;
	items: Item[];
	lastUpdates: OrderUpdate[];
	historyIndex: number;
	historyLen: number;
};

export default function StatePanel({ show, items, lastUpdates, historyIndex, historyLen }: Props) {
	if (!show) return null;

	return (
		<div
			className="panel"
			style={{ position: 'sticky', top: 20, maxHeight: 'calc(100vh - 40px)', overflow: 'auto', width: '100%' }}
		>
			<h3 style={{ marginTop: 0 }}>Current State</h3>
			<pre
				style={{
					margin: 0,
					padding: 12,
					background: '#f9fafb',
					border: '1px solid #e5e7eb',
					borderRadius: 8,
					fontSize: 12,
					maxHeight: 250,
					overflow: 'auto',
					color: '#111827'
				}}
			>
				{JSON.stringify(items, null, 2)}
			</pre>

			<h3 style={{ marginTop: 16 }}>Last Updates</h3>
			{lastUpdates.length ? (
				<pre
					style={{
						margin: 0,
						padding: 12,
						background: '#f9fafb',
						border: '1px solid #e5e7eb',
						borderRadius: 8,
						fontSize: 12,
						maxHeight: 200,
						overflow: 'auto',
						color: '#111827'
					}}
				>
					{JSON.stringify(lastUpdates, null, 2)}
				</pre>
			) : (
				<p style={{ color: '#6b7280', fontSize: 14 }}>Drag items to see updates</p>
			)}

			<div style={{ marginTop: 16, padding: 12, background: '#f0f4ff', borderRadius: 8 }}>
				<div style={{ fontSize: 12, color: '#4b5563' }}>
					<strong>History:</strong> {historyIndex + 1} / {historyLen}
				</div>
				<div style={{ fontSize: 12, color: '#4b5563', marginTop: 4 }}>
					<strong>Total moves:</strong> {lastUpdates.reduce((acc, u) => acc + (u.moved ? 1 : 0), 0)}
				</div>
			</div>
		</div>
	);
}
