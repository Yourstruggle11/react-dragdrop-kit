import { ChevronDown, ChevronUp, Eye, EyeOff, Settings, Zap } from 'lucide-react';
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

	// Toggle switch component
	const Toggle = ({ checked, onChange, label, icon }: { checked: boolean; onChange: (b: boolean) => void; label: string; icon?: React.ReactNode }) => (
		<label className="setting-label" style={{ gap: 10, fontWeight: 600 }}>
			<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{icon}{label}</span>
			<span style={{ marginLeft: 8 }}>
				<input
					type="checkbox"
					checked={checked}
					onChange={e => onChange(e.target.checked)}
					style={{ width: 36, height: 20, accentColor: '#667eea', cursor: 'pointer' }}
				/>
			</span>
		</label>
	);

	return (
		<div className="panel" style={{ marginBottom: 20, width: '100%' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: show ? 16 : 0 }}>
				<h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 22 }}>
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
				<div className="settings-grid" style={{ gap: 28 }}>
					{/* Layout Section */}
					<div style={{ marginBottom: 8 }}>
						<div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#667eea', letterSpacing: 0.2 }}>Layout</div>
						<div className="setting-group" style={{ gap: 24 }}>
							<label className="setting-label" style={{ gap: 10 }}>
								<Zap size={16} /> Gap:
								<input
									type="range"
									min={0}
									max={32}
									value={gap}
									onChange={e => setGap(Number(e.target.value))}
									style={{ margin: '0 10px', flex: 1 }}
								/>
								<span style={{ minWidth: 35, textAlign: 'right', fontWeight: 700, color: '#667eea' }}>{gap}px</span>
							</label>
							<Toggle checked={disabled} onChange={setDisabled} label="Disabled" icon={null} />
						</div>
					</div>

					{/* Visuals Section */}
					<div style={{ marginBottom: 8 }}>
						<div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#667eea', letterSpacing: 0.2 }}>Visuals</div>
						<div className="setting-group" style={{ gap: 24, flexWrap: 'wrap' }}>
							<Toggle checked={showDropIndicator} onChange={setShowDropIndicator} label="Drop Indicator" icon={null} />
							<Toggle checked={useCustomPreview} onChange={setUseCustomPreview} label="Custom Preview" icon={null} />
							<Toggle checked={animateChanges} onChange={setAnimateChanges} label="Animations" icon={<Zap size={15} />} />
							<Toggle checked={showState} onChange={setShowState} label="Show State" icon={showState ? <Eye size={15} /> : <EyeOff size={15} />} />
						</div>
						{showDropIndicator && (
							<div style={{ marginTop: 12 }}>
								<label className="setting-label" style={{ marginBottom: 8, display: 'block', fontWeight: 600 }}>
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
					</div>

					{/* Item Style Section */}
					<div style={{ marginBottom: 8 }}>
						<div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#667eea', letterSpacing: 0.2 }}>Item Style</div>
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

					{/* Theme Section */}
					<div>
						<div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#667eea', letterSpacing: 0.2 }}>Color Theme</div>
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
