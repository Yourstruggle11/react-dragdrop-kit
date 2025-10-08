import { useState, useCallback, useEffect } from 'react';
import {
	KanbanBoard,
	type KanbanBoardState,
	type DropResult,
	type DragProvided,
	type DragSnapshot,
	applyDragResult,
	AnnouncerProvider,
	useAnnouncer,
	announcements,
	type KanbanColumn
} from 'react-dragdrop-kit/kanban';
import { TaskCard } from './TaskCard';
import { ColumnHeader } from './ColumnHeader';
import { SettingsPanel } from './SettingsPanel';
import { initialState } from './constants';
import type { TaskCard as TaskCardType, Theme } from './types';

function KanbanExampleInner() {
	const [state, setState] = useState<KanbanBoardState>(initialState);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	
	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	const [showSettings, setShowSettings] = useState(true);
	const [theme, setTheme] = useState<Theme>('modern');
	const [showEmojis, setShowEmojis] = useState(true);
	const [compactMode, setCompactMode] = useState(false);
	const [showAvatars, setShowAvatars] = useState(true);
	const [showTags, setShowTags] = useState(true);
	const [showPriority, setShowPriority] = useState(true);
	const [showDueDate, setShowDueDate] = useState(true);
	const [cardAnimation, setCardAnimation] = useState<'rotate' | 'scale' | 'lift'>('rotate');
	const [columnGap, setColumnGap] = useState(16);
	const [cardGap, setCardGap] = useState(8);
	const { announce } = useAnnouncer();

	const handleDragEnd = useCallback(
		(result: DropResult) => {
			if (!result.destination) {
				// Drag was cancelled
				const cardOrColumn = result.type === 'CARD'
					? state.cards[result.draggableId]?.title
					: state.columns.find(c => c.id === result.draggableId)?.title;
				const sourceColumn = result.source.columnId
					? state.columns.find(c => c.id === result.source.columnId)?.title
					: 'board';
				if (cardOrColumn) {
					announce(announcements.onDragCancel(cardOrColumn, sourceColumn || 'board'));
				}
				return;
			}

			const newState = applyDragResult(state, result);
			setState(newState);

			// Announce the result
			if (result.type === 'CARD') {
				const card = state.cards[result.draggableId];
				const sourceCol = state.columns.find(c => c.id === result.source.columnId);
				const destCol = newState.columns.find(c => c.id === result.destination?.columnId);

				if (card && sourceCol && destCol) {
					announce(
						announcements.onDragEnd(
							card.title,
							sourceCol.title,
							destCol.title,
							result.destination.index
						)
					);
				}
			} else if (result.type === 'COLUMN') {
				const column = state.columns.find(c => c.id === result.draggableId);
				if (column && result.destination) {
					announce(
						announcements.onColumnMove(
							column.title,
							result.destination.index,
							state.columns.length
						)
					);
				}
			}
		},
		[state, announce]
	);

	const resetBoard = () => {
		setState(initialState);
	};

	const shuffleCards = () => {
		const allCardIds = Object.keys(state.cards);
		const shuffled = [...allCardIds].sort(() => Math.random() - 0.5);

		const cardsPerColumn = Math.ceil(shuffled.length / state.columns.length);
		const newColumns = state.columns.map((col, idx) => ({
			...col,
			cardIds: shuffled.slice(idx * cardsPerColumn, (idx + 1) * cardsPerColumn)
		}));

		setState({ ...state, columns: newColumns });
	};

	const renderColumn = useCallback(
		(column: KanbanColumn, _provided: DragProvided, snapshot: DragSnapshot) => (
			<ColumnHeader
				column={column}
				snapshot={snapshot}
				theme={theme}
				showEmojis={showEmojis}
				compactMode={compactMode}
			/>
		),
		[theme, showEmojis, compactMode]
	);

	const renderCard = useCallback(
		(card: TaskCardType, provided: DragProvided, snapshot: DragSnapshot) => (
			<TaskCard
				card={card}
				provided={provided}
				snapshot={snapshot}
				theme={theme}
				compactMode={compactMode}
				showTags={showTags}
				showAvatars={showAvatars}
				showPriority={showPriority}
				showDueDate={showDueDate}
				cardAnimation={cardAnimation}
				windowWidth={windowWidth}
			/>
		),
		[theme, compactMode, showTags, showAvatars, showPriority, showDueDate, cardAnimation, windowWidth]
	);

	const totalCards = Object.keys(state.cards).length;

	return (
		<div
			style={{
				padding: windowWidth > 800 ? '32px 24px 48px 24px' : '16px 8px 24px 8px',
				maxWidth: showSettings ? '1600px' : '1400px',
				margin: '0 auto',
				minHeight: '600px',
				width: '100%',
				boxSizing: 'border-box',
				overflowX: 'hidden'
			}}
		>
			{/* Header */}
			<div style={{ marginBottom: '32px', textAlign: 'center' }}>
				<h2
					style={{
						margin: '0 0 12px 0',
						color: 'white',
						fontSize: '32px',
						fontWeight: 900,
						textShadow: '0 2px 20px rgba(0, 0, 0, 0.15)',
						letterSpacing: '-0.02em'
					}}
				>
					🗂️ Kanban Board
				</h2>
				<p
					style={{
						margin: 0,
						color: 'rgba(255, 255, 255, 0.9)',
						fontSize: '16px',
						fontWeight: 500,
						textShadow: '0 1px 8px rgba(0, 0, 0, 0.1)'
					}}
				>
					Drag cards between columns or reorder columns • {totalCards} tasks across {state.columns.length} columns
				</p>
			</div>

			{/* Toolbar */}
			<div style={{ marginBottom: '18px', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
				<button
					onClick={resetBoard}
					className="toolbar"
					style={{
						border: '1.5px solid #e5e7eb',
						background: 'rgba(255,255,255,0.85)',
						color: '#22223b',
						padding: '10px 20px',
						borderRadius: '12px',
						cursor: 'pointer',
						fontSize: '14px',
						fontWeight: 600,
						transition: 'all 0.18s'
					}}
				>
					🔄 Reset
				</button>
				<button
					onClick={shuffleCards}
					className="toolbar"
					style={{
						border: '1.5px solid #e5e7eb',
						background: 'rgba(255,255,255,0.85)',
						color: '#22223b',
						padding: '10px 20px',
						borderRadius: '12px',
						cursor: 'pointer',
						fontSize: '14px',
						fontWeight: 600,
						transition: 'all 0.18s'
					}}
				>
					🎲 Shuffle
				</button>
				<button
					onClick={() => setShowSettings(!showSettings)}
					className="toolbar"
					style={{
						border: '1.5px solid #e5e7eb',
						background: 'rgba(255,255,255,0.85)',
						color: '#22223b',
						padding: '10px 20px',
						borderRadius: '12px',
						cursor: 'pointer',
						fontSize: '14px',
						fontWeight: 600,
						transition: 'all 0.18s'
					}}
				>
					⚙️ {showSettings ? 'Hide' : 'Show'} Settings
				</button>
			</div>

			{/* Main Grid */}
			<div style={{
				display: 'grid',
				gridTemplateColumns: windowWidth > 1000 && showSettings ? '1fr 380px' : '1fr',
				gap: windowWidth > 800 ? '24px' : '16px',
				alignItems: 'start',
				width: '100%',
				boxSizing: 'border-box'
			}}>
				{/* Kanban Board */}
				<KanbanBoard
					state={state}
					onDragEnd={handleDragEnd}
					renderColumn={renderColumn}
					renderCard={renderCard}
					className="kanban-board-container"
					style={{
						padding: windowWidth > 800 ? '24px' : '12px',
						background: theme === 'dark'
							? 'rgba(26, 32, 44, 0.95)'
							: 'rgba(255, 255, 255, 0.95)',
						borderRadius: windowWidth > 800 ? '24px' : '12px',
						boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)',
						backdropFilter: 'blur(12px)',
						border: '1.5px solid rgba(255, 255, 255, 0.7)',
						gap: `${windowWidth > 600 ? columnGap : Math.max(8, columnGap / 2)}px`,
						minHeight: '500px',
						width: '100%',
						boxSizing: 'border-box',
						overflowX: 'auto',
						overflowY: 'hidden',
						WebkitOverflowScrolling: 'touch'
					}}
				/>
				{showSettings && (
					<SettingsPanel
						theme={theme}
						setTheme={setTheme}
						cardAnimation={cardAnimation}
						setCardAnimation={setCardAnimation}
						columnGap={columnGap}
						setColumnGap={setColumnGap}
						cardGap={cardGap}
						setCardGap={setCardGap}
						compactMode={compactMode}
						setCompactMode={setCompactMode}
						showEmojis={showEmojis}
						setShowEmojis={setShowEmojis}
						showAvatars={showAvatars}
						setShowAvatars={setShowAvatars}
						showTags={showTags}
						setShowTags={setShowTags}
						showPriority={showPriority}
						setShowPriority={setShowPriority}
						showDueDate={showDueDate}
						setShowDueDate={setShowDueDate}
					/>
				)}
			</div>

			{/* Instructions */}
			<div
				style={{
					marginTop: '32px',
					padding: '20px 24px',
					background: 'rgba(255, 255, 255, 0.18)',
					backdropFilter: 'blur(10px)',
					border: '1.5px solid rgba(255, 255, 255, 0.35)',
					borderRadius: '16px',
					color: 'white'
				}}
			>
				<h3
					style={{
						margin: '0 0 12px 0',
						fontSize: '16px',
						fontWeight: 700
					}}
				>
					💡 Try it out:
				</h3>
				<ul
					style={{
						margin: 0,
						padding: '0 0 0 20px',
						fontSize: '14px',
						lineHeight: '1.8',
						fontWeight: 500
					}}
				>
					<li>Drag cards between columns to change their status</li>
					<li>Drag column headers to reorder columns</li>
					<li>Drop outside the board to cancel the drag</li>
					<li>Customize the appearance using the settings panel</li>
					<li>Try different themes and animations for unique looks</li>
				</ul>
			</div>

			{/* Custom styles for card gaps */}
			<style>{`
				[style*="flex-direction: column"] > div:not(:last-child) {
					margin-bottom: ${cardGap}px !important;
				}
			`}</style>
		</div>
	);
}

export default function KanbanExample() {
	return (
		<AnnouncerProvider>
			<KanbanExampleInner />
		</AnnouncerProvider>
	);
}
