import { FALLBACK_HEX, GRADIENT_MAP, isGradientToken, isHex } from '../../utils/colors';
import type { Item } from '../../types/item';

type Props = { item: Item; direction: 'vertical' | 'horizontal' };

export default function ItemCard({ item, direction }: Props) {
	const isGrad = isGradientToken(item.color);
	const hex = isHex(item.color) ? (item.color as string) : '#3b82f6';

	return (
		<div
			style={{
				minWidth: direction === 'horizontal' ? 150 : undefined,
				padding: 14,
				border: '1px solid #e5e7eb',
				borderRadius: 10,
				background: isGrad ? GRADIENT_MAP[item.color as string] : '#fff',
				boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
				transition: 'all 0.2s ease',
				borderTop: `3px solid ${isGrad ? '#667eea' : hex}`,
				color: isGrad ? '#fff' : FALLBACK_HEX
			}}
		>
			<div style={{ fontWeight: 700, marginBottom: 4 }}>{item.name}</div>
			<div style={{ fontSize: 12, color: isGrad ? 'rgba(255,255,255,0.9)' : '#6b7280' }}>
				ID: {item.id} • Pos: {item.position}
			</div>
		</div>
	);
}
