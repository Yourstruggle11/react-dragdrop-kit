import React, { useState } from 'react';
import { DragDropList } from 'react-dragdrop-kit';
import type { OrderUpdate } from 'react-dragdrop-kit';
import { useThemeMode } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius, shadows, typography } from '@/constants/designSystem';
import toast from 'react-hot-toast';
import { useDebouncedToast } from '@/hooks/useDebouncedToast';
import { CheckSquare, Square, Trash2, Copy, ArrowRight, Users, Filter } from 'lucide-react';

interface Contact {
	id: string;
	position: number;
	name: string;
	email: string;
	role: string;
	department: string;
	avatar: string;
}

const initialContacts: Contact[] = [
	{
		id: '1',
		position: 0,
		name: 'Alice Johnson',
		email: 'alice.j@company.com',
		role: 'Senior Developer',
		department: 'Engineering',
		avatar: '👩‍💻'
	},
	{
		id: '2',
		position: 1,
		name: 'Bob Smith',
		email: 'bob.s@company.com',
		role: 'Product Manager',
		department: 'Product',
		avatar: '👨‍💼'
	},
	{
		id: '3',
		position: 2,
		name: 'Carol White',
		email: 'carol.w@company.com',
		role: 'UX Designer',
		department: 'Design',
		avatar: '👩‍🎨'
	},
	{
		id: '4',
		position: 3,
		name: 'David Lee',
		email: 'david.l@company.com',
		role: 'DevOps Engineer',
		department: 'Engineering',
		avatar: '👨‍🔧'
	},
	{
		id: '5',
		position: 4,
		name: 'Emma Davis',
		email: 'emma.d@company.com',
		role: 'Marketing Lead',
		department: 'Marketing',
		avatar: '👩‍💼'
	},
	{
		id: '6',
		position: 5,
		name: 'Frank Wilson',
		email: 'frank.w@company.com',
		role: 'QA Engineer',
		department: 'Engineering',
		avatar: '👨‍🔬'
	},
	{
		id: '7',
		position: 6,
		name: 'Grace Taylor',
		email: 'grace.t@company.com',
		role: 'Data Analyst',
		department: 'Analytics',
		avatar: '👩‍💻'
	},
	{
		id: '8',
		position: 7,
		name: 'Henry Brown',
		email: 'henry.b@company.com',
		role: 'Sales Manager',
		department: 'Sales',
		avatar: '👨‍💼'
	}
];

export default function MultiSelectExample() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [contacts, setContacts] = useState<Contact[]>(initialContacts);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [filterDepartment, setFilterDepartment] = useState<string>('all');

	const { showToast } = useDebouncedToast();

const handleReorder = (reordered: Contact[], _updates: OrderUpdate[]) => {
		setContacts(reordered);
		showToast('Contacts reordered!');
	};

	const toggleSelect = (id: string, event?: React.MouseEvent) => {
		if (event?.shiftKey && selectedIds.size > 0) {
			// Shift+click: select range
			const lastSelected = Array.from(selectedIds).pop();
			const lastIndex = contacts.findIndex(c => c.id === lastSelected);
			const currentIndex = contacts.findIndex(c => c.id === id);
			const start = Math.min(lastIndex, currentIndex);
			const end = Math.max(lastIndex, currentIndex);
			const rangeIds = contacts.slice(start, end + 1).map(c => c.id);
			setSelectedIds(new Set([...selectedIds, ...rangeIds]));
		} else if (event?.ctrlKey || event?.metaKey) {
			// Ctrl/Cmd+click: toggle individual
			const newSet = new Set(selectedIds);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			setSelectedIds(newSet);
		} else {
			// Regular click: toggle single
			const newSet = new Set(selectedIds);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			setSelectedIds(newSet);
		}
	};

	const selectAll = () => {
		const filteredContacts = getFilteredContacts();
		setSelectedIds(new Set(filteredContacts.map(c => c.id)));
		toast.success('All contacts selected!');
	};

	const deselectAll = () => {
		setSelectedIds(new Set());
		toast.success('Selection cleared!');
	};

	const deleteSelected = () => {
		const remaining = contacts.filter(c => !selectedIds.has(c.id));
		setContacts(remaining.map((c, idx) => ({ ...c, position: idx })));
		setSelectedIds(new Set());
		toast.success(`Deleted ${selectedIds.size} contact(s)!`);
	};

	const duplicateSelected = () => {
		const toDuplicate = contacts.filter(c => selectedIds.has(c.id));
		const duplicates = toDuplicate.map((c, idx) => ({
			...c,
			id: `${c.id}-copy-${Date.now()}-${idx}`,
			position: contacts.length + idx,
			name: `${c.name} (Copy)`
		}));
		setContacts([...contacts, ...duplicates]);
		toast.success(`Duplicated ${selectedIds.size} contact(s)!`);
	};

	const moveSelectedToTop = () => {
		const selected = contacts.filter(c => selectedIds.has(c.id));
		const notSelected = contacts.filter(c => !selectedIds.has(c.id));
		const reordered = [...selected, ...notSelected].map((c, idx) => ({ ...c, position: idx }));
		setContacts(reordered);
		toast.success('Moved selected to top!');
	};

	const getFilteredContacts = () => {
		if (filterDepartment === 'all') return contacts;
		return contacts.filter(c => c.department === filterDepartment);
	};

	const departments = Array.from(new Set(contacts.map(c => c.department)));
	const filteredContacts = getFilteredContacts();

	const renderContact = (contact: Contact) => {
		const isSelected = selectedIds.has(contact.id);

		return (
			<div
				onClick={e => toggleSelect(contact.id, e)}
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: spacing.md,
					padding: spacing.lg,
					background: isSelected
						? isDark
							? `${colors.primary[500]}20`
							: `${colors.primary[500]}10`
						: isDark
						? colors.gray[800]
						: colors.white,
					border: `2px solid ${isSelected ? colors.primary[500] : isDark ? colors.gray[700] : colors.gray[200]}`,
					borderRadius: borderRadius.lg,
					cursor: 'pointer',
					transition: 'all 0.2s ease',
					userSelect: 'none'
				}}
				onMouseEnter={e => {
					if (!isSelected) {
						e.currentTarget.style.borderColor = isDark ? colors.gray[600] : colors.gray[300];
					}
				}}
				onMouseLeave={e => {
					if (!isSelected) {
						e.currentTarget.style.borderColor = isDark ? colors.gray[700] : colors.gray[200];
					}
				}}
			>
				{/* Selection Checkbox */}
				<div style={{ color: isSelected ? colors.primary[500] : isDark ? colors.gray[400] : colors.gray[400] }}>
					{isSelected ? <CheckSquare size={20} /> : <Square size={20} />}
				</div>

				{/* Avatar */}
				<div
					style={{
						width: '48px',
						height: '48px',
						borderRadius: borderRadius.full,
						background: isDark ? colors.gray[700] : colors.gray[100],
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: typography.fontSize['2xl']
					}}
				>
					{contact.avatar}
				</div>

				{/* Contact Info */}
				<div style={{ flex: 1 }}>
					<div
						style={{
							fontSize: typography.fontSize.base,
							fontWeight: typography.fontWeight.semibold,
							color: isDark ? colors.white : colors.gray[900],
							marginBottom: spacing.xs
						}}
					>
						{contact.name}
					</div>
					<div
						style={{
							fontSize: typography.fontSize.sm,
							color: isDark ? colors.gray[400] : colors.gray[600],
							marginBottom: spacing.xs
						}}
					>
						{contact.email}
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
						<span
							style={{
								fontSize: typography.fontSize.xs,
								padding: `${spacing.xs} ${spacing.sm}`,
								background: isDark ? colors.gray[700] : colors.gray[100],
								borderRadius: borderRadius.full,
								color: isDark ? colors.gray[300] : colors.gray[700]
							}}
						>
							{contact.role}
						</span>
						<span
							style={{
								fontSize: typography.fontSize.xs,
								padding: `${spacing.xs} ${spacing.sm}`,
								background: `${colors.primary[500]}20`,
								borderRadius: borderRadius.full,
								color: colors.primary[500]
							}}
						>
							{contact.department}
						</span>
					</div>
				</div>

				{/* Selection Badge */}
				{isSelected && (
					<div
						style={{
							padding: `${spacing.xs} ${spacing.sm}`,
							background: colors.primary[500],
							borderRadius: borderRadius.full,
							fontSize: typography.fontSize.xs,
							fontWeight: typography.fontWeight.medium,
							color: colors.white
						}}
					>
						Selected
					</div>
				)}
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
						Multi-Selection Drag & Drop
					</h2>
					<p
						style={{
							margin: 0,
							fontSize: typography.fontSize.base,
							color: isDark ? colors.gray[400] : colors.gray[600],
							marginBottom: spacing.sm
						}}
					>
						Click to select, Ctrl/Cmd+Click for multiple, Shift+Click for range selection
					</p>
					<div
						style={{
							padding: spacing.md,
							background: isDark ? `${colors.info[500]}10` : `${colors.info[500]}10`,
							border: `2px solid ${colors.info[500]}`,
							borderRadius: borderRadius.md,
							fontSize: typography.fontSize.sm,
							color: isDark ? colors.info[300] : colors.info[700]
						}}
					>
						<strong>Note:</strong> This example demonstrates visual multi-selection with bulk actions. The underlying
						drag library currently supports dragging one item at a time. Use the "Move to Top" button to move all
						selected items together, or drag individual items to reorder them.
					</div>
				</div>

				{/* Bulk Actions Bar */}
				{selectedIds.size > 0 && (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: spacing.md,
							padding: spacing.lg,
							background: `${colors.primary[500]}10`,
							border: `2px solid ${colors.primary[500]}`,
							borderRadius: borderRadius.lg,
							marginBottom: spacing.lg
						}}
					>
						<Users size={20} style={{ color: colors.primary[500] }} />
						<div style={{ flex: 1 }}>
							<div
								style={{
									fontSize: typography.fontSize.sm,
									fontWeight: typography.fontWeight.semibold,
									color: isDark ? colors.white : colors.gray[900]
								}}
							>
								{selectedIds.size} contact{selectedIds.size !== 1 ? 's' : ''} selected
							</div>
						</div>
						<button
							onClick={moveSelectedToTop}
							style={{
								padding: `${spacing.sm} ${spacing.lg}`,
								background: colors.primary[500],
								border: 'none',
								borderRadius: borderRadius.md,
								fontSize: typography.fontSize.sm,
								fontWeight: typography.fontWeight.medium,
								color: colors.white,
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								gap: spacing.xs,
								transition: 'all 0.2s ease'
							}}
							onMouseEnter={e => {
								e.currentTarget.style.background = colors.primary[600];
							}}
							onMouseLeave={e => {
								e.currentTarget.style.background = colors.primary[500];
							}}
						>
							<ArrowRight size={16} />
							Move to Top
						</button>
						<button
							onClick={duplicateSelected}
							style={{
								padding: `${spacing.sm} ${spacing.lg}`,
								background: isDark ? colors.gray[700] : colors.gray[100],
								border: 'none',
								borderRadius: borderRadius.md,
								fontSize: typography.fontSize.sm,
								fontWeight: typography.fontWeight.medium,
								color: isDark ? colors.white : colors.gray[900],
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								gap: spacing.xs,
								transition: 'all 0.2s ease'
							}}
							onMouseEnter={e => {
								e.currentTarget.style.background = isDark ? colors.gray[600] : colors.gray[200];
							}}
							onMouseLeave={e => {
								e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
							}}
						>
							<Copy size={16} />
							Duplicate
						</button>
						<button
							onClick={deleteSelected}
							style={{
								padding: `${spacing.sm} ${spacing.lg}`,
								background: colors.error[500],
								border: 'none',
								borderRadius: borderRadius.md,
								fontSize: typography.fontSize.sm,
								fontWeight: typography.fontWeight.medium,
								color: colors.white,
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								gap: spacing.xs,
								transition: 'all 0.2s ease'
							}}
							onMouseEnter={e => {
								e.currentTarget.style.background = colors.error[600];
							}}
							onMouseLeave={e => {
								e.currentTarget.style.background = colors.error[500];
							}}
						>
							<Trash2 size={16} />
							Delete
						</button>
						<button
							onClick={deselectAll}
							style={{
								padding: `${spacing.sm} ${spacing.lg}`,
								background: 'transparent',
								border: `2px solid ${isDark ? colors.gray[600] : colors.gray[300]}`,
								borderRadius: borderRadius.md,
								fontSize: typography.fontSize.sm,
								fontWeight: typography.fontWeight.medium,
								color: isDark ? colors.white : colors.gray[900],
								cursor: 'pointer',
								transition: 'all 0.2s ease'
							}}
							onMouseEnter={e => {
								e.currentTarget.style.borderColor = isDark ? colors.gray[500] : colors.gray[400];
							}}
							onMouseLeave={e => {
								e.currentTarget.style.borderColor = isDark ? colors.gray[600] : colors.gray[300];
							}}
						>
							Clear
						</button>
					</div>
				)}

				{/* Filter and Selection Controls */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: spacing.md,
						marginBottom: spacing.lg,
						flexWrap: 'wrap'
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
						<Filter size={16} style={{ color: isDark ? colors.gray[400] : colors.gray[600] }} />
						<select
							value={filterDepartment}
							onChange={e => setFilterDepartment(e.target.value)}
							style={{
								padding: `${spacing.sm} ${spacing.md}`,
								background: isDark ? colors.gray[800] : colors.white,
								border: `2px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
								borderRadius: borderRadius.md,
								fontSize: typography.fontSize.sm,
								color: isDark ? colors.white : colors.gray[900],
								cursor: 'pointer'
							}}
						>
							<option value="all">All Departments</option>
							{departments.map(dept => (
								<option key={dept} value={dept}>
									{dept}
								</option>
							))}
						</select>
					</div>

					<div style={{ flex: 1 }} />

					<button
						onClick={selectAll}
						style={{
							padding: `${spacing.sm} ${spacing.lg}`,
							background: isDark ? colors.gray[700] : colors.gray[100],
							border: 'none',
							borderRadius: borderRadius.md,
							fontSize: typography.fontSize.sm,
							fontWeight: typography.fontWeight.medium,
							color: isDark ? colors.white : colors.gray[900],
							cursor: 'pointer',
							transition: 'all 0.2s ease'
						}}
						onMouseEnter={e => {
							e.currentTarget.style.background = isDark ? colors.gray[600] : colors.gray[200];
						}}
						onMouseLeave={e => {
							e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
						}}
					>
						Select All
					</button>
				</div>

				{/* Contact List */}
				<DragDropList
					items={filteredContacts}
					onReorder={handleReorder}
					renderItem={renderContact}
					containerStyle={{
						display: 'flex',
						flexDirection: 'column',
						gap: spacing.md
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
						Selection Statistics
					</h3>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
							gap: spacing.md
						}}
					>
						<div>
							<div
								style={{
									fontSize: typography.fontSize.sm,
									color: isDark ? colors.gray[400] : colors.gray[600]
								}}
							>
								Total Contacts
							</div>
							<div
								style={{
									fontSize: typography.fontSize.xl,
									fontWeight: typography.fontWeight.bold,
									color: isDark ? colors.white : colors.gray[900]
								}}
							>
								{contacts.length}
							</div>
						</div>
						<div>
							<div
								style={{
									fontSize: typography.fontSize.sm,
									color: isDark ? colors.gray[400] : colors.gray[600]
								}}
							>
								Selected
							</div>
							<div
								style={{
									fontSize: typography.fontSize.xl,
									fontWeight: typography.fontWeight.bold,
									color: colors.primary[500]
								}}
							>
								{selectedIds.size}
							</div>
						</div>
						<div>
							<div
								style={{
									fontSize: typography.fontSize.sm,
									color: isDark ? colors.gray[400] : colors.gray[600]
								}}
							>
								Departments
							</div>
							<div
								style={{
									fontSize: typography.fontSize.xl,
									fontWeight: typography.fontWeight.bold,
									color: isDark ? colors.white : colors.gray[900]
								}}
							>
								{departments.length}
							</div>
						</div>
					</div>
				</div>

				{/* Instructions */}
				<div
					style={{
						marginTop: spacing.lg,
						padding: spacing.lg,
						background: isDark ? `${colors.blue[500]}10` : `${colors.blue[500]}10`,
						border: `1px solid ${colors.blue[500]}`,
						borderRadius: borderRadius.lg
					}}
				>
					<h4
						style={{
							margin: 0,
							marginBottom: spacing.sm,
							fontSize: typography.fontSize.base,
							fontWeight: typography.fontWeight.semibold,
							color: colors.blue[500]
						}}
					>
						Selection Tips
					</h4>
					<ul
						style={{
							margin: 0,
							paddingLeft: spacing.xl,
							color: isDark ? colors.gray[300] : colors.gray[700],
							fontSize: typography.fontSize.sm
						}}
					>
						<li>Click on a contact to select/deselect it</li>
						<li>Hold Ctrl (Windows) or Cmd (Mac) and click to select multiple individual items</li>
						<li>Hold Shift and click to select a range of items</li>
						<li>Use "Select All" to select all visible contacts (respects filters)</li>
						<li>Drag any item to reorder (works with single or multiple selections)</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
