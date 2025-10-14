import { useState } from 'react';
import { DragDropList, type OrderUpdate } from 'react-dragdrop-kit';
import { CheckCircle2, Circle, Plus, Trash2, Calendar } from 'lucide-react';
import { colors, borderRadius, transitions, typography, spacing } from '@/constants/designSystem';
import { useThemeMode } from '@/contexts/ThemeContext';
import toast from 'react-hot-toast';
import { useDebouncedToast } from '@/hooks/useDebouncedToast';
import CodeViewer from '@/components/CodeViewer';

interface TodoItem {
	id: string;
	position: number;
	text: string;
	completed: boolean;
	priority: 'low' | 'medium' | 'high';
	dueDate?: string;
	createdAt: Date;
}

const initialTodos: TodoItem[] = [
	{
		id: '1',
		position: 0,
		text: 'Design landing page mockups',
		completed: false,
		priority: 'high',
		dueDate: '2025-10-15',
		createdAt: new Date('2025-10-10'),
	},
	{
		id: '2',
		position: 1,
		text: 'Implement user authentication',
		completed: false,
		priority: 'high',
		createdAt: new Date('2025-10-11'),
	},
	{
		id: '3',
		position: 2,
		text: 'Write unit tests for API endpoints',
		completed: true,
		priority: 'medium',
		createdAt: new Date('2025-10-09'),
	},
	{
		id: '4',
		position: 3,
		text: 'Update project documentation',
		completed: false,
		priority: 'low',
		dueDate: '2025-10-20',
		createdAt: new Date('2025-10-12'),
	},
	{
		id: '5',
		position: 4,
		text: 'Review pull requests',
		completed: false,
		priority: 'medium',
		createdAt: new Date('2025-10-12'),
	},
];

export default function TodoListExample() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
	const [newTodoText, setNewTodoText] = useState('');
	const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
	const [sortBy, setSortBy] = useState<'position' | 'priority' | 'dueDate'>('position');

	const bgColor = isDark ? colors.gray[900] : colors.gray[50];
	const cardBg = isDark ? colors.gray[800] : colors.white;
	const textColor = isDark ? colors.gray[100] : colors.gray[900];
	const mutedTextColor = isDark ? colors.gray[400] : colors.gray[600];
	const borderColor = isDark ? colors.gray[700] : colors.gray[200];

	const priorityColors = {
		low: { bg: colors.info.bg, text: colors.info.dark },
		medium: { bg: colors.warning.bg, text: colors.warning.dark },
		high: { bg: colors.error.bg, text: colors.error.dark },
	};

	const { showToast } = useDebouncedToast();

const handleReorder = (reordered: TodoItem[], _updates: OrderUpdate[]) => {
		setTodos(reordered);
		showToast('Todo reordered!');
	};

	const addTodo = () => {
		if (!newTodoText.trim()) {
			toast.error('Please enter a todo text');
			return;
		}

		const newTodo: TodoItem = {
			id: Date.now().toString(),
			position: todos.length,
			text: newTodoText.trim(),
			completed: false,
			priority: 'medium',
			createdAt: new Date(),
		};

		setTodos([...todos, newTodo]);
		setNewTodoText('');
		toast.success('Todo added!');
	};

	const toggleComplete = (id: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const deleteTodo = (id: string) => {
		setTodos(todos.filter((todo) => todo.id !== id));
		toast.success('Todo deleted!');
	};

	const updatePriority = (id: string, priority: TodoItem['priority']) => {
		setTodos(
			todos.map((todo) => (todo.id === id ? { ...todo, priority } : todo))
		);
	};

	// Filter and sort todos
	let displayTodos = [...todos];

	// Apply filter
	if (filterStatus === 'active') {
		displayTodos = displayTodos.filter((todo) => !todo.completed);
	} else if (filterStatus === 'completed') {
		displayTodos = displayTodos.filter((todo) => todo.completed);
	}

	// Apply sort
	if (sortBy === 'priority') {
		const priorityOrder = { high: 0, medium: 1, low: 2 };
		displayTodos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
	} else if (sortBy === 'dueDate') {
		displayTodos.sort((a, b) => {
			if (!a.dueDate) return 1;
			if (!b.dueDate) return -1;
			return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
		});
	}

	const renderTodoItem = (todo: TodoItem) => {
		const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: spacing[3],
					padding: spacing[4],
					background: todo.completed
						? isDark
							? colors.gray[700]
							: colors.gray[100]
						: cardBg,
					border: `2px solid ${borderColor}`,
					borderRadius: borderRadius.lg,
					transition: transitions.default,
					opacity: todo.completed ? 0.7 : 1,
				}}
			>
				{/* Checkbox */}
				<button
					onClick={() => toggleComplete(todo.id)}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: 'transparent',
						border: 'none',
						cursor: 'pointer',
						color: todo.completed ? colors.success.main : mutedTextColor,
						transition: transitions.fast,
					}}
					title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
				>
					{todo.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
				</button>

				{/* Content */}
				<div style={{ flex: 1, minWidth: 0 }}>
					<p
						style={{
							margin: 0,
							fontSize: typography.fontSize.base,
							color: textColor,
							textDecoration: todo.completed ? 'line-through' : 'none',
							marginBottom: spacing[2],
						}}
					>
						{todo.text}
					</p>

					<div style={{ display: 'flex', alignItems: 'center', gap: spacing[3], flexWrap: 'wrap' }}>
						{/* Priority Badge */}
						<select
							value={todo.priority}
							onChange={(e) => updatePriority(todo.id, e.target.value as TodoItem['priority'])}
							style={{
								padding: '4px 8px',
								background: priorityColors[todo.priority].bg,
								color: priorityColors[todo.priority].text,
								border: 'none',
								borderRadius: borderRadius.base,
								fontSize: typography.fontSize.xs,
								fontWeight: typography.fontWeight.semibold,
								cursor: 'pointer',
								textTransform: 'capitalize',
							}}
						>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>

						{/* Due Date */}
						{todo.dueDate && (
							<span
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '4px',
									fontSize: typography.fontSize.xs,
									color: isOverdue ? colors.error.main : mutedTextColor,
									fontWeight: isOverdue ? typography.fontWeight.semibold : typography.fontWeight.normal,
								}}
							>
								<Calendar size={12} />
								{new Date(todo.dueDate).toLocaleDateString()}
								{isOverdue && ' (Overdue)'}
							</span>
						)}
					</div>
				</div>

				{/* Delete Button */}
				<button
					onClick={() => deleteTodo(todo.id)}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: spacing[2],
						background: 'transparent',
						border: 'none',
						borderRadius: borderRadius.base,
						cursor: 'pointer',
						color: colors.error.main,
						transition: transitions.fast,
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.background = colors.error.bg;
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.background = 'transparent';
					}}
					title="Delete todo"
				>
					<Trash2 size={18} />
				</button>
			</div>
		);
	};

	const stats = {
		total: todos.length,
		completed: todos.filter((t) => t.completed).length,
		active: todos.filter((t) => !t.completed).length,
	};

	const exampleCode = `import { useState } from 'react';
import { DragDropList } from 'react-dragdrop-kit';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: '1', position: 0, text: 'Design landing page', completed: false, priority: 'high' },
    { id: '2', position: 1, text: 'Implement auth', completed: false, priority: 'high' },
    { id: '3', position: 2, text: 'Write tests', completed: true, priority: 'medium' },
  ]);

  const handleReorder = (reordered) => {
    setTodos(reordered);
  };

  return (
    <DragDropList
      items={todos}
      onReorder={handleReorder}
      renderItem={(todo) => (
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          <span>{todo.text}</span>
          <span>Priority: {todo.priority}</span>
        </div>
      )}
      showDropIndicator
      gap={12}
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
						✅ Todo List with Priorities
					</h1>
					<p
						style={{
							margin: 0,
							fontSize: typography.fontSize.lg,
							color: mutedTextColor,
							lineHeight: typography.lineHeight.relaxed,
						}}
					>
						A fully-featured todo list with drag-and-drop reordering, priority levels, due dates, and completion tracking.
					</p>
				</div>

				<div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: spacing[8] }}>
					{/* Todo List */}
					<div>
						{/* Stats */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
								gap: spacing[4],
								marginBottom: spacing[6],
							}}
						>
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
									{stats.total}
								</div>
								<div style={{ fontSize: typography.fontSize.sm, color: mutedTextColor, marginTop: spacing[1] }}>Total</div>
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
								<div style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: colors.warning.main }}>
									{stats.active}
								</div>
								<div style={{ fontSize: typography.fontSize.sm, color: mutedTextColor, marginTop: spacing[1] }}>Active</div>
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
								<div style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: colors.success.main }}>
									{stats.completed}
								</div>
								<div style={{ fontSize: typography.fontSize.sm, color: mutedTextColor, marginTop: spacing[1] }}>Completed</div>
							</div>
						</div>

						{/* Add Todo */}
						<div
							style={{
								display: 'flex',
								gap: spacing[3],
								marginBottom: spacing[6],
							}}
						>
							<input
								type="text"
								value={newTodoText}
								onChange={(e) => setNewTodoText(e.target.value)}
								onKeyPress={(e) => e.key === 'Enter' && addTodo()}
								placeholder="Add a new todo..."
								style={{
									flex: 1,
									padding: spacing[3],
									background: cardBg,
									border: `2px solid ${borderColor}`,
									borderRadius: borderRadius.lg,
									fontSize: typography.fontSize.base,
									color: textColor,
									outline: 'none',
								}}
							/>
							<button
								onClick={addTodo}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: spacing[2],
									padding: `${spacing[3]} ${spacing[5]}`,
									background: colors.primary[500],
									color: colors.white,
									border: 'none',
									borderRadius: borderRadius.lg,
									fontSize: typography.fontSize.base,
									fontWeight: typography.fontWeight.semibold,
									cursor: 'pointer',
									transition: transitions.fast,
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = colors.primary[600];
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = colors.primary[500];
								}}
							>
								<Plus size={20} />
								Add
							</button>
						</div>

						{/* Filters and Sort */}
						<div
							style={{
								display: 'flex',
								gap: spacing[4],
								marginBottom: spacing[6],
								flexWrap: 'wrap',
							}}
						>
							{/* Filter Status */}
							<div style={{ display: 'flex', gap: spacing[2] }}>
								{(['all', 'active', 'completed'] as const).map((filter) => (
									<button
										key={filter}
										onClick={() => setFilterStatus(filter)}
										style={{
											padding: `${spacing[2]} ${spacing[4]}`,
											background: filterStatus === filter ? colors.primary[500] : cardBg,
											color: filterStatus === filter ? colors.white : textColor,
											border: `1px solid ${filterStatus === filter ? colors.primary[500] : borderColor}`,
											borderRadius: borderRadius.base,
											fontSize: typography.fontSize.sm,
											fontWeight: typography.fontWeight.medium,
											cursor: 'pointer',
											textTransform: 'capitalize',
											transition: transitions.fast,
										}}
									>
										{filter}
									</button>
								))}
							</div>

							{/* Sort By */}
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
								style={{
									padding: `${spacing[2]} ${spacing[4]}`,
									background: cardBg,
									border: `1px solid ${borderColor}`,
									borderRadius: borderRadius.base,
									fontSize: typography.fontSize.sm,
									color: textColor,
									cursor: 'pointer',
								}}
							>
								<option value="position">Sort by: Position</option>
								<option value="priority">Sort by: Priority</option>
								<option value="dueDate">Sort by: Due Date</option>
							</select>
						</div>

						{/* Todos List */}
						{displayTodos.length === 0 ? (
							<div
								style={{
									padding: spacing[12],
									textAlign: 'center',
									color: mutedTextColor,
								}}
							>
								<p style={{ fontSize: typography.fontSize.xl, margin: 0 }}>No todos found</p>
								<p style={{ fontSize: typography.fontSize.sm, margin: `${spacing[2]} 0 0 0` }}>
									{filterStatus !== 'all' ? 'Try changing the filter' : 'Add your first todo above'}
								</p>
							</div>
						) : (
							<DragDropList
								items={displayTodos}
								onReorder={handleReorder}
								renderItem={renderTodoItem}
								showDropIndicator
								gap={12}
								disabled={sortBy !== 'position'}
							/>
						)}

						{sortBy !== 'position' && displayTodos.length > 0 && (
							<p
								style={{
									marginTop: spacing[4],
									padding: spacing[3],
									background: colors.warning.bg,
									color: colors.warning.dark,
									borderRadius: borderRadius.base,
									fontSize: typography.fontSize.sm,
									textAlign: 'center',
								}}
							>
								⚠️ Drag-and-drop is disabled when sorting. Switch to "Sort by: Position" to reorder todos.
							</p>
						)}
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
						<CodeViewer
							code={exampleCode}
							language="tsx"
							filename="TodoApp.tsx"
							theme={mode}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
