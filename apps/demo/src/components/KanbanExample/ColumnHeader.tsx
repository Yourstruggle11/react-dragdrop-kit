import type { KanbanColumn, DragSnapshot } from 'react-dragdrop-kit/kanban';
import { columnThemes } from './constants';
import type { Theme } from './types';

interface ColumnHeaderProps {
	column: KanbanColumn;
	snapshot: DragSnapshot;
	theme: Theme;
	showEmojis: boolean;
	compactMode: boolean;
}

export function ColumnHeader({
	column,
	snapshot,
	theme,
	showEmojis,
	compactMode
}: ColumnHeaderProps) {
	const columnTheme = columnThemes[column.id as keyof typeof columnThemes] || {
		emoji: '📁',
		bg: '#f3f4f6',
		border: '#e5e7eb',
		headerBg: '#f9fafb',
		gradient: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)'
	};
	const cardCount = column.cardIds.length;

	return (
		<div
			style={{
				padding: compactMode ? '10px 12px' : '14px 16px',
				background: snapshot.isDragging
					? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))'
					: theme === 'colorful' ? columnTheme.gradient : columnTheme.headerBg,
				borderRadius: '12px 12px 0 0',
				fontWeight: 700,
				fontSize: compactMode ? '14px' : '15px',
				color: theme === 'dark' ? '#fff' : '#1f2937',
				cursor: snapshot.isDragging ? 'grabbing' : 'grab',
				userSelect: 'none',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				borderBottom: `2px solid ${columnTheme.border}`,
				transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
				boxShadow: snapshot.isDragging ? '0 4px 12px rgba(102, 126, 234, 0.15)' : 'none'
			}}
		>
			<span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
				{showEmojis && <span>{columnTheme.emoji}</span>}
				<span>{column.title}</span>
			</span>
			<span
				style={{
					background: 'rgba(102, 126, 234, 0.1)',
					color: '#667eea',
					padding: '2px 8px',
					borderRadius: '10px',
					fontSize: '12px',
					fontWeight: 600
				}}
			>
				{cardCount}
			</span>
		</div>
	);
}
