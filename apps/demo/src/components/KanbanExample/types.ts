import type { KanbanCard } from 'react-dragdrop-kit/kanban';

export interface TaskCard extends KanbanCard {
	priority?: 'low' | 'medium' | 'high';
	assignee?: string;
	tags?: string[];
	dueDate?: string;
}

export type Theme = 'modern' | 'minimal' | 'colorful' | 'dark';

export type CardAnimation = 'rotate' | 'scale' | 'lift';
