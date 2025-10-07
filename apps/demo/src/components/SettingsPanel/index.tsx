import { ChevronDown, ChevronUp, Eye, EyeOff, Palette, Settings, Zap } from 'lucide-react';
import type { ItemStyle } from '../items';
import { PRESET_THEMES, type ThemeKey } from '../../constants/themes';

type Props = {
	gap: number;
	setGap(n: number): void;
	disabled: boolean;
	setDisabled(b: boolean): void;
	showDropIndicator: boolean;
	setShowDropIndicator(b: boolean): void;
	dropIndicatorPosition: 'top' | 'bottom';
	setDropIndicatorPosition(p: 'top' | 'bottom'): void;
	useCustomPreview: boolean;
	setUseCustomPreview(b: boolean): void;
	animateChanges: boolean;
	setAnimateChanges(b: boolean): void;
	showState: boolean;
	setShowState(b: boolean): void;

	itemStyle: ItemStyle;
	setItemStyle(s: ItemStyle): void;

	currentTheme: ThemeKey;
	onApplyTheme(t: ThemeKey): void;

	show: boolean;
	setShow(b: boolean): void;
};

export default function SettingsPanel(p: Props) {
	const {
		gap,
		setGap,
		disabled,
		setDisabled,
		showDropIndicator,
		setShowDropIndicator,
		dropIndicatorPosition,
		setDropIndicatorPosition,
		useCustomPreview,
		setUseCustomPreview,
		animateChanges,
		setAnimateChanges,
		showState,
		setShowState,
		itemStyle,
		setItemStyle,
		currentTheme,
		onApplyTheme,
		show,
		setShow
	} = p;

	return (
		<div className="panel" style={{ marginBottom: 20, width: '100%' }}>
			<div
				style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: show ? 16 : 0 }}
			>
				<h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
					<Settings size={20} /> Settings
				</h3>
				<button
					onClick={() => setShow(!show)}
					style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
					aria-label={show ? 'Hide settings' : 'Show settings'}
				>
					{show ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
				</button>
			</div>

			{show && (
				<div className="settings-grid">
					<div className="setting-group">
						<label className="setting-label">
							<Zap size={16} /> Gap:
							<input type="range" min={0} max={32} value={gap} onChange={e => setGap(Number(e.target.value))} />
							<span style={{ minWidth: 35, textAlign: 'right' }}>{gap}px</span>
						</label>
					</div>

					<div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
						<label className="setting-label">
							<input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} /> Disabled
						</label>
						<label className="setting-label">
							<input
								type="checkbox"
								checked={showDropIndicator}
								onChange={e => setShowDropIndicator(e.target.checked)}
							/>{' '}
							Drop Indicator
						</label>
						<label className="setting-label">
							<input type="checkbox" checked={useCustomPreview} onChange={e => setUseCustomPreview(e.target.checked)} />{' '}
							Custom Preview
						</label>
						<label className="setting-label">
							<input type="checkbox" checked={animateChanges} onChange={e => setAnimateChanges(e.target.checked)} />{' '}
							Animations
						</label>
						<label className="setting-label">
							<input type="checkbox" checked={showState} onChange={e => setShowState(e.target.checked)} />
							{showState ? <Eye size={16} /> : <EyeOff size={16} />} Show State
						</label>
					</div>

					{showDropIndicator && (
						<div>
							<label className="setting-label" style={{ marginBottom: 8, display: 'block' }}>
								Drop Indicator Position:
							</label>
							<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
								{(['top', 'bottom'] as ('top' | 'bottom')[]).map(pos => (
									<button
										key={pos}
										className={`theme-button ${dropIndicatorPosition === pos ? 'active' : ''}`}
										onClick={() => setDropIndicatorPosition(pos)}
									>
										{pos[0].toUpperCase() + pos.slice(1)}
									</button>
								))}
							</div>
						</div>
					)}

					<div>
						<label className="setting-label" style={{ marginBottom: 8, display: 'block' }}>
							<Palette size={16} /> Item Style:
						</label>
						<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
							{(['card', 'compact', 'detailed'] as ItemStyle[]).map(s => (
								<button
									key={s}
									className={`theme-button ${itemStyle === s ? 'active' : ''}`}
									onClick={() => setItemStyle(s)}
								>
									{s[0].toUpperCase() + s.slice(1)}
								</button>
							))}
						</div>
					</div>

					<div>
						<label className="setting-label" style={{ marginBottom: 8, display: 'block' }}>
							<Palette size={16} /> Color Theme:
						</label>
						<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
							{Object.entries(PRESET_THEMES).map(([key, theme]) => (
								<button
									key={key}
									className={`theme-button ${currentTheme === key ? 'active' : ''}`}
									onClick={() => onApplyTheme(key as ThemeKey)}
								>
									{theme.name}
								</button>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
