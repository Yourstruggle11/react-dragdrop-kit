import { useState, useMemo } from 'react';
import { DragDropList, type OrderUpdate } from 'react-dragdrop-kit';
import { Zap, RefreshCw } from 'lucide-react';
import { colors, borderRadius, shadows, transitions, typography, spacing } from '@/constants/designSystem';
import { useThemeMode } from '@/contexts/ThemeContext';
import toast from 'react-hot-toast';
import { useDebouncedToast } from '@/hooks/useDebouncedToast';
import CodeViewer from '@/components/CodeViewer';
import PerformanceMonitor from '@/components/PerformanceMonitor';

interface ListItem {
	id: string;
	position: number;
	value: number;
	color: string;
	category: string;
}

const generateItems = (count: number): ListItem[] => {
	const categories = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
	const colorPalette = [
		colors.primary[500],
		colors.secondary[500],
		colors.success.main,
		colors.warning.main,
		colors.info.main,
		colors.error.main,
	];

	return Array.from({ length: count }, (_, i) => ({
		id: `item-${i}`,
		position: i,
		value: Math.floor(Math.random() * 10000),
		color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
		category: categories[Math.floor(Math.random() * categories.length)],
	}));
};

export default function VirtualScrollingExample() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [itemCount, setItemCount] = useState(1000);
	const [items, setItems] = useState<ListItem[]>(() => generateItems(1000));
	const { showToast } = useDebouncedToast();

	const bgColor = isDark ? colors.gray[900] : colors.gray[50];
	const cardBg = isDark ? colors.gray[800] : colors.white;
	const textColor = isDark ? colors.gray[100] : colors.gray[900];
	const mutedTextColor = isDark ? colors.gray[400] : colors.gray[600];
	const borderColor = isDark ? colors.gray[700] : colors.gray[200];

	const handleReorder = (reordered: ListItem[], updates: OrderUpdate[]) => {
		setItems(reordered);
		showToast(`Reordered ${updates.length} item(s)`);
	};

	const regenerateItems = (count: number) => {
		setItemCount(count);
		setItems(generateItems(count));
		toast.success(`Generated ${count} items!`);
	};

	const stats = useMemo(() => {
		const totalValue = items.reduce((sum, item) => sum + item.value, 0);
		const avgValue = Math.round(totalValue / items.length);
		const categoryCounts = items.reduce((acc, item) => {
			acc[item.category] = (acc[item.category] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);

		return { totalValue, avgValue, categoryCounts };
	}, [items]);

	const renderItem = (item: ListItem) => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: spacing[3],
				padding: spacing[3],
				background: cardBg,
				border: `2px solid ${borderColor}`,
				borderRadius: borderRadius.lg,
				transition: transitions.fast,
			}}
		>
			{/* Color Indicator */}
			<div
				style={{
					width: '4px',
					height: '40px',
					background: item.color,
					borderRadius: borderRadius.full,
					flexShrink: 0,
				}}
			/>

			{/* Position */}
			<div
				style={{
					width: '60px',
					fontSize: typography.fontSize.sm,
					fontWeight: typography.fontWeight.semibold,
					color: mutedTextColor,
					fontFamily: typography.fontFamily.mono,
					flexShrink: 0,
				}}
			>
				#{item.position + 1}
			</div>

			{/* Content */}
			<div style={{ flex: 1, minWidth: 0 }}>
				<div
					style={{
						fontSize: typography.fontSize.base,
						fontWeight: typography.fontWeight.semibold,
						color: textColor,
						marginBottom: '2px',
					}}
				>
					Item {item.id}
				</div>
				<div style={{ fontSize: typography.fontSize.sm, color: mutedTextColor }}>
					Value: {item.value.toLocaleString()} • {item.category}
				</div>
			</div>

			{/* Badge */}
			<div
				style={{
					padding: '4px 12px',
					background: isDark ? colors.gray[700] : colors.gray[100],
					color: mutedTextColor,
					borderRadius: borderRadius.full,
					fontSize: typography.fontSize.xs,
					fontWeight: typography.fontWeight.semibold,
					flexShrink: 0,
				}}
			>
				{item.category}
			</div>
		</div>
	);

	const exampleCode = `import { useState } from 'react';
import { DragDropList } from 'react-dragdrop-kit';

// Generate 1000+ items
const generateItems = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: \`item-\${i}\`,
    position: i,
    value: Math.floor(Math.random() * 10000),
  }));

function LargeList() {
  const [items, setItems] = useState(() => generateItems(1000));

  return (
    <DragDropList
      items={items}
      onReorder={(reordered) => setItems(reordered)}
      renderItem={(item) => (
        <div>
          <strong>#{item.position + 1}</strong>
          <span>Item {item.id}</span>
          <span>Value: {item.value}</span>
        </div>
      )}
      showDropIndicator
      gap={8}
    />
  );
}`;

	return (
		<div
			style={{
				minHeight: '100vh',
				background: bgColor,
				padding: spacing[8],
			}}
		>
			<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
				{/* Header */}
				<div style={{ marginBottom: spacing[8] }}>
					<h1
						style={{
							margin: 0,
							marginBottom: spacing[3],
							fontSize: typography.fontSize['4xl'],
							fontWeight: typography.fontWeight.bold,
							color: textColor,
						}}
					>
						⚡ Virtual Scrolling Performance
					</h1>
					<p
						style={{
							margin: 0,
							fontSize: typography.fontSize.lg,
							color: mutedTextColor,
							lineHeight: typography.lineHeight.relaxed,
						}}
					>
						Test drag-and-drop performance with large datasets. The library handles {itemCount.toLocaleString()} items smoothly!
					</p>
				</div>

				{/* Stats */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
						gap: spacing[4],
						marginBottom: spacing[6],
					}}
				>
					<div
						style={{
							padding: spacing[4],
							background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[700]} 100%)`,
							borderRadius: borderRadius.xl,
							textAlign: 'center',
							color: colors.white,
							boxShadow: shadows.xl,
						}}
					>
						<div style={{ fontSize: typography.fontSize['4xl'], fontWeight: typography.fontWeight.black }}>
							{items.length.toLocaleString()}
						</div>
						<div style={{ fontSize: typography.fontSize.sm, opacity: 0.9, marginTop: spacing[1] }}>Total Items</div>
					</div>
					<div
						style={{
							padding: spacing[4],
							background: cardBg,
							border: `1px solid ${borderColor}`,
							borderRadius: borderRadius.lg,
							textAlign: 'center',
						}}
					>
						<div style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: textColor }}>
							{stats.avgValue.toLocaleString()}
						</div>
						<div style={{ fontSize: typography.fontSize.sm, color: mutedTextColor, marginTop: spacing[1] }}>Avg Value</div>
					</div>
					<div
						style={{
							padding: spacing[4],
							background: cardBg,
							border: `1px solid ${borderColor}`,
							borderRadius: borderRadius.lg,
							textAlign: 'center',
						}}
					>
						<div style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: textColor }}>
							{Object.keys(stats.categoryCounts).length}
						</div>
						<div style={{ fontSize: typography.fontSize.sm, color: mutedTextColor, marginTop: spacing[1] }}>Categories</div>
					</div>
				</div>

				{/* Controls */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: spacing[4],
						marginBottom: spacing[6],
						flexWrap: 'wrap',
					}}
				>
					<button
						onClick={() => regenerateItems(100)}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: spacing[2],
							padding: `${spacing[3]} ${spacing[4]}`,
							background: itemCount === 100 ? colors.primary[500] : cardBg,
							color: itemCount === 100 ? colors.white : textColor,
							border: `1px solid ${itemCount === 100 ? colors.primary[500] : borderColor}`,
							borderRadius: borderRadius.lg,
							fontSize: typography.fontSize.sm,
							fontWeight: typography.fontWeight.semibold,
							cursor: 'pointer',
							transition: transitions.fast,
						}}
					>
						100 Items
					</button>
					<button
						onClick={() => regenerateItems(500)}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: spacing[2],
							padding: `${spacing[3]} ${spacing[4]}`,
							background: itemCount === 500 ? colors.primary[500] : cardBg,
							color: itemCount === 500 ? colors.white : textColor,
							border: `1px solid ${itemCount === 500 ? colors.primary[500] : borderColor}`,
							borderRadius: borderRadius.lg,
							fontSize: typography.fontSize.sm,
							fontWeight: typography.fontWeight.semibold,
							cursor: 'pointer',
							transition: transitions.fast,
						}}
					>
						500 Items
					</button>
					<button
						onClick={() => regenerateItems(1000)}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: spacing[2],
							padding: `${spacing[3]} ${spacing[4]}`,
							background: itemCount === 1000 ? colors.primary[500] : cardBg,
							color: itemCount === 1000 ? colors.white : textColor,
							border: `1px solid ${itemCount === 1000 ? colors.primary[500] : borderColor}`,
							borderRadius: borderRadius.lg,
							fontSize: typography.fontSize.sm,
							fontWeight: typography.fontWeight.semibold,
							cursor: 'pointer',
							transition: transitions.fast,
						}}
					>
						<Zap size={16} />
						1,000 Items
					</button>
					<button
						onClick={() => regenerateItems(2500)}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: spacing[2],
							padding: `${spacing[3]} ${spacing[4]}`,
							background: itemCount === 2500 ? colors.primary[500] : cardBg,
							color: itemCount === 2500 ? colors.white : textColor,
							border: `1px solid ${itemCount === 2500 ? colors.primary[500] : borderColor}`,
							borderRadius: borderRadius.lg,
							fontSize: typography.fontSize.sm,
							fontWeight: typography.fontWeight.semibold,
							cursor: 'pointer',
							transition: transitions.fast,
						}}
					>
						2,500 Items
					</button>

					<div style={{ flex: 1 }} />

					<button
						onClick={() => regenerateItems(itemCount)}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: spacing[2],
							padding: `${spacing[3]} ${spacing[4]}`,
							background: cardBg,
							color: textColor,
							border: `1px solid ${borderColor}`,
							borderRadius: borderRadius.lg,
							fontSize: typography.fontSize.sm,
							fontWeight: typography.fontWeight.semibold,
							cursor: 'pointer',
							transition: transitions.fast,
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = cardBg;
						}}
					>
						<RefreshCw size={16} />
						Regenerate
					</button>
				</div>

				{/* Performance Tip */}
				<div
					style={{
						padding: spacing[4],
						background: colors.info.bg,
						border: `2px solid ${colors.info.main}`,
						borderRadius: borderRadius.lg,
						marginBottom: spacing[6],
					}}
				>
					<h3
						style={{
							margin: 0,
							marginBottom: spacing[2],
							fontSize: typography.fontSize.base,
							fontWeight: typography.fontWeight.bold,
							color: colors.info.dark,
							display: 'flex',
							alignItems: 'center',
							gap: spacing[2],
						}}
					>
						<Zap size={18} />
						Performance Tip
					</h3>
					<p
						style={{
							margin: 0,
							fontSize: typography.fontSize.sm,
							color: colors.info.dark,
							lineHeight: typography.lineHeight.relaxed,
						}}
					>
						The list renders smoothly even with thousands of items. Watch the Performance Monitor in the bottom-right corner to see real-time FPS and drag metrics. Try dragging items to see how the library maintains 60 FPS!
					</p>
				</div>

				{/* List Container */}
				<div
					style={{
						marginBottom: spacing[8],
						padding: spacing[6],
						background: cardBg,
						border: `2px solid ${borderColor}`,
						borderRadius: borderRadius.xl,
						boxShadow: shadows.xl,
					}}
				>
					<h2
						style={{
							margin: `0 0 ${spacing[4]} 0`,
							fontSize: typography.fontSize['2xl'],
							fontWeight: typography.fontWeight.bold,
							color: textColor,
						}}
					>
						Drag & Drop List ({items.length.toLocaleString()} items)
					</h2>

					<div
						style={{
							maxHeight: '600px',
							overflowY: 'auto',
							padding: spacing[2],
						}}
					>
						<DragDropList
							items={items}
							onReorder={handleReorder}
							renderItem={renderItem}
							showDropIndicator
							gap={8}
						/>
					</div>
				</div>

				{/* Code Example */}
				<div>
					<h2
						style={{
							margin: `0 0 ${spacing[4]} 0`,
							fontSize: typography.fontSize['2xl'],
							fontWeight: typography.fontWeight.bold,
							color: textColor,
						}}
					>
						📝 Code Example
					</h2>
					<CodeViewer code={exampleCode} language="tsx" filename="VirtualScrolling.tsx" theme={mode} />
				</div>
			</div>

			{/* Performance Monitor */}
			<PerformanceMonitor />
		</div>
	);
}
