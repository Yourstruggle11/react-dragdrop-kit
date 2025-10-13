import React, { useState } from 'react';
import { DragDropList, type OrderUpdate } from 'react-dragdrop-kit';
import { Type, Mail, Hash, ToggleLeft, Calendar, ChevronDown, Trash2, Eye, Code, Plus } from 'lucide-react';
import { colors, borderRadius, shadows, transitions, typography, spacing } from '@/constants/designSystem';
import { useThemeMode } from '@/contexts/ThemeContext';
import toast from 'react-hot-toast';
import { useDebouncedToast } from '@/hooks/useDebouncedToast';
import CodeViewer from '@/components/CodeViewer';

type FieldType = 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'date';

interface FormField {
	id: string;
	position: number;
	type: FieldType;
	label: string;
	placeholder?: string;
	required: boolean;
	options?: string[]; // For select fields
}

const fieldIcons: Record<FieldType, React.ReactNode> = {
	text: <Type size={20} />,
	email: <Mail size={20} />,
	number: <Hash size={20} />,
	select: <ChevronDown size={20} />,
	checkbox: <ToggleLeft size={20} />,
	date: <Calendar size={20} />,
};

const fieldTemplates: Omit<FormField, 'id' | 'position'>[] = [
	{ type: 'text', label: 'Text Input', placeholder: 'Enter text...', required: false },
	{ type: 'email', label: 'Email Address', placeholder: 'email@example.com', required: false },
	{ type: 'number', label: 'Number', placeholder: '0', required: false },
	{ type: 'select', label: 'Dropdown', required: false, options: ['Option 1', 'Option 2', 'Option 3'] },
	{ type: 'checkbox', label: 'Checkbox', required: false },
	{ type: 'date', label: 'Date Picker', required: false },
];

const initialFields: FormField[] = [
	{ id: '1', position: 0, type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true },
	{ id: '2', position: 1, type: 'email', label: 'Email Address', placeholder: 'john@example.com', required: true },
	{ id: '3', position: 2, type: 'number', label: 'Age', placeholder: '25', required: false },
	{ id: '4', position: 3, type: 'select', label: 'Country', required: false, options: ['USA', 'UK', 'Canada', 'Australia'] },
];

export default function FormBuilderExample() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';
	const [fields, setFields] = useState<FormField[]>(initialFields);
	const [showPreview, setShowPreview] = useState(false);
	const [formTitle, setFormTitle] = useState('Contact Form');

	const bgColor = isDark ? colors.gray[900] : colors.gray[50];
	const cardBg = isDark ? colors.gray[800] : colors.white;
	const textColor = isDark ? colors.gray[100] : colors.gray[900];
	const mutedTextColor = isDark ? colors.gray[400] : colors.gray[600];
	const borderColor = isDark ? colors.gray[700] : colors.gray[200];

	const { showToast } = useDebouncedToast();

const handleReorder = (reordered: FormField[], _updates: OrderUpdate[]) => {
		setFields(reordered);
		showToast('Fields reordered!');
	};

	const addField = (template: typeof fieldTemplates[0]) => {
		const newField: FormField = {
			...template,
			id: Date.now().toString(),
			position: fields.length,
		};
		setFields([...fields, newField]);
		toast.success(`Added ${template.label} field`);
	};

	const deleteField = (id: string) => {
		setFields(fields.filter((field) => field.id !== id));
		toast.success('Field deleted');
	};

	const updateField = (id: string, updates: Partial<FormField>) => {
		setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)));
	};

	const generateFormCode = () => {
		return `<form>
  <h2>${formTitle}</h2>
  ${fields
		.map(
			(field) => `
  <div>
    <label htmlFor="${field.id}">
      ${field.label}${field.required ? ' *' : ''}
    </label>
    ${
			field.type === 'select'
				? `<select id="${field.id}" ${field.required ? 'required' : ''}>
      ${field.options?.map((opt) => `<option value="${opt}">${opt}</option>`).join('\n      ')}
    </select>`
				: field.type === 'checkbox'
				? `<input type="checkbox" id="${field.id}" />`
				: `<input
      type="${field.type}"
      id="${field.id}"
      placeholder="${field.placeholder || ''}"
      ${field.required ? 'required' : ''}
    />`
		}
  </div>`
		)
		.join('')}
  <button type="submit">Submit</button>
</form>`;
	};

	const renderField = (field: FormField) => (
		<div
			style={{
				padding: spacing[4],
				background: cardBg,
				border: `2px solid ${borderColor}`,
				borderRadius: borderRadius.lg,
				transition: transitions.default,
			}}
		>
			<div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[3] }}>
				{/* Icon */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '40px',
						height: '40px',
						background: isDark ? colors.gray[700] : colors.gray[100],
						color: colors.primary[500],
						borderRadius: borderRadius.base,
						flexShrink: 0,
					}}
				>
					{fieldIcons[field.type]}
				</div>

				{/* Content */}
				<div style={{ flex: 1, minWidth: 0 }}>
					<input
						type="text"
						value={field.label}
						onChange={(e) => updateField(field.id, { label: e.target.value })}
						style={{
							width: '100%',
							padding: `${spacing[2]} 0`,
							background: 'transparent',
							border: 'none',
							borderBottom: `2px solid ${borderColor}`,
							fontSize: typography.fontSize.base,
							fontWeight: typography.fontWeight.semibold,
							color: textColor,
							marginBottom: spacing[2],
							outline: 'none',
						}}
						placeholder="Field Label"
					/>

					{field.placeholder !== undefined && (
						<input
							type="text"
							value={field.placeholder}
							onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
							style={{
								width: '100%',
								padding: spacing[2],
								background: isDark ? colors.gray[700] : colors.gray[50],
								border: `1px solid ${borderColor}`,
								borderRadius: borderRadius.base,
								fontSize: typography.fontSize.sm,
								color: mutedTextColor,
								marginBottom: spacing[2],
								outline: 'none',
							}}
							placeholder="Placeholder text"
						/>
					)}

					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: spacing[2],
								fontSize: typography.fontSize.sm,
								color: textColor,
								cursor: 'pointer',
							}}
						>
							<input
								type="checkbox"
								checked={field.required}
								onChange={(e) => updateField(field.id, { required: e.target.checked })}
								style={{ cursor: 'pointer' }}
							/>
							Required field
						</label>

						<div style={{ display: 'flex', gap: spacing[2] }}>
							<span
								style={{
									padding: '4px 10px',
									background: isDark ? colors.gray[700] : colors.gray[100],
									color: mutedTextColor,
									borderRadius: borderRadius.full,
									fontSize: typography.fontSize.xs,
									fontWeight: typography.fontWeight.semibold,
									textTransform: 'capitalize',
								}}
							>
								{field.type}
							</span>

							<button
								onClick={() => deleteField(field.id)}
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '28px',
									height: '28px',
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
			</div>
		</div>
	);

	const renderPreview = () => (
		<div
			style={{
				padding: spacing[8],
				background: cardBg,
				border: `2px solid ${borderColor}`,
				borderRadius: borderRadius.xl,
				boxShadow: shadows.xl,
			}}
		>
			<h2
				style={{
					margin: `0 0 ${spacing[6]} 0`,
					fontSize: typography.fontSize['3xl'],
					fontWeight: typography.fontWeight.bold,
					color: textColor,
				}}
			>
				{formTitle}
			</h2>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					toast.success('Form submitted! (Demo only)');
				}}
			>
				{fields.map((field) => (
					<div key={field.id} style={{ marginBottom: spacing[4] }}>
						<label
							htmlFor={field.id}
							style={{
								display: 'block',
								marginBottom: spacing[2],
								fontSize: typography.fontSize.sm,
								fontWeight: typography.fontWeight.semibold,
								color: textColor,
							}}
						>
							{field.label}
							{field.required && <span style={{ color: colors.error.main }}> *</span>}
						</label>

						{field.type === 'select' ? (
							<select
								id={field.id}
								required={field.required}
								style={{
									width: '100%',
									padding: spacing[3],
									background: isDark ? colors.gray[700] : colors.white,
									border: `2px solid ${borderColor}`,
									borderRadius: borderRadius.base,
									fontSize: typography.fontSize.base,
									color: textColor,
									cursor: 'pointer',
								}}
							>
								<option value="">Select an option...</option>
								{field.options?.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						) : field.type === 'checkbox' ? (
							<div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
								<input type="checkbox" id={field.id} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
								<label htmlFor={field.id} style={{ fontSize: typography.fontSize.sm, color: mutedTextColor, cursor: 'pointer' }}>
									Check this box
								</label>
							</div>
						) : (
							<input
								type={field.type}
								id={field.id}
								placeholder={field.placeholder}
								required={field.required}
								style={{
									width: '100%',
									padding: spacing[3],
									background: isDark ? colors.gray[700] : colors.white,
									border: `2px solid ${borderColor}`,
									borderRadius: borderRadius.base,
									fontSize: typography.fontSize.base,
									color: textColor,
									outline: 'none',
								}}
								onFocus={(e) => {
									e.currentTarget.style.borderColor = colors.primary[500];
								}}
								onBlur={(e) => {
									e.currentTarget.style.borderColor = borderColor;
								}}
							/>
						)}
					</div>
				))}

				<button
					type="submit"
					style={{
						marginTop: spacing[4],
						padding: `${spacing[3]} ${spacing[6]}`,
						background: colors.primary[500],
						color: colors.white,
						border: 'none',
						borderRadius: borderRadius.lg,
						fontSize: typography.fontSize.base,
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
					Submit Form
				</button>
			</form>
		</div>
	);

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
						📋 Form Builder
					</h1>
					<p
						style={{
							margin: 0,
							fontSize: typography.fontSize.lg,
							color: mutedTextColor,
							lineHeight: typography.lineHeight.relaxed,
						}}
					>
						Build custom forms by dragging and dropping field types. Reorder fields, edit labels, and preview your form in real-time.
					</p>
				</div>

				{/* Form Title */}
				<div style={{ marginBottom: spacing[6] }}>
					<input
						type="text"
						value={formTitle}
						onChange={(e) => setFormTitle(e.target.value)}
						style={{
							width: '100%',
							maxWidth: '500px',
							padding: spacing[3],
							background: cardBg,
							border: `2px solid ${borderColor}`,
							borderRadius: borderRadius.lg,
							fontSize: typography.fontSize.xl,
							fontWeight: typography.fontWeight.bold,
							color: textColor,
							outline: 'none',
						}}
						placeholder="Form Title"
					/>
				</div>

				{/* Controls */}
				<div style={{ display: 'flex', gap: spacing[4], marginBottom: spacing[6], flexWrap: 'wrap' }}>
					<button
						onClick={() => setShowPreview(!showPreview)}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: spacing[2],
							padding: `${spacing[3]} ${spacing[4]}`,
							background: showPreview ? colors.primary[500] : cardBg,
							color: showPreview ? colors.white : textColor,
							border: `1px solid ${showPreview ? colors.primary[500] : borderColor}`,
							borderRadius: borderRadius.lg,
							fontSize: typography.fontSize.sm,
							fontWeight: typography.fontWeight.semibold,
							cursor: 'pointer',
							transition: transitions.fast,
						}}
					>
						<Eye size={16} />
						{showPreview ? 'Edit Mode' : 'Preview Form'}
					</button>

					<button
						onClick={() => {
							navigator.clipboard.writeText(generateFormCode());
							toast.success('Form code copied to clipboard!');
						}}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: spacing[2],
							padding: `${spacing[3]} ${spacing[4]}`,
							background: cardBg,
							color: textColor,
							border: `1px solid ${borderColor}`,
							borderRadius: borderRadius.lg,
							fontSize: typography.fontSize.sm,
							fontWeight: typography.fontWeight.semibold,
							cursor: 'pointer',
							transition: transitions.fast,
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = isDark ? colors.gray[700] : colors.gray[100];
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = cardBg;
						}}
					>
						<Code size={16} />
						Copy Code
					</button>
				</div>

				{showPreview ? (
					renderPreview()
				) : (
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: spacing[6], alignItems: 'start' }}>
						{/* Form Fields */}
						<div>
							<h2
								style={{
									margin: `0 0 ${spacing[4]} 0`,
									fontSize: typography.fontSize['2xl'],
									fontWeight: typography.fontWeight.bold,
									color: textColor,
								}}
							>
								Form Fields ({fields.length})
							</h2>

							{fields.length === 0 ? (
								<div
									style={{
										padding: spacing[12],
										textAlign: 'center',
										color: mutedTextColor,
										background: cardBg,
										border: `2px dashed ${borderColor}`,
										borderRadius: borderRadius.xl,
									}}
								>
									<p style={{ fontSize: typography.fontSize.xl, margin: 0 }}>No fields yet</p>
									<p style={{ fontSize: typography.fontSize.sm, margin: `${spacing[2]} 0 0 0` }}>Add fields from the sidebar to get started</p>
								</div>
							) : (
								<DragDropList items={fields} onReorder={handleReorder} renderItem={renderField} showDropIndicator gap={12} />
							)}
						</div>

						{/* Field Templates */}
						<div>
							<h3
								style={{
									margin: `0 0 ${spacing[4]} 0`,
									fontSize: typography.fontSize.lg,
									fontWeight: typography.fontWeight.bold,
									color: textColor,
								}}
							>
								Add Fields
							</h3>

							<div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
								{fieldTemplates.map((template, index) => (
									<button
										key={index}
										onClick={() => addField(template)}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: spacing[3],
											padding: spacing[3],
											background: cardBg,
											border: `2px solid ${borderColor}`,
											borderRadius: borderRadius.lg,
											cursor: 'pointer',
											textAlign: 'left',
											transition: transitions.fast,
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.borderColor = colors.primary[500];
											e.currentTarget.style.transform = 'translateX(4px)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.borderColor = borderColor;
											e.currentTarget.style.transform = 'translateX(0)';
										}}
									>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												width: '36px',
												height: '36px',
												background: isDark ? colors.gray[700] : colors.gray[100],
												color: colors.primary[500],
												borderRadius: borderRadius.base,
											}}
										>
											{fieldIcons[template.type]}
										</div>
										<span
											style={{
												fontSize: typography.fontSize.sm,
												fontWeight: typography.fontWeight.medium,
												color: textColor,
											}}
										>
											{template.label}
										</span>
										<Plus size={16} style={{ marginLeft: 'auto', color: mutedTextColor }} />
									</button>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Code Example */}
				<div style={{ marginTop: spacing[8] }}>
					<h2
						style={{
							margin: `0 0 ${spacing[4]} 0`,
							fontSize: typography.fontSize['2xl'],
							fontWeight: typography.fontWeight.bold,
							color: textColor,
						}}
					>
						📝 Generated Code
					</h2>
					<CodeViewer code={generateFormCode()} language="jsx" filename="Form.jsx" theme={mode} />
				</div>

				<style>{`
					@media (max-width: 1024px) {
						.grid-responsive {
							grid-template-columns: 1fr !important;
						}
					}
				`}</style>
			</div>
		</div>
	);
}
