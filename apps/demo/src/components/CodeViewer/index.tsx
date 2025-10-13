import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Code2, Maximize2, Minimize2 } from 'lucide-react';
import { colors, borderRadius, shadows, transitions, typography } from '@/constants/designSystem';
import toast from 'react-hot-toast';

interface CodeViewerProps {
	code: string;
	language?: string;
	showLineNumbers?: boolean;
	title?: string;
	maxHeight?: number | string;
	theme?: 'light' | 'dark';
	expandable?: boolean;
	copyable?: boolean;
	filename?: string;
}

export default function CodeViewer({
	code,
	language = 'tsx',
	showLineNumbers = true,
	title,
	maxHeight = 500,
	theme = 'dark',
	expandable = true,
	copyable = true,
	filename,
}: CodeViewerProps) {
	const [copied, setCopied] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			toast.success('Code copied to clipboard!');
			setTimeout(() => setCopied(false), 2000);
		} catch {
			toast.error('Failed to copy code');
		}
	};

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	const syntaxTheme = theme === 'dark' ? vscDarkPlus : vs;
	const bgColor = theme === 'dark' ? '#1e1e1e' : '#f5f5f5';
	const headerBg = theme === 'dark' ? '#2d2d2d' : '#e5e7eb';
	const textColor = theme === 'dark' ? colors.gray[300] : colors.gray[700];

	return (
		<div
			style={{
				borderRadius: borderRadius.lg,
				overflow: 'hidden',
				border: `1px solid ${theme === 'dark' ? colors.gray[700] : colors.gray[300]}`,
				boxShadow: shadows.md,
				background: bgColor,
				fontFamily: typography.fontFamily.mono,
			}}
		>
			{/* Header */}
			{(title || filename || copyable || expandable) && (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '10px 16px',
						background: headerBg,
						borderBottom: `1px solid ${theme === 'dark' ? colors.gray[700] : colors.gray[300]}`,
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
						<Code2 size={16} color={textColor} />
						{filename && (
							<span
								style={{
									fontSize: typography.fontSize.sm,
									color: textColor,
									fontWeight: typography.fontWeight.medium,
									fontFamily: typography.fontFamily.mono,
								}}
							>
								{filename}
							</span>
						)}
						{title && !filename && (
							<span
								style={{
									fontSize: typography.fontSize.sm,
									color: textColor,
									fontWeight: typography.fontWeight.semibold,
								}}
							>
								{title}
							</span>
						)}
					</div>

					<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
						{expandable && (
							<button
								onClick={toggleExpand}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '6px',
									padding: '6px 12px',
									background: 'transparent',
									border: 'none',
									borderRadius: borderRadius.base,
									cursor: 'pointer',
									fontSize: typography.fontSize.sm,
									color: textColor,
									transition: transitions.default,
									fontWeight: typography.fontWeight.medium,
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background =
										theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = 'transparent';
								}}
								title={isExpanded ? 'Collapse' : 'Expand'}
							>
								{isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
							</button>
						)}

						{copyable && (
							<button
								onClick={handleCopy}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '6px',
									padding: '6px 12px',
									background: copied ? colors.success.main : 'transparent',
									border: 'none',
									borderRadius: borderRadius.base,
									cursor: 'pointer',
									fontSize: typography.fontSize.sm,
									color: copied ? colors.white : textColor,
									transition: transitions.default,
									fontWeight: typography.fontWeight.medium,
								}}
								onMouseEnter={(e) => {
									if (!copied) {
										e.currentTarget.style.background =
											theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
									}
								}}
								onMouseLeave={(e) => {
									if (!copied) {
										e.currentTarget.style.background = 'transparent';
									}
								}}
								title="Copy code"
							>
								{copied ? (
									<>
										<Check size={14} />
										<span>Copied!</span>
									</>
								) : (
									<>
										<Copy size={14} />
										<span>Copy</span>
									</>
								)}
							</button>
						)}
					</div>
				</div>
			)}

			{/* Code Content */}
			<div
				style={{
					maxHeight: isExpanded ? 'none' : maxHeight,
					overflow: 'auto',
					position: 'relative',
				}}
			>
				<SyntaxHighlighter
					language={language}
					style={syntaxTheme}
					showLineNumbers={showLineNumbers}
					customStyle={{
						margin: 0,
						padding: '16px',
						background: bgColor,
						fontSize: typography.fontSize.sm,
						lineHeight: typography.lineHeight.relaxed,
					}}
					lineNumberStyle={{
						color: theme === 'dark' ? colors.gray[600] : colors.gray[400],
						fontSize: typography.fontSize.xs,
						paddingRight: '12px',
						userSelect: 'none',
					}}
				>
					{code}
				</SyntaxHighlighter>
			</div>
		</div>
	);
}
