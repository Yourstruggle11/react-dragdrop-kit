export const GRADIENT_MAP: Record<string, string> = {
	gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
	gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
	gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
	gradient4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
	gradient5: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
	gradient6: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
};

export const FALLBACK_HEX = '#111827';

export const isGradientToken = (v?: string) => typeof v === 'string' && v.startsWith('gradient');

export const isHex = (v?: string) => typeof v === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v);

export function hexToRgba(hex: string, alpha = 1): string {
	let h = hex.replace('#', '');
	if (h.length === 3)
		h = h
			.split('')
			.map(c => c + c)
			.join('');
	const r = parseInt(h.substring(0, 2), 16);
	const g = parseInt(h.substring(2, 4), 16);
	const b = parseInt(h.substring(4, 6), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
