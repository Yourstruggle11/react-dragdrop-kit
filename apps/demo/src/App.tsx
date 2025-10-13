import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import HomePage from '@/components/HomePage';
import KnownIssuesExample from '@/examples/KnownIssues';
import ExampleWrapper from '@/components/ExampleWrapper';
import ComingSoon from '@/components/ComingSoon';
import { getExampleById } from '@/constants/examples';
import { useThemeMode } from '@/contexts/ThemeContext';
import { colors } from '@/constants/designSystem';

// Import examples
import TodoListExample from '@/examples/TodoList';
import ImageGalleryExample from '@/examples/ImageGallery';
import MusicPlaylistExample from '@/examples/MusicPlaylist';
import VirtualScrollingExample from '@/examples/VirtualScrolling';
import FormBuilderExample from '@/examples/FormBuilder';
import DashboardWidgetsExample from '@/examples/DashboardWidgets';
import MultiSelectExample from '@/examples/MultiSelect';
import DragHandleExample from '@/examples/DragHandle';
import GridLayoutExample from '@/examples/GridLayout';
import SimpleVerticalListExample from '@/examples/SimpleVerticalList';
import HorizontalListExample from '@/examples/HorizontalList';

export default function App() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [activeView, setActiveView] = useState<string>('home');

	// Update document title for better SEO and sharing
	useEffect(() => {
		const setDescription = (text: string) => {
			const el = document.querySelector('meta[name="description"]');
			if (el) el.setAttribute('content', text);
		};

		if (activeView === 'home') {
			document.title = 'react-dragdrop-kit Demo — Sortable Lists, Grids & Kanban';
			setDescription('Interactive demo of react-dragdrop-kit — sortable lists, grids, and Kanban with great performance.');
			return;
		}
		const ex = getExampleById(activeView);
		if (ex) {
			document.title = `${ex.title} — react-dragdrop-kit Demo`;
			setDescription(`${ex.description} — react-dragdrop-kit demo example.`);
		}
	}, [activeView]);

	const bgColor = isDark ? colors.gray[900] : colors.gray[50];

	const handleExampleSelect = (exampleId: string) => {
		setActiveView(exampleId);
	};

	const handleHomeClick = () => {
		setActiveView('home');
	};

	const renderContent = () => {
		if (activeView === 'home') {
			return <HomePage onExampleSelect={handleExampleSelect} />;
		}

		// Non-example pages
		if (activeView === 'known-issues') {
			return <KnownIssuesExample />;
		}

		const example = getExampleById(activeView);
		if (!example) {
			return <HomePage onExampleSelect={handleExampleSelect} />;
		}

		// Map example IDs to their components
		const exampleComponents: Record<string, React.ReactNode> = {
			'simple-vertical-list': <SimpleVerticalListExample />,
			'horizontal-list': <HorizontalListExample />,
			'todo-list': <TodoListExample />,
			'image-gallery': <ImageGalleryExample />,
			'music-playlist': <MusicPlaylistExample />,
			'virtual-scrolling': <VirtualScrollingExample />,
			'form-builder': <FormBuilderExample />,
			'dashboard-widgets': <DashboardWidgetsExample />,
			'multi-select': <MultiSelectExample />,
			'drag-handle': <DragHandleExample />,
			'grid-view': <GridLayoutExample />,
		};

		const ExampleComponent = exampleComponents[example.id] || <ComingSoon />;

		return (
			<ExampleWrapper example={example} onBack={handleHomeClick}>
				{ExampleComponent}
			</ExampleWrapper>
		);
	};

	return (
		<div
			style={{
				display: 'flex',
				minHeight: '100vh',
				background: bgColor,
				fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif",
			}}
		>
			<Sidebar
				activeExample={activeView}
				onExampleSelect={handleExampleSelect}
				onHomeClick={handleHomeClick}
			/>

			<main
				style={{
					flex: 1,
					marginLeft: '320px',
					overflowX: 'hidden',
				}}
				className="main-content"
			>
				{renderContent()}
			</main>

			<style>{`
				@media (max-width: 1024px) {
					.main-content {
						margin-left: 0 !important;
					}
				}

				* {
					box-sizing: border-box;
				}

				body {
					margin: 0;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}

				/* Scrollbar styles */
				::-webkit-scrollbar {
					width: 8px;
					height: 8px;
				}

				::-webkit-scrollbar-track {
					background: ${isDark ? colors.gray[800] : colors.gray[100]};
				}

				::-webkit-scrollbar-thumb {
					background: ${isDark ? colors.gray[600] : colors.gray[400]};
					border-radius: 4px;
				}

				::-webkit-scrollbar-thumb:hover {
					background: ${isDark ? colors.gray[500] : colors.gray[500]};
				}

				/* Selection colors */
				::selection {
					background: ${colors.primary[500]};
					color: ${colors.white};
				}
			`}</style>
		</div>
	);
}
