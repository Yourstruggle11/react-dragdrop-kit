import type { DraggableItem } from 'react-dragdrop-kit';

export type Priority = 'low' | 'medium' | 'high';
export type Item = DraggableItem & {
	name: string;
	color?: string; // hex or "gradientX"
	description?: string;
	priority?: Priority;
};
