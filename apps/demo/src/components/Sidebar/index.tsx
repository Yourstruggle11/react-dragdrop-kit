import { useState } from 'react';
import { Menu, X, Search, Home, Book, Sparkles } from 'lucide-react';
import { categories, examples, type ExampleCategory, searchExamples } from '@/constants/examples';
import { colors, borderRadius, shadows, transitions, typography, spacing } from '@/constants/designSystem';
import { useThemeMode } from '@/contexts/ThemeContext';
import DarkModeToggle from '@/components/DarkModeToggle';

interface SidebarProps {
	activeExample: string;
	onExampleSelect: (exampleId: string) => void;
	onHomeClick: () => void;
}

export default function Sidebar({ activeExample, onExampleSelect, onHomeClick }: SidebarProps) {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [activeCategory, setActiveCategory] = useState<ExampleCategory | 'all'>('all');

	const bgColor = isDark ? colors.gray[900] : colors.white;
	const borderColor = isDark ? colors.gray[800] : colors.gray[200];
	const textColor = isDark ? colors.gray[100] : colors.gray[900];
	const mutedTextColor = isDark ? colors.gray[400] : colors.gray[600];
	const hoverBg = isDark ? colors.gray[800] : colors.gray[100];

	const filteredExamples = searchQuery
		? searchExamples(searchQuery)
		: activeCategory === 'all'
		? examples
		: examples.filter((ex) => ex.category === activeCategory);

	const renderExampleItem = (example: typeof examples[0]) => {
		const isActive = activeExample === example.id;
		return (
			<button
				key={example.id}
				onClick={() => {
					onExampleSelect(example.id);
					if (window.innerWidth < 1024) setIsOpen(false);
				}}
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: spacing[3],
					width: '100%',
					padding: `${spacing[2]} ${spacing[3]}`,
					background: isActive ? (isDark ? colors.primary[800] : colors.primary[50]) : 'transparent',
					border: 'none',
					borderLeft: `3px solid ${isActive ? colors.primary[500] : 'transparent'}`,
					borderRadius: borderRadius.base,
					cursor: 'pointer',
					transition: transitions.fast,
					color: isActive ? colors.primary[500] : textColor,
					textAlign: 'left',
				}}
				onMouseEnter={(e) => {
					if (!isActive) {
						e.currentTarget.style.background = hoverBg;
					}
				}}
				onMouseLeave={(e) => {
					if (!isActive) {
						e.currentTarget.style.background = 'transparent';
					}
				}}
			>
				<span style={{ fontSize: typography.fontSize.lg }}>{example.icon}</span>
				<div style={{ flex: 1, minWidth: 0 }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: spacing[2],
							marginBottom: spacing[1],
						}}
					>
						<span
							style={{
								fontSize: typography.fontSize.sm,
								fontWeight: isActive ? typography.fontWeight.semibold : typography.fontWeight.medium,
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
							}}
						>
							{example.title}
						</span>
						{example.new && (
							<span
								style={{
									fontSize: '10px',
									padding: '2px 6px',
									background: colors.success.main,
									color: colors.white,
									borderRadius: borderRadius.sm,
									fontWeight: typography.fontWeight.bold,
								}}
							>
								NEW
							</span>
						)}
					</div>
					<p
						style={{
							fontSize: typography.fontSize.xs,
							color: mutedTextColor,
							margin: 0,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{example.description}
					</p>
				</div>
			</button>
		);
	};

	const sidebarContent = (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				background: bgColor,
			}}
		>
			{/* Header */}
			<div
				style={{
					padding: spacing[4],
					borderBottom: `1px solid ${borderColor}`,
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing[4] }}>
					<h2
						style={{
							margin: 0,
							fontSize: typography.fontSize['2xl'],
							fontWeight: typography.fontWeight.bold,
							color: textColor,
						}}
					>
						react-dragdrop-kit
					</h2>
					<div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
						<DarkModeToggle />
						<button
							onClick={() => setIsOpen(false)}
							style={{
								display: 'none',
								alignItems: 'center',
								justifyContent: 'center',
								width: '40px',
								height: '40px',
								background: 'transparent',
								border: 'none',
								cursor: 'pointer',
								color: textColor,
							}}
							className="mobile-close-btn"
						>
							<X size={24} />
						</button>
					</div>
				</div>

				{/* Search */}
				<div style={{ position: 'relative' }}>
					<Search
						size={18}
						style={{
							position: 'absolute',
							left: spacing[3],
							top: '50%',
							transform: 'translateY(-50%)',
							color: mutedTextColor,
						}}
					/>
					<input
						type="text"
						placeholder="Search examples..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						style={{
							width: '100%',
							padding: `${spacing[2]} ${spacing[3]} ${spacing[2]} 40px`,
							background: isDark ? colors.gray[800] : colors.gray[50],
							border: `1px solid ${borderColor}`,
							borderRadius: borderRadius.base,
							fontSize: typography.fontSize.sm,
							color: textColor,
							outline: 'none',
							transition: transitions.fast,
						}}
						onFocus={(e) => {
							e.currentTarget.style.borderColor = colors.primary[500];
						}}
						onBlur={(e) => {
							e.currentTarget.style.borderColor = borderColor;
						}}
					/>
				</div>
			</div>

			{/* Navigation */}
			<div style={{ flex: 1, overflowY: 'auto', padding: spacing[4] }}>
				{/* Home Button */}
				<button
					onClick={() => {
						onHomeClick();
						if (window.innerWidth < 1024) setIsOpen(false);
					}}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: spacing[3],
						width: '100%',
						padding: spacing[3],
						background: activeExample === 'home' ? (isDark ? colors.primary[800] : colors.primary[50]) : 'transparent',
						border: 'none',
						borderRadius: borderRadius.base,
						cursor: 'pointer',
						color: activeExample === 'home' ? colors.primary[500] : textColor,
						marginBottom: spacing[4],
						fontWeight: typography.fontWeight.semibold,
						fontSize: typography.fontSize.base,
						transition: transitions.fast,
					}}
					onMouseEnter={(e) => {
						if (activeExample !== 'home') {
							e.currentTarget.style.background = hoverBg;
						}
					}}
					onMouseLeave={(e) => {
						if (activeExample !== 'home') {
							e.currentTarget.style.background = 'transparent';
						}
					}}
				>
					<Home size={20} />
					<span>Home</span>
				</button>

				{/* Known Issues */}
				<button
					onClick={() => {
						onExampleSelect('known-issues');
						if (window.innerWidth < 1024) setIsOpen(false);
					}}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: spacing[3],
						width: '100%',
						padding: spacing[3],
						background: activeExample === 'known-issues' ? (isDark ? colors.primary[800] : colors.primary[50]) : 'transparent',
						border: 'none',
						borderRadius: borderRadius.base,
						cursor: 'pointer',
						color: activeExample === 'known-issues' ? colors.primary[500] : textColor,
						marginBottom: spacing[4],
						fontWeight: typography.fontWeight.semibold,
						fontSize: typography.fontSize.base,
						transition: transitions.fast,
					}}
					onMouseEnter={(e) => {
						if (activeExample !== 'known-issues') {
							e.currentTarget.style.background = hoverBg;
						}
					}}
					onMouseLeave={(e) => {
						if (activeExample !== 'known-issues') {
							e.currentTarget.style.background = 'transparent';
						}
					}}
				>
					<Book size={20} />
					<span>Known Issues</span>
				</button>

				{/* Category Filters */}
				{!searchQuery && (
					<div style={{ marginBottom: spacing[4] }}>
						<h3
							style={{
								fontSize: typography.fontSize.xs,
								fontWeight: typography.fontWeight.bold,
								color: mutedTextColor,
								textTransform: 'uppercase',
								letterSpacing: typography.letterSpacing.wide,
								margin: `0 0 ${spacing[2]} 0`,
							}}
						>
							Categories
						</h3>
						<div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
							<button
								onClick={() => setActiveCategory('all')}
								style={{
									padding: `${spacing[2]} ${spacing[3]}`,
									background: activeCategory === 'all' ? (isDark ? colors.gray[800] : colors.gray[100]) : 'transparent',
									border: 'none',
									borderRadius: borderRadius.base,
									cursor: 'pointer',
									color: textColor,
									textAlign: 'left',
									fontSize: typography.fontSize.sm,
									fontWeight: activeCategory === 'all' ? typography.fontWeight.semibold : typography.fontWeight.normal,
									transition: transitions.fast,
								}}
								onMouseEnter={(e) => {
									if (activeCategory !== 'all') {
										e.currentTarget.style.background = hoverBg;
									}
								}}
								onMouseLeave={(e) => {
									if (activeCategory !== 'all') {
										e.currentTarget.style.background = 'transparent';
									}
								}}
							>
								<Sparkles size={14} style={{ display: 'inline', marginRight: spacing[2] }} />
								All Examples
							</button>
							{Object.values(categories).map((cat) => (
								<button
									key={cat.id}
									onClick={() => setActiveCategory(cat.id)}
									style={{
										padding: `${spacing[2]} ${spacing[3]}`,
										background: activeCategory === cat.id ? (isDark ? colors.gray[800] : colors.gray[100]) : 'transparent',
										border: 'none',
										borderRadius: borderRadius.base,
										cursor: 'pointer',
										color: textColor,
										textAlign: 'left',
										fontSize: typography.fontSize.sm,
										fontWeight: activeCategory === cat.id ? typography.fontWeight.semibold : typography.fontWeight.normal,
										transition: transitions.fast,
									}}
									onMouseEnter={(e) => {
										if (activeCategory !== cat.id) {
											e.currentTarget.style.background = hoverBg;
										}
									}}
									onMouseLeave={(e) => {
										if (activeCategory !== cat.id) {
											e.currentTarget.style.background = 'transparent';
										}
									}}
								>
									{cat.icon} {cat.title}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Examples List */}
				<div>
					<h3
						style={{
							fontSize: typography.fontSize.xs,
							fontWeight: typography.fontWeight.bold,
							color: mutedTextColor,
							textTransform: 'uppercase',
							letterSpacing: typography.letterSpacing.wide,
							margin: `0 0 ${spacing[2]} 0`,
						}}
					>
						{searchQuery ? `Results (${filteredExamples.length})` : 'Examples'}
					</h3>
					<div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
						{filteredExamples.length === 0 ? (
							<p style={{ color: mutedTextColor, fontSize: typography.fontSize.sm, textAlign: 'center', padding: spacing[4] }}>
								No examples found
							</p>
						) : (
							filteredExamples.map(renderExampleItem)
						)}
					</div>
				</div>
			</div>

			{/* Footer */}
			<div
				style={{
					padding: spacing[4],
					borderTop: `1px solid ${borderColor}`,
					fontSize: typography.fontSize.xs,
					color: mutedTextColor,
					textAlign: 'center',
				}}
			>
				<p style={{ margin: 0 }}>
					Made with ❤️ by{' '}
					<a
						href="https://github.com/Yourstruggle11"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: colors.primary[500], textDecoration: 'none', fontWeight: typography.fontWeight.semibold }}
					>
						Yourstruggle11
					</a>
				</p>
				<p style={{ margin: `${spacing[2]} 0 0 0` }}>
					<a
						href="https://github.com/Yourstruggle11/react-dragdrop-kit"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: mutedTextColor, textDecoration: 'none', marginRight: spacing[3] }}
					>
						GitHub
					</a>
					<a
						href="https://www.npmjs.com/package/react-dragdrop-kit"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: mutedTextColor, textDecoration: 'none' }}
					>
						NPM
					</a>
				</p>
			</div>

			<style>{`
				@media (max-width: 1024px) {
					.mobile-close-btn {
						display: flex !important;
					}
				}
			`}</style>
		</div>
	);

	return (
		<>
			{/* Mobile Toggle Button */}
			<button
				onClick={() => setIsOpen(true)}
				style={{
					display: 'none',
					position: 'fixed',
					top: spacing[4],
					left: spacing[4],
					zIndex: 999,
					alignItems: 'center',
					justifyContent: 'center',
					width: '48px',
					height: '48px',
					background: isDark ? colors.gray[800] : colors.white,
					border: `1px solid ${borderColor}`,
					borderRadius: borderRadius.full,
					cursor: 'pointer',
					boxShadow: shadows.lg,
					color: textColor,
				}}
				className="mobile-menu-btn"
			>
				<Menu size={24} />
			</button>

			{/* Desktop Sidebar */}
			<aside
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					bottom: 0,
					width: '320px',
					borderRight: `1px solid ${borderColor}`,
					zIndex: 1000,
					overflowY: 'auto',
				}}
				className="desktop-sidebar"
			>
				{sidebarContent}
			</aside>

			{/* Mobile Sidebar */}
			{isOpen && (
				<>
					<div
						onClick={() => setIsOpen(false)}
						style={{
							display: 'none',
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							background: 'rgba(0, 0, 0, 0.5)',
							zIndex: 1100,
							backdropFilter: 'blur(4px)',
						}}
						className="mobile-overlay"
					/>
					<aside
						style={{
							display: 'none',
							position: 'fixed',
							top: 0,
							left: 0,
							bottom: 0,
							width: '85%',
							maxWidth: '320px',
							zIndex: 1200,
							boxShadow: shadows['2xl'],
							animation: 'slideInLeft 0.3s ease-out',
						}}
						className="mobile-sidebar"
					>
						{sidebarContent}
					</aside>
				</>
			)}

			<style>{`
				@media (max-width: 1024px) {
					.desktop-sidebar {
						display: none;
					}
					.mobile-menu-btn {
						display: flex !important;
					}
					.mobile-overlay,
					.mobile-sidebar {
						display: block !important;
					}
				}

				@keyframes slideInLeft {
					from {
						transform: translateX(-100%);
					}
					to {
						transform: translateX(0);
					}
				}
			`}</style>
		</>
	);
}
