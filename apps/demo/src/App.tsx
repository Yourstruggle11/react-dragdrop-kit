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
	const [gap, setGap] = useState(16);
	const [disabled, setDisabled] = useState(false);
	const [showDropIndicator, setShowDropIndicator] = useState(true);
	const [dropIndicatorPosition, setDropIndicatorPosition] = useState<'top' | 'bottom'>('bottom');
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
				background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				color: FALLBACK_HEX,
				padding: '0',
				boxSizing: 'border-box',
				fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif"
			}}
		>
					<style>{`
						@keyframes slideDown { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:translateY(0) } }
						@keyframes scaleIn { from { opacity:0; transform: scale(0.95); } to { opacity:1; transform: scale(1); } }
						@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.6} }

						body { margin: 0; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

						.demo-drop-indicator {
							height:3px!important;
							background:linear-gradient(90deg,#667eea 0%,#764ba2 100%)!important;
							box-shadow:0 0 12px rgba(102,126,234,.6);
							border-radius:2px;
							animation:pulse 1.5s ease infinite;
						}

						.toolbar button {
							border:1.5px solid #e5e7eb;
							background:rgba(255,255,255,0.85);
							color:#22223b;
							padding:12px 20px;
							border-radius:12px;
							cursor:pointer;
							display:inline-flex;
							align-items:center;
							gap:10px;
							font-size:15px;
							transition:all .18s cubic-bezier(0.4, 0, 0.2, 1);
							font-weight:600;
							box-shadow: 0 2px 8px rgba(102,126,234,0.08);
						}
						.toolbar button:hover:not(:disabled) {
							background:rgba(102,126,234,0.08);
							transform:translateY(-2px) scale(1.03);
							box-shadow:0 6px 18px rgba(102,126,234,0.13);
							border-color:#667eea;
						}
						.toolbar button:active:not(:disabled) {
							transform:translateY(0) scale(1);
							box-shadow:0 2px 8px rgba(102,126,234,0.08);
						}
						.toolbar button:disabled { opacity:.5; cursor:not-allowed; transform:none!important; }

						.panel {
							background:rgba(255,255,255,0.82);
							color:#22223b;
							border-radius:24px;
							padding:32px 28px;
							box-shadow:0 10px 40px rgba(102,126,234,0.13), 0 2px 8px rgba(0,0,0,0.08);
							animation:scaleIn .4s cubic-bezier(0.4, 0, 0.2, 1);
							border: 1.5px solid rgba(255,255,255,0.6);
							backdrop-filter: blur(12px);
						}

						.settings-grid { display:grid; gap:22px; margin-top:18px; }
						.setting-group { display:flex; align-items:center; gap:14px; }
						.setting-label {
							display:inline-flex;
							align-items:center;
							gap:8px;
							font-size:15px;
							color:#4b5563;
							font-weight:500;
							cursor:pointer;
							user-select:none;
						}

						.theme-button {
							padding:12px 18px;
							border:2px solid #e5e7eb;
							background:rgba(255,255,255,0.95);
							color:#22223b;
							border-radius:12px;
							cursor:pointer;
							font-size:14px;
							transition:all .18s cubic-bezier(0.4, 0, 0.2, 1);
							font-weight:600;
							box-shadow: 0 2px 8px rgba(102,126,234,0.08);
						}
						.theme-button:hover {
							border-color:#667eea;
							background:rgba(102,126,234,0.08);
							transform:translateY(-1px) scale(1.04);
							box-shadow: 0 6px 18px rgba(102,126,234,0.13);
						}
						.theme-button.active {
							border-color:#667eea;
							background:#667eea;
							color:white;
							box-shadow: 0 8px 24px rgba(102,126,234,0.18);
						}

									.main-grid {
										display: grid;
										grid-template-columns: var(--cols);
										gap: 32px;
										align-items: start;
										margin-top: 32px;
										width: 100%;
										box-sizing: border-box;
									}
									.panel {
										width: 100%;
										box-sizing: border-box;
										max-width: 100vw;
									}
									.toolbar {
										width: 100%;
										overflow-x: auto;
										display: flex;
										flex-wrap: wrap;
										gap: 8px;
										box-sizing: border-box;
									}
									.toolbar button {
										min-width: 90px;
										flex: 1 1 90px;
										max-width: 100%;
										font-size: 14px;
										padding: 10px 8px;
									}
									@media (max-width: 1100px) {
										.main-grid { --cols: 1fr !important; }
									}
									@media (max-width: 800px) {
										.main-grid {
											grid-template-columns: 1fr !important;
											gap: 12px;
											margin-top: 12px;
											width: 100vw;
											padding: 0 2vw;
										}
										.panel {
											padding: 10px 2vw;
											border-radius: 12px;
											min-width: 0;
											max-width: 100vw;
										}
										.toolbar {
											gap: 6px;
											padding: 0 2vw;
										}
										.toolbar button {
											font-size: 13px;
											padding: 8px 4px;
											min-width: 80px;
										}
										.demo-header {
											padding-top: 18px;
											padding-bottom: 6px;
										}
										.demo-title {
											font-size: 24px;
										}
										.demo-desc {
											font-size: 13px;
										}
									}
									@media (max-width: 500px) {
										.main-grid {
											gap: 6px;
											margin-top: 6px;
											padding: 0 1vw;
										}
										.panel {
											padding: 6px 1vw;
											border-radius: 7px;
											min-width: 0;
											max-width: 100vw;
										}
										.toolbar {
											gap: 4px;
											padding: 0 1vw;
										}
										.toolbar button {
											font-size: 12px;
											padding: 6px 2px;
											min-width: 60px;
										}
										.demo-header {
											padding-top: 8px;
											padding-bottom: 2px;
										}
										.demo-title {
											font-size: 15px;
										}
										.demo-desc {
											font-size: 10px;
										}
									}

						input[type="range"] {
							-webkit-appearance: none;
							appearance: none;
							height: 7px;
							background: #e5e7eb;
							border-radius: 3.5px;
							outline: none;
							flex: 1;
						}
						input[type="range"]::-webkit-slider-thumb {
							-webkit-appearance: none;
							appearance: none;
							width: 20px;
							height: 20px;
							background: #667eea;
							border-radius: 50%;
							cursor: pointer;
							transition: all .18s;
							box-shadow: 0 2px 8px rgba(102,126,234,0.18);
						}
						input[type="range"]::-webkit-slider-thumb:hover {
							transform: scale(1.12);
							box-shadow: 0 6px 18px rgba(102,126,234,0.23);
						}
						input[type="range"]::-moz-range-thumb {
							width: 20px;
							height: 20px;
							background: #667eea;
							border-radius: 50%;
							cursor: pointer;
							border: none;
							transition: all .18s;
							box-shadow: 0 2px 8px rgba(102,126,234,0.18);
						}

						input[type="checkbox"] {
							width: 20px;
							height: 20px;
							cursor: pointer;
							accent-color: #667eea;
						}

						.demo-header {
							width: 100%;
							margin: 0 0 44px 0;
							text-align: center;
							padding-top: 48px;
							padding-bottom: 12px;
						}
						.demo-title {
							margin: 0;
							font-size: 54px;
							font-weight: 900;
							color: white;
							text-shadow: 0 4px 32px rgba(102,126,234,0.25), 0 2px 20px rgba(0,0,0,0.18);
							letter-spacing: -0.03em;
							font-family: 'Inter', 'Segoe UI', sans-serif;
						}
						.demo-desc {
							margin-top: 18px;
							color: rgba(255,255,255,0.97);
							font-size: 21px;
							font-weight: 500;
							max-width: 650px;
							margin-left: auto;
							margin-right: auto;
							text-shadow: 0 2px 12px rgba(102,126,234,0.10);
						}
						.demo-links {
							margin-top: 28px;
							display: flex;
							gap: 16px;
							justify-content: center;
							flex-wrap: wrap;
						}
						.demo-link {
							padding: 12px 24px;
							background: rgba(255,255,255,0.18);
							backdrop-filter: blur(10px);
							border: 1.5px solid rgba(255,255,255,0.35);
							border-radius: 12px;
							color: white;
							text-decoration: none;
							font-size: 15px;
							font-weight: 700;
							transition: all .18s;
							display: inline-flex;
							align-items: center;
							gap: 10px;
						}
						.demo-link:hover {
							background: rgba(255,255,255,0.28);
							transform: translateY(-2px) scale(1.04);
							box-shadow: 0 6px 18px rgba(102,126,234,0.13);
						}
						.demo-link.npm {
							background: white;
							color: #667eea;
							border: 1.5px solid #e5e7eb;
						}
						.demo-link.npm:hover {
							background: #f0f4ff;
							color: #4b5ae7;
						}

						.demo-footer {
							width: 100%;
							text-align: center;
							margin-top: 48px;
							padding: 32px 0 18px 0;
							color: rgba(255,255,255,0.75);
							font-size: 15px;
							font-weight: 500;
							letter-spacing: 0.01em;
							text-shadow: 0 2px 12px rgba(102,126,234,0.10);
						}
						.demo-footer a {
							color: #fff;
							text-decoration: underline;
							font-weight: 600;
							margin: 0 6px;
							transition: color .18s;
						}
						.demo-footer a:hover {
							color: #b3c0ff;
						}
					`}</style>

			{/* Header */}
			<div className="demo-header">
				<h1 className="demo-title">react-dragdrop-kit</h1>
				<p className="demo-desc">
					A flexible, lightweight React drag-and-drop library with powerful features and beautiful UI
				</p>
				<div className="demo-links">
					<a
						className="demo-link"
						href="https://github.com/Yourstruggle11/react-dragdrop-kit"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
							<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
						</svg>
						View on GitHub
					</a>
					<a
						className="demo-link npm"
						href="https://www.npmjs.com/package/react-dragdrop-kit"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg width="18" height="18" viewBox="0 0 780 250" fill="currentColor">
							<path d="M240 250h100v-50h100V0H240v250zm50-150h50v50h-50v-50zm150 0h50v50h-50v-50z" />
							<path d="M480 0v200h100V50h50v150h100V50h50v150h100V0H480zm150 150H580v-50h50v50z" />
						</svg>
						npm install
					</a>
				</div>
			</div>

			{/* Toolbar */}
			<div style={{ maxWidth: 1200, margin: '0 auto', marginBottom: 18 }}>
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
			</div>

			{/* Settings */}
			<div style={{ maxWidth: 1200, margin: '0 auto', marginBottom: 0 }}>
				<SettingsPanel
					gap={gap}
					setGap={setGap}
					disabled={disabled}
					setDisabled={setDisabled}
					showDropIndicator={showDropIndicator}
					setShowDropIndicator={setShowDropIndicator}
					dropIndicatorPosition={dropIndicatorPosition}
					setDropIndicatorPosition={setDropIndicatorPosition}
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
			</div>

			{/* Main */}
			<div className="main-grid" style={{ ['--cols' as string]: showState ? 'minmax(0,1fr) 420px' : 'minmax(0,1fr)', maxWidth: 1200, margin: '0 auto' }}>
				<DragListPanel
					items={items}
					onReorder={handleReorder}
					direction={direction}
					gap={gap}
					disabled={disabled}
					showDropIndicator={showDropIndicator}
					dropIndicatorPosition={dropIndicatorPosition}
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

			{/* Footer */}
			<footer className="demo-footer">
				<span>
					Made with <span style={{ color: '#ff6b81', fontWeight: 700 }}>♥</span> by <a href="https://github.com/Yourstruggle11" target="_blank" rel="noopener noreferrer">Yourstruggle11</a>
					&nbsp;|&nbsp;
					<a href="https://github.com/Yourstruggle11/react-dragdrop-kit" target="_blank" rel="noopener noreferrer">GitHub</a>
					&nbsp;|&nbsp;
					<a href="https://www.npmjs.com/package/react-dragdrop-kit" target="_blank" rel="noopener noreferrer">NPM</a>
				</span>
			</footer>
		</div>
	);
}
