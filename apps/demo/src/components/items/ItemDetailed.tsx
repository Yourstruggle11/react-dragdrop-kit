import { Copy } from 'lucide-react';
import { FALLBACK_HEX, GRADIENT_MAP, hexToRgba, isGradientToken, isHex } from '../../utils/colors';
import type { Item } from '../../types/item';

type Props = { item: Item; direction: 'vertical' | 'horizontal'; animate: boolean; onDuplicate(item: Item): void };

export default function ItemDetailed({ item, direction, animate, onDuplicate }: Props) {
	const isGrad = isGradientToken(item.color);
	const hex = isHex(item.color) ? (item.color as string) : '#3b82f6';
	const priorityBg: Record<NonNullable<Item['priority']>, string> = {
		low: '#10b981',
		medium: '#f59e0b',
		high: '#ef4444'
	};

	return (
		<div
			style={{
				minWidth: direction === 'horizontal' ? 180 : undefined,
				padding: 16,
				border: '2px solid',
				borderColor: isGrad ? '#e5e7eb' : hex,
				borderRadius: 12,
				background: isGrad
					? GRADIENT_MAP[item.color as string]
					: `linear-gradient(135deg, ${hexToRgba(hex, 0.15)} 0%, ${hexToRgba(hex, 0.05)} 100%)`,
				boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
				transition: animate ? 'all 0.3s ease' : undefined,
				color: isGrad ? '#fff' : FALLBACK_HEX
			}}
		>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
				<div>
					<div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{item.name}</div>
					<div style={{ fontSize: 13, color: isGrad ? 'rgba(255,255,255,0.9)' : '#4b5563', marginBottom: 8 }}>
						{item.description}
					</div>
					<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
						<span
							style={{
								fontSize: 11,
								padding: '2px 6px',
								borderRadius: 4,
								background: priorityBg[item.priority || 'medium'],
								color: 'white',
								fontWeight: 600,
								textTransform: 'capitalize'
							}}
						>
							{item.priority}
						</span>
						<span style={{ fontSize: 11, color: isGrad ? 'rgba(255,255,255,0.9)' : '#6b7280' }}>
							Position: {item.position}
						</span>
					</div>
				</div>
				<button
					onClick={e => {
						e.preventDefault();
						onDuplicate(item);
					}}
					style={{
						background: 'none',
						border: 'none',
						cursor: 'pointer',
						padding: 4,
						opacity: 0.9,
						color: isGrad ? '#fff' : FALLBACK_HEX
					}}
					title="Duplicate"
				>
					<Copy size={14} />
				</button>
			</div>
		</div>
	);
}
