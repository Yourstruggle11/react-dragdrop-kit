import type { DragProvided, DragSnapshot } from 'react-dragdrop-kit/kanban';
import { priorityColors } from './constants';
import type { TaskCard as TaskCardType, Theme, CardAnimation } from './types';

interface TaskCardProps {
	card: TaskCardType;
	provided: DragProvided;
	snapshot: DragSnapshot;
	theme: Theme;
	compactMode: boolean;
	showTags: boolean;
	showAvatars: boolean;
	showPriority: boolean;
	showDueDate: boolean;
	cardAnimation: CardAnimation;
	windowWidth?: number;
}

const getCardAnimationStyle = (isDragging: boolean, animation: CardAnimation) => {
	if (!isDragging) return {};

	switch (animation) {
		case 'rotate':
			return { transform: 'rotate(3deg)' };
		case 'scale':
			return { transform: 'scale(1.05)' };
		case 'lift':
			return { transform: 'translateY(-8px)' };
		default:
			return {};
	}
};

export function TaskCard({
	card,
	snapshot,
	theme,
	compactMode,
	showTags,
	showAvatars,
	showPriority,
	showDueDate,
	cardAnimation,
	windowWidth = window.innerWidth
}: TaskCardProps) {
	const priorityColor = card.priority
		? priorityColors[card.priority]
		: { bg: '#f3f4f6', text: '#6b7280', border: '#d1d5db' };

	const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();

	return (
		<div
			style={{
				padding: compactMode ? '8px' : windowWidth > 600 ? '14px' : '10px',
				background: theme === 'dark' ? '#2d3748' : '#ffffff',
				borderRadius: theme === 'minimal' ? '4px' : '8px',
				border: theme === 'minimal'
					? '1px solid #e5e7eb'
					: theme === 'colorful'
					? `2px solid ${priorityColor.border}`
					: '1.5px solid #e5e7eb',
				cursor: snapshot.isDragging ? 'grabbing' : 'grab',
				boxShadow: snapshot.isDragging
					? '0 20px 40px rgba(102, 126, 234, 0.2), 0 10px 20px rgba(0, 0, 0, 0.1)'
					: theme === 'modern'
					? '0 1px 3px rgba(0, 0, 0, 0.06)'
					: 'none',
				userSelect: 'none',
				transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
				opacity: snapshot.isDragging ? 0.9 : 1,
				...getCardAnimationStyle(snapshot.isDragging, cardAnimation)
			}}
		>
			<div
				style={{
					fontSize: compactMode ? '12px' : windowWidth > 600 ? '14px' : '13px',
					color: theme === 'dark' ? '#e2e8f0' : '#1f2937',
					fontWeight: 500,
					marginBottom: (showTags && card.tags?.length) || showPriority || showAvatars ? '10px' : '0',
					lineHeight: '1.5'
				}}
			>
				{card.title}
			</div>

			{/* Tags */}
			{showTags && card.tags && card.tags.length > 0 && (
				<div
					style={{
						display: 'flex',
						gap: '6px',
						flexWrap: 'wrap',
						marginBottom: '10px'
					}}
				>
					{card.tags.map((tag) => (
						<span
							key={tag}
							style={{
								fontSize: '11px',
								padding: '3px 8px',
								background: theme === 'dark' ? '#4a5568' : theme === 'colorful' ? priorityColor.bg : '#f3f4f6',
								color: theme === 'dark' ? '#cbd5e0' : theme === 'colorful' ? priorityColor.text : '#6b7280',
								borderRadius: '4px',
								fontWeight: 500
							}}
						>
							{tag}
						</span>
					))}
				</div>
			)}

			{/* Due Date */}
			{showDueDate && card.dueDate && (
				<div
					style={{
						fontSize: '11px',
						color: isOverdue ? '#dc2626' : theme === 'dark' ? '#a0aec0' : '#6b7280',
						marginBottom: '8px',
						display: 'flex',
						alignItems: 'center',
						gap: '4px',
						fontWeight: isOverdue ? 600 : 500
					}}
				>
					<span>📅</span>
					<span>{isOverdue ? '⚠️ ' : ''}{card.dueDate}</span>
				</div>
			)}

			{/* Footer */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: '8px'
				}}
			>
				{/* Assignee */}
				{showAvatars && card.assignee && (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '6px'
						}}
					>
						<div
							style={{
								width: compactMode ? '20px' : '24px',
								height: compactMode ? '20px' : '24px',
								borderRadius: '50%',
								background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
								color: 'white',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: compactMode ? '10px' : '11px',
								fontWeight: 700
							}}
						>
							{card.assignee[0]}
						</div>
						<span style={{ fontSize: '12px', color: theme === 'dark' ? '#cbd5e0' : '#6b7280', fontWeight: 500 }}>
							{card.assignee}
						</span>
					</div>
				)}

				{/* Priority */}
				{showPriority && card.priority && (
					<div
						style={{
							padding: '3px 8px',
							background: priorityColor.bg,
							color: priorityColor.text,
							borderRadius: '6px',
							fontSize: '11px',
							fontWeight: 600,
							border: `1px solid ${priorityColor.border}`,
							textTransform: 'capitalize'
						}}
					>
						{card.priority}
					</div>
				)}
			</div>
		</div>
	);
}
