import { Moon, Sun } from 'lucide-react';
import { useThemeMode } from '@/contexts/ThemeContext';
import { colors, borderRadius, shadows, transitions } from '@/constants/designSystem';

export default function DarkModeToggle() {
	const { mode, toggleMode } = useThemeMode();
	const isDark = mode === 'dark';

	return (
		<button
			onClick={toggleMode}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '44px',
				height: '44px',
				background: isDark ? colors.gray[800] : colors.white,
				border: `2px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
				borderRadius: borderRadius.full,
				cursor: 'pointer',
				transition: transitions.default,
				boxShadow: shadows.md,
				position: 'relative',
				overflow: 'hidden',
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = 'scale(1.05)';
				e.currentTarget.style.boxShadow = shadows.lg;
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = 'scale(1)';
				e.currentTarget.style.boxShadow = shadows.md;
			}}
			aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
			title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
		>
			<div
				style={{
					position: 'relative',
					width: '24px',
					height: '24px',
				}}
			>
				<Sun
					size={20}
					color={colors.warning.main}
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: `translate(-50%, -50%) rotate(${isDark ? '90deg' : '0deg'}) scale(${isDark ? 0 : 1})`,
						opacity: isDark ? 0 : 1,
						transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
					}}
				/>

				<Moon
					size={20}
					color={colors.info.light}
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: `translate(-50%, -50%) rotate(${isDark ? '0deg' : '-90deg'}) scale(${isDark ? 1 : 0})`,
						opacity: isDark ? 1 : 0,
						transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
					}}
				/>
			</div>
		</button>
	);
}
