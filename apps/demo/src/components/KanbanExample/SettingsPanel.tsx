import type { Theme, CardAnimation } from './types';

interface SettingsPanelProps {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	cardAnimation: CardAnimation;
	setCardAnimation: (animation: CardAnimation) => void;
	columnGap: number;
	setColumnGap: (gap: number) => void;
	cardGap: number;
	setCardGap: (gap: number) => void;
	compactMode: boolean;
	setCompactMode: (compact: boolean) => void;
	showEmojis: boolean;
	setShowEmojis: (show: boolean) => void;
	showAvatars: boolean;
	setShowAvatars: (show: boolean) => void;
	showTags: boolean;
	setShowTags: (show: boolean) => void;
	showPriority: boolean;
	setShowPriority: (show: boolean) => void;
	showDueDate: boolean;
	setShowDueDate: (show: boolean) => void;
}

export function SettingsPanel({
	theme,
	setTheme,
	cardAnimation,
	setCardAnimation,
	columnGap,
	setColumnGap,
	cardGap,
	setCardGap,
	compactMode,
	setCompactMode,
	showEmojis,
	setShowEmojis,
	showAvatars,
	setShowAvatars,
	showTags,
	setShowTags,
	showPriority,
	setShowPriority,
	showDueDate,
	setShowDueDate
}: SettingsPanelProps) {
	return (
		<div
			className="panel"
			style={{
				animation: 'slideDown 0.3s ease',
				position: 'sticky',
				top: '24px'
			}}
		>
			<h3 style={{
				margin: '0 0 20px 0',
				fontSize: '18px',
				fontWeight: 700,
				color: '#1f2937',
				display: 'flex',
				alignItems: 'center',
				gap: '8px'
			}}>
				<span>⚙️</span>
				<span>Customization</span>
			</h3>

			<div className="settings-grid">
				{/* Theme Selection */}
				<div>
					<label className="setting-label" style={{ marginBottom: '8px', display: 'block' }}>
						🎨 Theme
					</label>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
						{(['modern', 'minimal', 'colorful', 'dark'] as Theme[]).map((t) => (
							<button
								key={t}
								onClick={() => setTheme(t)}
								className="theme-button"
								style={{
									background: theme === t ? '#667eea' : 'rgba(255,255,255,0.95)',
									color: theme === t ? 'white' : '#22223b',
									border: theme === t ? '2px solid #667eea' : '2px solid #e5e7eb',
									textTransform: 'capitalize'
								}}
							>
								{t}
							</button>
						))}
					</div>
				</div>

				{/* Card Animation */}
				<div>
					<label className="setting-label" style={{ marginBottom: '8px', display: 'block' }}>
						✨ Drag Animation
					</label>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
						{(['rotate', 'scale', 'lift'] as const).map((anim) => (
							<button
								key={anim}
								onClick={() => setCardAnimation(anim)}
								className="theme-button"
								style={{
									background: cardAnimation === anim ? '#667eea' : 'rgba(255,255,255,0.95)',
									color: cardAnimation === anim ? 'white' : '#22223b',
									border: cardAnimation === anim ? '2px solid #667eea' : '2px solid #e5e7eb',
									textTransform: 'capitalize',
									fontSize: '12px',
									padding: '8px 4px'
								}}
							>
								{anim}
							</button>
						))}
					</div>
				</div>

				{/* Column Gap */}
				<div className="setting-group">
					<label className="setting-label" htmlFor="columnGap">
						📏 Column Gap: {columnGap}px
					</label>
					<input
						id="columnGap"
						type="range"
						min="8"
						max="32"
						value={columnGap}
						onChange={(e) => setColumnGap(Number(e.target.value))}
						style={{ flex: 1 }}
					/>
				</div>

				{/* Card Gap */}
				<div className="setting-group">
					<label className="setting-label" htmlFor="cardGap">
						📐 Card Gap: {cardGap}px
					</label>
					<input
						id="cardGap"
						type="range"
						min="4"
						max="20"
						value={cardGap}
						onChange={(e) => setCardGap(Number(e.target.value))}
						style={{ flex: 1 }}
					/>
				</div>

				{/* Toggles */}
				<div className="setting-group">
					<input
						type="checkbox"
						id="compact"
						checked={compactMode}
						onChange={(e) => setCompactMode(e.target.checked)}
					/>
					<label className="setting-label" htmlFor="compact">
						📦 Compact Mode
					</label>
				</div>

				<div className="setting-group">
					<input
						type="checkbox"
						id="emojis"
						checked={showEmojis}
						onChange={(e) => setShowEmojis(e.target.checked)}
					/>
					<label className="setting-label" htmlFor="emojis">
						😊 Show Emojis
					</label>
				</div>

				<div className="setting-group">
					<input
						type="checkbox"
						id="avatars"
						checked={showAvatars}
						onChange={(e) => setShowAvatars(e.target.checked)}
					/>
					<label className="setting-label" htmlFor="avatars">
						👤 Show Avatars
					</label>
				</div>

				<div className="setting-group">
					<input
						type="checkbox"
						id="tags"
						checked={showTags}
						onChange={(e) => setShowTags(e.target.checked)}
					/>
					<label className="setting-label" htmlFor="tags">
						🏷️ Show Tags
					</label>
				</div>

				<div className="setting-group">
					<input
						type="checkbox"
						id="priority"
						checked={showPriority}
						onChange={(e) => setShowPriority(e.target.checked)}
					/>
					<label className="setting-label" htmlFor="priority">
						⚡ Show Priority
					</label>
				</div>

				<div className="setting-group">
					<input
						type="checkbox"
						id="duedate"
						checked={showDueDate}
						onChange={(e) => setShowDueDate(e.target.checked)}
					/>
					<label className="setting-label" htmlFor="duedate">
						📅 Show Due Date
					</label>
				</div>
			</div>
		</div>
	);
}
