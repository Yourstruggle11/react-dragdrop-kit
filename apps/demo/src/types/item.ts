import type { DraggableItem } from '@your-org/drag-drop-list';

export type Priority = 'low' | 'medium' | 'high';
export type Item = DraggableItem & {
	name: string;
	color?: string; // hex or "gradientX"
	description?: string;
	priority?: Priority;
};
