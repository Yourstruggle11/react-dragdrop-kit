/**
 * Design System Constants
 * Centralized design tokens for consistent styling across the demo app
 */

// Color Palette
export const colors = {
	// Primary Brand Colors
	primary: {
		50: '#f0f4ff',
		100: '#e5ebff',
		200: '#d1dcff',
		300: '#b3c4ff',
		400: '#8fa5ff',
		500: '#667eea', // Main brand color
		600: '#5568d3',
		700: '#4453b8',
		800: '#3a4599',
		900: '#2f3777',
	},

	// Secondary Colors
	secondary: {
		50: '#f5f3ff',
		100: '#ede9fe',
		200: '#ddd6fe',
		300: '#c4b5fd',
		400: '#a78bfa',
		500: '#764ba2', // Secondary brand
		600: '#653d8a',
		700: '#543272',
		800: '#43285a',
		900: '#321f42',
	},

	// Neutral Grays
	gray: {
		50: '#f9fafb',
		100: '#f3f4f6',
		200: '#e5e7eb',
		300: '#d1d5db',
		400: '#9ca3af',
		500: '#6b7280',
		600: '#4b5563',
		700: '#374151',
		800: '#1f2937',
		900: '#111827',
	},

	// Semantic Colors
	success: {
		50: '#f0fdf4',
		100: '#dcfce7',
		200: '#bbf7d0',
		300: '#86efac',
		400: '#4ade80',
		500: '#10b981',
		600: '#059669',
		700: '#047857',
		800: '#065f46',
		900: '#064e3b',
		light: '#10b981',
		main: '#059669',
		dark: '#047857',
		bg: '#d1fae5',
	},
	warning: {
		50: '#fffbeb',
		100: '#fef3c7',
		200: '#fde68a',
		300: '#fcd34d',
		400: '#fbbf24',
		500: '#f59e0b',
		600: '#d97706',
		700: '#b45309',
		800: '#92400e',
		900: '#78350f',
		light: '#f59e0b',
		main: '#d97706',
		dark: '#b45309',
		bg: '#fef3c7',
	},
	error: {
		50: '#fef2f2',
		100: '#fee2e2',
		200: '#fecaca',
		300: '#fca5a5',
		400: '#f87171',
		500: '#ef4444',
		600: '#dc2626',
		700: '#b91c1c',
		800: '#991b1b',
		900: '#7f1d1d',
		light: '#ef4444',
		main: '#dc2626',
		dark: '#b91c1c',
		bg: '#fee2e2',
	},
	info: {
		50: '#eff6ff',
		100: '#dbeafe',
		200: '#bfdbfe',
		300: '#93c5fd',
		400: '#60a5fa',
		500: '#3b82f6',
		600: '#2563eb',
		700: '#1d4ed8',
		800: '#1e40af',
		900: '#1e3a8a',
		light: '#3b82f6',
		main: '#2563eb',
		dark: '#1d4ed8',
		bg: '#dbeafe',
	},

	// Additional Color Palettes
	blue: {
		50: '#eff6ff',
		100: '#dbeafe',
		200: '#bfdbfe',
		300: '#93c5fd',
		400: '#60a5fa',
		500: '#3b82f6',
		600: '#2563eb',
		700: '#1d4ed8',
		800: '#1e40af',
		900: '#1e3a8a',
	},
	purple: {
		50: '#faf5ff',
		100: '#f3e8ff',
		200: '#e9d5ff',
		300: '#d8b4fe',
		400: '#c084fc',
		500: '#a855f7',
		600: '#9333ea',
		700: '#7e22ce',
		800: '#6b21a8',
		900: '#581c87',
	},
	pink: {
		50: '#fdf2f8',
		100: '#fce7f3',
		200: '#fbcfe8',
		300: '#f9a8d4',
		400: '#f472b6',
		500: '#ec4899',
		600: '#db2777',
		700: '#be185d',
		800: '#9d174d',
		900: '#831843',
	},
	orange: {
		50: '#fff7ed',
		100: '#ffedd5',
		200: '#fed7aa',
		300: '#fdba74',
		400: '#fb923c',
		500: '#f97316',
		600: '#ea580c',
		700: '#c2410c',
		800: '#9a3412',
		900: '#7c2d12',
	},
	teal: {
		50: '#f0fdfa',
		100: '#ccfbf1',
		200: '#99f6e4',
		300: '#5eead4',
		400: '#2dd4bf',
		500: '#14b8a6',
		600: '#0d9488',
		700: '#0f766e',
		800: '#115e59',
		900: '#134e4a',
	},
	indigo: {
		50: '#eef2ff',
		100: '#e0e7ff',
		200: '#c7d2fe',
		300: '#a5b4fc',
		400: '#818cf8',
		500: '#6366f1',
		600: '#4f46e5',
		700: '#4338ca',
		800: '#3730a3',
		900: '#312e81',
	},
	red: {
		50: '#fef2f2',
		100: '#fee2e2',
		200: '#fecaca',
		300: '#fca5a5',
		400: '#f87171',
		500: '#ef4444',
		600: '#dc2626',
		700: '#b91c1c',
		800: '#991b1b',
		900: '#7f1d1d',
	},
	green: {
		50: '#f0fdf4',
		100: '#dcfce7',
		200: '#bbf7d0',
		300: '#86efac',
		400: '#4ade80',
		500: '#22c55e',
		600: '#16a34a',
		700: '#15803d',
		800: '#166534',
		900: '#14532d',
	},
	yellow: {
		50: '#fefce8',
		100: '#fef9c3',
		200: '#fef08a',
		300: '#fde047',
		400: '#facc15',
		500: '#eab308',
		600: '#ca8a04',
		700: '#a16207',
		800: '#854d0e',
		900: '#713f12',
	},
	cyan: {
		50: '#ecfeff',
		100: '#cffafe',
		200: '#a5f3fc',
		300: '#67e8f9',
		400: '#22d3ee',
		500: '#06b6d4',
		600: '#0891b2',
		700: '#0e7490',
		800: '#155e75',
		900: '#164e63',
	},
	lime: {
		50: '#f7fee7',
		100: '#ecfccb',
		200: '#d9f99d',
		300: '#bef264',
		400: '#a3e635',
		500: '#84cc16',
		600: '#65a30d',
		700: '#4d7c0f',
		800: '#3f6212',
		900: '#365314',
	},
	violet: {
		50: '#f5f3ff',
		100: '#ede9fe',
		200: '#ddd6fe',
		300: '#c4b5fd',
		400: '#a78bfa',
		500: '#8b5cf6',
		600: '#7c3aed',
		700: '#6d28d9',
		800: '#5b21b6',
		900: '#4c1d95',
	},

	// Special Colors
	white: '#ffffff',
	black: '#000000',
	transparent: 'transparent',
} as const;

// Typography
export const typography = {
	fontFamily: {
		sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Roboto', sans-serif",
		mono: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
		display: "'Inter', 'Segoe UI', sans-serif",
	},

	fontSize: {
		xs: '0.75rem',      // 12px
		sm: '0.875rem',     // 14px
		base: '1rem',       // 16px
		lg: '1.125rem',     // 18px
		xl: '1.25rem',      // 20px
		'2xl': '1.5rem',    // 24px
		'3xl': '1.875rem',  // 30px
		'4xl': '2.25rem',   // 36px
		'5xl': '3rem',      // 48px
		'6xl': '3.75rem',   // 60px
	},

	fontWeight: {
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		black: 900,
	},

	lineHeight: {
		tight: 1.25,
		snug: 1.375,
		normal: 1.5,
		relaxed: 1.625,
		loose: 2,
	},

	letterSpacing: {
		tighter: '-0.05em',
		tight: '-0.025em',
		normal: '0',
		wide: '0.025em',
		wider: '0.05em',
		widest: '0.1em',
	},
} as const;

// Spacing Scale (based on 4px grid)
export const spacing = {
	0: '0',
	1: '0.25rem',   // 4px
	2: '0.5rem',    // 8px
	3: '0.75rem',   // 12px
	4: '1rem',      // 16px
	5: '1.25rem',   // 20px
	6: '1.5rem',    // 24px
	8: '2rem',      // 32px
	10: '2.5rem',   // 40px
	12: '3rem',     // 48px
	16: '4rem',     // 64px
	20: '5rem',     // 80px
	24: '6rem',     // 96px
	32: '8rem',     // 128px
	// Semantic names
	xs: '0.5rem',   // 8px
	sm: '0.75rem',  // 12px
	md: '1rem',     // 16px
	lg: '1.5rem',   // 24px
	xl: '2rem',     // 32px
	'2xl': '2.5rem', // 40px
	'3xl': '3rem',   // 48px
} as const;

// Border Radius
export const borderRadius = {
	none: '0',
	sm: '0.25rem',    // 4px
	base: '0.5rem',   // 8px
	md: '0.75rem',    // 12px
	lg: '1rem',       // 16px
	xl: '1.5rem',     // 24px
	'2xl': '2rem',    // 32px
	full: '9999px',
} as const;

// Shadows
export const shadows = {
	none: 'none',
	sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
	base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
	md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
	lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
	xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
	'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
	inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',

	// Brand shadows with primary color
	primary: {
		sm: '0 2px 8px rgba(102, 126, 234, 0.08)',
		md: '0 6px 18px rgba(102, 126, 234, 0.13)',
		lg: '0 10px 40px rgba(102, 126, 234, 0.13), 0 2px 8px rgba(0, 0, 0, 0.08)',
		xl: '0 20px 60px rgba(102, 126, 234, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)',
	},
} as const;

// Transitions
export const transitions = {
	duration: {
		fastest: '100ms',
		fast: '150ms',
		normal: '200ms',
		slow: '300ms',
		slowest: '500ms',
	},

	timing: {
		linear: 'linear',
		ease: 'ease',
		easeIn: 'ease-in',
		easeOut: 'ease-out',
		easeInOut: 'ease-in-out',
		spring: 'cubic-bezier(0.4, 0, 0.2, 1)',
		bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
	},

	// Preset transitions
	default: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
	fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
	slow: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Z-index layers
export const zIndex = {
	base: 0,
	dropdown: 1000,
	sticky: 1100,
	fixed: 1200,
	modalBackdrop: 1300,
	modal: 1400,
	popover: 1500,
	tooltip: 1600,
	toast: 1700,
} as const;

// Breakpoints (for responsive design)
export const breakpoints = {
	xs: '475px',
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1536px',
} as const;

// Animation Keyframes (as CSS strings)
export const animations = {
	fadeIn: `
		@keyframes fadeIn {
			from { opacity: 0; }
			to { opacity: 1; }
		}
	`,
	slideDown: `
		@keyframes slideDown {
			from { opacity: 0; transform: translateY(-10px); }
			to { opacity: 1; transform: translateY(0); }
		}
	`,
	slideUp: `
		@keyframes slideUp {
			from { opacity: 0; transform: translateY(10px); }
			to { opacity: 1; transform: translateY(0); }
		}
	`,
	scaleIn: `
		@keyframes scaleIn {
			from { opacity: 0; transform: scale(0.95); }
			to { opacity: 1; transform: scale(1); }
		}
	`,
	pulse: `
		@keyframes pulse {
			0%, 100% { opacity: 1; }
			50% { opacity: 0.6; }
		}
	`,
	spin: `
		@keyframes spin {
			from { transform: rotate(0deg); }
			to { transform: rotate(360deg); }
		}
	`,
	bounce: `
		@keyframes bounce {
			0%, 100% { transform: translateY(0); }
			50% { transform: translateY(-10px); }
		}
	`,
} as const;

// Gradient presets
export const gradients = {
	primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
	secondary: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
	sunset: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
	ocean: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
	forest: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
	fire: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
	midnight: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
	aurora: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
} as const;

// Glass morphism effect
export const glassMorphism = {
	light: {
		background: 'rgba(255, 255, 255, 0.82)',
		backdropFilter: 'blur(12px)',
		border: '1.5px solid rgba(255, 255, 255, 0.6)',
	},
	dark: {
		background: 'rgba(26, 32, 44, 0.82)',
		backdropFilter: 'blur(12px)',
		border: '1.5px solid rgba(255, 255, 255, 0.1)',
	},
} as const;

// Container sizes
export const containers = {
	xs: '475px',
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1536px',
	full: '100%',
} as const;
