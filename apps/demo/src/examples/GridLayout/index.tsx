import { useState } from 'react';
import { DragDropList } from 'react-dragdrop-kit';
import type { OrderUpdate } from 'react-dragdrop-kit';
import { useThemeMode } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius, shadows, typography } from '@/constants/designSystem';
import { useDebouncedToast } from '@/hooks/useDebouncedToast';
import { Layout, Grid3x3, Image, Video, FileText, Music, Code, Database } from 'lucide-react';

type MediaType = 'image' | 'video' | 'document' | 'audio' | 'code' | 'data';

interface MediaItem {
	id: string;
	position: number;
	title: string;
	type: MediaType;
	size: string;
	date: string;
	color: string;
	preview?: string;
}

const getTypeIcon = (type: MediaType) => {
	switch (type) {
		case 'image':
			return <Image size={24} />;
		case 'video':
			return <Video size={24} />;
		case 'document':
			return <FileText size={24} />;
		case 'audio':
			return <Music size={24} />;
		case 'code':
			return <Code size={24} />;
		case 'data':
			return <Database size={24} />;
	}
};

const initialItems: MediaItem[] = [
	{
		id: '1',
		position: 0,
		title: 'Sunset Photo',
		type: 'image',
		size: '2.4 MB',
		date: 'Dec 10',
		color: colors.orange[500],
		preview: '🌅'
	},
	{
		id: '2',
		position: 1,
		title: 'Tutorial Video',
		type: 'video',
		size: '45.2 MB',
		date: 'Dec 9',
		color: colors.purple[500],
		preview: '🎬'
	},
	{
		id: '3',
		position: 2,
		title: 'Project Spec',
		type: 'document',
		size: '156 KB',
		date: 'Dec 8',
		color: colors.blue[500],
		preview: '��'
	},
	{
		id: '4',
		position: 3,
		title: 'Podcast Episode',
		type: 'audio',
		size: '12.8 MB',
		date: 'Dec 7',
		color: colors.pink[500],
		preview: '🎧'
	},
	{
		id: '5',
		position: 4,
		title: 'App.tsx',
		type: 'code',
		size: '8.5 KB',
		date: 'Dec 10',
		color: colors.teal[500],
		preview: '💻'
	},
	{
		id: '6',
		position: 5,
		title: 'Users Database',
		type: 'data',
		size: '324 MB',
		date: 'Dec 6',
		color: colors.indigo[500],
		preview: '💾'
	},
	{
		id: '7',
		position: 6,
		title: 'Mountains Hike',
		type: 'image',
		size: '3.1 MB',
		date: 'Dec 5',
		color: colors.green[500],
		preview: '⛰️'
	},
	{
		id: '8',
		position: 7,
		title: 'Conference Talk',
		type: 'video',
		size: '128 MB',
		date: 'Dec 4',
		color: colors.red[500],
		preview: '🎤'
	},
	{
		id: '9',
		position: 8,
		title: 'Meeting Notes',
		type: 'document',
		size: '42 KB',
		date: 'Dec 10',
		color: colors.yellow[500],
		preview: '📝'
	},
	{
		id: '10',
		position: 9,
		title: 'Soundtrack',
		type: 'audio',
		size: '5.6 MB',
		date: 'Dec 3',
		color: colors.cyan[500],
		preview: '🎵'
	},
	{
		id: '11',
		position: 10,
		title: 'Utils.ts',
		type: 'code',
		size: '4.2 KB',
		date: 'Dec 10',
		color: colors.lime[500],
		preview: '⚙️'
	},
	{
		id: '12',
		position: 11,
		title: 'Analytics Data',
		type: 'data',
		size: '89 MB',
		date: 'Dec 2',
		color: colors.violet[500],
		preview: '📊'
	}
];

export default function GridLayoutExample() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [items, setItems] = useState<MediaItem[]>(initialItems);
	const [columns, setColumns] = useState<number>(4);
	const [filterType, setFilterType] = useState<MediaType | 'all'>('all');

	const { showToast } = useDebouncedToast();

const handleReorder = (reordered: MediaItem[], _updates: OrderUpdate[]) => {
		setItems(reordered);
		showToast('Items reordered!');
	};

	const getFilteredItems = () => {
		if (filterType === 'all') return items;
		return items.filter(item => item.type === filterType);
	};

	const filteredItems = getFilteredItems();
	const typeCount = (type: MediaType) => items.filter(item => item.type === type).length;

	const renderItem = (item: MediaItem) => {
		return (
			<div
				style={{
					background: isDark ? colors.gray[800] : colors.white,
					borderRadius: borderRadius.lg,
					boxShadow: shadows.md,
					overflow: 'hidden',
					transition: 'all 0.2s ease',
					cursor: 'grab',
					height: '100%',
					display: 'flex',
					flexDirection: 'column'
				}}
				onMouseEnter={e => {
					e.currentTarget.style.transform = 'translateY(-4px)';
					e.currentTarget.style.boxShadow = shadows.lg;
				}}
				onMouseLeave={e => {
					e.currentTarget.style.transform = 'translateY(0)';
					e.currentTarget.style.boxShadow = shadows.md;
				}}
			>
				{/* Preview Area */}
				<div
					style={{
						height: '140px',
						background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '48px',
						borderBottom: `3px solid ${item.color}`
					}}
				>
					{item.preview}
				</div>

				{/* Content */}
				<div style={{ padding: spacing.md, flex: 1, display: 'flex', flexDirection: 'column' }}>
					<div
						style={{
							fontSize: typography.fontSize.base,
							fontWeight: typography.fontWeight.semibold,
							color: isDark ? colors.white : colors.gray[900],
							marginBottom: spacing.xs,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap'
						}}
					>
						{item.title}
					</div>

					<div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.sm }}>
						<div style={{ color: item.color }}>{getTypeIcon(item.type)}</div>
						<span
							style={{
								fontSize: typography.fontSize.xs,
								color: isDark ? colors.gray[400] : colors.gray[600],
								textTransform: 'capitalize'
							}}
						>
							{item.type}
						</span>
					</div>

					<div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<span
							style={{
								fontSize: typography.fontSize.xs,
								color: isDark ? colors.gray[500] : colors.gray[500]
							}}
						>
							{item.size}
						</span>
						<span
							style={{
								fontSize: typography.fontSize.xs,
								color: isDark ? colors.gray[500] : colors.gray[500]
							}}
						>
							{item.date}
						</span>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div style={{ padding: spacing.xl }}>
			<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
				{/* Header */}
				<div style={{ marginBottom: spacing.xl }}>
					<h2
						style={{
							margin: 0,
							fontSize: typography.fontSize['2xl'],
							fontWeight: typography.fontWeight.bold,
							color: isDark ? colors.white : colors.gray[900],
							marginBottom: spacing.sm
						}}
					>
						Grid Layout
					</h2>
					<p
						style={{
							margin: 0,
							fontSize: typography.fontSize.base,
							color: isDark ? colors.gray[400] : colors.gray[600]
						}}
					>
						Drag and drop items in a responsive grid layout with automatic repositioning
					</p>
				</div>

				{/* Controls */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: spacing.md,
						marginBottom: spacing.xl,
						flexWrap: 'wrap'
					}}
				>
					{/* Column Controls */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: spacing.sm,
							padding: spacing.md,
							background: isDark ? colors.gray[800] : colors.white,
							borderRadius: borderRadius.lg,
							boxShadow: shadows.sm
						}}
					>
						<Layout size={20} style={{ color: isDark ? colors.gray[400] : colors.gray[600] }} />
						<span
							style={{
								fontSize: typography.fontSize.sm,
								color: isDark ? colors.gray[400] : colors.gray[600]
							}}
						>
							Columns:
						</span>
						{[2, 3, 4, 6].map(num => (
							<button
								key={num}
								onClick={() => setColumns(num)}
								style={{
									padding: `${spacing.xs} ${spacing.md}`,
									background: columns === num ? colors.primary[500] : isDark ? colors.gray[700] : colors.gray[100],
									border: 'none',
									borderRadius: borderRadius.md,
									fontSize: typography.fontSize.sm,
									fontWeight: typography.fontWeight.medium,
									color: columns === num ? colors.white : isDark ? colors.white : colors.gray[900],
									cursor: 'pointer',
									transition: 'all 0.2s ease'
								}}
								onMouseEnter={e => {
									if (columns !== num) {
										e.currentTarget.style.background = isDark ? colors.gray[600] : colors.gray[200];
									}
								}}
								onMouseLeave={e => {
									if (columns !== num) {
										e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
									}
								}}
							>
								{num}
							</button>
						))}
					</div>

					{/* Type Filter */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: spacing.sm,
							padding: spacing.md,
							background: isDark ? colors.gray[800] : colors.white,
							borderRadius: borderRadius.lg,
							boxShadow: shadows.sm
						}}
					>
						<Grid3x3 size={20} style={{ color: isDark ? colors.gray[400] : colors.gray[600] }} />
						<select
							value={filterType}
							onChange={e => setFilterType(e.target.value as MediaType | 'all')}
							style={{
								padding: `${spacing.xs} ${spacing.md}`,
								background: isDark ? colors.gray[700] : colors.gray[100],
								border: 'none',
								borderRadius: borderRadius.md,
								fontSize: typography.fontSize.sm,
								color: isDark ? colors.white : colors.gray[900],
								cursor: 'pointer',
								fontWeight: typography.fontWeight.medium
							}}
						>
							<option value="all">All Types ({items.length})</option>
							<option value="image">Images ({typeCount('image')})</option>
							<option value="video">Videos ({typeCount('video')})</option>
							<option value="document">Documents ({typeCount('document')})</option>
							<option value="audio">Audio ({typeCount('audio')})</option>
							<option value="code">Code ({typeCount('code')})</option>
							<option value="data">Data ({typeCount('data')})</option>
						</select>
					</div>

					{/* Stats */}
					<div
						style={{
							marginLeft: 'auto',
							padding: spacing.md,
							background: `linear-gradient(135deg, ${colors.primary[500]}20, ${colors.purple[500]}20)`,
							borderRadius: borderRadius.lg,
							border: `2px solid ${colors.primary[500]}`
						}}
					>
						<div
							style={{
								fontSize: typography.fontSize.sm,
								fontWeight: typography.fontWeight.semibold,
								color: isDark ? colors.white : colors.gray[900]
							}}
						>
							{filteredItems.length} items
						</div>
					</div>
				</div>

				{/* Grid */}
				<DragDropList
					items={filteredItems}
					onReorder={handleReorder}
					renderItem={renderItem}
					containerStyle={{
						display: 'grid',
						gridTemplateColumns: `repeat(${columns}, 1fr)`,
						gap: spacing.lg,
						gridAutoRows: '1fr'
					}}
				/>

				{/* Statistics */}
				<div
					style={{
						marginTop: spacing.xl,
						padding: spacing.lg,
						background: isDark ? colors.gray[800] : colors.white,
						borderRadius: borderRadius.lg,
						boxShadow: shadows.sm
					}}
				>
					<h3
						style={{
							margin: 0,
							marginBottom: spacing.md,
							fontSize: typography.fontSize.lg,
							fontWeight: typography.fontWeight.semibold,
							color: isDark ? colors.white : colors.gray[900]
						}}
					>
						Media Library Statistics
					</h3>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
							gap: spacing.md
						}}
					>
						{[
							{ label: 'Images', value: typeCount('image'), color: colors.orange[500], icon: <Image size={16} /> },
							{ label: 'Videos', value: typeCount('video'), color: colors.purple[500], icon: <Video size={16} /> },
							{
								label: 'Documents',
								value: typeCount('document'),
								color: colors.blue[500],
								icon: <FileText size={16} />
							},
							{ label: 'Audio', value: typeCount('audio'), color: colors.pink[500], icon: <Music size={16} /> },
							{ label: 'Code', value: typeCount('code'), color: colors.teal[500], icon: <Code size={16} /> },
							{ label: 'Data', value: typeCount('data'), color: colors.indigo[500], icon: <Database size={16} /> }
						].map(stat => (
							<div
								key={stat.label}
								style={{
									padding: spacing.md,
									background: `${stat.color}10`,
									borderRadius: borderRadius.md,
									border: `1px solid ${stat.color}40`
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.xs }}>
									<div style={{ color: stat.color }}>{stat.icon}</div>
									<div
										style={{
											fontSize: typography.fontSize.xs,
											color: isDark ? colors.gray[400] : colors.gray[600]
										}}
									>
										{stat.label}
									</div>
								</div>
								<div
									style={{
										fontSize: typography.fontSize.xl,
										fontWeight: typography.fontWeight.bold,
										color: stat.color
									}}
								>
									{stat.value}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Info Box */}
				<div
					style={{
						marginTop: spacing.lg,
						padding: spacing.lg,
						background: isDark ? `${colors.teal[500]}10` : `${colors.teal[500]}10`,
						border: `1px solid ${colors.teal[500]}`,
						borderRadius: borderRadius.lg
					}}
				>
					<h4
						style={{
							margin: 0,
							marginBottom: spacing.sm,
							fontSize: typography.fontSize.base,
							fontWeight: typography.fontWeight.semibold,
							color: colors.teal[500]
						}}
					>
						Grid Layout Features
					</h4>
					<ul
						style={{
							margin: 0,
							paddingLeft: spacing.xl,
							color: isDark ? colors.gray[300] : colors.gray[700],
							fontSize: typography.fontSize.sm,
							lineHeight: 1.6
						}}
					>
						<li>Responsive grid that adapts to different column counts</li>
						<li>Drag any item to reposition - grid automatically adjusts</li>
						<li>Filter by media type to focus on specific content</li>
						<li>Uniform card heights maintain clean grid alignment</li>
						<li>Hover effects provide visual feedback</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
