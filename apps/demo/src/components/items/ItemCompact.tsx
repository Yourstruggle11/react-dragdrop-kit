import { FALLBACK_HEX, GRADIENT_MAP, isGradientToken, isHex } from '../../utils/colors';
import type { Item } from '../../types/item';

type Props = { item: Item; direction: 'vertical' | 'horizontal'; animate: boolean };

export default function ItemCompact({ item, direction, animate }: Props) {
	const isGrad = isGradientToken(item.color);
	const hex = isHex(item.color) ? (item.color as string) : '#3b82f6';
	return (
		<div
			tabIndex={0}
			aria-label={`Item ${item.name}`}
			style={{
				minWidth: direction === 'horizontal' ? 120 : undefined,
				padding: '10px 16px',
				border: '1.5px solid #e5e7eb',
				borderRadius: 10,
				background: isGrad ? GRADIENT_MAP[item.color as string] : '#fff',
				borderLeft: `4px solid ${isGrad ? '#667eea' : hex}`,
				display: 'flex',
				alignItems: 'center',
				gap: 10,
				transition: animate ? 'all 0.22s cubic-bezier(0.4,0,0.2,1)' : undefined,
				color: isGrad ? '#fff' : FALLBACK_HEX,
				boxShadow: '0 2px 10px rgba(102,126,234,0.08)',
				outline: 'none',
				cursor: 'grab',
			}}
			onMouseOver={e => (e.currentTarget.style.boxShadow = '0 6px 18px rgba(102,126,234,0.16)')}
			onMouseOut={e => (e.currentTarget.style.boxShadow = '0 2px 10px rgba(102,126,234,0.08)')}
			onFocus={e => (e.currentTarget.style.boxShadow = '0 6px 18px rgba(102,126,234,0.16)')}
			onBlur={e => (e.currentTarget.style.boxShadow = '0 2px 10px rgba(102,126,234,0.08)')}
		>
			<span style={{ fontWeight: 700 }}>{item.name}</span>
			<span style={{ fontSize: 11, opacity: 0.7, marginLeft: 'auto', fontWeight: 500 }}>#{item.id}</span>
		</div>
	);
}
