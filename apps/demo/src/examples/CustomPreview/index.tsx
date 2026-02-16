import { useState } from 'react';
import { DragDropList } from 'react-dragdrop-kit';
import { colors, spacing, borderRadius, shadows, typography } from '@/constants/designSystem';
import { useThemeMode } from '@/contexts/useThemeMode';
import { useDebouncedToast } from '@/hooks/useDebouncedToast';

interface PreviewItem {
	id: string;
	position: number;
	title: string;
	description: string;
}

const initialItems: PreviewItem[] = [
	{ id: 'card-1', position: 0, title: 'Sprint Planning', description: 'Organize upcoming tasks' },
	{ id: 'card-2', position: 1, title: 'Design Review', description: 'Review handoff with product team' },
	{ id: 'card-3', position: 2, title: 'API Integration', description: 'Connect frontend to new endpoints' },
	{ id: 'card-4', position: 3, title: 'Release Checklist', description: 'Validate release readiness' },
];

export default function CustomPreviewExample() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [items, setItems] = useState<PreviewItem[]>(initialItems);
	const { showToast } = useDebouncedToast();

	const handleReorder = (reordered: PreviewItem[]) => {
		setItems(reordered.map((item, index) => ({ ...item, position: index })));
		showToast('Custom drag preview applied');
	};

	return (
		<div style={{ padding: spacing.xl }}>
			<div style={{ maxWidth: '900px', margin: '0 auto' }}>
				<h2
					style={{
						margin: 0,
						marginBottom: spacing.sm,
						fontSize: typography.fontSize['2xl'],
						fontWeight: typography.fontWeight.bold,
						color: isDark ? colors.white : colors.gray[900],
					}}
				>
					Custom Drag Preview
				</h2>
				<p
					style={{
						margin: `0 0 ${spacing.lg} 0`,
						color: isDark ? colors.gray[400] : colors.gray[600],
						fontSize: typography.fontSize.base,
					}}
				>
					Drag any card to see a larger, stylized preview with shadow and slight rotation.
				</p>

				<DragDropList
					items={items}
					onReorder={handleReorder}
					renderItem={(item) => (
						<div
							style={{
								padding: spacing.lg,
								background: isDark ? colors.gray[800] : colors.white,
								borderRadius: borderRadius.lg,
								boxShadow: shadows.sm,
								border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
							}}
						>
							<div
								style={{
									fontSize: typography.fontSize.base,
									fontWeight: typography.fontWeight.semibold,
									color: isDark ? colors.white : colors.gray[900],
									marginBottom: spacing.xs,
								}}
							>
								{item.title}
							</div>
							<div
								style={{
									fontSize: typography.fontSize.sm,
									color: isDark ? colors.gray[400] : colors.gray[600],
								}}
							>
								{item.description}
							</div>
						</div>
					)}
					gap={12}
					dragPreviewStyle={{
						background: isDark ? colors.gray[900] : colors.white,
						border: `2px solid ${colors.primary[500]}`,
						borderRadius: '14px',
						boxShadow: '0 16px 36px rgba(0,0,0,0.24)',
						opacity: 0.95,
						transform: 'rotate(1.5deg) scale(1.02)',
					}}
				/>
			</div>
		</div>
	);
}
