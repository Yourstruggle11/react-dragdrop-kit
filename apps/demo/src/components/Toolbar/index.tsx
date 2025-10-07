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

	// Responsive: icon-only mode for small screens
	const [iconOnly, setIconOnly] = React.useState(false);
	React.useEffect(() => {
		const handler = () => setIconOnly(window.innerWidth < 600);
		handler();
		window.addEventListener('resize', handler);
		return () => window.removeEventListener('resize', handler);
	}, []);

	const btn = (
		onClick: () => void,
		icon: React.ReactNode,
		label: string,
		opts: { disabled?: boolean; tooltip?: string } = {}
	) => (
		<button
			onClick={onClick}
			disabled={opts.disabled}
			title={opts.tooltip || label}
			style={{ minWidth: iconOnly ? 40 : 0, justifyContent: iconOnly ? 'center' : 'flex-start' }}
			aria-label={label}
		>
			{icon}
			{!iconOnly && <span style={{ marginLeft: 8 }}>{label}</span>}
		</button>
	);

	return (
		<div className="panel" style={{ marginBottom: 20, width: '100%', boxShadow: '0 4px 24px rgba(102,126,234,0.10)' }}>
			<div
				className="toolbar"
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
					gap: 10,
					alignItems: 'center',
				}}
			>
				{btn(
					() => setDirection(d => (d === 'vertical' ? 'horizontal' : 'vertical')),
					direction === 'vertical' ? <List size={18} /> : <Grid size={18} />,
					direction === 'vertical' ? 'Vertical' : 'Horizontal',
					{ tooltip: 'Toggle list direction' }
				)}
				{btn(addItem, <Plus size={18} />, 'Add Item', { tooltip: 'Add a new item' })}
				{btn(shuffleItems, <Shuffle size={18} />, 'Shuffle', { tooltip: 'Shuffle items' })}
				{btn(resetItems, <RotateCcw size={18} />, 'Reset', { tooltip: 'Reset items' })}
				{btn(undo, <ChevronDown size={18} style={{ transform: 'rotate(90deg)' }} />, 'Undo', { disabled: !canUndo, tooltip: 'Undo last change' })}
				{btn(redo, <ChevronUp size={18} style={{ transform: 'rotate(90deg)' }} />, 'Redo', { disabled: !canRedo, tooltip: 'Redo last change' })}
				{btn(exportData, <Download size={18} />, 'Export', { tooltip: 'Export data' })}
				{btn(importData, <Upload size={18} />, 'Import', { tooltip: 'Import data' })}
				{btn(removeLast, <Trash2 size={18} />, 'Remove Last', { disabled: !canRemove, tooltip: 'Remove last item' })}
			</div>
		</div>
	);
}
