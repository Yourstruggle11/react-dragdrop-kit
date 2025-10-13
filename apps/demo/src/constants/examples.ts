export interface Example {
	id: string;
	title: string;
	description: string;
	category: ExampleCategory;
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	tags: string[];
	icon: string; // emoji
	featured?: boolean;
	new?: boolean;
}

export type ExampleCategory =
	| 'basics'
	| 'real-world'
	| 'advanced'
	| 'kanban'
	| 'integrations'
	| 'performance';

export interface ExampleCategoryMeta {
	id: ExampleCategory;
	title: string;
	description: string;
	icon: string;
}

export const categories: Record<ExampleCategory, ExampleCategoryMeta> = {
	basics: {
		id: 'basics',
		title: 'Basics',
		description: 'Get started with fundamental drag-and-drop concepts',
		icon: '📚',
	},
	'real-world': {
		id: 'real-world',
		title: 'Real-World Use Cases',
		description: 'Practical examples for common scenarios',
		icon: '🌍',
	},
	advanced: {
		id: 'advanced',
		title: 'Advanced Features',
		description: 'Complex patterns and advanced techniques',
		icon: '🚀',
	},
	kanban: {
		id: 'kanban',
		title: 'Kanban Boards',
		description: 'Full-featured Kanban board implementations',
		icon: '🗂️',
	},
	integrations: {
		id: 'integrations',
		title: 'UI Library Integrations',
		description: 'Examples with popular component libraries',
		icon: '🎨',
	},
	performance: {
		id: 'performance',
		title: 'Performance',
		description: 'Optimized implementations for large datasets',
		icon: '⚡',
	},
};

export const examples: Example[] = [
	// ===== BASICS =====
	{
		id: 'simple-vertical-list',
		title: 'Simple Vertical List',
		description: 'Basic sortable list with vertical orientation',
		category: 'basics',
		difficulty: 'beginner',
		tags: ['list', 'vertical', 'basic'],
		icon: '📝',
		featured: true,
	},
	{
		id: 'horizontal-list',
		title: 'Horizontal List',
		description: 'Sortable list with horizontal layout',
		category: 'basics',
		difficulty: 'beginner',
		tags: ['list', 'horizontal', 'basic'],
		icon: '↔️',
	},
	{
		id: 'custom-preview',
		title: 'Custom Drag Preview',
		description: 'Customize the appearance while dragging',
		category: 'basics',
		difficulty: 'beginner',
		tags: ['preview', 'styling'],
		icon: '👁️',
	},
	{
		id: 'drop-indicator',
		title: 'Drop Indicators',
		description: 'Visual feedback for drop positions',
		category: 'basics',
		difficulty: 'beginner',
		tags: ['indicator', 'visual'],
		icon: '🎯',
	},

	// ===== REAL-WORLD =====
	{
		id: 'todo-list',
		title: 'Todo List',
		description: 'Task list with priorities and completion status',
		category: 'real-world',
		difficulty: 'intermediate',
		tags: ['todo', 'tasks', 'practical'],
		icon: '✅',
		featured: true,
		new: true,
	},
	{
		id: 'image-gallery',
		title: 'Image Gallery',
		description: 'Reorderable image grid with thumbnails',
		category: 'real-world',
		difficulty: 'intermediate',
		tags: ['images', 'grid', 'gallery'],
		icon: '🖼️',
		new: true,
	},
	{
		id: 'music-playlist',
		title: 'Music Playlist',
		description: 'Drag-and-drop playlist editor',
		category: 'real-world',
		difficulty: 'intermediate',
		tags: ['music', 'playlist', 'media'],
		icon: '🎵',
		new: true,
	},
	{
		id: 'form-builder',
		title: 'Form Builder',
		description: 'Drag fields to build custom forms',
		category: 'real-world',
		difficulty: 'advanced',
		tags: ['forms', 'builder', 'fields'],
		icon: '📋',
		new: true,
	},
	{
		id: 'dashboard-widgets',
		title: 'Dashboard Widgets',
		description: 'Customizable dashboard layout',
		category: 'real-world',
		difficulty: 'advanced',
		tags: ['dashboard', 'widgets', 'layout'],
		icon: '📊',
		new: true,
	},

	// ===== ADVANCED =====
	{
		id: 'virtual-scrolling',
		title: 'Virtual Scrolling (1000+ items)',
		description: 'High-performance list with virtualization',
		category: 'advanced',
		difficulty: 'advanced',
		tags: ['performance', 'virtual', 'large-data'],
		icon: '⚡',
		featured: true,
		new: true,
	},
	{
		id: 'multi-select',
		title: 'Multi-Selection Drag',
		description: 'Select and drag multiple items at once',
		category: 'advanced',
		difficulty: 'advanced',
		tags: ['multi-select', 'selection'],
		icon: '✨',
		new: true,
	},
	{
		id: 'drag-handle',
		title: 'Drag Handles',
		description: 'Specific handle areas for dragging',
		category: 'advanced',
		difficulty: 'intermediate',
		tags: ['handle', 'control'],
		icon: '✊',
		new: true,
	},
	{
		id: 'grid-view',
		title: 'Grid View',
		description: 'Multi-row grid with drag-and-drop',
		category: 'advanced',
		difficulty: 'intermediate',
		tags: ['grid', 'multi-row'],
		icon: '⊞',
		new: true,
	},
	{
		id: 'file-tree',
		title: 'File Tree Explorer',
		description: 'Nested file/folder structure',
		category: 'advanced',
		difficulty: 'advanced',
		tags: ['tree', 'nested', 'folders'],
		icon: '📁',
		new: true,
	},
	{
		id: 'nested-lists',
		title: 'Nested Lists',
		description: 'Parent-child hierarchical lists',
		category: 'advanced',
		difficulty: 'advanced',
		tags: ['nested', 'hierarchy'],
		icon: '🔗',
		new: true,
	},
	{
		id: 'navigation-builder',
		title: 'Navigation Menu Builder',
		description: 'Build nested navigation menus',
		category: 'advanced',
		difficulty: 'advanced',
		tags: ['navigation', 'menu', 'builder'],
		icon: '🧭',
		new: true,
	},

	// ===== KANBAN =====
	{
		id: 'basic-kanban',
		title: 'Basic Kanban Board',
		description: 'Simple kanban with columns and cards',
		category: 'kanban',
		difficulty: 'intermediate',
		tags: ['kanban', 'board', 'columns'],
		icon: '📋',
		featured: true,
	},
	{
		id: 'rich-kanban',
		title: 'Rich Kanban with Features',
		description: 'Advanced kanban with tags, avatars, priorities',
		category: 'kanban',
		difficulty: 'advanced',
		tags: ['kanban', 'rich', 'features'],
		icon: '🎨',
	},
	{
		id: 'swimlanes-kanban',
		title: 'Kanban with Swimlanes',
		description: 'Horizontal grouping with swimlanes',
		category: 'kanban',
		difficulty: 'advanced',
		tags: ['kanban', 'swimlanes', 'grouping'],
		icon: '🏊',
		new: true,
	},
	{
		id: 'wip-limits-kanban',
		title: 'WIP Limits Kanban',
		description: 'Column limits and workflow constraints',
		category: 'kanban',
		difficulty: 'advanced',
		tags: ['kanban', 'wip', 'limits'],
		icon: '🚦',
		new: true,
	},

	// ===== INTEGRATIONS =====
	{
		id: 'tailwind-example',
		title: 'Tailwind CSS',
		description: 'Styled with Tailwind utility classes',
		category: 'integrations',
		difficulty: 'beginner',
		tags: ['tailwind', 'styling'],
		icon: '💨',
	},
	{
		id: 'material-ui-example',
		title: 'Material-UI',
		description: 'Integration with MUI components',
		category: 'integrations',
		difficulty: 'intermediate',
		tags: ['mui', 'material', 'components'],
		icon: '🎨',
		new: true,
	},
	{
		id: 'chakra-example',
		title: 'Chakra UI',
		description: 'Styled with Chakra UI components',
		category: 'integrations',
		difficulty: 'intermediate',
		tags: ['chakra', 'components'],
		icon: '⚡',
		new: true,
	},

	// ===== PERFORMANCE =====
	{
		id: 'performance-monitor',
		title: 'Performance Monitoring',
		description: 'Real-time FPS and performance metrics',
		category: 'performance',
		difficulty: 'intermediate',
		tags: ['performance', 'monitoring', 'fps'],
		icon: '📈',
		new: true,
	},
	{
		id: 'optimized-large-list',
		title: 'Optimized Large Lists',
		description: 'Best practices for handling 10,000+ items',
		category: 'performance',
		difficulty: 'advanced',
		tags: ['performance', 'optimization'],
		icon: '🚀',
		new: true,
	},
];

// Helper functions
export function getExamplesByCategory(categoryId: ExampleCategory): Example[] {
	return examples.filter((ex) => ex.category === categoryId);
}

export function getFeaturedExamples(): Example[] {
	return examples.filter((ex) => ex.featured);
}

export function getNewExamples(): Example[] {
	return examples.filter((ex) => ex.new);
}

export function getExampleById(id: string): Example | undefined {
	return examples.find((ex) => ex.id === id);
}

export function searchExamples(query: string): Example[] {
	const lowerQuery = query.toLowerCase();
	return examples.filter(
		(ex) =>
			ex.title.toLowerCase().includes(lowerQuery) ||
			ex.description.toLowerCase().includes(lowerQuery) ||
			ex.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
	);
}
