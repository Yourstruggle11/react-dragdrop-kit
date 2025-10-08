import type { KanbanBoardState } from 'react-dragdrop-kit/kanban';

export const priorityColors = {
	high: { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5' },
	medium: { bg: '#fef3c7', text: '#d97706', border: '#fcd34d' },
	low: { bg: '#dbeafe', text: '#2563eb', border: '#93c5fd' }
};

export const columnThemes = {
	todo: {
		emoji: '📋',
		bg: '#f0f9ff',
		border: '#bae6fd',
		headerBg: '#e0f2fe',
		gradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)'
	},
	'in-progress': {
		emoji: '🚀',
		bg: '#fef3c7',
		border: '#fde68a',
		headerBg: '#fef9c3',
		gradient: 'linear-gradient(135deg, #fef9c3 0%, #fde68a 100%)'
	},
	review: {
		emoji: '👀',
		bg: '#ede9fe',
		border: '#ddd6fe',
		headerBg: '#e9d5ff',
		gradient: 'linear-gradient(135deg, #e9d5ff 0%, #ddd6fe 100%)'
	},
	done: {
		emoji: '✅',
		bg: '#dcfce7',
		border: '#bbf7d0',
		headerBg: '#d1fae5',
		gradient: 'linear-gradient(135deg, #d1fae5 0%, #bbf7d0 100%)'
	}
};

export const initialState: KanbanBoardState = {
	columns: [
		{
			id: 'todo',
			title: 'To Do',
			cardIds: ['task-1', 'task-2', 'task-3']
		},
		{
			id: 'in-progress',
			title: 'In Progress',
			cardIds: ['task-4', 'task-5']
		},
		{
			id: 'review',
			title: 'Review',
			cardIds: ['task-6']
		},
		{
			id: 'done',
			title: 'Done',
			cardIds: ['task-7', 'task-8']
		}
	],
	cards: {
		'task-1': {
			id: 'task-1',
			title: 'Design new landing page',
			priority: 'high',
			assignee: 'Alice',
			tags: ['design', 'ui'],
			dueDate: '2025-10-15'
		},
		'task-2': {
			id: 'task-2',
			title: 'Implement user authentication',
			priority: 'high',
			assignee: 'Bob',
			tags: ['backend', 'security'],
			dueDate: '2025-10-12'
		},
		'task-3': {
			id: 'task-3',
			title: 'Write API documentation',
			priority: 'medium',
			assignee: 'Carol',
			tags: ['docs'],
			dueDate: '2025-10-20'
		},
		'task-4': {
			id: 'task-4',
			title: 'Fix bug in checkout flow',
			priority: 'high',
			assignee: 'Alice',
			tags: ['bug', 'urgent'],
			dueDate: '2025-10-10'
		},
		'task-5': {
			id: 'task-5',
			title: 'Setup CI/CD pipeline',
			priority: 'medium',
			assignee: 'Bob',
			tags: ['devops'],
			dueDate: '2025-10-18'
		},
		'task-6': {
			id: 'task-6',
			title: 'Refactor database queries',
			priority: 'low',
			assignee: 'Carol',
			tags: ['backend', 'performance'],
			dueDate: '2025-10-25'
		},
		'task-7': {
			id: 'task-7',
			title: 'Setup monitoring dashboard',
			priority: 'medium',
			assignee: 'Alice',
			tags: ['devops', 'monitoring'],
			dueDate: '2025-09-28'
		},
		'task-8': {
			id: 'task-8',
			title: 'Update dependencies',
			priority: 'low',
			assignee: 'Bob',
			tags: ['maintenance'],
			dueDate: '2025-09-30'
		}
	}
};
