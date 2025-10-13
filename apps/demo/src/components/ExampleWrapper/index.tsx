import React from 'react';
import type { Example } from '@/constants/examples';
import { colors, borderRadius, spacing, typography, shadows } from '@/constants/designSystem';
import { useThemeMode } from '@/contexts/ThemeContext';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface ExampleWrapperProps {
	example: Example;
	children: React.ReactNode;
	onBack: () => void;
}

export default function ExampleWrapper({ example, children, onBack }: ExampleWrapperProps) {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';

	const bgColor = isDark ? colors.gray[900] : colors.gray[50];
	const cardBg = isDark ? colors.gray[800] : colors.white;
	const textColor = isDark ? colors.gray[100] : colors.gray[900];
	const mutedTextColor = isDark ? colors.gray[400] : colors.gray[600];
	const borderColor = isDark ? colors.gray[700] : colors.gray[200];

	const difficultyColors = {
		beginner: { bg: colors.success.bg, text: colors.success.dark },
		intermediate: { bg: colors.warning.bg, text: colors.warning.dark },
		advanced: { bg: colors.error.bg, text: colors.error.dark },
	};

	const difficultyColor = difficultyColors[example.difficulty];

	return (
		<div style={{ minHeight: '100vh', background: bgColor }}>
			{/* Header Bar */}
			<div
				style={{
					position: 'sticky',
					top: 0,
					zIndex: 100,
					background: cardBg,
					borderBottom: `1px solid ${borderColor}`,
					boxShadow: shadows.md,
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: spacing[4],
						maxWidth: '1400px',
						margin: '0 auto',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: spacing[4] }}>
						<button
							onClick={onBack}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: spacing[2],
								padding: `${spacing[2]} ${spacing[4]}`,
								background: 'transparent',
								border: `1px solid ${borderColor}`,
								borderRadius: borderRadius.base,
								color: textColor,
								fontSize: typography.fontSize.sm,
								fontWeight: typography.fontWeight.medium,
								cursor: 'pointer',
								transition: 'all 0.2s',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'transparent';
							}}
						>
							<ArrowLeft size={16} />
							Back
						</button>

						<div>
							<div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
								<h1
									style={{
										margin: 0,
										fontSize: typography.fontSize['2xl'],
										fontWeight: typography.fontWeight.bold,
										color: textColor,
									}}
								>
									{example.icon} {example.title}
								</h1>
								<span
									style={{
										padding: '4px 12px',
										background: difficultyColor.bg,
										color: difficultyColor.text,
										borderRadius: borderRadius.full,
										fontSize: typography.fontSize.xs,
										fontWeight: typography.fontWeight.semibold,
										textTransform: 'capitalize',
									}}
								>
									{example.difficulty}
								</span>
							</div>
							<p style={{ margin: `${spacing[1]} 0 0 0`, fontSize: typography.fontSize.sm, color: mutedTextColor }}>
								{example.description}
							</p>
						</div>
					</div>

					<div style={{ display: 'flex', gap: spacing[2] }}>
						<a
							href="https://github.com/Yourstruggle11/react-dragdrop-kit#readme"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: spacing[2],
								padding: `${spacing[2]} ${spacing[4]}`,
								background: 'transparent',
								border: `1px solid ${borderColor}`,
								borderRadius: borderRadius.base,
								color: textColor,
								fontSize: typography.fontSize.sm,
								textDecoration: 'none',
								transition: 'all 0.2s',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'transparent';
							}}
						>
							<ExternalLink size={16} />
							<span>Docs</span>
						</a>
					</div>
				</div>
			</div>

			{/* Content */}
			<div>{children}</div>
		</div>
	);
}
