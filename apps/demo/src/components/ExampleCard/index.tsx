import { ArrowRight, Star, Zap } from 'lucide-react';
import type { Example } from '../../constants/examples';
import { colors, borderRadius, shadows, transitions, typography, spacing } from '../../constants/designSystem';
import { useThemeMode } from '../../contexts/ThemeContext';

interface ExampleCardProps {
	example: Example;
	onClick: () => void;
}

export default function ExampleCard({ example, onClick }: ExampleCardProps) {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';

	const bgColor = isDark ? colors.gray[800] : colors.white;
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
		<article
			onClick={onClick}
			style={{
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				background: bgColor,
				border: `1px solid ${borderColor}`,
				borderRadius: borderRadius.xl,
				padding: spacing[6],
				cursor: 'pointer',
				transition: transitions.default,
				overflow: 'hidden',
				boxShadow: shadows.md,
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = 'translateY(-4px)';
				e.currentTarget.style.boxShadow = shadows.xl;
				e.currentTarget.style.borderColor = colors.primary[500];
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = 'translateY(0)';
				e.currentTarget.style.boxShadow = shadows.md;
				e.currentTarget.style.borderColor = borderColor;
			}}
		>
			{/* Badges */}
			<div
				style={{
					position: 'absolute',
					top: spacing[4],
					right: spacing[4],
					display: 'flex',
					gap: spacing[2],
				}}
			>
				{example.featured && (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '4px',
							padding: '4px 10px',
							background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
							color: colors.white,
							borderRadius: borderRadius.full,
							fontSize: '11px',
							fontWeight: typography.fontWeight.bold,
						}}
					>
						<Star size={12} fill="currentColor" />
						<span>Featured</span>
					</div>
				)}
				{example.new && (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '4px',
							padding: '4px 10px',
							background: colors.success.main,
							color: colors.white,
							borderRadius: borderRadius.full,
							fontSize: '11px',
							fontWeight: typography.fontWeight.bold,
						}}
					>
						<Zap size={12} fill="currentColor" />
						<span>NEW</span>
					</div>
				)}
			</div>

			{/* Icon */}
			<div
				style={{
					fontSize: '48px',
					marginBottom: spacing[4],
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '80px',
					height: '80px',
					background: isDark ? colors.gray[700] : colors.gray[50],
					borderRadius: borderRadius.xl,
				}}
			>
				{example.icon}
			</div>

			{/* Title */}
			<h3
				style={{
					margin: 0,
					marginBottom: spacing[2],
					fontSize: typography.fontSize.xl,
					fontWeight: typography.fontWeight.bold,
					color: textColor,
					lineHeight: typography.lineHeight.tight,
				}}
			>
				{example.title}
			</h3>

			{/* Description */}
			<p
				style={{
					margin: 0,
					marginBottom: spacing[4],
					fontSize: typography.fontSize.sm,
					color: mutedTextColor,
					lineHeight: typography.lineHeight.relaxed,
					flex: 1,
				}}
			>
				{example.description}
			</p>

			{/* Footer */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginTop: 'auto',
				}}
			>
				{/* Difficulty Badge */}
				<span
					style={{
						padding: '6px 12px',
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

				{/* View Arrow */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: spacing[2],
						color: colors.primary[500],
						fontSize: typography.fontSize.sm,
						fontWeight: typography.fontWeight.semibold,
					}}
				>
					<span>View</span>
					<ArrowRight size={16} />
				</div>
			</div>

			{/* Tags */}
			{example.tags.length > 0 && (
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: spacing[2],
						marginTop: spacing[3],
					}}
				>
					{example.tags.slice(0, 3).map((tag) => (
						<span
							key={tag}
							style={{
								padding: '4px 10px',
								background: isDark ? colors.gray[700] : colors.gray[100],
								color: mutedTextColor,
								borderRadius: borderRadius.base,
								fontSize: '11px',
								fontWeight: typography.fontWeight.medium,
							}}
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</article>
	);
}
