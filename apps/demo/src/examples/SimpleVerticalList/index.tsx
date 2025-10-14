import { useState } from 'react';
import { DragDropList } from 'react-dragdrop-kit';
import type { OrderUpdate } from 'react-dragdrop-kit';
import { useThemeMode } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius, shadows, typography } from '@/constants/designSystem';
import { useDebouncedToast } from '@/hooks/useDebouncedToast';
import CodeViewer from '@/components/CodeViewer';

interface ListItem {
	id: string;
	position: number;
	text: string;
}

const initialItems: ListItem[] = [
	{ id: '1', position: 0, text: 'First Item' },
	{ id: '2', position: 1, text: 'Second Item' },
	{ id: '3', position: 2, text: 'Third Item' },
	{ id: '4', position: 3, text: 'Fourth Item' },
	{ id: '5', position: 4, text: 'Fifth Item' }
];

const codeExample = `import { DragDropList } from 'react-dragdrop-kit';
import type { OrderUpdate } from 'react-dragdrop-kit';

interface ListItem {
  id: string;
  position: number;
  text: string;
}

export default function SimpleVerticalList() {
  const [items, setItems] = useState<ListItem[]>([
    { id: '1', position: 0, text: 'First Item' },
    { id: '2', position: 1, text: 'Second Item' },
    { id: '3', position: 2, text: 'Third Item' },
  ]);

  const handleReorder = (
    reordered: ListItem[],
    updates: OrderUpdate[]
  ) => {
    setItems(reordered);
  };

  const renderItem = (item: ListItem) => (
    <div style={{ padding: '16px', background: '#fff' }}>
      {item.text}
    </div>
  );

  return (
    <DragDropList
      items={items}
      onReorder={handleReorder}
      renderItem={renderItem}
    />
  );
}`;

export default function SimpleVerticalListExample() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [items, setItems] = useState<ListItem[]>(initialItems);
	const [dragCount, setDragCount] = useState(0);

	const { showToast } = useDebouncedToast();

const handleReorder = (reordered: ListItem[], _updates: OrderUpdate[]) => {
		setItems(reordered);
		setDragCount(c => c + 1);
		showToast('List reordered!');
	};

	const renderItem = (item: ListItem) => {
		return (
			<div
				style={{
					padding: spacing.lg,
					background: isDark ? colors.gray[800] : colors.white,
					borderRadius: borderRadius.lg,
					boxShadow: shadows.sm,
					cursor: 'grab',
					transition: 'all 0.2s ease',
					fontSize: typography.fontSize.base,
					fontWeight: typography.fontWeight.medium,
					color: isDark ? colors.white : colors.gray[900]
				}}
			>
				{item.text}
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
							marginBottom: spacing.sm
						}}
					>
						Simple Vertical List
					</h2>
					<p
						style={{
							margin: 0,
							fontSize: typography.fontSize.base,
							color: isDark ? colors.gray[400] : colors.gray[600]
						}}
					>
						The most basic implementation of react-dragdrop-kit - a simple vertical list that can be reordered
					</p>
				</div>

				{/* Quick Stats */}
				<div
					style={{
						display: 'flex',
						gap: spacing.md,
						marginBottom: spacing.xl
					}}
				>
					<div
						style={{
							flex: 1,
							padding: spacing.lg,
							background: isDark ? colors.gray[800] : colors.white,
							borderRadius: borderRadius.lg,
							boxShadow: shadows.sm
						}}
					>
						<div
							style={{
								fontSize: typography.fontSize.sm,
								color: isDark ? colors.gray[400] : colors.gray[600],
								marginBottom: spacing.xs
							}}
						>
							Total Items
						</div>
						<div
							style={{
								fontSize: typography.fontSize['2xl'],
								fontWeight: typography.fontWeight.bold,
								color: isDark ? colors.white : colors.gray[900]
							}}
						>
							{items.length}
						</div>
					</div>
					<div
						style={{
							flex: 1,
							padding: spacing.lg,
							background: isDark ? colors.gray[800] : colors.white,
							borderRadius: borderRadius.lg,
							boxShadow: shadows.sm
						}}
					>
						<div
							style={{
								fontSize: typography.fontSize.sm,
								color: isDark ? colors.gray[400] : colors.gray[600],
								marginBottom: spacing.xs
							}}
						>
							Reorder Count
						</div>
						<div
							style={{
								fontSize: typography.fontSize['2xl'],
								fontWeight: typography.fontWeight.bold,
								color: colors.primary[500]
							}}
						>
							{dragCount}
						</div>
					</div>
				</div>

				{/* Live Example */}
				<div style={{ marginBottom: spacing.xl }}>
					<h3
						style={{
							margin: 0,
							marginBottom: spacing.md,
							fontSize: typography.fontSize.lg,
							fontWeight: typography.fontWeight.semibold,
							color: isDark ? colors.white : colors.gray[900]
						}}
					>
						Live Example
					</h3>
					<DragDropList
						items={items}
						onReorder={handleReorder}
						renderItem={renderItem}
						containerStyle={{
							display: 'flex',
							flexDirection: 'column',
							gap: spacing.md
						}}
					/>
				</div>

				{/* Code Example */}
				<div style={{ marginBottom: spacing.xl }}>
					<h3
						style={{
							margin: 0,
							marginBottom: spacing.md,
							fontSize: typography.fontSize.lg,
							fontWeight: typography.fontWeight.semibold,
							color: isDark ? colors.white : colors.gray[900]
						}}
					>
						Code Example
					</h3>
					<CodeViewer code={codeExample} language="tsx" theme={isDark ? 'dark' : 'light'} />
				</div>

				{/* Key Features */}
				<div
					style={{
						padding: spacing.lg,
						background: isDark ? `${colors.blue[500]}10` : `${colors.blue[500]}10`,
						border: `1px solid ${colors.blue[500]}`,
						borderRadius: borderRadius.lg
					}}
				>
					<h4
						style={{
							margin: 0,
							marginBottom: spacing.md,
							fontSize: typography.fontSize.base,
							fontWeight: typography.fontWeight.semibold,
							color: colors.blue[500]
						}}
					>
						Key Features
					</h4>
					<ul
						style={{
							margin: 0,
							paddingLeft: spacing.xl,
							color: isDark ? colors.gray[300] : colors.gray[700],
							fontSize: typography.fontSize.sm,
							lineHeight: 1.6
						}}
					>
						<li>
							<strong>Simple Setup:</strong> Just pass items, onReorder callback, and renderItem function
						</li>
						<li>
							<strong>Type Safety:</strong> Full TypeScript support with proper types for items and updates
						</li>
						<li>
							<strong>Automatic Position Management:</strong> The position property is automatically updated
						</li>
						<li>
							<strong>Visual Feedback:</strong> Built-in drag preview and drop indicators
						</li>
						<li>
							<strong>Accessible:</strong> Keyboard navigation and screen reader support included
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
