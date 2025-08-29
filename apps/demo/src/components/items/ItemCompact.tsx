import { FALLBACK_HEX, GRADIENT_MAP, isGradientToken, isHex } from '../../utils/colors';
import type { Item } from '../../types/item';

type Props = { item: Item; direction: 'vertical' | 'horizontal'; animate: boolean };

export default function ItemCompact({ item, direction, animate }: Props) {
	const isGrad = isGradientToken(item.color);
	const hex = isHex(item.color) ? (item.color as string) : '#3b82f6';

	return (
		<div
			style={{
				minWidth: direction === 'horizontal' ? 120 : undefined,
				padding: '8px 12px',
				border: '1px solid #e5e7eb',
				borderRadius: 8,
				background: isGrad ? GRADIENT_MAP[item.color as string] : '#fff',
				borderLeft: `4px solid ${isGrad ? '#667eea' : hex}`,
				display: 'flex',
				alignItems: 'center',
				gap: 8,
				transition: animate ? 'all 0.2s ease' : undefined,
				color: isGrad ? '#fff' : FALLBACK_HEX
			}}
		>
			<span style={{ fontWeight: 600 }}>{item.name}</span>
			<span style={{ fontSize: 11, opacity: 0.6, marginLeft: 'auto' }}>#{item.id}</span>
		</div>
	);
}
