export const PRESET_THEMES = {
	default: {
		name: 'Default',
		colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
	},
	pastel: {
		name: 'Pastel',
		colors: ['#bfdbfe', '#bbf7d0', '#fde68a', '#fecaca', '#ddd6fe', '#fce7f3']
	},
	dark: {
		name: 'Dark Mode',
		colors: ['#1e40af', '#065f46', '#92400e', '#991b1b', '#5b21b6', '#9f1239']
	},
	gradient: {
		name: 'Gradients',
		colors: ['gradient1', 'gradient2', 'gradient3', 'gradient4', 'gradient5', 'gradient6']
	}
};

export type ThemeKey = keyof typeof PRESET_THEMES;
