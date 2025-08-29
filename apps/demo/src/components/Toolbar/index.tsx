import React from 'react';
import { ChevronDown, ChevronUp, Download, Grid, List, Plus, RotateCcw, Shuffle, Trash2, Upload } from 'lucide-react';

type Props = {
	direction: 'vertical' | 'horizontal';
	setDirection: React.Dispatch<React.SetStateAction<'vertical' | 'horizontal'>>;
	addItem(): void;
	shuffleItems(): void;
	resetItems(): void;
	undo(): void;
	redo(): void;
	canUndo: boolean;
	canRedo: boolean;
	exportData(): void;
	importData(): void;
	removeLast(): void;
	canRemove: boolean;
};

export default function Toolbar(props: Props) {
	const {
		direction,
		setDirection,
		addItem,
		shuffleItems,
		resetItems,
		undo,
		redo,
		canUndo,
		canRedo,
		exportData,
		importData,
		removeLast,
		canRemove
	} = props;

	return (
		<div className="panel" style={{ marginBottom: 20, width: '100%' }}>
			<div
				className="toolbar"
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
					gap: 12
				}}
			>
				<button onClick={() => setDirection(d => (d === 'vertical' ? 'horizontal' : 'vertical'))}>
					{direction === 'vertical' ? <List size={16} /> : <Grid size={16} />}
					{direction === 'vertical' ? 'Vertical' : 'Horizontal'}
				</button>
				<button onClick={addItem}>
					<Plus size={16} /> Add Item
				</button>
				<button onClick={shuffleItems}>
					<Shuffle size={16} /> Shuffle
				</button>
				<button onClick={resetItems}>
					<RotateCcw size={16} /> Reset
				</button>
				<button onClick={undo} disabled={!canUndo}>
					<ChevronDown size={16} style={{ transform: 'rotate(90deg)' }} /> Undo
				</button>
				<button onClick={redo} disabled={!canRedo}>
					<ChevronUp size={16} style={{ transform: 'rotate(90deg)' }} /> Redo
				</button>
				<button onClick={exportData}>
					<Download size={16} /> Export
				</button>
				<button onClick={importData}>
					<Upload size={16} /> Import
				</button>
				<button onClick={removeLast} disabled={!canRemove}>
					<Trash2 size={16} /> Remove Last
				</button>
			</div>
		</div>
	);
}
