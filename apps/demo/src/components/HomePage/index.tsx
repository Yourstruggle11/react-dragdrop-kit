import { Github, Package, BookOpen, Zap, Shield, Code2 } from 'lucide-react';
import { getFeaturedExamples, getNewExamples, categories } from '@/constants/examples';
import ExampleCard from '@/components/ExampleCard';
import { colors, borderRadius, shadows, typography, spacing, gradients } from '@/constants/designSystem';
import { useThemeMode } from '@/contexts/ThemeContext';

interface HomePageProps {
	onExampleSelect: (exampleId: string) => void;
}

export default function HomePage({ onExampleSelect }: HomePageProps) {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';

	const bgColor = isDark ? colors.gray[900] : colors.gray[50];
	const textColor = isDark ? colors.gray[100] : colors.gray[900];
	const mutedTextColor = isDark ? colors.gray[400] : colors.gray[600];

	const featuredExamples = getFeaturedExamples();
	const newExamples = getNewExamples();

	const features = [
		{
			icon: <Zap size={24} />,
			title: 'Lightweight & Fast',
			description: 'Only ~5KB for lists, ~9KB for Kanban. Blazing fast performance.',
		},
		{
			icon: <Code2 size={24} />,
			title: 'TypeScript First',
			description: 'Full type safety with comprehensive TypeScript definitions.',
		},
		{
			icon: <Shield size={24} />,
			title: 'Accessible',
			description: 'Built-in ARIA attributes and keyboard navigation support.',
		},
		{
			icon: <Package size={24} />,
			title: 'Tree-shakeable',
			description: 'Import only what you need. Optimized bundle size.',
		},
	];

	return (
		<div
			style={{
				minHeight: '100vh',
				background: bgColor,
				color: textColor,
			}}
		>
			{/* Hero Section */}
			<section
				style={{
					padding: `${spacing[20]} ${spacing[6]} ${spacing[12]}`,
					background: isDark
						? 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)'
						: gradients.primary,
					color: colors.white,
					textAlign: 'center',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* Animated Background Pattern */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						opacity: 0.1,
						backgroundImage: `radial-gradient(circle at 25px 25px, ${colors.white} 2%, transparent 0%),
							radial-gradient(circle at 75px 75px, ${colors.white} 2%, transparent 0%)`,
						backgroundSize: '100px 100px',
					}}
				/>

				<div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
					<h1
						style={{
							margin: 0,
							fontSize: typography.fontSize['6xl'],
							fontWeight: typography.fontWeight.black,
							marginBottom: spacing[6],
							textShadow: '0 4px 32px rgba(0,0,0,0.2)',
							letterSpacing: typography.letterSpacing.tight,
						}}
					>
						react-dragdrop-kit
					</h1>

					<p
						style={{
							margin: 0,
							fontSize: typography.fontSize['2xl'],
							fontWeight: typography.fontWeight.medium,
							marginBottom: spacing[8],
							opacity: 0.95,
							lineHeight: typography.lineHeight.relaxed,
						}}
					>
						A flexible, lightweight React library for building sortable lists, grids, and Kanban boards
					</p>

					{/* CTA Buttons */}
					<div
						style={{
							display: 'flex',
							gap: spacing[4],
							justifyContent: 'center',
							flexWrap: 'wrap',
						}}
					>
						<a
							href="https://github.com/Yourstruggle11/react-dragdrop-kit"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: spacing[2],
								padding: `${spacing[4]} ${spacing[6]}`,
								background: colors.white,
								color: colors.primary[600],
								borderRadius: borderRadius.xl,
								fontSize: typography.fontSize.lg,
								fontWeight: typography.fontWeight.bold,
								textDecoration: 'none',
								boxShadow: shadows.xl,
								transition: 'transform 0.2s',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0) scale(1)';
							}}
						>
							<Github size={20} />
							<span>View on GitHub</span>
						</a>

						<a
							href="https://www.npmjs.com/package/react-dragdrop-kit"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: spacing[2],
								padding: `${spacing[4]} ${spacing[6]}`,
								background: 'rgba(255, 255, 255, 0.2)',
								backdropFilter: 'blur(10px)',
								color: colors.white,
								border: `2px solid ${colors.white}`,
								borderRadius: borderRadius.xl,
								fontSize: typography.fontSize.lg,
								fontWeight: typography.fontWeight.bold,
								textDecoration: 'none',
								transition: 'all 0.2s',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = colors.white;
								e.currentTarget.style.color = colors.primary[600];
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
								e.currentTarget.style.color = colors.white;
							}}
						>
							<Package size={20} />
							<span>Install from NPM</span>
						</a>
					</div>

					{/* Installation Command */}
					<div
						style={{
							marginTop: spacing[8],
							padding: spacing[4],
							background: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.2)',
							backdropFilter: 'blur(10px)',
							borderRadius: borderRadius.lg,
							fontFamily: typography.fontFamily.mono,
							fontSize: typography.fontSize.base,
							maxWidth: '500px',
							margin: `${spacing[8]} auto 0`,
						}}
					>
						npm install react-dragdrop-kit
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section
				style={{
					padding: `${spacing[16]} ${spacing[6]}`,
					maxWidth: '1200px',
					margin: '0 auto',
				}}
			>
				<h2
					style={{
						margin: 0,
						marginBottom: spacing[12],
						fontSize: typography.fontSize['4xl'],
						fontWeight: typography.fontWeight.bold,
						textAlign: 'center',
						color: textColor,
					}}
				>
					Why react-dragdrop-kit?
				</h2>

				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
						gap: spacing[6],
					}}
				>
					{features.map((feature, index) => (
						<div
							key={index}
							style={{
								padding: spacing[6],
								background: isDark ? colors.gray[800] : colors.white,
								border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
								borderRadius: borderRadius.xl,
								boxShadow: shadows.md,
								transition: 'transform 0.2s',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-4px)';
								e.currentTarget.style.boxShadow = shadows.xl;
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = shadows.md;
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '56px',
									height: '56px',
									background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.secondary[500]} 100%)`,
									color: colors.white,
									borderRadius: borderRadius.xl,
									marginBottom: spacing[4],
								}}
							>
								{feature.icon}
							</div>
							<h3
								style={{
									margin: 0,
									marginBottom: spacing[2],
									fontSize: typography.fontSize.xl,
									fontWeight: typography.fontWeight.bold,
									color: textColor,
								}}
							>
								{feature.title}
							</h3>
							<p
								style={{
									margin: 0,
									fontSize: typography.fontSize.sm,
									color: mutedTextColor,
									lineHeight: typography.lineHeight.relaxed,
								}}
							>
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Featured Examples Section */}
			{featuredExamples.length > 0 && (
				<section
					style={{
						padding: `${spacing[16]} ${spacing[6]}`,
						background: isDark ? colors.gray[800] : colors.white,
					}}
				>
					<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
						<h2
							style={{
								margin: 0,
								marginBottom: spacing[3],
								fontSize: typography.fontSize['4xl'],
								fontWeight: typography.fontWeight.bold,
								textAlign: 'center',
								color: textColor,
							}}
						>
							⭐ Featured Examples
						</h2>
						<p
							style={{
								margin: 0,
								marginBottom: spacing[12],
								fontSize: typography.fontSize.lg,
								color: mutedTextColor,
								textAlign: 'center',
							}}
						>
							Explore our most popular examples to get started quickly
						</p>

						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
								gap: spacing[6],
							}}
						>
							{featuredExamples.map((example) => (
								<ExampleCard
									key={example.id}
									example={example}
									onClick={() => onExampleSelect(example.id)}
								/>
							))}
						</div>
					</div>
				</section>
			)}

			{/* New Examples Section */}
			{newExamples.length > 0 && (
				<section
					style={{
						padding: `${spacing[16]} ${spacing[6]}`,
						maxWidth: '1200px',
						margin: '0 auto',
					}}
				>
					<h2
						style={{
							margin: 0,
							marginBottom: spacing[3],
							fontSize: typography.fontSize['4xl'],
							fontWeight: typography.fontWeight.bold,
							textAlign: 'center',
							color: textColor,
						}}
					>
						✨ New Examples
					</h2>
					<p
						style={{
							margin: 0,
							marginBottom: spacing[12],
							fontSize: typography.fontSize.lg,
							color: mutedTextColor,
							textAlign: 'center',
						}}
					>
						Check out our latest additions
					</p>

					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
							gap: spacing[6],
						}}
					>
						{newExamples.slice(0, 6).map((example) => (
							<ExampleCard
								key={example.id}
								example={example}
								onClick={() => onExampleSelect(example.id)}
							/>
						))}
					</div>
				</section>
			)}

			{/* Browse All Categories */}
			<section
				style={{
					padding: `${spacing[16]} ${spacing[6]}`,
					background: isDark ? colors.gray[800] : colors.white,
				}}
			>
				<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
					<h2
						style={{
							margin: 0,
							marginBottom: spacing[12],
							fontSize: typography.fontSize['4xl'],
							fontWeight: typography.fontWeight.bold,
							textAlign: 'center',
							color: textColor,
						}}
					>
						Browse by Category
					</h2>

					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
							gap: spacing[6],
						}}
					>
						{Object.values(categories).map((category) => (
							<div
								key={category.id}
								style={{
									padding: spacing[6],
									background: isDark ? colors.gray[700] : colors.gray[50],
									border: `2px solid ${isDark ? colors.gray[600] : colors.gray[200]}`,
									borderRadius: borderRadius.xl,
									textAlign: 'center',
									cursor: 'pointer',
									transition: 'all 0.2s',
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'scale(1.03)';
									e.currentTarget.style.borderColor = colors.primary[500];
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'scale(1)';
									e.currentTarget.style.borderColor = isDark ? colors.gray[600] : colors.gray[200];
								}}
							>
								<div style={{ fontSize: '48px', marginBottom: spacing[3] }}>{category.icon}</div>
								<h3
									style={{
										margin: 0,
										marginBottom: spacing[2],
										fontSize: typography.fontSize.xl,
										fontWeight: typography.fontWeight.bold,
										color: textColor,
									}}
								>
									{category.title}
								</h3>
								<p
									style={{
										margin: 0,
										fontSize: typography.fontSize.sm,
										color: mutedTextColor,
										lineHeight: typography.lineHeight.relaxed,
									}}
								>
									{category.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Footer CTA */}
			<section
				style={{
					padding: `${spacing[20]} ${spacing[6]}`,
					background: isDark
						? 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)'
						: gradients.primary,
					color: colors.white,
					textAlign: 'center',
				}}
			>
				<h2
					style={{
						margin: 0,
						marginBottom: spacing[4],
						fontSize: typography.fontSize['4xl'],
						fontWeight: typography.fontWeight.bold,
					}}
				>
					Ready to Get Started?
				</h2>
				<p
					style={{
						margin: 0,
						marginBottom: spacing[8],
						fontSize: typography.fontSize.xl,
						opacity: 0.95,
					}}
				>
					Browse the examples in the sidebar or check out our documentation
				</p>
				<a
					href="https://github.com/Yourstruggle11/react-dragdrop-kit#readme"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: spacing[2],
						padding: `${spacing[4]} ${spacing[6]}`,
						background: colors.white,
						color: colors.primary[600],
						borderRadius: borderRadius.xl,
						fontSize: typography.fontSize.lg,
						fontWeight: typography.fontWeight.bold,
						textDecoration: 'none',
						boxShadow: shadows.xl,
						transition: 'transform 0.2s',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'translateY(0) scale(1)';
					}}
				>
					<BookOpen size={20} />
					<span>Read Documentation</span>
				</a>
			</section>
		</div>
	);
}
