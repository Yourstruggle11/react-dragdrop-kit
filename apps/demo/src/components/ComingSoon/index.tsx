import { Construction, Calendar, Bell } from 'lucide-react';
import { colors, borderRadius, spacing, typography, shadows } from '../../constants/designSystem';
import { useThemeMode } from '../../contexts/ThemeContext';

export default function ComingSoon() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';

	const bgColor = isDark ? colors.gray[900] : colors.gray[50];
	const textColor = isDark ? colors.gray[100] : colors.gray[900];
	const mutedTextColor = isDark ? colors.gray[400] : colors.gray[600];

	return (
		<div
			style={{
				minHeight: '80vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: bgColor,
				padding: spacing[8],
			}}
		>
			<div
				style={{
					textAlign: 'center',
					maxWidth: '600px',
				}}
			>
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '120px',
						height: '120px',
						background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.secondary[500]} 100%)`,
						borderRadius: borderRadius.full,
						marginBottom: spacing[8],
						boxShadow: shadows.xl,
					}}
				>
					<Construction size={60} color={colors.white} />
				</div>

				<h1
					style={{
						margin: 0,
						marginBottom: spacing[4],
						fontSize: typography.fontSize['5xl'],
						fontWeight: typography.fontWeight.black,
						color: textColor,
					}}
				>
					Coming Soon
				</h1>

				<p
					style={{
						margin: 0,
						marginBottom: spacing[8],
						fontSize: typography.fontSize.xl,
						color: mutedTextColor,
						lineHeight: typography.lineHeight.relaxed,
					}}
				>
					This example is currently under development. We're working hard to bring you amazing interactive demos!
				</p>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
						gap: spacing[4],
						marginBottom: spacing[8],
					}}
				>
					<div
						style={{
							padding: spacing[6],
							background: isDark ? colors.gray[800] : colors.white,
							border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
							borderRadius: borderRadius.xl,
							boxShadow: shadows.md,
						}}
					>
						<Calendar size={32} color={colors.primary[500]} style={{ marginBottom: spacing[3] }} />
						<h3
							style={{
								margin: 0,
								marginBottom: spacing[2],
								fontSize: typography.fontSize.lg,
								fontWeight: typography.fontWeight.bold,
								color: textColor,
							}}
						>
							In Progress
						</h3>
						<p
							style={{
								margin: 0,
								fontSize: typography.fontSize.sm,
								color: mutedTextColor,
							}}
						>
							Example is being built
						</p>
					</div>

					<div
						style={{
							padding: spacing[6],
							background: isDark ? colors.gray[800] : colors.white,
							border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
							borderRadius: borderRadius.xl,
							boxShadow: shadows.md,
						}}
					>
						<Bell size={32} color={colors.warning.main} style={{ marginBottom: spacing[3] }} />
						<h3
							style={{
								margin: 0,
								marginBottom: spacing[2],
								fontSize: typography.fontSize.lg,
								fontWeight: typography.fontWeight.bold,
								color: textColor,
							}}
						>
							Stay Updated
						</h3>
						<p
							style={{
								margin: 0,
								fontSize: typography.fontSize.sm,
								color: mutedTextColor,
							}}
						>
							Check back soon for updates
						</p>
					</div>
				</div>

				<p
					style={{
						margin: 0,
						fontSize: typography.fontSize.sm,
						color: mutedTextColor,
					}}
				>
					In the meantime, explore other examples from the sidebar or{' '}
					<a
						href="https://github.com/Yourstruggle11/react-dragdrop-kit"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							color: colors.primary[500],
							textDecoration: 'none',
							fontWeight: typography.fontWeight.semibold,
						}}
					>
						check out our GitHub
					</a>
					.
				</p>
			</div>
		</div>
	);
}
