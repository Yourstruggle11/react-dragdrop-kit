import React from 'react';
import type { Example } from '@/constants/examples';
import { colors, borderRadius, spacing, typography, shadows } from '@/constants/designSystem';
import { useThemeMode } from '@/contexts/useThemeMode';
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
		<div style={{ minHeight: '100vh', background: bgColor }} className="example-shell">
			{/* Header Bar */}
			<div
				className="example-header"
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
					className="example-header-inner"
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: spacing[4],
						maxWidth: '1400px',
						margin: '0 auto',
					}}
				>
					<div className="example-header-left" style={{ display: 'flex', alignItems: 'center', gap: spacing[4] }}>
						<button
							onClick={onBack}
							className="example-back-button"
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

						<div className="example-heading">
							<div className="example-title-row" style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
								<h1
									className="example-title"
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
									className="example-difficulty"
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
							<p
								className="example-description"
								style={{ margin: `${spacing[1]} 0 0 0`, fontSize: typography.fontSize.sm, color: mutedTextColor }}
							>
								{example.description}
							</p>
						</div>
					</div>

					<div className="example-header-actions" style={{ display: 'flex', gap: spacing[2] }}>
						<a
							href="https://github.com/Yourstruggle11/react-dragdrop-kit#readme"
							target="_blank"
							rel="noopener noreferrer"
							className="example-docs-link"
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
			<div className="example-content">{children}</div>

			<style>{`
				.example-header-left {
					min-width: 0;
				}

				.example-heading {
					min-width: 0;
				}

				.example-title-row {
					flex-wrap: wrap;
				}

				.example-title {
					line-height: 1.2;
					overflow-wrap: anywhere;
				}

				.example-description {
					max-width: 72ch;
				}

				@media (max-width: 900px) {
					.example-header-inner {
						flex-wrap: wrap;
						align-items: flex-start !important;
					}

					.example-header-left {
						flex: 1 1 100%;
					}

					.example-header-actions {
						width: 100%;
						justify-content: flex-end;
					}
				}

				@media (max-width: 640px) {
					.example-header-inner {
						padding: ${spacing[3]} !important;
						gap: ${spacing[2]};
					}

					.example-header-left {
						flex-direction: column;
						align-items: flex-start !important;
						gap: ${spacing[2]} !important;
					}

					.example-title {
						font-size: ${typography.fontSize.xl} !important;
					}

					.example-description {
						font-size: ${typography.fontSize.xs} !important;
					}

					.example-header-actions {
						justify-content: flex-start;
					}

					.example-back-button,
					.example-docs-link {
						padding: ${spacing[1]} ${spacing[3]} !important;
					}
				}
			`}</style>
		</div>
	);
}

