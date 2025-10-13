import { useState } from 'react';
import { DragDropList, type OrderUpdate } from 'react-dragdrop-kit';
import { Grid, List, Download, Trash2, Star, Eye } from 'lucide-react';
import { colors, borderRadius, shadows, transitions, typography, spacing } from '@/constants/designSystem';
import { useThemeMode } from '@/contexts/ThemeContext';
import toast from 'react-hot-toast';
import { useDebouncedToast } from '@/hooks/useDebouncedToast';
import CodeViewer from '@/components/CodeViewer';

interface GalleryImage {
	id: string;
	position: number;
	url: string;
	title: string;
	category: string;
	favorite: boolean;
	views: number;
}

const initialImages: GalleryImage[] = [
	{
		id: '1',
		position: 0,
		url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
		title: 'Mountain Landscape',
		category: 'Nature',
		favorite: true,
		views: 1543,
	},
	{
		id: '2',
		position: 1,
		url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop',
		title: 'Ocean Sunset',
		category: 'Nature',
		favorite: false,
		views: 892,
	},
	{
		id: '3',
		position: 2,
		url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop',
		title: 'Urban Architecture',
		category: 'Architecture',
		favorite: true,
		views: 2341,
	},
	{
		id: '4',
		position: 3,
		url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
		title: 'Portrait Photography',
		category: 'People',
		favorite: false,
		views: 3210,
	},
	{
		id: '5',
		position: 4,
		url: 'https://images.unsplash.com/photo-1682687220795-796d3f6f7000?w=400&h=300&fit=crop',
		title: 'Abstract Art',
		category: 'Art',
		favorite: false,
		views: 654,
	},
	{
		id: '6',
		position: 5,
		url: 'https://images.unsplash.com/photo-1682687221175-fd40bbafe6ca?w=400&h=300&fit=crop',
		title: 'City Lights',
		category: 'Urban',
		favorite: true,
		views: 1876,
	},
	{
		id: '7',
		position: 6,
		url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=400&h=300&fit=crop',
		title: 'Forest Path',
		category: 'Nature',
		favorite: false,
		views: 1234,
	},
	{
		id: '8',
		position: 7,
		url: 'https://images.unsplash.com/photo-1682687221038-404cb8830901?w=400&h=300&fit=crop',
		title: 'Modern Interior',
		category: 'Architecture',
		favorite: false,
		views: 987,
	},
];

export default function ImageGalleryExample() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [images, setImages] = useState<GalleryImage[]>(initialImages);
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
	const [filterCategory, setFilterCategory] = useState<string>('all');

	const bgColor = isDark ? colors.gray[900] : colors.gray[50];
	const cardBg = isDark ? colors.gray[800] : colors.white;
	const textColor = isDark ? colors.gray[100] : colors.gray[900];
	const mutedTextColor = isDark ? colors.gray[400] : colors.gray[600];
	const borderColor = isDark ? colors.gray[700] : colors.gray[200];

	const { showToast } = useDebouncedToast();

const handleReorder = (reordered: GalleryImage[], _updates: OrderUpdate[]) => {
		setImages(reordered);
		showToast('Images reordered!');
	};

	const toggleFavorite = (id: string) => {
		setImages(
			images.map((img) =>
				img.id === id ? { ...img, favorite: !img.favorite } : img
			)
		);
		const image = images.find((img) => img.id === id);
		toast.success(image?.favorite ? 'Removed from favorites' : 'Added to favorites');
	};

	const deleteImage = (id: string) => {
		setImages(images.filter((img) => img.id !== id));
		toast.success('Image deleted!');
	};

	const categories = ['all', ...Array.from(new Set(images.map((img) => img.category)))];

	const filteredImages =
		filterCategory === 'all'
			? images
			: images.filter((img) => img.category === filterCategory);

	const renderGridItem = (image: GalleryImage) => (
		<div
			style={{
				position: 'relative',
				borderRadius: borderRadius.xl,
				overflow: 'hidden',
				background: cardBg,
				border: `2px solid ${borderColor}`,
				transition: transitions.default,
				cursor: 'grab',
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = 'scale(1.02)';
				e.currentTarget.style.boxShadow = shadows.xl;
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = 'scale(1)';
				e.currentTarget.style.boxShadow = 'none';
			}}
		>
			{/* Image */}
			<div
				style={{
					position: 'relative',
					width: '100%',
					height: '200px',
					overflow: 'hidden',
					background: isDark ? colors.gray[700] : colors.gray[200],
				}}
			>
				<img
					src={image.url}
					alt={image.title}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>

				{/* Favorite Badge */}
				<button
					onClick={(e) => {
						e.stopPropagation();
						toggleFavorite(image.id);
					}}
					style={{
						position: 'absolute',
						top: spacing[2],
						right: spacing[2],
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '36px',
						height: '36px',
						background: image.favorite
							? colors.warning.main
							: 'rgba(0, 0, 0, 0.5)',
						backdropFilter: 'blur(8px)',
						border: 'none',
						borderRadius: borderRadius.full,
						cursor: 'pointer',
						transition: transitions.fast,
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'scale(1.1)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'scale(1)';
					}}
				>
					<Star
						size={18}
						color={colors.white}
						fill={image.favorite ? colors.white : 'none'}
					/>
				</button>
			</div>

			{/* Info */}
			<div style={{ padding: spacing[3] }}>
				<h3
					style={{
						margin: 0,
						marginBottom: spacing[1],
						fontSize: typography.fontSize.base,
						fontWeight: typography.fontWeight.semibold,
						color: textColor,
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}
				>
					{image.title}
				</h3>

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginBottom: spacing[2],
					}}
				>
					<span
						style={{
							padding: '4px 10px',
							background: isDark ? colors.gray[700] : colors.gray[100],
							color: mutedTextColor,
							borderRadius: borderRadius.base,
							fontSize: typography.fontSize.xs,
							fontWeight: typography.fontWeight.medium,
						}}
					>
						{image.category}
					</span>

					<span
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '4px',
							fontSize: typography.fontSize.xs,
							color: mutedTextColor,
						}}
					>
						<Eye size={12} />
						{image.views.toLocaleString()}
					</span>
				</div>

				{/* Actions */}
				<div style={{ display: 'flex', gap: spacing[2] }}>
					<button
						onClick={(e) => {
							e.stopPropagation();
							window.open(image.url, '_blank');
						}}
						style={{
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: spacing[1],
							padding: spacing[2],
							background: colors.primary[500],
							color: colors.white,
							border: 'none',
							borderRadius: borderRadius.base,
							fontSize: typography.fontSize.xs,
							fontWeight: typography.fontWeight.semibold,
							cursor: 'pointer',
							transition: transitions.fast,
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = colors.primary[600];
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = colors.primary[500];
						}}
					>
						<Download size={14} />
						Download
					</button>

					<button
						onClick={(e) => {
							e.stopPropagation();
							deleteImage(image.id);
						}}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							padding: spacing[2],
							background: 'transparent',
							border: `1px solid ${borderColor}`,
							borderRadius: borderRadius.base,
							cursor: 'pointer',
							color: colors.error.main,
							transition: transitions.fast,
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = colors.error.bg;
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = 'transparent';
						}}
					>
						<Trash2 size={14} />
					</button>
				</div>
			</div>
		</div>
	);

	const renderListItem = (image: GalleryImage) => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: spacing[4],
				padding: spacing[4],
				background: cardBg,
				border: `2px solid ${borderColor}`,
				borderRadius: borderRadius.lg,
				transition: transitions.default,
			}}
		>
			{/* Thumbnail */}
			<img
				src={image.url}
				alt={image.title}
				style={{
					width: '120px',
					height: '80px',
					objectFit: 'cover',
					borderRadius: borderRadius.base,
					flexShrink: 0,
				}}
			/>

			{/* Info */}
			<div style={{ flex: 1, minWidth: 0 }}>
				<h3
					style={{
						margin: 0,
						marginBottom: spacing[1],
						fontSize: typography.fontSize.lg,
						fontWeight: typography.fontWeight.semibold,
						color: textColor,
					}}
				>
					{image.title}
				</h3>
				<div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
					<span
						style={{
							padding: '4px 10px',
							background: isDark ? colors.gray[700] : colors.gray[100],
							color: mutedTextColor,
							borderRadius: borderRadius.base,
							fontSize: typography.fontSize.xs,
							fontWeight: typography.fontWeight.medium,
						}}
					>
						{image.category}
					</span>
					<span
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '4px',
							fontSize: typography.fontSize.sm,
							color: mutedTextColor,
						}}
					>
						<Eye size={14} />
						{image.views.toLocaleString()} views
					</span>
				</div>
			</div>

			{/* Actions */}
			<div style={{ display: 'flex', gap: spacing[2], flexShrink: 0 }}>
				<button
					onClick={() => toggleFavorite(image.id)}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '40px',
						height: '40px',
						background: image.favorite ? colors.warning.bg : 'transparent',
						border: `1px solid ${borderColor}`,
						borderRadius: borderRadius.base,
						cursor: 'pointer',
						color: image.favorite ? colors.warning.main : mutedTextColor,
						transition: transitions.fast,
					}}
				>
					<Star size={18} fill={image.favorite ? 'currentColor' : 'none'} />
				</button>
				<button
					onClick={() => window.open(image.url, '_blank')}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: spacing[2],
						padding: `${spacing[2]} ${spacing[4]}`,
						background: colors.primary[500],
						color: colors.white,
						border: 'none',
						borderRadius: borderRadius.base,
						fontSize: typography.fontSize.sm,
						fontWeight: typography.fontWeight.semibold,
						cursor: 'pointer',
						transition: transitions.fast,
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.background = colors.primary[600];
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.background = colors.primary[500];
					}}
				>
					<Download size={16} />
					Download
				</button>
				<button
					onClick={() => deleteImage(image.id)}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '40px',
						height: '40px',
						background: 'transparent',
						border: `1px solid ${borderColor}`,
						borderRadius: borderRadius.base,
						cursor: 'pointer',
						color: colors.error.main,
						transition: transitions.fast,
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.background = colors.error.bg;
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.background = 'transparent';
					}}
				>
					<Trash2 size={16} />
				</button>
			</div>
		</div>
	);

	const exampleCode = `import { useState } from 'react';
import { DragDropList } from 'react-dragdrop-kit';

function ImageGallery() {
  const [images, setImages] = useState([
    { id: '1', position: 0, url: '...', title: 'Mountain', category: 'Nature' },
    { id: '2', position: 1, url: '...', title: 'Ocean', category: 'Nature' },
  ]);

  return (
    <DragDropList
      items={images}
      onReorder={(reordered) => setImages(reordered)}
      renderItem={(image) => (
        <div>
          <img src={image.url} alt={image.title} />
          <h3>{image.title}</h3>
          <span>{image.category}</span>
        </div>
      )}
      direction="horizontal" // For grid layout
      showDropIndicator
      gap={16}
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
			<div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
						🖼️ Image Gallery Reordering
					</h1>
					<p
						style={{
							margin: 0,
							fontSize: typography.fontSize.lg,
							color: mutedTextColor,
							lineHeight: typography.lineHeight.relaxed,
						}}
					>
						Drag and drop to reorder your image collection. Switch between grid and list views, filter by category, and manage favorites.
					</p>
				</div>

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
							{filteredImages.length}
						</div>
						<div style={{ fontSize: typography.fontSize.sm, color: mutedTextColor, marginTop: spacing[1] }}>Total Images</div>
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
						<div style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: colors.warning.main }}>
							{images.filter((img) => img.favorite).length}
						</div>
						<div style={{ fontSize: typography.fontSize.sm, color: mutedTextColor, marginTop: spacing[1] }}>Favorites</div>
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
						<div style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: colors.info.main }}>
							{images.reduce((sum, img) => sum + img.views, 0).toLocaleString()}
						</div>
						<div style={{ fontSize: typography.fontSize.sm, color: mutedTextColor, marginTop: spacing[1] }}>Total Views</div>
					</div>
				</div>

				{/* Controls */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginBottom: spacing[6],
						flexWrap: 'wrap',
						gap: spacing[4],
					}}
				>
					{/* Category Filter */}
					<div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setFilterCategory(category)}
								style={{
									padding: `${spacing[2]} ${spacing[4]}`,
									background: filterCategory === category ? colors.primary[500] : cardBg,
									color: filterCategory === category ? colors.white : textColor,
									border: `1px solid ${filterCategory === category ? colors.primary[500] : borderColor}`,
									borderRadius: borderRadius.base,
									fontSize: typography.fontSize.sm,
									fontWeight: typography.fontWeight.medium,
									cursor: 'pointer',
									textTransform: 'capitalize',
									transition: transitions.fast,
								}}
							>
								{category}
							</button>
						))}
					</div>

					{/* View Mode Toggle */}
					<div style={{ display: 'flex', gap: spacing[2] }}>
						<button
							onClick={() => setViewMode('grid')}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: spacing[2],
								padding: `${spacing[2]} ${spacing[4]}`,
								background: viewMode === 'grid' ? colors.primary[500] : cardBg,
								color: viewMode === 'grid' ? colors.white : textColor,
								border: `1px solid ${viewMode === 'grid' ? colors.primary[500] : borderColor}`,
								borderRadius: borderRadius.base,
								fontSize: typography.fontSize.sm,
								fontWeight: typography.fontWeight.medium,
								cursor: 'pointer',
								transition: transitions.fast,
							}}
						>
							<Grid size={16} />
							Grid
						</button>
						<button
							onClick={() => setViewMode('list')}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: spacing[2],
								padding: `${spacing[2]} ${spacing[4]}`,
								background: viewMode === 'list' ? colors.primary[500] : cardBg,
								color: viewMode === 'list' ? colors.white : textColor,
								border: `1px solid ${viewMode === 'list' ? colors.primary[500] : borderColor}`,
								borderRadius: borderRadius.base,
								fontSize: typography.fontSize.sm,
								fontWeight: typography.fontWeight.medium,
								cursor: 'pointer',
								transition: transitions.fast,
							}}
						>
							<List size={16} />
							List
						</button>
					</div>
				</div>

				{/* Gallery */}
				{filteredImages.length === 0 ? (
					<div
						style={{
							padding: spacing[12],
							textAlign: 'center',
							color: mutedTextColor,
						}}
					>
						<p style={{ fontSize: typography.fontSize.xl, margin: 0 }}>No images in this category</p>
						<p style={{ fontSize: typography.fontSize.sm, margin: `${spacing[2]} 0 0 0` }}>Try selecting a different filter</p>
					</div>
				) : (
					<div style={{ marginBottom: spacing[8] }}>
						{viewMode === 'grid' ? (
							<DragDropList
								items={filteredImages}
								onReorder={handleReorder}
								renderItem={renderGridItem}
								containerStyle={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
									gap: spacing[4],
								}}
							/>
						) : (
							<DragDropList
								items={filteredImages}
								onReorder={handleReorder}
								renderItem={renderListItem}
								showDropIndicator
								gap={12}
							/>
						)}
					</div>
				)}

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
					<CodeViewer code={exampleCode} language="tsx" filename="ImageGallery.tsx" theme={mode} />
				</div>
			</div>
		</div>
	);
}
