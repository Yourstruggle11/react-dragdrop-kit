import { useState, useEffect, useRef } from 'react';
import { Activity, Cpu, Clock, TrendingUp } from 'lucide-react';
import { colors, borderRadius, shadows, typography, spacing } from '../../constants/designSystem';
import { useThemeMode } from '../../contexts/ThemeContext';

interface PerformanceMetrics {
	fps: number;
	avgFps: number;
	dragCount: number;
	avgDragTime: number;
}

interface PerformanceMonitorProps {
	onDragStart?: () => void;
	onDragEnd?: () => void;
}

export default function PerformanceMonitor({ onDragStart, onDragEnd }: PerformanceMonitorProps) {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [metrics, setMetrics] = useState<PerformanceMetrics>({
		fps: 0,
		avgFps: 0,
		dragCount: 0,
		avgDragTime: 0,
	});
	const [isMinimized, setIsMinimized] = useState(false);

	const frameTimesRef = useRef<number[]>([]);
	const lastFrameTimeRef = useRef(performance.now());
	const dragStartTimeRef = useRef<number | null>(null);
	const dragTimesRef = useRef<number[]>([]);

	const bgColor = isDark ? colors.gray[800] : colors.white;
	const textColor = isDark ? colors.gray[100] : colors.gray[900];
	const mutedTextColor = isDark ? colors.gray[400] : colors.gray[600];
	const borderColor = isDark ? colors.gray[700] : colors.gray[200];

	useEffect(() => {
		let rafId: number;

		const measureFPS = () => {
			const now = performance.now();
			const delta = now - lastFrameTimeRef.current;
			lastFrameTimeRef.current = now;

			const fps = 1000 / delta;
			frameTimesRef.current.push(fps);

			// Keep only last 60 frames
			if (frameTimesRef.current.length > 60) {
				frameTimesRef.current.shift();
			}

			const avgFps =
				frameTimesRef.current.reduce((sum, f) => sum + f, 0) /
				frameTimesRef.current.length;

			setMetrics((prev) => ({
				...prev,
				fps: Math.round(fps),
				avgFps: Math.round(avgFps),
			}));

			rafId = requestAnimationFrame(measureFPS);
		};

		rafId = requestAnimationFrame(measureFPS);

		return () => {
			cancelAnimationFrame(rafId);
		};
	}, []);

	// Track drag performance
	useEffect(() => {
		const handleDragStart = () => {
			dragStartTimeRef.current = performance.now();
			onDragStart?.();
		};

		const handleDragEnd = () => {
			if (dragStartTimeRef.current !== null) {
				const dragTime = performance.now() - dragStartTimeRef.current;
				dragTimesRef.current.push(dragTime);

				// Keep only last 20 drags
				if (dragTimesRef.current.length > 20) {
					dragTimesRef.current.shift();
				}

				const avgDragTime =
					dragTimesRef.current.reduce((sum, t) => sum + t, 0) /
					dragTimesRef.current.length;

				setMetrics((prev) => ({
					...prev,
					dragCount: prev.dragCount + 1,
					avgDragTime: Math.round(avgDragTime),
				}));

				dragStartTimeRef.current = null;
				onDragEnd?.();
			}
		};

		document.addEventListener('dragstart', handleDragStart);
		document.addEventListener('dragend', handleDragEnd);

		return () => {
			document.removeEventListener('dragstart', handleDragStart);
			document.removeEventListener('dragend', handleDragEnd);
		};
	}, [onDragStart, onDragEnd]);

	const getFpsColor = (fps: number) => {
		if (fps >= 55) return colors.success.main;
		if (fps >= 30) return colors.warning.main;
		return colors.error.main;
	};

	if (isMinimized) {
		return (
			<button
				onClick={() => setIsMinimized(false)}
				style={{
					position: 'fixed',
					bottom: spacing[4],
					right: spacing[4],
					zIndex: 1000,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '56px',
					height: '56px',
					background: bgColor,
					border: `2px solid ${borderColor}`,
					borderRadius: borderRadius.full,
					boxShadow: shadows.xl,
					cursor: 'pointer',
					transition: 'all 0.2s',
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.transform = 'scale(1.05)';
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.transform = 'scale(1)';
				}}
				title="Show Performance Monitor"
			>
				<Activity size={24} color={getFpsColor(metrics.fps)} />
			</button>
		);
	}

	return (
		<div
			style={{
				position: 'fixed',
				bottom: spacing[4],
				right: spacing[4],
				zIndex: 1000,
				minWidth: '280px',
				background: bgColor,
				border: `2px solid ${borderColor}`,
				borderRadius: borderRadius.xl,
				boxShadow: shadows['2xl'],
				overflow: 'hidden',
			}}
		>
			{/* Header */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: spacing[3],
					background: isDark ? colors.gray[700] : colors.gray[100],
					borderBottom: `1px solid ${borderColor}`,
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
					<Activity size={18} color={colors.primary[500]} />
					<span
						style={{
							fontSize: typography.fontSize.sm,
							fontWeight: typography.fontWeight.semibold,
							color: textColor,
						}}
					>
						Performance Monitor
					</span>
				</div>
				<button
					onClick={() => setIsMinimized(true)}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '24px',
						height: '24px',
						background: 'transparent',
						border: 'none',
						borderRadius: borderRadius.base,
						cursor: 'pointer',
						color: mutedTextColor,
						transition: 'all 0.2s',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.background = isDark
							? colors.gray[600]
							: colors.gray[200];
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.background = 'transparent';
					}}
					title="Minimize"
				>
					−
				</button>
			</div>

			{/* Metrics */}
			<div style={{ padding: spacing[4] }}>
				{/* FPS */}
				<div style={{ marginBottom: spacing[4] }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: spacing[2],
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
							<Cpu size={16} color={mutedTextColor} />
							<span
								style={{
									fontSize: typography.fontSize.xs,
									color: mutedTextColor,
									textTransform: 'uppercase',
									letterSpacing: '0.05em',
									fontWeight: typography.fontWeight.semibold,
								}}
							>
								FPS
							</span>
						</div>
						<span
							style={{
								fontSize: typography.fontSize['2xl'],
								fontWeight: typography.fontWeight.bold,
								color: getFpsColor(metrics.fps),
							}}
						>
							{metrics.fps}
						</span>
					</div>
					<div
						style={{
							height: '4px',
							background: isDark ? colors.gray[700] : colors.gray[200],
							borderRadius: borderRadius.full,
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								height: '100%',
								width: `${Math.min((metrics.fps / 60) * 100, 100)}%`,
								background: getFpsColor(metrics.fps),
								transition: 'width 0.3s ease, background 0.3s ease',
							}}
						/>
					</div>
				</div>

				{/* Average FPS */}
				<div style={{ marginBottom: spacing[4] }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
							<TrendingUp size={16} color={mutedTextColor} />
							<span
								style={{
									fontSize: typography.fontSize.xs,
									color: mutedTextColor,
								}}
							>
								Avg FPS (60 frames)
							</span>
						</div>
						<span
							style={{
								fontSize: typography.fontSize.lg,
								fontWeight: typography.fontWeight.semibold,
								color: textColor,
							}}
						>
							{metrics.avgFps}
						</span>
					</div>
				</div>

				{/* Drag Stats */}
				<div
					style={{
						paddingTop: spacing[3],
						borderTop: `1px solid ${borderColor}`,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: spacing[3],
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
							<Clock size={16} color={mutedTextColor} />
							<span
								style={{
									fontSize: typography.fontSize.xs,
									color: mutedTextColor,
								}}
							>
								Total Drags
							</span>
						</div>
						<span
							style={{
								fontSize: typography.fontSize.lg,
								fontWeight: typography.fontWeight.semibold,
								color: textColor,
							}}
						>
							{metrics.dragCount}
						</span>
					</div>

					{metrics.avgDragTime > 0 && (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<span
								style={{
									fontSize: typography.fontSize.xs,
									color: mutedTextColor,
								}}
							>
								Avg Drag Time
							</span>
							<span
								style={{
									fontSize: typography.fontSize.sm,
									fontWeight: typography.fontWeight.medium,
									color: textColor,
								}}
							>
								{metrics.avgDragTime}ms
							</span>
						</div>
					)}
				</div>

				{/* Performance Tips */}
				{metrics.avgFps < 50 && (
					<div
						style={{
							marginTop: spacing[3],
							padding: spacing[3],
							background: colors.warning.bg,
							borderRadius: borderRadius.base,
						}}
					>
						<p
							style={{
								margin: 0,
								fontSize: typography.fontSize.xs,
								color: colors.warning.dark,
								fontWeight: typography.fontWeight.medium,
							}}
						>
							⚠️ Performance may be degraded. Try reducing the number of items or
							simplifying item rendering.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
