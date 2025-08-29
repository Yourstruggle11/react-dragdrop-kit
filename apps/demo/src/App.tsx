import React, { useMemo, useState } from 'react';
import { PRESET_THEMES } from './constants/themes';
import { FALLBACK_HEX } from './utils/colors';
import { useHistory } from './hooks/useHistory';
import { useItems } from './hooks/useItems';
import { useTheme } from './hooks/useTheme';
import Toolbar from './components/Toolbar';
import SettingsPanel from './components/SettingsPanel';
import DragListPanel from './components/DragListPanel';
import StatePanel from './components/StatePanel';
import { renderItemFactory, type ItemStyle } from './components/items';
import type { Item } from './types/item';

export default function App() {
	// layout + behavior flags
	const [direction, setDirection] = useState<'vertical' | 'horizontal'>('vertical');
	const [gap, setGap] = useState(12);
	const [disabled, setDisabled] = useState(false);
	const [showDropIndicator, setShowDropIndicator] = useState(true);
	const [useCustomPreview, setUseCustomPreview] = useState(true);
	const [showSettings, setShowSettings] = useState(true);
	const [showState, setShowState] = useState(true);
	const [animateChanges, setAnimateChanges] = useState(true);
	const [itemStyle, setItemStyle] = useState<ItemStyle>('card');

	// theme
	const { currentTheme, switchTheme, PRESET_THEMES: THEMES } = useTheme('default');

	// items + demo actions
	const palette = THEMES[currentTheme].colors;
	const {
		items,
		setItems,
		lastUpdates,
		handleReorder,
		addItem,
		duplicateItem,
		resetItems,
		shuffleItems,
		removeLast,
		exportData,
		importData,
		dragPreviewStyle
	} = useItems(currentTheme, palette);

	// history (wrapped around items)
	const history = useHistory<Item[]>(items);
	// keep history in sync when items change via the hook
	React.useEffect(() => {
		history.setValue(items); /* eslint-disable-next-line */
	}, [items]);

	const applyTheme = (t: keyof typeof PRESET_THEMES) => {
		const next = switchTheme(t, items);
		setItems(next);
	};

	const previewStyle = useMemo(
		() => (useCustomPreview ? dragPreviewStyle : undefined),
		[useCustomPreview, dragPreviewStyle]
	);

	const renderItem = renderItemFactory(itemStyle, {
		direction,
		animate: animateChanges,
		onDuplicate: duplicateItem
	});

	return (
		<div
			style={{
				width: '100vw',
				maxWidth: '100%',
				minHeight: '100vh',
				background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
				color: FALLBACK_HEX,
				padding: '32px 24px',
				boxSizing: 'border-box',
				fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
			}}
		>
			<style>{`
        @keyframes slideDown { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:translateY(0) } }
        .demo-drop-indicator { height:3px!important; background:linear-gradient(90deg,#667eea 0%,#764ba2 100%)!important; box-shadow:0 0 12px rgba(102,126,234,.6); border-radius:2px; animation:pulse 1.5s ease infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.6} }
        .toolbar button { border:1px solid #e5e7eb; background:white; color:#111827; padding:8px 14px; border-radius:8px; cursor:pointer; display:inline-flex; align-items:center; gap:6px; font-size:14px; transition:all .2s ease; font-weight:600; }
        .toolbar button:hover { background:#f9fafb; transform:translateY(-1px); box-shadow:0 2px 8px rgba(0,0,0,.08); }
        .toolbar button:disabled { opacity:.5; cursor:not-allowed; }
        .panel { background:white; color:#111827; border-radius:16px; padding:20px; box-shadow:0 4px 20px rgba(0,0,0,0.08); animation:slideDown .3s ease; }
        .settings-grid { display:grid; gap:16px; margin-top:12px; }
        .setting-group { display:flex; align-items:center; gap:12px; }
        .setting-label { display:inline-flex; align-items:center; gap:8px; font-size:14px; color:#4b5563; }
        .theme-button { padding:8px 12px; border:2px solid #e5e7eb; background:white; color:#111827; border-radius:8px; cursor:pointer; font-size:13px; transition:all .2s ease; font-weight:600; }
        .theme-button:hover { border-color:#667eea; background:#f0f4ff; }
        .theme-button.active { border-color:#667eea; background:#667eea; color:white; }
        .main-grid { display:grid; grid-template-columns: var(--cols); gap:20px; align-items:start; }
        @media (max-width: 1100px) { .main-grid { --cols: 1fr !important; } }
      `}</style>

			{/* Header */}
			<div style={{ width: '100%', margin: '0 0 32px 0', textAlign: 'center' }}>
				<h1
					style={{
						margin: 0,
						fontSize: 36,
						fontWeight: 800,
						background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent'
					}}
				>
					Advanced Drag & Drop list Demo
				</h1>
				<p style={{ marginTop: 12, color: '#374151', fontSize: 16 }}>
					Explore drag & drop with enhanced UI, themes, and powerful features
				</p>
			</div>

			{/* Toolbar */}
			<Toolbar
				direction={direction}
				setDirection={setDirection}
				addItem={addItem}
				shuffleItems={shuffleItems}
				resetItems={resetItems}
				undo={history.undo}
				redo={history.redo}
				canUndo={history.index > 0}
				canRedo={history.index < history.history.length - 1}
				exportData={exportData}
				importData={importData}
				removeLast={removeLast}
				canRemove={items.length > 1}
			/>

			{/* Settings */}
			<SettingsPanel
				gap={gap}
				setGap={setGap}
				disabled={disabled}
				setDisabled={setDisabled}
				showDropIndicator={showDropIndicator}
				setShowDropIndicator={setShowDropIndicator}
				useCustomPreview={useCustomPreview}
				setUseCustomPreview={setUseCustomPreview}
				animateChanges={animateChanges}
				setAnimateChanges={setAnimateChanges}
				showState={showState}
				setShowState={setShowState}
				itemStyle={itemStyle}
				setItemStyle={setItemStyle}
				currentTheme={currentTheme}
				onApplyTheme={applyTheme}
				show={showSettings}
				setShow={setShowSettings}
			/>

			{/* Main */}
			<div className="main-grid" style={{ ['--cols' as string]: showState ? 'minmax(0,1fr) 420px' : 'minmax(0,1fr)' }}>
				<DragListPanel
					items={items}
					onReorder={handleReorder}
					direction={direction}
					gap={gap}
					disabled={disabled}
					showDropIndicator={showDropIndicator}
					dragPreviewStyle={previewStyle}
					renderItem={renderItem}
				/>
				<StatePanel
					show={showState}
					items={items}
					lastUpdates={lastUpdates}
					historyIndex={history.index}
					historyLen={history.history.length}
				/>
			</div>
		</div>
	);
}

