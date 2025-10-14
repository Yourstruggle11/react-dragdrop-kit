import { useState } from 'react';
import { DragDropList } from 'react-dragdrop-kit';
import type { OrderUpdate } from 'react-dragdrop-kit';
import { useThemeMode } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius, shadows, typography } from '@/constants/designSystem';
import toast from 'react-hot-toast';
import { useDebouncedToast } from '@/hooks/useDebouncedToast';
import { GripVertical, Edit2, Trash2, Eye, EyeOff, Star, MoreVertical } from 'lucide-react';

interface Task {
	id: string;
	position: number;
	title: string;
	description: string;
	priority: 'low' | 'medium' | 'high';
	isVisible: boolean;
	isFavorite: boolean;
}

const initialTasks: Task[] = [
	{
		id: '1',
		position: 0,
		title: 'Design System Setup',
		description: 'Create a comprehensive design system with tokens and components',
		priority: 'high',
		isVisible: true,
		isFavorite: true,
	},
	{
		id: '2',
		position: 1,
		title: 'API Integration',
		description: 'Integrate REST API endpoints for data fetching',
		priority: 'high',
		isVisible: true,
		isFavorite: false,
	},
	{
		id: '3',
		position: 2,
		title: 'User Authentication',
		description: 'Implement JWT-based authentication system',
		priority: 'medium',
		isVisible: true,
		isFavorite: true,
	},
	{
		id: '4',
		position: 3,
		title: 'Dashboard Analytics',
		description: 'Build analytics dashboard with charts and metrics',
		priority: 'medium',
		isVisible: true,
		isFavorite: false,
	},
	{
		id: '5',
		position: 4,
		title: 'Documentation',
		description: 'Write comprehensive documentation for the project',
		priority: 'low',
		isVisible: true,
		isFavorite: false,
	},
	{
		id: '6',
		position: 5,
		title: 'Performance Optimization',
		description: 'Optimize bundle size and runtime performance',
		priority: 'medium',
		isVisible: true,
		isFavorite: true,
	},
];

export default function DragHandleExample() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [tasks, setTasks] = useState<Task[]>(initialTasks);
	const [editingId, setEditingId] = useState<string | null>(null);

	const { showToast } = useDebouncedToast();

const handleReorder = (reordered: Task[], _updates: OrderUpdate[]) => {
		setTasks(reordered);
		showToast('Tasks reordered!');
	};

	const toggleVisibility = (id: string) => {
		setTasks(
			tasks.map((task) => (task.id === id ? { ...task, isVisible: !task.isVisible } : task))
		);
		const task = tasks.find((t) => t.id === id);
		toast.success(`Task ${task?.isVisible ? 'hidden' : 'shown'}!`);
	};

	const toggleFavorite = (id: string) => {
		setTasks(
			tasks.map((task) => (task.id === id ? { ...task, isFavorite: !task.isFavorite } : task))
		);
	};

	const deleteTask = (id: string) => {
		setTasks(tasks.filter((task) => task.id !== id));
		toast.success('Task deleted!');
	};

	const getPriorityColor = (priority: Task['priority']) => {
		switch (priority) {
			case 'high':
				return colors.error[500];
			case 'medium':
				return colors.warning[500];
			case 'low':
				return colors.success[500];
		}
	};

	const renderTask = (task: Task) => {
		const isEditing = editingId === task.id;
		const priorityColor = getPriorityColor(task.priority);

		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: spacing.md,
					padding: spacing.lg,
					background: isDark ? colors.gray[800] : colors.white,
					borderRadius: borderRadius.lg,
					boxShadow: shadows.sm,
					opacity: task.isVisible ? 1 : 0.5,
					transition: 'all 0.2s ease',
				}}
			>
				{/* Drag Handle - This is the only draggable area */}
				<div
					data-drag-handle
					style={{
						padding: spacing.sm,
						cursor: 'grab',
						color: isDark ? colors.gray[400] : colors.gray[500],
						borderRadius: borderRadius.md,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transition: 'all 0.2s ease',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
						e.currentTarget.style.color = isDark ? colors.white : colors.gray[900];
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.background = 'transparent';
						e.currentTarget.style.color = isDark ? colors.gray[400] : colors.gray[500];
					}}
				>
					<GripVertical size={20} />
				</div>

				{/* Priority Indicator */}
				<div
					style={{
						width: '4px',
						height: '48px',
						borderRadius: borderRadius.full,
						background: priorityColor,
						flexShrink: 0,
					}}
				/>

				{/* Task Content */}
				<div style={{ flex: 1, minWidth: 0 }}>
					{isEditing ? (
						<div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
							<input
								type="text"
								defaultValue={task.title}
								onBlur={(e) => {
									setTasks(
										tasks.map((t) => (t.id === task.id ? { ...t, title: e.target.value } : t))
									);
									setEditingId(null);
								}}
								autoFocus
								style={{
									padding: spacing.sm,
									background: isDark ? colors.gray[700] : colors.gray[50],
									border: `2px solid ${colors.primary[500]}`,
									borderRadius: borderRadius.md,
									fontSize: typography.fontSize.base,
									fontWeight: typography.fontWeight.semibold,
									color: isDark ? colors.white : colors.gray[900],
									outline: 'none',
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.currentTarget.blur();
									}
								}}
							/>
						</div>
					) : (
						<>
							<div
								style={{
									fontSize: typography.fontSize.base,
									fontWeight: typography.fontWeight.semibold,
									color: isDark ? colors.white : colors.gray[900],
									marginBottom: spacing.xs,
								}}
							>
								{task.title}
							</div>
							<div
								style={{
									fontSize: typography.fontSize.sm,
									color: isDark ? colors.gray[400] : colors.gray[600],
									marginBottom: spacing.sm,
								}}
							>
								{task.description}
							</div>
							<div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
								<span
									style={{
										fontSize: typography.fontSize.xs,
										padding: `${spacing.xs} ${spacing.sm}`,
										background: `${priorityColor}20`,
										borderRadius: borderRadius.full,
										color: priorityColor,
										fontWeight: typography.fontWeight.medium,
										textTransform: 'uppercase',
									}}
								>
									{task.priority}
								</span>
							</div>
						</>
					)}
				</div>

				{/* Action Buttons - These are clickable without triggering drag */}
				<div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
					<button
						onClick={() => toggleFavorite(task.id)}
						style={{
							padding: spacing.sm,
							background: task.isFavorite
								? `${colors.warning[500]}20`
								: isDark
									? colors.gray[700]
									: colors.gray[100],
							border: 'none',
							borderRadius: borderRadius.md,
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: task.isFavorite ? colors.warning[500] : isDark ? colors.gray[400] : colors.gray[600],
							transition: 'all 0.2s ease',
						}}
						onMouseEnter={(e) => {
							if (!task.isFavorite) {
								e.currentTarget.style.background = isDark ? colors.gray[600] : colors.gray[200];
							}
						}}
						onMouseLeave={(e) => {
							if (!task.isFavorite) {
								e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
							}
						}}
					>
						<Star size={16} fill={task.isFavorite ? colors.warning[500] : 'none'} />
					</button>

					<button
						onClick={() => setEditingId(task.id)}
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
						<Edit2 size={16} />
					</button>

					<button
						onClick={() => toggleVisibility(task.id)}
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
						{task.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
					</button>

					<button
						onClick={() => deleteTask(task.id)}
						style={{
							padding: spacing.sm,
							background: isDark ? colors.gray[700] : colors.gray[100],
							border: 'none',
							borderRadius: borderRadius.md,
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: colors.error[500],
							transition: 'all 0.2s ease',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = `${colors.error[500]}20`;
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
						}}
					>
						<Trash2 size={16} />
					</button>

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
						<MoreVertical size={16} />
					</button>
				</div>
			</div>
		);
	};

	const visibleTasks = tasks.filter((t) => t.isVisible);
	const hiddenTasks = tasks.filter((t) => !t.isVisible);
	const favoriteTasks = tasks.filter((t) => t.isFavorite);

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
					Drag Handle Pattern
				</h2>
				<p
					style={{
						margin: 0,
						fontSize: typography.fontSize.base,
						color: isDark ? colors.gray[400] : colors.gray[600],
						marginBottom: spacing.sm,
					}}
				>
					This example demonstrates interactive elements within draggable items
				</p>
				<div
					style={{
						padding: spacing.md,
						background: isDark ? `${colors.warning[500]}10` : `${colors.warning[500]}10`,
						border: `2px solid ${colors.warning[500]}`,
						borderRadius: borderRadius.md,
						fontSize: typography.fontSize.sm,
						color: isDark ? colors.warning[300] : colors.warning[700],
					}}
				>
					<strong>Note:</strong> The current version of react-dragdrop-kit doesn't support drag handles yet.
					This example shows how interactive buttons work within draggable items. The entire item is draggable,
					but clicking buttons (star, edit, eye, delete) triggers their respective actions instead of dragging.
				</div>
			</div>

			{/* Info Box */}
			<div
				style={{
					marginBottom: spacing.xl,
					padding: spacing.lg,
					background: isDark ? `${colors.primary[500]}10` : `${colors.primary[500]}10`,
					border: `2px solid ${colors.primary[500]}`,
					borderRadius: borderRadius.lg,
				}}
			>
				<h3
					style={{
						margin: 0,
						marginBottom: spacing.md,
						fontSize: typography.fontSize.lg,
						fontWeight: typography.fontWeight.semibold,
						color: colors.primary[500],
					}}
				>
					How Drag Handles Work
				</h3>
				<div
					style={{
						color: isDark ? colors.gray[300] : colors.gray[700],
						fontSize: typography.fontSize.sm,
						lineHeight: 1.6,
					}}
				>
					<p style={{ margin: 0, marginBottom: spacing.sm }}>
						The drag handle pattern allows you to have interactive elements (buttons, inputs, links) within
						draggable items without triggering drag operations.
					</p>
					<p style={{ margin: 0, marginBottom: spacing.sm }}>
						<strong>Try it:</strong>
					</p>
					<ul style={{ margin: 0, paddingLeft: spacing.xl }}>
						<li>
							Click and drag from the <GripVertical size={14} style={{ display: 'inline' }} /> handle to
							reorder tasks
						</li>
						<li>Click the star to favorite/unfavorite (doesn't trigger drag)</li>
						<li>Click the edit button to rename tasks (doesn't trigger drag)</li>
						<li>Click the eye icon to hide/show tasks (doesn't trigger drag)</li>
						<li>Click the trash icon to delete tasks (doesn't trigger drag)</li>
					</ul>
				</div>
			</div>

			{/* Task List */}
			<DragDropList
				items={tasks}
				onReorder={handleReorder}
				renderItem={renderTask}
				containerStyle={{
					display: 'flex',
					flexDirection: 'column',
					gap: spacing.md,
				}}
			/>

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
					Task Statistics
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
							Total Tasks
						</div>
						<div
							style={{
								fontSize: typography.fontSize.xl,
								fontWeight: typography.fontWeight.bold,
								color: isDark ? colors.white : colors.gray[900],
							}}
						>
							{tasks.length}
						</div>
					</div>
					<div>
						<div
							style={{
								fontSize: typography.fontSize.sm,
								color: isDark ? colors.gray[400] : colors.gray[600],
							}}
						>
							Visible
						</div>
						<div
							style={{
								fontSize: typography.fontSize.xl,
								fontWeight: typography.fontWeight.bold,
								color: colors.success[500],
							}}
						>
							{visibleTasks.length}
						</div>
					</div>
					<div>
						<div
							style={{
								fontSize: typography.fontSize.sm,
								color: isDark ? colors.gray[400] : colors.gray[600],
							}}
						>
							Hidden
						</div>
						<div
							style={{
								fontSize: typography.fontSize.xl,
								fontWeight: typography.fontWeight.bold,
								color: colors.error[500],
							}}
						>
							{hiddenTasks.length}
						</div>
					</div>
					<div>
						<div
							style={{
								fontSize: typography.fontSize.sm,
								color: isDark ? colors.gray[400] : colors.gray[600],
							}}
						>
							Favorites
						</div>
						<div
							style={{
								fontSize: typography.fontSize.xl,
								fontWeight: typography.fontWeight.bold,
								color: colors.warning[500],
							}}
						>
							{favoriteTasks.length}
						</div>
					</div>
				</div>
			</div>

			{/* Code Example */}
			<div
				style={{
					marginTop: spacing.xl,
					padding: spacing.lg,
					background: isDark ? colors.gray[800] : colors.gray[50],
					borderRadius: borderRadius.lg,
					border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
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
					Implementation
				</h3>
				<pre
					style={{
						margin: 0,
						padding: spacing.md,
						background: isDark ? colors.gray[900] : colors.white,
						borderRadius: borderRadius.md,
						fontSize: typography.fontSize.sm,
						color: isDark ? colors.gray[300] : colors.gray[700],
						overflow: 'auto',
						fontFamily: typography.fontFamily.mono,
					}}
				>
					{`<DragDropList
  items={tasks}
  onReorder={handleReorder}
  renderItem={renderTask}
  dragHandle="[data-drag-handle]"
/>

// In renderTask:
<div data-drag-handle>
  <GripVertical /> {/* Only this triggers drag */}
</div>
<button onClick={...}> {/* This doesn't trigger drag */}
  ...
</button>`}
				</pre>
			</div>
			</div>
		</div>
	);
}
