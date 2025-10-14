import { useState } from 'react';
import { DragDropList, type OrderUpdate } from 'react-dragdrop-kit';
import { Play, Pause, SkipForward, SkipBack, Heart, Clock, Music2, Shuffle, Repeat } from 'lucide-react';
import { colors, borderRadius, shadows, transitions, typography, spacing } from '@/constants/designSystem';
import { useThemeMode } from '@/contexts/ThemeContext';
import toast from 'react-hot-toast';
import { useDebouncedToast } from '@/hooks/useDebouncedToast';
import CodeViewer from '@/components/CodeViewer';

interface Track {
	id: string;
	position: number;
	title: string;
	artist: string;
	album: string;
	duration: string; // MM:SS format
	coverUrl: string;
	liked: boolean;
	plays: number;
}

const initialTracks: Track[] = [
	{
		id: '1',
		position: 0,
		title: 'Blinding Lights',
		artist: 'The Weeknd',
		album: 'After Hours',
		duration: '3:20',
		coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
		liked: true,
		plays: 254000,
	},
	{
		id: '2',
		position: 1,
		title: 'Levitating',
		artist: 'Dua Lipa',
		album: 'Future Nostalgia',
		duration: '3:23',
		coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
		liked: false,
		plays: 189000,
	},
	{
		id: '3',
		position: 2,
		title: 'Save Your Tears',
		artist: 'The Weeknd',
		album: 'After Hours',
		duration: '3:35',
		coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
		liked: true,
		plays: 312000,
	},
	{
		id: '4',
		position: 3,
		title: 'Good 4 U',
		artist: 'Olivia Rodrigo',
		album: 'SOUR',
		duration: '2:58',
		coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
		liked: false,
		plays: 198000,
	},
	{
		id: '5',
		position: 4,
		title: 'Montero',
		artist: 'Lil Nas X',
		album: 'Montero',
		duration: '2:17',
		coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
		liked: true,
		plays: 267000,
	},
	{
		id: '6',
		position: 5,
		title: 'Peaches',
		artist: 'Justin Bieber',
		album: 'Justice',
		duration: '3:18',
		coverUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop',
		liked: false,
		plays: 145000,
	},
];

export default function MusicPlaylistExample() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [tracks, setTracks] = useState<Track[]>(initialTracks);
	const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const [repeat, setRepeat] = useState(false);

	const bgColor = isDark ? colors.gray[900] : colors.gray[50];
	const cardBg = isDark ? colors.gray[800] : colors.white;
	const textColor = isDark ? colors.gray[100] : colors.gray[900];
	const mutedTextColor = isDark ? colors.gray[400] : colors.gray[600];
	const borderColor = isDark ? colors.gray[700] : colors.gray[200];

	const currentTrack = currentTrackIndex !== null ? tracks[currentTrackIndex] : null;

	const { showToast } = useDebouncedToast();

const handleReorder = (reordered: Track[], _updates: OrderUpdate[]) => {
		setTracks(reordered);
		// Update current track index if it was moved
		if (currentTrack) {
			const newIndex = reordered.findIndex((t) => t.id === currentTrack.id);
			setCurrentTrackIndex(newIndex);
		}
		showToast('Playlist reordered!');
	};

	const toggleLike = (id: string) => {
		setTracks(tracks.map((track) => (track.id === id ? { ...track, liked: !track.liked } : track)));
		const track = tracks.find((t) => t.id === id);
		toast.success(track?.liked ? 'Removed from liked songs' : 'Added to liked songs');
	};

	const playTrack = (index: number) => {
		setCurrentTrackIndex(index);
		setIsPlaying(true);
		toast.success(`Now playing: ${tracks[index].title}`);
	};

	const togglePlayPause = () => {
		if (currentTrackIndex === null && tracks.length > 0) {
			playTrack(0);
		} else {
			setIsPlaying(!isPlaying);
		}
	};

	const playNext = () => {
		if (currentTrackIndex === null || tracks.length === 0) return;
		const nextIndex = (currentTrackIndex + 1) % tracks.length;
		playTrack(nextIndex);
	};

	const playPrevious = () => {
		if (currentTrackIndex === null || tracks.length === 0) return;
		const prevIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
		playTrack(prevIndex);
	};

	const getTotalDuration = () => {
		const totalSeconds = tracks.reduce((sum, track) => {
			const [min, sec] = track.duration.split(':').map(Number);
			return sum + min * 60 + sec;
		}, 0);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	const renderTrack = (track: Track, index: number) => {
		const isCurrentTrack = currentTrackIndex === index;

		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: spacing[3],
					padding: spacing[3],
					background: isCurrentTrack
						? isDark
							? colors.primary[900]
							: colors.primary[50]
						: cardBg,
					border: `2px solid ${isCurrentTrack ? colors.primary[500] : borderColor}`,
					borderRadius: borderRadius.lg,
					transition: transitions.default,
				}}
				onDoubleClick={() => playTrack(index)}
			>
				{/* Track Number / Playing Indicator */}
				<div
					style={{
						width: '32px',
						textAlign: 'center',
						fontSize: typography.fontSize.sm,
						fontWeight: typography.fontWeight.semibold,
						color: isCurrentTrack ? colors.primary[500] : mutedTextColor,
					}}
				>
					{isCurrentTrack && isPlaying ? <Music2 size={16} className="animate-pulse" /> : index + 1}
				</div>

				{/* Album Cover */}
				<img
					src={track.coverUrl}
					alt={track.album}
					style={{
						width: '48px',
						height: '48px',
						borderRadius: borderRadius.base,
						objectFit: 'cover',
						flexShrink: 0,
					}}
				/>

				{/* Track Info */}
				<div style={{ flex: 1, minWidth: 0 }}>
					<h3
						style={{
							margin: 0,
							marginBottom: '2px',
							fontSize: typography.fontSize.base,
							fontWeight: typography.fontWeight.semibold,
							color: isCurrentTrack ? colors.primary[500] : textColor,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{track.title}
					</h3>
					<p
						style={{
							margin: 0,
							fontSize: typography.fontSize.sm,
							color: mutedTextColor,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{track.artist} • {track.album}
					</p>
				</div>

				{/* Plays */}
				<span
					style={{
						fontSize: typography.fontSize.xs,
						color: mutedTextColor,
						display: 'none',
					}}
					className="desktop-only"
				>
					{track.plays.toLocaleString()} plays
				</span>

				{/* Duration */}
				<span
					style={{
						fontSize: typography.fontSize.sm,
						color: mutedTextColor,
						fontWeight: typography.fontWeight.medium,
						width: '48px',
						textAlign: 'right',
					}}
				>
					{track.duration}
				</span>

				{/* Actions */}
				<div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
					<button
						onClick={(e) => {
							e.stopPropagation();
							toggleLike(track.id);
						}}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '32px',
							height: '32px',
							background: 'transparent',
							border: 'none',
							borderRadius: borderRadius.base,
							cursor: 'pointer',
							color: track.liked ? colors.error.main : mutedTextColor,
							transition: transitions.fast,
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = 'scale(1.1)';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'scale(1)';
						}}
					>
						<Heart size={18} fill={track.liked ? 'currentColor' : 'none'} />
					</button>

					<button
						onClick={(e) => {
							e.stopPropagation();
							playTrack(index);
						}}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '32px',
							height: '32px',
							background: colors.primary[500],
							border: 'none',
							borderRadius: borderRadius.full,
							cursor: 'pointer',
							color: colors.white,
							transition: transitions.fast,
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = 'scale(1.1)';
							e.currentTarget.style.background = colors.primary[600];
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'scale(1)';
							e.currentTarget.style.background = colors.primary[500];
						}}
					>
						<Play size={14} fill="currentColor" />
					</button>
				</div>
			</div>
		);
	};

	const exampleCode = `import { useState } from 'react';
import { DragDropList } from 'react-dragdrop-kit';

function MusicPlaylist() {
  const [tracks, setTracks] = useState([
    { id: '1', position: 0, title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
    { id: '2', position: 1, title: 'Levitating', artist: 'Dua Lipa', duration: '3:23' },
  ]);
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <DragDropList
      items={tracks}
      onReorder={(reordered) => setTracks(reordered)}
      renderItem={(track, index) => (
        <div onDoubleClick={() => setCurrentTrack(track)}>
          <img src={track.coverUrl} alt={track.title} />
          <div>
            <h3>{track.title}</h3>
            <p>{track.artist}</p>
          </div>
          <span>{track.duration}</span>
        </div>
      )}
      showDropIndicator
      gap={8}
    />
  );
}`;

	return (
		<div
			style={{
				minHeight: '100vh',
				background: bgColor,
				padding: spacing[8],
			}}
		>
			<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
				{/* Header */}
				<div style={{ marginBottom: spacing[8] }}>
					<h1
						style={{
							margin: 0,
							marginBottom: spacing[3],
							fontSize: typography.fontSize['4xl'],
							fontWeight: typography.fontWeight.bold,
							color: textColor,
						}}
					>
						🎵 Music Playlist Editor
					</h1>
					<p
						style={{
							margin: 0,
							fontSize: typography.fontSize.lg,
							color: mutedTextColor,
							lineHeight: typography.lineHeight.relaxed,
						}}
					>
						Create and manage your playlist with drag-and-drop reordering. Double-click any track to play it.
					</p>
				</div>

				{/* Now Playing Card */}
				{currentTrack && (
					<div
						style={{
							marginBottom: spacing[8],
							padding: spacing[6],
							background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.secondary[600]} 100%)`,
							borderRadius: borderRadius.xl,
							boxShadow: shadows.xl,
							color: colors.white,
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: spacing[6], marginBottom: spacing[6] }}>
							<img
								src={currentTrack.coverUrl}
								alt={currentTrack.album}
								style={{
									width: '120px',
									height: '120px',
									borderRadius: borderRadius.lg,
									boxShadow: shadows.xl,
								}}
							/>
							<div style={{ flex: 1 }}>
								<p
									style={{
										margin: 0,
										marginBottom: spacing[1],
										fontSize: typography.fontSize.sm,
										opacity: 0.9,
										textTransform: 'uppercase',
										letterSpacing: '0.1em',
										fontWeight: typography.fontWeight.semibold,
									}}
								>
									Now Playing
								</p>
								<h2
									style={{
										margin: 0,
										marginBottom: spacing[2],
										fontSize: typography.fontSize['3xl'],
										fontWeight: typography.fontWeight.bold,
									}}
								>
									{currentTrack.title}
								</h2>
								<p
									style={{
										margin: 0,
										fontSize: typography.fontSize.lg,
										opacity: 0.9,
									}}
								>
									{currentTrack.artist} • {currentTrack.album}
								</p>
							</div>
						</div>

						{/* Playback Controls */}
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing[4] }}>
							<button
								onClick={() => setShuffle(!shuffle)}
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '40px',
									height: '40px',
									background: shuffle ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
									border: 'none',
									borderRadius: borderRadius.full,
									cursor: 'pointer',
									color: colors.white,
									transition: transitions.fast,
								}}
							>
								<Shuffle size={20} />
							</button>

							<button
								onClick={playPrevious}
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '48px',
									height: '48px',
									background: 'rgba(255, 255, 255, 0.2)',
									border: 'none',
									borderRadius: borderRadius.full,
									cursor: 'pointer',
									color: colors.white,
									transition: transitions.fast,
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
								}}
							>
								<SkipBack size={24} fill="currentColor" />
							</button>

							<button
								onClick={togglePlayPause}
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '64px',
									height: '64px',
									background: colors.white,
									border: 'none',
									borderRadius: borderRadius.full,
									cursor: 'pointer',
									color: colors.primary[600],
									transition: transitions.fast,
									boxShadow: shadows.xl,
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'scale(1.05)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'scale(1)';
								}}
							>
								{isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" style={{ marginLeft: '4px' }} />}
							</button>

							<button
								onClick={playNext}
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '48px',
									height: '48px',
									background: 'rgba(255, 255, 255, 0.2)',
									border: 'none',
									borderRadius: borderRadius.full,
									cursor: 'pointer',
									color: colors.white,
									transition: transitions.fast,
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
								}}
							>
								<SkipForward size={24} fill="currentColor" />
							</button>

							<button
								onClick={() => setRepeat(!repeat)}
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '40px',
									height: '40px',
									background: repeat ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
									border: 'none',
									borderRadius: borderRadius.full,
									cursor: 'pointer',
									color: colors.white,
									transition: transitions.fast,
								}}
							>
								<Repeat size={20} />
							</button>
						</div>
					</div>
				)}

				{/* Stats */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
						gap: spacing[4],
						marginBottom: spacing[6],
					}}
				>
					<div
						style={{
							padding: spacing[4],
							background: cardBg,
							border: `1px solid ${borderColor}`,
							borderRadius: borderRadius.lg,
							textAlign: 'center',
						}}
					>
						<div style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: textColor }}>
							{tracks.length}
						</div>
						<div style={{ fontSize: typography.fontSize.sm, color: mutedTextColor, marginTop: spacing[1] }}>Tracks</div>
					</div>
					<div
						style={{
							padding: spacing[4],
							background: cardBg,
							border: `1px solid ${borderColor}`,
							borderRadius: borderRadius.lg,
							textAlign: 'center',
						}}
					>
						<div style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: textColor }}>
							<Clock size={32} style={{ display: 'inline' }} /> {getTotalDuration()}
						</div>
						<div style={{ fontSize: typography.fontSize.sm, color: mutedTextColor, marginTop: spacing[1] }}>Total Duration</div>
					</div>
					<div
						style={{
							padding: spacing[4],
							background: cardBg,
							border: `1px solid ${borderColor}`,
							borderRadius: borderRadius.lg,
							textAlign: 'center',
						}}
					>
						<div style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: colors.error.main }}>
							{tracks.filter((t) => t.liked).length}
						</div>
						<div style={{ fontSize: typography.fontSize.sm, color: mutedTextColor, marginTop: spacing[1] }}>Liked Songs</div>
					</div>
				</div>

				{/* Playlist */}
				<div style={{ marginBottom: spacing[8] }}>
					<h2
						style={{
							margin: `0 0 ${spacing[4]} 0`,
							fontSize: typography.fontSize['2xl'],
							fontWeight: typography.fontWeight.bold,
							color: textColor,
						}}
					>
						Your Playlist
					</h2>

					<DragDropList
						items={tracks}
						onReorder={handleReorder}
						renderItem={(track, index) => renderTrack(track, index)}
						showDropIndicator
						gap={8}
					/>
				</div>

				{/* Code Example */}
				<div>
					<h2
						style={{
							margin: `0 0 ${spacing[4]} 0`,
							fontSize: typography.fontSize['2xl'],
							fontWeight: typography.fontWeight.bold,
							color: textColor,
						}}
					>
						📝 Code Example
					</h2>
					<CodeViewer code={exampleCode} language="tsx" filename="MusicPlaylist.tsx" theme={mode} />
				</div>

				<style>{`
					@media (min-width: 768px) {
						.desktop-only {
							display: block !important;
						}
					}

					.animate-pulse {
						animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
					}

					@keyframes pulse {
						0%, 100% {
							opacity: 1;
						}
						50% {
							opacity: 0.5;
						}
					}
				`}</style>
			</div>
		</div>
	);
}
