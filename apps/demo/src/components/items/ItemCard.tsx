import { FALLBACK_HEX, GRADIENT_MAP, isGradientToken, isHex } from '../../utils/colors';
import type { Item } from '../../types/item';

type Props = { item: Item; direction: 'vertical' | 'horizontal' };

export default function ItemCard({ item, direction }: Props) {
	const isGrad = isGradientToken(item.color);
	const hex = isHex(item.color) ? (item.color as string) : '#3b82f6';
	return (
		<div
			tabIndex={0}
			aria-label={`Item ${item.name}`}
			style={{
				minWidth: direction === 'horizontal' ? 150 : undefined,
				padding: 16,
				border: '1.5px solid #e5e7eb',
				borderRadius: 14,
				background: isGrad ? GRADIENT_MAP[item.color as string] : '#fff',
				boxShadow: '0 4px 18px rgba(102,126,234,0.10)',
				transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
				borderTop: `3px solid ${isGrad ? '#667eea' : hex}`,
				color: isGrad ? '#fff' : FALLBACK_HEX,
				outline: 'none',
				cursor: 'grab',
			}}
			onMouseOver={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(102,126,234,0.18)')}
			onMouseOut={e => (e.currentTarget.style.boxShadow = '0 4px 18px rgba(102,126,234,0.10)')}
			onFocus={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(102,126,234,0.18)')}
			onBlur={e => (e.currentTarget.style.boxShadow = '0 4px 18px rgba(102,126,234,0.10)')}
		>
			<div style={{ fontWeight: 800, marginBottom: 4, fontSize: 16 }}>{item.name}</div>
			<div style={{ fontSize: 12, color: isGrad ? 'rgba(255,255,255,0.9)' : '#6b7280', fontWeight: 500 }}>
				ID: {item.id}  Pos: {item.position}
			</div>
		</div>
	);
}
