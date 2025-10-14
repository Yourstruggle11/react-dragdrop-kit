import React, { useState } from 'react';
import { DragDropList } from 'react-dragdrop-kit';
import type { OrderUpdate } from 'react-dragdrop-kit';
import { useThemeMode } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius, shadows, typography } from '@/constants/designSystem';
import toast from 'react-hot-toast';
import { useDebouncedToast } from '@/hooks/useDebouncedToast';
import {
	LayoutDashboard,
	TrendingUp,
	Users,
	DollarSign,
	Activity,
	ShoppingCart,
	BarChart3,
	PieChart,
	Calendar,
	Settings,
	Maximize2,
	Minimize2,
	RefreshCw,
	MoreVertical,
} from 'lucide-react';

type WidgetType = 'stats' | 'chart' | 'list' | 'calendar' | 'activity';
type WidgetSize = 'small' | 'medium' | 'large';

interface Widget {
	id: string;
	position: number;
	title: string;
	type: WidgetType;
	size: WidgetSize;
	icon: React.ReactNode;
	data?: any;
	color: string;
}

// Icons are imported directly where needed

const initialWidgets: Widget[] = [
	{
		id: '1',
		position: 0,
		title: 'Total Revenue',
		type: 'stats',
		size: 'small',
		icon: <DollarSign size={24} />,
		data: { value: '$45,231', change: '+12.5%', trend: 'up' },
		color: colors.success[500],
	},
	{
		id: '2',
		position: 1,
		title: 'Active Users',
		type: 'stats',
		size: 'small',
		icon: <Users size={24} />,
		data: { value: '2,345', change: '+5.2%', trend: 'up' },
		color: colors.primary[500],
	},
	{
		id: '3',
		position: 2,
		title: 'Sales Overview',
		type: 'chart',
		size: 'medium',
		icon: <BarChart3 size={24} />,
		data: { chartType: 'bar', values: [65, 59, 80, 81, 56, 55, 40] },
		color: colors.purple[500],
	},
	{
		id: '4',
		position: 3,
		title: 'Recent Orders',
		type: 'list',
		size: 'medium',
		icon: <ShoppingCart size={24} />,
		data: {
			items: [
				{ id: 1, name: 'Product A', amount: '$245', status: 'completed' },
				{ id: 2, name: 'Product B', amount: '$180', status: 'pending' },
				{ id: 3, name: 'Product C', amount: '$520', status: 'completed' },
				{ id: 4, name: 'Product D', amount: '$95', status: 'cancelled' },
			],
		},
		color: colors.orange[500],
	},
	{
		id: '5',
		position: 4,
		title: 'Traffic Sources',
		type: 'chart',
		size: 'small',
		icon: <PieChart size={24} />,
		data: { chartType: 'pie', values: [45, 30, 25] },
		color: colors.teal[500],
	},
	{
		id: '6',
		position: 5,
		title: 'Activity Feed',
		type: 'activity',
		size: 'medium',
		icon: <Activity size={24} />,
		data: {
			activities: [
				{ id: 1, action: 'New user registered', time: '5 min ago', type: 'user' },
				{ id: 2, action: 'Order #1234 completed', time: '12 min ago', type: 'order' },
				{ id: 3, action: 'Payment received', time: '25 min ago', type: 'payment' },
				{ id: 4, action: 'New comment posted', time: '1 hour ago', type: 'comment' },
			],
		},
		color: colors.pink[500],
	},
	{
		id: '7',
		position: 6,
		title: 'Monthly Target',
		type: 'stats',
		size: 'small',
		icon: <TrendingUp size={24} />,
		data: { value: '87%', change: '+3.1%', trend: 'up', progress: 87 },
		color: colors.indigo[500],
	},
	{
		id: '8',
		position: 7,
		title: 'Upcoming Events',
		type: 'calendar',
		size: 'medium',
		icon: <Calendar size={24} />,
		data: {
			events: [
				{ id: 1, title: 'Team Meeting', date: 'Today, 2:00 PM', color: colors.blue[500] },
				{ id: 2, title: 'Product Launch', date: 'Tomorrow, 10:00 AM', color: colors.purple[500] },
				{ id: 3, title: 'Client Call', date: 'Dec 15, 3:30 PM', color: colors.orange[500] },
			],
		},
		color: colors.blue[500],
	},
];

export default function DashboardWidgetsExample() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
	const [expandedWidgets, setExpandedWidgets] = useState<Set<string>>(new Set());
	const { showToast } = useDebouncedToast();

const handleReorder = (reordered: Widget[], _updates: OrderUpdate[]) => {
		setWidgets(reordered);
		showToast('Dashboard layout updated!');
	};

const toggleExpand = (widgetId: string) => {
		setExpandedWidgets((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(widgetId)) {
				newSet.delete(widgetId);
			} else {
				newSet.add(widgetId);
			}
			return newSet;
		});
	};

const refreshWidget = (_widgetId: string) => {
		toast.success('Widget refreshed!');
	};

	const getSizeStyles = (size: WidgetSize, isExpanded: boolean) => {
		if (isExpanded) {
			return { gridColumn: 'span 2' };
		}

		switch (size) {
			case 'small':
				return { gridColumn: 'span 1' };
			case 'medium':
				return { gridColumn: 'span 2' };
			case 'large':
				return { gridColumn: 'span 3' };
			default:
				return { gridColumn: 'span 1' };
		}
	};

	const renderWidgetContent = (widget: Widget) => {
		const isExpanded = expandedWidgets.has(widget.id);

		switch (widget.type) {
			case 'stats':
				return (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: spacing.md,
							padding: spacing.lg,
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
							<div
								style={{
									width: '48px',
									height: '48px',
									borderRadius: borderRadius.lg,
									background: `${widget.color}20`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: widget.color,
								}}
							>
								{widget.icon}
							</div>
							<div style={{ flex: 1 }}>
								<div
									style={{
										fontSize: typography.fontSize['2xl'],
										fontWeight: typography.fontWeight.bold,
										color: isDark ? colors.white : colors.gray[900],
									}}
								>
									{widget.data.value}
								</div>
								<div
									style={{
										fontSize: typography.fontSize.sm,
										color: widget.data.trend === 'up' ? colors.success[500] : colors.error[500],
										fontWeight: typography.fontWeight.medium,
									}}
								>
									{widget.data.change}
								</div>
							</div>
						</div>
						{widget.data.progress !== undefined && (
							<div style={{ marginTop: spacing.sm }}>
								<div
									style={{
										height: '8px',
										background: isDark ? colors.gray[700] : colors.gray[200],
										borderRadius: borderRadius.full,
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											height: '100%',
											width: `${widget.data.progress}%`,
											background: widget.color,
											transition: 'width 0.3s ease',
										}}
									/>
								</div>
								<div
									style={{
										marginTop: spacing.xs,
										fontSize: typography.fontSize.xs,
										color: isDark ? colors.gray[400] : colors.gray[600],
									}}
								>
									{widget.data.progress}% of monthly target
								</div>
							</div>
						)}
					</div>
				);

			case 'chart':
				return (
					<div style={{ padding: spacing.lg }}>
						{widget.data.chartType === 'bar' && (
							<div
								style={{
									display: 'flex',
									alignItems: 'flex-end',
									gap: spacing.sm,
									height: isExpanded ? '200px' : '120px',
									transition: 'height 0.3s ease',
								}}
							>
								{widget.data.values.map((value: number, idx: number) => (
									<div
										key={idx}
										style={{
											flex: 1,
											height: `${value}%`,
											background: widget.color,
											borderRadius: `${borderRadius.sm} ${borderRadius.sm} 0 0`,
											minHeight: '20px',
											transition: 'height 0.3s ease',
										}}
									/>
								))}
							</div>
						)}
						{widget.data.chartType === 'pie' && (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: spacing.xl,
									height: '120px',
								}}
							>
								<div
									style={{
										width: '80px',
										height: '80px',
										borderRadius: borderRadius.full,
										background: `conic-gradient(${widget.color} 0% 45%, ${colors.purple[500]} 45% 75%, ${colors.orange[500]} 75% 100%)`,
									}}
								/>
								<div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
									{['Direct', 'Referral', 'Social'].map((label, idx) => (
										<div key={label} style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
											<div
												style={{
													width: '12px',
													height: '12px',
													borderRadius: borderRadius.sm,
													background:
														idx === 0 ? widget.color : idx === 1 ? colors.purple[500] : colors.orange[500],
												}}
											/>
											<span
												style={{
													fontSize: typography.fontSize.sm,
													color: isDark ? colors.gray[400] : colors.gray[600],
												}}
											>
												{label}
											</span>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				);

			case 'list':
				return (
					<div style={{ padding: spacing.lg }}>
						<div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
							{widget.data.items.map((item: any) => (
								<div
									key={item.id}
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										padding: spacing.sm,
										background: isDark ? colors.gray[800] : colors.gray[50],
										borderRadius: borderRadius.md,
									}}
								>
									<div style={{ flex: 1 }}>
										<div
											style={{
												fontSize: typography.fontSize.sm,
												fontWeight: typography.fontWeight.medium,
												color: isDark ? colors.white : colors.gray[900],
											}}
										>
											{item.name}
										</div>
										<div
											style={{
												fontSize: typography.fontSize.xs,
												color: isDark ? colors.gray[400] : colors.gray[600],
											}}
										>
											{item.amount}
										</div>
									</div>
									<div
										style={{
											padding: `${spacing.xs} ${spacing.sm}`,
											borderRadius: borderRadius.full,
											fontSize: typography.fontSize.xs,
											fontWeight: typography.fontWeight.medium,
											background:
												item.status === 'completed'
													? `${colors.success[500]}20`
													: item.status === 'pending'
														? `${colors.warning[500]}20`
														: `${colors.error[500]}20`,
											color:
												item.status === 'completed'
													? colors.success[500]
													: item.status === 'pending'
														? colors.warning[500]
														: colors.error[500],
										}}
									>
										{item.status}
									</div>
								</div>
							))}
						</div>
					</div>
				);

			case 'activity':
				return (
					<div style={{ padding: spacing.lg }}>
						<div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
							{widget.data.activities.map((activity: any) => (
								<div key={activity.id} style={{ display: 'flex', gap: spacing.md }}>
									<div
										style={{
											width: '8px',
											height: '8px',
											marginTop: '6px',
											borderRadius: borderRadius.full,
											background: widget.color,
											flexShrink: 0,
										}}
									/>
									<div style={{ flex: 1 }}>
										<div
											style={{
												fontSize: typography.fontSize.sm,
												color: isDark ? colors.white : colors.gray[900],
											}}
										>
											{activity.action}
										</div>
										<div
											style={{
												fontSize: typography.fontSize.xs,
												color: isDark ? colors.gray[400] : colors.gray[600],
											}}
										>
											{activity.time}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				);

			case 'calendar':
				return (
					<div style={{ padding: spacing.lg }}>
						<div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
							{widget.data.events.map((event: any) => (
								<div
									key={event.id}
									style={{
										display: 'flex',
										gap: spacing.md,
										padding: spacing.md,
										background: isDark ? colors.gray[800] : colors.gray[50],
										borderRadius: borderRadius.md,
										borderLeft: `4px solid ${event.color}`,
									}}
								>
									<div style={{ flex: 1 }}>
										<div
											style={{
												fontSize: typography.fontSize.sm,
												fontWeight: typography.fontWeight.medium,
												color: isDark ? colors.white : colors.gray[900],
											}}
										>
											{event.title}
										</div>
										<div
											style={{
												fontSize: typography.fontSize.xs,
												color: isDark ? colors.gray[400] : colors.gray[600],
											}}
										>
											{event.date}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	const renderWidget = (widget: Widget) => {
		const isExpanded = expandedWidgets.has(widget.id);

		return (
			<div
				style={{
					background: isDark ? colors.gray[800] : colors.white,
					borderRadius: borderRadius.lg,
					boxShadow: shadows.md,
					overflow: 'hidden',
					transition: 'all 0.3s ease',
					...getSizeStyles(widget.size, isExpanded),
				}}
			>
				{/* Widget Header */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: spacing.lg,
						borderBottom: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
						<LayoutDashboard
							size={16}
							style={{ color: isDark ? colors.gray[400] : colors.gray[600] }}
						/>
						<h3
							style={{
								margin: 0,
								fontSize: typography.fontSize.base,
								fontWeight: typography.fontWeight.semibold,
								color: isDark ? colors.white : colors.gray[900],
							}}
						>
							{widget.title}
						</h3>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
						<button
							onClick={() => refreshWidget(widget.id)}
							style={{
								padding: spacing.xs,
								background: 'transparent',
								border: 'none',
								cursor: 'pointer',
								color: isDark ? colors.gray[400] : colors.gray[600],
								borderRadius: borderRadius.md,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transition: 'all 0.2s ease',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'transparent';
							}}
						>
							<RefreshCw size={16} />
						</button>
						<button
							onClick={() => toggleExpand(widget.id)}
							style={{
								padding: spacing.xs,
								background: 'transparent',
								border: 'none',
								cursor: 'pointer',
								color: isDark ? colors.gray[400] : colors.gray[600],
								borderRadius: borderRadius.md,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transition: 'all 0.2s ease',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'transparent';
							}}
						>
							{isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
						</button>
						<button
							style={{
								padding: spacing.xs,
								background: 'transparent',
								border: 'none',
								cursor: 'pointer',
								color: isDark ? colors.gray[400] : colors.gray[600],
								borderRadius: borderRadius.md,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transition: 'all 0.2s ease',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'transparent';
							}}
						>
							<MoreVertical size={16} />
						</button>
					</div>
				</div>

				{/* Widget Content */}
				{renderWidgetContent(widget)}
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
						marginBottom: spacing.sm,
					}}
				>
					Dashboard Widgets
				</h2>
				<p
					style={{
						margin: 0,
						fontSize: typography.fontSize.base,
						color: isDark ? colors.gray[400] : colors.gray[600],
					}}
				>
					Drag to reorganize your dashboard layout. Widgets automatically adjust their grid positions.
				</p>
			</div>

			{/* Controls */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: spacing.md,
					marginBottom: spacing.xl,
					padding: spacing.lg,
					background: isDark ? colors.gray[800] : colors.white,
					borderRadius: borderRadius.lg,
					boxShadow: shadows.sm,
				}}
			>
				<Settings size={20} style={{ color: isDark ? colors.gray[400] : colors.gray[600] }} />
				<div style={{ flex: 1 }}>
					<div
						style={{
							fontSize: typography.fontSize.sm,
							fontWeight: typography.fontWeight.medium,
							color: isDark ? colors.white : colors.gray[900],
						}}
					>
						Dashboard Controls
					</div>
					<div
						style={{
							fontSize: typography.fontSize.xs,
							color: isDark ? colors.gray[400] : colors.gray[600],
						}}
					>
						Refresh widgets, expand for more details, or customize the layout
					</div>
				</div>
				<button
					onClick={() => {
						setWidgets(initialWidgets);
						setExpandedWidgets(new Set());
						toast.success('Layout reset to default!');
					}}
					style={{
						padding: `${spacing.sm} ${spacing.lg}`,
						background: isDark ? colors.gray[700] : colors.gray[100],
						border: 'none',
						borderRadius: borderRadius.md,
						fontSize: typography.fontSize.sm,
						fontWeight: typography.fontWeight.medium,
						color: isDark ? colors.white : colors.gray[900],
						cursor: 'pointer',
						transition: 'all 0.2s ease',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.background = isDark ? colors.gray[600] : colors.gray[200];
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
					}}
				>
					Reset Layout
				</button>
			</div>

			{/* Dashboard Grid */}
			<DragDropList
				items={widgets}
				onReorder={handleReorder}
				renderItem={renderWidget}
				containerStyle={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: spacing.lg,
					gridAutoRows: 'auto',
				}}
			/>

			{/* Statistics */}
			<div
				style={{
					marginTop: spacing.xl,
					padding: spacing.lg,
					background: isDark ? colors.gray[800] : colors.white,
					borderRadius: borderRadius.lg,
					boxShadow: shadows.sm,
				}}
			>
				<h3
					style={{
						margin: 0,
						marginBottom: spacing.md,
						fontSize: typography.fontSize.lg,
						fontWeight: typography.fontWeight.semibold,
						color: isDark ? colors.white : colors.gray[900],
					}}
				>
					Dashboard Statistics
				</h3>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
						gap: spacing.md,
					}}
				>
					<div>
						<div
							style={{
								fontSize: typography.fontSize.sm,
								color: isDark ? colors.gray[400] : colors.gray[600],
							}}
						>
							Total Widgets
						</div>
						<div
							style={{
								fontSize: typography.fontSize.xl,
								fontWeight: typography.fontWeight.bold,
								color: isDark ? colors.white : colors.gray[900],
							}}
						>
							{widgets.length}
						</div>
					</div>
					<div>
						<div
							style={{
								fontSize: typography.fontSize.sm,
								color: isDark ? colors.gray[400] : colors.gray[600],
							}}
						>
							Expanded
						</div>
						<div
							style={{
								fontSize: typography.fontSize.xl,
								fontWeight: typography.fontWeight.bold,
								color: isDark ? colors.white : colors.gray[900],
							}}
						>
							{expandedWidgets.size}
						</div>
					</div>
					<div>
						<div
							style={{
								fontSize: typography.fontSize.sm,
								color: isDark ? colors.gray[400] : colors.gray[600],
							}}
						>
							Widget Types
						</div>
						<div
							style={{
								fontSize: typography.fontSize.xl,
								fontWeight: typography.fontWeight.bold,
								color: isDark ? colors.white : colors.gray[900],
							}}
						>
							{new Set(widgets.map((w) => w.type)).size}
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
	);
}
