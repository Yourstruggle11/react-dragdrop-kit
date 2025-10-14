import { useState } from 'react';
import { DragDropList } from 'react-dragdrop-kit';
import type { OrderUpdate } from 'react-dragdrop-kit';
import { useThemeMode } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius, shadows, typography } from '@/constants/designSystem';
import toast from 'react-hot-toast';
import { useDebouncedToast } from '@/hooks/useDebouncedToast';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import CodeViewer from '@/components/CodeViewer';

interface TabItem {
	id: string;
	position: number;
	label: string;
	icon: string;
	color: string;
}

const initialTabs: TabItem[] = [
	{ id: '1', position: 0, label: 'Dashboard', icon: '📊', color: colors.blue[500] },
	{ id: '2', position: 1, label: 'Analytics', icon: '📈', color: colors.purple[500] },
	{ id: '3', position: 2, label: 'Reports', icon: '📄', color: colors.teal[500] },
	{ id: '4', position: 3, label: 'Settings', icon: '⚙️', color: colors.orange[500] },
	{ id: '5', position: 4, label: 'Users', icon: '👥', color: colors.pink[500] },
	{ id: '6', position: 5, label: 'Messages', icon: '💬', color: colors.indigo[500] },
];

const codeExample = `import { DragDropList } from 'react-dragdrop-kit';
import type { OrderUpdate } from 'react-dragdrop-kit';

interface TabItem {
  id: string;
  position: number;
  label: string;
  icon: string;
}

export default function HorizontalList() {
  const [tabs, setTabs] = useState<TabItem[]>([
    { id: '1', position: 0, label: 'Dashboard', icon: '📊' },
    { id: '2', position: 1, label: 'Analytics', icon: '📈' },
    { id: '3', position: 2, label: 'Reports', icon: '📄' },
  ]);

  const handleReorder = (
    reordered: TabItem[],
    updates: OrderUpdate[]
  ) => {
    setTabs(reordered);
  };

  const renderTab = (tab: TabItem) => (
    <div style={{
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <span>{tab.icon}</span>
      <span>{tab.label}</span>
    </div>
  );

  return (
    <DragDropList
      items={tabs}
      onReorder={handleReorder}
      renderItem={renderTab}
      containerStyle={{
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
      }}
    />
  );
}`;

export default function HorizontalListExample() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [tabs, setTabs] = useState<TabItem[] >(initialTabs);
	const [activeTab, setActiveTab] = useState<string>('1');
	const { showToast } = useDebouncedToast();

const handleReorder = (reordered: TabItem[], _updates: OrderUpdate[]) => {
		setTabs(reordered);
		showToast('Tabs reordered!');
	};

	const addTab = () => {
		const newTab: TabItem = {
			id: Date.now().toString(),
			position: tabs.length,
			label: `Tab ${tabs.length + 1}`,
			icon: '📌',
			color: colors.gray[500],
		};
		setTabs([...tabs, newTab]);
		toast.success('Tab added!');
	};

	const renderTab = (tab: TabItem) => {
		const isActive = activeTab === tab.id;

		return (
			<div
				onClick={() => setActiveTab(tab.id)}
				style={{
					padding: `${spacing.md} ${spacing.xl}`,
					background: isActive
						? isDark
							? colors.gray[700]
							: colors.white
						: isDark
							? colors.gray[800]
							: colors.gray[100],
					borderRadius: borderRadius.lg,
					cursor: 'pointer',
					transition: 'all 0.2s ease',
					display: 'flex',
					alignItems: 'center',
					gap: spacing.sm,
					whiteSpace: 'nowrap',
					borderBottom: `3px solid ${isActive ? tab.color : 'transparent'}`,
					boxShadow: isActive ? shadows.md : 'none',
				}}
				onMouseEnter={(e) => {
					if (!isActive) {
						e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[50];
					}
				}}
				onMouseLeave={(e) => {
					if (!isActive) {
						e.currentTarget.style.background = isDark ? colors.gray[800] : colors.gray[100];
					}
				}}
			>
				<span style={{ fontSize: typography.fontSize.lg }}>{tab.icon}</span>
				<span
					style={{
						fontSize: typography.fontSize.sm,
						fontWeight: isActive ? typography.fontWeight.semibold : typography.fontWeight.medium,
						color: isActive ? (isDark ? colors.white : colors.gray[900]) : isDark ? colors.gray[400] : colors.gray[600],
					}}
				>
					{tab.label}
				</span>
			</div>
		);
	};

	return (
		<div style={{ padding: spacing.xl }}>
			<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
			{/* Header */}
			<div style={{ marginBottom: spacing.xl }}>
				<h2
					style={{
						margin: 0,
						fontSize: typography.fontSize['2xl'],
						fontWeight: typography.fontWeight.bold,
						color: isDark ? colors.white : colors.gray[900],
						marginBottom: spacing.sm,
					}}
				>
					Horizontal List
				</h2>
				<p
					style={{
						margin: 0,
						fontSize: typography.fontSize.base,
						color: isDark ? colors.gray[400] : colors.gray[600],
						marginBottom: spacing.sm,
					}}
				>
					Create horizontal scrollable lists like tab bars, carousels, or navigation menus
				</p>
				<div
					style={{
						padding: spacing.md,
						background: isDark ? `${colors.blue[500]}10` : `${colors.blue[500]}10`,
						border: `2px solid ${colors.blue[500]}`,
						borderRadius: borderRadius.md,
						fontSize: typography.fontSize.sm,
						color: isDark ? colors.blue[300] : colors.blue[700],
					}}
				>
					<strong>💡 Tip:</strong> Drag any tab to reorder them. The active tab (with the colored underline) changes when you click on a tab.
					Use the + button to add new tabs.
				</div>
			</div>

			{/* Tab Bar Container */}
			<div
				style={{
					marginBottom: spacing.xl,
					padding: spacing.md,
					background: isDark ? colors.gray[800] : colors.white,
					borderRadius: borderRadius.lg,
					boxShadow: shadows.lg,
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: spacing.sm,
					}}
				>
					<button
						style={{
							padding: spacing.sm,
							background: isDark ? colors.gray[700] : colors.gray[100],
							border: 'none',
							borderRadius: borderRadius.md,
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: isDark ? colors.gray[400] : colors.gray[600],
							transition: 'all 0.2s ease',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = isDark ? colors.gray[600] : colors.gray[200];
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
						}}
					>
						<ChevronLeft size={20} />
					</button>

					<div
						style={{
							flex: 1,
							overflowX: 'auto',
							overflowY: 'hidden',
						}}
					>
						<DragDropList
							items={tabs}
							onReorder={handleReorder}
							renderItem={renderTab}
							containerStyle={{
								display: 'flex',
								flexDirection: 'row',
								gap: spacing.sm,
								minWidth: 'min-content',
							}}
						/>
					</div>

					<button
						style={{
							padding: spacing.sm,
							background: isDark ? colors.gray[700] : colors.gray[100],
							border: 'none',
							borderRadius: borderRadius.md,
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: isDark ? colors.gray[400] : colors.gray[600],
							transition: 'all 0.2s ease',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = isDark ? colors.gray[600] : colors.gray[200];
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
						}}
					>
						<ChevronRight size={20} />
					</button>

					<button
						onClick={addTab}
						style={{
							padding: spacing.sm,
							background: colors.primary[500],
							border: 'none',
							borderRadius: borderRadius.md,
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: colors.white,
							transition: 'all 0.2s ease',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = colors.primary[600];
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = colors.primary[500];
						}}
					>
						<Plus size={20} />
					</button>
				</div>
			</div>

			{/* Tab Content */}
			<div
				style={{
					marginBottom: spacing.xl,
					padding: spacing.xl,
					background: isDark ? colors.gray[800] : colors.white,
					borderRadius: borderRadius.lg,
					boxShadow: shadows.sm,
					minHeight: '200px',
				}}
			>
				<h3
					style={{
						margin: 0,
						marginBottom: spacing.md,
						fontSize: typography.fontSize.xl,
						fontWeight: typography.fontWeight.bold,
						color: isDark ? colors.white : colors.gray[900],
					}}
				>
					{tabs.find((t) => t.id === activeTab)?.label} Content
				</h3>
				<p
					style={{
						margin: 0,
						fontSize: typography.fontSize.base,
						color: isDark ? colors.gray[400] : colors.gray[600],
						lineHeight: 1.6,
					}}
				>
					This is the content area for the {tabs.find((t) => t.id === activeTab)?.label.toLowerCase()} tab.
					Click different tabs to see their content, or drag tabs to reorder them.
				</p>
			</div>

			{/* Code Example */}
			<div style={{ marginBottom: spacing.xl }}>
				<h3
					style={{
						margin: 0,
						marginBottom: spacing.md,
						fontSize: typography.fontSize.lg,
						fontWeight: typography.fontWeight.semibold,
						color: isDark ? colors.white : colors.gray[900],
					}}
				>
					Code Example
				</h3>
				<CodeViewer code={codeExample} language="tsx" theme={isDark ? 'dark' : 'light'} />
			</div>

			{/* Use Cases */}
			<div
				style={{
					padding: spacing.lg,
					background: isDark ? `${colors.purple[500]}10` : `${colors.purple[500]}10`,
					border: `1px solid ${colors.purple[500]}`,
					borderRadius: borderRadius.lg,
				}}
			>
				<h4
					style={{
						margin: 0,
						marginBottom: spacing.md,
						fontSize: typography.fontSize.base,
						fontWeight: typography.fontWeight.semibold,
						color: colors.purple[500],
					}}
				>
					Common Use Cases
				</h4>
				<ul
					style={{
						margin: 0,
						paddingLeft: spacing.xl,
						color: isDark ? colors.gray[300] : colors.gray[700],
						fontSize: typography.fontSize.sm,
						lineHeight: 1.6,
					}}
				>
					<li>
						<strong>Tab Bars:</strong> Let users customize their tab order in applications
					</li>
					<li>
						<strong>Navigation Menus:</strong> Horizontal navigation with reorderable menu items
					</li>
					<li>
						<strong>Image Carousels:</strong> Reorderable horizontal image galleries
					</li>
					<li>
						<strong>Chip Lists:</strong> Tags, filters, or category chips that can be reordered
					</li>
					<li>
						<strong>Timeline Events:</strong> Horizontal timelines with draggable milestones
					</li>
				</ul>
			</div>

			{/* Statistics */}
			<div
				style={{
					marginTop: spacing.xl,
					padding: spacing.lg,
					background: isDark ? colors.gray[800] : colors.white,
					borderRadius: borderRadius.lg,
					boxShadow: shadows.sm,
				}}
			>
				<h3
					style={{
						margin: 0,
						marginBottom: spacing.md,
						fontSize: typography.fontSize.lg,
						fontWeight: typography.fontWeight.semibold,
						color: isDark ? colors.white : colors.gray[900],
					}}
				>
					Tab Bar Statistics
				</h3>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
						gap: spacing.md,
					}}
				>
					<div>
						<div
							style={{
								fontSize: typography.fontSize.sm,
								color: isDark ? colors.gray[400] : colors.gray[600],
							}}
						>
							Total Tabs
						</div>
						<div
							style={{
								fontSize: typography.fontSize.xl,
								fontWeight: typography.fontWeight.bold,
								color: isDark ? colors.white : colors.gray[900],
							}}
						>
							{tabs.length}
						</div>
					</div>
					<div>
						<div
							style={{
								fontSize: typography.fontSize.sm,
								color: isDark ? colors.gray[400] : colors.gray[600],
							}}
						>
							Active Tab
						</div>
						<div
							style={{
								fontSize: typography.fontSize.xl,
								fontWeight: typography.fontWeight.bold,
								color: tabs.find((t) => t.id === activeTab)?.color,
							}}
						>
							{tabs.find((t) => t.id === activeTab)?.label}
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
	);
}
