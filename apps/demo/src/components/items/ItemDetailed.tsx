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
			tabIndex={0}
			aria-label={`Item ${item.name}`}
			style={{
				minWidth: direction === 'horizontal' ? 180 : undefined,
				padding: 18,
				border: '2px solid',
				borderColor: isGrad ? '#e5e7eb' : hex,
				borderRadius: 16,
				background: isGrad
					? GRADIENT_MAP[item.color as string]
					: `linear-gradient(135deg, ${hexToRgba(hex, 0.15)} 0%, ${hexToRgba(hex, 0.05)} 100%)`,
				boxShadow: '0 6px 24px rgba(102,126,234,0.10)',
				transition: animate ? 'all 0.22s cubic-bezier(0.4,0,0.2,1)' : undefined,
				color: isGrad ? '#fff' : FALLBACK_HEX,
				outline: 'none',
				cursor: 'grab',
			}}
			onMouseOver={e => (e.currentTarget.style.boxShadow = '0 12px 32px rgba(102,126,234,0.18)')}
			onMouseOut={e => (e.currentTarget.style.boxShadow = '0 6px 24px rgba(102,126,234,0.10)')}
			onFocus={e => (e.currentTarget.style.boxShadow = '0 12px 32px rgba(102,126,234,0.18)')}
			onBlur={e => (e.currentTarget.style.boxShadow = '0 6px 24px rgba(102,126,234,0.10)')}
		>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
				<div>
					<div style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{item.name}</div>
					<div style={{ fontSize: 13, color: isGrad ? 'rgba(255,255,255,0.9)' : '#4b5563', marginBottom: 8, fontWeight: 500 }}>
						{item.description}
					</div>
					<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
						<span
							style={{
								fontSize: 11,
								padding: '2px 7px',
								borderRadius: 4,
								background: priorityBg[item.priority || 'medium'],
								color: 'white',
								fontWeight: 700,
								textTransform: 'capitalize',
								letterSpacing: 0.2,
							}}
						>
							{item.priority}
						</span>
						<span style={{ fontSize: 11, color: isGrad ? 'rgba(255,255,255,0.9)' : '#6b7280', fontWeight: 500 }}>
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
						color: isGrad ? '#fff' : FALLBACK_HEX,
						borderRadius: 6,
						transition: 'background 0.18s',
					}}
					title="Duplicate"
					aria-label="Duplicate item"
					onMouseOver={e => (e.currentTarget.style.background = 'rgba(102,126,234,0.10)')}
					onMouseOut={e => (e.currentTarget.style.background = 'none')}
				>
					<Copy size={15} />
				</button>
			</div>
		</div>
	);
}
